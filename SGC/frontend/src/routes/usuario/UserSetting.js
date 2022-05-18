import React from 'react'

const UserSettings = () => {
    return (
        <div className='containerMaterias'>
            <h1>Ajustes de Usuarios</h1>
            <form>
                <div className="form group modal Usuario">
                    <input
                        type="text"
                        id="usuario-name"
                        name="Nombre_Usuario"
                        className="inputUsuarios"
                        // value={dataInput.Nombre_Usuario}
                        // onChange={handleInputOnChange}
                        required
                    />
                    <span className="highlight Usuarios"></span>
                    <span className="bottomBar Usuarios"></span>
                    <label className="Usuarios">Nombre de Usuario</label>
                </div>

                <div className="form group modal Usuario">
                    <input
                        type="text"
                        id="usuario-name"
                        name="Nombre_Usuario"
                        className="inputUsuarios"
                        // value={dataInput.Nombre_Usuario}
                        // onChange={handleInputOnChange}
                        required
                    />
                    <span className="highlight Usuarios"></span>
                    <span className="bottomBar Usuarios"></span>
                    <label className="Usuarios">Correo</label>
                </div>

                <div className="form group modal Usuario">
                    <input
                        type="password"
                        id="usuario-name"
                        name="Nombre_Usuario"
                        className="inputUsuarios"
                        // value={dataInput.Nombre_Usuario}
                        // onChange={handleInputOnChange}
                        required
                    />
                    <span className="highlight Usuarios"></span>
                    <span className="bottomBar Usuarios"></span>
                    <label className="Usuarios">Nueva contraseña</label>
                </div>

                <div className="form group modal Usuario">
                    <input
                        type="password"
                        id="usuario-name"
                        name="Nombre_Usuario"
                        className="inputUsuarios"
                        // value={dataInput.Nombre_Usuario}
                        // onChange={handleInputOnChange}
                        required
                    />
                    <span className="highlight Usuarios"></span>
                    <span className="bottomBar Usuarios"></span>
                    <label className="Usuarios">Confirmar contraseña</label>
                </div>
                <button>Guardar</button>
            </form>
        </div>
    )
}

export default UserSettings;