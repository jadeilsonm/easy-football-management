<template>
  <div class="search">
    <div v-for="( ChanpionsShip, index ) in stateChanpionsShips" :key="index" class="chanpionships">
      <span>Name: {{ ChanpionsShip.name }} </span>
      <span>vagas: {{ ChanpionsShip.qntTime }}</span>
      <span>Tipo: {{ ChanpionsShip.type }}</span>
      <button type="button" @click="buttonRedirect(ChanpionsShip.id)">detalhes</button>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { DAOService } from "@/services/DAOService";
import router from "@/router";
const URL_ROUTER_CHAMPION_SHIP = '/search/championship/details/';

export default {
  setup() {
    const DAOServiceInstance = new DAOService('chanpions_ships');
    const stateChanpionsShips = ref([
      // { name: "brasileirão", qntTime: 12,  type: "cup"},
      // { name: "cop do brasil", qntTime: 18,  type: "league"}
    ]); // Estado que irá armazenar os dados

    const buttonRedirect = (championShipId) => {
      console.log(URL_ROUTER_CHAMPION_SHIP + championShipId);
      router.push({name: 'championsshipdetails', params: { id: championShipId }})
    }
    
    onBeforeMount(async () => {
      try {
        const response = await DAOServiceInstance.getAll();
        console.log('está sendo retornado ', response);
        stateChanpionsShips.value = response;

      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      }
    });

    return {
      stateChanpionsShips,
      buttonRedirect
    };
  }
};
</script>

<style scoped>
.search {
  height: 70vh;
  width: 80vw;
  border: solid 1px green;
  display: flex;
  margin: 15px;
}

/* .chanpionships {
  border-radius: 26px;
  border: solid 1px green;
  width: 400px;
  height: 200px;
} */

.chanpionships {
  background-color: #1f1f1f; /* Fundo mais claro do container */
  border-radius: 8px; /* Bordas arredondadas */
  padding: 20px;
  margin: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* Sombras sutis */
  transition: transform 0.2s ease; /* Transição suave ao passar o mouse */
}

/* Efeito de hover (passar o mouse sobre o container) */
.chanpionships:hover {
  transform: translateY(-5px); /* Levanta o container um pouco */
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4); /* Aumenta a sombra no hover */
}

/* Estilo dos textos dentro do container */
.chanpionships span {
  display: block; /* Faz com que cada linha ocupe uma nova linha */
  margin-bottom: 8px; /* Espaçamento entre os spans */
  font-size: 16px; /* Tamanho de fonte */
  color: #ddd; /* Cor de texto clara */
}

/* Estilo do botão */
button {
  background-color: #06ee2dd7; /* Cor de fundo do botão */
  color: #ffffff; /* Cor do texto do botão */
  border: none;
  padding: 10px 20px;
  border-radius: 4px; /* Bordas arredondadas */
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease; /* Transição suave ao passar o mouse */
}

/* Efeito de hover no botão */
button:hover {
  background-color: #06ee2d88; /* Muda a cor do botão quando o mouse passa */
}

@media (max-width: 768px) {
  .chanpionships {
    padding: 15px; /* Menos padding para telas menores */
  }

  button {
    width: 100%; /* O botão ocupa toda a largura em telas pequenas */
  }
}
</style>
