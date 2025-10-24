'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, DollarSign, TrendingUp } from 'lucide-react';

export default function MarketsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const markets = [
    {
      icon: Globe,
      title: 'Mercado Latam',
      subtitle: 'América Latina',
      description: 'Mais de 600 milhões de compradores com alto poder aquisitivo, prontos para colocar milhares de dólares no seu bolso!',
      stats: '600M+',
      statsLabel: 'Compradores',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      features: [
        'Alto poder aquisitivo',
        'Mercado em expansão',
        'Baixa concorrência',
        'Crescimento sustentável'
      ],
      delay: 0.1
    },
    {
      icon: DollarSign,
      title: 'Mercado Americano',
      subtitle: 'Estados Unidos',
      description: 'O ápice do marketing de resposta direta! A oferta que vende nos Estados Unidos vende em qualquer lugar.',
      stats: '$50B+',
      statsLabel: 'Mercado Digital',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      features: [
        'Maior mercado digital',
        'Produtos testados',
        'Alta conversão',
        'Referência mundial'
      ],
      delay: 0.3
    },
    {
      icon: TrendingUp,
      title: 'Mercado Europeu',
      subtitle: 'Europa',
      description: 'O verdadeiro oceano azul do mercado digital. Quem chega primeiro aqui, bebe água limpa!',
      stats: '€30B+',
      statsLabel: 'Poder Aquisitivo',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      features: [
        'Maior poder aquisitivo',
        'Baixa concorrência',
        'Público altamente comprador',
        'Escalabilidade segura'
      ],
      delay: 0.5
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        ease: "backOut"
      }
    }
  };

  const statsVariants = {
    hidden: { 
      scale: 0,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "backOut",
        delay: 0.3
      }
    }
  };

  return (
    <section id="mercados" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Foguete Background */}
      <div className="absolute inset-0 right-0 w-full h-full z-0">
        <div 
          className="absolute right-0 top-0 w-full h-full bg-cover bg-right bg-no-repeat opacity-8"
          style={{
            backgroundImage: 'url(/images/foguete.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'right center',
            transform: 'translateX(30%)'
          }}
        />
      </div>

      {/* Static Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-red-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Escale em{' '}
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
                3 Mercados
              </motion.span>
              {' '}Gigantes
            </h2>
          </motion.div>
          <motion.div variants={itemVariants}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Acesse os mercados mais lucrativos do mundo com produtos já testados e escalados
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {markets.map((market, index) => (
            <motion.div 
              key={index} 
              className={`${market.bgColor} rounded-2xl p-8 relative overflow-hidden group`}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              {/* Floating Background Pattern */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)'
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="relative z-10">
                <div className="text-center mb-6">
                  <motion.div 
                    className={`w-16 h-16 mx-auto bg-gradient-to-r ${market.color} rounded-2xl flex items-center justify-center shadow-lg mb-4 relative overflow-hidden`}
                    variants={iconVariants}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
                    }}
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
                    <market.icon className="w-8 h-8 text-white relative z-10" />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-2xl font-bold text-gray-900 mb-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {market.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-600 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + (index * 0.2) }}
                  >
                    {market.subtitle}
                  </motion.p>
                </div>

                <motion.div 
                  className="text-center mb-6"
                  variants={statsVariants}
                >
                  <div 
                    className="text-3xl font-bold text-gray-900 mb-1"
                  >
                    {market.stats}
                  </div>
                  <div className="text-gray-600">{market.statsLabel}</div>
                </motion.div>

                <motion.p 
                  className="text-gray-700 mb-6 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + (index * 0.2) }}
                >
                  {market.description}
                </motion.p>

                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 + (index * 0.2) }}
                >
                  {market.features.map((feature, featureIndex) => (
                    <motion.div 
                      key={featureIndex} 
                      className="flex items-center"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ 
                        delay: 1.1 + (index * 0.2) + (featureIndex * 0.1),
                        duration: 0.5
                      }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className={`w-2 h-2 bg-gradient-to-r ${market.color} rounded-full mr-3`}
                        animate={{
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: featureIndex * 0.2
                        }}
                      />
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.button 
                  className={`w-full mt-6 bg-gradient-to-r ${market.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 btn-pulse`}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + (index * 0.2) }}
                >
                  Explorar Mercado
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
