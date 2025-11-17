// v3.0.8 - Deploy Vercel otimizado: buildCommand e outputDirectory explícitos
import { useState, useEffect } from "react";
import { brazilianSurfSpots } from "./data/spots";
import { Spot } from "./types/surf";
import { SpotCard } from "./components/SpotCard";
import { SpotDetails } from "./components/SpotDetails";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AllSpots } from "./components/AllSpots";
import { SimpleSpotsList } from "./components/SimpleSpotsList";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "./components/ui/breadcrumb";
import { Waves, Search, MapPin, X } from "lucide-react";
import { getWaveData } from "./services/waveApi";
import { motion } from "motion/react";
import { 
  initMixpanel, 
  trackLevelFilterClick, 
  trackStateSelected, 
  trackCitySelected, 
  trackSpotClicked,
  trackSearch,
  showMixpanelStatus
} from "./services/mixpanel";
import { AdminRouter } from "./components/admin/AdminRouter";
import { usePNBOIAAutoSync } from "./hooks/usePNBOIAAutoSync";
import { useFavicon } from "./hooks/useFavicon";
import { useMetaTags } from "./hooks/useMetaTags";
import faviconDataUrl from "./imports/favicon";
import "./data/calibration/exampleData"; // Disponibiliza funções no console

// Função para converter texto em slug (URL amigável)
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^a-z0-9]+/g, "-") // Substitui caracteres especiais por -
    .replace(/^-+|-+$/g, ""); // Remove - do início e fim
}

// Função para normalizar texto removendo acentos (para busca)
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Remove acentos
}

// Função para encontrar item por slug
function findBySlug(items: any[], slug: string, nameField: string = "name"): any {
  return items.find(item => toSlug(item[nameField]) === slug);
}

export default function App() {
  // 🎯 FAVICON - Injeta dinamicamente via hook (mesma estratégia dos SVGs funcionais)
  useFavicon(faviconDataUrl);

  // 🏷️ META TAGS - Injeta Open Graph, Twitter Cards e Canonical URL (solução Figma Make)
  useMetaTags();

  // 🌊 Sincronização automática das boias PNBOIA (funciona em background)
  usePNBOIAAutoSync();
  
  // Verifica se a URL é /picos (apenas para acesso direto)
  const currentPath = window.location.pathname;
  const isAllSpotsPage = currentPath === '/picos' || currentPath === '/picos.html';
  const isAdminPage = currentPath.startsWith('/admin');
  
  // Se for página admin, renderiza router com autenticação
  if (isAdminPage) {
    try {
      return <AdminRouter />;
    } catch (error) {
      console.error('Erro ao carregar AdminRouter:', error);
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar Admin</h1>
            <p className="text-gray-600 mb-4">{String(error)}</p>
            <a href="/" className="text-blue-600 underline">Voltar para home</a>
          </div>
        </div>
      );
    }
  }
  
  // Se for página de todos os picos, renderiza componente específico
  if (isAllSpotsPage) {
    return <SimpleSpotsList />;
  }
  
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [levelFilter, setLevelFilter] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");
  
  // ✅ HANDLER: Filtro de nível com tracking Mixpanel
  const handleLevelFilterChange = (nivel: "all" | "beginner" | "intermediate" | "advanced") => {
    setLevelFilter(nivel);
    
    // Mapeia os valores para português
    const nivelMap = {
      'all': 'todos',
      'beginner': 'iniciantes',
      'intermediate': 'intermediarios',
      'advanced': 'avancados'
    } as const;
    
    // Track no Mixpanel
    trackLevelFilterClick(nivelMap[nivel], {
      estado: selectedState || undefined,
      cidade: selectedCity || undefined,
      totalSpots: selectedCity ? spots.filter(s => s.city === selectedCity).length : undefined
    });
  };
  
  // ✅ TRACKING: Busca com debounce (só trackeia queries com 3+ caracteres)
  useEffect(() => {
    if (searchQuery.length < 3) return;
    
    const debounceTimer = setTimeout(() => {
      let resultCount = 0;
      
      if (globalSearch) {
        resultCount = globalSpots.length;
      } else if (selectedCity) {
        resultCount = filteredSpots.length;
      } else if (selectedState) {
        resultCount = filteredCities.length;
      } else {
        resultCount = filteredStates.length;
      }
      
      trackSearch(searchQuery, resultCount);
    }, 1000); // Espera 1s após parar de digitar
    
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]); // Dependência mínima para evitar loops
  
  // ✅ INICIALIZAÇÃO: Mixpanel + Supabase
  useEffect(() => {
    // Inicializa Mixpanel Analytics
    initMixpanel();
    
    // Mostra status do Mixpanel no console (após 2s para não poluir)
    setTimeout(() => {
      showMixpanelStatus();
    }, 2000);
    
    const registerAppVersion = async () => {
      try {
        const { projectId, publicAnonKey } = await import('./utils/supabase/info');
        await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/version`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ version: 'v1.8.1' })
          }
        );
        console.log('✅ App version registrada no Supabase');
      } catch (error) {
        // Silencioso - backend opcional
      }
    };
    
    const keepSupabaseAlive = async () => {
      try {
        const { projectId, publicAnonKey } = await import('./utils/supabase/info');
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/health`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(`✅ Supabase heartbeat #${data.heartbeat_count || '?'} OK`);
        }
      } catch (error) {
        // Silencioso - backend opcional, não afeta funcionalidade principal
      }
    };
    
    // Registra versão inicial após 3 segundos
    setTimeout(registerAppVersion, 3000);
    
    // Heartbeat inicial após 5 segundos
    const initialTimeout = setTimeout(keepSupabaseAlive, 5000);
    
    // Heartbeat a cada 4 horas (para manter ativo por 7+ dias)
    const interval = setInterval(keepSupabaseAlive, 4 * 60 * 60 * 1000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);
  
  // Cache de spots com horários ideais por nível
  const [spotsWithIdealTimes, setSpotsWithIdealTimes] = useState<{
    [spotId: string]: {
      beginner: boolean;
      intermediate: boolean;
      advanced: boolean;
    }
  }>({});
  const [loadingForecasts, setLoadingForecasts] = useState(false);

  // Drag to scroll functionality
  const useDragScroll = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      const element = e.currentTarget;
      setStartX(e.pageX - element.offsetLeft);
      setScrollLeft(element.scrollLeft);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      setIsDragging(true);
      const element = e.currentTarget;
      setStartX(e.touches[0].pageX - element.offsetLeft);
      setScrollLeft(element.scrollLeft);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      e.preventDefault();
      const element = e.currentTarget;
      const x = e.pageX - element.offsetLeft;
      const walk = (x - startX) * 2;
      element.scrollLeft = scrollLeft - walk;
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const element = e.currentTarget;
      const x = e.touches[0].pageX - element.offsetLeft;
      const walk = (x - startX) * 2;
      element.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
    };

    return {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleMouseUp,
      style: { cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none' as const }
    };
  };

  const dragScrollProps = useDragScroll();

  // Carregar estado inicial da URL
  useEffect(() => {
    const loadFromUrl = () => {
      const path = window.location.pathname;
      const segments = path.split('/').filter(s => s);

      if (segments.length === 0) {
        // Home - nada selecionado
        setIsInitialLoad(false);
        return;
      }

      // Segmento 1: Estado (code já está em lowercase, ex: "sc")
      const stateSlug = segments[0].toLowerCase();
      const state = brazilianSurfSpots.find(s => s.code.toLowerCase() === stateSlug);
      
      if (state) {
        setSelectedState(state.code);

        // Segmento 2: Cidade
        if (segments.length > 1) {
          const citySlug = segments[1];
          const city = state.cities.find(c => toSlug(c.name) === citySlug);
          
          if (city) {
            setSelectedCity(city.name);

            // Segmento 3: Pico (direto, sem praia)
            if (segments.length > 2) {
              const spotSlug = segments[2];
              // Buscar spot em todas as praias da cidade
              let foundSpot: Spot | undefined;
              for (const beach of city.beaches) {
                foundSpot = beach.spots.find(s => toSlug(s.name) === spotSlug);
                if (foundSpot) break;
              }
              
              if (foundSpot) {
                setSelectedSpot(foundSpot);
              }
            }
          }
        }
      }

      setIsInitialLoad(false);
    };

    loadFromUrl();
  }, []);

  // Atualizar URL quando navegação muda
  useEffect(() => {
    if (isInitialLoad) return;

    let path = '/';

    if (selectedState) {
      const state = brazilianSurfSpots.find(s => s.code === selectedState);
      if (state) {
        // State code já está em lowercase (ex: "sc")
        path += state.code.toLowerCase();

        if (selectedCity) {
          path += '/' + toSlug(selectedCity);

          if (selectedSpot) {
            path += '/' + toSlug(selectedSpot.name);
          }
        }
      }
    }

    // Atualizar URL sem recarregar a página
    const currentPath = window.location.pathname;
    if (currentPath !== path) {
      window.history.pushState(null, '', path);
    }
  }, [selectedState, selectedCity, selectedSpot, isInitialLoad]);

  // Lidar com botão voltar/avançar do navegador
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const segments = path.split('/').filter(s => s);

      // Reset tudo
      setSelectedState(null);
      setSelectedCity(null);
      setSelectedSpot(null);

      if (segments.length === 0) {
        return;
      }

      // Recarregar do URL (state code já está lowercase)
      const stateSlug = segments[0].toLowerCase();
      const state = brazilianSurfSpots.find(s => s.code.toLowerCase() === stateSlug);
      
      if (state) {
        setSelectedState(state.code);

        if (segments.length > 1) {
          const citySlug = segments[1];
          const city = state.cities.find(c => toSlug(c.name) === citySlug);
          
          if (city) {
            setSelectedCity(city.name);

            if (segments.length > 2) {
              const spotSlug = segments[2];
              // Buscar spot em todas as praias da cidade
              let foundSpot: Spot | undefined;
              for (const beach of city.beaches) {
                foundSpot = beach.spots.find(s => toSlug(s.name) === spotSlug);
                if (foundSpot) break;
              }
              
              if (foundSpot) {
                setSelectedSpot(foundSpot);
              }
            }
          }
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Atualizar título da página
  useEffect(() => {
    let title = 'Nopico - Previsão de ondas por nível de surf';
    
    if (selectedSpot) {
      title = `${selectedSpot.name} - ${selectedCity} - Nopico`;
    } else if (selectedCity) {
      const state = brazilianSurfSpots.find(s => s.code === selectedState);
      title = `${selectedCity} - ${state?.name || ''} - Nopico`;
    } else if (selectedState) {
      const state = brazilianSurfSpots.find(s => s.code === selectedState);
      title = `${state?.name || ''} - Nopico`;
    }
    
    document.title = title;
  }, [selectedState, selectedCity, selectedSpot]);

  // Reset scroll ao topo sempre que mudar de página
  useEffect(() => {
    // Solução mais robusta para mobile (especialmente iOS Safari)
    const scrollToTop = () => {
      // Método 1: window.scrollTo
      window.scrollTo(0, 0);
      
      // Método 2: documentElement
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      
      // Método 3: body
      if (document.body) {
        document.body.scrollTop = 0;
      }
      
      // Método 4: Para iOS Safari - forçar repaint
      const root = document.getElementById('root');
      if (root) {
        root.scrollTop = 0;
      }
    };

    // Executar imediatamente
    scrollToTop();
    
    // Executar novamente após render (para iOS Safari)
    requestAnimationFrame(() => {
      scrollToTop();
    });
    
    // Fallback final com timeout
    setTimeout(scrollToTop, 10);
  }, [selectedState, selectedCity, selectedSpot]);

  const handleReset = () => {
    setSelectedState(null);
    setSelectedCity(null);
    setSelectedSpot(null);
    setLevelFilter("all");
  };

  const handleStateClick = (stateCode: string) => {
    const state = brazilianSurfSpots.find(s => s.code === stateCode);
    const totalCities = state?.cities.length || 0;
    
    setSelectedState(stateCode);
    setSelectedCity(null);
    setSelectedSpot(null);
    setSearchQuery("");
    setLevelFilter("all");
    
    // Track no Mixpanel
    if (state) {
      trackStateSelected(state.name, totalCities);
    }
  };

  const handleCityClick = (cityName: string) => {
    const state = brazilianSurfSpots.find(s => s.code === selectedState);
    const city = state?.cities.find(c => c.name === cityName);
    const totalSpots = city?.beaches.reduce((acc, beach) => acc + (beach?.spots?.length || 0), 0) || 0;
    
    setSelectedCity(cityName);
    setSelectedSpot(null);
    setSearchQuery("");
    setLevelFilter("all");
    setSpotsWithIdealTimes({}); // Limpar cache ao mudar de cidade
    
    // Track no Mixpanel
    if (state && city) {
      trackCitySelected(cityName, state.name, totalSpots);
    }
  };

  // Carregar forecasts de todos os spots da cidade para filtrar por horários ideais
  useEffect(() => {
    if (!selectedCity || levelFilter === "all") {
      return;
    }

    const loadForecastsForCity = async () => {
      setLoadingForecasts(true);
      const spotsToCheck = spots;
      const idealTimesMap: {
        [spotId: string]: {
          beginner: boolean;
          intermediate: boolean;
          advanced: boolean;
        }
      } = {};

      // Carregar forecasts de todos os spots em paralelo
      const promises = spotsToCheck.map(async (spot) => {
        try {
          const data = await getWaveData(
            spot.latitude,
            spot.longitude,
            spot.beachOrientation,
            undefined, // Sem data específica - pega horários futuros
            spot.id
          );

          // Verificar se há horários ideais para cada nível nos próximos 7 dias
          // 🔒 PROTEÇÃO: Verificar se data.hourly existe antes de usar .some()
          const hourlyData = data?.hourly || [];
          const hasBeginner = hourlyData.some(h => h.bestFor?.includes("beginner"));
          const hasIntermediate = hourlyData.some(h => h.bestFor?.includes("intermediate"));
          const hasAdvanced = hourlyData.some(h => h.bestFor?.includes("advanced"));

          idealTimesMap[spot.id] = {
            beginner: hasBeginner,
            intermediate: hasIntermediate,
            advanced: hasAdvanced
          };
        } catch (error) {
          console.error(`Erro ao carregar forecast para ${spot.name}:`, error);
          // Em caso de erro, assumir que não tem horários ideais
          idealTimesMap[spot.id] = {
            beginner: false,
            intermediate: false,
            advanced: false
          };
        }
      });

      await Promise.all(promises);
      setSpotsWithIdealTimes(idealTimesMap);
      setLoadingForecasts(false);
    };

    loadForecastsForCity();
  }, [selectedCity, levelFilter]);

  // Filtrar estados (com busca sem acentos) e ordenar alfabeticamente
  const filteredStates = brazilianSurfSpots
    .filter(state =>
      normalizeText(state.name).includes(normalizeText(searchQuery))
    )
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

  // Obter cidades do estado selecionado e ordenar alfabeticamente
  const cities = selectedState
    ? (brazilianSurfSpots.find(s => s.code === selectedState)?.cities || [])
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    : [];

  const filteredCities = cities.filter(city =>
    normalizeText(city.name).includes(normalizeText(searchQuery))
  );

  // Obter picos da cidade selecionada (de todas as praias) e ordenar alfabeticamente
  const spots = selectedCity
    ? (cities.find(c => c.name === selectedCity)?.beaches || [])
        .reduce((allSpots, beach) => {
          return allSpots.concat(beach.spots);
        }, [] as Spot[])
        .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    : [];

  const filteredSpots = spots.filter(spot => {
    // Buscar tanto pelo nome do pico quanto pelo nome da praia
    const normalizedQuery = normalizeText(searchQuery);
    const normalizedSpotName = normalizeText(spot.name);
    const normalizedBeachName = normalizeText(spot.beach);
    
    const matchesSearch = 
      normalizedSpotName.includes(normalizedQuery) || 
      normalizedBeachName.includes(normalizedQuery);
    
    // Se filtro é "all", mostrar todos (que passam na busca)
    if (levelFilter === "all") {
      return matchesSearch;
    }
    
    // Se filtro está ativo e ainda está carregando, não mostrar nenhum
    if (spotsWithIdealTimes[spot.id] === undefined) {
      return false;
    }
    
    // Se filtro está ativo e já carregamos, usar apenas dados de horários ideais
    const matchesLevel = spotsWithIdealTimes[spot.id][levelFilter];
    return matchesSearch && matchesLevel;
  });

  // Busca global - compatível com iOS 15 (com busca sem acentos)
  const globalSearch = searchQuery.length > 0 && !selectedState && !selectedCity;
  const globalSpots = globalSearch
    ? (brazilianSurfSpots || []).reduce((allSpots, state) => {
        if (!state?.cities) return allSpots;
        const stateSpots = (state.cities || []).reduce((citySpots, city) => {
          if (!city?.beaches) return citySpots;
          const beachSpots = (city.beaches || []).reduce((spots, beach) => {
            if (!beach?.spots) return spots;
            const filteredSpots = beach.spots
              .filter(spot => {
                const normalizedQuery = normalizeText(searchQuery);
                const normalizedSpotName = normalizeText(spot.name);
                const normalizedBeachName = normalizeText(spot.beach);
                
                // ✅ PRIORIDADE 1: Match exato no nome do pico
                const exactMatchSpot = normalizedSpotName === normalizedQuery;
                
                // �� PRIORIDADE 2: Nome do pico começa com a query
                const startsWithSpot = normalizedSpotName.startsWith(normalizedQuery);
                
                // ✅ PRIORIDADE 3: Palavra exata no nome do pico
                const exactWordMatch = normalizedSpotName.split(/\s+/).some(word => word === normalizedQuery);
                
                // ✅ PRIORIDADE 4: Palavra começa com a query no nome do pico
                const wordStartsWithMatch = normalizedSpotName.split(/\s+/).some(word => word.startsWith(normalizedQuery));
                
                // ✅ PRIORIDADE 5: Match exato na praia (apenas se query for >= 3 caracteres)
                const exactMatchBeach = normalizedQuery.length >= 3 && normalizedBeachName === normalizedQuery;
                
                // ✅ PRIORIDADE 6: Praia começa com a query (apenas se query for >= 4 caracteres)
                const startsWithBeach = normalizedQuery.length >= 4 && normalizedBeachName.startsWith(normalizedQuery);
                
                // ❌ REMOVIDO: containsInSpot - causava muitos falsos positivos
                // ❌ REMOVIDO: matches parciais em palavras da praia
                
                const shouldInclude = exactMatchSpot || startsWithSpot || exactWordMatch || wordStartsWithMatch || exactMatchBeach || startsWithBeach;
                
                return shouldInclude;
              })
              .map(spot => {
                // Calcular score de relevância para ordenação
                const normalizedQuery = normalizeText(searchQuery);
                const normalizedSpotName = normalizeText(spot.name);
                const normalizedBeachName = normalizeText(spot.beach);
                
                let score = 0;
                
                // Sistema de pontuação mais estrito
                if (normalizedSpotName === normalizedQuery) score = 1000; // Match exato no pico
                else if (normalizedSpotName.startsWith(normalizedQuery)) score = 900; // Pico começa com
                else if (normalizedSpotName.split(/\s+/).some(word => word === normalizedQuery)) score = 800; // Palavra exata no pico
                else if (normalizedSpotName.split(/\s+/).some(word => word.startsWith(normalizedQuery))) score = 700; // Palavra começa com no pico
                else if (normalizedBeachName === normalizedQuery) score = 600; // Match exato na praia
                else if (normalizedBeachName.startsWith(normalizedQuery)) score = 500; // Praia começa com
                else score = 400; // Outros matches válidos
                
                return { ...spot, _searchScore: score };
              });
            return spots.concat(filteredSpots);
          }, [] as (Spot & { _searchScore: number })[]);
          return citySpots.concat(beachSpots);
        }, [] as (Spot & { _searchScore: number })[]);
        return allSpots.concat(stateSpots);
      }, [] as (Spot & { _searchScore: number })[])
        .sort((a, b) => b._searchScore - a._searchScore) // Ordenar por relevância
        .map(({ _searchScore, ...spot }) => spot) // Remover score temporário
    : [];

  // Debug logs para iOS 15
  useEffect(() => {
    if (globalSearch) {
      console.log('[BUSCA] Query:', searchQuery);
      console.log('[BUSCA] Picos encontrados:', globalSpots.length);
      console.log('[BUSCA] Estados encontrados:', filteredStates.length);
      if (globalSpots.length > 0) {
        console.log('[BUSCA] Primeiros picos:', globalSpots.slice(0, 3).map(s => s.name));
      }
    }
  }, [searchQuery, globalSearch, globalSpots.length, filteredStates.length]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden w-full">
      {/* Header Azul Escuro */}
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onReset={handleReset}
        selectedSpot={!!selectedSpot}
        selectedCity={!!selectedCity}
        selectedState={!!selectedState}
      />

      <main id="main-content" className="container mx-auto px-4 pb-8 pt-4">
        {/* Breadcrumb */}
        {(selectedState || selectedCity || selectedSpot) && (
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink onClick={handleReset} className="cursor-pointer">
                    <Badge 
                      variant="outline" 
                      className={`gap-2 py-1.5 px-3 transition-colors rounded-md ${
                        !selectedState 
                          ? "bg-primary/10 border-transparent text-primary" 
                          : "hover:bg-primary/5 hover:border-primary/40 text-muted-foreground"
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      Brasil
                    </Badge>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                
                {selectedState && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink 
                        onClick={() => {
                          setSelectedCity(null);
                          setSelectedSpot(null);
                        }}
                        className="cursor-pointer"
                      >
                        <Badge 
                          variant="outline" 
                          className={`gap-2 py-1.5 px-3 transition-colors rounded-md ${
                            selectedState && !selectedCity 
                              ? "bg-primary/10 border-transparent text-primary" 
                              : "hover:bg-primary/5 hover:border-primary/40 text-muted-foreground"
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          {brazilianSurfSpots.find(s => s.code === selectedState)?.name}
                        </Badge>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}

                {selectedCity && !selectedSpot && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <Badge 
                        className="gap-2 py-1.5 px-3 bg-primary/10 text-primary rounded-md border-0"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        {selectedCity}
                      </Badge>
                    </BreadcrumbItem>
                  </>
                )}

                {selectedCity && selectedSpot && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink 
                        onClick={() => setSelectedSpot(null)}
                        className="cursor-pointer"
                      >
                        <Badge 
                          variant="outline" 
                          className="gap-2 py-1.5 px-3 hover:bg-primary/5 hover:border-primary/40 text-muted-foreground transition-colors rounded-md"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          {selectedCity}
                        </Badge>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}

                {selectedSpot && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <Badge 
                        variant="outline" 
                        className="gap-2 py-1.5 px-3 bg-primary/10 border-transparent text-primary rounded-md"
                      >
                        <Waves className="w-3.5 h-3.5" />
                        {selectedSpot.name}
                      </Badge>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        )}

        {/* Detalhes do Pico */}
        {selectedSpot ? (
          <SpotDetails 
            spot={selectedSpot} 
            onBack={() => setSelectedSpot(null)}
          />
        ) : (
          <>
            {/* Busca Global de Picos */}
            {!selectedState && globalSpots.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-6">Picos encontrados ({globalSpots.length})</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {globalSpots.map((spot, index) => (
                    <motion.div
                      key={spot.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <SpotCard
                        spot={spot}
                        onClick={() => {
                          setSelectedState(spot.state);
                          setSelectedCity(spot.city);
                          setSelectedSpot(spot);
                          setSearchQuery("");
                          // Track no Mixpanel (busca global)
                          trackSpotClicked(spot.name, spot.city, spot.state);
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Lista de Estados */}
            {!selectedState && filteredStates.length > 0 && (
              <div className={globalSpots.length > 0 ? "mb-8" : ""}>
                <h2 className="mb-6">{searchQuery ? "Estados encontrados" : "Selecione um Estado"}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredStates.map((state, index) => {
                    const totalSpots = state.cities.reduce(
                      (acc, city) =>
                        acc +
                        city.beaches.reduce(
                          (beachAcc, beach) => beachAcc + beach.spots.length,
                          0
                        ),
                      0
                    );

                    return (
                      <motion.div
                        key={state.code}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card
                          className="p-6 md:hover:border-accent md:hover:shadow-lg transition-all cursor-pointer border border-border rounded-[16px] active:scale-[0.98] bg-white"
                          onClick={() => handleStateClick(state.code)}
                          style={{ touchAction: 'manipulation' }}
                        >
                          <div className="flex flex-col gap-3">
                            <h3 className="text-foreground text-[18px]">{state.name}</h3>
                            <Badge className="bg-accent text-primary border-0 w-fit text-[12px] font-bold px-3 py-1 rounded-[2px]">
                              {totalSpots} picos
                            </Badge>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Lista de Cidades */}
            {selectedState && !selectedCity && (
              <div>
                <h2 className="mb-4">Cidades - {brazilianSurfSpots.find(s => s.code === selectedState)?.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredCities.map((city, index) => {
                    const totalSpots = city.beaches.reduce(
                      (acc, beach) => acc + (beach?.spots?.length || 0),
                      0
                    );

                    return (
                      <motion.div
                        key={`${city.state}-${city.name}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card
                          className="p-6 md:hover:border-accent md:hover:shadow-lg transition-all cursor-pointer border border-border rounded-[16px] active:scale-[0.98] bg-white"
                          onClick={() => handleCityClick(city.name)}
                          style={{ touchAction: 'manipulation' }}
                        >
                          <div className="flex flex-col gap-3">
                            <h3 className="text-foreground text-[18px]">{city.name}</h3>
                            <Badge className="bg-accent text-primary border-0 w-fit text-[12px] font-bold px-3 py-1 rounded-[2px]">
                              {totalSpots} picos
                            </Badge>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Lista de Picos */}
            {selectedCity && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
                  <h2 className="mb-0">Picos - {selectedCity}</h2>
                  
                  {/* Filtro de Nível */}
                  <div className="flex flex-col gap-1">
                    <div>
                      <p className="text-sm text-muted-foreground">Picos com horários ideais para:</p>
                    </div>
                    <div 
                      className="flex gap-2 overflow-x-auto scrollbar-hide"
                      {...dragScrollProps}
                    >
                      <Badge 
                        className={`cursor-pointer transition-all px-3 py-1.5 text-sm whitespace-nowrap flex-shrink-0 rounded-full ${
                          levelFilter === "all" 
                            ? "bg-[#001f3d] text-white border-0" 
                            : "bg-transparent text-muted-foreground border border-border hover:border-[#001f3d]"
                        }`}
                        onClick={() => handleLevelFilterChange("all")}
                      >
                        Todos
                      </Badge>
                      <Badge 
                        className={`cursor-pointer transition-all px-3 py-1.5 text-sm whitespace-nowrap flex-shrink-0 rounded-full ${
                          levelFilter === "beginner" 
                            ? "bg-green-600 text-white border-0" 
                            : "bg-transparent text-muted-foreground border border-border hover:border-green-600"
                        }`}
                        onClick={() => handleLevelFilterChange("beginner")}
                      >
                        Iniciantes
                      </Badge>
                      <Badge 
                        className={`cursor-pointer transition-all px-3 py-1.5 text-sm whitespace-nowrap flex-shrink-0 rounded-full ${
                          levelFilter === "intermediate" 
                            ? "bg-yellow-600 text-white border-0" 
                            : "bg-transparent text-muted-foreground border border-border hover:border-yellow-600"
                        }`}
                        onClick={() => handleLevelFilterChange("intermediate")}
                      >
                        Intermediários
                      </Badge>
                      <Badge 
                        className={`cursor-pointer transition-all px-3 py-1.5 text-sm whitespace-nowrap flex-shrink-0 rounded-full ${
                          levelFilter === "advanced" 
                            ? "bg-red-600 text-white border-0" 
                            : "bg-transparent text-muted-foreground border border-border hover:border-red-600"
                        }`}
                        onClick={() => handleLevelFilterChange("advanced")}
                      >
                        Avançados
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Indicador de carregamento */}
                {loadingForecasts && levelFilter !== "all" && (
                  <motion.div 
                    className="mb-4 p-4 bg-muted rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="flex items-center justify-center gap-3">
                      {/* Ícone de ondas animado */}
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Waves className="w-5 h-5 text-accent" />
                      </motion.div>
                      
                      <p className="text-sm text-muted-foreground">
                        Verificando horários ideais para {levelFilter === "beginner" ? "iniciantes" : levelFilter === "intermediate" ? "intermediários" : "avançados"}
                        <span className="inline-flex ml-1">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.3,
                                ease: "easeInOut"
                              }}
                            >
                              .
                            </motion.span>
                          ))}
                        </span>
                      </p>
                    </div>
                    
                    {/* Barra de progresso animada */}
                    <motion.div 
                      className="mt-3 h-1 bg-border rounded-full overflow-hidden"
                    >
                      <motion.div
                        className="h-full bg-accent"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{ width: "50%" }}
                      />
                    </motion.div>
                  </motion.div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredSpots.map((spot, index) => (
                    <motion.div
                      key={spot.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <SpotCard
                        spot={spot}
                        onClick={() => {
                          setSelectedSpot(spot);
                          // Track no Mixpanel
                          trackSpotClicked(spot.name, selectedCity || '', selectedState || '');
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
                
                {/* Mensagem quando não há picos com horários ideais */}
                {!loadingForecasts && levelFilter !== "all" && filteredSpots.length === 0 && spots.length > 0 && (
                  <div className="flex flex-col items-center gap-4 py-8">
                    <div className="bg-muted/50 rounded-full p-4">
                      <Waves className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-foreground text-lg" style={{ fontWeight: 600 }}>
                        Sem horários ideais para {levelFilter === "beginner" ? "iniciantes" : levelFilter === "intermediate" ? "intermediários" : "avançados"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Não encontramos condições favoráveis nos próximos 7 dias para este nível.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Tente selecionar outro nível ou consulte todos os picos disponíveis.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mensagem quando não há resultados */}
            {searchQuery && !selectedState && filteredStates.length === 0 && globalSpots.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum resultado encontrado para "{searchQuery}"</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer Padrão */}
      <Footer />
    </div>
  );
}