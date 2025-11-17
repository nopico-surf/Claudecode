import { State, City, Beach, Spot } from "../types/surf";

/**
 * NOVOS PICOS PARA ADICIONAR
 * Este arquivo contém todos os novos picos organizados por estado
 */

// ========================================
// MARANHÃO - Adicionar Atins
// ========================================
export const MA_NEW_BEACHES: Beach[] = [
  {
    name: "Praia de Atins",
    city: "Barreirinhas",
    state: "MA",
    spots: [
      {
        id: "ma-barreirinhas-atins-1",
        name: "Atins",
        beach: "Praia de Atins",
        city: "Barreirinhas",
        state: "MA",
        latitude: -2.5500,
        longitude: -42.8000,
        beachOrientation: 50, // Nordeste - costa exposta ao oceano
        levels: { beginner: true, intermediate: true, advanced: false },
        description: "Praia selvagem nos Lençóis Maranhenses. Acesso por barco.",
        bestSeason: ["Verão", "Primavera"],
      },
    ],
  },
];

// ========================================
// PIAUÍ - Adicionar Parnaíba
// ========================================
export const PI_NEW_CITIES: City[] = [
  {
    name: "Parnaíba",
    state: "PI",
    beaches: [
      {
        name: "Praia de Pedra do Sal",
        city: "Parnaíba",
        state: "PI",
        spots: [
          {
            id: "pi-parnaiba-pedradosal-1",
            name: "Pedra do Sal",
            beach: "Praia de Pedra do Sal",
            city: "Parnaíba",
            state: "PI",
            latitude: -2.9000,
            longitude: -41.7500,
            beachOrientation: 40, // Nordeste
            levels: { beginner: true, intermediate: true, advanced: true },
            description: "Principal pico do Piauí. Ondas consistentes e point break de direita.",
            bestSeason: ["Verão", "Outono", "Primavera"],
          },
        ],
      },
    ],
  },
];

// ========================================
// CEARÁ - Adicionar Taíba e Icaraizinho
// ========================================
export const CE_NEW_BEACHES: Beach[] = [
  {
    name: "Praia da Taíba",
    city: "Paracuru",
    state: "CE",
    spots: [
      {
        id: "ce-paracuru-taiba-1",
        name: "Praia da Taíba",
        beach: "Praia da Taíba",
        city: "Paracuru",
        state: "CE",
        latitude: -3.5833,
        longitude: -38.9167,
        beachOrientation: 60, // Nordeste - costa exposta
        levels: { beginner: false, intermediate: true, advanced: true },
        description: "Praia famosa por kitesurf e ondas fortes. Consistente o ano todo.",
        bestSeason: ["Verão", "Outono", "Inverno", "Primavera"],
      },
    ],
  },
];

export const CE_NEW_CITIES: City[] = [
  {
    name: "Icaraí de Amontada",
    state: "CE",
    beaches: [
      {
        name: "Praia de Icaraizinho",
        city: "Icaraí de Amontada",
        state: "CE",
        spots: [
          {
            id: "ce-icarai-icaraizinho-1",
            name: "Icaraizinho",
            beach: "Praia de Icaraizinho",
            city: "Icaraí de Amontada",
            state: "CE",
            latitude: -2.9000,
            longitude: -39.8500,
            beachOrientation: 50, // Nordeste
            levels: { beginner: true, intermediate: true, advanced: true },
            description: "Praia selvagem e deserta. Ondas para todos os níveis.",
            bestSeason: ["Verão", "Outono", "Inverno", "Primavera"],
          },
        ],
      },
    ],
  },
];

// ========================================
// RIO GRANDE DO NORTE - Adicionar Baía Formosa e Genipabu
// ========================================
export const RN_NEW_CITIES: City[] = [
  {
    name: "Baía Formosa",
    state: "RN",
    beaches: [
      {
        name: "Praia de Baía Formosa",
        city: "Baía Formosa",
        state: "RN",
        spots: [
          {
            id: "rn-baiaformosa-1",
            name: "Baía Formosa",
            beach: "Praia de Baía Formosa",
            city: "Baía Formosa",
            state: "RN",
            latitude: -6.3667,
            longitude: -35.0000,
            beachOrientation: 100, // Leste
            levels: { beginner: true, intermediate: true, advanced: true },
            description: "Base do Italo Ferreira. Pico clássico do RN com ondas consistentes.",
            bestSeason: ["Verão", "Outono", "Inverno", "Primavera"],
          },
        ],
      },
    ],
  },
  {
    name: "Extremoz",
    state: "RN",
    beaches: [
      {
        name: "Praia de Genipabu",
        city: "Extremoz",
        state: "RN",
        spots: [
          {
            id: "rn-extremoz-genipabu-1",
            name: "Genipabu",
            beach: "Praia de Genipabu",
            city: "Extremoz",
            state: "RN",
            latitude: -5.6833,
            longitude: -35.2000,
            beachOrientation: 90, // Leste
            levels: { beginner: true, intermediate: true, advanced: false },
            description: "Praia famosa pelas dunas. Ondas acessíveis.",
            bestSeason: ["Verão", "Outono", "Primavera"],
          },
        ],
      },
    ],
  },
];

// ========================================
// PERNAMBUCO - Adicionar Serrambi e Enseada dos Corais
// ========================================
export const PE_NEW_BEACHES: Beach[] = [
  {
    name: "Praia de Serrambi",
    city: "Ipojuca",
    state: "PE",
    spots: [
      {
        id: "pe-ipojuca-serrambi-1",
        name: "Serrambi",
        beach: "Praia de Serrambi",
        city: "Ipojuca",
        state: "PE",
        latitude: -8.6667,
        longitude: -35.0500,
        beachOrientation: 110, // Leste-Sudeste
        levels: { beginner: false, intermediate: true, advanced: true },
        description: "Praia tranquila com ondas tubulares. Recifes de coral.",
        bestSeason: ["Outono", "Inverno"],
      },
    ],
  },
];

export const PE_NEW_CITIES: City[] = [
  {
    name: "Cabo de Santo Agostinho",
    state: "PE",
    beaches: [
      {
        name: "Enseada dos Corais",
        city: "Cabo de Santo Agostinho",
        state: "PE",
        spots: [
          {
            id: "pe-cabo-enseada-1",
            name: "Enseada dos Corais",
            beach: "Enseada dos Corais",
            city: "Cabo de Santo Agostinho",
            state: "PE",
            latitude: -8.3333,
            longitude: -35.0333,
            beachOrientation: 120, // Leste-Sudeste
            levels: { beginner: true, intermediate: true, advanced: false },
            description: "Praia protegida com águas calmas e ondas suaves.",
            bestSeason: ["Verão", "Primavera"],
          },
        ],
      },
    ],
  },
];

// Continue o arquivo com os outros estados...
// (devido ao tamanho, dividi em múltiplos exports)
