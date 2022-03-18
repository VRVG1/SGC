import React, { useState } from "react";
import Modal from './modal/Modal.js'

const Usuarios = props => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [showModalModify, setShowModalModify] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  let apodo = "FatNDepresse";
  let UserType = "Maestro";
  let emailUser = "ejemplo@ejemplo.com"
  let usuarioEliminar = "Victor Rafael Valdivia Gomez"
  let usuarioActualizar = "Pedro Nicolas Rios Vargas"

  function deleteUsuario() {
    setShowModalDelete(false);
    setShowModalDetails(false);
    //Poner en este metodo los pasos requeridos para borrar un usuario
  }

  function updateUser() {
    setShowModalConfirm(false);
    setShowModalModify(false);
    setShowModalDetails(false);
    //Poner en este metodo los pasos requeridos para actualizar un usuario
  }

  return (
    <div className="containerUsuarios">
      <h1>Usuarios</h1>
      <form>
        <div className="form group modal Usuario">
          <input
            type="text"
            id="usuario-name"
            name="usuario-name"
            className="inputUsuarios-search"
            required
          />
          <span className="highlight Usuarios"></span>
          <span className="bottomBar Usuarios-main"></span>
          <label className="Usuarios-search">Nombre de Usuario</label>
        </div>
      </form>

      <table className="tabla Usuarios">
        <tbody>
          <tr>
            <td onClick={() => setShowModalDetails(true)}>
              Cesareo De-La-Fuente
            </td>
          </tr>
          <tr>
            <td>
              Valeria Redondo
            </td>
          </tr>
          <tr>
            <td>
              Paloma Montoya
            </td>
          </tr>
          <tr>
            <td>
              Nazaret Oliver
            </td>
          </tr>
          <tr>
            <td>
              Gala Miro
            </td>
          </tr>
          <tr>
            <td>
              Glória Cañadas
            </td>
          </tr>
          <tr>
            <td>
              Pedro-Pablo Mendez
            </td>
          </tr>
          <tr>
            <td>
              Cesareo De-La-Fuente
            </td>
          </tr>
          <tr>
            <td>
              Valeria Redondo
            </td>
          </tr>
          <tr>
            <td>
              Paloma Montoya
            </td>
          </tr>
          <tr>
            <td>
              Nazaret Oliver
            </td>
          </tr>
          <tr>
            <td>
              Gala Miro
            </td>
          </tr>
          <tr>
            <td>
              Glória Cañadas
            </td>
          </tr>
          <tr>
            <td>
              Pedro-Pablo Mendez
            </td>
          </tr>
        </tbody>
      </table>

      <input
        type="submit"
        className="button Usuarios"
        value="Agregar"
        onClick={() => setShowModalAdd(true)}
      ></input>

      <Modal show={showModalDetails} setShow={setShowModalDetails} title={"Nombre del Usuario"}>
        <div className="Usuarios-Detalles grid">
          <div className="Usuarios-Detalles one">
            <label className="Usuarios-Detalles">Apodo de Usuario:</label>
            <p className="Usuarios-Detalles">{apodo}</p>
            <span className="bottomBar Usuarios-Detalles"></span>
          </div>

          <div className="Usuarios-Detalles two">
            <label className="Usuarios-Detalles">Tipo de Usuario:</label>
            <p className="Usuarios-Detalles">{UserType}</p>
            <span className="bottomBar Usuarios-Detalles"></span>
          </div>

          <div className="Usuarios-Detalles three">
            <label className="Usuarios-Detalles">Correo del Usuario:</label>
            <p className="Usuarios-Detalles">{emailUser}</p>
            <span className="bottomBar Usuarios-Detalles"></span>
          </div>

          <div className="Usuarios-Detalles four">
            <label className="Usuarios-Detalles">Correo del Usuario:</label>
            <p className="Usuarios-Detalles">{emailUser}</p>
            <span className="bottomBar Usuarios-Detalles"></span>
          </div>
        </div>
        <div className="Usuarios-Detalles buttons">
          <input
            type="submit"
            className="button Usuarios"
            value="Cerrar"
            onClick={() => setShowModalDetails(false)}
          />
          <input
            type="submit"
            className="button Usuarios"
            value="Modificar"
            onClick={() => setShowModalModify(true)}
          />
          <input
            type="submit"
            className="button Usuarios delete"
            value="Eliminar"
            onClick={() => setShowModalDelete(true)}
          />
        </div>
      </Modal>

      <Modal show={showModalAdd} setShow={setShowModalAdd} title={"Agregar Usuario"}>
        <form>
          <div className="form group modal Usuario">
            <input
              type="text"
              id="usuario-name"
              name="usuario-name"
              className="inputUsuarios"
              required
            />
            <span className="highlight Usuarios"></span>
            <span className="bottomBar Usuarios"></span>
            <label className="Usuarios">Nombre de Usuario</label>
          </div>

          <div className="form group modal Usuario">
            <select>
              <option value="Maestro">Maestro</option>
              <option value="Administrados">Administrados</option>
              <option value="Supervisor">Supervisor</option>
            </select>
            <span className="highlight Usuarios"></span>
            <span className="bottomBar Usuarios"></span>
            <label className="Usuarios">Tipo de Usuario</label>
          </div>

          <div className="form group modal Usuario">
            <input
              type="text"
              id="usuario-nickname"
              name="usuario-nickname"
              className="inputUsuarios"
              required
            />
            <span className="highlight Usuarios"></span>
            <span className="bottomBar Usuarios"></span>
            <label className="Usuarios">Apodo de Usuario</label>
          </div>

          <div className="form group modal Usuario">
            <input
              type="email"
              id="usuario-email"
              name="usuario-email"
              // pattern=".+@cdguzman.tecnm.com"
              title="Correo electronico Institucional del ITCG"
              className="inputUsuarios"
              required
            />
            <span className="highlight Usuarios"></span>
            <span className="bottomBar Usuarios"></span>
            <label className="Usuarios">Correo de Usuario</label>
          </div>

          <div className="form group modal Usuario">
            <input
              type="password"
              id="usuario-password"
              name="usuario-password"
              className="inputUsuarios"
              required
            />
            <span className="highlight Usuarios"></span>
            <span className="bottomBar Usuarios"></span>
            <label className="Usuarios">Contrasena de Usuario</label>
          </div>
        </form>

        <input
          type="submit"
          className="button Usuarios"
          value="Guardar"
          onClick={() => setShowModalAdd(false)}
        />

      </Modal>

      <Modal show={showModalDelete} setShow={setShowModalDelete} title={"Eliminar Usuario"}>
        <p>Realmente esta seguro que quiere eliminar al usuario:<h2 className="Resaltado">{usuarioEliminar}</h2></p>
        <div className="Usuarios-Detalles buttons">
          <input
            type="submit"
            className="button Usuarios"
            value="Calcelar"
            onClick={() => setShowModalDelete(false)}
          />
          <input
            type="submit"
            className="button Usuarios delete"
            value="Confirmar"
            onClick={() => deleteUsuario()}
          />
        </div>
      </Modal>

      <Modal show={showModalModify} setShow={setShowModalModify} title={"Modificar Usuario"}>
        <form>
          <div className="form group modal Usuario">
            <input
              type="text"
              id="usuario-name"
              name="usuario-name"
              className="inputUsuarios"
              required
            />
            <span className="highlight Usuarios"></span>
            <span className="bottomBar Usuarios"></span>
            <label className="Usuarios">Nombre de Usuario</label>
          </div>

          <div className="form group modal Usuario">
            <select>
              <option value="Maestro">Maestro</option>
              <option value="Administrados">Administrados</option>
              <option value="Supervisor">Supervisor</option>
            </select>
            <span className="highlight Usuarios"></span>
            <span className="bottomBar Usuarios"></span>
            <label className="Usuarios">Tipo de Usuario</label>
            {/* <span className="highlight Usuario"></span>
            <span className="bottomBar Usuario"></span>
            <label>Tipo de Usuario</label>  */}
          </div>

          <div className="form group modal Usuario">
            <input
              type="text"
              id="usuario-nickname"
              name="usuario-nickname"
              className="inputUsuarios"
              required
            />
            <span className="highlight Usuarios"></span>
            <span className="bottomBar Usuarios"></span>
            <label className="Usuarios">Apodo de Usuario</label>
          </div>

          <div className="form group modal Usuario">
            <input
              type="email"
              id="usuario-email"
              name="usuario-email"
              pattern=".+@cdguzman.tecnm.com"
              title="Correo electronico Institucional del ITCG"
              className="inputUsuarios"
              required
            />
            <span className="highlight Usuarios"></span>
            <span className="bottomBar Usuarios"></span>
            <label className="Usuarios">Correo de Usuario</label>
          </div>

          <div className="form group modal Usuario">
            <input
              type="password"
              id="usuario-password"
              name="usuario-password"
              className="inputUsuarios"
              required
            />
            <span className="highlight Usuarios"></span>
            <span className="bottomBar Usuarios"></span>
            <label className="Usuarios">Contrasena de Usuario</label>
          </div>
        </form>

        <input
          type="submit"
          className="button Usuarios"
          value="Cerrar"
          onClick={() => setShowModalModify(false)}
        />

        <input
          type="submit"
          className="button Usuarios"
          value="Guardar"
          onClick={() => setShowModalConfirm(true)}
        />

      </Modal>

      <Modal show={showModalConfirm} setShow={setShowModalConfirm} title={"Modificar"}>
        <div className="modal group">
          <p>Realmente esta seguro que quiere actualizar los datos del usuario:<h2 className="Resaltado">{usuarioActualizar}</h2></p>
        </div>
        <input
          type="submit"
          className="button Usuarios"
          value="Cancelar"
          onClick={() => setShowModalConfirm(false)}
        />
        <input
          type="submit"
          className="button Usuarios delete"
          value="Confirmar"
          onClick={() => updateUser()}
        />
      </Modal>
    </div>
  );
}

export default Usuarios;