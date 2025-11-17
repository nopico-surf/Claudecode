// Footer Mobile Animation - Simplified
export default function Frame14Mobile() {
  return (
    <div className="w-full h-[300px] bg-gradient-to-br from-[#001f3d] to-[#003d5c] rounded-2xl flex items-center justify-center p-6">
      <div className="text-center space-y-3">
        {/* Ícone de onda - menor para mobile */}
        <div className="flex justify-center mb-4">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 30C8 30 15 15 30 15C45 15 52 30 52 30C52 30 45 45 30 45C15 45 8 30 8 30Z"
              fill="#ffc72c"
              fillOpacity="0.2"
            />
            <path
              d="M12 33C12 33 19 22 30 22C41 22 48 33 48 33"
              stroke="#ffc72c"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="30" cy="30" r="3" fill="#ffc72c" />
          </svg>
        </div>
        
        {/* Texto - menor para mobile */}
        <h3 className="text-white text-xl font-bold">
          Previsão de Ondas
        </h3>
        <p className="text-white/80 text-sm">
          Dados em tempo real para surfistas de todo o Brasil
        </p>
      </div>
    </div>
  );
}
