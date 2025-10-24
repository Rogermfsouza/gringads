import { Copy, Clipboard, TrendingUp, ArrowRight } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      icon: Copy,
      title: 'Copie',
      description: 'Encontre infoprodutos escalados nos mercados gringos que estão vendendo milhões',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Clipboard,
      title: 'Cole',
      description: 'Adapte o produto para o mercado brasileiro ou outros mercados latinos',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: TrendingUp,
      title: 'Escale',
      description: 'Monetize em dólar e escale sua operação com produtos comprovadamente lucrativos',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50/30"></div>
      
      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #22c55e 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #16a34a 1px, transparent 1px),
            linear-gradient(45deg, transparent 49%, #22c55e 50%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, #16a34a 50%, transparent 51%)
          `,
          backgroundSize: '60px 60px, 40px 40px, 80px 80px, 80px 80px',
          backgroundPosition: '0 0, 30px 30px, 0 0, 0 0'
        }}></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-green-100/20 rounded-full blur-3xl"></div>
      <div className="absolute top-32 right-20 w-24 h-24 bg-blue-100/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-emerald-100/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 right-1/3 w-28 h-28 bg-teal-100/20 rounded-full blur-2xl"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Como Funciona o <span className="text-green-600">GringADS</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Três passos simples para escalar sua operação em dólar com infoprodutos gringos de sucesso
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group relative">
              {/* Card Background */}
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/20 shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2"></div>
              
              {/* Content */}
              <div className="relative z-10 p-8">
                <div className="relative mb-6">
                  <div className={`w-20 h-20 mx-auto bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 relative overflow-hidden`}>
                    {/* Icon Glow Effect */}
                    <div className="absolute inset-0 bg-white/20 rounded-2xl group-hover:bg-white/30 transition-all duration-300"></div>
                    <step.icon className="w-10 h-10 text-white relative z-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">{step.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Arrow connecting steps */}
        <div className="hidden md:flex justify-center items-center mt-12">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-green-300 to-green-400 rounded-full"></div>
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
            <div className="w-20 h-0.5 bg-gradient-to-r from-green-400 via-green-300 to-green-400 rounded-full"></div>
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
            <div className="w-20 h-0.5 bg-gradient-to-r from-green-400 via-green-300 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
