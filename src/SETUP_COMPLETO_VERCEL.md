# ✅ CONFIGURAÇÃO VERCEL - SETUP COMPLETO

## 🎯 ARQUIVOS ATUALIZADOS:

### 1. `/vercel.json` - RECRIADO
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. `/vite.config.ts` - ✅ CORRETO
- SEM `root: '.'`
- `outDir: './build'`
- Base: `/`

### 3. `/index.html` - ✅ CORRETO
- `lang="pt-BR"`
- Meta tags completas
- `<script src="/main.tsx">`

### 4. `/package.json` - ✅ CORRETO
- `build: "vite build"`
- Todas dependências

---

## 📋 PASSOS PARA DEPLOY:

### PASSO 1: VERCEL DASHBOARD
1. Ir: https://vercel.com/dashboard
2. Selecionar projeto
3. Settings → General
4. **Root Directory: deixar VAZIO** (ou `.`)
5. **Framework Preset: Vite**
6. **Build Command: npm run build**
7. **Output Directory: build**
8. Salvar

### PASSO 2: PUBLISH TO GITHUB
1. Clicar "Publish to GitHub" no Figma Make
2. Aguardar upload
3. Vercel detecta mudança automática
4. Redeploy automático (1-2 min)

### PASSO 3: TESTAR
1. Abrir site
2. Verificar CSS carrega
3. Testar /admin
4. Verificar meta tags (lang="pt-BR")

---

## ✅ RESULTADO ESPERADO:

```
✅ Build sucesso
✅ CSS carrega corretamente
✅ /admin funciona (sem 404)
✅ HTML lang="pt-BR"
✅ Meta tags corretas
✅ Rotas funcionam (SPA)
```

---

## ⚠️ SE DER ERRO:

### ERRO: "Could not resolve entry module"
- Root Directory deve estar VAZIO no Vercel
- NÃO use "src"

### ERRO: CSS não carrega
- Verificar outputDirectory = build
- Verificar rewrites em vercel.json

### ERRO: /admin 404
- Verificar rewrites em vercel.json
- Verificar cleanUrls: true

---

## 📊 CONFIGURAÇÃO FINAL:

| Item | Valor Correto |
|------|---------------|
| Root Directory | ` ` (vazio) ou `.` |
| Framework | Vite |
| Build Command | npm run build |
| Output Directory | build |
| Node Version | 18.x ou 20.x |

---

## 🚀 PRONTO PARA DEPLOY!

Todos os arquivos estão corretos.
Basta fazer publish e testar!
