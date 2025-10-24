'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Shield, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ExclusaoDados() {
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
              className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Trash2 className="w-8 h-8 text-red-600" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Exclusão de Dados do Usuário
            </h1>
            <p className="text-lg text-gray-600">
              Informações sobre como solicitar a exclusão de seus dados pessoais
            </p>
          </div>

          {/* Aviso Importante */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Aviso Importante</h3>
                  <p className="text-red-700">
                    A exclusão de seus dados é <strong>irreversível</strong>. Após a confirmação, não será possível recuperar suas informações, histórico de transações ou acessar sua conta.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Conteúdo */}
          <div className="prose prose-lg max-w-none">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-red-600" />
                1. Seu Direito à Exclusão
              </h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Conforme a LGPD (Lei Geral de Proteção de Dados) e GDPR, você tem o direito de solicitar a exclusão de seus dados pessoais em qualquer momento, sem custos adicionais.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Exclusão Completa</h4>
                      <p className="text-sm text-gray-600">Todos os seus dados serão removidos permanentemente</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Processo Gratuito</h4>
                      <p className="text-sm text-gray-600">Não cobramos taxas para processar sua solicitação</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Dados que Serão Excluídos</h2>
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Informações Pessoais:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Nome completo e dados de contato</li>
                  <li>Endereço de e-mail e telefone</li>
                  <li>Informações de perfil e preferências</li>
                  <li>Histórico de login e atividades</li>
                  <li>Dados de pagamento e transações</li>
                  <li>Comunicações e suporte</li>
                  <li>Conteúdo gerado pelo usuário</li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Como Solicitar a Exclusão</h2>
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Opções de Solicitação:</h3>
                
                <div className="space-y-4">
                  <div className="border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">1. Através da Plataforma</h4>
                    <p className="text-gray-700 mb-2">Acesse as configurações da sua conta e selecione "Excluir Conta"</p>
                    <div className="bg-white rounded p-3 text-sm text-gray-600">
                      <strong>Passo a passo:</strong> Login → Configurações → Privacidade → Excluir Conta
                    </div>
                  </div>

                  <div className="border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">2. Por E-mail</h4>
                    <p className="text-gray-700 mb-2">Envie um e-mail para: <strong>privacidade@gringads.com</strong></p>
                    <div className="bg-white rounded p-3 text-sm text-gray-600">
                      <strong>Assunto:</strong> &ldquo;Solicitação de Exclusão de Dados&rdquo;<br/>
                      <strong>Inclua:</strong> Seu e-mail cadastrado e motivo da exclusão
                    </div>
                  </div>

                  <div className="border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">3. Por Telefone</h4>
                    <p className="text-gray-700 mb-2">Ligue para: <strong>+55 (11) 99999-9999</strong></p>
                    <div className="bg-white rounded p-3 text-sm text-gray-600">
                      <strong>Horário:</strong> Segunda a Sexta, 9h às 18h<br/>
                      <strong>Documentos:</strong> RG ou CPF para identificação
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="w-6 h-6 mr-3 text-red-600" />
                4. Prazo de Processamento
              </h2>
              <div className="bg-purple-50 rounded-lg p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-purple-600 font-bold">1</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">Confirmação</h4>
                    <p className="text-sm text-gray-600">Até 24 horas</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-purple-600 font-bold">2</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">Verificação</h4>
                    <p className="text-sm text-gray-600">1-3 dias úteis</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-purple-600 font-bold">3</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">Exclusão</h4>
                    <p className="text-sm text-gray-600">Até 15 dias</p>
                  </div>
                </div>
                <p className="text-center text-gray-700 mt-4">
                  <strong>Total:</strong> Processo completo em até 15 dias úteis
                </p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Dados que Podem Ser Mantidos</h2>
              <div className="bg-orange-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Alguns dados podem ser mantidos por motivos legais ou operacionais:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Registros de transações financeiras (conforme legislação fiscal)</li>
                  <li>Logs de segurança e auditoria</li>
                  <li>Dados anonimizados para fins estatísticos</li>
                  <li>Informações necessárias para cumprir obrigações legais</li>
                </ul>
                <div className="mt-4 p-3 bg-orange-100 rounded">
                  <p className="text-orange-800 text-sm">
                    <strong>Nota:</strong> Estes dados são mantidos pelo menor tempo possível e de forma segura.
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Confirmação da Exclusão</h2>
              <div className="bg-teal-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Após a exclusão completa, você receberá:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>E-mail de confirmação da exclusão</li>
                  <li>Relatório detalhado dos dados removidos</li>
                  <li>Informações sobre dados mantidos (se houver)</li>
                  <li>Contatos para dúvidas ou reclamações</li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Alternativas à Exclusão</h2>
              <div className="bg-indigo-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Antes de solicitar a exclusão, considere estas alternativas:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-indigo-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Pausar Conta</h4>
                    <p className="text-sm text-gray-600">Temporariamente desativar sem perder dados</p>
                  </div>
                  <div className="border border-indigo-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Atualizar Dados</h4>
                    <p className="text-sm text-gray-600">Corrigir ou atualizar informações incorretas</p>
                  </div>
                  <div className="border border-indigo-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Limitar Processamento</h4>
                    <p className="text-sm text-gray-600">Restringir uso de dados específicos</p>
                  </div>
                  <div className="border border-indigo-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Portabilidade</h4>
                    <p className="text-sm text-gray-600">Exportar seus dados para outra plataforma</p>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contato e Suporte</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Para dúvidas sobre exclusão de dados ou outras questões de privacidade:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Canal Principal</h4>
                    <div className="space-y-1 text-gray-700">
                      <p><strong>E-mail:</strong> privacidade@gringads.com</p>
                      <p><strong>Telefone:</strong> +55 (11) 99999-9999</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Horário de Atendimento</h4>
                    <div className="space-y-1 text-gray-700">
                      <p>Segunda a Sexta: 9h às 18h</p>
                      <p>Sábado: 9h às 12h</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mt-12 pt-8 border-t border-gray-200 text-center"
          >
            <p className="text-gray-500 text-sm">
              Esta página está em conformidade com a LGPD e GDPR. Sua privacidade é nossa prioridade.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
