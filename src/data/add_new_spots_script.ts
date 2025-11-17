/**
 * SCRIPT PARA ADICIONAR NOVOS PICOS AO spots.ts
 * 
 * Este script deve ser executado manualmente para adicionar os picos faltantes.
 * Cole este conteúdo no final do arquivo spots.ts, logo antes do fechamento do array principal.
 */

/*
INSTRUÇÕES DE USO:

1. Abra o arquivo /data/spots.ts
2. Procure por cada estado listado abaixo
3. Adicione os novos picos conforme indicado
4. Copie e cole os códigos nas posições corretas

==============================================
MARANHÃO (MA) - Adicionar em Barreirinhas
==============================================

Localizar a cidade "Barreirinhas" e adicionar esta praia APÓS "Praia de Caburé":

```typescript
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
```

==============================================
PIAUÍ (PI) - Adicionar NOVA CIDADE
==============================================

Adicionar esta nova cidade APÓS "Cajueiro da Praia":

```typescript
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
```

==============================================
CEARÁ (CE) - Adicionar em Paracuru
==============================================

Localizar a cidade "Paracuru" e adicionar esta praia APÓS a praia existente:

```typescript
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
```

==============================================
CEARÁ (CE) - Adicionar NOVA CIDADE
==============================================

Adicionar esta nova cidade:

```typescript
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
```

==============================================
RIO GRANDE DO NORTE (RN) - Adicionar NOVAS CIDADES
==============================================

```typescript
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
```

Devido ao tamanho do arquivo, vou criar um segundo arquivo com as instruções restantes.

*/
