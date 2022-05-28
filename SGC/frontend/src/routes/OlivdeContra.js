import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import itcg from '../img/ITCG-logo2.png';
import recuperarContra from './helpers/Usuarios/recuperarContra';
export const OlvideContra = () => {

  const [dataInput, setdataInput] = useState({
    username: '',
    email: '',
  });
  /**
   * Metodo para recuperar pedir correo con contraseña
   */
  const enviarPeticion = async () => {
    await recuperarContra(dataInput);
  }

  /**
 * Recibe los datos escritos en un input
 * @param {*} event 
 */
  const handleInputOnChange = (event) => {
      setdataInput({
        ...dataInput,
        [event.target.name]: event.target.value
      });
  }

  return (
    <div id="bg" className="bg">
      <div className="wrapper fadeInDown">
        <div id="content">
          <p className="titleOlvideContra"> Sistema Gestion del Curso SGC </p>
          <div className="fadeIn primero">
            <img className='icon' src={itcg}></img>
            <h2 className='loginOlvide'> Recuperacion </h2>
          </div>
          <form>
            <div className="group fadeIn segundo">
              <input
                type="text"
                id="username"
                name="username"
                value={dataInput.username}
                onChange={handleInputOnChange}
                required
              />
              <span className="highlight"></span>
              <span className="bottomBar"></span>
              <label>Usuario</label>
            </div>

            <div className="group fadeIn tercero">
              <input
                type="text"
                id="email"
                name="email"
                value={dataInput.email}
                onChange={handleInputOnChange}
                required
              />
              <span className="highlight"></span>
              <span className="bottomBar"></span>
              <label>Correo</label>
            </div>
          </form>
          <button
            className="fadeIn cuarto"
            onClick={enviarPeticion}
          >Enviar</button>

        </div>
        <div id="footer">
          <Link className="underlineHover-regresar" to="/login">
            Regresar
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  )
}


export default OlvideContra;