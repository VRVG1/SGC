import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

export const Login = (props) => {

  const [errorM, setErrorM] = useState('fadeIn primero-error-hidden')
  const [animation, setAnimation] = useState({
    wrapper: 'wrapper fadeInDown',
    primero: 'fadeIn primero',
    segundo: 'group fadeIn segundo',
    tercero: 'group fadeIn tercero',
    cuarto: 'fadeIn cuarto',
  })
  return (
    <div id="bg" className="bg">
      <div className={animation.wrapper}>
        <div id="content">
          <p className="titleLogin"> Sistema Gestion del Curso SGC </p>
          <h2 className={animation.primero}> Login </h2>
          <div className={errorM}>
            <p>Usuario o Contrasena incorrectos</p>
          </div>
          <form onSubmit={props.submitHandler}>
            <div className={animation.segundo}>
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

            <div className={animation.tercero}>
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
              className={animation.cuarto}
            >
              Log In
            </button>

            <button onClick={() => setErrorM('fadeIn primero-error')}>Error</button>
          </form>

        </div>
        <div id="footer">
          <Link className="underlineHover" to="/recuperacion">
            Olvidaste la Contrasena
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  )
}


export default Login;
