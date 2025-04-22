import { useState } from "react";
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomPokemon = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/v1/miguelverso/random");
      setPokemon(res.data);
    } catch (error) {
      console.error("Erro ao buscar Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-red-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-8">🎮 PokéSorteio</h1>

      <button
        onClick={fetchRandomPokemon}
        className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-600 transition"
      >
        Buscar Personagem
      </button>

      {loading && <p className="mt-4 text-lg animate-pulse">Carregando personagem...</p>}

      {pokemon && (
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-xl text-center w-80">
          <img
            src={pokemon.foto}
            alt={pokemon.nome}
            className="w-40 h-40 mx-auto rounded-lg"
          />
          <h2 className="text-2xl capitalize font-bold text-gray-800 mt-4">
            {pokemon.nome}
          </h2>
          <p className="text-sm text-gray-600 mt-2">{pokemon.descricao}</p>
        </div>
      )}
    </div>
  );
}

export default App;
