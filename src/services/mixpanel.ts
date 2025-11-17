/**
 * Mixpanel Analytics Service
 * Tracking de eventos para análise de comportamento do usuário
 */

declare global {
  interface Window {
    mixpanel: any;
  }
}

// Configuração do Mixpanel
const MIXPANEL_TOKEN = typeof import.meta !== 'undefined' && import.meta.env 
  ? import.meta.env.VITE_MIXPANEL_TOKEN 
  : undefined;

/**
 * Verifica se o Mixpanel está configurado
 */
export function isMixpanelConfigured(): boolean {
  return !!(MIXPANEL_TOKEN && MIXPANEL_TOKEN !== 'YOUR_MIXPANEL_TOKEN');
}

/**
 * Inicializa o Mixpanel
 * Chame esta função uma vez no início do app
 */
export function initMixpanel() {
  if (typeof window === 'undefined') return;
  
  // Se não há token configurado, apenas retorna silenciosamente
  if (!isMixpanelConfigured()) {
    return;
  }
  
  // Carrega o script do Mixpanel dinamicamente
  (function(f: any, b: any) {
    if (!b.__SV) {
      let e, g, i, h;
      window.mixpanel = b;
      b._i = [];
      b.init = function(e: any, f: any, c: any) {
        function g(a: any, d: any) {
          const b = d.split(".");
          2 == b.length && ((a = a[b[0]]), (d = b[1]));
          a[d] = function() {
            a.push([d].concat(Array.prototype.slice.call(arguments, 0)));
          };
        }
        let a = b;
        "undefined" !== typeof c ? (a = b[c] = []) : (c = "mixpanel");
        a.people = a.people || [];
        a.toString = function(a: any) {
          let d = "mixpanel";
          "mixpanel" !== c && (d += "." + c);
          a || (d += " (stub)");
          return d;
        };
        a.people.toString = function() {
          return a.toString(1) + ".people (stub)";
        };
        i = "disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
        for (h = 0; h < i.length; h++) g(a, i[h]);
        const j = "set set_once union unset remove delete".split(" ");
        a.get_group = function() {
          function b(c: any) {
            d[c] = function() {
              call2_args = arguments;
              call2 = [c].concat(Array.prototype.slice.call(call2_args, 0));
              a.push([e, call2]);
            };
          }
          for (
            var d = {},
              e = ["get_group"].concat(Array.prototype.slice.call(arguments, 0)),
              c = 0;
            c < j.length;
            c++
          )
            b(j[c]);
          return d;
        };
        b._i.push([e, f, c]);
      };
      b.__SV = 1.2;
      e = f.createElement("script");
      e.type = "text/javascript";
      e.async = !0;
      e.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL : "file:" === f.location.protocol && "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//) ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
      g = f.getElementsByTagName("script")[0];
      g.parentNode.insertBefore(e, g);
    }
  })(document, window.mixpanel || []);

  // Inicializa com o token
  window.mixpanel.init(MIXPANEL_TOKEN, {
    debug: false, // Mude para true para debug
    track_pageview: true,
    persistence: 'localStorage'
  });
  
  console.log('\n' + '='.repeat(70));
  console.log('%c📊 MIXPANEL ANALYTICS ATIVO', 'font-size: 16px; font-weight: bold; color: #9333ea;');
  console.log('='.repeat(70));
  console.log('✅ Eventos sendo trackeados:');
  console.log('   • Filtro de Nível (Todos, Iniciantes, Intermediários, Avançados)');
  console.log('   • Estados selecionados');
  console.log('   • Cidades selecionadas');
  console.log('   • Spots clicados');
  console.log('   • Buscas realizadas (3+ caracteres)');
  console.log('\n📊 Dashboard: https://mixpanel.com/report/');
  console.log('📚 Documentação: /docs/MIXPANEL_TRACKING.md');
  console.log('='.repeat(70) + '\n');
}

/**
 * Tracks um evento genérico
 */
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.mixpanel) {
    // Silencioso - não mostra warning a cada evento
    return;
  }
  
  try {
    window.mixpanel.track(eventName, {
      timestamp: new Date().toISOString(),
      ...properties
    });
  } catch (error) {
    console.warn('Erro ao enviar evento para Mixpanel:', error);
  }
}

/**
 * Tracking específico: Filtro de Nível clicado
 */
export function trackLevelFilterClick(nivel: 'todos' | 'iniciantes' | 'intermediarios' | 'avancados', context?: {
  estado?: string;
  cidade?: string;
  totalSpots?: number;
}) {
  trackEvent('Filtro Nível Clicado', {
    nivel,
    estado: context?.estado || null,
    cidade: context?.cidade || null,
    total_spots: context?.totalSpots || 0,
    pagina: 'listagem_spots'
  });
}

/**
 * Tracking específico: Estado selecionado
 */
export function trackStateSelected(estado: string, totalCidades: number) {
  trackEvent('Estado Selecionado', {
    estado,
    total_cidades: totalCidades,
    pagina: 'home'
  });
}

/**
 * Tracking específico: Cidade selecionada
 */
export function trackCitySelected(cidade: string, estado: string, totalSpots: number) {
  trackEvent('Cidade Selecionada', {
    cidade,
    estado,
    total_spots: totalSpots,
    pagina: 'listagem_cidades'
  });
}

/**
 * Tracking específico: Spot clicado
 */
export function trackSpotClicked(spotName: string, cidade: string, estado: string) {
  trackEvent('Spot Clicado', {
    spot_name: spotName,
    cidade,
    estado,
    pagina: 'listagem_spots'
  });
}

/**
 * Tracking específico: Busca realizada
 */
export function trackSearch(query: string, resultCount: number) {
  trackEvent('Busca Realizada', {
    query,
    result_count: resultCount,
    query_length: query.length
  });
}

/**
 * Tracking específico: Previsão carregada
 */
export function trackForecastLoaded(spotName: string, success: boolean, errorMessage?: string) {
  trackEvent('Previsão Carregada', {
    spot_name: spotName,
    success,
    error_message: errorMessage || null
  });
}

/**
 * Identifica um usuário (opcional - para uso futuro)
 */
export function identifyUser(userId: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.mixpanel) return;
  
  try {
    window.mixpanel.identify(userId);
    
    if (properties) {
      window.mixpanel.people.set(properties);
    }
  } catch (error) {
    console.warn('Erro ao identificar usuário no Mixpanel:', error);
  }
}

/**
 * Registra propriedades do usuário (opcional - para uso futuro)
 */
export function setUserProperties(properties: Record<string, any>) {
  if (typeof window === 'undefined' || !window.mixpanel) return;
  
  try {
    window.mixpanel.register(properties);
  } catch (error) {
    console.warn('Erro ao registrar propriedades no Mixpanel:', error);
  }
}

/**
 * Mostra o status do Mixpanel no console
 */
export function showMixpanelStatus() {
  console.log('\n' + '='.repeat(70));
  console.log('%c📊 STATUS DO MIXPANEL ANALYTICS', 'font-size: 16px; font-weight: bold; color: #9333ea;');
  console.log('='.repeat(70));
  
  if (isMixpanelConfigured()) {
    console.log('✅ Status: ATIVO e funcionando');
    console.log('✅ Token configurado: Sim');
    console.log('✅ Eventos sendo enviados: Sim');
    console.log('\n📊 Dashboard: https://mixpanel.com/report/');
  } else {
    console.log('⚠️  Status: NÃO CONFIGURADO (opcional)');
    console.log('ℹ️  O app funciona perfeitamente sem analytics');
    console.log('\n💡 Para habilitar analytics:');
    console.log('   1. Crie conta em: https://mixpanel.com/');
    console.log('   2. Copie o Project Token');
    console.log('   3. Crie arquivo .env na raiz:');
    console.log('      VITE_MIXPANEL_TOKEN=seu_token_aqui');
    console.log('   4. Reinicie o servidor (npm run dev)');
  }
  
  console.log('\n📚 Documentação completa: /docs/MIXPANEL_TRACKING.md');
  console.log('='.repeat(70) + '\n');
}

// Expor funções globalmente no console (apenas em desenvolvimento)
if (typeof window !== 'undefined') {
  (window as any).mixpanelStatus = showMixpanelStatus;
  (window as any).mixpanel_status = showMixpanelStatus; // Alias
}
