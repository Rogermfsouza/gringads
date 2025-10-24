'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Users, Star, DollarSign, TrendingUp } from 'lucide-react';

export default function HeroSection() {
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
        duration: 0.8
      }
    }
  };


  const productCards = [
    {
      id: 1,
      image: "/images/1.png",
      position: { top: "10%", left: "5%" }
    },
    {
      id: 2,
      image: "/images/2.png",
      position: { top: "20%", right: "8%" }
    },
    {
      id: 3,
      image: "/images/3.png",
      position: { bottom: "15%", left: "10%" }
    },
    {
      id: 4,
      image: "/images/5.png",
      position: { bottom: "25%", right: "5%" }
    }
  ];

  return (
    <section id="inicio" className="relative bg-hero-gradient py-20 overflow-hidden min-h-screen">
      {/* Background Product Images - Desfocadas */}
      <div className="absolute inset-0 z-0">
        {/* Imagens de fundo com blur */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 via-white/90 to-green-100/80"></div>
        
        {/* Product Images Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-48 bg-gradient-to-br from-green-200 to-green-300 rounded-2xl blur-sm transform rotate-12"></div>
          <div className="absolute top-32 right-16 w-56 h-40 bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl blur-sm transform -rotate-6"></div>
          <div className="absolute bottom-20 left-20 w-48 h-36 bg-gradient-to-br from-purple-200 to-purple-300 rounded-2xl blur-sm transform rotate-6"></div>
          <div className="absolute bottom-32 right-24 w-60 h-44 bg-gradient-to-br from-orange-200 to-orange-300 rounded-2xl blur-sm transform -rotate-12"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-52 bg-gradient-to-br from-pink-200 to-pink-300 rounded-2xl blur-sm rotate-3"></div>
        </div>
      </div>

      {/* Animated Background Particles */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Gradient Overlay para melhorar legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-white/60 z-10"></div>
      
      {/* Floating Product Cards */}
      {productCards.map((product, index) => (
        <motion.div
          key={product.id}
          className={`absolute z-20 hidden lg:block`}
          style={product.position}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ 
            opacity: 0.7, 
            scale: 1, 
            y: 0,
            rotate: [0, 2, -2, 0]
          }}
          transition={{
            duration: 1,
            delay: index * 0.3,
            rotate: {
              duration: 6,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1]
            }
          }}
          whileHover={{ 
            opacity: 1, 
            scale: 1.1,
            z: 50,
            transition: { duration: 0.3 }
          }}
        >
          <div className="product-card bg-white/90 backdrop-blur-sm rounded-2xl p-1 shadow-2xl border border-white/20 w-48">
            <div 
              className="w-full h-24 rounded-lg bg-cover bg-center"
              style={{ backgroundImage: `url(${product.image})` }}
            ></div>
          </div>
        </motion.div>
      ))}

      {/* Floating Geometric Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-green-200/20 rounded-full blur-xl z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-32 h-32 bg-blue-200/20 rounded-full blur-xl z-10"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-16 h-16 bg-purple-200/20 rounded-full blur-xl z-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center px-4 py-2 bg-green-100/80 backdrop-blur-sm text-green-800 rounded-full text-sm font-medium mb-8 border border-green-200/50">
              <motion.span 
                className="w-2 h-2 bg-green-500 rounded-full mr-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.span>
              Mais de 1M+ de produtos analisados
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900">
              O Maior{' '}
              <motion.span 
                className="text-green-600 relative inline-block"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.2, 1]
                }}
                style={{
                  background: 'linear-gradient(90deg, #22c55e, #16a34a, #15803d, #22c55e)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Swipe de Ofertas
                <motion.svg 
                  className="absolute -bottom-2 left-0 w-full h-3 text-green-200" 
                  viewBox="0 0 200 12" 
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                >
                  <path d="M2 8C50 2 150 2 198 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </motion.svg>
              </motion.span>
              <br />
              Gringas Escaladas!
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
              Infoprodutos escalados nos mercados{' '}
              <motion.span 
                className="font-semibold text-gray-900"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Latam
              </motion.span>
              ,{' '}
              <motion.span 
                className="font-semibold text-gray-900"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Americano
              </motion.span>
              {' '}e{' '}
              <motion.span 
                className="font-semibold text-gray-900"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Europeu
              </motion.span>
              .
              <br />
              Escale sua operação em dólar modelando infoprodutos gringos de sucesso.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.button 
              className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center btn-pulse"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Começar Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
            <motion.button 
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-green-600 hover:text-green-600 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                borderColor: "#22c55e",
                color: "#22c55e"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Produtos
            </motion.button>
          </motion.div>

          {/* Mobile Product Carousel */}
          <motion.div 
            variants={itemVariants} 
            className="lg:hidden mb-8"
          >
            <div className="flex space-x-4 overflow-x-auto pb-4 px-4">
              {productCards.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product.id}
                  className="flex-shrink-0 w-48"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="product-card bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-white/20">
                    <div 
                      className="w-full h-32 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${product.image})` }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sales Statistics */}
          <motion.div 
            variants={itemVariants} 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
          >
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-center mb-3">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">$2.4M+</div>
              <div className="text-gray-600 text-sm">Vendas Geradas</div>
            </motion.div>
            
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">340%</div>
              <div className="text-gray-600 text-sm">ROI Médio</div>
            </motion.div>
            
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">15K+</div>
              <div className="text-gray-600 text-sm">Clientes Ativos</div>
            </motion.div>
          </motion.div>

          {/* Social Proof */}
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <motion.div 
              className="flex items-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
            >
              <div className="flex -space-x-2">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-white text-sm font-semibold">{i + 1}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 2.8 + (i * 0.1),
                      duration: 0.4,
                      type: "spring"
                    }}
                    whileHover={{ 
                      scale: 1.3,
                      rotate: 15,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </div>
              <span className="text-gray-600 font-medium">Amado por mais de 50.000+ empreendedores</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
