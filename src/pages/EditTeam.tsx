import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import playerService from "../services/playerService";

interface Player {
  name: string;
  position: string;
  number: number;
}

export const EditTeam = () => {
  // const [name, setName] = useState<string>("");//3f65f1e8-0f6c-4471-9851-accdadb40f5b
  // const [number, setNumber] = useState<number>(0);
  // const [position, setPosition] = useState<string>("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [form, setForm] = useState({ name: '', position: '', number: '' });
  const [formEdit, setFormEdit] = useState({ name: '', position: '', number: '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await playerService.getAllById();
        setPlayers(response);

      } catch (error) {
        console.error('Error fetching tournament details:', error);
      }
    };

    fetchPlayers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addPlayer = () => {
    if (!form.name || !form.position || !form.number) return;
    try {
      const newPlayer = {
        name: form.name,
        position: form.position,
        number: parseInt(form.number, 10),
        teamId: '3f65f1e8-0f6c-4471-9851-accdadb40f5b',
      };
      setPlayers([...players, form]);
      setForm({ name: '', position: '', number: '' });
    } catch (error) {
      
    }
  };

  const initEdit = (index) => {
    setEditIndex(index);
    setForm(players[index]);
  };

  const salvarEdicao = () => {
    if (editIndex === null) return;
    const newList = [...players];
    newList[editIndex] = form;
    setPlayers(newList);
    cancelEdit();
  };

  const cancelEdit = () => {
    setForm({ name: '', position: '', number: '' });
    setEditIndex(null);
  };

  const deletePlayer = (index) => {
    const n = players.filter((_, i) => i !== index);
    setPlayers(n);
    if (editIndex === index) cancelEdit(); 
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 flex flex-wrap gap-4 items-end">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/4"
        />
        <select
          name="posicao"
          value={form.position}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/4"
        >
          <option value="Goleiro">Goleiro</option>
          <option value="Zagueiro">Zagueiro</option>
          <option value="Lateral">Lateral</option>
          <option value="Meio-campo">Meio-campo</option>
          <option value="Atacante">Atacante</option>
        </select>
        <input
          type="number"
          name="numero"
          placeholder="Número"
          value={form.number}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/4"
        />

        
        {editIndex === null ? (
          <button
            onClick={addPlayer}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full md:w-auto"
          >
            Inserir
          </button>
        ) : (
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={salvarEdicao}
              className="bg-green-600 text-white px-2 py-2 rounded hover:bg-green-700"
            >
              Salvar
            </button>
            <button
              onClick={cancelEdit}
              className="bg-gray-500 text-white px-2 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      <table className="min-w-full table-auto border border-gray-300">
        <thead className="">
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Nome</th>
            <th className="border px-4 py-2 text-left">Posição</th>
            <th className="border px-4 py-2 text-left">Número</th>
            <th className="border px-4 py-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{player.name}</td>
              <td className="border px-4 py-2">{player.position}</td>
              <td className="border px-4 py-2">{player.number}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => initEdit(index)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletePlayer(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {players.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                Nenhum jogador adicionado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}