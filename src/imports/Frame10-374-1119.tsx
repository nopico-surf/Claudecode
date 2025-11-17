// Footer Desktop Animation - Simplified
export default function Frame14Desktop() {
  return (
    <div className="w-full h-[300px] bg-gradient-to-br from-[#001f3d] to-[#003d5c] rounded-2xl flex items-center justify-center p-8">
      <div className="text-center space-y-4">
        {/* Ícone de onda */}
        <div className="flex justify-center mb-6">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 40C10 40 20 20 40 20C60 20 70 40 70 40C70 40 60 60 40 60C20 60 10 40 10 40Z"
              fill="#ffc72c"
              fillOpacity="0.2"
            />
            <path
              d="M15 45C15 45 25 30 40 30C55 30 65 45 65 45"
              stroke="#ffc72c"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="40" cy="40" r="4" fill="#ffc72c" />
          </svg>
        </div>
        
        {/* Texto */}
        <h3 className="text-white text-2xl font-bold">
          Previsão de Ondas
        </h3>
        <p className="text-white/80 text-base max-w-md">
          Dados em tempo real para surfistas de todo o Brasil
        </p>
      </div>
    </div>
  );
}
