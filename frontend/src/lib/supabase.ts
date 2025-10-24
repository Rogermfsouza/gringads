import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Tipos para TypeScript
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
          last_login: string | null
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          last_login?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          last_login?: string | null
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          hotmart_transaction_id: string | null
          hotmart_subscriber_code: string | null
          status: 'active' | 'inactive' | 'cancelled' | 'delayed' | 'refunded'
          plan_name: string | null
          start_date: string | null
          end_date: string | null
          last_webhook_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          hotmart_transaction_id?: string | null
          hotmart_subscriber_code?: string | null
          status?: 'active' | 'inactive' | 'cancelled' | 'delayed' | 'refunded'
          plan_name?: string | null
          start_date?: string | null
          end_date?: string | null
          last_webhook_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          hotmart_transaction_id?: string | null
          hotmart_subscriber_code?: string | null
          status?: 'active' | 'inactive' | 'cancelled' | 'delayed' | 'refunded'
          plan_name?: string | null
          start_date?: string | null
          end_date?: string | null
          last_webhook_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
