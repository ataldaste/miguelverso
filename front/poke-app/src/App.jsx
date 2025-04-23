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
    <div className="p-8 max-w-5xl mx-auto space-y-8 font-sans bg-gradient-to-br from-green-100 to-blue-200">
      <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600 drop-shadow-md">
        Pokédex do Miguelverso 🔴🟡🔵
      </h1>

      <Form onCreated={fetchAll} selectedMiguel={selectedMiguel} />

      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={getRandom} 
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-xl shadow-lg w-full transition">
          🎲 Sortear Miguel
        </button>

        <div className="flex gap-2 w-full">
          <input 
            type="number" 
            placeholder="ID do Miguel (ex: 25)" 
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)} 
            className="flex-grow border-2 border-blue-400 p-2 rounded-lg text-blue-700 placeholder-blue-300 shadow-inner focus:ring-2 focus:ring-blue-500 transition"
          />
          <button 
            onClick={() => {
              if (!selectedId.trim()) {
                alert("Insira um ID válido.")
                return
              }
              getById(selectedId)
            }} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg shadow-md transition">
            🔍 Buscar
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center text-blue-600 mt-6">Todos os Miguels 🔥</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {miguels.map((m) => (
          <Card 
            key={m.id} 
            miguel={m} 
            onDelete={deleteMiguel} 
            onEdit={() => setSelectedMiguel(m)} // Editar funcionalidade
          />
        ))}
      </div>
    </div>
  )
}

export default App
