# 🌐 MIGRAÇÃO PARA DOMÍNIO FINAL: www.nopico.com.br

## ✅ SITUAÇÃO ATUAL (CONFIGURAÇÃO OK)

Você já tem tudo configurado:

### **1. Figma Make:**
```
Base domain:      nopico.figma.site ✅ Published
Connected domain: www.nopico.com.br ✅ Connected
Redirect:         nopico.com.br → www.nopico.com.br ✅
```

### **2. Registro.br / Provedor:**
```
Domínio configurado em: Outra plataforma (Cloudflare/Registro.br)
Status: Apontando para Figma Make
```

---

## 🎯 O QUE FOI ATUALIZADO NO CÓDIGO (v2.6.0)

### **1. Meta Tags Open Graph** (compartilhamento social)

Agora quando alguém compartilhar o link no WhatsApp/Facebook/Twitter, vai aparecer bonito:

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.nopico.com.br/">
<meta property="og:title" content="Nopico - Previsão de ondas por nível de surf">
<meta property="og:description" content="Previsão de ondas para todos os picos de surf do Brasil, calibrada com dados reais das boias PNBOIA">
<meta property="og:site_name" content="Nopico">
```

### **2. Twitter Cards**

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://www.nopico.com.br/">
<meta name="twitter:title" content="Nopico - Previsão de ondas por nível de surf">
<meta name="twitter:description" content="Previsão de ondas para todos os picos de surf do Brasil, calibrada com dados reais das boias PNBOIA">
```

### **3. Canonical URL** (SEO)

```html
<link rel="canonical" href="https://www.nopico.com.br/">
```

Isso diz para o Google: "A URL oficial do site é www.nopico.com.br"

---

## 🚀 FAZER AGORA

### **PASSO 1: Push das alterações**

```bash
git add .
git commit -m "feat: v2.6 - migração para www.nopico.com.br (meta tags + SEO)"
git push
```

### **PASSO 2: Aguardar publicação**

O Figma Make vai publicar automaticamente em:
- ✅ `nopico.figma.site` (base domain)
- ✅ `www.nopico.com.br` (connected domain)

**Tempo:** 1-3 minutos

---

## 🧪 TESTAR DEPOIS DA PUBLICAÇÃO

### **1. Testar domínio principal:**

```
https://www.nopico.com.br/
```

**Deve mostrar:** Home do Nopico ✅

### **2. Testar admin:**

```
https://www.nopico.com.br/admin
```

**Deve mostrar:** Tela de login do admin ✅  
**Senha:** `Limao@32949`

### **3. Testar redirect:**

```
http://nopico.com.br/
```

**Deve redirecionar para:** `https://www.nopico.com.br/` ✅

### **4. Testar compartilhamento social:**

**WhatsApp:**
1. Envie o link `https://www.nopico.com.br/` no WhatsApp
2. Deve aparecer um card com:
   - 🏄 Título: "Nopico - Previsão de ondas por nível de surf"
   - 📝 Descrição: "Previsão de ondas para todos os picos..."

**Facebook/Twitter:**
- Mesma coisa!

---

## 🔍 VERIFICAÇÕES IMPORTANTES

### ✅ **O que JÁ está correto:**

1. ✅ Código usa URLs relativas (não hardcoded)
2. ✅ SPA routing configurado (vercel.json com rewrites)
3. ✅ APIs funcionam em qualquer domínio
4. ✅ Favicon injeta dinamicamente
5. ✅ Admin funciona com rotas diretas

### ✅ **O que foi adicionado:**

1. ✅ Meta tags Open Graph
2. ✅ Twitter Cards
3. ✅ Canonical URL para SEO
4. ✅ Versão atualizada para v2.6.0

---

## 📊 COMPARAÇÃO: ANTES vs DEPOIS

### **ANTES (v2.5):**

```html
<head>
  <title>Nopico - Previsão de ondas por nível de surf</title>
  <meta name="description" content="...">
</head>
```

**Resultado ao compartilhar:**
- ❌ Link sem preview no WhatsApp
- ❌ Sem imagem no Facebook
- ❌ SEO básico

### **DEPOIS (v2.6):**

```html
<head>
  <title>Nopico - Previsão de ondas por nível de surf</title>
  <meta name="description" content="...">
  <meta property="og:url" content="https://www.nopico.com.br/">
  <meta property="og:title" content="...">
  <meta property="og:description" content="...">
  <link rel="canonical" href="https://www.nopico.com.br/">
</head>
```

**Resultado ao compartilhar:**
- ✅ Preview bonito no WhatsApp
- ✅ Card com título e descrição no Facebook
- ✅ SEO otimizado (Google sabe qual é o domínio oficial)

---

## ❓ PERGUNTAS E RESPOSTAS

### **1. O domínio antigo vai parar de funcionar?**

**NÃO!** 

Ambos vão funcionar:
- ✅ `nopico.figma.site` (continua funcionando)
- ✅ `www.nopico.com.br` (também funciona)

### **2. Preciso fazer algo no Registro.br?**

**NÃO!** Se já está configurado e conectado no Figma Make, está tudo certo.

### **3. E se alguém acessar nopico.com.br (sem www)?**

Vai redirecionar automaticamente para `www.nopico.com.br` ✅

### **4. O /admin vai funcionar no novo domínio?**

**SIM!** ✅

```
https://www.nopico.com.br/admin
```

### **5. As APIs PNBOIA vão funcionar?**

**SIM!** ✅

As APIs são relativas, então funcionam em qualquer domínio:
```
/api/pnboia/santos
/api/pnboia/sync-all
```

### **6. O favicon vai aparecer?**

**SIM!** ✅

O favicon é injetado dinamicamente via React, funciona em qualquer domínio.

### **7. Preciso atualizar alguma coisa no Google Analytics (se tiver)?**

Se você adicionar Google Analytics no futuro, vai precisar adicionar o domínio `www.nopico.com.br` lá.

---

## 🎨 PRÓXIMOS PASSOS (OPCIONAL)

Depois que estiver tudo funcionando, você pode:

### **1. Adicionar imagem Open Graph**

Para aparecer uma imagem bonita ao compartilhar:

```html
<meta property="og:image" content="https://www.nopico.com.br/preview.png">
```

Você precisaria criar um arquivo `/public/preview.png` (1200x630px recomendado)

### **2. PWA Manifest**

Para poder "instalar" o app no celular:

```json
{
  "name": "Nopico",
  "short_name": "Nopico",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#001f3d",
  "theme_color": "#001f3d",
  "icons": [...]
}
```

### **3. Google Analytics**

Se quiser saber quantas pessoas acessam:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

---

## 📋 CHECKLIST FINAL

Copiar e marcar depois de testar:

```
[ ] Push feito
[ ] Aguardei 3 minutos
[ ] www.nopico.com.br/ abre a home ✅
[ ] www.nopico.com.br/admin abre o login ✅
[ ] nopico.com.br redireciona para www.nopico.com.br ✅
[ ] Link compartilhado no WhatsApp mostra preview ✅
[ ] Favicon aparece na aba ✅
[ ] F5 em qualquer página não quebra ✅
```

---

## 🌊 RESUMO

### **STATUS:**
✅ Código pronto para o domínio final  
✅ SPA routing configurado  
✅ Meta tags SEO adicionadas  
✅ Tudo funcionando em qualquer domínio

### **FAZER AGORA:**
```bash
git add .
git commit -m "feat: v2.6 - migração para www.nopico.com.br"
git push
```

### **RESULTADO:**
🎉 Site profissional no domínio final com SEO otimizado!

---

**Versão:** v2.6.0  
**Data:** 15/11/2025  
**Status:** ✅ PRONTO PARA PRODUÇÃO
