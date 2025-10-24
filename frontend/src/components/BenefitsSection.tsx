'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle, Shield, Zap, Target, Users, Award } from 'lucide-react';

export default function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const benefits = [
    {
      icon: CheckCircle,
      title: 'Produtos Testados',
      description: 'Todos os produtos são analisados e testados nos mercados gringos antes de chegarem até você',
      color: 'from-green-500 to-green-600',
      delay: 0.1
    },
    {
      icon: Shield,
      title: '100% Seguro',
      description: 'Plataforma segura e confiável com mais de 50.000 usuários ativos',
      color: 'from-blue-500 to-blue-600',
      delay: 0.2
    },
    {
      icon: Zap,
      title: 'Resultados Rápidos',
      description: 'Comece a ver resultados em poucos dias com produtos já escalados',
      color: 'from-yellow-500 to-orange-500',
      delay: 0.3
    },
    {
      icon: Target,
      title: 'Alta Conversão',
      description: 'Produtos com histórico comprovado de vendas e alta taxa de conversão',
      color: 'from-purple-500 to-purple-600',
      delay: 0.4
    },
    {
      icon: Users,
      title: 'Suporte Completo',
      description: 'Equipe especializada para te ajudar em cada etapa do processo',
      color: 'from-pink-500 to-rose-500',
      delay: 0.5
    },
    {
      icon: Award,
      title: 'Garantia de Qualidade',
      description: 'Garantimos que todos os produtos atendem aos mais altos padrões de qualidade',
      color: 'from-indigo-500 to-indigo-600',
      delay: 0.6
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  } as const;

  const cardVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  } as const;

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -180
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: [0.68, -0.55, 0.265, 1.55]
      }
    }
  } as const;

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/mapa.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {/* Overlay para melhorar legibilidade */}
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm" />
        
        {/* Gradiente sutil para dar profundidade */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-transparent to-blue-50/30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o{' '}
              <motion.span 
                className="text-green-600 relative"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  background: 'linear-gradient(90deg, #22c55e, #16a34a, #15803d, #22c55e)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                GringADS
              </motion.span>
              ?
            </h2>
          </motion.div>
          <motion.div variants={itemVariants}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A plataforma mais completa para escalar sua operação em dólar com infoprodutos gringos
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              className="text-center p-6 rounded-xl relative group overflow-hidden bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
              variants={cardVariants}
            >
              <div className="relative z-10">
                <motion.div 
                  className="w-16 h-16 mx-auto bg-green-100 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden"
                  variants={iconVariants}
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <benefit.icon className="w-8 h-8 text-green-600 relative z-10" />
                </motion.div>
                
                <motion.h3 
                  className="text-xl font-bold text-gray-900 mb-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {benefit.title}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                >
                  {benefit.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div 
            className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-200/20 to-blue-200/20"
              animate={{
                background: [
                  'linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))',
                  'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(34, 197, 94, 0.1))',
                  'linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))'
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="relative z-10">
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Pronto para escalar em dólar?
              </motion.h3>
              
              <motion.p 
                className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Junte-se a mais de 50.000 empreendedores que já estão escalando com produtos gringos de sucesso
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <motion.button 
                  className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all duration-300 btn-pulse"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Começar Agora - É Grátis
                </motion.button>
                
                <motion.button 
                  className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "#22c55e",
                    color: "#ffffff"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver Produtos
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
