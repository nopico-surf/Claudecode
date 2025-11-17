/**
 * PARTE 3 - Continuação final das instruções para adicionar novos picos
 */

/*
==============================================
RIO DE JANEIRO (RJ) - Adicionar NOVAS CIDADES
==============================================

```typescript
      {
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
      },
      {
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
      },
      {
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
      },
```

==============================================
SÃO PAULO (SP) - Adicionar em Ubatuba
==============================================

```typescript
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
```

==============================================
SÃO PAULO (SP) - Adicionar em São Sebastião
==============================================

```typescript
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
```

==============================================
PARANÁ (PR) - Adicionar NOVA CIDADE Paranaguá
==============================================

```typescript
      {
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
      },
```

==============================================
SANTA CATARINA (SC) - Adicionar em Imbituba
==============================================

```typescript
          {
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
          },
```

==============================================
SANTA CATARINA (SC) - Adicionar em Florianópolis
==============================================

```typescript
          {
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
          },
```

==============================================
SANTA CATARINA (SC) - Adicionar NOVA CIDADE Balneário Camboriú
==============================================

```typescript
      {
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
      },
```

==============================================
SANTA CATARINA (SC) - Adicionar em Itajaí
==============================================

```typescript
          {
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
          },
```

==============================================
SANTA CATARINA (SC) - Adicionar em Garopaba
==============================================

```typescript
          {
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
          },
```

==============================================
SANTA CATARINA (SC) - Adicionar NOVA CIDADE Bombinhas
==============================================

```typescript
      {
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
      },
```

==============================================
RIO GRANDE DO SUL (RS) - Adicionar NOVAS CIDADES
==============================================

```typescript
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
      },
      {
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
      },
      {
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
      },
```

==============================================
FIM DAS INSTRUÇÕES
==============================================

TOTAL DE NOVOS PICOS ADICIONADOS: 50+

Estes picos completam a cobertura nacional de surf spots do Brasil conforme solicitado.

*/
