import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const OlvideContra = () => {

  return (
    <div id="bg" className="bg">
      <div className="wrapper fadeInDown">
        <div id="content">
          <p className="titleOlvideContra"> Sistema Gestion del Curso SGC </p>
          <h2 className="fadeIn primero"> Recuperacion </h2>
          <form>
            {/* <div className="group fadeIn segundo">
              <input
                type="text"
                id="OlvideContra"
                name="OlvideContra"
                required
              />
              <span className="highlight"></span>
              <span className="bottomBar"></span>
              <label>Usuario</label>
            </div> */}

            <div className="group fadeIn tercero">
              <input
                type="text"
                id="password"
                name="OlvideContra"
                required
              />
              <span className="highlight"></span>
              <span className="bottomBar"></span>
              <label>Correo</label>
            </div>
          </form>
          <Link to="/admin"><button
            className="fadeIn cuarto"
          >Log In</button></Link>

        </div>
      </div>
      <Outlet />
    </div>
  )
}


export default OlvideContra;