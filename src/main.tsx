import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { Title } from './components/Title.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      // { path: "about", Component: About },
      // {
      //   path: "auth",
      //   Component: AuthLayout,
      //   children: [
      //     { path: "login", Component: Login },
      //     { path: "register", Component: Register },
      //   ],
      // },
      {
        path: "home/a",
        Component: Title,
        children: [
          { path: "trending", Component: Title },
        ],
      },
    ],
  },
  {
    path: "/title",
    Component: Title,
    children: [
      { path: "trending", Component: Title },
    ],
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
