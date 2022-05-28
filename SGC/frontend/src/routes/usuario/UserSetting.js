import React, { useState, useEffect, useContext } from 'react'

import { AuthContext } from "../helpers/Auth/auth-context.js";
import getInfoUser from '../helpers/Usuarios/getInfoUser'
const UserSettings = () => {
    let auth = useContext(AuthContext);
    const [dataInput, setdataInput] = useState({
        password: '',
        password2: '',
        username: '',
        CorreoE: '',
        Nombre_Usuario: '',
    });
    const [regex, setRegex] = useState({
        username: /^[a-zA-Z\d@~._-]{0,20}$/,
        password: /.{0,20}/,
        password2: /.{0,20}/,
        CorreoE: /.*/,
        Nombre_Usuario: /^[A-Za-z\sÀ-ÿ]{0,100}$/,
    })
    const [infoUser, setInfoUser] = useState([])

    /**
   * Recibe los datos escritos en un input
   * @param {*} event 
   */
    const handleInputOnChange = (event) => {
        if (event.target.value.match(regex[event.target.name]) != null) {
            setdataInput({
                ...dataInput,
                [event.target.name]: event.target.value
            });
        }
    }

    useEffect(() => {
        const getInforUser = async () => {
            await getInfoUser(auth.user.token).then((data) => {
                setdataInput({
                    ...dataInput,
                    username: data.username,
                    CorreoE: data.CorreoE,
                    Nombre_Usuario: data.Nombre_Usuario,
                })
                console.log(data)
            }
            ).catch((err) => {
                console.log(err);
            }
            );
        }
        getInforUser();
        return () => {
            setInfoUser([]);
        }
    }, [])
    return (
        <div className='containerUserSettings'>
            <h1>Ajustes de Usuarios</h1>
            <form>
                <div className="form group modal Usuario">
                    <input
                        type="text"
                        id="usuario-name"
                        name="Nombre_Usuario"
                        className="inputUsuarioSettings"
                        value={dataInput.Nombre_Usuario}
                        onChange={handleInputOnChange}
                        required
                    />
                    <span className="highlight UsuarioSettings"></span>
                    <span className="bottomBar UsuarioSettings"></span>
                    <label className="UsuarioSettings">Nombre de Usuario</label>
                </div>
                <div className="form group modal Usuario">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="inputUsuarioSettings"
                        value={dataInput.username}
                        onChange={handleInputOnChange}
                        required
                    />
                    <span className="highlight UsuarioSettings"></span>
                    <span className="bottomBar UsuarioSettings"></span>
                    <label className="UsuarioSettings">Apodo</label>
                </div>

                <div className="form group modal Usuario">
                    <input
                        type="text"
                        id="CorreoE"
                        name="CorreoE"
                        className="inputUsuarioSettings"
                        value={dataInput.CorreoE}
                        onChange={handleInputOnChange}
                        required
                    />
                    <span className="highlight UsuarioSettings"></span>
                    <span className="bottomBar UsuarioSettings"></span>
                    <label className="UsuarioSettings">Correo</label>
                </div>

                <div className="form group modal Usuario">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="inputUsuarioSettings"
                        onChange={handleInputOnChange}
                        value={dataInput.password}
                        required
                    />
                    <span className="highlight UsuarioSettings"></span>
                    <span className="bottomBar UsuarioSettings"></span>
                    <label className="UsuarioSettings">Nueva contraseña</label>
                </div>

                <div className="form group modal Usuario">
                    <input
                        type="password"
                        id="password2"
                        name="password2"
                        className="inputUsuarioSettings"
                        onChange={handleInputOnChange}
                        value={dataInput.password2}
                        required
                    />
                    <span className="highlight UsuarioSettings"></span>
                    <span className="bottomBar UsuarioSettings"></span>
                    <label className="UsuarioSettings">Confirmar contraseña</label>
                </div>
                <button>Guardar</button>
            </form>
        </div>
    )
}

export default UserSettings;