#!/bin/bash

echo "🔧 Restaurando ObservationForm.tsx do Git..."

# Restaurar do último commit
git checkout HEAD -- components/admin/ObservationForm.tsx

if [ $? -eq 0 ]; then
  echo "✅ Arquivo restaurado com sucesso!"
  echo ""
  echo "🧪 Testando build..."
  npm run build
  
  if [ $? -eq 0 ]; then
    echo "✅ BUILD FUNCIONOU!"
  else
    echo "❌ Build ainda com erro."
    echo ""
    echo "📝 Copie e cole no terminal:"
    echo ""
    echo "git log --oneline -5 -- components/admin/ObservationForm.tsx"
    echo ""
    echo "Depois restaure de um commit específico:"
    echo "git checkout <hash-do-commit> -- components/admin/ObservationForm.tsx"
  fi
else
  echo "❌ Erro ao restaurar. Git não disponível."
  echo ""
  echo "SOLUÇÃO ALTERNATIVA:"
  echo "Delete o arquivo e recrie manualmente."
fi
