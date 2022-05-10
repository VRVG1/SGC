import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LoginContext } from './helpers/Auth/login-context';

/**
  * El componente <ErrorMessage /> se encarga de renderizar el contenedor
  * del mensaje de error en caso de que el inicio de sesión no se haya
  * consumado en su totalidad.
  *
  * @returns Componente <ErrorMessage />
  */
const ErrorMessage = (props) => {
  const loginContext = React.useContext(LoginContext);
  let errorContainer;
  if(loginContext.status?.failureStatus) {
    errorContainer = (
      <div className="fadeIn primero-error">
        <p>{ loginContext.status.error.non_field_errors }</p>
      </div>
    );
  } else {
    errorContainer = (<div></div>);
  }
  return errorContainer;
}

export const Login = (props) => {

  //TODO: Ya no es necesario el estado errorM, favor de quitar toda referencia
  //      a este
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
          <ErrorMessage loginStatus={ props.loginStatus }/>
          {/**
            <div className={errorM}>
            <p>Usuario o Contrasena incorrectos</p>
            </div>
            **/}
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
