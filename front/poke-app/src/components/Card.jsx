export default function Card({ miguel, onDelete, onEdit }) {
  return (
    <div className="border-2 border-gray-300 p-4 rounded-lg shadow-md bg-white">
      <img
        src={miguel.foto}
        alt={miguel.nome}
        className="w-full h-48 object-cover rounded-lg mb-4 border-2 border-yellow-400"
      />
      <h2 className="text-2xl font-semibold text-center text-yellow-600">{miguel.nome}</h2>
      <p className="text-gray-700 text-center mb-4">{miguel.descricao}</p>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => onEdit(miguel)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg shadow-sm transition duration-200"
        >
           Editar
        </button>
        <button
          onClick={() => onDelete(miguel.id)}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-sm transition duration-200"
        >
           Deletar
        </button>
      </div>
    </div>
  )
}
