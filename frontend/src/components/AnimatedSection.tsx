'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedSection({ 
  children, 
  className = '', 
  ...motionProps 
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FloatingElement({ 
  children, 
  className = '', 
  delay = 0 
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-10, 10, -10],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: [0.4, 0, 0.2, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

interface GlowEffectProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function GlowEffect({ 
  children, 
  className = '', 
  intensity = 'medium' 
}: GlowEffectProps) {
  const glowIntensity = {
    low: 'shadow-green-200',
    medium: 'shadow-green-300',
    high: 'shadow-green-400'
  };

  return (
    <motion.div
      className={`${className} ${glowIntensity[intensity]}`}
      whileHover={{
        boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
