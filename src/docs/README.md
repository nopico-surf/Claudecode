# 📚 Documentação do Sistema de Ondas Brasil

Esta pasta contém toda a documentação técnica do projeto organizada por categorias.

## 🎯 Guias Rápidos

- **[📊 Mixpanel Analytics](./MIXPANEL_TRACKING.md)** - Tracking de eventos e comportamento do usuário
- **[🔧 Supabase Inatividade](./SUPABASE_INATIVIDADE.md)** - Por que o Supabase pausava e como foi resolvido

## 📂 Estrutura

### `/apis/` - Integrações de APIs
Documentação sobre todas as APIs de dados oceanográficos integradas ao sistema.

- COPERNICUS Marine Service
- Open-Meteo Marine
- NOAA WaveWatch III
- Weatherbit Marine
- StormGlass
- Meteoblue

### `/bugs/` - Correções de Bugs
Histórico de bugs encontrados e corrigidos no sistema.

- Correções de proteção geográfica
- Ajustes de orientação de praias
- Fixes de ventos terral/maral

### `/changelogs/` - Histórico de Versões
Registro de todas as mudanças e atualizações do sistema.

- Versão 4.7.x
- Resumos executivos
- Sumários de mudanças

### `/guides/` - Guias de Uso
Tutoriais e instruções para usar e debugar o sistema.

- Como comparar APIs
- Como investigar bugs
- Guia de debug visual
- Quick starts

### `/analysis/` - Análises e Validações
Análises técnicas, validações e testes realizados.

- Análises de orientações
- Validações de APIs
- Testes comparativos

### `/features/` - Documentação de Features
Explicação detalhada das funcionalidades do sistema.

- Detecção automática de orientação
- Seleção inteligente de swell
- Sistema de proteção geográfica
- Cálculo automático terral/maral

### `/debug/` - Ferramentas de Debug
Scripts e painéis para debugging e troubleshooting.

- Debug panels
- Console logs
- Verificações automáticas

### `/archive/` - Arquivos Antigos
Documentação deprecada ou substituída (mantida para referência histórica).

---

## 🔍 Índice Rápido

### Começar a usar
- [Guia Completo](./guides/GUIA_COMPLETO_ORIENTACOES.md)
- [Quick Start](./guides/QUICK_START_SELECAO_SWELL.md)

### Debugging
- [Guia de Debug](./guides/GUIA_DEBUG_VISUAL.md)
- [Debug Console](./guides/GUIA_DEBUG_CONSOLE.md)

### APIs
- [Comparar APIs](./guides/COMO_COMPARAR_APIS.md)
- [Status das APIs](./apis/STATUS_APIS.md)
- [COPERNICUS Integration](./apis/COPERNICUS_INTEGRATION.md)

### Versões
- [Changelog v4.7.2](./changelogs/CHANGELOG_V4.7.2.md)
- [Sumário v4.7.2](./changelogs/SUMARIO_V4.7.2.md)

---

## 📊 Estatísticas do Sistema

- **200+ picos** de surf em todo o Brasil
- **5 APIs** de dados oceanográficos integradas
- **Detecção automática** de orientação de praias
- **Sistema inteligente** de seleção de swell
- **Proteção geográfica** por ilhas e formações

---

## 🛠️ Tecnologias

- **Frontend**: React + TypeScript + Tailwind CSS
- **APIs**: Open-Meteo, NOAA, Weatherbit, StormGlass, Meteoblue, COPERNICUS
- **Dados**: Forecast de ondas, ventos, maré, temperatura
- **Geografia**: Batimetria, ilhas, proteções naturais

---

**Última atualização**: 22/10/2025
