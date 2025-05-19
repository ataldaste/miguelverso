// components/Card.jsx
function Card({ miguel, onDelete, onEdit }) {
  return (
    <div className="relative max-w-sm w-full bg-gradient-to-br from-yellow-50 to-yellow-100 border-[6px] border-yellow-600 rounded-xl shadow-[6px_6px_0px_rgba(0,0,0,0.8)] p-4 font-sans">

      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-yellow-600 pb-1 mb-2">
        <h3 className="text-xl font-bold text-yellow-900 uppercase tracking-wide">
          {miguel.nome || "Miguel Desconhecido"}
        </h3>
        <span className="text-sm font-bold text-yellow-800">ID #{miguel.id}</span>
      </div>

      {/* Image */}
      <div className="w-full h-44 bg-white border-4 border-yellow-600 rounded-lg overflow-hidden mb-3 shadow-inner">
        {miguel.imagem ? (
          <img src={miguel.imagem} alt={miguel.nome} className="object-contain w-full h-full" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-yellow-600 text-sm">
            Imagem não disponível
          </div>
        )}
      </div>

      {/* Descrição */}
      <div className="bg-yellow-200 border-2 border-yellow-700 rounded-md p-3 mb-3 text-sm text-yellow-900 shadow-inner min-h-[60px]">
        {miguel.descricao || "Este Miguel ainda não possui descrição registrada."}
      </div>

      {/* Ações */}
      <div className="flex justify-between">
        <button
          onClick={() => onEdit(miguel)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded border-2 border-black shadow"
        >
          Editar
        </button>

        <button
          onClick={() => onDelete(miguel.id)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded border-2 border-black shadow"
        >
          Excluir
        </button>
      </div>

    </div>
  );
}

export default Card;
