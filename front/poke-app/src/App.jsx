// App.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import { api } from './api'
import Form from './components/Form'
import Card from './components/Card'

function App() {
  const [miguels, setMiguels] = useState([])
  const [selectedId, setSelectedId] = useState("")
  const [selectedMiguel, setSelectedMiguel] = useState(null)

  const fetchAll = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/v1/miguelverso/")
      setMiguels(data)
    } catch (error) {
      console.error("Erro ao buscar Miguels:", error)
    }
  }

  const deleteMiguel = async (id) => {
    try {
      await api.delete(`/api/v1/miguelverso/${id}`)
      fetchAll()
    } catch (error) {
      alert("Erro ao deletar Miguel.")
      console.error(error)
    }
  }

  const getRandom = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/v1/miguelverso/random")
      setSelectedMiguel(data)
      alert(`Sorteado: ${data.nome}\n${data.descricao}`)
    } catch (error) {
      alert("Erro ao sortear Miguel.")
      console.error(error)
    }
  }

  const getById = async (id) => {
    try {
      const { data } = await api.get(`/api/v1/miguelverso/${id}`)
      setSelectedMiguel(data)
    } catch (err) {
      setSelectedMiguel(null)
      alert("Erro ao buscar Miguel por ID.")
      console.error(err)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-center text-6xl font-bold text-red-600 tracking-tight drop-shadow-[2px_2px_0px_#222]">
        Pokédex do Miguelverso
      </h1>

      <Form onCreated={fetchAll} selectedMiguel={selectedMiguel} />

      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={getRandom} 
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-full border-4 border-black shadow-md tracking-wide transition">
          🎲 Sortear Miguel
        </button>

        <div className="flex gap-2 w-full">
          <input 
            type="number" 
            placeholder="ID do Miguel (ex: 25)" 
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)} 
            className="flex-grow border-4 border-black bg-white text-black p-2 rounded-lg shadow-inner placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button 
            onClick={() => {
              if (!selectedId.trim()) {
                alert("Insira um ID válido.")
                return
              }
              getById(selectedId)
            }} 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-full border-4 border-black shadow-md transition">
            🔍 Buscar
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center text-blue-700 mt-6">
        Todos os Miguels 🔥
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {miguels.map((m) => (
          <Card 
            key={m.id} 
            miguel={m} 
            onDelete={deleteMiguel} 
            onEdit={() => setSelectedMiguel(m)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
