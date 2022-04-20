import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';

import './index.css';
import App from './App';
import BarrNav from "./routes/BarrNav";
import Login from "./routes/login.js";
import Home from "./routes/Home";
import Usuarios from "./routes/Usuarios"
import Materias from "./routes/Materias"
import ReportesAdmin from "./routes/ReportesAdmin"
import NotMatch from "./routes/NotFound";
import ReportesCheck from "./routes/ReportesCheck";
import Carreras from "./routes/Carreras";
import ExportData from "./routes/ExportData";
import BackUpRestore from "./routes/BackUpRestore";
import Home2 from './routes/usuario/home';
import BarNav from './routes/usuario/BarNav'
import SysSettings from './routes/SysSettings';
import OlvideContra from './routes/OlivdeContra';

import "./styles/style.css";
import "./styles/BarrNav.css"
import "./styles/Usuarios.scss"
import "./styles/Materias.scss"
import "./styles/ReportesAdmin.scss"
import "./styles/ERROR.scss"
import "./styles/ReportesCheck.scss"
import "./styles/ExportData.scss"
import "./styles/BackUpRestore.scss"
import "./styles/usuario/home.scss"
import "./styles/Home.scss"


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={'login'} />} >
        </Route>
        <Route path='login' element={<Login />} />
        <Route path="recuperar" element={<OlvideContra />} />
        <Route path="admin" element={<BarrNav />}>
          <Route path="home" element={<Home />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="materias" element={<Materias />} />
          <Route path="carreras" element={<Carreras />} />
          <Route path="reportes/admin" element={<ReportesAdmin />} />
          <Route path="reportes/check" element={<ReportesCheck />} />
          <Route path="exportardatos" element={<ExportData />} />
          <Route path="Respadoyrestauraciones" element={<BackUpRestore />} />
          <Route path='ajustes' element={<SysSettings />} />
        </Route>
        <Route path='usuario' element={<BarNav />}>
          <Route path=':usuario/home' element={<Home2 />}/>
        </Route>
        <Route path="*" element={<NotMatch />} />
      </Routes>
    </BrowserRouter>
    <Outlet />
  </React.StrictMode>,
  document.getElementById('root')
);

