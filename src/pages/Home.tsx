import type { NavigationItem } from "../components/Navbar"
import Navbar from "../components/Navbar";

export const Home = () => {
    const NavItem: NavigationItem[] = [
        { name: 'Gerenciar Campeonatos', href: '#', current: false },
        { name: 'Criar Campeonatos', href: '#', current: false },
        { name: 'Meu perfil', href: '#', current: false },
    ]

    return(
        <>
            <Navbar navigationItems={NavItem}/>
        </>
    );

}