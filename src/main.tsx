import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { Title } from './components/Title.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import BracketTree from './components/BracketTree.tsx';
import { ToastProvider } from './context/ToastContext.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  {
    path: "/title",
    Component: Title,
    children: [
      { path: "trending", Component: Title },
    ],
  },
  {
    path: "/torneio",
    Component: BracketTree
  }
]);

createRoot(document.getElementById('root')!).render(
  <ToastProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </ToastProvider>
)
