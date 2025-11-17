import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { motion } from "motion/react";
import Group14 from "../imports/Group14";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
  selectedSpot: boolean;
  selectedCity: boolean;
  selectedState: boolean;
}

export function Header({ 
  searchQuery, 
  onSearchChange, 
  onReset,
  selectedSpot,
  selectedCity,
  selectedState
}: HeaderProps) {
  return (
    <div className="sticky top-0 z-50">
      {/* Banner "PREVISÃO DE ONDAS POR NÍVEL DE SURF" - Agora no topo */}
      <div className="bg-[rgb(241,243,246)] border-b border-[#eeeeee]">
        <div className="container mx-auto px-4 py-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <p className="text-center text-[#001f3d] tracking-[0] normal-case leading-tight text-[16px] md:!text-[18px]" style={{ fontWeight: 600 }}>
              Previsão de ondas por nível de surf
            </p>
          </motion.div>
        </div>
      </div>

      {/* Faixa azul escura com logo e busca */}
      <div className="bg-[#001f3d]">
        <div className={`container mx-auto px-4 ${selectedSpot ? 'py-2 md:h-[68px] md:py-0 md:flex md:items-center' : 'py-4 md:h-[68px] md:py-0 md:flex md:items-center'}`}>
          <div className={`flex flex-col md:flex-row md:items-center md:justify-between md:w-full ${selectedSpot ? 'gap-0' : 'gap-3'}`}>
            {/* Logo */}
            <button 
              onClick={onReset}
              className="flex items-center gap-2"
            >
              <div className="w-[132px] h-[34px]">
                <Group14 />
              </div>
            </button>

            {/* Busca - esconde completamente quando spot selecionado */}
            {!selectedSpot && (
              <div className="flex-1 max-w-xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#666666] w-5 h-5 z-10 pointer-events-none" />
                  <Input
                    type="text"
                    placeholder={
                      selectedCity
                        ? "Buscar picos..."
                        : selectedState
                        ? "Buscar cidades..."
                        : "Buscar estados ou picos..."
                    }
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-12 pr-12 h-12 !bg-white border border-[#e0e0e0] text-foreground placeholder:text-[#666666] focus:border-accent rounded-lg"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => onSearchChange("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#666666] hover:text-foreground transition-colors z-10"
                      aria-label="Limpar busca"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}