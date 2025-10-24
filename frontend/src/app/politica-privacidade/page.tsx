'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        className="bg-white shadow-sm border-b"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="flex items-center text-green-600 hover:text-green-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar ao Início
            </Link>
          </div>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          {/* Título */}
          <div className="text-center mb-12">
            <motion.div
              className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Shield className="w-8 h-8 text-green-600" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Política de Privacidade
            </h1>
            <p className="text-lg text-gray-600">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          {/* Conteúdo */}
          <div className="prose prose-lg max-w-none">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="w-6 h-6 mr-3 text-green-600" />
                1. Informações que Coletamos
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Dados Pessoais:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Nome completo e informações de contato</li>
                  <li>Endereço de e-mail</li>
                  <li>Informações de perfil do Facebook (quando conectado)</li>
                  <li>Dados de uso da plataforma</li>
                  <li>Informações de pagamento (processadas de forma segura)</li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Database className="w-6 h-6 mr-3 text-green-600" />
                2. Como Usamos suas Informações
              </h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Fornecer acesso aos produtos e serviços da plataforma</li>
                  <li>Processar pagamentos e transações</li>
                  <li>Enviar comunicações importantes sobre sua conta</li>
                  <li>Melhorar nossos serviços e desenvolver novos recursos</li>
                  <li>Garantir a segurança da plataforma</li>
                  <li>Cumprir obrigações legais</li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Lock className="w-6 h-6 mr-3 text-green-600" />
                3. Compartilhamento de Informações
              </h2>
              <div className="bg-yellow-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto nas seguintes situações:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Com seu consentimento explícito</li>
                  <li>Para processar pagamentos (processadores de pagamento seguros)</li>
                  <li>Para cumprir obrigações legais</li>
                  <li>Para proteger nossos direitos e segurança</li>
                  <li>Com provedores de serviços que nos auxiliam (sob acordos de confidencialidade)</li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <UserCheck className="w-6 h-6 mr-3 text-green-600" />
                4. Seus Direitos
              </h2>
              <div className="bg-green-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">Você tem o direito de:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Acessar suas informações pessoais</li>
                  <li>Corrigir dados incorretos ou incompletos</li>
                  <li>Solicitar a exclusão de seus dados</li>
                  <li>Retirar seu consentimento a qualquer momento</li>
                  <li>Portabilidade dos dados</li>
                  <li>Opor-se ao processamento de seus dados</li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Segurança dos Dados</h2>
              <div className="bg-red-50 rounded-lg p-6">
                <p className="text-gray-700">
                  Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Utilizamos criptografia SSL/TLS e seguimos as melhores práticas de segurança da indústria.
                </p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies e Tecnologias Similares</h2>
              <div className="bg-purple-50 rounded-lg p-6">
                <p className="text-gray-700">
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso da plataforma e personalizar conteúdo. Você pode controlar o uso de cookies através das configurações do seu navegador.
                </p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Alterações nesta Política</h2>
              <div className="bg-indigo-50 rounded-lg p-6">
                <p className="text-gray-700">
                  Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças significativas através do e-mail registrado ou por meio de aviso na plataforma. Recomendamos revisar esta política regularmente.
                </p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contato</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos suas informações pessoais, entre em contato conosco:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>E-mail:</strong> privacidade@gringads.com</p>
                  <p><strong>Telefone:</strong> +55 (11) 99999-9999</p>
                  <p><strong>Endereço:</strong> São Paulo, SP, Brasil</p>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-12 pt-8 border-t border-gray-200 text-center"
          >
            <p className="text-gray-500 text-sm">
              Esta política está em conformidade com a LGPD (Lei Geral de Proteção de Dados) e GDPR.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
