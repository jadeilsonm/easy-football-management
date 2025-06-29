import { useEffect, useState } from "react";
import playerService from "../services/playerService";
import { gql, useQuery } from "@apollo/client";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

interface Player {
  id: string;
  name: string;
  position: 'GOL' | 'ZAG' | 'LE' |'LD' | 'ME' | 'ATC' | 'PE' | 'PT';
  number: number;
}

export const EditTeam = () => {

  const GET = gql(
    `query User($id: ID!) {
        user(id: $id) {
            id
            name
            team {
                id
                name
                players{
                    id
                    name
                    position
                    number
                }
            }
        }
}`);

  // const [name, setName] = useState<string>("");//3f65f1e8-0f6c-4471-9851-accdadb40f5b
  // const [number, setNumber] = useState<number>(0);
  // const [position, setPosition] = useState<string>("");
  const { user } = useAuth();
  const [teamId, SetTeamId] = useState<string>('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [form, setForm] = useState({ name: '', position: '', number: '' });
  const [formEdit, setFormEdit] = useState({ name: '', position: '', number: '' });
  const [editIndex, setEditIndex] = useState(null);
  const { addToast } = useToast();
  const { loading, data } = useQuery(
    GET,
    { variables: { id: user?.id || '' } }
  );

  useEffect(() => {
    if (data && data.user && data.user.team) {
      SetTeamId(data.user.team.id);
      setPlayers(data.user.team.players);
    }
  }, [data]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


   const addPlayer = async () => {
    if (!form.name || !form.position || !form.number) {
      addToast("Alert","warning", "Preencha todos os campos!");
      return;
    }
    try {
      const newPlayer = {
        name: form.name,
        position: form.position,
        number: parseInt(form.number, 10),
        teamId: teamId,
      };
      const createdPlayer = await playerService.create(newPlayer);
      setPlayers([...players, createdPlayer]);
      setForm({ name: '', position: '', number: '' });
      addToast("Info", "info", "Adicionado com sucesso!");
    } catch (error) {
      console.error('Error adding player:', error);
      addToast("Error", "error", "Erro ao adicionar o player");
    }
  };

  const initEdit = (id: string) => {
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

  const deletePlayer = (idP: string) => {
    const n = players.filter(({ id }) => id !== idP);
    setPlayers(n);
    playerService.delete(idP)
    // if (editIndex === index) cancelEdit(); 
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 flex flex-wrap gap-4 items-end">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/4"
        />
        <select
          name="position"
          value={form.position}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/4"
        >
          <option value="GOL">Goleiro</option>
          <option value="ZAG">Zagueiro</option>
          <option value="LE">Lateral Esquerdo</option>
          <option value="LD">Lateral Direito</option>
          <option value="ME">Meio-campo</option>
          <option value="ATC">Atacante</option>
          <option value="PE">Ponta Esquerda</option>
          <option value="PD">Ponta Direita</option>
        </select>
        <input
          type="number"
          name="number"
          placeholder="Número"
          value={form.number}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/4"
        />

        
        {editIndex === null ? (
          <button
            onClick={addPlayer}
            className="bg-blue-600  text-white px-12 py-2 rounded hover:bg-blue-700 w-full md:w-auto"
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
                  onClick={() => initEdit(player.id)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletePlayer(player.id)}
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