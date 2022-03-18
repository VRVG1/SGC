import * as React from "react";
import { Routes, Route} from "react-router-dom";

import BarrNav from "./routes/BarrNav";
import Login from "./routes/login.js";
import Home from "./routes/Home";
import Usuarios from "./routes/Usuarios"
import Materias from "./routes/Materias"
import ReportesAdmin from "./routes/ReportesAdmin"
import NotMatch from "./routes/NotFound";
import ReportesCheck from "./routes/ReportesCheck";
import Carreras from "./routes/Carreras";

import "./styles/style.css";
import "./styles/BarrNav.css"
import "./styles/Usuarios.scss"
import "./styles/Materias.scss"
import "./styles/ReportesAdmin.scss"
import "./styles/ERROR.scss"
import "./styles/ReportesCheck.scss"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BarrNav />}>
          <Route path="/admin/home" element={<Home />} />
          <Route path="/admin/usuarios" element={<Usuarios />} />
          <Route path="/admin/materias" element={<Materias />} />
          <Route path="/admin/carreras" element={<Carreras />} />
          <Route path="/admin/reportes/admin" element={<ReportesAdmin />} />
          <Route path="/admin/reportes/check" element={<ReportesCheck />} />
        </Route>
        <Route path="*" element={<NotMatch />} />
      </Routes>
    </div>
  );
}

export default App;
