# 🌊 NoPico - Previsão de Ondas por Nível de Surf

Sistema completo de previsão de ondas para 223 picos de surf em todo o Brasil, com classificação por nível de habilidade e integração com dados reais de boias oceanográficas.

## 🎯 Características

- **223 picos** distribuídos por todo Brasil
- **Classificação automática** por nível:
  - 🟢 Iniciante: 0.3-0.7m
  - 🟡 Intermediário: 0.5-1.7m
  - 🔴 Avançado: acima de 1.0m
- **Dados reais** das boias PNBOIA (Marinha do Brasil)
- **Calibração automática** baseada em observações reais
- **Dashboard administrativo** completo para análise e calibração
- **Design responsivo** baseado no padrão World Surf League

## 🛠️ Tecnologias

- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Supabase Edge Functions + Hono
- **APIs:** Open-Meteo Marine, PNBOIA, StormGlass
- **Deploy:** Figma Make + Vercel (serverless functions)

## 🚀 Estrutura do Projeto

```
/
├── api/                    # Vercel Serverless Functions (PNBOIA)
├── components/             # Componentes React
│   ├── admin/             # Dashboard administrativo
│   └── ui/                # Componentes base
├── data/                   # Dados dos picos e calibração
├── services/              # Integrações com APIs
├── supabase/              # Edge Functions
└── types/                 # Definições TypeScript
```

## 🔐 Admin Dashboard

Acesse `/admin` com senha: `Limao@32949`

Funcionalidades:
- Registrar observações reais vs previsões
- Análise estatística de precisão
- Calibração automática por pico
- Monitoramento de boias PNBOIA
- Logs do sistema

## 📊 APIs Utilizadas

1. **Open-Meteo Marine** - Previsões base de ondas
2. **PNBOIA** - Dados reais das 14 boias oceanográficas
3. **StormGlass** - Backup e validação de dados

## 🌐 Deploy

- **Frontend:** Figma Make
- **Backend boias:** Vercel Serverless Functions
- **Database:** Supabase PostgreSQL
- **Edge Functions:** Supabase

## 📝 Licença

Uso pessoal - NoPico Surf © 2025
