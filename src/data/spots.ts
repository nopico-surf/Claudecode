import { State } from "../types/surf";

// Base de dados expandida com mais de 200 picos de surf do Brasil
// Informações baseadas em conhecimento público da comunidade de surf
export const brazilianSurfSpots: State[] = [
  {
    code: "AP",
    name: "Amapá",
    cities: [
      {
        name: "Macapá",
        state: "AP",
        beaches: [
          {
            name: "Praia da Fazendinha",
            city: "Macapá",
            state: "AP",
            spots: [
              {
                id: "ap-macapa-fazendinha-1",
                name: "Fazendinha",
                beach: "Praia da Fazendinha",
                city: "Macapá",
                state: "AP",
                latitude: 0.0339,
                longitude: -51.0694,
                beachOrientation: 20, // Norte-Nordeste - costa voltada para norte
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia de água doce próxima à foz do Amazonas.",
                bestSeason: ["Verão"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "PA",
    name: "Pará",
    cities: [
      {
        name: "Salinas",
        state: "PA",
        beaches: [
          {
            name: "Praia de Atalaia",
            city: "Salinas",
            state: "PA",
            spots: [
              {
                id: "pa-salinas-atalaia-1",
                name: "Atalaia",
                beach: "Praia de Atalaia",
                city: "Salinas",
                state: "PA",
                latitude: -0.6161,
                longitude: -47.3550,
                beachOrientation: 30, // Norte-Nordeste - costa voltada para nordeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Principal praia de surf do Pará.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
        ],
      },
      {
        name: "Marudá",
        state: "PA",
        beaches: [
          {
            name: "Praia de Marudá",
            city: "Marudá",
            state: "PA",
            spots: [
              {
                id: "pa-maruda-1",
                name: "Marudá",
                beach: "Praia de Marudá",
                city: "Marudá",
                state: "PA",
                latitude: -0.6167,
                longitude: -47.6167,
                beachOrientation: 30, // Norte-Nordeste - costa voltada para nordeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia com ondas consistentes.",
                bestSeason: ["Verão"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "MA",
    name: "Maranhão",
    cities: [
      {
        name: "São Luís",
        state: "MA",
        beaches: [
          {
            name: "Praia do Calhau",
            city: "São Luís",
            state: "MA",
            spots: [
              {
                id: "ma-saoluis-calhau-1",
                name: "Calhau",
                beach: "Praia do Calhau",
                city: "São Luís",
                state: "MA",
                latitude: -2.4711,
                longitude: -44.2467,
                beachOrientation: 40, // Nordeste - transição para nordeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana popular de São Luís.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia de São Marcos",
            city: "São Luís",
            state: "MA",
            spots: [
              {
                id: "ma-saoluis-saomarcos-1",
                name: "São Marcos",
                beach: "Praia de São Marcos",
                city: "São Luís",
                state: "MA",
                latitude: -2.4969,
                longitude: -44.2672,
                beachOrientation: 40, // Nordeste
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia urbana com ondas mais calmas.",
                bestSeason: ["Verão"],
              },
            ],
          },
        ],
      },
      {
        name: "Barreirinhas",
        state: "MA",
        beaches: [
          {
            name: "Praia de Caburé",
            city: "Barreirinhas",
            state: "MA",
            spots: [
              {
                id: "ma-barreirinhas-cabure-1",
                name: "Caburé",
                beach: "Praia de Caburé",
                city: "Barreirinhas",
                state: "MA",
                latitude: -2.6333,
                longitude: -42.8167,
                beachOrientation: 40, // Nordeste
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia paradisíaca próxima aos Lençóis Maranhenses.",
                bestSeason: ["Verão"],
              },
            ],
          },
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
                beachOrientation: 50,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia selvagem nos Lencois Maranhenses. Acesso por barco.",
                bestSeason: ["Verao", "Primavera"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "PI",
    name: "Piauí",
    cities: [
      {
        name: "Luís Correia",
        state: "PI",
        beaches: [
          {
            name: "Praia de Atalaia",
            city: "Luís Correia",
            state: "PI",
            spots: [
              {
                id: "pi-luiscorreia-atalaia-1",
                name: "Atalaia",
                beach: "Praia de Atalaia",
                city: "Luís Correia",
                state: "PI",
                latitude: -2.8833,
                longitude: -41.6333,
                beachOrientation: 70, // Nordeste-Leste - transição para costa do Ceará
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Principal praia do litoral piauiense.",
                bestSeason: ["Verão"],
              },
            ],
          },
        ],
      },
      {
        name: "Parnaiba",
        state: "PI",
        beaches: [
          {
            name: "Praia de Pedra do Sal",
            city: "Parnaiba",
            state: "PI",
            spots: [
              {
                id: "pi-parnaiba-pedradosal-1",
                name: "Pedra do Sal",
                beach: "Praia de Pedra do Sal",
                city: "Parnaiba",
                state: "PI",
                latitude: -2.9000,
                longitude: -41.7500,
                beachOrientation: 40,
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Principal pico do Piaui. Ondas consistentes e point break de direita.",
                bestSeason: ["Verao", "Outono", "Primavera"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "CE",
    name: "Ceará",
    cities: [
      {
        name: "Jericoacoara",
        state: "CE",
        beaches: [
          {
            name: "Praia de Jericoacoara",
            city: "Jericoacoara",
            state: "CE",
            spots: [
              {
                id: "ce-jeri-1",
                name: "Jeri Principal",
                beach: "Praia de Jericoacoara",
                city: "Jericoacoara",
                state: "CE",
                latitude: -2.7928,
                longitude: -40.5147,
                beachOrientation: 85, // Leste - costa oeste do CE voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Paraíso do windsurf e kitesurf, também tem boas ondas.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia do Preá",
            city: "Jericoacoara",
            state: "CE",
            spots: [
              {
                id: "ce-jeri-prea-1",
                name: "Preá",
                beach: "Praia do Preá",
                city: "Jericoacoara",
                state: "CE",
                latitude: -2.7806,
                longitude: -40.4794,
                beachOrientation: 85, // Leste - costa oeste do CE voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Famosa para kitesurf, boas ondas também.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Fortaleza",
        state: "CE",
        beaches: [
          {
            name: "Praia do Futuro",
            city: "Fortaleza",
            state: "CE",
            spots: [
              {
                id: "ce-fortaleza-futuro-1",
                name: "Futuro",
                beach: "Praia do Futuro",
                city: "Fortaleza",
                state: "CE",
                latitude: -3.7608,
                longitude: -38.4597,
                beachOrientation: 90, // Leste - costa central do CE voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com ondas constantes.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia de Iracema",
            city: "Fortaleza",
            state: "CE",
            spots: [
              {
                id: "ce-fortaleza-iracema-1",
                name: "Iracema",
                beach: "Praia de Iracema",
                city: "Fortaleza",
                state: "CE",
                latitude: -3.7186,
                longitude: -38.5108,
                beachOrientation: 90, // Leste - costa central do CE voltada para leste
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia urbana mais calma.",
                bestSeason: ["Verão"],
              },
            ],
          },
        ],
      },
      {
        name: "Caucaia",
        state: "CE",
        beaches: [
          {
            name: "Praia do Cumbuco",
            city: "Caucaia",
            state: "CE",
            spots: [
              {
                id: "ce-caucaia-cumbuco-1",
                name: "Cumbuco",
                beach: "Praia do Cumbuco",
                city: "Caucaia",
                state: "CE",
                latitude: -3.6233,
                longitude: -38.8814,
                beachOrientation: 85, // Leste - costa oeste do CE voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Paraíso do kitesurf e windsurf. Também oferece boas ondas para surf, especialmente com vento offshore.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia do Icaraí",
            city: "Caucaia",
            state: "CE",
            spots: [
              {
                id: "ce-caucaia-icarai-1",
                name: "Icaraí",
                beach: "Praia do Icaraí",
                city: "Caucaia",
                state: "CE",
                latitude: -3.6919,
                longitude: -38.9589,
                beachOrientation: 80, // Leste - costa oeste do CE
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana próxima a Fortaleza com ondas constantes.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
        ],
      },
      {
        name: "Paracuru",
        state: "CE",
        beaches: [
          {
            name: "Praia de Paracuru",
            city: "Paracuru",
            state: "CE",
            spots: [
              {
                id: "ce-paracuru-1",
                name: "Paracuru",
                beach: "Praia de Paracuru",
                city: "Paracuru",
                state: "CE",
                latitude: -3.4111,
                longitude: -39.0311,
                beachOrientation: 80, // Leste - costa oeste do CE, transição
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia popular entre surfistas cearenses.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia da Taiba",
            city: "Paracuru",
            state: "CE",
            spots: [
              {
                id: "ce-paracuru-taiba-1",
                name: "Praia da Taiba",
                beach: "Praia da Taiba",
                city: "Paracuru",
                state: "CE",
                latitude: -3.5833,
                longitude: -38.9167,
                beachOrientation: 60,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia famosa por kitesurf e ondas fortes. Consistente o ano todo.",
                bestSeason: ["Verao", "Outono", "Inverno", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Aracati",
        state: "CE",
        beaches: [
          {
            name: "Canoa Quebrada",
            city: "Aracati",
            state: "CE",
            spots: [
              {
                id: "ce-aracati-canoa-1",
                name: "Canoa Quebrada",
                beach: "Canoa Quebrada",
                city: "Aracati",
                state: "CE",
                latitude: -4.4669,
                longitude: -37.7653,
                beachOrientation: 90, // Leste - costa leste do CE voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia turística com falésias e boas ondas.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Lagoinha",
        state: "CE",
        beaches: [
          {
            name: "Praia de Lagoinha",
            city: "Lagoinha",
            state: "CE",
            spots: [
              {
                id: "ce-lagoinha-1",
                name: "Lagoinha",
                beach: "Praia de Lagoinha",
                city: "Lagoinha",
                state: "CE",
                latitude: -3.1117,
                longitude: -39.9336,
                beachOrientation: 80, // Leste - costa oeste do CE, transição
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia paradisíaca com dunas e coqueiros.",
                bestSeason: ["Verão"],
              },
            ],
          },
        ],
      },
      {
        name: "Aquiraz",
        state: "CE",
        beaches: [
          {
            name: "Praia do Porto das Dunas",
            city: "Aquiraz",
            state: "CE",
            spots: [
              {
                id: "ce-aquiraz-portodunas-1",
                name: "Porto das Dunas",
                beach: "Praia do Porto das Dunas",
                city: "Aquiraz",
                state: "CE",
                latitude: -3.8544,
                longitude: -38.3814,
                beachOrientation: 90, // Leste - costa central do CE voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia turística próxima ao Beach Park.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia do Presídio",
            city: "Aquiraz",
            state: "CE",
            spots: [
              {
                id: "ce-aquiraz-presidio-1",
                name: "Presídio",
                beach: "Praia do Presídio",
                city: "Aquiraz",
                state: "CE",
                latitude: -3.8878,
                longitude: -38.3547,
                beachOrientation: 90, // Leste - costa central do CE voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia com ondas consistentes.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Beberibe",
        state: "CE",
        beaches: [
          {
            name: "Praia das Fontes",
            city: "Beberibe",
            state: "CE",
            spots: [
              {
                id: "ce-beberibe-fontes-1",
                name: "Fontes",
                beach: "Praia das Fontes",
                city: "Beberibe",
                state: "CE",
                latitude: -4.1733,
                longitude: -38.1264,
                beachOrientation: 90, // Leste - costa leste do CE voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia com falésias coloridas e boas ondas.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia de Morro Branco",
            city: "Beberibe",
            state: "CE",
            spots: [
              {
                id: "ce-beberibe-morrobranco-1",
                name: "Morro Branco",
                beach: "Praia de Morro Branco",
                city: "Beberibe",
                state: "CE",
                latitude: -4.0936,
                longitude: -38.2597,
                beachOrientation: 90, // Leste - costa leste do CE voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Famosa pelas falésias e labirinto de areia.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Icapuí",
        state: "CE",
        beaches: [
          {
            name: "Praia de Redonda",
            city: "Icapuí",
            state: "CE",
            spots: [
              {
                id: "ce-icapui-redonda-1",
                name: "Redonda",
                beach: "Praia de Redonda",
                city: "Icapuí",
                state: "CE",
                latitude: -4.7069,
                longitude: -37.3497,
                beachOrientation: 90, // Leste - divisa com RN, voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila próxima ao Rio Grande do Norte.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Icarai de Amontada",
        state: "CE",
        beaches: [
          {
            name: "Praia de Icaraizinho",
            city: "Icarai de Amontada",
            state: "CE",
            spots: [
              {
                id: "ce-icarai-icaraizinho-1",
                name: "Icaraizinho",
                beach: "Praia de Icaraizinho",
                city: "Icarai de Amontada",
                state: "CE",
                latitude: -2.9000,
                longitude: -39.8500,
                beachOrientation: 50,
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia selvagem e deserta. Ondas para todos os niveis.",
                bestSeason: ["Verao", "Outono", "Inverno", "Primavera"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "RN",
    name: "Rio Grande do Norte",
    cities: [
      {
        name: "Pipa",
        state: "RN",
        beaches: [
          {
            name: "Praia de Pipa",
            city: "Pipa",
            state: "RN",
            spots: [
              {
                id: "rn-pipa-1",
                name: "Pipa Centro",
                beach: "Praia de Pipa",
                city: "Pipa",
                state: "RN",
                latitude: -6.2253,
                longitude: -35.0608,
                beachOrientation: 90, // Leste - costa do RN voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Linda praia com boas ondas e vida noturna.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia do Madeiro",
            city: "Pipa",
            state: "RN",
            spots: [
              {
                id: "rn-pipa-madeiro-1",
                name: "Madeiro",
                beach: "Praia do Madeiro",
                city: "Pipa",
                state: "RN",
                latitude: -6.2108,
                longitude: -35.0544,
                beachOrientation: 90, // Leste - costa do RN voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia preservada com boas ondas.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Natal",
        state: "RN",
        beaches: [
          {
            name: "Praia de Ponta Negra",
            city: "Natal",
            state: "RN",
            spots: [
              {
                id: "rn-natal-pontanegra-1",
                name: "Ponta Negra",
                beach: "Praia de Ponta Negra",
                city: "Natal",
                state: "RN",
                latitude: -5.8814,
                longitude: -35.1686,
                beachOrientation: 90, // Leste - costa do RN voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia icônica com o Morro do Careca.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia dos Artistas",
            city: "Natal",
            state: "RN",
            spots: [
              {
                id: "rn-natal-artistas-1",
                name: "Artistas",
                beach: "Praia dos Artistas",
                city: "Natal",
                state: "RN",
                latitude: -5.7808,
                longitude: -35.1942,
                beachOrientation: 90, // Leste - costa do RN voltada para leste
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia urbana no centro de Natal.",
                bestSeason: ["Verão"],
              },
            ],
          },
        ],
      },
      {
        name: "Touros",
        state: "RN",
        beaches: [
          {
            name: "Praia de Touros",
            city: "Touros",
            state: "RN",
            spots: [
              {
                id: "rn-touros-1",
                name: "Touros",
                beach: "Praia de Touros",
                city: "Touros",
                state: "RN",
                latitude: -5.1978,
                longitude: -35.4597,
                beachOrientation: 90, // Leste - costa do RN voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Ponto mais ao norte do Brasil com boas ondas.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia de Cajueiro",
            city: "Touros",
            state: "RN",
            spots: [
              {
                id: "rn-touros-cajueiro-1",
                name: "Cajueiro",
                beach: "Praia de Cajueiro",
                city: "Touros",
                state: "RN",
                latitude: -5.1761,
                longitude: -35.4331,
                beachOrientation: 90, // Leste - costa do RN voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com boas ondas.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Maxaranguape",
        state: "RN",
        beaches: [
          {
            name: "Praia de Maracajaú",
            city: "Maxaranguape",
            state: "RN",
            spots: [
              {
                id: "rn-maxaranguape-maracajau-1",
                name: "Maracajaú",
                beach: "Praia de Maracajaú",
                city: "Maxaranguape",
                state: "RN",
                latitude: -5.4036,
                longitude: -35.4181,
                beachOrientation: 90, // Leste - costa do RN voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Famosa pelos parrachos e ondas suaves.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "São Miguel do Gostoso",
        state: "RN",
        beaches: [
          {
            name: "Praia de São Miguel",
            city: "São Miguel do Gostoso",
            state: "RN",
            spots: [
              {
                id: "rn-saomiguel-1",
                name: "São Miguel",
                beach: "Praia de São Miguel",
                city: "São Miguel do Gostoso",
                state: "RN",
                latitude: -5.1250,
                longitude: -35.6361,
                beachOrientation: 90, // Leste - costa do RN voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Paraíso do kitesurf, mas também tem boas ondas.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Parnamirim",
        state: "RN",
        beaches: [
          {
            name: "Praia de Cotovelo",
            city: "Parnamirim",
            state: "RN",
            spots: [
              {
                id: "rn-parnamirim-cotovelo-1",
                name: "Cotovelo",
                beach: "Praia de Cotovelo",
                city: "Parnamirim",
                state: "RN",
                latitude: -5.9278,
                longitude: -35.0992,
                beachOrientation: 90, // Leste - costa do RN voltada para leste
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia com ondas tubulares e consistentes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Pirangi",
            city: "Parnamirim",
            state: "RN",
            spots: [
              {
                id: "rn-parnamirim-pirangi-1",
                name: "Pirangi",
                beach: "Praia de Pirangi",
                city: "Parnamirim",
                state: "RN",
                latitude: -5.9506,
                longitude: -35.0875,
                beachOrientation: 90, // Leste - costa do RN voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia com o maior cajueiro do mundo.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Baia Formosa",
        state: "RN",
        beaches: [
          {
            name: "Praia de Baia Formosa",
            city: "Baia Formosa",
            state: "RN",
            spots: [
              {
                id: "rn-baiaformosa-1",
                name: "Baia Formosa",
                beach: "Praia de Baia Formosa",
                city: "Baia Formosa",
                state: "RN",
                latitude: -6.3667,
                longitude: -35.0000,
                beachOrientation: 100,
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Base do Italo Ferreira. Pico classico do RN com ondas consistentes.",
                bestSeason: ["Verao", "Outono", "Inverno", "Primavera"],
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
                beachOrientation: 90,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia famosa pelas dunas. Ondas acessiveis.",
                bestSeason: ["Verao", "Outono", "Primavera"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "PB",
    name: "Paraíba",
    cities: [
      {
        name: "João Pessoa",
        state: "PB",
        beaches: [
          {
            name: "Praia de Tambaú",
            city: "João Pessoa",
            state: "PB",
            spots: [
              {
                id: "pb-joaopessoa-tambau-1",
                name: "Tambaú",
                beach: "Praia de Tambaú",
                city: "João Pessoa",
                state: "PB",
                latitude: -7.1208,
                longitude: -34.8378,
                beachOrientation: 90, // Leste - costa da PB voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana popular.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Cabo Branco",
            city: "João Pessoa",
            state: "PB",
            spots: [
              {
                id: "pb-joaopessoa-cabobranco-1",
                name: "Cabo Branco",
                beach: "Praia de Cabo Branco",
                city: "João Pessoa",
                state: "PB",
                latitude: -7.1450,
                longitude: -34.7978,
                beachOrientation: 90, // Leste - costa da PB voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Ponto mais oriental das Américas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Cabedelo",
        state: "PB",
        beaches: [
          {
            name: "Praia de Intermares",
            city: "Cabedelo",
            state: "PB",
            spots: [
              {
                id: "pb-cabedelo-intermares-1",
                name: "Intermares",
                beach: "Praia de Intermares",
                city: "Cabedelo",
                state: "PB",
                latitude: -6.9808,
                longitude: -34.8456,
                beachOrientation: 90, // Leste - costa da PB voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia com ondas consistentes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "PE",
    name: "Pernambuco",
    cities: [
      {
        name: "Recife",
        state: "PE",
        beaches: [
          {
            name: "Praia de Boa Viagem",
            city: "Recife",
            state: "PE",
            spots: [
              {
                id: "pe-recife-boaviagem-1",
                name: "Boa Viagem",
                beach: "Praia de Boa Viagem",
                city: "Recife",
                state: "PE",
                latitude: -8.1278,
                longitude: -34.8972,
                beachOrientation: 90, // Leste - costa de PE voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Urbana e acessível. Cuidado com os arrecifes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Ipojuca",
        state: "PE",
        beaches: [
          {
            name: "Porto de Galinhas",
            city: "Ipojuca",
            state: "PE",
            spots: [
              {
                id: "pe-ipojuca-portogalinhas-1",
                name: "Porto de Galinhas",
                beach: "Porto de Galinhas",
                city: "Ipojuca",
                state: "PE",
                latitude: -8.5053,
                longitude: -35.0042,
                beachOrientation: 90, // Leste - costa de PE voltada para leste
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia turística com ondas pequenas.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia de Muro Alto",
            city: "Ipojuca",
            state: "PE",
            spots: [
              {
                id: "pe-ipojuca-muroalto-1",
                name: "Muro Alto",
                beach: "Praia de Muro Alto",
                city: "Ipojuca",
                state: "PE",
                latitude: -8.4503,
                longitude: -34.9936,
                beachOrientation: 90, // Leste - costa de PE voltada para leste
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Piscina natural com ondas calmas.",
                bestSeason: ["Verão"],
              },
            ],
          },
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
                beachOrientation: 110,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia tranquila com ondas tubulares. Recifes de coral.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Tamandaré",
        state: "PE",
        beaches: [
          {
            name: "Praia dos Carneiros",
            city: "Tamandaré",
            state: "PE",
            spots: [
              {
                id: "pe-tamandare-carneiros-1",
                name: "Carneiros",
                beach: "Praia dos Carneiros",
                city: "Tamandaré",
                state: "PE",
                latitude: -8.7100,
                longitude: -35.0853,
                beachOrientation: 90, // Leste - costa de PE voltada para leste
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia paradisíaca com águas calmas.",
                bestSeason: ["Verão"],
              },
            ],
          },
        ],
      },
      {
        name: "Cabo de Santo Agostinho",
        state: "PE",
        beaches: [
          {
            name: "Praia de Gaibu",
            city: "Cabo de Santo Agostinho",
            state: "PE",
            spots: [
              {
                id: "pe-cabo-gaibu-1",
                name: "Gaibu",
                beach: "Praia de Gaibu",
                city: "Cabo de Santo Agostinho",
                state: "PE",
                latitude: -8.3386,
                longitude: -35.0111,
                beachOrientation: 90, // Leste - costa de PE voltada para leste
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia extensa com ondas fortes e variadas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Calhetas",
            city: "Cabo de Santo Agostinho",
            state: "PE",
            spots: [
              {
                id: "pe-cabo-calhetas-1",
                name: "Calhetas",
                beach: "Praia de Calhetas",
                city: "Cabo de Santo Agostinho",
                state: "PE",
                latitude: -8.3286,
                longitude: -35.0053,
                beachOrientation: 90, // Leste - costa de PE voltada para leste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia com ondas tubulares e poderosas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
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
                beachOrientation: 120,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia protegida com aguas calmas e ondas suaves.",
                bestSeason: ["Verao", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Jaboatão dos Guararapes",
        state: "PE",
        beaches: [
          {
            name: "Praia de Piedade",
            city: "Jaboatão dos Guararapes",
            state: "PE",
            spots: [
              {
                id: "pe-jaboatao-piedade-1",
                name: "Piedade",
                beach: "Praia de Piedade",
                city: "Jaboatão dos Guararapes",
                state: "PE",
                latitude: -8.1836,
                longitude: -34.9194,
                beachOrientation: 90, // Leste - costa de PE voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana popular com boa infraestrutura.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Candeias",
            city: "Jaboatão dos Guararapes",
            state: "PE",
            spots: [
              {
                id: "pe-jaboatao-candeias-1",
                name: "Candeias",
                beach: "Praia de Candeias",
                city: "Jaboatão dos Guararapes",
                state: "PE",
                latitude: -8.1947,
                longitude: -34.9267,
                beachOrientation: 90, // Leste - costa de PE voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com ondas acessíveis.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Olinda",
        state: "PE",
        beaches: [
          {
            name: "Praia de Casa Caiada",
            city: "Olinda",
            state: "PE",
            spots: [
              {
                id: "pe-olinda-casacaiada-1",
                name: "Casa Caiada",
                beach: "Praia de Casa Caiada",
                city: "Olinda",
                state: "PE",
                latitude: -8.0064,
                longitude: -34.8581,
                beachOrientation: 90, // Leste - costa de PE voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia próxima ao centro histórico.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Paulista",
        state: "PE",
        beaches: [
          {
            name: "Praia de Janga",
            city: "Paulista",
            state: "PE",
            spots: [
              {
                id: "pe-paulista-janga-1",
                name: "Janga",
                beach: "Praia de Janga",
                city: "Paulista",
                state: "PE",
                latitude: -7.9597,
                longitude: -34.8453,
                beachOrientation: 90, // Leste - costa de PE voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com boas ondas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Ilha de Itamaracá",
        state: "PE",
        beaches: [
          {
            name: "Praia do Forte Orange",
            city: "Ilha de Itamaracá",
            state: "PE",
            spots: [
              {
                id: "pe-itamaraca-forteorange-1",
                name: "Forte Orange",
                beach: "Praia do Forte Orange",
                city: "Ilha de Itamaracá",
                state: "PE",
                latitude: -7.7472,
                longitude: -34.8269,
                beachOrientation: 90, // Leste - costa de PE voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia histórica com ondas moderadas.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
        ],
      },
      {
        name: "Fernando de Noronha",
        state: "PE",
        beaches: [
          {
            name: "Praia da Cacimba do Padre",
            city: "Fernando de Noronha",
            state: "PE",
            spots: [
              {
                id: "pe-noronha-cacimba-1",
                name: "Cacimba do Padre",
                beach: "Praia da Cacimba do Padre",
                city: "Fernando de Noronha",
                state: "PE",
                latitude: -3.8539,
                longitude: -32.4431,
                beachOrientation: 270, // Oeste - praia voltada para oeste (Mar de Dentro)
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia mais famosa de Noronha para surf. Ondas potentes principalmente no inverno. Sede de etapas do WSL.",
                bestSeason: ["Inverno", "Primavera"],
              },
            ],
          },
          {
            name: "Praia da Conceição",
            city: "Fernando de Noronha",
            state: "PE",
            spots: [
              {
                id: "pe-noronha-conceicao-1",
                name: "Conceição",
                beach: "Praia da Conceição",
                city: "Fernando de Noronha",
                state: "PE",
                latitude: -3.8419,
                longitude: -32.4236,
                beachOrientation: 315, // Noroeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia mais tranquila e acessível para iniciantes.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia do Boldró",
            city: "Fernando de Noronha",
            state: "PE",
            spots: [
              {
                id: "pe-noronha-boldro-1",
                name: "Boldró",
                beach: "Praia do Boldró",
                city: "Fernando de Noronha",
                state: "PE",
                latitude: -3.8486,
                longitude: -32.4358,
                beachOrientation: 290, // Oeste-Noroeste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Ondas poderosas e rápidas. Mirante com vista espetacular.",
                bestSeason: ["Inverno"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "AL",
    name: "Alagoas",
    cities: [
      {
        name: "Maceió",
        state: "AL",
        beaches: [
          {
            name: "Praia de Pajuçara",
            city: "Maceió",
            state: "AL",
            spots: [
              {
                id: "al-maceio-pajucara-1",
                name: "Pajuçara",
                beach: "Praia de Pajuçara",
                city: "Maceió",
                state: "AL",
                latitude: -9.6769,
                longitude: -35.7111,
                beachOrientation: 90, // Leste - costa de AL voltada para leste
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia calma com piscinas naturais, ideal para iniciantes.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia de Ponta Verde",
            city: "Maceió",
            state: "AL",
            spots: [
              {
                id: "al-maceio-pontaverde-1",
                name: "Ponta Verde",
                beach: "Praia de Ponta Verde",
                city: "Maceió",
                state: "AL",
                latitude: -9.6711,
                longitude: -35.7025,
                beachOrientation: 90, // Leste - costa de AL voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana animada com boa estrutura e ondas moderadas.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia de Jatiúca",
            city: "Maceió",
            state: "AL",
            spots: [
              {
                id: "al-maceio-jatiuca-1",
                name: "Jatiúca",
                beach: "Praia de Jatiúca",
                city: "Maceió",
                state: "AL",
                latitude: -9.6583,
                longitude: -35.7028,
                beachOrientation: 90, // Leste - costa de AL voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia nobre com águas calmas e ondas acessíveis.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia da Cruz das Almas",
            city: "Maceió",
            state: "AL",
            spots: [
              {
                id: "al-maceio-cruzdasalmas-1",
                name: "Cruz das Almas",
                beach: "Praia da Cruz das Almas",
                city: "Maceió",
                state: "AL",
                latitude: -9.6428,
                longitude: -35.6942,
                beachOrientation: 90, // Leste - costa de AL voltada para leste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia com ondas mais fortes, ideal para intermediários e avançados.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Barra de São Miguel",
        state: "AL",
        beaches: [
          {
            name: "Praia do Francês",
            city: "Barra de São Miguel",
            state: "AL",
            spots: [
              {
                id: "al-barrasaomiguel-frances-1",
                name: "Praia do Francês",
                beach: "Praia do Francês",
                city: "Barra de São Miguel",
                state: "AL",
                latitude: -9.7394,
                longitude: -35.8836,
                beachOrientation: 90, // Leste - costa de AL voltada para leste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Uma das melhores praias de surf do Nordeste, com ondas potentes e tubulares.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Maragogi",
        state: "AL",
        beaches: [
          {
            name: "Praia de Maragogi",
            city: "Maragogi",
            state: "AL",
            spots: [
              {
                id: "al-maragogi-1",
                name: "Maragogi",
                beach: "Praia de Maragogi",
                city: "Maragogi",
                state: "AL",
                latitude: -9.0122,
                longitude: -35.2222,
                beachOrientation: 90, // Leste - costa de AL voltada para leste
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Famosa pelos arrecifes e águas claras.",
                bestSeason: ["Verão"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "SE",
    name: "Sergipe",
    cities: [
      {
        name: "Aracaju",
        state: "SE",
        beaches: [
          {
            name: "Praia de Atalaia",
            city: "Aracaju",
            state: "SE",
            spots: [
              {
                id: "se-aracaju-atalaia-1",
                name: "Atalaia",
                beach: "Praia de Atalaia",
                city: "Aracaju",
                state: "SE",
                latitude: -11.0292,
                longitude: -37.0458,
                beachOrientation: 95, // Leste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com ondas moderadas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Aruana",
            city: "Aracaju",
            state: "SE",
            spots: [
              {
                id: "se-aracaju-aruana-1",
                name: "Aruana",
                beach: "Praia de Aruana",
                city: "Aracaju",
                state: "SE",
                latitude: -11.0147,
                longitude: -37.0378,
                beachOrientation: 90, // Leste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana próxima a Atalaia, com boas ondas e estrutura completa.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Robalo",
            city: "Aracaju",
            state: "SE",
            spots: [
              {
                id: "se-aracaju-robalo-1",
                name: "Robalo",
                beach: "Praia do Robalo",
                city: "Aracaju",
                state: "SE",
                latitude: -10.9967,
                longitude: -37.0250,
                beachOrientation: 85, // Leste - vento Oeste é terral
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia com ondas mais fortes e consistentes, ideal para intermediários.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Estância",
        state: "SE",
        beaches: [
          {
            name: "Praia do Saco",
            city: "Estância",
            state: "SE",
            spots: [
              {
                id: "se-estancia-saco-1",
                name: "Saco",
                beach: "Praia do Saco",
                city: "Estância",
                state: "SE",
                latitude: -11.2958,
                longitude: -37.2094,
                beachOrientation: 90, // Leste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com ondas moderadas e bela paisagem.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia de Abaís",
            city: "Estância",
            state: "SE",
            spots: [
              {
                id: "se-estancia-abais-1",
                name: "Abaís",
                beach: "Praia de Abaís",
                city: "Estância",
                state: "SE",
                latitude: -11.3575,
                longitude: -37.2442,
                beachOrientation: 95, // Leste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia extensa com faixa de areia ampla e ondas constantes.",
                bestSeason: ["Verão", "Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Itaporanga d'Ajuda",
        state: "SE",
        beaches: [
          {
            name: "Praia de Caueira",
            city: "Itaporanga d'Ajuda",
            state: "SE",
            spots: [
              {
                id: "se-itaporanga-caueira-1",
                name: "Caueira",
                beach: "Praia de Caueira",
                city: "Itaporanga d'Ajuda",
                state: "SE",
                latitude: -11.1097,
                longitude: -37.1142,
                beachOrientation: 90, // Leste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia semideserta com ondas suaves e natureza preservada.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "BA",
    name: "Bahia",
    cities: [
      {
        name: "Itacaré",
        state: "BA",
        beaches: [
          {
            name: "Praia da Tiririca",
            city: "Itacaré",
            state: "BA",
            spots: [
              {
                id: "ba-itacare-tiririca-1",
                name: "Tiririca",
                beach: "Praia da Tiririca",
                city: "Itacaré",
                state: "BA",
                latitude: -14.3150,
                longitude: -39.0456,
                beachOrientation: 100, // Leste - vento Oeste é terral
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia selvagem com ondas poderosas. Point break clássico.",
                bestSeason: ["Outono", "Inverno"],
              },
              {
                id: "ba-itacare-tiririca-2",
                name: "Canto da Tiririca",
                beach: "Praia da Tiririca",
                city: "Itacaré",
                state: "BA",
                latitude: -14.3140,
                longitude: -39.0470,
                beachOrientation: 100, // Leste - vento Oeste é terral
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Pico mais radical da Tiririca com direitas tubulares.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Engenhoca",
            city: "Itacaré",
            state: "BA",
            spots: [
              {
                id: "ba-itacare-engenhoca-1",
                name: "Engenhoca",
                beach: "Praia da Engenhoca",
                city: "Itacaré",
                state: "BA",
                latitude: -14.2992,
                longitude: -39.0353,
                beachOrientation: 105, // Leste-Sudeste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Boa para iniciantes e intermediários. Beach break consistente.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia da Ribeira",
            city: "Itacaré",
            state: "BA",
            spots: [
              {
                id: "ba-itacare-ribeira-1",
                name: "Ribeira",
                beach: "Praia da Ribeira",
                city: "Itacaré",
                state: "BA",
                latitude: -14.2881,
                longitude: -39.0244,
                beachOrientation: 110, // Leste-Sudeste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com escola de surf.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia de Jeribucaçu",
            city: "Itacaré",
            state: "BA",
            spots: [
              {
                id: "ba-itacare-jeribucacu-1",
                name: "Jeribucaçu",
                beach: "Praia de Jeribucaçu",
                city: "Itacaré",
                state: "BA",
                latitude: -14.3181,
                longitude: -39.0478,
                beachOrientation: 100, // Leste - vento Oeste é terral
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia isolada com ondas fortes e tubulares.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Concha",
            city: "Itacaré",
            state: "BA",
            spots: [
              {
                id: "ba-itacare-concha-1",
                name: "Concha",
                beach: "Praia da Concha",
                city: "Itacaré",
                state: "BA",
                latitude: -14.2750,
                longitude: -39.0167,
                beachOrientation: 120, // Sudeste - vento Noroeste é terral
                waveAttenuationFactor: 0.3, // Praia protegida com ondas suaves
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia calma e protegida em enseada, ideal para iniciantes com ondas suaves.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia do Resende",
            city: "Itacaré",
            state: "BA",
            spots: [
              {
                id: "ba-itacare-resende-1",
                name: "Resende",
                beach: "Praia do Resende",
                city: "Itacaré",
                state: "BA",
                latitude: -14.2850,
                longitude: -39.0300,
                beachOrientation: 110, // Leste-Sudeste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Beach break com ondas para todos os níveis.",
                bestSeason: ["Verão", "Outono", "Primavera"],
              },
            ],
          },
          {
            name: "Praia da Coroinha",
            city: "Itacaré",
            state: "BA",
            spots: [
              {
                id: "ba-itacare-coroinha-1",
                name: "Coroinha",
                beach: "Praia da Coroinha",
                city: "Itacaré",
                state: "BA",
                latitude: -14.2920,
                longitude: -39.0320,
                beachOrientation: 105, // Leste-Sudeste - vento Oeste é terral
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia com ondas rápidas e tubulares.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Costa",
            city: "Itacaré",
            state: "BA",
            spots: [
              {
                id: "ba-itacare-costa-1",
                name: "Costa",
                beach: "Praia do Costa",
                city: "Itacaré",
                state: "BA",
                latitude: -14.2800,
                longitude: -39.0200,
                beachOrientation: 115, // Leste-Sudeste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia popular com boa estrutura e ondas constantes.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia de Havaizinho",
            city: "Itacaré",
            state: "BA",
            spots: [
              {
                id: "ba-itacare-havaizinho-1",
                name: "Havaizinho",
                beach: "Praia de Havaizinho",
                city: "Itacaré",
                state: "BA",
                latitude: -14.3100,
                longitude: -39.0420,
                beachOrientation: 100, // Leste - vento Oeste é terral
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia paradis��aca com ondas tubulares e forte.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Itacarezinho",
            city: "Itacaré",
            state: "BA",
            spots: [
              {
                id: "ba-itacare-itacarezinho-1",
                name: "Itacarezinho",
                beach: "Praia de Itacarezinho",
                city: "Itacaré",
                state: "BA",
                latitude: -14.3250,
                longitude: -39.0500,
                beachOrientation: 95, // Leste - vento Oeste é terral
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia remota com ondas pesadas e poderosas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de São José",
            city: "Itacaré",
            state: "BA",
            spots: [
              {
                id: "ba-itacare-saojose-1",
                name: "São José",
                beach: "Praia de São José",
                city: "Itacaré",
                state: "BA",
                latitude: -14.2770,
                longitude: -39.0190,
                beachOrientation: 115, // Leste-Sudeste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia com acesso fácil e ondas para todos os níveis.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia da Prainha",
            city: "Itacaré",
            state: "BA",
            spots: [
              {
                id: "ba-itacare-prainha-1",
                name: "Prainha",
                beach: "Praia da Prainha",
                city: "Itacaré",
                state: "BA",
                latitude: -14.3050,
                longitude: -39.0400,
                beachOrientation: 100, // Leste - vento Oeste é terral
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia pequena e abrigada com ondas de qualidade.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Salvador",
        state: "BA",
        beaches: [
          {
            name: "Praia de Itapoã",
            city: "Salvador",
            state: "BA",
            spots: [
              {
                id: "ba-salvador-itapoa-1",
                name: "Itapoã",
                beach: "Praia de Itapoã",
                city: "Salvador",
                state: "BA",
                latitude: -12.9481,
                longitude: -38.3506,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Clássica de Salvador. Boas ondas no inverno.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Stella Maris",
            city: "Salvador",
            state: "BA",
            spots: [
              {
                id: "ba-salvador-stella-1",
                name: "Stella Maris",
                beach: "Stella Maris",
                city: "Salvador",
                state: "BA",
                latitude: -12.9178,
                longitude: -38.3344,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia popular entre surfistas locais.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Flamengo",
            city: "Salvador",
            state: "BA",
            spots: [
              {
                id: "ba-salvador-flamengo-1",
                name: "Flamengo",
                beach: "Praia do Flamengo",
                city: "Salvador",
                state: "BA",
                latitude: -12.9047,
                longitude: -38.3214,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia com ondas consistentes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Camaçari",
        state: "BA",
        beaches: [
          {
            name: "Guarajuba",
            city: "Camaçari",
            state: "BA",
            spots: [
              {
                id: "ba-camacari-guarajuba-1",
                name: "Guarajuba",
                beach: "Guarajuba",
                city: "Camaçari",
                state: "BA",
                latitude: -12.6447,
                longitude: -38.0394,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com ondas suaves e areia branca, ideal para iniciantes e intermediários.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Arembebe",
            city: "Camaçari",
            state: "BA",
            spots: [
              {
                id: "ba-camacari-arembebe-1",
                name: "Arembebe",
                beach: "Arembebe",
                city: "Camaçari",
                state: "BA",
                latitude: -12.7631,
                longitude: -38.1628,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia rústica com vila hippie, ondas consistentes e ambiente descontraído.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Itacimirim",
            city: "Camaçari",
            state: "BA",
            spots: [
              {
                id: "ba-camacari-itacimirim-1",
                name: "Itacimirim",
                beach: "Itacimirim",
                city: "Camaçari",
                state: "BA",
                latitude: -12.7158,
                longitude: -38.1231,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia calma com coqueiros e ondas suaves, perfeita para famílias e surfistas iniciantes.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
        ],
      },
      {
        name: "Mata de São João",
        state: "BA",
        beaches: [
          {
            name: "Praia do Forte",
            city: "Mata de São Jo��o",
            state: "BA",
            spots: [
              {
                id: "ba-matadesaojoao-praiadoforte-1",
                name: "Praia do Forte",
                beach: "Praia do Forte",
                city: "Mata de São João",
                state: "BA",
                latitude: -12.5808,
                longitude: -38.0067,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia turística famosa pelo Projeto Tamar, com ondas consistentes e águas cristalinas, ideal para iniciantes e intermediários.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
        ],
      },
      {
        name: "Morro de São Paulo",
        state: "BA",
        beaches: [
          {
            name: "Segunda Praia",
            city: "Morro de Sao Paulo",
            state: "BA",
            spots: [
              {
                id: "ba-morrosaopaulo-segunda-1",
                name: "Segunda Praia",
                beach: "Segunda Praia",
                city: "Morro de Sao Paulo",
                state: "BA",
                latitude: -13.3833,
                longitude: -38.9167,
                beachOrientation: 150,
                waveAttenuationFactor: 0.75,
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia urbana e movimentada. Ondas pequenas protegidas pela geografia.",
                bestSeason: ["Verao", "Primavera"],
              },
            ],
          },
          {
            name: "Terceira Praia",
            city: "Morro de São Paulo",
            state: "BA",
            spots: [
              {
                id: "ba-morro-terceira-1",
                name: "Terceira Praia",
                beach: "Terceira Praia",
                city: "Morro de São Paulo",
                state: "BA",
                latitude: -13.3947,
                longitude: -38.9194,
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia paradisíaca com ondas suaves.",
                bestSeason: ["Verão"],
              },
            ],
          },
          {
            name: "Quarta Praia",
            city: "Morro de São Paulo",
            state: "BA",
            spots: [
              {
                id: "ba-morro-quarta-1",
                name: "Quarta Praia",
                beach: "Quarta Praia",
                city: "Morro de São Paulo",
                state: "BA",
                latitude: -13.4025,
                longitude: -38.9258,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia mais tranquila e menos movimentada.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Vera Cruz",
        state: "BA",
        beaches: [
          {
            name: "Praia de Gamboa",
            city: "Vera Cruz",
            state: "BA",
            spots: [
              {
                id: "ba-veracruz-gamboa-1",
                name: "Gamboa",
                beach: "Praia de Gamboa",
                city: "Vera Cruz",
                state: "BA",
                latitude: -12.9928,
                longitude: -38.6042,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia na Ilha de Itaparica com ondas moderadas.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
        ],
      },
      {
        name: "Ilhéus",
        state: "BA",
        beaches: [
          {
            name: "Praia dos Milionários",
            city: "Ilhéus",
            state: "BA",
            spots: [
              {
                id: "ba-ilheus-milionarios-1",
                name: "Milionários",
                beach: "Praia dos Milionários",
                city: "Ilhéus",
                state: "BA",
                latitude: -14.7889,
                longitude: -39.0469,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana popular com boa infraestrutura.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Norte",
            city: "Ilhéus",
            state: "BA",
            spots: [
              {
                id: "ba-ilheus-norte-1",
                name: "Norte",
                beach: "Praia do Norte",
                city: "Ilhéus",
                state: "BA",
                latitude: -14.7700,
                longitude: -39.0350,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia próxima ao centro com ondas constantes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Serra Grande",
            city: "Ilheus",
            state: "BA",
            spots: [
              {
                id: "ba-ilheus-serragrande-1",
                name: "Serra Grande",
                beach: "Praia de Serra Grande",
                city: "Ilheus",
                state: "BA",
                latitude: -14.4167,
                longitude: -39.0167,
                beachOrientation: 140,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia selvagem entre Ilheus e Itacare. Ondas fortes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Porto Seguro",
        state: "BA",
        beaches: [
          {
            name: "Praia de Taperapuã",
            city: "Porto Seguro",
            state: "BA",
            spots: [
              {
                id: "ba-portoseguro-taperapua-1",
                name: "Taperapuã",
                beach: "Praia de Taperapuã",
                city: "Porto Seguro",
                state: "BA",
                latitude: -16.4142,
                longitude: -39.0419,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia turística movimentada com ondas acessíveis.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia de Mundaí",
            city: "Porto Seguro",
            state: "BA",
            spots: [
              {
                id: "ba-portoseguro-mundai-1",
                name: "Mundaí",
                beach: "Praia de Mundaí",
                city: "Porto Seguro",
                state: "BA",
                latitude: -16.4208,
                longitude: -39.0494,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com ondas suaves.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia de Caraiva",
            city: "Porto Seguro",
            state: "BA",
            spots: [
              {
                id: "ba-portoseguro-caraiva-1",
                name: "Caraiva",
                beach: "Praia de Caraiva",
                city: "Porto Seguro",
                state: "BA",
                latitude: -16.7500,
                longitude: -39.1667,
                beachOrientation: 135,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Vila rustica sem carros. Ondas tranquilas.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Maraú",
        state: "BA",
        beaches: [
          {
            name: "Praia de Taipus de Fora",
            city: "Maraú",
            state: "BA",
            spots: [
              {
                id: "ba-marau-taipus-1",
                name: "Taipus de Fora",
                beach: "Praia de Taipus de Fora",
                city: "Maraú",
                state: "BA",
                latitude: -13.9500,
                longitude: -39.0350,
                beachOrientation: 105, // Leste-Sudeste - vento Oeste é terral
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia paradisíaca com piscinas naturais e ondas suaves na maré alta.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia de Barra Grande",
            city: "Maraú",
            state: "BA",
            spots: [
              {
                id: "ba-marau-barragrande-1",
                name: "Barra Grande",
                beach: "Praia de Barra Grande",
                city: "Maraú",
                state: "BA",
                latitude: -13.9194,
                longitude: -38.9600,
                beachOrientation: 110, // Leste-Sudeste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Vila charmosa com boas ondas e ambiente tranquilo.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
        ],
      },
      {
        name: "Canavieiras",
        state: "BA",
        beaches: [
          {
            name: "Praia de Atalaia",
            city: "Canavieiras",
            state: "BA",
            spots: [
              {
                id: "ba-canavieiras-atalaia-1",
                name: "Atalaia",
                beach: "Praia de Atalaia",
                city: "Canavieiras",
                state: "BA",
                latitude: -15.6733,
                longitude: -38.9350,
                beachOrientation: 100, // Leste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia extensa com ondas constantes e paisagem de coqueiros.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Una",
        state: "BA",
        beaches: [
          {
            name: "Praia de Comandatuba",
            city: "Una",
            state: "BA",
            spots: [
              {
                id: "ba-una-comandatuba-1",
                name: "Comandatuba",
                beach: "Praia de Comandatuba",
                city: "Una",
                state: "BA",
                latitude: -15.3033,
                longitude: -39.0914,
                beachOrientation: 105, // Leste-Sudeste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Ilha paradisíaca com praia extensa e ondas moderadas.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
        ],
      },
      {
        name: "Santa Cruz Cabrália",
        state: "BA",
        beaches: [
          {
            name: "Praia de Santo André",
            city: "Santa Cruz Cabrália",
            state: "BA",
            spots: [
              {
                id: "ba-santacruz-santoandre-1",
                name: "Santo André",
                beach: "Praia de Santo André",
                city: "Santa Cruz Cabrália",
                state: "BA",
                latitude: -16.2850,
                longitude: -39.0219,
                beachOrientation: 95, // Leste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com mar calmo e perfeita para famílias.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia de Coroa Vermelha",
            city: "Santa Cruz Cabrália",
            state: "BA",
            spots: [
              {
                id: "ba-santacruz-coroavermelha-1",
                name: "Coroa Vermelha",
                beach: "Praia de Coroa Vermelha",
                city: "Santa Cruz Cabrália",
                state: "BA",
                latitude: -16.3567,
                longitude: -39.0544,
                beachOrientation: 100, // Leste - vento Oeste é terral
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia histórica com recifes e ondas suaves.",
                bestSeason: ["Verão"],
              },
            ],
          },
        ],
      },
      {
        name: "Prado",
        state: "BA",
        beaches: [
          {
            name: "Praia do Tororão",
            city: "Prado",
            state: "BA",
            spots: [
              {
                id: "ba-prado-tororao-1",
                name: "Tororão",
                beach: "Praia do Tororão",
                city: "Prado",
                state: "BA",
                latitude: -17.3267,
                longitude: -39.2169,
                beachOrientation: 95, // Leste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia deserta com ondas constantes e paisagem preservada.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
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
                beachOrientation: 140,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Vila de pescadores com ondas consistentes.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Alcobaça",
        state: "BA",
        beaches: [
          {
            name: "Praia de Alcobaça",
            city: "Alcobaça",
            state: "BA",
            spots: [
              {
                id: "ba-alcobaca-1",
                name: "Alcobaça",
                beach: "Praia de Alcobaça",
                city: "Alcobaça",
                state: "BA",
                latitude: -17.5250,
                longitude: -39.2008,
                beachOrientation: 90, // Leste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com ondas moderadas, perfeita para surf e descanso.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Caravelas",
        state: "BA",
        beaches: [
          {
            name: "Praia do Grauçá",
            city: "Caravelas",
            state: "BA",
            spots: [
              {
                id: "ba-caravelas-graucu-1",
                name: "Grauçá",
                beach: "Praia do Grauçá",
                city: "Caravelas",
                state: "BA",
                latitude: -17.7128,
                longitude: -39.2497,
                beachOrientation: 95, // Leste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia deserta e selvagem próxima ao Parque Nacional Marinho dos Abrolhos.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "ES",
    name: "Espírito Santo",
    cities: [
      {
        name: "Itaúnas",
        state: "ES",
        beaches: [
          {
            name: "Praia de Itaúnas",
            city: "Itaúnas",
            state: "ES",
            spots: [
              {
                id: "es-itaunas-1",
                name: "Itaúnas",
                beach: "Praia de Itaúnas",
                city: "Itaúnas",
                state: "ES",
                latitude: -18.4139,
                longitude: -39.7108,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Ondas poderosas e desertas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Guarapari",
        state: "ES",
        beaches: [
          {
            name: "Praia do Morro",
            city: "Guarapari",
            state: "ES",
            spots: [
              {
                id: "es-guarapari-morro-1",
                name: "Morro",
                beach: "Praia do Morro",
                city: "Guarapari",
                state: "ES",
                latitude: -20.6694,
                longitude: -40.5019,
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia versátil com vários picos.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Marataízes",
        state: "ES",
        beaches: [
          {
            name: "Praia Central",
            city: "Marata��zes",
            state: "ES",
            spots: [
              {
                id: "es-marataizes-1",
                name: "Marataízes",
                beach: "Praia Central",
                city: "Marataízes",
                state: "ES",
                latitude: -21.0428,
                longitude: -40.8247,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com ondas constantes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Vila Velha",
        state: "ES",
        beaches: [
          {
            name: "Praia de Itaparica",
            city: "Vila Velha",
            state: "ES",
            spots: [
              {
                id: "es-vilavelha-itaparica-1",
                name: "Itaparica",
                beach: "Praia de Itaparica",
                city: "Vila Velha",
                state: "ES",
                latitude: -20.3422,
                longitude: -40.2939,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana popular.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Costa",
            city: "Vila Velha",
            state: "ES",
            spots: [
              {
                id: "es-vilavelha-costa-1",
                name: "Praia da Costa",
                beach: "Praia da Costa",
                city: "Vila Velha",
                state: "ES",
                latitude: -20.3311,
                longitude: -40.2850,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com boa infraestrutura e ondas consistentes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Barra do Jucu",
            city: "Vila Velha",
            state: "ES",
            spots: [
              {
                id: "es-vilavelha-barradojucu-1",
                name: "Barra do Jucu",
                beach: "Praia da Barra do Jucu",
                city: "Vila Velha",
                state: "ES",
                latitude: -20.3833,
                longitude: -40.3333,
                beachOrientation: 130,
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia com ondas consistentes. Popular entre surfistas locais.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Serra",
        state: "ES",
        beaches: [
          {
            name: "Praia de Jacaraípe",
            city: "Serra",
            state: "ES",
            spots: [
              {
                id: "es-serra-jacaraipe-1",
                name: "Jacaraípe",
                beach: "Praia de Jacaraípe",
                city: "Serra",
                state: "ES",
                latitude: -20.1111,
                longitude: -40.2128,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia popular com ondas constantes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Nova Almeida",
            city: "Serra",
            state: "ES",
            spots: [
              {
                id: "es-serra-novaalmeida-1",
                name: "Nova Almeida",
                beach: "Praia de Nova Almeida",
                city: "Serra",
                state: "ES",
                latitude: -19.9811,
                longitude: -40.2069,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia histórica com boas ondas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Piúma",
        state: "ES",
        beaches: [
          {
            name: "Praia de Piúma",
            city: "Piúma",
            state: "ES",
            spots: [
              {
                id: "es-piuma-1",
                name: "Piúma",
                beach: "Praia de Piúma",
                city: "Piúma",
                state: "ES",
                latitude: -20.8336,
                longitude: -40.7347,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com ondas moderadas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Aracruz",
        state: "ES",
        beaches: [
          {
            name: "Praia dos Padres",
            city: "Aracruz",
            state: "ES",
            spots: [
              {
                id: "es-aracruz-padres-1",
                name: "Padres",
                beach: "Praia dos Padres",
                city: "Aracruz",
                state: "ES",
                latitude: -19.7694,
                longitude: -40.1850,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia com ondas fortes e tubulares.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia Formosa",
            city: "Aracruz",
            state: "ES",
            spots: [
              {
                id: "es-aracruz-formosa-1",
                name: "Formosa",
                beach: "Praia Formosa",
                city: "Aracruz",
                state: "ES",
                latitude: -19.8069,
                longitude: -40.2217,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia extensa com boas ondas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Vitória",
        state: "ES",
        beaches: [
          {
            name: "Praia de Camburi",
            city: "Vitória",
            state: "ES",
            spots: [
              {
                id: "es-vitoria-camburi-1",
                name: "Camburi",
                beach: "Praia de Camburi",
                city: "Vitória",
                state: "ES",
                latitude: -20.2761,
                longitude: -40.2656,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Principal praia urbana de Vitória.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Linhares",
        state: "ES",
        beaches: [
          {
            name: "Praia de Regencia",
            city: "Linhares",
            state: "ES",
            spots: [
              {
                id: "es-linhares-regencia-1",
                name: "Regencia",
                beach: "Praia de Regencia",
                city: "Linhares",
                state: "ES",
                latitude: -19.6667,
                longitude: -39.8500,
                beachOrientation: 120,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Foz do Rio Doce. Ondas poderosas e consistentes.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
          {
            name: "Praia de Povoacao",
            city: "Linhares",
            state: "ES",
            spots: [
              {
                id: "es-linhares-povoacao-1",
                name: "Povoacao",
                beach: "Praia de Povoacao",
                city: "Linhares",
                state: "ES",
                latitude: -19.7833,
                longitude: -39.9833,
                beachOrientation: 125,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia selvagem com ondas consistentes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
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
                longitude: -40.6333,
                beachOrientation: 140,
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia com ondas fortes. Competicoes regionais.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "RJ",
    name: "Rio de Janeiro",
    cities: [
      {
        name: "Rio de Janeiro",
        state: "RJ",
        beaches: [
          {
            name: "Arpoador",
            city: "Rio de Janeiro",
            state: "RJ",
            spots: [
              {
                id: "rj-rio-arpoador-1",
                name: "Pedra do Arpoador",
                beach: "Arpoador",
                city: "Rio de Janeiro",
                state: "RJ",
                latitude: -22.9878,
                longitude: -43.1906,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Clássico carioca. Ondas rápidas e intensas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Copacabana",
            city: "Rio de Janeiro",
            state: "RJ",
            spots: [
              {
                id: "rj-rio-copacabana-1",
                name: "Posto 6",
                beach: "Copacabana",
                city: "Rio de Janeiro",
                state: "RJ",
                latitude: -22.9911,
                longitude: -43.1900,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana icônica com ondas acessíveis.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Ipanema",
            city: "Rio de Janeiro",
            state: "RJ",
            spots: [
              {
                id: "rj-rio-ipanema-1",
                name: "Quebra-Mar Ipanema",
                beach: "Ipanema",
                city: "Rio de Janeiro",
                state: "RJ",
                latitude: -22.9847,
                longitude: -43.2044,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia famosa com ondas para todos os níveis.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Leblon",
            city: "Rio de Janeiro",
            state: "RJ",
            spots: [
              {
                id: "rj-rio-leblon-1",
                name: "Leblon",
                beach: "Leblon",
                city: "Rio de Janeiro",
                state: "RJ",
                latitude: -22.9839,
                longitude: -43.2264,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia nobre com boas ondas e ótima infraestrutura.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "São Conrado",
            city: "Rio de Janeiro",
            state: "RJ",
            spots: [
              {
                id: "rj-rio-saoconrado-1",
                name: "Pepino",
                beach: "São Conrado",
                city: "Rio de Janeiro",
                state: "RJ",
                latitude: -23.0069,
                longitude: -43.2756,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia entre morros com voo livre e surf.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Joatinga",
            city: "Rio de Janeiro",
            state: "RJ",
            spots: [
              {
                id: "rj-rio-joatinga-1",
                name: "Joatinga",
                beach: "Joatinga",
                city: "Rio de Janeiro",
                state: "RJ",
                latitude: -23.0197,
                longitude: -43.2900,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia escondida com acesso por trilha. Ondas fortes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Prainha",
            city: "Rio de Janeiro",
            state: "RJ",
            spots: [
              {
                id: "rj-rio-prainha-1",
                name: "Canto Esquerdo",
                beach: "Prainha",
                city: "Rio de Janeiro",
                state: "RJ",
                latitude: -23.0458,
                longitude: -43.5047,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Uma das melhores ondas do Rio. Tubos perfeitos.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Barra da Tijuca",
            city: "Rio de Janeiro",
            state: "RJ",
            spots: [
              {
                id: "rj-rio-barra-1",
                name: "Quebra-Mar",
                beach: "Barra da Tijuca",
                city: "Rio de Janeiro",
                state: "RJ",
                latitude: -23.0122,
                longitude: -43.3289,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Bom para todos os níveis, especialmente iniciantes.",
                bestSeason: ["Verão", "Primavera"],
              },
              {
                id: "rj-rio-barra-2",
                name: "Pepê",
                beach: "Barra da Tijuca",
                city: "Rio de Janeiro",
                state: "RJ",
                latitude: -23.0078,
                longitude: -43.3178,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Posto 1 da Barra, ondas consistentes.",
                bestSeason: ["Verão", "Primavera"],
              },
              {
                id: "rj-rio-barra-3",
                name: "Posto 4",
                beach: "Barra da Tijuca",
                city: "Rio de Janeiro",
                state: "RJ",
                latitude: -23.0144,
                longitude: -43.3567,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia extensa com múltiplos picos e boa formação.",
                bestSeason: ["Verão", "Primavera"],
              },
              {
                id: "rj-rio-barra-4",
                name: "Reserva",
                beach: "Barra da Tijuca",
                city: "Rio de Janeiro",
                state: "RJ",
                latitude: -23.0192,
                longitude: -43.3989,
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Área mais preservada com ondas potentes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Grumari",
            city: "Rio de Janeiro",
            state: "RJ",
            spots: [
              {
                id: "rj-rio-grumari-1",
                name: "Grumari",
                beach: "Grumari",
                city: "Rio de Janeiro",
                state: "RJ",
                latitude: -23.0508,
                longitude: -43.5267,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia selvagem com ondas potentes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Recreio",
            city: "Rio de Janeiro",
            state: "RJ",
            spots: [
              {
                id: "rj-rio-recreio-1",
                name: "Recreio",
                beach: "Recreio",
                city: "Rio de Janeiro",
                state: "RJ",
                latitude: -23.0278,
                longitude: -43.4539,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia extensa com vários picos.",
                bestSeason: ["Verão", "Outono"],
              },
              {
                id: "rj-rio-recreio-2",
                name: "Macumba",
                beach: "Recreio",
                city: "Rio de Janeiro",
                state: "RJ",
                latitude: -23.0311,
                longitude: -43.4656,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Pico clássico do Recreio com ondas tubulares.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Secreto",
            city: "Rio de Janeiro",
            state: "RJ",
            spots: [
              {
                id: "rj-rio-secreto-1",
                name: "Secreto",
                beach: "Praia do Secreto",
                city: "Rio de Janeiro",
                state: "RJ",
                latitude: -23.0369,
                longitude: -43.4844,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia pequena e escondida entre Recreio e Grumari.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Abricó",
            city: "Rio de Janeiro",
            state: "RJ",
            spots: [
              {
                id: "rj-rio-abrico-1",
                name: "Abricó",
                beach: "Praia do Abricó",
                city: "Rio de Janeiro",
                state: "RJ",
                latitude: -23.0431,
                longitude: -43.5036,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia naturista com ondas fortes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Saquarema",
        state: "RJ",
        beaches: [
          {
            name: "Praia de Itaúna",
            city: "Saquarema",
            state: "RJ",
            spots: [
              {
                id: "rj-saquarema-itauna-1",
                name: "Pico de Itaúna",
                beach: "Praia de Itaúna",
                city: "Saquarema",
                state: "RJ",
                latitude: -22.9236,
                longitude: -42.5044,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Maravilha Nacional. Ondas world-class.",
                bestSeason: ["Outono", "Inverno"],
              },
              {
                id: "rj-saquarema-itauna-2",
                name: "Vila",
                beach: "Praia de Itaúna",
                city: "Saquarema",
                state: "RJ",
                latitude: -22.9261,
                longitude: -42.4997,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Área mais urbana de Itaúna com ondas mais suaves.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia de Jaconé",
            city: "Saquarema",
            state: "RJ",
            spots: [
              {
                id: "rj-saquarema-jacone-1",
                name: "Jaconé",
                beach: "Praia de Jaconé",
                city: "Saquarema",
                state: "RJ",
                latitude: -22.9092,
                longitude: -42.6456,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia mais tranquila.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia de Barra Nova",
            city: "Saquarema",
            state: "RJ",
            spots: [
              {
                id: "rj-saquarema-barranova-1",
                name: "Barra Nova",
                beach: "Praia de Barra Nova",
                city: "Saquarema",
                state: "RJ",
                latitude: -22.8844,
                longitude: -42.5669,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia extensa e vazia, ótima para aprendizado.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Rio das Ostras",
        state: "RJ",
        beaches: [
          {
            name: "Praia do Centro",
            city: "Rio das Ostras",
            state: "RJ",
            spots: [
              {
                id: "rj-riodasostras-centro-1",
                name: "Centro",
                beach: "Praia do Centro",
                city: "Rio das Ostras",
                state: "RJ",
                latitude: -22.5253,
                longitude: -41.9519,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com ondas consistentes.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia da Joana",
            city: "Rio das Ostras",
            state: "RJ",
            spots: [
              {
                id: "rj-riodasostras-joana-1",
                name: "Joana",
                beach: "Praia da Joana",
                city: "Rio das Ostras",
                state: "RJ",
                latitude: -22.5167,
                longitude: -41.9389,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia popular com boa formação de ondas.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
        ],
      },
      {
        name: "Cabo Frio",
        state: "RJ",
        beaches: [
          {
            name: "Praia do Forte",
            city: "Cabo Frio",
            state: "RJ",
            spots: [
              {
                id: "rj-cabofrio-forte-1",
                name: "Forte",
                beach: "Praia do Forte",
                city: "Cabo Frio",
                state: "RJ",
                latitude: -22.8833,
                longitude: -42.0161,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Ondas consistentes e boas para aprender.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Arraial do Cabo",
        state: "RJ",
        beaches: [
          {
            name: "Praia Grande",
            city: "Arraial do Cabo",
            state: "RJ",
            spots: [
              {
                id: "rj-arraial-grande-1",
                name: "Praia Grande",
                beach: "Praia Grande",
                city: "Arraial do Cabo",
                state: "RJ",
                latitude: -22.9667,
                longitude: -42.0272,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia bonita com boas ondas.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
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
                beachOrientation: 160, // Sul-Sudeste
                waveAttenuationFactor: 0.05, // CORRIGIDO: Enseada MUITO protegida - bloqueia 95% das ondas
                levels: { beginner: false, intermediate: false, advanced: false }, // SEM ONDAS PARA SURF
                description: "Praia paradisíaca em enseada muito protegida. SEM ondas para surf - ideal para mergulho e banho. Acesso por trilha ou barco.",
                bestSeason: ["Verão", "Outono", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Búzios",
        state: "RJ",
        beaches: [
          {
            name: "Praia de Geribá",
            city: "Búzios",
            state: "RJ",
            spots: [
              {
                id: "rj-buzios-geriba-1",
                name: "Geribá",
                beach: "Praia de Geribá",
                city: "Búzios",
                state: "RJ",
                latitude: -22.7675,
                longitude: -41.8836,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia mais movimentada de Búzios.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia de Tucuns",
            city: "Búzios",
            state: "RJ",
            spots: [
              {
                id: "rj-buzios-tucuns-1",
                name: "Tucuns",
                beach: "Praia de Tucuns",
                city: "Búzios",
                state: "RJ",
                latitude: -22.7492,
                longitude: -41.8669,
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia com ondas mais fortes e menos lotada.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia Rasa",
            city: "Búzios",
            state: "RJ",
            spots: [
              {
                id: "rj-buzios-rasa-1",
                name: "Rasa",
                beach: "Praia Rasa",
                city: "Búzios",
                state: "RJ",
                latitude: -22.7539,
                longitude: -41.8744,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com ondas moderadas.",
                bestSeason: ["Ver��o", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Maricá",
        state: "RJ",
        beaches: [
          {
            name: "Praia de Itaipuaçu",
            city: "Maricá",
            state: "RJ",
            spots: [
              {
                id: "rj-marica-itaipuacu-1",
                name: "Itaipuaçu",
                beach: "Praia de Itaipuaçu",
                city: "Maricá",
                state: "RJ",
                latitude: -22.9689,
                longitude: -43.0197,
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia extensa com boas ondas e vários picos.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
          {
            name: "Praia de Ponta Negra",
            city: "Maricá",
            state: "RJ",
            spots: [
              {
                id: "rj-marica-pontanegra-1",
                name: "Ponta Negra",
                beach: "Praia de Ponta Negra",
                city: "Maricá",
                state: "RJ",
                latitude: -23.0342,
                longitude: -43.4894,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia selvagem com ondas tubulares.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Barra de Marica",
            city: "Marica",
            state: "RJ",
            spots: [
              {
                id: "rj-marica-barrademarica-1",
                name: "Barra de Marica",
                beach: "Barra de Marica",
                city: "Marica",
                state: "RJ",
                latitude: -22.9500,
                longitude: -42.8333,
                beachOrientation: 150,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Canal de Marica. Ondas consistentes.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Niterói",
        state: "RJ",
        beaches: [
          {
            name: "Praia de Itacoatiara",
            city: "Niterói",
            state: "RJ",
            spots: [
              {
                id: "rj-niteroi-itacoatiara-1",
                name: "Itacoatiara",
                beach: "Praia de Itacoatiara",
                city: "Niterói",
                state: "RJ",
                latitude: -22.9458,
                longitude: -43.0503,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Linda praia com ondas fortes e tubulares.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Itaipu",
            city: "Niterói",
            state: "RJ",
            spots: [
              {
                id: "rj-niteroi-itaipu-1",
                name: "Itaipu",
                beach: "Praia de Itaipu",
                city: "Niterói",
                state: "RJ",
                latitude: -22.9650,
                longitude: -43.0422,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia familiar com ondas acessíveis.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
        ],
      },
      {
        name: "Mangaratiba",
        state: "RJ",
        beaches: [
          {
            name: "Praia de Muriqui",
            city: "Mangaratiba",
            state: "RJ",
            spots: [
              {
                id: "rj-mangaratiba-muriqui-1",
                name: "Muriqui",
                beach: "Praia de Muriqui",
                city: "Mangaratiba",
                state: "RJ",
                latitude: -22.9667,
                longitude: -44.0325,
                beachOrientation: 200, // Sul-Sudoeste - área semi-protegida da baía
                waveAttenuationFactor: 0.5, // Praia tranquila com ondas moderadamente reduzidas
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila em área semi-protegida com ondas suaves.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Angra dos Reis",
        state: "RJ",
        beaches: [
          {
            name: "Praia Grande da Cajaíba",
            city: "Angra dos Reis",
            state: "RJ",
            spots: [
              {
                id: "rj-angra-cajaiba-1",
                name: "Cajaíba",
                beach: "Praia Grande da Cajaíba",
                city: "Angra dos Reis",
                state: "RJ",
                latitude: -23.1856,
                longitude: -44.3358,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia isolada e selvagem. Acesso por trilha ou barco.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Aventureiro",
            city: "Angra dos Reis",
            state: "RJ",
            spots: [
              {
                id: "rj-angra-aventureiro-1",
                name: "Aventureiro",
                beach: "Praia do Aventureiro",
                city: "Angra dos Reis",
                state: "RJ",
                latitude: -23.1667,
                longitude: -44.3167,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia paradisíaca na Ilha Grande com ondas constantes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Paraty",
        state: "RJ",
        beaches: [
          {
            name: "Praia de Trindade",
            city: "Paraty",
            state: "RJ",
            spots: [
              {
                id: "rj-paraty-trindade-1",
                name: "Trindade",
                beach: "Praia de Trindade",
                city: "Paraty",
                state: "RJ",
                latitude: -23.3586,
                longitude: -44.7178,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia de vila de pescadores com ótimas ondas.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia do Sono",
            city: "Paraty",
            state: "RJ",
            spots: [
              {
                id: "rj-paraty-sono-1",
                name: "Sono",
                beach: "Praia do Sono",
                city: "Paraty",
                state: "RJ",
                latitude: -23.3494,
                longitude: -44.6008,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia isolada com ondas moderadas. Acesso por trilha.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
        ],
      },
      {
        name: "Macaé",
        state: "RJ",
        beaches: [
          {
            name: "Praia do Pecado",
            city: "Macaé",
            state: "RJ",
            spots: [
              {
                id: "rj-macae-pecado-1",
                name: "Pecado",
                beach: "Praia do Pecado",
                city: "Macaé",
                state: "RJ",
                latitude: -22.3683,
                longitude: -41.7858,
                beachOrientation: 80, // Leste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com ondas consistentes e boa estrutura.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia dos Cavaleiros",
            city: "Macaé",
            state: "RJ",
            spots: [
              {
                id: "rj-macae-cavaleiros-1",
                name: "Cavaleiros",
                beach: "Praia dos Cavaleiros",
                city: "Macaé",
                state: "RJ",
                latitude: -22.3767,
                longitude: -41.7917,
                beachOrientation: 85, // Leste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Principal praia de surf de Macaé, com ondas para todos os níveis.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
          {
            name: "Praia do Forte",
            city: "Macaé",
            state: "RJ",
            spots: [
              {
                id: "rj-macae-forte-1",
                name: "Forte",
                beach: "Praia do Forte",
                city: "Macaé",
                state: "RJ",
                latitude: -22.3800,
                longitude: -41.7950,
                beachOrientation: 90, // Leste - vento Oeste é terral
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia com ondas mais fortes e tubulares, ideal para surfistas experientes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia Campista",
            city: "Macaé",
            state: "RJ",
            spots: [
              {
                id: "rj-macae-campista-1",
                name: "Campista",
                beach: "Praia Campista",
                city: "Macaé",
                state: "RJ",
                latitude: -22.3917,
                longitude: -41.8033,
                beachOrientation: 75, // Leste-Nordeste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Beach break com ondas suaves, muito popular entre moradores.",
                bestSeason: ["Verão", "Outono", "Primavera"],
              },
            ],
          },
          {
            name: "Praia Imbetiba",
            city: "Macaé",
            state: "RJ",
            spots: [
              {
                id: "rj-macae-imbetiba-1",
                name: "Imbetiba",
                beach: "Praia Imbetiba",
                city: "Macaé",
                state: "RJ",
                latitude: -22.3650,
                longitude: -41.7800,
                beachOrientation: 70, // Leste-Nordeste - vento Oeste é terral
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia urbana calma, ideal para iniciantes.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Ilha Grande",
        state: "RJ",
        beaches: [
          {
            name: "Lopes Mendes",
            city: "Ilha Grande",
            state: "RJ",
            spots: [
              {
                id: "rj-ilhagrande-lopesmendes-1",
                name: "Lopes Mendes",
                beach: "Lopes Mendes",
                city: "Ilha Grande",
                state: "RJ",
                latitude: -23.1667,
                longitude: -44.2833,
                beachOrientation: 180,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Considerada uma das praias mais bonitas do Brasil. Ondas fortes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Casimiro de Abreu",
        state: "RJ",
        beaches: [
          {
            name: "Barra de Sao Joao",
            city: "Casimiro de Abreu",
            state: "RJ",
            spots: [
              {
                id: "rj-casimiro-barrasaojoao-1",
                name: "Barra de Sao Joao",
                beach: "Barra de Sao Joao",
                city: "Casimiro de Abreu",
                state: "RJ",
                latitude: -22.6167,
                longitude: -41.9500,
                beachOrientation: 125,
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Foz do rio com ondas consistentes.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Sao Joao da Barra",
        state: "RJ",
        beaches: [
          {
            name: "Praia de Grussai",
            city: "Sao Joao da Barra",
            state: "RJ",
            spots: [
              {
                id: "rj-saojoao-grussai-1",
                name: "Grussai",
                beach: "Praia de Grussai",
                city: "Sao Joao da Barra",
                state: "RJ",
                latitude: -21.7333,
                longitude: -41.0167,
                beachOrientation: 110,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia ao norte do estado. Ondas moderadas.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "SP",
    name: "São Paulo",
    cities: [
      {
        name: "Ubatuba",
        state: "SP",
        beaches: [
          {
            name: "Praia do Félix",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-felix-1",
                name: "Pico Principal",
                beach: "Praia do Félix",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.4958,
                longitude: -45.1358,
                beachOrientation: 120, // Leste-Sudeste - costa voltada para leste-sudeste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Ondas consistentes com direita e esquerda. Melhor com swell de sul.",
                bestSeason: ["Outono", "Inverno"],
              },
              {
                id: "sp-ubatuba-felix-2",
                name: "Canto do Félix",
                beach: "Praia do Félix",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.4970,
                longitude: -45.1340,
                beachOrientation: 120, // Leste-Sudeste - costa voltada para leste-sudeste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Point break de direita, um dos melhores de Ubatuba.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia Grande",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-grande-1",
                name: "Canto Norte",
                beach: "Praia Grande",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.4434,
                longitude: -45.0768,
                beachOrientation: 95, // Leste - costa voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Ótimo para iniciantes. Ondas pequenas e consistentes.",
                bestSeason: ["Verão", "Primavera"],
              },
              {
                id: "sp-ubatuba-grande-2",
                name: "Centro da Grande",
                beach: "Praia Grande",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.4450,
                longitude: -45.0780,
                beachOrientation: 95, // Leste - costa voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Beach break com ondas suaves, ideal para aprendizado.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia do Tenório",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-tenorio-1",
                name: "Tenório",
                beach: "Praia do Tenório",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.4492,
                longitude: -45.0836,
                beachOrientation: 95, // Leste - costa voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com ondas constantes.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia do Saco da Ribeira",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-sacodaribeira-1",
                name: "Saco da Ribeira",
                beach: "Praia do Saco da Ribeira",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.4983,
                longitude: -45.1206,
                beachOrientation: 280, // Oeste - saco/enseada muito protegida, quase sem ondas. Protegida de swells de sul, leste e norte.
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Saco/enseada muito protegida e calma, quase sem ondas. Ideal para stand-up paddle e iniciantes absolutos. Protegida de praticamente todos os swells oceânicos.",
                bestSeason: ["Verão"],
              },
            ],
          },
          {
            name: "Itamambuca",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-itamambuca-1",
                name: "Pico Central",
                beach: "Itamambuca",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.3644,
                longitude: -44.9503,
                beachOrientation: 85, // Leste - costa voltada para leste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Uma das melhores ondas de SP. Tubos na maré baixa.",
                bestSeason: ["Outono", "Inverno"],
              },
              {
                id: "sp-ubatuba-itamambuca-2",
                name: "Canto da Itamambuca",
                beach: "Itamambuca",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.3620,
                longitude: -44.9480,
                beachOrientation: 85, // Leste - costa voltada para leste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Direita longa e perfeita, palco de campeonatos.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia Vermelha do Norte",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-vermelha-1",
                name: "Vermelha do Norte",
                beach: "Praia Vermelha do Norte",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.3569,
                longitude: -44.9406,
                beachOrientation: 85, // Leste - costa voltada para leste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia selvagem com ondas fortes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Fortaleza",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-fortaleza-1",
                name: "Fortaleza",
                beach: "Praia da Fortaleza",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.5161,
                longitude: -45.1378,
                beachOrientation: 115, // Leste-Sudeste - costa voltada para leste-sudeste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Pico famoso com direitas longas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia Vermelha do Centro",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-vermelhacentro-1",
                name: "Vermelha do Centro",
                beach: "Praia Vermelha do Centro",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.4986,
                longitude: -45.1189,
                beachOrientation: 110, // Leste-Sudeste - costa voltada para leste-sudeste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia com boas ondas e menos movimento que outras praias.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Almada",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-almada-1",
                name: "Almada",
                beach: "Praia da Almada",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.4703,
                longitude: -45.1042,
                beachOrientation: 105, // Leste-Sudeste - costa voltada para leste
                waveAttenuationFactor: 0.7, // Praia tranquila, levemente protegida
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com ondas suaves ideais para iniciantes.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia Dura",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-dura-1",
                name: "Praia Dura",
                beach: "Praia Dura",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.3533,
                longitude: -44.9300,
                beachOrientation: 80, // Leste - costa voltada para leste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Pico selvagem com ondas fortes e consistentes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Cedro",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-cedro-1",
                name: "Cedro",
                beach: "Praia do Cedro",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.5000,
                longitude: -45.1200,
                beachOrientation: 110, // Leste-Sudeste - costa voltada para leste-sudeste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Beach break com ondas rápidas e tubulares.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Lázaro",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-lazaro-1",
                name: "Lázaro",
                beach: "Praia do Lázaro",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.3625,
                longitude: -44.9514,
                beachOrientation: 90, // Leste - costa voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia extensa com ondas suaves, boa para todos os níveis.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia de Domingas Dias",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-domingasdias-1",
                name: "Domingas Dias",
                beach: "Praia de Domingas Dias",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.4969,
                longitude: -45.1422,
                beachOrientation: 195, // Sul-Sudoeste - enseada protegida
                waveAttenuation: 0.6, // Enseada bastante protegida
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Enseada protegida com águas calmas, ideal para iniciantes e stand-up paddle.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia de Prumirim",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-prumirim-1",
                name: "Prumirim",
                beach: "Praia de Prumirim",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.3767,
                longitude: -44.9658,
                beachOrientation: 85, // Leste - costa voltada para leste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia selvagem e preservada com ondas consistentes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Picinguaba",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-picinguaba-1",
                name: "Picinguaba",
                beach: "Praia de Picinguaba",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.3658,
                longitude: -44.8375,
                beachOrientation: 80, // Leste - costa voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia rústica em vila de pescadores com ondas suaves.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia de Ubatumirim",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-ubatumirim-1",
                name: "Ubatumirim",
                beach: "Praia de Ubatumirim",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.3333,
                longitude: -44.8667,
                beachOrientation: 75, // Leste-Nordeste - costa voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia deserta e preservada com ondas moderadas.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia da Barra Seca",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-barraseca-1",
                name: "Barra Seca",
                beach: "Praia da Barra Seca",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.3414,
                longitude: -44.8808,
                beachOrientation: 80, // Leste - costa voltada para leste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia selvagem de difícil acesso com ondas fortes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Sununga",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-sununga-1",
                name: "Sununga",
                beach: "Praia da Sununga",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.4436,
                longitude: -45.0856,
                beachOrientation: 95, // Leste - costa voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia popular com ondas constantes e boa estrutura.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia de Itamambuca",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-itamambuca-1",
                name: "Itamambuca",
                beach: "Praia de Itamambuca",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.3881,
                longitude: -44.9908,
                beachOrientation: 85, // Leste - costa voltada para leste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Uma das melhores ondas de SP. Palco de campeonatos nacionais e internacionais. Beach break de alta qualidade.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia Vermelha do Norte",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-vermelhadonorte-1",
                name: "Vermelha do Norte",
                beach: "Praia Vermelha do Norte",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.3503,
                longitude: -44.9128,
                beachOrientation: 80, // Leste - costa voltada para leste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia isolada com ondas fortes e tubulares, acesso por trilha.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia Vermelha do Centro",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-vermelhadocentro-1",
                name: "Vermelha do Centro",
                beach: "Praia Vermelha do Centro",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.4881,
                longitude: -45.1047,
                beachOrientation: 95, // Leste - costa voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia pequena e charmosa com ondas suaves.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia da Almada",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-almada-1",
                name: "Almada",
                beach: "Praia da Almada",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.4464,
                longitude: -45.0714,
                beachOrientation: 95, // Leste - costa voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia com ondas moderadas e bom acesso.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia Brava da Almada",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-bravadaalmada-1",
                name: "Brava da Almada",
                beach: "Praia Brava da Almada",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.4503,
                longitude: -45.0761,
                beachOrientation: 95, // Leste - costa voltada para leste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia selvagem com ondas fortes, acesso por trilha.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Flamengo",
            city: "Ubatuba",
            state: "SP",
            spots: [
              {
                id: "sp-ubatuba-flamengo-1",
                name: "Flamengo",
                beach: "Praia do Flamengo",
                city: "Ubatuba",
                state: "SP",
                latitude: -23.5017,
                longitude: -45.1256,
                beachOrientation: 200, // Sul-Sudoeste - enseada protegida
                waveAttenuation: 0.7, // Muito protegida, voltada para o continente
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Enseada muito protegida e calma, ideal para iniciantes.",
                bestSeason: ["Verão"],
              },
            ],
          },
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
                latitude: -23.4667,
                longitude: -45.0833,
                beachOrientation: 105,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com ondas suaves. Boa para iniciantes.",
                bestSeason: ["Verao", "Primavera"],
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
                latitude: -23.4492,
                longitude: -45.0758,
                beachOrientation: 100,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana de Ubatuba com ondas acessiveis.",
                bestSeason: ["Verao", "Primavera"],
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
                latitude: -23.4883,
                longitude: -45.1189,
                beachOrientation: 115,
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia com ondas consistentes para todos os niveis.",
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
                latitude: -23.4950,
                longitude: -45.1244,
                beachOrientation: 110,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia familiar com ondas suaves.",
                bestSeason: ["Verao", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "São Sebastião",
        state: "SP",
        beaches: [
          {
            name: "Praia de Maresias",
            city: "São Sebastião",
            state: "SP",
            spots: [
              {
                id: "sp-maresias-1",
                name: "Canto Norte",
                beach: "Praia de Maresias",
                city: "São Sebastião",
                state: "SP",
                latitude: -23.7892,
                longitude: -45.5556,
                beachOrientation: 105, // Leste-Sudeste - costa voltada para leste-sudeste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Ondas rápidas e poderosas. Palco de campeonatos.",
                bestSeason: ["Outono", "Inverno"],
              },
              {
                id: "sp-maresias-2",
                name: "Centro",
                beach: "Praia de Maresias",
                city: "São Sebastião",
                state: "SP",
                latitude: -23.7950,
                longitude: -45.5600,
                beachOrientation: 105, // Leste-Sudeste - costa voltada para leste-sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Ondas mais suaves no centro da praia.",
                bestSeason: ["Verão", "Primavera"],
              },
              {
                id: "sp-maresias-3",
                name: "Canto Sul",
                beach: "Praia de Maresias",
                city: "São Sebastião",
                state: "SP",
                latitude: -23.8000,
                longitude: -45.5620,
                beachOrientation: 105, // Leste-Sudeste - costa voltada para leste-sudeste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Point break de esquerda com ondas longas e perfeitas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Paúba",
            city: "São Sebastião",
            state: "SP",
            spots: [
              {
                id: "sp-saosebastiao-pauba-1",
                name: "Paúba",
                beach: "Paúba",
                city: "São Sebastião",
                state: "SP",
                latitude: -23.7658,
                longitude: -45.5347,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com boas ondas.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Camburi",
            city: "São Sebastião",
            state: "SP",
            spots: [
              {
                id: "sp-saosebastiao-camburi-1",
                name: "Camburi",
                beach: "Camburi",
                city: "São Sebastião",
                state: "SP",
                latitude: -23.5908,
                longitude: -45.4153,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Ondas fortes e selvagens.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Boiçucanga",
            city: "São Sebastião",
            state: "SP",
            spots: [
              {
                id: "sp-saosebastiao-boicucanga-1",
                name: "Boiçucanga",
                beach: "Boiçucanga",
                city: "São Sebastião",
                state: "SP",
                latitude: -23.7372,
                longitude: -45.5194,
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia versátil com ondas para todos os níveis.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
          {
            name: "Praia Brava",
            city: "São Sebastião",
            state: "SP",
            spots: [
              {
                id: "sp-saosebastiao-brava-1",
                name: "Brava",
                beach: "Praia Brava",
                city: "São Sebastião",
                state: "SP",
                latitude: -23.8056,
                longitude: -45.5667,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia selvagem com acesso por trilha. Ondas fortes e consistentes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Juquehy",
            city: "São Sebastião",
            state: "SP",
            spots: [
              {
                id: "sp-saosebastiao-juquehy-1",
                name: "Juquehy",
                beach: "Juquehy",
                city: "São Sebastião",
                state: "SP",
                latitude: -23.7206,
                longitude: -45.5064,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia extensa com ondas suaves e consistentes.",
                bestSeason: ["Verão", "Outono", "Primavera"],
              },
            ],
          },
          {
            name: "Barequeçaba",
            city: "São Sebastião",
            state: "SP",
            spots: [
              {
                id: "sp-saosebastiao-barequecaba-1",
                name: "Barequeçaba",
                beach: "Barequeçaba",
                city: "São Sebastião",
                state: "SP",
                latitude: -23.8292,
                longitude: -45.4300,
                beachOrientation: 250, // Oeste-Sudoeste - canal voltado para o continente
                waveAttenuation: 0.75, // Muito protegida pelo canal
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia muito protegida no canal de São Sebastião com águas calmas.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Camburizinho",
            city: "São Sebastião",
            state: "SP",
            spots: [
              {
                id: "sp-saosebastiao-camburizinho-1",
                name: "Camburizinho",
                beach: "Camburizinho",
                city: "São Sebastião",
                state: "SP",
                latitude: -23.5836,
                longitude: -45.4097,
                beachOrientation: 90, // Leste - costa voltada para leste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia pequena e selvagem com ondas fortes, próxima a Camburi.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Toque-Toque Grande",
            city: "São Sebastião",
            state: "SP",
            spots: [
              {
                id: "sp-saosebastiao-toquetoquegrande-1",
                name: "Toque-Toque Grande",
                beach: "Toque-Toque Grande",
                city: "São Sebastião",
                state: "SP",
                latitude: -23.7522,
                longitude: -45.5269,
                beachOrientation: 100, // Leste - costa voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com ondas suaves e mar azul.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Toque-Toque Pequeno",
            city: "São Sebastião",
            state: "SP",
            spots: [
              {
                id: "sp-saosebastiao-toquetoquepequeno-1",
                name: "Toque-Toque Pequeno",
                beach: "Toque-Toque Pequeno",
                city: "São Sebastião",
                state: "SP",
                latitude: -23.7606,
                longitude: -45.5317,
                beachOrientation: 100, // Leste - costa voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia pequena e charmosa com ondas moderadas.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Santiago",
            city: "São Sebastião",
            state: "SP",
            spots: [
              {
                id: "sp-saosebastiao-santiago-1",
                name: "Santiago",
                beach: "Santiago",
                city: "São Sebastião",
                state: "SP",
                latitude: -23.8144,
                longitude: -45.5708,
                beachOrientation: 105, // Leste-Sudeste - costa voltada para leste-sudeste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia com acesso por trilha, ondas fortes e tubulares.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Barra do Sahy",
            city: "São Sebastião",
            state: "SP",
            spots: [
              {
                id: "sp-saosebastiao-barradosahy-1",
                name: "Barra do Sahy",
                beach: "Barra do Sahy",
                city: "São Sebastião",
                state: "SP",
                latitude: -23.7083,
                longitude: -45.4975,
                beachOrientation: 95, // Leste - costa voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila e familiar com ondas suaves e mar limpo.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Guaecá",
            city: "São Sebastião",
            state: "SP",
            spots: [
              {
                id: "sp-saosebastiao-guaeca-1",
                name: "Guaecá",
                beach: "Guaecá",
                city: "São Sebastião",
                state: "SP",
                latitude: -23.7011,
                longitude: -45.4942,
                beachOrientation: 100, // Leste - costa voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia extensa e tranquila com boas ondas.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Barra do Una",
            city: "São Sebastião",
            state: "SP",
            spots: [
              {
                id: "sp-saosebastiao-barradouna-1",
                name: "Barra do Una",
                beach: "Barra do Una",
                city: "São Sebastião",
                state: "SP",
                latitude: -23.5239,
                longitude: -45.2853,
                beachOrientation: 85, // Leste - costa voltada para leste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia isolada e preservada com ondas consistentes e acesso por trilha.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Baleia",
            city: "Sao Sebastiao",
            state: "SP",
            spots: [
              {
                id: "sp-saosebastiao-baleia-1",
                name: "Baleia",
                beach: "Praia da Baleia",
                city: "Sao Sebastiao",
                state: "SP",
                latitude: -23.6667,
                longitude: -45.4500,
                beachOrientation: 110,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia selvagem com ondas tubulares. Acesso dificil.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Engenho",
            city: "Sao Sebastiao",
            state: "SP",
            spots: [
              {
                id: "sp-saosebastiao-engenho-1",
                name: "Engenho",
                beach: "Praia do Engenho",
                city: "Sao Sebastiao",
                state: "SP",
                latitude: -23.7333,
                longitude: -45.5167,
                beachOrientation: 105,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia com ondas suaves. Boa para intermediarios.",
                bestSeason: ["Verao", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Ilhabela",
        state: "SP",
        beaches: [
          {
            name: "Praia do Bonete",
            city: "Ilhabela",
            state: "SP",
            spots: [
              {
                id: "sp-ilhabela-bonete-1",
                name: "Bonete",
                beach: "Praia do Bonete",
                city: "Ilhabela",
                state: "SP",
                latitude: -23.8711,
                longitude: -45.3178,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia isolada com ondas excelentes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Feiticeira",
            city: "Ilhabela",
            state: "SP",
            spots: [
              {
                id: "sp-ilhabela-feiticeira-1",
                name: "Feiticeira",
                beach: "Praia da Feiticeira",
                city: "Ilhabela",
                state: "SP",
                latitude: -23.8167,
                longitude: -45.3500,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia de difícil acesso com ondas fortes e cristalinas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Curral",
            city: "Ilhabela",
            state: "SP",
            spots: [
              {
                id: "sp-ilhabela-curral-1",
                name: "Curral",
                beach: "Praia do Curral",
                city: "Ilhabela",
                state: "SP",
                latitude: -23.7667,
                longitude: -45.3500,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia com ondas suaves e fácil acesso.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Santos",
        state: "SP",
        beaches: [
          {
            name: "Praia do Gonzaga",
            city: "Santos",
            state: "SP",
            spots: [
              {
                id: "sp-santos-gonzaga-1",
                name: "Gonzaga",
                beach: "Praia do Gonzaga",
                city: "Santos",
                state: "SP",
                latitude: -23.9664,
                longitude: -46.3322,
                beachOrientation: 155, // Sudeste - baía protegida
                waveAttenuation: 0.8, // Muito protegida pela Baía de Santos
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia urbana com ondas pequenas.",
                bestSeason: ["Verão"],
              },
            ],
          },
          {
            name: "Praia do José Menino",
            city: "Santos",
            state: "SP",
            spots: [
              {
                id: "sp-santos-josemenino-1",
                name: "José Menino",
                beach: "Praia do José Menino",
                city: "Santos",
                state: "SP",
                latitude: -23.9700,
                longitude: -46.3400,
                beachOrientation: 155, // Sudeste - baía protegida
                waveAttenuation: 0.8, // Muito protegida pela Baía de Santos
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia urbana próxima ao centro de Santos.",
                bestSeason: ["Verão"],
              },
            ],
          },
          {
            name: "Praia do Aparecida",
            city: "Santos",
            state: "SP",
            spots: [
              {
                id: "sp-santos-aparecida-1",
                name: "Aparecida",
                beach: "Praia do Aparecida",
                city: "Santos",
                state: "SP",
                latitude: -23.9631,
                longitude: -46.3253,
                beachOrientation: 155, // Sudeste - baía protegida
                waveAttenuation: 0.8, // Muito protegida pela Baía de Santos
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia urbana com águas calmas.",
                bestSeason: ["Verão"],
              },
            ],
          },
        ],
      },
      {
        name: "São Vicente",
        state: "SP",
        beaches: [
          {
            name: "Praia do Itararé",
            city: "São Vicente",
            state: "SP",
            spots: [
              {
                id: "sp-saovicente-itarare-1",
                name: "Itararé",
                beach: "Praia do Itararé",
                city: "São Vicente",
                state: "SP",
                latitude: -23.9736,
                longitude: -46.3853,
                beachOrientation: 130, // Sudeste - costa voltada para sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com ondas moderadas.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia da Ilha Porchat",
            city: "São Vicente",
            state: "SP",
            spots: [
              {
                id: "sp-saovicente-ilhaporchat-1",
                name: "Ilha Porchat",
                beach: "Praia da Ilha Porchat",
                city: "São Vicente",
                state: "SP",
                latitude: -23.9883,
                longitude: -46.3947,
                beachOrientation: 150, // Sudeste - costa voltada para sudeste
                waveAttenuation: 0.8, // Protegida pela formação da ilha
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia pequena e abrigada com águas calmas.",
                bestSeason: ["Verão"],
              },
            ],
          },
          {
            name: "Praia da Litorânea",
            city: "São Vicente",
            state: "SP",
            spots: [
              {
                id: "sp-saovicente-litoranea-1",
                name: "Litorânea",
                beach: "Praia da Litorânea",
                city: "São Vicente",
                state: "SP",
                latitude: -23.9717,
                longitude: -46.3819,
                beachOrientation: 130, // Sudeste - costa voltada para sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com ondas constantes e boa estrutura.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
        ],
      },
      {
        name: "Peruíbe",
        state: "SP",
        beaches: [
          {
            name: "Praia do Guaraú",
            city: "Peruíbe",
            state: "SP",
            spots: [
              {
                id: "sp-peruibe-guarau-1",
                name: "Guaraú",
                beach: "Praia do Guaraú",
                city: "Peruíbe",
                state: "SP",
                latitude: -24.3897,
                longitude: -47.0206,
                beachOrientation: 115, // Leste-Sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia extensa com ondas constantes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Arpoador",
            city: "Peruíbe",
            state: "SP",
            spots: [
              {
                id: "sp-peruibe-arpoador-1",
                name: "Arpoador",
                beach: "Praia do Arpoador",
                city: "Peruíbe",
                state: "SP",
                latitude: -24.3200,
                longitude: -46.9900,
                beachOrientation: 120, // Leste-Sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com boas ondas e fácil acesso.",
                bestSeason: ["Verão", "Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Ruínas",
            city: "Peruíbe",
            state: "SP",
            spots: [
              {
                id: "sp-peruibe-ruinas-1",
                name: "Ruínas",
                beach: "Praia do Ruínas",
                city: "Peruíbe",
                state: "SP",
                latitude: -24.3092,
                longitude: -46.9842,
                beachOrientation: 120, // Leste-Sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com ondas constantes e estrutura completa.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Peruíbe",
            city: "Peruíbe",
            state: "SP",
            spots: [
              {
                id: "sp-peruibe-centro-1",
                name: "Centro de Peruíbe",
                beach: "Praia de Peruíbe",
                city: "Peruíbe",
                state: "SP",
                latitude: -24.3181,
                longitude: -46.9978,
                beachOrientation: 120, // Leste-Sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia extensa no centro da cidade com ondas moderadas.",
                bestSeason: ["Verão", "Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Itanhaém",
        state: "SP",
        beaches: [
          {
            name: "Praia dos Sonhos",
            city: "Itanhaém",
            state: "SP",
            spots: [
              {
                id: "sp-itanhaem-sonhos-1",
                name: "Sonhos",
                beach: "Praia dos Sonhos",
                city: "Itanhaém",
                state: "SP",
                latitude: -24.1878,
                longitude: -46.7819,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia popular com boas ondas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Belas Artes",
            city: "Itanhaém",
            state: "SP",
            spots: [
              {
                id: "sp-itanhaem-belasartes-1",
                name: "Belas Artes",
                beach: "Praia do Belas Artes",
                city: "Itanhaém",
                state: "SP",
                latitude: -24.1950,
                longitude: -46.7900,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com ondas constantes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Cibratel",
            city: "Itanhaém",
            state: "SP",
            spots: [
              {
                id: "sp-itanhaem-cibratel-1",
                name: "Cibratel",
                beach: "Praia do Cibratel",
                city: "Itanhaém",
                state: "SP",
                latitude: -24.2019,
                longitude: -46.7944,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Beach break com ondas constantes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Caraguatatuba",
        state: "SP",
        beaches: [
          {
            name: "Praia do Massaguaçu",
            city: "Caraguatatuba",
            state: "SP",
            spots: [
              {
                id: "sp-caraguatatuba-massaguacu-1",
                name: "Massaguaçu",
                beach: "Praia do Massaguaçu",
                city: "Caraguatatuba",
                state: "SP",
                latitude: -23.6217,
                longitude: -45.4108,
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia extensa com vários picos e ondas variadas.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
          {
            name: "Praia Martim de Sá",
            city: "Caraguatatuba",
            state: "SP",
            spots: [
              {
                id: "sp-caraguatatuba-martinsa-1",
                name: "Martim de Sá",
                beach: "Praia Martim de Sá",
                city: "Caraguatatuba",
                state: "SP",
                latitude: -23.6536,
                longitude: -45.4267,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com ondas acessíveis.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia da Cocanha",
            city: "Caraguatatuba",
            state: "SP",
            spots: [
              {
                id: "sp-caraguatatuba-cocanha-1",
                name: "Cocanha",
                beach: "Praia da Cocanha",
                city: "Caraguatatuba",
                state: "SP",
                latitude: -23.6003,
                longitude: -45.3911,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com ondas suaves, ideal para iniciantes.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia da Tabatinga",
            city: "Caraguatatuba",
            state: "SP",
            spots: [
              {
                id: "sp-caraguatatuba-tabatinga-1",
                name: "Tabatinga",
                beach: "Praia da Tabatinga",
                city: "Caraguatatuba",
                state: "SP",
                latitude: -23.5850,
                longitude: -45.3789,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Beach break com ondas consistentes e estrutura completa.",
                bestSeason: ["Verão", "Outono", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Guarujá",
        state: "SP",
        beaches: [
          {
            name: "Praia de Pernambuco",
            city: "Guarujá",
            state: "SP",
            spots: [
              {
                id: "sp-guaruja-pernambuco-1",
                name: "Pernambuco",
                beach: "Praia de Pernambuco",
                city: "Guarujá",
                state: "SP",
                latitude: -23.9981,
                longitude: -46.2419,
                beachOrientation: 145, // Sudeste - costa voltada para sudeste
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia calma e sofisticada, ideal para iniciantes.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia das Astúrias",
            city: "Guarujá",
            state: "SP",
            spots: [
              {
                id: "sp-guaruja-asturias-1",
                name: "Astúrias",
                beach: "Praia das Astúrias",
                city: "Guarujá",
                state: "SP",
                latitude: -23.9936,
                longitude: -46.2461,
                beachOrientation: 140, // Sudeste - costa voltada para sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com ondas moderadas e boa estrutura.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia do Tombo",
            city: "Guarujá",
            state: "SP",
            spots: [
              {
                id: "sp-guaruja-tombo-1",
                name: "Tombo",
                beach: "Praia do Tombo",
                city: "Guarujá",
                state: "SP",
                latitude: -23.9964,
                longitude: -46.2503,
                beachOrientation: 130, // Sudeste - costa voltada para sudeste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Uma das melhores ondas de SP. Beach break forte e tubular.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Enseada",
            city: "Guarujá",
            state: "SP",
            spots: [
              {
                id: "sp-guaruja-enseada-1",
                name: "Enseada",
                beach: "Praia da Enseada",
                city: "Guarujá",
                state: "SP",
                latitude: -23.9825,
                longitude: -46.2147,
                beachOrientation: 135, // Sudeste - costa voltada para sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia extensa com ondas suaves, ideal para aprendizado.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia de Pitangueiras",
            city: "Guarujá",
            state: "SP",
            spots: [
              {
                id: "sp-guaruja-pitangueiras-1",
                name: "Pitangueiras",
                beach: "Praia de Pitangueiras",
                city: "Guarujá",
                state: "SP",
                latitude: -23.9894,
                longitude: -46.2556,
                beachOrientation: 130, // Sudeste - costa voltada para sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana popular com ondas acessíveis.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia do Góes",
            city: "Guarujá",
            state: "SP",
            spots: [
              {
                id: "sp-guaruja-goes-1",
                name: "Góes",
                beach: "Praia do Góes",
                city: "Guarujá",
                state: "SP",
                latitude: -23.9786,
                longitude: -46.2081,
                beachOrientation: 135, // Sudeste - costa voltada para sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia com boas ondas e ambiente familiar.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia do Éden",
            city: "Guarujá",
            state: "SP",
            spots: [
              {
                id: "sp-guaruja-eden-1",
                name: "Éden",
                beach: "Praia do Éden",
                city: "Guarujá",
                state: "SP",
                latitude: -23.9833,
                longitude: -46.2114,
                beachOrientation: 135, // Sudeste - costa voltada para sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com ondas constantes.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia do Guaiúba",
            city: "Guarujá",
            state: "SP",
            spots: [
              {
                id: "sp-guaruja-guaiuba-1",
                name: "Guaiúba",
                beach: "Praia do Guaiúba",
                city: "Guarujá",
                state: "SP",
                latitude: -23.9597,
                longitude: -46.1908,
                beachOrientation: 140, // Sudeste - costa voltada para sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia preservada com águas limpas e ondas moderadas.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia Preta",
            city: "Guarujá",
            state: "SP",
            spots: [
              {
                id: "sp-guaruja-preta-1",
                name: "Preta",
                beach: "Praia Preta",
                city: "Guarujá",
                state: "SP",
                latitude: -23.9911,
                longitude: -46.2528,
                beachOrientation: 130, // Sudeste - costa voltada para sudeste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia pequena com ondas fortes entre costões rochosos.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Prainha Branca",
            city: "Guarujá",
            state: "SP",
            spots: [
              {
                id: "sp-guaruja-prainha-branca-1",
                name: "Prainha Branca",
                beach: "Prainha Branca",
                city: "Guarujá",
                state: "SP",
                latitude: -23.9933,
                longitude: -46.2631,
                beachOrientation: 130, // Sudeste - costa voltada para sudeste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia de difícil acesso com ondas fortes e mar cristalino.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Iporanga",
            city: "Guarujá",
            state: "SP",
            spots: [
              {
                id: "sp-guaruja-iporanga-1",
                name: "Iporanga",
                beach: "Praia do Iporanga",
                city: "Guarujá",
                state: "SP",
                latitude: -23.9850,
                longitude: -46.2169,
                beachOrientation: 135, // Sudeste - costa voltada para sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com ondas suaves e boa infraestrutura.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia de Perequê",
            city: "Guarujá",
            state: "SP",
            spots: [
              {
                id: "sp-guaruja-pereque-1",
                name: "Perequê",
                beach: "Praia de Perequê",
                city: "Guarujá",
                state: "SP",
                latitude: -23.9650,
                longitude: -46.1986,
                beachOrientation: 140, // Sudeste - costa voltada para sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia com ondas moderadas e ambiente tranquilo.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
        ],
      },
      {
        name: "Praia Grande",
        state: "SP",
        beaches: [
          {
            name: "Praia do Canto do Forte",
            city: "Praia Grande",
            state: "SP",
            spots: [
              {
                id: "sp-praiagrande-cantoforte-1",
                name: "Canto do Forte",
                beach: "Praia do Canto do Forte",
                city: "Praia Grande",
                state: "SP",
                latitude: -24.0072,
                longitude: -46.4117,
                beachOrientation: 125, // Leste-Sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Beach break com ondas constantes, um dos melhores picos de Praia Grande.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Vila Mirim",
            city: "Praia Grande",
            state: "SP",
            spots: [
              {
                id: "sp-praiagrande-vilamirim-1",
                name: "Vila Mirim",
                beach: "Praia da Vila Mirim",
                city: "Praia Grande",
                state: "SP",
                latitude: -24.0156,
                longitude: -46.4278,
                beachOrientation: 125, // Leste-Sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com ondas moderadas e fácil acesso.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Boqueirão",
            city: "Praia Grande",
            state: "SP",
            spots: [
              {
                id: "sp-praiagrande-boqueirao-1",
                name: "Boqueirão",
                beach: "Praia do Boqueirão",
                city: "Praia Grande",
                state: "SP",
                latitude: -24.0050,
                longitude: -46.4100,
                beachOrientation: 125, // Leste-Sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana popular com ondas acessíveis.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
        ],
      },
      {
        name: "Mongaguá",
        state: "SP",
        beaches: [
          {
            name: "Praia Central",
            city: "Mongaguá",
            state: "SP",
            spots: [
              {
                id: "sp-mongagua-central-1",
                name: "Mongaguá Centro",
                beach: "Praia Central",
                city: "Mongaguá",
                state: "SP",
                latitude: -24.0931,
                longitude: -46.6211,
                beachOrientation: 125, // Leste-Sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Beach break extenso com ondas consistentes.",
                bestSeason: ["Outono", "Inverno"],
              },
              {
                id: "sp-mongagua-aguapeu-1",
                name: "Aguapeú",
                beach: "Praia Central",
                city: "Mongaguá",
                state: "SP",
                latitude: -24.1000,
                longitude: -46.6300,
                beachOrientation: 125, // Leste-Sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Região do Aguapeú com ondas constantes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Iguape",
        state: "SP",
        beaches: [
          {
            name: "Praia da Juréia",
            city: "Iguape",
            state: "SP",
            spots: [
              {
                id: "sp-iguape-jureia-1",
                name: "Juréia",
                beach: "Praia da Juréia",
                city: "Iguape",
                state: "SP",
                latitude: -24.5250,
                longitude: -47.2450,
                beachOrientation: 110, // Leste-Sudeste - área de preservação
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia selvagem em área de preservação ambiental com ondas potentes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Leste",
            city: "Iguape",
            state: "SP",
            spots: [
              {
                id: "sp-iguape-leste-1",
                name: "Leste",
                beach: "Praia do Leste",
                city: "Iguape",
                state: "SP",
                latitude: -24.6828,
                longitude: -47.5406,
                beachOrientation: 105, // Leste-Sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia extensa e deserta com ondas moderadas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Bertioga",
        state: "SP",
        beaches: [
          {
            name: "Praia de Riviera de São Lourenço",
            city: "Bertioga",
            state: "SP",
            spots: [
              {
                id: "sp-bertioga-riviera-1",
                name: "Riviera",
                beach: "Praia de Riviera de São Lourenço",
                city: "Bertioga",
                state: "SP",
                latitude: -23.8528,
                longitude: -46.1417,
                beachOrientation: 120, // Leste-Sudeste - costa voltada para Leste-Sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia sofisticada com boas ondas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Itaguaré",
            city: "Bertioga",
            state: "SP",
            spots: [
              {
                id: "sp-bertioga-itaguare-1",
                name: "Itaguaré",
                beach: "Praia de Itaguaré",
                city: "Bertioga",
                state: "SP",
                latitude: -23.8711,
                longitude: -46.1608,
                beachOrientation: 120, // Leste-Sudeste - costa voltada para Leste-Sudeste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia mais selvagem com ondas poderosas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Indaiá",
            city: "Bertioga",
            state: "SP",
            spots: [
              {
                id: "sp-bertioga-indaia-1",
                name: "Indaiá",
                beach: "Praia de Indaiá",
                city: "Bertioga",
                state: "SP",
                latitude: -23.8639,
                longitude: -46.1528,
                beachOrientation: 120, // Leste-Sudeste - costa voltada para Leste-Sudeste. Vento Leste=Maral, Sudoeste=Terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com ondas suaves.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia de Boracéia",
            city: "Bertioga",
            state: "SP",
            spots: [
              {
                id: "sp-bertioga-boraceia-1",
                name: "Boracéia",
                beach: "Praia de Boracéia",
                city: "Bertioga",
                state: "SP",
                latitude: -23.7775,
                longitude: -45.9350,
                beachOrientation: 115, // Leste-Sudeste - costa voltada para Leste-Sudeste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Uma das melhores ondas de Bertioga. Beach break com ondas fortes e tubulares.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Saudade",
            city: "Bertioga",
            state: "SP",
            spots: [
              {
                id: "sp-bertioga-saudade-1",
                name: "Saudade",
                beach: "Praia da Saudade",
                city: "Bertioga",
                state: "SP",
                latitude: -23.8556,
                longitude: -46.1383,
                beachOrientation: 120, // Leste-Sudeste - costa voltada para Leste-Sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com ondas suaves e ambiente familiar.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia de São Lourenço",
            city: "Bertioga",
            state: "SP",
            spots: [
              {
                id: "sp-bertioga-saolourenco-1",
                name: "São Lourenço",
                beach: "Praia de São Lourenço",
                city: "Bertioga",
                state: "SP",
                latitude: -23.8422,
                longitude: -46.1247,
                beachOrientation: 120, // Leste-Sudeste - costa voltada para Leste-Sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia extensa com boas ondas e boa estrutura.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },

      {
        name: "Cananéia",
        state: "SP",
        beaches: [
          {
            name: "Praia do Marujá",
            city: "Cananéia",
            state: "SP",
            spots: [
              {
                id: "sp-cananeia-maruja-1",
                name: "Marujá",
                beach: "Praia do Marujá",
                city: "Cananéia",
                state: "SP",
                latitude: -25.1306,
                longitude: -47.9264,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia isolada com ondas fortes e natureza preservada.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Ilha Comprida",
        state: "SP",
        beaches: [
          {
            name: "Praia da Ilha Comprida",
            city: "Ilha Comprida",
            state: "SP",
            spots: [
              {
                id: "sp-ilhacomprida-1",
                name: "Ilha Comprida",
                beach: "Praia da Ilha Comprida",
                city: "Ilha Comprida",
                state: "SP",
                latitude: -24.7319,
                longitude: -47.5406,
                beachOrientation: 105, // Leste-Sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Extensa faixa de areia com ondas constantes e natureza preservada.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "SC",
    name: "Santa Catarina",
    cities: [
      {
        name: "Florianópolis",
        state: "SC",
        beaches: [
          {
            name: "Praia Mole",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-mole-1",
                name: "Canto Norte",
                beach: "Praia Mole",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.6061,
                longitude: -48.4389,
                beachOrientation: 150, // Sudeste - oceano aberto ao Sul/Sudeste, ilha/terra ao Norte/Noroeste. Vento Sul=Maral, Norte=Terral
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Ondas poderosas e consistentes. Muito popular.",
                bestSeason: ["Outono", "Inverno"],
              },
              {
                id: "sc-floripa-mole-2",
                name: "Canto Sul",
                beach: "Praia Mole",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.6089,
                longitude: -48.4406,
                beachOrientation: 150, // Sudeste - oceano aberto ao Sul/Sudeste, ilha/terra ao Norte/Noroeste. Vento Sul=Maral, Norte=Terral
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Pico mais protegido com ondas longas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Joaquina",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-joaquina-1",
                name: "Pico Central",
                beach: "Joaquina",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.6275,
                longitude: -48.4447,
                beachOrientation: 135, // Sudeste - costa leste/sul exposta, oceano aberto ao Sudeste/Sul. Vento Sul/SE=Maral, Norte/NO=Terral
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Berço de campeões. Ondas desafiadoras.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Santinho",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-santinho-1",
                name: "Santinho",
                beach: "Santinho",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.4453,
                longitude: -48.3967,
                beachOrientation: 60, // Nordeste - costa nordeste da ilha, ventos NE/Leste são marais, SO/Oeste são terrais
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia extensa com vários picos para todos os níveis.",
                bestSeason: ["Verão", "Outono", "Inverno", "Primavera"],
              },
            ],
          },
          {
            name: "Moçambique",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-mocambique-1",
                name: "Moçambique",
                beach: "Moçambique",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.4750,
                longitude: -48.4169,
                beachOrientation: 90, // Leste - costa leste central da ilha, oceano ao Leste. Vento Leste/NE=Maral, Oeste/SO=Terral
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia longa e selvagem com ondas para todos.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
          {
            name: "Campeche",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-campeche-1",
                name: "Novo Campeche",
                beach: "Campeche",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.6648,
                longitude: -48.4777,
                beachOrientation: 160, // Sul-Sudeste - oceano ao Sul/Sudeste. Vento Norte=Terral, Sul=Maral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Área ao norte da praia. SEM proteção da Ilha do Campeche - totalmente exposto a swells de leste, sul e sudeste.",
                bestSeason: ["Verão", "Outono", "Primavera"],
              },
              {
                id: "sc-floripa-campeche-2",
                name: "Riozinho",
                beach: "Campeche",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.6783,
                longitude: -48.4733,
                beachOrientation: 160, // Sul-Sudeste - oceano ao Sul/Sudeste. Vento Norte=Terral, Sul=Maral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Pico próximo à desembocadura do rio. SEM proteção da Ilha do Campeche - exposto a swells de todas as direções.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
              {
                id: "sc-floripa-campeche-3",
                name: "Areias do Campeche",
                beach: "Campeche",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.6790,
                longitude: -48.4720,
                beachOrientation: 160, // Sul-Sudeste - oceano ao Sul/Sudeste. Vento Norte=Terral, Sul=Maral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Pico com fundo de areia. SEM proteção da Ilha do Campeche - totalmente exposto a swells de leste, sul e sudeste.",
                bestSeason: ["Verão", "Outono", "Primavera"],
              },
              {
                id: "sc-floripa-campeche-4",
                name: "Palanque",
                beach: "Campeche",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.6800,
                longitude: -48.4750,
                beachOrientation: 160, // Sul-Sudeste - oceano ao Sul/Sudeste. Vento Norte=Terral, Sul=Maral
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Pico clássico do Campeche. Protegido de swells de leste pela Ilha do Campeche. Recebe ondas de sul e sudeste com influência da ilha.",
                bestSeason: ["Outono", "Inverno"],
              },
              {
                id: "sc-floripa-campeche-5",
                name: "Lomba do Sabão",
                beach: "Campeche",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.6820,
                longitude: -48.4765,
                beachOrientation: 160, // Sul-Sudeste - oceano ao Sul/Sudeste. Vento Norte=Terral, Sul=Maral
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Pico desafiador com ondas rápidas e tubulares. Totalmente exposto a swells de sul, sudeste e leste. Não tem proteção da Ilha do Campeche.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia dos Açores",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-acores-1",
                name: "Açores",
                beach: "Praia dos Açores",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.7167,
                longitude: -48.5167,
                beachOrientation: 100, // Leste-Sudeste - enseada protegida no sul da ilha entre morros que abre para leste. Protegida de swells de sul direto pelos costões. Recebe swells de leste e sudeste.
                waveAttenuationFactor: 0.6, // Enseada protegida por morros
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Enseada tranquila e protegida entre morros no sul da ilha. Recebe swells de leste e sudeste, protegida de sul direto pelos costões.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Armação",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-armacao-1",
                name: "Armação",
                beach: "Armação",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.7456,
                longitude: -48.5097,
                beachOrientation: 65, // Nordeste - enseada protegida no sul da ilha entre morros. Protegida de swells de sul direto. Recebe swells de leste e nordeste.
                waveAttenuationFactor: 0.6, // Enseada protegida por morros
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Enseada charmosa protegida entre morros. Recebe swells de leste e nordeste, protegida de sul direto pelos costões.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Morro das Pedras",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-morropedras-1",
                name: "Morro das Pedras",
                beach: "Morro das Pedras",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.7278,
                longitude: -48.4833,
                beachOrientation: 130, // Sudeste - costa sul/leste exposta, oceano ao Sudeste/Sul.
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia com ondas fortes e consistentes. Muito exposta a swells de leste. Favorita dos surfistas locais.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Matadeiro",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-matadeiro-1",
                name: "Matadeiro",
                beach: "Praia do Matadeiro",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.7500,
                longitude: -48.4997,
                beachOrientation: 50, // Nordeste - enseada protegida por morros que abre para nordeste. Vento Norte/Nordeste é maral. Protegida de swells de sul pelos morros.
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Enseada protegida e preservada com ondas tubulares e poderosas. Acesso por trilha. Recebe swells de nordeste e leste, protegida de sul pelos morros.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia Brava",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-brava-1",
                name: "Praia Brava",
                beach: "Praia Brava",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.4297,
                longitude: -48.4161,
                beachOrientation: 75, // Leste-Nordeste - costa nordeste exposta ao oceano aberto
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Uma das praias mais desafiadoras de Floripa. Ondas fortes e mar bravo.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Cachoeira do Bom Jesus",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-bomjesus-1",
                name: "Cachoeira do Bom Jesus",
                beach: "Cachoeira do Bom Jesus",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.4186,
                longitude: -48.5344,
                beachOrientation: 315, // Noroeste - BAÍA NORTE protegida, voltada para continente. NUNCA recebe swell oceânico.
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia da Baía Norte voltada para o continente. Totalmente protegida de swells oceânicos. Ondas apenas de vento local (wind waves).",
                bestSeason: [],
              },
            ],
          },
          {
            name: "Praia do Forte",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-forte-1",
                name: "Praia do Forte",
                beach: "Praia do Forte",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.3950,
                longitude: -48.5150,
                beachOrientation: 290, // Oeste-Noroeste - BAÍA NORTE protegida, voltada para continente. NUNCA recebe swell oceânico.
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia da Baía Norte voltada para o continente. Totalmente protegida de swells oceânicos. Ondas apenas de vento local (wind waves).",
                bestSeason: [],
              },
            ],
          },
          {
            name: "Ponta das Canas",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-pontacanas-1",
                name: "Ponta das Canas",
                beach: "Ponta das Canas",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.4000,
                longitude: -48.4700,
                beachOrientation: 320, // Noroeste - Transição entre Baía Norte e oceano. Parcialmente protegida. Recebe swells muito reduzidos de nordeste.
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia entre Baía Norte e oceano. Parcialmente protegida. Ondas pequenas mesmo com swell, principalmente wind waves.",
                bestSeason: [],
              },
            ],
          },
          {
            name: "Praia dos Ingleses",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-ingleses-1",
                name: "Ingleses Norte",
                beach: "Praia dos Ingleses",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.4411,
                longitude: -48.3897,
                beachOrientation: 50, // Nordeste - Praia no norte da ilha voltada para NE. Vento Sul vem da terra (terral), Norte vem do mar (maral).
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Área norte da praia com ondas mais suaves. Ótima para iniciantes.",
                bestSeason: ["Verão", "Outono", "Primavera"],
              },
              {
                id: "sc-floripa-ingleses-2",
                name: "Ingleses Centro",
                beach: "Praia dos Ingleses",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.4500,
                longitude: -48.3950,
                beachOrientation: 50, // Nordeste - Mesma orientação, vento Sul é terral (vem da ilha ao sul).
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Centro da praia com boa infraestrutura e escola de surf.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Barra da Lagoa",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-barralagoa-1",
                name: "Canal da Barra",
                beach: "Barra da Lagoa",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.5753,
                longitude: -48.4231,
                beachOrientation: 50, // Nordeste - vento Sul é terral
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Pico próximo ao canal. Ondas variadas dependendo da maré.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
          {
            name: "Praia da Galheta",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-galheta-1",
                name: "Galheta",
                beach: "Praia da Galheta",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.6203,
                longitude: -48.4342,
                beachOrientation: 135, // Sudeste - praia leste da ilha, oceano aberto ao SE/Sul. Vento Sul=Maral, Norte=Terral
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia naturista com ondas potentes. Acesso por trilha da Praia Mole.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Lagoinha do Leste",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-lagoinha-1",
                name: "Lagoinha do Leste",
                beach: "Lagoinha do Leste",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.7700,
                longitude: -48.5200,
                beachOrientation: 150, // Sudeste - sul da ilha, oceano aberto ao SE/Sul. Vento Sul=Maral, Norte=Terral
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia intocada e isolada. Acesso apenas por trilha longa. Ondas selvagens.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia dos Naufragados",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-naufragados-1",
                name: "Naufragados",
                beach: "Praia dos Naufragados",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.7831,
                longitude: -48.5472,
                beachOrientation: 160, // Sul-Sudeste - extremo sul da ilha, oceano ao Sul. Vento Sul=Maral, Norte=Terral
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia remota no extremo sul da ilha. Ondas consistentes e poderosas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Solidão",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-solidao-1",
                name: "Solidão",
                beach: "Praia da Solidão",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.7603,
                longitude: -48.5167,
                beachOrientation: 145, // Sudeste - sul da ilha entre Pântano e Naufragados, oceano ao SE/Sul. Vento Sul=Maral, Norte=Terral
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia tranquila e preservada. Ondas tubulares e mar forte.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Daniela",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-daniela-1",
                name: "Daniela",
                beach: "Praia da Daniela",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.4342,
                longitude: -48.5347,
                beachOrientation: 340, // Norte-Noroeste - Baía Norte, voltada para continente. Totalmente protegida de swells oceânicos
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia calma e protegida. Perfeita para iniciantes e crianças.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Jurerê Internacional",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-jurere-1",
                name: "Jurerê Internacional",
                beach: "Jurerê Internacional",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.4178,
                longitude: -48.4961,
                beachOrientation: 300, // Oeste-Noroeste - BAÍA NORTE protegida
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia da Baía Norte voltada para o continente. Totalmente protegida de swells oceânicos. Ondas apenas de vento local (wind waves).",
                bestSeason: ["Verão"],
              },
            ],
          },
          {
            name: "Jurerê Tradicional",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-jurere-2",
                name: "Jurerê Tradicional",
                beach: "Jurerê Tradicional",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.4200,
                longitude: -48.5000,
                beachOrientation: 310, // Noroeste - BAÍA NORTE protegida
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia da Baía Norte voltada para o continente. Totalmente protegida de swells oceânicos. Ondas apenas de vento local (wind waves).",
                bestSeason: ["Verão"],
              },
            ],
          },
          {
            name: "Canasvieiras",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-floripa-canasvieiras-1",
                name: "Canasvieiras",
                beach: "Canasvieiras",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.4264,
                longitude: -48.4622,
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia urbana e movimentada. Mar geralmente calmo, melhor em dias de ondulação.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia do Caldeirão",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-florianopolis-caldeirao-1",
                name: "Caldeirão",
                beach: "Praia do Caldeirão",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.6328,
                longitude: -48.4547,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia selvagem com ondas fortes e tubulares. Acesso por trilha.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Cruz",
            city: "Florianópolis",
            state: "SC",
            spots: [
              {
                id: "sc-florianopolis-cruz-1",
                name: "Pico da Cruz",
                beach: "Praia da Cruz",
                city: "Florianópolis",
                state: "SC",
                latitude: -27.6586,
                longitude: -48.5092,
                beachOrientation: 100, // Leste-Sudeste - costa exposta ao oceano
                waveAttenuationFactor: 0.92, // Leve atenuação devido à posição na enseada do Rio Tavares
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia no bairro Rio Tavares. Beach break com ondas acessíveis e boa para intermediários.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Palhoça",
        state: "SC",
        beaches: [
          {
            name: "Praia da Guarda do Embaú",
            city: "Palhoça",
            state: "SC",
            spots: [
              {
                id: "sc-palhoca-embau-1",
                name: "Guarda do Embaú",
                beach: "Praia da Guarda do Embaú",
                city: "Palhoça",
                state: "SC",
                latitude: -27.9133,
                longitude: -48.6100,
                beachOrientation: 100, // Leste-Sudeste - praia exposta ao oceano
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Um dos melhores picos de SC. Point break de direita com ondas longas e tubulares. Foz do Rio da Madre protege parte da praia.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Pinheira",
            city: "Palhoça",
            state: "SC",
            spots: [
              {
                id: "sc-palhoca-pinheira-1",
                name: "Pinheira",
                beach: "Praia da Pinheira",
                city: "Palhoça",
                state: "SC",
                latitude: -27.7911,
                longitude: -48.6572,
                beachOrientation: 110, // Leste-Sudeste - praia semi-protegida pela geografia
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Beach break extenso com boa formação de ondas. Popular entre famílias e escolas de surf.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia do Sonho",
            city: "Palhoça",
            state: "SC",
            spots: [
              {
                id: "sc-palhoca-sonho-1",
                name: "Praia do Sonho",
                beach: "Praia do Sonho",
                city: "Palhoça",
                state: "SC",
                latitude: -27.8075,
                longitude: -48.6494,
                beachOrientation: 105, // Leste-Sudeste - enseada protegida
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia pequena e abrigada com ondas suaves. Ótima para iniciantes.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Itajaí",
        state: "SC",
        beaches: [
          {
            name: "Praia Brava",
            city: "Itajaí",
            state: "SC",
            spots: [
              {
                id: "sc-itajai-brava-1",
                name: "Praia Brava",
                beach: "Praia Brava",
                city: "Itajaí",
                state: "SC",
                latitude: -26.9953,
                longitude: -48.6431,
                beachOrientation: 90, // Leste - costa exposta ao oceano
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Principal pico de Itajaí, ondas fortes e tubulares. Praia muito exposta ao mar aberto.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Cabeçudas",
            city: "Itajaí",
            state: "SC",
            spots: [
              {
                id: "sc-itajai-cabecudas-1",
                name: "Cabeçudas",
                beach: "Praia de Cabeçudas",
                city: "Itajaí",
                state: "SC",
                latitude: -26.9292,
                longitude: -48.6175,
                beachOrientation: 70, // Leste-Nordeste - praia urbana semi-protegida
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com ondas mais suaves, ideal para iniciantes.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia do Atalaia",
            city: "Itajaí",
            state: "SC",
            spots: [
              {
                id: "sc-itajai-atalaia-1",
                name: "Atalaia",
                beach: "Praia do Atalaia",
                city: "Itajaí",
                state: "SC",
                latitude: -26.9417,
                longitude: -48.6364,
                beachOrientation: 80, // Leste - praia exposta
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia com boa formação de ondas, popular entre surfistas locais.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Molhes da Barra",
            city: "Itajaí",
            state: "SC",
            spots: [
              {
                id: "sc-itajai-molhes-1",
                name: "Molhes",
                beach: "Molhes da Barra",
                city: "Itajaí",
                state: "SC",
                latitude: -26.9072,
                longitude: -48.6497,
                beachOrientation: 95, // Leste - foz do rio, ondas influenciadas por correntes
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Pico próximo aos molhes da foz do Rio Itajaí-Açu. Ondas fortes e correntes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Itapema",
        state: "SC",
        beaches: [
          {
            name: "Meia Praia",
            city: "Itapema",
            state: "SC",
            spots: [
              {
                id: "sc-itapema-meia-1",
                name: "Meia Praia",
                beach: "Meia Praia",
                city: "Itapema",
                state: "SC",
                latitude: -27.0861,
                longitude: -48.6133,
                beachOrientation: 65, // Nordeste - costa voltada para nordeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Beach break consistente com boa formação de ondas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia Grossa",
            city: "Itapema",
            state: "SC",
            spots: [
              {
                id: "sc-itapema-grossa-1",
                name: "Canto da Praia Grossa",
                beach: "Praia Grossa",
                city: "Itapema",
                state: "SC",
                latitude: -27.0992,
                longitude: -48.6297,
                beachOrientation: 70, // Leste-Nordeste - ponto entre costões
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Point break com ondas fortes e tubulares.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Itapema",
            city: "Itapema",
            state: "SC",
            spots: [
              {
                id: "sc-itapema-1",
                name: "Itapema",
                beach: "Praia de Itapema",
                city: "Itapema",
                state: "SC",
                latitude: -27.0908,
                longitude: -48.6125,
                beachOrientation: 60, // Nordeste - costa voltada para nordeste, ventos NE/Leste são marais, SO/Oeste são terrais
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia popular com boas ondas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Ilhota",
            city: "Itapema",
            state: "SC",
            spots: [
              {
                id: "sc-itapema-ilhota-1",
                name: "Ilhota",
                beach: "Praia da Ilhota",
                city: "Itapema",
                state: "SC",
                latitude: -27.1000,
                longitude: -48.6000,
                beachOrientation: 60, // Nordeste - costa voltada para nordeste, ventos NE/Leste são marais, SO/Oeste são terrais
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia com ilha próxima e boas ondas.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
        ],
      },
      {
        name: "Bombinhas",
        state: "SC",
        beaches: [
          {
            name: "Praia da Sepultura",
            city: "Bombinhas",
            state: "SC",
            spots: [
              {
                id: "sc-bombinhas-sepultura-1",
                name: "Sepultura",
                beach: "Praia da Sepultura",
                city: "Bombinhas",
                state: "SC",
                latitude: -27.1350,
                longitude: -48.5153,
                beachOrientation: 200, // Sul-Sudoeste - enseada muito protegida
                waveAttenuation: 0.7, // Muito protegida, ideal para mergulho
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Enseada pequena e protegida, mais conhecida para mergulho.",
                bestSeason: ["Verão"],
              },
            ],
          },
          {
            name: "Praia de Bombas",
            city: "Bombinhas",
            state: "SC",
            spots: [
              {
                id: "sc-bombinhas-bombas-1",
                name: "Bombas",
                beach: "Praia de Bombas",
                city: "Bombinhas",
                state: "SC",
                latitude: -27.1386,
                longitude: -48.4961,
                beachOrientation: 90, // Leste - costa voltada diretamente para o oceano
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com ondas constantes e boa estrutura.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Bombinhas",
            city: "Bombinhas",
            state: "SC",
            spots: [
              {
                id: "sc-bombinhas-bombinhas-1",
                name: "Bombinhas",
                beach: "Praia de Bombinhas",
                city: "Bombinhas",
                state: "SC",
                latitude: -27.1397,
                longitude: -48.5086,
                beachOrientation: 180, // Sul - enseada protegida voltada para sul
                waveAttenuation: 0.5, // Enseada semi-protegida
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Enseada protegida com ondas mais suaves.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia de Mariscal",
            city: "Bombinhas",
            state: "SC",
            spots: [
              {
                id: "sc-bombinhas-mariscal-1",
                name: "Mariscal",
                beach: "Praia de Mariscal",
                city: "Bombinhas",
                state: "SC",
                latitude: -27.1289,
                longitude: -48.5242,
                beachOrientation: 95, // Leste - costa exposta ao oceano
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Uma das melhores ondas de Bombinhas, consistente e tubular.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Quatro Ilhas",
            city: "Bombinhas",
            state: "SC",
            spots: [
              {
                id: "sc-bombinhas-quatroilhas-1",
                name: "Quatro Ilhas",
                beach: "Praia de Quatro Ilhas",
                city: "Bombinhas",
                state: "SC",
                latitude: -27.1247,
                longitude: -48.5303,
                beachOrientation: 100, // Leste-Sudeste - costa exposta
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia selvagem com ondas fortes e cristalinas. Pico de qualidade.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },

      {
        name: "Navegantes",
        state: "SC",
        beaches: [
          {
            name: "Praia Central",
            city: "Navegantes",
            state: "SC",
            spots: [
              {
                id: "sc-navegantes-central-1",
                name: "Navegantes",
                beach: "Praia Central",
                city: "Navegantes",
                state: "SC",
                latitude: -26.8944,
                longitude: -48.6528,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Beach break extenso com boa formação de ondas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Gravatá",
            city: "Navegantes",
            state: "SC",
            spots: [
              {
                id: "sc-navegantes-gravata-1",
                name: "Gravatá",
                beach: "Praia de Gravatá",
                city: "Navegantes",
                state: "SC",
                latitude: -26.8697,
                longitude: -48.6386,
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia com ondas mais fortes e picos variados.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Garopaba",
        state: "SC",
        beaches: [
          {
            name: "Ferrugem",
            city: "Garopaba",
            state: "SC",
            spots: [
              {
                id: "sc-garopaba-ferrugem-1",
                name: "Ferrugem Point",
                beach: "Ferrugem",
                city: "Garopaba",
                state: "SC",
                latitude: -28.0747,
                longitude: -48.6236,
                beachOrientation: 105, // Leste-Sudeste - enseada voltada para E-SE, recebe ondulações de leste e sudeste
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Point break famoso. Direitas longas.",
                bestSeason: ["Outono", "Inverno"],
              },
              {
                id: "sc-garopaba-ferrugem-2",
                name: "Canto da Ferrugem",
                beach: "Ferrugem",
                city: "Garopaba",
                state: "SC",
                latitude: -28.0740,
                longitude: -48.6230,
                beachOrientation: 105, // Leste-Sudeste - enseada voltada para E-SE, canto sul protegido de vento sul
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Pico mais radical com ondas tubulares.",
                bestSeason: ["Outono", "Inverno"],
              },
              {
                id: "sc-garopaba-ferrugem-3",
                name: "Centro da Ferrugem",
                beach: "Ferrugem",
                city: "Garopaba",
                state: "SC",
                latitude: -28.0750,
                longitude: -48.6240,
                beachOrientation: 105, // Leste-Sudeste - enseada voltada para E-SE, centro versátil
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Beach break com ondas para todos os níveis.",
                bestSeason: ["Verão", "Outono", "Primavera"],
              },
            ],
          },
          {
            name: "Praia Central",
            city: "Garopaba",
            state: "SC",
            spots: [
              {
                id: "sc-garopaba-central-1",
                name: "Garopaba Centro",
                beach: "Praia Central",
                city: "Garopaba",
                state: "SC",
                latitude: -28.0256,
                longitude: -48.6122,
                beachOrientation: 40, // Nordeste - vento Nordeste/Leste são marais, Sudoeste/Oeste são terrais
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com escola de surf.",
                bestSeason: ["Verão", "Outono", "Primavera"],
              },
              {
                id: "sc-garopaba-central-2",
                name: "Canto do Encantado",
                beach: "Praia Central",
                city: "Garopaba",
                state: "SC",
                latitude: -28.0270,
                longitude: -48.6140,
                beachOrientation: 40, // Nordeste - vento Nordeste/Leste são marais, Sudoeste/Oeste são terrais
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Point break de direita, bom para iniciantes e intermediários.",
                bestSeason: ["Verão", "Outono", "Primavera"],
              },
            ],
          },
          {
            name: "Siriú",
            city: "Garopaba",
            state: "SC",
            spots: [
              {
                id: "sc-garopaba-siriu-1",
                name: "Siriú",
                beach: "Siriú",
                city: "Garopaba",
                state: "SC",
                latitude: -28.0000,
                longitude: -48.5900,
                beachOrientation: 35, // Nordeste - vento Nordeste/Leste são marais, Sudoeste/Oeste são terrais
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia extensa com ondas consistentes. Beach break com picos variados.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
              {
                id: "sc-garopaba-siriu-2",
                name: "Barra do Siriú",
                beach: "Siriú",
                city: "Garopaba",
                state: "SC",
                latitude: -27.9980,
                longitude: -48.5880,
                beachOrientation: 35, // Nordeste - vento Nordeste/Leste são marais, Sudoeste/Oeste são terrais
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Pico próximo à desembocadura do rio com ondas suaves.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia do Ouvidor",
            city: "Garopaba",
            state: "SC",
            spots: [
              {
                id: "sc-garopaba-ouvidor-1",
                name: "Ouvidor",
                beach: "Praia do Ouvidor",
                city: "Garopaba",
                state: "SC",
                latitude: -28.0400,
                longitude: -48.6250,
                beachOrientation: 40, // Nordeste - vento Nordeste/Leste são marais, Sudoeste/Oeste são terrais
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia mais isolada com ondas fortes e consistentes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Gamboa",
            city: "Garopaba",
            state: "SC",
            spots: [
              {
                id: "sc-garopaba-gamboa-1",
                name: "Gamboa",
                beach: "Praia da Gamboa",
                city: "Garopaba",
                state: "SC",
                latitude: -28.0100,
                longitude: -48.6050,
                beachOrientation: 40, // Nordeste - vento Nordeste/Leste são marais, Sudoeste/Oeste são terrais
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com ondas suaves, ideal para iniciantes.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia do Silveira",
            city: "Garopaba",
            state: "SC",
            spots: [
              {
                id: "sc-garopaba-silveira-1",
                name: "Silveira",
                beach: "Praia do Silveira",
                city: "Garopaba",
                state: "SC",
                latitude: -28.0370,
                longitude: -48.6123,
                beachOrientation: 35, // Nordeste - vento Nordeste/Leste são marais, Sudoeste/Oeste são terrais
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Um dos melhores point breaks do Brasil com direitas longas.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
          {
            name: "Praia da Barra",
            city: "Garopaba",
            state: "SC",
            spots: [
              {
                id: "sc-garopaba-barra-1",
                name: "Barra",
                beach: "Praia da Barra",
                city: "Garopaba",
                state: "SC",
                latitude: -28.0330,
                longitude: -48.6180,
                beachOrientation: 40, // Nordeste - vento Nordeste/Leste são marais, Sudoeste/Oeste são terrais
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia com ondas constantes e boa estrutura.",
                bestSeason: ["Verão", "Outono", "Primavera"],
              },
            ],
          },

        ],
      },
      {
        name: "Imbituba",
        state: "SC",
        beaches: [
          {
            name: "Praia da Vila",
            city: "Imbituba",
            state: "SC",
            spots: [
              {
                id: "sc-imbituba-vila-1",
                name: "Praia da Vila",
                beach: "Praia da Vila",
                city: "Imbituba",
                state: "SC",
                latitude: -28.2347,
                longitude: -48.6525,
                beachOrientation: 100, // Leste-Sudeste - costa exposta
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com ondas acessíveis.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia do Rosa",
            city: "Imbituba",
            state: "SC",
            spots: [
              {
                id: "sc-imbituba-rosa-1",
                name: "Rosa Norte",
                beach: "Praia do Rosa",
                city: "Imbituba",
                state: "SC",
                latitude: -28.1136,
                longitude: -48.6311,
                beachOrientation: 225, // Sudoeste - lado direito da ferradura, vento Sudoeste é maral, Nordeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia paradisíaca com boa formação de ondas.",
                bestSeason: ["Outono", "Inverno"],
              },
              {
                id: "sc-imbituba-rosa-2",
                name: "Rosa Sul",
                beach: "Praia do Rosa",
                city: "Imbituba",
                state: "SC",
                latitude: -28.1219,
                longitude: -48.6361,
                beachOrientation: 45, // Nordeste - lado esquerdo da ferradura, vento Nordeste é maral, Sudoeste é terral
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Pico clássico do Rosa com direitas longas e tubulares.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Porto",
            city: "Imbituba",
            state: "SC",
            spots: [
              {
                id: "sc-imbituba-porto-1",
                name: "Porto",
                beach: "Praia do Porto",
                city: "Imbituba",
                state: "SC",
                latitude: -28.2306,
                longitude: -48.6567,
                beachOrientation: 105, // Leste-Sudeste - ponto com formação rochosa
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Point break técnico com ondas rápidas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Ribanceira",
            city: "Imbituba",
            state: "SC",
            spots: [
              {
                id: "sc-imbituba-ribanceira-1",
                name: "Ribanceira",
                beach: "Praia da Ribanceira",
                city: "Imbituba",
                state: "SC",
                latitude: -28.2181,
                longitude: -48.6464,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Beach break consistente para todos os níveis.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia do Luz",
            city: "Imbituba",
            state: "SC",
            spots: [
              {
                id: "sc-imbituba-luz-1",
                name: "Praia do Luz",
                beach: "Praia do Luz",
                city: "Imbituba",
                state: "SC",
                latitude: -28.2628,
                longitude: -48.6703,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com ondas moderadas.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
        ],
      },
      {
        name: "Laguna",
        state: "SC",
        beaches: [
          {
            name: "Farol de Santa Marta",
            city: "Laguna",
            state: "SC",
            spots: [
              {
                id: "sc-laguna-farol-1",
                name: "Farol de Santa Marta",
                beach: "Farol de Santa Marta",
                city: "Laguna",
                state: "SC",
                latitude: -28.6133,
                longitude: -48.8189,
                beachOrientation: 110, // Leste-Sudeste - extremamente exposto ao oceano
                levels: { beginner: false, intermediate: false, advanced: true },
                description: "Um dos picos mais poderosos do Brasil. Ondas gigantes e tubulares. Apenas para surfistas muito experientes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia do Gi",
            city: "Laguna",
            state: "SC",
            spots: [
              {
                id: "sc-laguna-gi-1",
                name: "Praia do Gi",
                beach: "Praia do Gi",
                city: "Laguna",
                state: "SC",
                latitude: -28.5367,
                longitude: -48.7889,
                beachOrientation: 105, // Leste-Sudeste - praia exposta
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Beach break com boa formação. Pico versátil para todos os níveis dependendo das condições.",
                bestSeason: ["Verão", "Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Prainha",
            city: "Laguna",
            state: "SC",
            spots: [
              {
                id: "sc-laguna-prainha-1",
                name: "Prainha",
                beach: "Prainha",
                city: "Laguna",
                state: "SC",
                latitude: -28.5247,
                longitude: -48.7794,
                beachOrientation: 100, // Leste-Sudeste - semi-protegida
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia pequena e abrigada com ondas suaves. Ótima para aprendizado.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Praia do Mar Grosso",
            city: "Laguna",
            state: "SC",
            spots: [
              {
                id: "sc-laguna-margrosso-1",
                name: "Mar Grosso",
                beach: "Praia do Mar Grosso",
                city: "Laguna",
                state: "SC",
                latitude: -28.4833,
                longitude: -48.7833,
                beachOrientation: 95, // Leste - praia muito exposta
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia com ondas fortes e consistentes. Nome já diz tudo - mar sempre agitado.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia Grande",
            city: "Laguna",
            state: "SC",
            spots: [
              {
                id: "sc-laguna-grande-1",
                name: "Praia Grande",
                beach: "Praia Grande",
                city: "Laguna",
                state: "SC",
                latitude: -28.5100,
                longitude: -48.7750,
                beachOrientation: 100, // Leste-Sudeste - beach break extenso
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Beach break extenso com múltiplos picos. Bom para todos os níveis.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
        ],
      },
      {
        name: "Balneário Camboriú",
        state: "SC",
        beaches: [
          {
            name: "Praia Central",
            city: "Balneário Camboriú",
            state: "SC",
            spots: [
              {
                id: "sc-bc-central-1",
                name: "Central",
                beach: "Praia Central",
                city: "Balneário Camboriú",
                state: "SC",
                latitude: -26.9947,
                longitude: -48.6347,
                beachOrientation: 70,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana famosa, movimentada com boa estrutura.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia de Laranjeiras",
            city: "Balneário Camboriú",
            state: "SC",
            spots: [
              {
                id: "sc-bc-laranjeiras-1",
                name: "Laranjeiras",
                beach: "Praia de Laranjeiras",
                city: "Balneário Camboriú",
                state: "SC",
                latitude: -27.0064,
                longitude: -48.6111,
                beachOrientation: 65,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia mais tranquila, acessível por teleférico.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia dos Amores",
            city: "Balneário Camboriú",
            state: "SC",
            spots: [
              {
                id: "sc-bc-amores-1",
                name: "Praia dos Amores",
                beach: "Praia dos Amores",
                city: "Balneário Camboriú",
                state: "SC",
                latitude: -26.9875,
                longitude: -48.6458,
                beachOrientation: 75,
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia pequena e romântica entre costões.",
                bestSeason: ["Verão"],
              },
            ],
          },
          {
            name: "Praia do Buraco",
            city: "Balneário Camboriú",
            state: "SC",
            spots: [
              {
                id: "sc-bc-buraco-1",
                name: "Buraco",
                beach: "Praia do Buraco",
                city: "Balneário Camboriú",
                state: "SC",
                latitude: -26.9908,
                longitude: -48.6392,
                beachOrientation: 72,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia entre costões com ondas mais protegidas.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia de Taquaras",
            city: "Balneário Camboriú",
            state: "SC",
            spots: [
              {
                id: "sc-bc-taquaras-1",
                name: "Taquaras",
                beach: "Praia de Taquaras",
                city: "Balneário Camboriú",
                state: "SC",
                latitude: -27.0100,
                longitude: -48.6050,
                beachOrientation: 60,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia semi-deserta com boas ondas.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia de Taquarinhas",
            city: "Balneário Camboriú",
            state: "SC",
            spots: [
              {
                id: "sc-bc-taquarinhas-1",
                name: "Taquarinhas",
                beach: "Praia de Taquarinhas",
                city: "Balneário Camboriú",
                state: "SC",
                latitude: -27.0142,
                longitude: -48.6014,
                beachOrientation: 58,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com boa estrutura.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
        ],
      },
      {
        name: "Navegantes",
        state: "SC",
        beaches: [
          {
            name: "Praia de Navegantes",
            city: "Navegantes",
            state: "SC",
            spots: [
              {
                id: "sc-navegantes-navegantes-1",
                name: "Navegantes",
                beach: "Praia de Navegantes",
                city: "Navegantes",
                state: "SC",
                latitude: -26.8972,
                longitude: -48.6550,
                beachOrientation: 95, // Leste - costa exposta próxima à foz do rio
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Beach break extenso e popular, próximo ao aeroporto.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Gravatá",
            city: "Navegantes",
            state: "SC",
            spots: [
              {
                id: "sc-navegantes-gravata-1",
                name: "Gravatá",
                beach: "Praia da Gravatá",
                city: "Navegantes",
                state: "SC",
                latitude: -26.8792,
                longitude: -48.6619,
                beachOrientation: 100, // Leste-Sudeste - costa exposta
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia com ondas mais fortes e menos estrutura urbana.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Penha",
        state: "SC",
        beaches: [
          {
            name: "Praia da Armação",
            city: "Penha",
            state: "SC",
            spots: [
              {
                id: "sc-penha-armacao-1",
                name: "Armação",
                beach: "Praia da Armação",
                city: "Penha",
                state: "SC",
                latitude: -26.7750,
                longitude: -48.6439,
                beachOrientation: 85, // Leste - costa exposta ao oceano
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia histórica com ondas constantes, próxima ao Beto Carrero.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia Grande",
            city: "Penha",
            state: "SC",
            spots: [
              {
                id: "sc-penha-grande-1",
                name: "Praia Grande",
                beach: "Praia Grande",
                city: "Penha",
                state: "SC",
                latitude: -26.7625,
                longitude: -48.6361,
                beachOrientation: 90, // Leste - costa exposta
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Beach break extenso com vários picos e boa consistência.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "São Francisco do Sul",
        state: "SC",
        beaches: [
          {
            name: "Praia Grande",
            city: "São Francisco do Sul",
            state: "SC",
            spots: [
              {
                id: "sc-saofrancisco-grande-1",
                name: "Praia Grande",
                beach: "Praia Grande",
                city: "São Francisco do Sul",
                state: "SC",
                latitude: -26.2167,
                longitude: -48.5333,
                beachOrientation: 90, // Leste - costa exposta ao oceano
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia extensa com ondas consistentes e boa estrutura.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia da Enseada",
            city: "São Francisco do Sul",
            state: "SC",
            spots: [
              {
                id: "sc-saofrancisco-enseada-1",
                name: "Enseada",
                beach: "Praia da Enseada",
                city: "São Francisco do Sul",
                state: "SC",
                latitude: -26.2300,
                longitude: -48.5250,
                beachOrientation: 95, // Leste - costa exposta
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana popular com ondas moderadas.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia de Ubatuba",
            city: "São Francisco do Sul",
            state: "SC",
            spots: [
              {
                id: "sc-saofrancisco-ubatuba-1",
                name: "Ubatuba",
                beach: "Praia de Ubatuba",
                city: "São Francisco do Sul",
                state: "SC",
                latitude: -26.1875,
                longitude: -48.5472,
                beachOrientation: 85, // Leste - costa exposta ao norte da ilha
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia selvagem com ondas fortes e acesso difícil.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "PR",
    name: "Paraná",
    cities: [
      {
        name: "Matinhos",
        state: "PR",
        beaches: [
          {
            name: "Praia de Matinhos",
            city: "Matinhos",
            state: "PR",
            spots: [
              {
                id: "pr-matinhos-1",
                name: "Matinhos",
                beach: "Praia de Matinhos",
                city: "Matinhos",
                state: "PR",
                latitude: -25.8175,
                longitude: -48.5403,
                beachOrientation: 120, // Leste-Sudeste - costa exposta
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana popular do Paraná com ondas consistentes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Caiobá",
            city: "Matinhos",
            state: "PR",
            spots: [
              {
                id: "pr-matinhos-caioba-1",
                name: "Caiobá",
                beach: "Praia de Caiobá",
                city: "Matinhos",
                state: "PR",
                latitude: -25.8542,
                longitude: -48.5214,
                beachOrientation: 115, // Leste-Sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com boas ondas e boa infraestrutura.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Pontal do Paraná",
        state: "PR",
        beaches: [
          {
            name: "Praia de Shangri-lá",
            city: "Pontal do Paraná",
            state: "PR",
            spots: [
              {
                id: "pr-pontal-shangrila-1",
                name: "Shangri-lá",
                beach: "Praia de Shangri-lá",
                city: "Pontal do Paraná",
                state: "PR",
                latitude: -25.6292,
                longitude: -48.4103,
                beachOrientation: 120, // Leste-Sudeste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia com ondas fortes e tubulares. Um dos melhores picos do Paraná.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Ipanema",
            city: "Pontal do Paraná",
            state: "PR",
            spots: [
              {
                id: "pr-pontal-ipanema-1",
                name: "Ipanema",
                beach: "Praia de Ipanema",
                city: "Pontal do Paraná",
                state: "PR",
                latitude: -25.6822,
                longitude: -48.4453,
                beachOrientation: 115, // Leste-Sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Beach break com ondas moderadas.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Praia de Leste",
            city: "Pontal do Paraná",
            state: "PR",
            spots: [
              {
                id: "pr-pontal-leste-1",
                name: "Praia de Leste",
                beach: "Praia de Leste",
                city: "Pontal do Paraná",
                state: "PR",
                latitude: -25.6433,
                longitude: -48.3514,
                beachOrientation: 120, // Leste-Sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia extensa com boas ondas.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Guaratuba",
        state: "PR",
        beaches: [
          {
            name: "Praia Central",
            city: "Guaratuba",
            state: "PR",
            spots: [
              {
                id: "pr-guaratuba-central-1",
                name: "Guaratuba",
                beach: "Praia Central",
                city: "Guaratuba",
                state: "PR",
                latitude: -25.8806,
                longitude: -48.5747,
                beachOrientation: 120, // Leste-Sudeste
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia com boas ondas e picos variados. Consistente durante o ano todo.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
          {
            name: "Praia Brava",
            city: "Guaratuba",
            state: "PR",
            spots: [
              {
                id: "pr-guaratuba-brava-1",
                name: "Brava",
                beach: "Praia Brava",
                city: "Guaratuba",
                state: "PR",
                latitude: -25.9186,
                longitude: -48.6039,
                beachOrientation: 125, // Sudeste
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia selvagem com ondas fortes e potentes. Nome já indica o estilo.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Antonina",
        state: "PR",
        beaches: [
          {
            name: "Praia de Alexandra",
            city: "Antonina",
            state: "PR",
            spots: [
              {
                id: "pr-antonina-alexandra-1",
                name: "Alexandra",
                beach: "Praia de Alexandra",
                city: "Antonina",
                state: "PR",
                latitude: -25.3800,
                longitude: -48.3600,
                beachOrientation: 115, // Leste-Sudeste - costa exposta
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia preservada com ondas moderadas. Acesso por estrada de terra.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
        ],
      },
      {
        name: "Paranaguá",
        state: "PR",
        beaches: [
          {
            name: "Ilha do Mel - Praia de Fora",
            city: "Paranaguá",
            state: "PR",
            spots: [
              {
                id: "pr-paranagua-ilhadomel-1",
                name: "Praia de Fora",
                beach: "Ilha do Mel - Praia de Fora",
                city: "Paranaguá",
                state: "PR",
                latitude: -25.5450,
                longitude: -48.3200,
                beachOrientation: 110, // Leste-Sudeste - voltada para o oceano
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia oceânica da Ilha do Mel. Ondas consistentes e poderosas. Acesso por barco.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Ilha do Mel - Praia Grande",
            city: "Paranaguá",
            state: "PR",
            spots: [
              {
                id: "pr-paranagua-ilhadomel-2",
                name: "Praia Grande",
                beach: "Ilha do Mel - Praia Grande",
                city: "Paranaguá",
                state: "PR",
                latitude: -25.5600,
                longitude: -48.3350,
                beachOrientation: 105, // Leste-Sudeste
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia extensa e preservada. Ondas mais suaves que a Praia de Fora.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Ilha do Mel - Praia do Farol",
            city: "Paranaguá",
            state: "PR",
            spots: [
              {
                id: "pr-paranagua-ilhadomel-3",
                name: "Farol das Conchas",
                beach: "Ilha do Mel - Praia do Farol",
                city: "Paranaguá",
                state: "PR",
                latitude: -25.5150,
                longitude: -48.3100,
                beachOrientation: 85, // Leste-Nordeste - vento Oeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia próxima ao farol histórico com ondas suaves.",
                bestSeason: ["Verão", "Outono"],
              },
            ],
          },
          {
            name: "Ilha do Mel - Praia das Encantadas",
            city: "Paranaguá",
            state: "PR",
            spots: [
              {
                id: "pr-paranagua-ilhadomel-4",
                name: "Encantadas",
                beach: "Ilha do Mel - Praia das Encantadas",
                city: "Paranaguá",
                state: "PR",
                latitude: -25.5450,
                longitude: -48.3200,
                beachOrientation: 110, // Leste-Sudeste - vento Oeste/Noroeste é terral
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com ondas moderadas, ideal para todos os níveis.",
                bestSeason: ["Verão", "Outono", "Primavera"],
              },
            ],
          },
          {
            name: "Ilha do Mel - Praia de Nova Brasília",
            city: "Paranaguá",
            state: "PR",
            spots: [
              {
                id: "pr-paranagua-ilhadomel-5",
                name: "Nova Brasília",
                beach: "Ilha do Mel - Praia de Nova Brasília",
                city: "Paranaguá",
                state: "PR",
                latitude: -25.5333,
                longitude: -48.3167,
                beachOrientation: 100, // Leste - vento Oeste é terral
                levels: { beginner: true, intermediate: false, advanced: false },
                description: "Praia mais abrigada próxima ao píer, ideal para iniciantes.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
          {
            name: "Ilha do Mel - Praia do Miguel",
            city: "Paranaguá",
            state: "PR",
            spots: [
              {
                id: "pr-paranagua-ilhadomel-6",
                name: "Miguel",
                beach: "Ilha do Mel - Praia do Miguel",
                city: "Paranaguá",
                state: "PR",
                latitude: -25.5500,
                longitude: -48.3083,
                beachOrientation: 105, // Leste-Sudeste - vento Oeste/Noroeste é terral
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia selvagem com ondas potentes e menos frequentada.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "RS",
    name: "Rio Grande do Sul",
    cities: [
      {
        name: "Torres",
        state: "RS",
        beaches: [
          {
            name: "Praia Grande",
            city: "Torres",
            state: "RS",
            spots: [
              {
                id: "rs-torres-grande-1",
                name: "Praia Grande",
                beach: "Praia Grande",
                city: "Torres",
                state: "RS",
                latitude: -29.3356,
                longitude: -49.7272,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia longa e consistente, boa para todos os níveis.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
          {
            name: "Praia da Cal",
            city: "Torres",
            state: "RS",
            spots: [
              {
                id: "rs-torres-cal-1",
                name: "Praia da Cal",
                beach: "Praia da Cal",
                city: "Torres",
                state: "RS",
                latitude: -29.3267,
                longitude: -49.7239,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Ondas mais fortes e consistentes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Tramandaí",
        state: "RS",
        beaches: [
          {
            name: "Praia de Tramandaí",
            city: "Tramandaí",
            state: "RS",
            spots: [
              {
                id: "rs-tramandai-1",
                name: "Tramandaí",
                beach: "Praia de Tramandaí",
                city: "Tramandaí",
                state: "RS",
                latitude: -29.9844,
                longitude: -50.1336,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana popular com ondas consistentes.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Capão da Canoa",
        state: "RS",
        beaches: [
          {
            name: "Praia de Capão da Canoa",
            city: "Capão da Canoa",
            state: "RS",
            spots: [
              {
                id: "rs-capao-1",
                name: "Capão da Canoa",
                beach: "Praia de Capão da Canoa",
                city: "Capão da Canoa",
                state: "RS",
                latitude: -29.7483,
                longitude: -50.0319,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia popular do litoral gaúcho.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Osório",
        state: "RS",
        beaches: [
          {
            name: "Praia de Atlântida",
            city: "Osório",
            state: "RS",
            spots: [
              {
                id: "rs-osorio-atlantida-1",
                name: "Atlântida",
                beach: "Praia de Atlântida",
                city: "Osório",
                state: "RS",
                latitude: -29.9989,
                longitude: -50.2117,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia urbana com boas ondas e infraestrutura completa.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
          {
            name: "Praia de Xangri-lá",
            city: "Osório",
            state: "RS",
            spots: [
              {
                id: "rs-osorio-xangrila-1",
                name: "Xangri-lá",
                beach: "Praia de Xangri-lá",
                city: "Osório",
                state: "RS",
                latitude: -29.8144,
                longitude: -50.0531,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Beach break consistente.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Rio Grande",
        state: "RS",
        beaches: [
          {
            name: "Praia do Cassino",
            city: "Rio Grande",
            state: "RS",
            spots: [
              {
                id: "rs-riogrande-cassino-1",
                name: "Cassino",
                beach: "Praia do Cassino",
                city: "Rio Grande",
                state: "RS",
                latitude: -32.1753,
                longitude: -52.1631,
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Uma das praias mais longas do mundo. Ondas variadas.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
        ],
      },
      {
        name: "Arroio do Sal",
        state: "RS",
        beaches: [
          {
            name: "Praia de Arroio do Sal",
            city: "Arroio do Sal",
            state: "RS",
            spots: [
              {
                id: "rs-arroiodosal-1",
                name: "Arroio do Sal",
                beach: "Praia de Arroio do Sal",
                city: "Arroio do Sal",
                state: "RS",
                latitude: -29.5558,
                longitude: -49.8975,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com ondas constantes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Xangri-lá",
        state: "RS",
        beaches: [
          {
            name: "Praia de Xangri-lá",
            city: "Xangri-lá",
            state: "RS",
            spots: [
              {
                id: "rs-xangrila-1",
                name: "Xangri-lá",
                beach: "Praia de Xangri-lá",
                city: "Xangri-lá",
                state: "RS",
                latitude: -29.8117,
                longitude: -50.0589,
                beachOrientation: 95, // Leste - costa exposta ao oceano
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia extensa e preservada com boas ondas. Beach break consistente.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Imbé",
        state: "RS",
        beaches: [
          {
            name: "Praia de Imbé",
            city: "Imbé",
            state: "RS",
            spots: [
              {
                id: "rs-imbe-1",
                name: "Imbé",
                beach: "Praia de Imbé",
                city: "Imbé",
                state: "RS",
                latitude: -29.9761,
                longitude: -50.1289,
                beachOrientation: 95, // Leste - costa exposta
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia popular com ondas consistentes e boa estrutura urbana.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
        ],
      },
      {
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
                latitude: -30.1761,
                longitude: -50.2133,
                beachOrientation: 100, // Leste-Sudeste - costa exposta
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia tranquila com ondas moderadas. Popular entre famílias.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
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
                latitude: -31.1117,
                longitude: -50.9194,
                beachOrientation: 105, // Leste-Sudeste - costa muito exposta
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia selvagem e deserta com ondas fortes. Ideal para surfistas experientes.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
        ],
      },
      {
        name: "Palmares do Sul",
        state: "RS",
        beaches: [
          {
            name: "Praia do Quintão",
            city: "Palmares do Sul",
            state: "RS",
            spots: [
              {
                id: "rs-palmares-quintao-1",
                name: "Quintão",
                beach: "Praia do Quintão",
                city: "Palmares do Sul",
                state: "RS",
                latitude: -30.2544,
                longitude: -50.5106,
                beachOrientation: 100, // Leste-Sudeste - costa exposta
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia com ondas variadas e ambiente preservado. Parte do litoral norte.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
        ],
      },
    ],
  },
];
