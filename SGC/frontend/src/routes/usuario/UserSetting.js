import React from 'react'

const UserSettings = () => {
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
                        // value={dataInput.Nombre_Usuario}
                        // onChange={handleInputOnChange}
                        required
                    />
                    <span className="highlight UsuarioSettings"></span>
                    <span className="bottomBar UsuarioSettings"></span>
                    <label className="UsuarioSettings">Nombre de Usuario</label>
                </div>

                <div className="form group modal Usuario">
                    <input
                        type="text"
                        id="usuario-name"
                        name="Nombre_Usuario"
                        className="inputUsuarioSettings"
                        // value={dataInput.Nombre_Usuario}
                        // onChange={handleInputOnChange}
                        required
                    />
                    <span className="highlight UsuarioSettings"></span>
                    <span className="bottomBar UsuarioSettings"></span>
                    <label className="UsuarioSettings">Correo</label>
                </div>

                <div className="form group modal Usuario">
                    <input
                        type="password"
                        id="usuario-name"
                        name="Nombre_Usuario"
                        className="inputUsuarioSettings"
                        // value={dataInput.Nombre_Usuario}
                        // onChange={handleInputOnChange}
                        required
                    />
                    <span className="highlight UsuarioSettings"></span>
                    <span className="bottomBar UsuarioSettings"></span>
                    <label className="UsuarioSettings">Nueva contraseña</label>
                </div>

                <div className="form group modal Usuario">
                    <input
                        type="password"
                        id="usuario-name"
                        name="Nombre_Usuario"
                        className="inputUsuarioSettings"
                        // value={dataInput.Nombre_Usuario}
                        // onChange={handleInputOnChange}
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