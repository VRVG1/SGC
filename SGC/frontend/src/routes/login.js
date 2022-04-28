import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const Login = (props) => {

  return (
    <div id="bg" className="bg">
      <div className="wrapper fadeInDown">
        <div id="content">
          <p className="titleLogin"> Sistema Gestor del Curso SGC </p>
          <h2 className="fadeIn primero"> Login </h2>
          <form onSubmit={ props.submitHandler }>
            <div className="group fadeIn segundo">
              <input
                type="text"
                id="Login"
                name="username"
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
                name="password"
                required
              />
              <span className="highlight"></span>
              <span className="bottomBar"></span>
              <label>Contrasena</label>
            </div>
              <button
                type="submit"
                className="fadeIn cuarto"
              >
                Log In
              </button>
          </form>

        </div>
        <div id="footer">
          <Link className="underlineHover" to="/recuperar">
            Olvidaste la Contrasena
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  )
}


export default Login;
