#!/bin/bash

echo "🔧 Corrigindo todos os imports com versões incorretas..."

# Função para corrigir um arquivo
fix_file() {
    local file="$1"
    
    # Remove versões de @radix-ui
    sed -i 's/@radix-ui\/react-\([a-z-]*\)@[0-9.]*/@radix-ui\/react-\1/g' "$file"
    
    # Remove versões de lucide-react
    sed -i 's/lucide-react@[0-9.]*/lucide-react/g' "$file"
    
    # Remove versões de class-variance-authority
    sed -i 's/class-variance-authority@[0-9.]*/class-variance-authority/g' "$file"
}

# Processar todos os arquivos .tsx e .ts em components/
find components/ -type f \( -name "*.tsx" -o -name "*.ts" \) | while read file; do
    echo "  Processando: $file"
    fix_file "$file"
done

echo "✅ Correção concluída!"
echo "🚀 Faça push para o GitHub agora!"
