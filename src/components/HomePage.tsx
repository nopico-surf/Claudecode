// HomePage.tsx - Landing page informativa (versão de visualização)
// Para usar: substitua o conteúdo do App.tsx ou crie roteamento

import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Waves, 
  MapPin, 
  TrendingUp, 
  Thermometer, 
  Wind,
  Compass,
  ChevronRight,
  Search,
  Shield,
  BarChart3
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

interface HomePageProps {
  onEnterApp?: () => void;
}

export function HomePage({ onEnterApp }: HomePageProps) {
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

  const levels = [
    {
      id: "iniciantes",
      title: "Iniciantes",
      range: "0.3 - 0.7m",
      color: "bg-green-500",
      description: "Perfeito para quem está começando",
      icon: "🏄‍♂️"
    },
    {
      id: "intermediarios",
      title: "Intermediários",
      range: "0.5 - 1.7m",
      color: "bg-blue-500",
      description: "Para surfistas com experiência",
      icon: "🏄"
    },
    {
      id: "avancados",
      title: "Avançados",
      range: "1.0m+",
      color: "bg-orange-500",
      description: "Para surfistas experientes",
      icon: "🏄‍♀️"
    }
  ];

  const features = [
    {
      icon: Waves,
      title: "Altura das Ondas",
      description: "Dados precisos em tempo real"
    },
    {
      icon: Wind,
      title: "Direção do Vento",
      description: "Condições atualizadas"
    },
    {
      icon: TrendingUp,
      title: "Variação da Maré",
      description: "Previsões detalhadas"
    },
    {
      icon: Thermometer,
      title: "Temperatura da Água",
      description: "Info completa do mar"
    },
    {
      icon: Compass,
      title: "Orientação da Praia",
      description: "Análise automática"
    },
    {
      icon: BarChart3,
      title: "Ajustes Customizados",
      description: "203 spots calibrados"
    }
  ];

  const stats = [
    { number: "203+", label: "Picos de Surf" },
    { number: "27", label: "Estados" },
    { number: "100%", label: "Brasil Coberto" },
    { number: "24/7", label: "Dados em Tempo Real" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* 🧪 BANNER DE TESTE - VERCEL DEPLOY */}
      <div className="bg-[#FFC72C] border-b-4 border-[#001F3D] py-6 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-black text-[#001F3D] mb-2">
            🌊 TESTE DEPLOY VERCEL - ATUALIZAÇÃO #{new Date().getTime().toString().slice(-6)}
          </h1>
          <p className="text-xl font-bold text-[#001F3D]">
            Se você vê este banner, o deploy funciona! O problema é SÓ o favicon.
          </p>
          <p className="text-sm text-[#001F3D] mt-2 opacity-75">
            Banner adicionado em {new Date().toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
      
      {/* Header Simples */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Waves className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold text-slate-900">Surf Brasil</span>
          </div>
          <Button 
            onClick={onEnterApp}
            variant="default"
          >
            Entrar no App
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1664088673619-38b275539bf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmaW5nJTIwd2F2ZXMlMjBvY2VhbnxlbnwxfHx8fDE3NjE4NDgzNTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Surfing waves"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/60 to-slate-900/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-6 bg-blue-500/20 text-white border-blue-400/30 px-4 py-1">
              🌊 Powered by Open-Meteo Marine API
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Previsão de ondas por<br />
              <span className="text-blue-300">nível de surf</span>
            </h1>
            
            <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
              A plataforma mais completa do Brasil para encontrar as melhores ondas 
              baseado no seu nível de experiência. Cobertura total em 203+ picos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={onEnterApp}
                size="lg"
                variant="default"
                className="px-8 py-6 text-lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Encontrar Ondas Agora
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-6 text-lg backdrop-blur-sm"
                onClick={() => {
                  document.getElementById('como-funciona')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
              >
                Saiba Mais
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Níveis de Surf */}
      <section id="como-funciona" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-700">
              Classificação Inteligente
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ondas para seu nível
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Sistema automático que classifica as ondas em tempo real baseado 
              na altura ideal para cada nível de experiência.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {levels.map((level, index) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredLevel(level.id)}
                onMouseLeave={() => setHoveredLevel(null)}
              >
                <Card className={`p-6 transition-all duration-300 cursor-pointer border-2 ${
                  hoveredLevel === level.id 
                    ? 'border-blue-500 shadow-lg scale-105' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <div className="text-center">
                    <div className="text-5xl mb-4">{level.icon}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {level.title}
                    </h3>
                    <div className={`inline-block ${level.color} text-white px-4 py-1 rounded-full font-semibold mb-3`}>
                      {level.range}
                    </div>
                    <p className="text-slate-600">
                      {level.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-orange-100 text-orange-700">
              Tecnologia Avançada
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Dados completos em tempo real
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Todas as informações que você precisa para escolher o melhor pico
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <Icon className="w-10 h-10 text-blue-600 mb-4" />
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cobertura Nacional */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-green-100 text-green-700">
                <MapPin className="w-3 h-3 mr-1" />
                Cobertura Nacional
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                203+ picos calibrados manualmente
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Cada spot possui ajustes customizados considerando:
              </p>
              <ul className="space-y-3">
                {[
                  "Orientação geográfica da praia",
                  "Proteções naturais (ilhas, pontas)",
                  "Batimetria e formação do fundo",
                  "Características locais do swell",
                  "Padrões históricos de ondas"
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-2 text-slate-700"
                  >
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1728185643802-4b4851413c91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJmJTIwYmVhY2glMjBCcmF6aWx8ZW58MXx8fHwxNzYxODQ4MzU5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Surf beach Brazil"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">203+</div>
                    <div className="text-sm text-slate-600">Spots</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Pronto para pegar onda?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Encontre as melhores condições para o seu nível agora mesmo
            </p>
            <Button 
              onClick={onEnterApp}
              size="lg"
              className="bg-white hover:bg-slate-100 text-blue-600 px-10 py-6 text-lg"
            >
              <Waves className="w-5 h-5 mr-2" />
              Acessar Plataforma
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer Simples */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Waves className="w-6 h-6 text-blue-400" />
            <span className="text-white font-semibold">Surf Brasil</span>
          </div>
          <p className="text-sm">
            Previsão de ondas por nível de surf • Powered by Open-Meteo Marine API
          </p>
          <p className="text-xs mt-2">
            © 2025 • 203+ spots calibrados • Dados em tempo real
          </p>
        </div>
      </footer>
    </div>
  );
}
