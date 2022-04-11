import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const Login = () => {

  return (
    <div id="bg" className="bg">
      <div className="wrapper fadeInDown">
        <div id="content">
          <p className="titleLogin"> Sistema Gestor del Curso SGC </p>
          <h2 className="fadeIn primero"> Login </h2>
          <form>
            <div className="group fadeIn segundo">
              <input
                type="text"
                id="Login"
                name="Login"
                required
              />
              <span className="highlight"></span>
              <span className="bottomBar"></span>
              <label>Usuario</label>
            </div>

            <div className="group fadeIn tercero">
              <input
                type="password"
                id="password"
                name="Login"
                required
              />
              <span className="highlight"></span>
              <span className="bottomBar"></span>
              <label>Contrasena</label>
            </div>
          </form>
          <Link to="/admin"><button
            className="fadeIn cuarto"
          >Log In</button></Link>

        </div>
        <div id="footer">
          <a className="underlineHover" href="#">
            Olvidaste la Contrasena
          </a>
        </div>
      </div>
      <Outlet />
    </div>
  )
}


export default Login;