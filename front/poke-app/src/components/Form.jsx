// components/Form.jsx
import { useState, useEffect } from 'react'
import { api } from '../api'

const Form = ({ onCreated, selectedMiguel, onEditSave }) => {
  const [id, setId] = useState("")
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [foto, setFoto] = useState("")

  useEffect(() => {
    if (selectedMiguel) {
      setId(selectedMiguel.id)
      setNome(selectedMiguel.nome)
      setDescricao(selectedMiguel.descricao)
      setFoto(selectedMiguel.foto)
    }
  }, [selectedMiguel])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!nome || !descricao || !foto || !id) {
      alert("Preencha todos os campos!")
      return
    }

    const formData = {
      id,
      nome,
      descricao,
      foto
    }

    try {
      if (selectedMiguel) {
        // Se estamos editando um "Miguel", enviamos a atualização
        await api.put(`/api/v1/miguelverso/${selectedMiguel.id}`, formData)
      } else {
        // Se estamos criando um novo "Miguel"
        await api.post('/api/v1/miguelverso', formData)
      }
      onCreated()
      // Limpar os campos após envio
      setId("")
      setNome("")
      setDescricao("")
      setFoto("")
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-center text-blue-600">
        {selectedMiguel ? "Editar Miguel" : "Adicionar Miguel"}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">ID</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 transition-all"
            placeholder="ID do Miguel"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 transition-all"
            placeholder="Nome do Miguel"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 transition-all"
            placeholder="Descrição do Miguel"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Foto (URL)</label>
          <input
            type="url"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 transition-all"
            placeholder="URL da foto do Miguel"
            required
          />
        </div>

      </div>

      <button
        type="submit"
        className="w-full py-3 bg-red-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all"
      >
        {selectedMiguel ? "Salvar Edição" : "Adicionar Miguel"}
      </button>
    </form>
  )
}

export default Form
