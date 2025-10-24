'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const socialIcons = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-400' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-400' }
  ];

  const quickLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Como Funciona', href: '#como-funciona' },
    { name: 'Mercados', href: '#mercados' },
    { name: 'Por que Escolher', href: '#por-que-escolher' }
  ];

  const legalLinks = [
    { name: 'Política de Privacidade', href: '#' },
    { name: 'Termos de Uso', href: '#' },
    { name: 'Cookies', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-60 h-60 bg-green-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 30, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {/* Logo and Description */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <motion.div 
              className="flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center"
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1
                }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-white font-bold text-sm">G</span>
              </motion.div>
              <div>
                <h3 className="text-xl font-bold">GringADS</h3>
                <p className="text-xs text-gray-400 -mt-1">GRINGADS.COM</p>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-gray-400 mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              O maior swipe de ofertas gringas escaladas. Infoprodutos testados nos mercados mais lucrativos do mundo.
            </motion.p>
            
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {socialIcons.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href} 
                  className={`text-gray-400 ${social.color} transition-colors`}
                  whileHover={{ 
                    scale: 1.2,
                    y: -2
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + (index * 0.1) }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <motion.h4 
              className="text-lg font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Links Rápidos
            </motion.h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                >
                  <motion.a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </motion.div>

        <motion.div 
          className="border-t border-gray-800 mt-12 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              className="text-gray-400 text-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              © 2024 GringADS. Todos os direitos reservados.
            </motion.p>
            
            <motion.div 
              className="flex space-x-6 mt-4 md:mt-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              {legalLinks.map((link, index) => (
                <motion.a 
                  key={index}
                  href={link.href} 
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                  whileHover={{ 
                    scale: 1.05,
                    y: -2
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + (index * 0.1) }}
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
