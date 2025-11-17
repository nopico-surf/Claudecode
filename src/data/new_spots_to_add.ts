/**
 * NOVOS PICOS PARA ADICIONAR AO spots.ts
 * 
 * Instruções: Adicionar estes picos nos respectivos estados/cidades
 */

// ========================================
// MARANHÃO - Adicionar em Barreirinhas
// ========================================
const MA_ATINS = {
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
};

// ========================================
// PIAUÍ - Adicionar cidade Parnaíba
// ========================================
const PI_PARNAIBA = {
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
};

// ========================================
// CEARÁ - Adicionar em Paracuru
// ========================================
const CE_TAIBA = {
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
};

// ========================================
// CEARÁ - Adicionar cidade Icaraí de Amontada
// ========================================
const CE_ICARAIZINHO = {
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
};

// ========================================
// RIO GRANDE DO NORTE - Adicionar cidades
// ========================================
const RN_BAIA_FORMOSA = {
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
};

const RN_GENIPABU = {
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
};

// ========================================
// PERNAMBUCO - Adicionar em Ipojuca e Cabo
// ========================================
const PE_SERRAMBI = {
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
};

const PE_ENSEADA_CORAIS = {
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
};

// ========================================
// BAHIA - Adicionar novos picos
// ========================================
const BA_SERRA_GRANDE = {
  name: "Praia de Serra Grande",
  city: "Ilhéus",
  state: "BA",
  spots: [
    {
      id: "ba-ilheus-serragrande-1",
      name: "Serra Grande",
      beach: "Praia de Serra Grande",
      city: "Ilhéus",
      state: "BA",
      latitude: -14.4167,
      longitude: -39.0167,
      beachOrientation: 140, // Sudeste
      levels: { beginner: false, intermediate: true, advanced: true },
      description: "Praia selvagem entre Ilhéus e Itacaré. Ondas fortes.",
      bestSeason: ["Outono", "Inverno"],
    },
  ],
};

const BA_CUMURUXATIBA = {
  name: "Prado",
  state: "BA",
  beaches: [
    {
      name: "Praia de Cumuruxatiba",
      city: "Prado",
      state: "BA",
      spots: [
        {
          id: "ba-prado-cumuruxatiba-1",
          name: "Cumuruxatiba",
          beach: "Praia de Cumuruxatiba",
          city: "Prado",
          state: "BA",
          latitude: -17.1167,
          longitude: -39.2000,
          beachOrientation: 140, // Sudeste
          levels: { beginner: true, intermediate: true, advanced: false },
          description: "Vila de pescadores com ondas consistentes.",
          bestSeason: ["Outono", "Inverno", "Primavera"],
        },
      ],
    },
  ],
};

const BA_CARAIVA = {
  name: "Praia de Caraíva",
  city: "Porto Seguro",
  state: "BA",
  spots: [
    {
      id: "ba-portoseguro-caraiva-1",
      name: "Caraíva",
      beach: "Praia de Caraíva",
      city: "Porto Seguro",
      state: "BA",
      latitude: -16.7500,
      longitude: -39.1667,
      beachOrientation: 135, // Sudeste
      levels: { beginner: true, intermediate: true, advanced: false },
      description: "Vila rústica sem carros. Ondas tranquilas.",
      bestSeason: ["Outono", "Inverno", "Primavera"],
    },
  ],
};

const BA_SEGUNDA_PRAIA = {
  name: "Segunda Praia",
  city: "Morro de São Paulo",
  state: "BA",
  spots: [
    {
      id: "ba-morrosaopaulo-segunda-1",
      name: "Segunda Praia",
      beach: "Segunda Praia",
      city: "Morro de São Paulo",
      state: "BA",
      latitude: -13.3833,
      longitude: -38.9167,
      beachOrientation: 150, // Sudeste
      waveAttenuationFactor: 0.75, // Protegida pela Ilha de Tinharé
      levels: { beginner: true, intermediate: false, advanced: false },
      description: "Praia urbana e movimentada. Ondas pequenas protegidas pela geografia.",
      bestSeason: ["Verão", "Primavera"],
    },
  ],
};

// ========================================
// ESPÍRITO SANTO - Adicionar novos picos
// ========================================
const ES_REGENCIA = {
  name: "Praia de Regência",
  city: "Linhares",
  state: "ES",
  spots: [
    {
      id: "es-linhares-regencia-1",
      name: "Regência",
      beach: "Praia de Regência",
      city: "Linhares",
      state: "ES",
      latitude: -19.6667,
      longitude: -39.8333,
      beachOrientation: 130, // Sudeste
      levels: { beginner: false, intermediate: true, advanced: true },
      description: "Foz do Rio Doce. Point break clássico de direita.",
      bestSeason: ["Outono", "Inverno", "Primavera"],
    },
  ],
};

const ES_POVOACAO = {
  name: "Praia de Povoação",
  city: "Linhares",
  state: "ES",
  spots: [
    {
      id: "es-linhares-povoacao-1",
      name: "Povoação",
      beach: "Praia de Povoação",
      city: "Linhares",
      state: "ES",
      latitude: -19.8333,
      longitude: -40.0500,
      beachOrientation: 125, // Sudeste
      levels: { beginner: false, intermediate: true, advanced: true },
      description: "Praia selvagem com ondas potentes. Acesso difícil.",
      bestSeason: ["Outono", "Inverno"],
    },
  ],
};

const ES_UBU = {
  name: "Anchieta",
  state: "ES",
  beaches: [
    {
      name: "Praia de Ubu",
      city: "Anchieta",
      state: "ES",
      spots: [
        {
          id: "es-anchieta-ubu-1",
          name: "Ubu",
          beach: "Praia de Ubu",
          city: "Anchieta",
          state: "ES",
          latitude: -20.8000,
          longitude: -40.6167,
          beachOrientation: 135, // Sudeste
          levels: { beginner: true, intermediate: true, advanced: true },
          description: "Praia urbana com pier e ondas consistentes.",
          bestSeason: ["Outono", "Inverno", "Primavera"],
        },
      ],
    },
  ],
};

const ES_BARRA_JUCU = {
  name: "Praia da Barra do Jucu",
  city: "Vila Velha",
  state: "ES",
  spots: [
    {
      id: "es-vilavelha-barrajucu-1",
      name: "Barra do Jucu",
      beach: "Praia da Barra do Jucu",
      city: "Vila Velha",
      state: "ES",
      latitude: -20.6667,
      longitude: -40.5333,
      beachOrientation: 130, // Sudeste
      levels: { beginner: false, intermediate: true, advanced: true },
      description: "Pico lendário do ES. Point break de direita na foz do rio.",
      bestSeason: ["Outono", "Inverno", "Primavera"],
    },
  ],
};

// ========================================
// RIO DE JANEIRO - Adicionar novos picos
// ========================================
const RJ_FORNO = {
  name: "Praia do Forno",
  city: "Arraial do Cabo",
  state: "RJ",
  spots: [
    {
      id: "rj-arraial-forno-1",
      name: "Praia do Forno",
      beach: "Praia do Forno",
      city: "Arraial do Cabo",
      state: "RJ",
      latitude: -22.9667,
      longitude: -42.0167,
      beachOrientation: 180, // Sul
      levels: { beginner: true, intermediate: true, advanced: false },
      description: "Enseada paradisíaca. Acesso por trilha ou barco.",
      bestSeason: ["Outono", "Inverno"],
    },
  ],
};

const RJ_LOPES_MENDES = {
  name: "Ilha Grande",
  state: "RJ",
  beaches: [
    {
      name: "Praia de Lopes Mendes",
      city: "Ilha Grande",
      state: "RJ",
      spots: [
        {
          id: "rj-ilhagrande-lopesmendes-1",
          name: "Lopes Mendes",
          beach: "Praia de Lopes Mendes",
          city: "Ilha Grande",
          state: "RJ",
          latitude: -23.1667,
          longitude: -44.2333,
          beachOrientation: 180, // Sul - totalmente exposta ao oceano
          levels: { beginner: false, intermediate: true, advanced: true },
          description: "Considerada uma das praias mais bonitas do Brasil. Ondas fortes.",
          bestSeason: ["Outono", "Inverno"],
        },
      ],
    },
  ],
};

const RJ_BARRA_MARICA = {
  name: "Maricá",
  state: "RJ",
  beaches: [
    {
      name: "Praia de Barra de Maricá",
      city: "Maricá",
      state: "RJ",
      spots: [
        {
          id: "rj-marica-barramarica-1",
          name: "Barra de Maricá",
          beach: "Praia de Barra de Maricá",
          city: "Maricá",
          state: "RJ",
          latitude: -22.9500,
          longitude: -42.8167,
          beachOrientation: 180, // Sul
          levels: { beginner: true, intermediate: true, advanced: false },
          description: "Praia extensa e deserta. Ondas suaves.",
          bestSeason: ["Outono", "Inverno", "Primavera"],
        },
      ],
    },
  ],
};

const RJ_BARRA_SAO_JOAO = {
  name: "Casimiro de Abreu",
  state: "RJ",
  beaches: [
    {
      name: "Praia de Barra de São João",
      city: "Casimiro de Abreu",
      state: "RJ",
      spots: [
        {
          id: "rj-casimiro-barrasaojoao-1",
          name: "Barra de São João",
          beach: "Praia de Barra de São João",
          city: "Casimiro de Abreu",
          state: "RJ",
          latitude: -22.6000,
          longitude: -41.9667,
          beachOrientation: 170, // Sul
          levels: { beginner: true, intermediate: true, advanced: false },
          description: "Praia tranquila entre Búzios e Rio das Ostras.",
          bestSeason: ["Outono", "Inverno", "Primavera"],
        },
      ],
    },
  ],
};

const RJ_GRUSSAI = {
  name: "São João da Barra",
  state: "RJ",
  beaches: [
    {
      name: "Praia de Grussaí",
      city: "São João da Barra",
      state: "RJ",
      spots: [
        {
          id: "rj-saojoaobarra-grussai-1",
          name: "Grussaí",
          beach: "Praia de Grussaí",
          city: "São João da Barra",
          state: "RJ",
          latitude: -21.7333,
          longitude: -41.0167,
          beachOrientation: 150, // Sudeste
          levels: { beginner: true, intermediate: true, advanced: false },
          description: "Praia urbana no Norte Fluminense.",
          bestSeason: ["Outono", "Inverno", "Primavera"],
        },
      ],
    },
  ],
};

// ========================================
// SÃO PAULO - Adicionar novos picos
// ========================================
const SP_UBATUBA_EXTRAS = [
  {
    name: "Praia do Perequê-Açu",
    city: "Ubatuba",
    state: "SP",
    spots: [
      {
        id: "sp-ubatuba-perequeacu-1",
        name: "Perequê-Açu",
        beach: "Praia do Perequê-Açu",
        city: "Ubatuba",
        state: "SP",
        latitude: -23.4167,
        longitude: -45.0833,
        beachOrientation: 120, // Leste-Sudeste
        levels: { beginner: true, intermediate: true, advanced: false },
        description: "Praia urbana extensa. Boa para iniciantes.",
        bestSeason: ["Outono", "Inverno", "Primavera"],
      },
    ],
  },
  {
    name: "Praia do Itaguá",
    city: "Ubatuba",
    state: "SP",
    spots: [
      {
        id: "sp-ubatuba-itagua-1",
        name: "Itaguá",
        beach: "Praia do Itaguá",
        city: "Ubatuba",
        state: "SP",
        latitude: -23.4833,
        longitude: -45.0833,
        beachOrientation: 115, // Leste-Sudeste
        levels: { beginner: true, intermediate: true, advanced: false },
        description: "Praia central de Ubatuba. Ondas consistentes.",
        bestSeason: ["Outono", "Inverno", "Primavera"],
      },
    ],
  },
  {
    name: "Praia de Maranduba",
    city: "Ubatuba",
    state: "SP",
    spots: [
      {
        id: "sp-ubatuba-maranduba-1",
        name: "Maranduba",
        beach: "Praia de Maranduba",
        city: "Ubatuba",
        state: "SP",
        latitude: -23.5167,
        longitude: -45.1333,
        beachOrientation: 135, // Sudeste
        levels: { beginner: true, intermediate: true, advanced: false },
        description: "Praia calma e familiar. Ondas suaves.",
        bestSeason: ["Outono", "Inverno", "Primavera"],
      },
    ],
  },
  {
    name: "Praia das Toninhas",
    city: "Ubatuba",
    state: "SP",
    spots: [
      {
        id: "sp-ubatuba-toninhas-1",
        name: "Toninhas",
        beach: "Praia das Toninhas",
        city: "Ubatuba",
        state: "SP",
        latitude: -23.4833,
        longitude: -45.0667,
        beachOrientation: 110, // Leste-Sudeste
        levels: { beginner: true, intermediate: false, advanced: false },
        description: "Praia pequena e protegida. Ideal para iniciantes.",
        bestSeason: ["Verão", "Primavera"],
      },
    ],
  },
];

const SP_SAO_SEBASTIAO_EXTRAS = [
  {
    name: "Praia da Baleia",
    city: "São Sebastião",
    state: "SP",
    spots: [
      {
        id: "sp-saosebastiao-baleia-1",
        name: "Baleia",
        beach: "Praia da Baleia",
        city: "São Sebastião",
        state: "SP",
        latitude: -23.8000,
        longitude: -45.4000,
        beachOrientation: 100, // Leste
        levels: { beginner: false, intermediate: true, advanced: true },
        description: "Praia isolada. Acesso por trilha. Ondas fortes.",
        bestSeason: ["Outono", "Inverno"],
      },
    ],
  },
  {
    name: "Praia do Engenho",
    city: "São Sebastião",
    state: "SP",
    spots: [
      {
        id: "sp-saosebastiao-engenho-1",
        name: "Engenho",
        beach: "Praia do Engenho",
        city: "São Sebastião",
        state: "SP",
        latitude: -23.7667,
        longitude: -45.3667,
        beachOrientation: 95, // Leste
        levels: { beginner: true, intermediate: true, advanced: false },
        description: "Praia tranquila entre Maresias e Camburi.",
        bestSeason: ["Outono", "Inverno", "Primavera"],
      },
    ],
  },
  {
    name: "Praia de Maresias",
    city: "São Sebastião",
    state: "SP",
    spots: [
      {
        id: "sp-saosebastiao-maresias-1",
        name: "Maresias",
        beach: "Praia de Maresias",
        city: "São Sebastião",
        state: "SP",
        latitude: -23.7833,
        longitude: -45.5667,
        beachOrientation: 105, // Leste-Sudeste
        levels: { beginner: false, intermediate: true, advanced: true },
        description: "Praia mais famosa de São Sebastião. Campeonatos nacionais.",
        bestSeason: ["Outono", "Inverno", "Primavera"],
      },
    ],
  },
];

// ========================================
// PARANÁ - Adicionar Pontal do Sul
// ========================================
const PR_PONTAL_SUL = {
  name: "Paranaguá",
  state: "PR",
  beaches: [
    {
      name: "Pontal do Sul",
      city: "Paranaguá",
      state: "PR",
      spots: [
        {
          id: "pr-paranagua-pontalsul-1",
          name: "Pontal do Sul",
          beach: "Pontal do Sul",
          city: "Paranaguá",
          state: "PR",
          latitude: -25.5500,
          longitude: -48.3500,
          beachOrientation: 135, // Sudeste
          levels: { beginner: true, intermediate: true, advanced: true },
          description: "Portal de acesso à Ilha do Mel. Ondas variadas.",
          bestSeason: ["Outono", "Inverno", "Primavera"],
        },
      ],
    },
  ],
};

// ========================================
// SANTA CATARINA - Adicionar novos picos
// ========================================
const SC_IBIRAQUERA = {
  name: "Praia de Ibiraquera",
  city: "Imbituba",
  state: "SC",
  spots: [
    {
      id: "sc-imbituba-ibiraquera-1",
      name: "Ibiraquera",
      beach: "Praia de Ibiraquera",
      city: "Imbituba",
      state: "SC",
      latitude: -28.2000,
      longitude: -48.6333,
      beachOrientation: 110, // Leste-Sudeste
      levels: { beginner: true, intermediate: true, advanced: true },
      description: "Lagoa atrás da praia. Ondas consistentes e variadas.",
      bestSeason: ["Outono", "Inverno", "Primavera"],
    },
  ],
};

const SC_PANTANO_SUL = {
  name: "Praia do Pântano do Sul",
  city: "Florianópolis",
  state: "SC",
  spots: [
    {
      id: "sc-floripa-pantanosul-1",
      name: "Pântano do Sul",
      beach: "Praia do Pântano do Sul",
      city: "Florianópolis",
      state: "SC",
      latitude: -27.7833,
      longitude: -48.5167,
      beachOrientation: 130, // Sudeste - enseada no sul da ilha protegida por morros
      waveAttenuationFactor: 0.85, // Parcialmente protegida pelos morros laterais
      levels: { beginner: true, intermediate: true, advanced: false },
      description: "Vila de pescadores. Enseada protegida com ondas suaves.",
      bestSeason: ["Outono", "Inverno", "Primavera"],
    },
  ],
};

const SC_BARRA_LAGOA = {
  name: "Barra da Lagoa",
  city: "Florianópolis",
  state: "SC",
  spots: [
    {
      id: "sc-floripa-barralagoa-2",
      name: "Barra da Lagoa",
      beach: "Barra da Lagoa",
      city: "Florianópolis",
      state: "SC",
      latitude: -27.5750,
      longitude: -48.4200,
      beachOrientation: 50, // Nordeste
      levels: { beginner: true, intermediate: true, advanced: false },
      description: "Vila de pescadores tradicional. Ondas acessíveis.",
      bestSeason: ["Outono", "Inverno", "Primavera"],
    },
  ],
};

const SC_ESTALEIRO = {
  name: "Balneário Camboriú",
  state: "SC",
  beaches: [
    {
      name: "Praia do Estaleiro",
      city: "Balneário Camboriú",
      state: "SC",
      spots: [
        {
          id: "sc-bc-estaleiro-1",
          name: "Estaleiro",
          beach: "Praia do Estaleiro",
          city: "Balneário Camboriú",
          state: "SC",
          latitude: -27.0833,
          longitude: -48.6167,
          beachOrientation: 105, // Leste-Sudeste
          levels: { beginner: false, intermediate: true, advanced: true },
          description: "Praia selvagem com ondas fortes. Acesso por estrada de terra.",
          bestSeason: ["Outono", "Inverno"],
        },
      ],
    },
    {
      name: "Praia do Estaleirinho",
      city: "Balneário Camboriú",
      state: "SC",
      spots: [
        {
          id: "sc-bc-estaleirinho-1",
          name: "Estaleirinho",
          beach: "Praia do Estaleirinho",
          city: "Balneário Camboriú",
          state: "SC",
          latitude: -27.0667,
          longitude: -48.6000,
          beachOrientation: 100, // Leste
          levels: { beginner: false, intermediate: true, advanced: true },
          description: "Praia pequena com ondas tubulares. Favorita dos surfistas locais.",
          bestSeason: ["Outono", "Inverno"],
        },
      ],
    },
  ],
};

const SC_PRAIA_GROSSA = {
  name: "Praia Grossa",
  city: "Itajaí",
  state: "SC",
  spots: [
    {
      id: "sc-itajai-praiagrossa-1",
      name: "Praia Grossa",
      beach: "Praia Grossa",
      city: "Itajaí",
      state: "SC",
      latitude: -26.9833,
      longitude: -48.6500,
      beachOrientation: 115, // Leste-Sudeste
      levels: { beginner: true, intermediate: true, advanced: false },
      description: "Praia ao sul de Itajaí. Ondas suaves e acessíveis.",
      bestSeason: ["Outono", "Inverno", "Primavera"],
    },
  ],
};

const SC_VERMELHA = {
  name: "Praia Vermelha",
  city: "Garopaba",
  state: "SC",
  spots: [
    {
      id: "sc-garopaba-vermelha-1",
      name: "Vermelha",
      beach: "Praia Vermelha",
      city: "Garopaba",
      state: "SC",
      latitude: -28.0500,
      longitude: -48.6333,
      beachOrientation: 120, // Leste-Sudeste
      levels: { beginner: false, intermediate: true, advanced: true },
      description: "Praia com areia avermelhada. Ondas fortes e tubulares.",
      bestSeason: ["Outono", "Inverno"],
    },
  ],
};

const SC_LAGOINHA_BOMBINHAS = {
  name: "Bombinhas",
  state: "SC",
  beaches: [
    {
      name: "Praia da Lagoinha",
      city: "Bombinhas",
      state: "SC",
      spots: [
        {
          id: "sc-bombinhas-lagoinha-1",
          name: "Lagoinha",
          beach: "Praia da Lagoinha",
          city: "Bombinhas",
          state: "SC",
          latitude: -27.1333,
          longitude: -48.5000,
          beachOrientation: 90, // Leste
          levels: { beginner: true, intermediate: true, advanced: false },
          description: "Enseada pequena e protegida. Águas claras.",
          bestSeason: ["Verão", "Primavera"],
        },
      ],
    },
  ],
};

// ========================================
// RIO GRANDE DO SUL - Adicionar novos picos
// ========================================
const RS_MOSTARDAS = {
  name: "Mostardas",
  state: "RS",
  beaches: [
    {
      name: "Praia de Mostardas",
      city: "Mostardas",
      state: "RS",
      spots: [
        {
          id: "rs-mostardas-1",
          name: "Mostardas",
          beach: "Praia de Mostardas",
          city: "Mostardas",
          state: "RS",
          latitude: -31.1167,
          longitude: -50.9167,
          beachOrientation: 110, // Leste-Sudeste
          levels: { beginner: true, intermediate: true, advanced: true },
          description: "Praia extensa e deserta. Ondas consistentes o ano todo.",
          bestSeason: ["Outono", "Inverno", "Primavera"],
        },
      ],
    },
  ],
};

const RS_TAVARES = {
  name: "Tavares",
  state: "RS",
  beaches: [
    {
      name: "Praia do Farol",
      city: "Tavares",
      state: "RS",
      spots: [
        {
          id: "rs-tavares-farol-1",
          name: "Farol",
          beach: "Praia do Farol",
          city: "Tavares",
          state: "RS",
          latitude: -31.2833,
          longitude: -51.0167,
          beachOrientation: 115, // Leste-Sudeste
          levels: { beginner: true, intermediate: true, advanced: true },
          description: "Praia deserta com farol histórico. Ondas variadas.",
          bestSeason: ["Outono", "Inverno", "Primavera"],
        },
      ],
    },
  ],
};

const RS_CIDREIRA = {
  name: "Cidreira",
  state: "RS",
  beaches: [
    {
      name: "Praia de Cidreira",
      city: "Cidreira",
      state: "RS",
      spots: [
        {
          id: "rs-cidreira-1",
          name: "Cidreira",
          beach: "Praia de Cidreira",
          city: "Cidreira",
          state: "RS",
          latitude: -30.1833,
          longitude: -50.2167,
          beachOrientation: 105, // Leste-Sudeste
          levels: { beginner: true, intermediate: true, advanced: false },
          description: "Praia urbana popular. Ondas acessíveis.",
          bestSeason: ["Outono", "Inverno", "Primavera"],
        },
      ],
    },
  ],
};

const RS_QUINTAO = {
  name: "Palmares do Sul",
  state: "RS",
  beaches: [
    {
      name: "Praia do Quintão",
      city: "Palmares do Sul",
      state: "RS",
      spots: [
        {
          id: "rs-quintao-1",
          name: "Quintão",
          beach: "Praia do Quintão",
          city: "Palmares do Sul",
          state: "RS",
          latitude: -30.2500,
          longitude: -50.5000,
          beachOrientation: 110, // Leste-Sudeste
          levels: { beginner: true, intermediate: true, advanced: true },
          description: "Praia deserta com ondas fortes. Muito popular.",
          bestSeason: ["Outono", "Inverno", "Primavera"],
        },
      ],
    },
  ],
};

const RS_HERMENEGILDO = {
  name: "Santa Vitória do Palmar",
  state: "RS",
  beaches: [
    {
      name: "Praia do Hermenegildo",
      city: "Santa Vitória do Palmar",
      state: "RS",
      spots: [
        {
          id: "rs-hermenegildo-1",
          name: "Hermenegildo",
          beach: "Praia do Hermenegildo",
          city: "Santa Vitória do Palmar",
          state: "RS",
          latitude: -33.5000,
          longitude: -53.2667,
          beachOrientation: 120, // Leste-Sudeste
          levels: { beginner: false, intermediate: true, advanced: true },
          description: "Praia mais ao sul do Brasil. Ondas fortes e frias.",
          bestSeason: ["Outono", "Inverno"],
        },
      ],
    },
  ],
};

export const NEW_SPOTS = {
  MA: [MA_ATINS],
  PI: [PI_PARNAIBA],
  CE: [CE_TAIBA, CE_ICARAIZINHO],
  RN: [RN_BAIA_FORMOSA, RN_GENIPABU],
  PE: [PE_SERRAMBI, PE_ENSEADA_CORAIS],
  BA: [BA_SERRA_GRANDE, BA_CUMURUXATIBA, BA_CARAIVA, BA_SEGUNDA_PRAIA],
  ES: [ES_REGENCIA, ES_POVOACAO, ES_UBU, ES_BARRA_JUCU],
  RJ: [RJ_FORNO, RJ_LOPES_MENDES, RJ_BARRA_MARICA, RJ_BARRA_SAO_JOAO, RJ_GRUSSAI],
  SP: [...SP_UBATUBA_EXTRAS, ...SP_SAO_SEBASTIAO_EXTRAS],
  PR: [PR_PONTAL_SUL],
  SC: [SC_IBIRAQUERA, SC_PANTANO_SUL, SC_BARRA_LAGOA, SC_ESTALEIRO, SC_PRAIA_GROSSA, SC_VERMELHA, SC_LAGOINHA_BOMBINHAS],
  RS: [RS_MOSTARDAS, RS_TAVARES, RS_CIDREIRA, RS_QUINTAO, RS_HERMENEGILDO],
};
