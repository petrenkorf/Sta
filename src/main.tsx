import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'semantic-ui-css/semantic.min.css'
import { initDB } from "react-indexed-db-hook";
import { DBConfig } from './DBConfig.tsx'

initDB(DBConfig);

createRoot(document.getElementById('root')!).render(
  < App />
)
