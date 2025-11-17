/**
 * PARTE 2 - Continuação das instruções para adicionar novos picos
 */

/*
==============================================
PERNAMBUCO (PE) - Adicionar em Ipojuca
==============================================

Localizar a cidade "Ipojuca" e adicionar esta praia:

```typescript
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
```

==============================================
PERNAMBUCO (PE) - Adicionar NOVA CIDADE
==============================================

```typescript
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
```

==============================================
BAHIA (BA) - Adicionar em Ilhéus
==============================================

```typescript
          {
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
          },
```

==============================================
BAHIA (BA) - Adicionar NOVA CIDADE Prado
==============================================

```typescript
      {
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
      },
```

==============================================
BAHIA (BA) - Adicionar em Porto Seguro
==============================================

```typescript
          {
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
          },
```

==============================================
BAHIA (BA) - Adicionar em Morro de São Paulo
==============================================

```typescript
          {
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
          },
```

==============================================
ESPÍRITO SANTO (ES) - Adicionar em Linhares
==============================================

```typescript
          {
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
          },
          {
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
          },
```

==============================================
ESPÍRITO SANTO (ES) - Adicionar NOVA CIDADE Anchieta
==============================================

```typescript
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
                longitude: -40.6167,
                beachOrientation: 135, // Sudeste
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia urbana com pier e ondas consistentes.",
                bestSeason: ["Outono", "Inverno", "Primavera"],
              },
            ],
          },
        ],
      },
```

==============================================
ESPÍRITO SANTO (ES) - Adicionar em Vila Velha
==============================================

```typescript
          {
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
          },
```

==============================================
RIO DE JANEIRO (RJ) - Adicionar em Arraial do Cabo
==============================================

```typescript
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
                beachOrientation: 180, // Sul
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Enseada paradisíaca. Acesso por trilha ou barco.",
                bestSeason: ["Outono", "Inverno"],
              },
            ],
          },
```

==============================================
RIO DE JANEIRO (RJ) - Adicionar NOVA CIDADE Ilha Grande
==============================================

```typescript
      {
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
      },
```

*/
