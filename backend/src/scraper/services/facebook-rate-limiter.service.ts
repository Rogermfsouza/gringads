import { Injectable } from '@nestjs/common';

interface RateLimitInfo {
  callCount: number;
  totalCpuTime: number;
  totalTime: number;
  type: string;
  estimatedTimeToRegainAccess: number;
}

@Injectable()
export class FacebookRateLimiterService {
  private requestCount: number = 0;
  private resetTime: Date = new Date(Date.now() + 3600000);
  private readonly maxRequestsPerHour: number;
  private readonly delayBetweenRequests: number;
  private lastRequestTime: number = 0;

  constructor(maxRequestsPerHour: number = 200, delayMs: number = 3000) {
    this.maxRequestsPerHour = maxRequestsPerHour;
    this.delayBetweenRequests = delayMs;
  }

  async checkAndWait(): Promise<void> {
    const now = Date.now();

    if (now >= this.resetTime.getTime()) {
      this.requestCount = 0;
      this.resetTime = new Date(now + 3600000);
      console.log('✅ Rate limit resetado');
    }

    if (this.requestCount >= this.maxRequestsPerHour) {
      const waitTime = this.resetTime.getTime() - now;
      console.log(
        `⏳ Limite de ${this.maxRequestsPerHour} requisições atingido. Aguardando ${Math.ceil(waitTime / 1000)}s...`,
      );
      await this.sleep(waitTime);
      this.requestCount = 0;
      this.resetTime = new Date(Date.now() + 3600000);
    }

    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.delayBetweenRequests) {
      const waitTime = this.delayBetweenRequests - timeSinceLastRequest;
      await this.sleep(waitTime);
    }

    this.lastRequestTime = Date.now();
    this.requestCount++;
  }

  trackResponse(headers: any): void {
    const appUsage = headers['x-app-usage'];
    const businessUsage = headers['x-business-use-case-usage'];

    if (appUsage) {
      try {
        const usage: RateLimitInfo = JSON.parse(appUsage);
        console.log('📊 Facebook Rate Limit Status:', {
          calls: usage.callCount,
          percentage: `${usage.callCount}%`,
          timeToReset: usage.estimatedTimeToRegainAccess,
        });

        if (usage.callCount >= 90) {
          console.warn('⚠️ Rate limit próximo do máximo (90%+)!');
        }
      } catch (error) {
        console.error('Erro ao parsear x-app-usage:', error);
      }
    }

    if (businessUsage) {
      try {
        const usage = JSON.parse(businessUsage);
        console.log('📊 Business Use Case Usage:', usage);
      } catch (error) {
        console.error('Erro ao parsear x-business-use-case-usage:', error);
      }
    }
  }

  getStatus(): {
    requestCount: number;
    maxRequests: number;
    resetTime: Date;
    remainingRequests: number;
  } {
    return {
      requestCount: this.requestCount,
      maxRequests: this.maxRequestsPerHour,
      resetTime: this.resetTime,
      remainingRequests: Math.max(0, this.maxRequestsPerHour - this.requestCount),
    };
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

