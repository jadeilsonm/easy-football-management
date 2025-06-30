import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { JSX } from 'react/jsx-runtime';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}


function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}


export default function Navbar(
  // { navigationItems }: NavbarProps
): JSX.Element {
  const { user, logout } = useAuth();
  
  const isAdmin = user ? user.role === "ADMIN" : false;
  const navigationItemsAdmin = [
    { name: 'Gerenciar Campeonatos', href: '/manager', current: true },
    { name: 'Criar Campeonatos', href: '/manager/create/tournament', current: false },
    { name: 'Meu perfil', href: '#', current: false },
    { name: 'Sair', href: '#', current: false },
  ]
  const navigationItemsClient = [
    { name: 'Editar Time', href: '/client/EditTeam', current: false },
    { name: 'Detalhes dos Campeonatos', href: '#', current: false },
    { name: 'Buscar Campeonatos', href: '/client/SeachTournament', current: false },
    { name: 'Sair', href: '#', current: false },
  ]
  const navigationItemsCurrent = isAdmin ? navigationItemsAdmin : navigationItemsClient;

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile/edit');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Disclosure as="nav" className="bg-neutral-900 w-full fixed top-0 p-2">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-neutral-900 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="http://132.226.159.21:9000/asserts/logo_oficial.png"
                    className="h-10 w-auto"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigationItemsCurrent.map((item: NavigationItem) => (
                      <a
                        onClick={() => item.name === "Sair" ? logout(): null}
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? 'bg-neutral-900 text-white' : 'text-gray-300 hover:bg-neutral-800 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-neutral-900 p-1 text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden hover:border-green-700 hover:border-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>

                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-neutral-900 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden hover:border-green-700 hover:border-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="size-8 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <MenuItem>
                      {({ focus }) => (
                        <button
                          onClick={handleProfileClick}
                          className={classNames(
                            focus ? 'bg-gray-100' : '',
                            'block w-full text-left px-4 py-2 text-sm text-gray-700',
                          )}
                        >
                          Editar Perfil
                        </button>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ focus }) => (
                        <a
                          href="#"
                          className={classNames(
                            focus ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700',
                          )}
                        >
                          Configurações
                        </a>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ focus }) => (
                        <button
                          onClick={handleLogout}
                          className={classNames(
                            focus ? 'bg-gray-100' : '',
                            'block w-full text-left px-4 py-2 text-sm text-gray-700',
                          )}
                        >
                          Sair
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigationItemsCurrent.map((item: NavigationItem) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-neutral-900 text-white' : 'text-gray-300 hover:bg-neutral-900 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}