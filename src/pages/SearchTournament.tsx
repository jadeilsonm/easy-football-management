import type { NavigationItem } from "../components/Navbar"
import Navbar from "../components/Navbar";

export const SearchTournament = () => {
  const NavItem: NavigationItem[] = [
      { name: 'Editar Time', href: '/client/EditTeam', current: false },
      { name: 'Detalhes dos Campeonatos', href: '#', current: false },
      { name: 'Buscar Campeonatos', href: '/client/SeachTournament', current: false },
  ]
  return(
    <>
      <Navbar navigationItems={NavItem}/>
      <div>
          
      </div>
    </>
  );

}