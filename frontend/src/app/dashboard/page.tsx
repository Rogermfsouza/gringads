'use client'

import { motion } from 'framer-motion'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/hooks/useAuth'
import { LogOut, User, Shield, TrendingUp, Globe } from 'lucide-react'

export default function DashboardPage() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Header */}
        <motion.header
          className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">GringADS</h1>
                  <p className="text-xs text-gray-500 -mt-1">Dashboard</p>
                </div>
              </motion.div>

              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{user?.email}</p>
                    <p className="text-gray-500">Usuário Premium</p>
                  </div>
                </div>
                <motion.button
                  onClick={handleSignOut}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <LogOut className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <motion.h1
                className="text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Bem-vindo ao{' '}
                <span className="text-green-600">GringADS</span>
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Acesse os melhores infoprodutos escalados dos mercados gringos
              </motion.p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: 'Produtos Disponíveis',
                  value: '1,247',
                  icon: Globe,
                  color: 'from-blue-500 to-blue-600',
                  bgColor: 'bg-blue-50'
                },
                {
                  title: 'Mercados Ativos',
                  value: '3',
                  icon: TrendingUp,
                  color: 'from-green-500 to-green-600',
                  bgColor: 'bg-green-50'
                },
                {
                  title: 'Taxa de Sucesso',
                  value: '94%',
                  icon: Shield,
                  color: 'from-purple-500 to-purple-600',
                  bgColor: 'bg-purple-50'
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className={`${stat.bgColor} rounded-2xl p-6 relative overflow-hidden group`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                  whileHover={{ 
                    y: -5,
                    scale: 1.02
                  }}
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.title}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Coming Soon Section */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-3xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Em Breve: Catálogo Completo
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Estamos preparando o catálogo completo com os melhores infoprodutos escalados 
                dos mercados Latam, Americano e Europeu. Em breve você terá acesso a:
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-left max-w-3xl mx-auto">
                {[
                  'Produtos testados e validados',
                  'Métricas de performance em tempo real',
                  'Filtros avançados por nicho e país',
                  'Sistema de favoritos personalizado',
                  'Análise de concorrência detalhada',
                  'Integração com ferramentas de marketing'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
