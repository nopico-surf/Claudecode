// ════════════════════════════════════════════════════════════════════
// 🤖 PARSER INTELIGENTE DE OBSERVAÇÕES
// ════════════════════════════════════════════════════════════════════
// Entende linguagem natural e extrai dados automaticamente
// ════════════════════════════════════════════════════════════════════

import { brazilianSurfSpots } from '../../data/spots';
import { spotWaveAdjustments } from '../../data/spotWaveAdjustments';

export interface ParsedObservation {
  spotId: string;
  spotName: string;
  timestamp: string;
  observedHeight: number;
  notes: string;
  rawInput: string;
  confidence: number; // 0-100%
  warnings: string[];
}

// ════════════════════════════════════════════════════════════════════
// 📍 DETECTAR PICO
// ════════════════════════════════════════════════════════════════════

const SPOT_ALIASES: Record<string, string[]> = {
  'Lomba do Sabão': ['lomba', 'lomba do sabao', 'lomba sabao', 'lomba do sabão'],
  'Novo Campeche': ['novo campeche', 'campeche novo', 'n campeche', 'novo camp'],
  'Campeche': ['campeche', 'camp'],
  'Morro das Pedras': ['morro das pedras', 'morro pedras', 'morropedras', 'morro'],
  'Joaquina': ['joaquina', 'joaca', 'joca'],
  'Praia Mole': ['mole', 'praia mole'],
  'Barra da Lagoa': ['barra', 'barra da lagoa'],
  'Santinho': ['santinho'],
  'Ingleses': ['ingleses'],
  'Palanque': ['palanque'],
};

function detectSpot(text: string): { spotId: string; spotName: string; confidence: number } | null {
  const lowerText = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  console.log('🔍 Detectando pico no texto:', lowerText);
  
  // Procurar por aliases
  for (const [officialName, aliases] of Object.entries(SPOT_ALIASES)) {
    for (const alias of aliases) {
      const normalizedAlias = alias.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (lowerText.includes(normalizedAlias)) {
        console.log('✅ Alias encontrado:', alias, '→', officialName);
        
        // Encontrar o spot no banco de dados
        const allSpots = brazilianSurfSpots
          .filter(state => state && state.cities)
          .flatMap(state => 
            state.cities
              .filter(city => city && city.beaches)
              .flatMap(city => 
                city.beaches
                  .filter(beach => beach && beach.spots)
                  .flatMap(beach =>
                    beach.spots
                      .filter(spot => spot && spot.id && spot.name)
                      .map(spot => ({
                        id: spot.id,
                        name: spot.name
                      }))
                  )
              )
          );
        
        const spot = allSpots.find(s => s && s.name === officialName);
        
        if (spot && spot.id && spot.name) {
          console.log('✅ Spot encontrado:', spot);
          return {
            spotId: spot.id,
            spotName: spot.name,
            confidence: 95
          };
        } else {
          console.warn('⚠️ Spot não encontrado para:', officialName);
        }
      }
    }
  }
  
  // Procurar por nome exato
  const allSpots = brazilianSurfSpots
    .filter(state => state && state.cities)
    .flatMap(state => 
      state.cities
        .filter(city => city && city.beaches)
        .flatMap(city => 
          city.beaches
            .filter(beach => beach && beach.spots)
            .flatMap(beach =>
              beach.spots
                .filter(spot => spot && spot.id && spot.name)
                .map(spot => ({
                  id: spot.id,
                  name: spot.name
                }))
            )
        )
    );
  
  const spot = allSpots.find(s => {
    if (!s || !s.name) return false;
    const normalizedSpotName = s.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return lowerText.includes(normalizedSpotName);
  });
  
  if (spot && spot.id && spot.name) {
    console.log('✅ Spot encontrado por nome exato:', spot);
    return {
      spotId: spot.id,
      spotName: spot.name,
      confidence: 90
    };
  }
  
  console.warn('❌ Nenhum spot encontrado');
  return null;
}

// ════════════════════════════════════════════════════════════════════
// ⏰ DETECTAR HORÁRIO
// ════════════════════════════════════════════════════════════════════

function detectTime(text: string): { time: string; confidence: number } | null {
  const patterns = [
    /(\d{1,2})[h:](\d{2})/i,           // 05h20, 5:20
    /(\d{1,2})h/i,                      // 5h
    /às\s*(\d{1,2})[h:]?(\d{2})?/i,    // às 05h20
    /(\d{1,2}):(\d{2})/,                // 05:20
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const hours = match[1].padStart(2, '0');
      const minutes = (match[2] || '00').padStart(2, '0');
      return {
        time: `${hours}:${minutes}`,
        confidence: 90
      };
    }
  }
  
  return null;
}

// ════════════════════════════════════════════════════════════════════
// 📏 DETECTAR ALTURA
// ════════════════════════════════════════════════════════════════════

function detectHeight(text: string): { height: number; confidence: number } | null {
  const patterns = [
    /(\d+[,.]?\d*)\s*m(?:etros)?/i,              // 0.56m, 0,56m, 56 metros
    /(\d+)\s*cm/i,                                // 56cm
    /altura[:\s]+(\d+[,.]?\d*)/i,                // altura: 0.56
    /tem\s+(\d+[,.]?\d*)\s*m/i,                  // tem 0.56m
    /(\d+[,.]?\d*)\s*m\s+em\s+média/i,           // 0.56m em média
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      let height = parseFloat(match[1].replace(',', '.'));
      
      // Se está em cm, converter para metros
      if (text.match(/cm/i)) {
        height = height / 100;
      }
      
      return {
        height: parseFloat(height.toFixed(2)),
        confidence: 95
      };
    }
  }
  
  return null;
}

// ════════════════════════════════════════════════════════════════════
// 📝 EXTRAIR NOTAS/CONDIÇÕES
// ════════════════════════════════════════════════════════════════════

function extractNotes(text: string): string {
  // Remover informações já extraídas
  let notes = text;
  
  // Remover nome do pico
  for (const aliases of Object.values(SPOT_ALIASES)) {
    for (const alias of aliases) {
      notes = notes.replace(new RegExp(alias, 'gi'), '');
    }
  }
  
  // Remover horários
  notes = notes.replace(/(\d{1,2})[h:](\d{2})/gi, '');
  notes = notes.replace(/às\s*\d{1,2}[h:]?\d{0,2}/gi, '');
  
  // Remover alturas
  notes = notes.replace(/(\d+[,.]?\d*)\s*m(?:etros)?/gi, '');
  notes = notes.replace(/\d+\s*cm/gi, '');
  
  // Remover palavras conectoras no início
  notes = notes.replace(/^[,\s]*hoje\s*/i, '');
  notes = notes.replace(/^[,\s]*tem\s*/i, '');
  notes = notes.replace(/^[,\s]*em\s+média\s*/i, '');
  
  // Limpar espaços extras
  notes = notes.replace(/\s+/g, ' ').trim();
  notes = notes.replace(/^[,\s]+|[,\s]+$/g, '');
  
  return notes || 'Observação registrada';
}

// ════════════════════════════════════════════════════════════════════
// 📅 CONSTRUIR TIMESTAMP
// ════════════════════════════════════════════════════════════════════

function buildTimestamp(timeStr: string): string {
  const today = new Date();
  const [hours, minutes] = timeStr.split(':');
  today.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  return today.toISOString();
}

// ════════════════════════════════════════════════════════════════════
// 🎯 PARSER PRINCIPAL
// ════════════════════════════════════════════════════════════════════

export function parseObservation(input: string): ParsedObservation | null {
  const warnings: string[] = [];
  let totalConfidence = 0;
  let confidenceCount = 0;
  
  // Detectar pico
  const spotResult = detectSpot(input);
  if (!spotResult) {
    return null; // Não conseguiu identificar o pico
  }
  totalConfidence += spotResult.confidence;
  confidenceCount++;
  
  // Detectar horário
  const timeResult = detectTime(input);
  if (!timeResult) {
    warnings.push('Horário não detectado - usando horário atual');
  } else {
    totalConfidence += timeResult.confidence;
    confidenceCount++;
  }
  
  // Detectar altura
  const heightResult = detectHeight(input);
  if (!heightResult) {
    return null; // Altura é obrigatória
  }
  totalConfidence += heightResult.confidence;
  confidenceCount++;
  
  // Extrair notas
  const notes = extractNotes(input);
  
  // Construir timestamp
  const timestamp = timeResult 
    ? buildTimestamp(timeResult.time)
    : new Date().toISOString();
  
  // Calcular confiança média
  const avgConfidence = Math.round(totalConfidence / confidenceCount);
  
  return {
    spotId: spotResult.spotId,
    spotName: spotResult.spotName,
    timestamp,
    observedHeight: heightResult.height,
    notes,
    rawInput: input,
    confidence: avgConfidence,
    warnings
  };
}

// ════════════════════════════════════════════════════════════════════
// 🔄 PARSER MÚLTIPLAS OBSERVAÇÕES
// ════════════════════════════════════════════════════════════════════

export function parseMultipleObservations(input: string): ParsedObservation[] {
  // Dividir por linhas
  const lines = input.split('\n').filter(line => line.trim().length > 0);
  
  const results: ParsedObservation[] = [];
  
  for (const line of lines) {
    const parsed = parseObservation(line);
    if (parsed) {
      results.push(parsed);
    }
  }
  
  return results;
}

// ════════════════════════════════════════════════════════════════════
// 🧪 EXEMPLOS DE USO
// ════════════════════════════════════════════════════════════════════

/*
EXEMPLOS QUE FUNCIONAM:

✅ "Lomba do Sabão, hoje às 05h20, tem 0,56m em média, formação regular, ondas cheias"
   → Pico: Lomba do Sabão
   → Hora: 05:20
   → Altura: 0.56m
   → Notas: "formação regular, ondas cheias"

✅ "Morro das Pedras | 06:15 | 0.8m | séries demoradas"
   → Pico: Morro das Pedras
   → Hora: 06:15
   → Altura: 0.8m
   → Notas: "séries demoradas"

✅ "Novo Campeche, 07:30, 1.0m, ondas rápidas"
   → Pico: Novo Campeche
   → Hora: 07:30
   → Altura: 1.0m
   → Notas: "ondas rápidas"

✅ "Joaquina 56cm formação regular"
   → Pico: Joaquina
   → Altura: 0.56m
   → Notas: "formação regular"

MÚLTIPLAS OBSERVAÇÕES:

✅ 
"Lomba do Sabão, 05:20, 0.56m, formação regular
Morro das Pedras, 06:15, 0.8m, séries demoradas
Novo Campeche, 07:30, 1.0m, ondas rápidas"
   → 3 observações parseadas automaticamente

*/
