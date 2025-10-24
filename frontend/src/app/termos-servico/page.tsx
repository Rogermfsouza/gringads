'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function TermosServico() {
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
              className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FileText className="w-8 h-8 text-blue-600" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Termos de Serviço
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
                <Scale className="w-6 h-6 mr-3 text-blue-600" />
                1. Aceitação dos Termos
              </h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Ao acessar e utilizar a plataforma GringADS, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concorda com qualquer parte destes termos, não deve utilizar nossos serviços.
                </p>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Elegibilidade:</strong> Você deve ter pelo menos 18 anos de idade para utilizar nossos serviços.
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Descrição dos Serviços</h2>
              <div className="bg-green-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  O GringADS é uma plataforma que oferece:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Acesso a produtos digitais testados em mercados internacionais</li>
                  <li>Ferramentas de análise e métricas de performance</li>
                  <li>Comunidade de empreendedores e networking</li>
                  <li>Recursos educacionais e materiais de apoio</li>
                  <li>Suporte técnico e consultoria especializada</li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Conta do Usuário</h2>
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Responsabilidades do Usuário:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Fornecer informações verdadeiras e atualizadas</li>
                  <li>Manter a confidencialidade de sua senha</li>
                  <li>Notificar imediatamente sobre uso não autorizado</li>
                  <li>Ser responsável por todas as atividades em sua conta</li>
                  <li>Não compartilhar sua conta com terceiros</li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Pagamentos e Reembolsos</h2>
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Política de Pagamento:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Pagamentos são processados de forma segura</li>
                  <li>Preços podem ser alterados com aviso prévio de 30 dias</li>
                  <li>Taxas de processamento podem ser aplicadas</li>
                  <li>Reembolsos são avaliados caso a caso</li>
                  <li>Cancelamentos devem ser feitos com 7 dias de antecedência</li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
                5. Condutas Proibidas
              </h2>
              <div className="bg-red-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">É expressamente proibido:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Usar a plataforma para atividades ilegais</li>
                  <li>Violar direitos de propriedade intelectual</li>
                  <li>Interferir no funcionamento da plataforma</li>
                  <li>Coletar dados de outros usuários</li>
                  <li>Usar bots ou scripts automatizados</li>
                  <li>Fazer engenharia reversa do software</li>
                  <li>Distribuir malware ou conteúdo malicioso</li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Propriedade Intelectual</h2>
              <div className="bg-indigo-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Todo o conteúdo da plataforma, incluindo textos, gráficos, logos, ícones, imagens, áudios, vídeos e software, é propriedade do GringADS ou de seus licenciadores e está protegido por leis de direitos autorais.
                </p>
                <div className="flex items-start space-x-3">
                  <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Restrições:</strong> Você não pode reproduzir, distribuir, modificar ou criar obras derivadas sem autorização expressa.
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitação de Responsabilidade</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  O GringADS não se responsabiliza por:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Danos diretos, indiretos ou consequenciais</li>
                  <li>Perda de lucros ou oportunidades de negócio</li>
                  <li>Interrupções temporárias do serviço</li>
                  <li>Conteúdo de terceiros ou links externos</li>
                  <li>Ações de outros usuários da plataforma</li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Suspensão e Encerramento</h2>
              <div className="bg-orange-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Reservamo-nos o direito de suspender ou encerrar sua conta a qualquer momento, sem aviso prévio, se você:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Violar estes termos de serviço</li>
                  <li>Engajar-se em atividades fraudulentas</li>
                  <li>Fornecer informações falsas</li>
                  <li>Usar a plataforma de forma inadequada</li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Alterações nos Termos</h2>
              <div className="bg-teal-50 rounded-lg p-6">
                <p className="text-gray-700">
                  Podemos modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação na plataforma. O uso continuado dos serviços após as alterações constitui aceitação dos novos termos.
                </p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Lei Aplicável</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700">
                  Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos tribunais competentes de São Paulo, SP, Brasil.
                </p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contato</h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Para dúvidas sobre estes Termos de Serviço, entre em contato:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>E-mail:</strong> legal@gringads.com</p>
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
            transition={{ duration: 0.6, delay: 1.5 }}
            className="mt-12 pt-8 border-t border-gray-200 text-center"
          >
            <p className="text-gray-500 text-sm">
              Ao utilizar nossos serviços, você confirma que leu, entendeu e concorda com estes Termos de Serviço.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
