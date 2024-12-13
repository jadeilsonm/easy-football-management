import { db } from '@/firebase';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, getDoc, doc, query, where } from 'firebase/firestore';
import { faker } from '@faker-js/faker';

export class DAOService {
  constructor(path) {
    if (!path) {
      throw new Error('Path is required');
    }
    this.collection = collection(db, path);
  }

  async create(data) {
    try {
      const docRef = await addDoc(this.collection, data);
      return docRef.id;
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  async update(id, data) {
    try {
      const docRef = doc(this.collection, id);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  }

  async delete(id) {
    try {
      const docRef = doc(this.collection, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  }

  async getAll() {
    try {
      const querySnapshot = await getDocs(this.collection);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }

  async getById(id) {
    try {
      const docRef = doc(this.collection, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.error('No such document!');
      }
    } catch (error) {
      console.error('Error getting document: ', error);
    }
  }

  async getByField(field, value) {
    try {
      const q = query(this.collection, where(field, '==', value));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() })
      });
      return data;
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }

  async search(fields) {
    try {
      let q;
      fields.forEach((field) => {
        q = query(this.collection, where(field.field, field.operator, field.value));
      });
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }

  async seedDatabase() {
    const userCollection = collection(db, 'user');
    const teamCollection = collection(db, 'team');
    const playerCollection = collection(db, 'player'); // Nova coleção para os jogadores

    for (let i = 0; i < 20; i++) {
      // Gerando dados do usuário
      const userName = faker.internet.username();
      const userEmail = faker.internet.email();
      const userPhone = faker.phone.imei();
      const userImage = faker.image.avatar();

      const userData = {
        name: userName,
        email: userEmail,
        phone: userPhone,
        url_image: userImage
      };

      try {
        // Adicionando o usuário à coleção 'users'
        const userDocRef = await addDoc(userCollection, userData);
        console.log(`User ${userName} added with ID: ${userDocRef.id}`);

        // Gerando dados do time do usuário
        const teamName = `${userName}'s team`;

        // Adicionando o time à coleção 'teams'
        const teamData = {
          name: teamName,
          userId: userDocRef.id,  // Associando o time ao usuário através do ID do usuário
        };

        const teamDocRef = await addDoc(teamCollection, teamData);
        console.log(`Team ${teamName} added with ID: ${teamDocRef.id}`);

        // Gerando jogadores para o time
        for (let j = 0; j < 24; j++) {
          const playerData = {
            playerName: faker.internet.username(),
            playerPosition: faker.helpers.arrayElement(['Goleiro', 'Zagueiro', 'Lateral', 'Meio Campo', 'Atacante']),
            playerAge: faker.number.int({ min: 18, max: 40 }),
            playerImage: faker.image.avatar(),
            teamId: teamDocRef.id  // ID do time associado ao jogador
          };

          // Adicionando o jogador à coleção 'players'
          await addDoc(playerCollection, playerData);
          console.log(`Player ${playerData.playerName} added to team ${teamName}`);
        }

      } catch (error) {
        console.error('Error adding user, team and players: ', error);
      }
    }
  }
  
}

// async seedDatabase() {
//   const DAOuser = new DAOService('user');
//   try {
//     // Função para criar usuários
//     const createUsers = async () => {
//       const users = [];
//       for (let i = 0; i < 24; i++) {
//         const user = {
//           name: faker.internet.username(),
//           email: faker.internet.email(),
//           phone: faker.phone.imei(),
//           url_image: faker.image.avatar(),
//         };
//         const userRef = await DAOuser.create(user);
//         users.push({ ...user, id: userRef.id });
//       }
//       return users;
//     };

//     // Função para criar times
//     const createTeams = async (users) => {
//       const teams = [];
//       for (const user of users) {
//         const team = {
//           name: faker.company.companyName(),
//           url_image: faker.image.sports(),
//           user_id: user.id,
//           users_id: user.id,
//         };
//         const teamRef = await db.collection("teams").add(team);
//         teams.push({ ...team, id: teamRef.id });
//       }
//       return teams;
//     };

//     // Função para criar jogadores
//     const createPlayers = async (teams) => {
//       const players = [];
//       for (const team of teams) {
//         for (let i = 0; i < 5; i++) {
//           const player = {
//             full_name: faker.name.findName(),
//             position: faker.name.jobType(),
//             number: faker.datatype.number({ min: 1, max: 99 }),
//             team_id: team.id,
//           };
//           const playerRef = await db.collection("players").add(player);
//           players.push({ ...player, id: playerRef.id });
//         }
//       }
//       return players;
//     };

//     // Função para criar campeonatos
//     const createChampionships = async (teams) => {
//       const championships = [];
//       // Criar 2 ligas com 4 times cada
//       for (let i = 0; i < 2; i++) {
//         const championship = {
//           name: `League ${faker.random.word()}`,
//           status: "current",
//           created_at: faker.date.past(),
//           type: "league",
//           quantity: 4,
//           award: faker.finance.amount(1000, 5000, 2),
//           user_id: teams[i].user_id,
//           teams: teams.slice(i * 4, i * 4 + 4).map((t) => t.id),
//         };
//         const championshipRef = await db.collection("championships").add(championship);
//         championships.push({ ...championship, id: championshipRef.id });
//       }

//       // Criar 2 copas com 4 times cada
//       for (let i = 2; i < 4; i++) {
//         const championship = {
//           name: `Cup ${faker.random.word()}`,
//           status: "current",
//           created_at: faker.date.past(),
//           type: "cup",
//           quantity: 4,
//           award: faker.finance.amount(5000, 10000, 2),
//           user_id: teams[i].user_id,
//           teams: teams.slice(i * 4, i * 4 + 4).map((t) => t.id),
//         };
//         const championshipRef = await db.collection("championships").add(championship);
//         championships.push({ ...championship, id: championshipRef.id });
//       }

//       // Criar 2 copas sem times inscritos
//       for (let i = 0; i < 2; i++) {
//         const championship = {
//           name: `Empty Cup ${faker.random.word()}`,
//           status: "created",
//           created_at: faker.date.past(),
//           type: "cup",
//           quantity: 0,
//           award: faker.finance.amount(500, 1000, 2),
//           user_id: teams[i + 4].user_id,
//           teams: [],
//         };
//         const championshipRef = await db.collection("championships").add(championship);
//         championships.push({ ...championship, id: championshipRef.id });
//       }
//       return championships;
//     };

//     const users = await createUsers();
//     const teams = await createTeams(users);
//     await createPlayers(teams);
//     await createChampionships(teams);

//     console.log("Database seeding completed!");
//   } catch (error) {
//     console.error("Error seeding database: ", error);
//   }
// }