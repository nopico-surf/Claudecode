# Instruções para Adicionar Novos Picos ao spots.ts

⚠️ **IMPORTANTE**: Devido a problemas de encoding com caracteres acentuados, você precisará fazer essas adições manualmente copiando e colando os blocos de código abaixo no arquivo `/data/spots.ts`.

## Como Adicionar:

1. Abra o arquivo `/data/spots.ts`
2. Localize o estado/cidade indicado
3. Copie e cole o código fornecido na posição correta
4. Salve o arquivo

---

## 1. MARANHÃO (MA)

**Localização**: Dentro da cidade "Barreirinhas", após a "Praia de Caburé" (linha ~169)

**Cole APÓS o fechamento da beach "Praia de Caburé" e ANTES do fechamento de `beaches:`:**

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
                beachOrientation: 50,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia selvagem nos Lençóis Maranhenses. Acesso por barco.",
                bestSeason: ["Verão", "Primavera"],
              },
            ],
          },
```

---

## 2. PIAUÍ (PI)

**Localização**: Após a última cidade do Piauí (linha ~204)

**Cole APÓS o fechamento da cidade "Luís Correia" e ANTES do fechamento de `cities:`:**

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
                beachOrientation: 40,
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Principal pico do Piauí. Ondas consistentes e point break de direita.",
                bestSeason: ["Verão", "Outono", "Primavera"],
              },
            ],
          },
        ],
      },
```

---

## 3. CEARÁ (CE) - Parte 1: Taíba em Paracuru

**Localização**: Dentro da cidade "Paracuru", após a última praia

**Cole APÓS a última praia de Paracuru:**

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
                beachOrientation: 60,
                levels: { beginner: false, intermediate: true, advanced: true },
                description: "Praia famosa por kitesurf e ondas fortes. Consistente o ano todo.",
                bestSeason: ["Verão", "Outono", "Inverno", "Primavera"],
              },
            ],
          },
```

---

## 4. CEARÁ (CE) - Parte 2: Nova cidade Icaraí de Amontada

**Localização**: Após a última cidade do Ceará

**Cole como NOVA CIDADE no Ceará:**

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
                beachOrientation: 50,
                levels: { beginner: true, intermediate: true, advanced: true },
                description: "Praia selvagem e deserta. Ondas para todos os níveis.",
                bestSeason: ["Verão", "Outono", "Inverno", "Primavera"],
              },
            ],
          },
        ],
      },
```

---

## 5. RIO GRANDE DO NORTE (RN) - Novas cidades

**Localização**: Após a última cidade do RN

**Cole DUAS NOVAS CIDADES:**

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
                beachOrientation: 100,
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
                beachOrientation: 90,
                levels: { beginner: true, intermediate: true, advanced: false },
                description: "Praia famosa pelas dunas. Ondas acessíveis.",
                bestSeason: ["Verão", "Outono", "Primavera"],
              },
            ],
          },
        ],
      },
```

---

**Continue com os próximos estados seguindo o mesmo padrão...**

Para os demais estados (PE, BA, ES, RJ, SP, PR, SC, RS), consulte os arquivos:
- `/data/add_new_spots_script.ts`
- `/data/add_new_spots_script_part2.ts`
- `/data/add_new_spots_script_part3.ts`

## Checklist de Adições:

- [ ] MA: Atins (Barreirinhas)
- [ ] PI: Pedra do Sal (Parnaíba - nova cidade)
- [ ] CE: Taíba (Paracuru) + Icaraizinho (nova cidade)
- [ ] RN: Baía Formosa + Genipabu (novas cidades)
- [ ] PE: Serrambi (Ipojuca) + Enseada dos Corais (nova cidade)
- [ ] BA: Serra Grande, Cumuruxatiba, Caraíva, Segunda Praia
- [ ] ES: Regência, Povoação, Ubu, Barra do Jucu
- [ ] RJ: Forno, Lopes Mendes, Barra de Maricá, Barra de São João, Grussaí
- [ ] SP: Maresias, Baleia, Engenho, Perequê-Açu, Itaguá, Maranduba, Toninhas
- [ ] PR: Pontal do Sul (Paranaguá - nova cidade)
- [ ] SC: Ibiraquera, Pântano do Sul, Estaleiro, Estaleirinho, Praia Grossa, Vermelha, Lagoinha
- [ ] RS: Mostardas, Tavares, Cidreira, Quintão, Hermenegildo (novas cidades)

**TOTAL: 50+ novos picos**
