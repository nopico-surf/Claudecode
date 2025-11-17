import { Instagram, Phone, Mail } from "lucide-react";
import { FooterAnimatedSection } from "./FooterAnimatedSection";

export function Footer() {
  return (
    <footer className="bg-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8">
          
          {/* Container Principal com duas colunas */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            
            {/* Coluna Esquerda - Azul */}
            <div className="bg-[#001f3d] rounded-2xl p-8">
              <div className="flex flex-col gap-8">
                    
                {/* Siga no Instagram */}
                <div className="flex flex-col gap-2">
                  <p className="text-white/70 text-base">
                    Siga no Instagram
                  </p>
                  <a 
                    href="https://instagram.com/nopico_surf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 group transition-all w-fit"
                  >
                    <Instagram className="w-6 h-6 text-white/90 group-hover:text-[#FFC72C] transition-colors" />
                    <p className="text-white/90 group-hover:text-[#FFC72C] text-base transition-colors">
                      @nopico_surf
                    </p>
                  </a>
                </div>

                {/* Entre em contato */}
                <div className="flex flex-col gap-2">
                  <p className="text-white/70 text-base">
                    Entre em contato
                  </p>
                  <div className="flex flex-col gap-2">
                    {/* Telefone */}
                    <a 
                      href="tel:+5511968996977" 
                      className="inline-flex items-center gap-2 group transition-all w-fit"
                    >
                      <Phone className="w-6 h-6 text-white/90 group-hover:text-[#FFC72C] transition-colors" />
                      <p className="text-white/90 group-hover:text-[#FFC72C] text-base transition-colors">
                        (11) 9 6899-6977
                      </p>
                    </a>
                    
                    {/* Email */}
                    <a 
                      href="mailto:nopicocontato@gmail.com" 
                      className="inline-flex items-center gap-2 group transition-all w-fit"
                    >
                      <Mail className="w-6 h-6 text-white/90 group-hover:text-[#FFC72C] transition-colors" />
                      <p className="text-white/90 group-hover:text-[#FFC72C] text-base transition-colors">
                        nopicocontato@gmail.com
                      </p>
                    </a>
                  </div>
                </div>

                {/* Dados API */}
                <div className="flex flex-col gap-2">
                  <div className="text-sm md:text-base text-white/70">
                    <p className="mb-0">Dados fornecidos pela API Open-Meteo Marine Weather</p>
                    <p>Previsões gratuitas e de código aberto</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Coluna Direita - Design animado do Figma */}
            <FooterAnimatedSection />
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-[#001f3d] text-base text-center">
              © 2025 No Pico. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
