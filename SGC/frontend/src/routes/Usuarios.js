import React, { useState, useEffect, useContext } from "react";
import Modal from './modal/Modal.js'
import getAllUsuarios from "./helpers/Usuarios/getAllUsuarios.js";
import postUsuario from "./helpers/Usuarios/postUsuario.js"
import putUsuario from "./helpers/Usuarios/putUsuario.js";
import deleteUser from "./helpers/Usuarios/deleteUser.js";
import Loader from "./Loader.js";
import kanaBuscar from "../img/kana-buscar.png"

import { AuthContext } from "./helpers/Auth/auth-context.js";

const Usuarios = props => {
  let auth = useContext(AuthContext);

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [showModalModify, setShowModalModify] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [loading, setloading] = useState(false);
  const [showModalResultado, setShowModalResultado] = useState(false);
  const [statusContenido, setStatusContenido] = useState('');
  const [userActualizar, setUserActualizar] = useState('');
  const [userData, setUserData] = useState({});
  const [filtrados, setFiltrados] = useState({})
  const [actualizarUsuario, setActualizarUsuario] = useState(0);
  const [dataInput, setdataInput] = useState({
    PK: "",
    username: '',
    password: '',
    Nombre_Usuario: '',
    Tipo_Usuario: 'Docente',
    CorreoE: '',
  });
  const [regex, setRegex] = useState({
    PK: /\d+/,
    username: /^[a-zA-Z\d@~._-]{0,20}$/,
    password: /.{0,20}/,
    Nombre_Usuario: /^[A-Za-z\sÀ-ÿ]{0,100}$/,
    Tipo_Usuario: /.*/,
    CorreoE: /.*/,
  })
  //^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$
  //Regex para validar correos
  const [username, setUsername] = useState('');
  const [Nombre_Usuario, setNombre_Usuario] = useState('');
  const [Tipo_Usuario, setTipo_Usuario] = useState('');
  const [CorreoE, setCorreoE] = useState('');
  const [password, setPassword] = useState('')
  const [pk, setPk] = useState('');

  let usuarioEliminar = "Victor Rafael Valdivia Gomez"
  let usuarioActualizar = "Pedro Nicolas Rios Vargas"

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
  /**
   * Metodo para obtener los usuarios desde la base de datos
   */
  const obtenerUsuarios = async () => {
    await getAllUsuarios(auth.user.token).then((data) => {
      setUserData(data);
      setFiltrados(data)
    })
  }
  /**
   * useEffect para actualizar los datos generales
   */
  useEffect(() => {
    obtenerUsuarios();
  }, [actualizarUsuario]);

  /**
   * useEffect para mostrar mensaje de resultado al momento de agregar
   */
  useEffect(() => {
    if (userActualizar === "OK" || userActualizar === "Created") {
      setShowModalResultado(true);
      setStatusContenido("Se realizo la operacion con exito");
      setActualizarUsuario(Math.random())
    } else if (userActualizar !== '') {
      setShowModalResultado(true);
      setStatusContenido("Problemas al realizar la operacion, intente mas tarde")
      setActualizarUsuario(Math.random())
    }
    setloading(false);
  }, [userActualizar]);
  /**
   * Metodo para realizar un post de un usuario nuevo
   */
  const add = async () => {
    setloading(true);
    setUserActualizar(await postUsuario(dataInput, auth.user.token));
  }

  /**
   * Metodo para mostrar el formulario agregar
   */
  const abrirAgregar = () => {
    setdataInput({
      ...dataInput,
      CorreoE: '',
      Nombre_Usuario: '',
      PK: '',
      Tipo_Usuario: 'Docente',
      password: '',
      username: ''
    });
    setUserActualizar('');
    setShowModalAdd(true);
  }
  /**
   * Metodo para abrir el formulario de actualizar usuario
   */
  const modifyUser = () => {
    setdataInput({
      ...dataInput,
      CorreoE: CorreoE,
      Nombre_Usuario: Nombre_Usuario,
      Tipo_Usuario: Tipo_Usuario,
      username: username,
      password: "password"
    });
    setUserActualizar('');
    setShowModalModify(true);
  };
  /**
   * Metodo para llamar al helper putUsuario y asi modificar los datos de la base de datos
   */
  const modifyUserGuardar = async () => {
    setloading(true);
    //console.log(dataInput, pk)
    setUserActualizar(await putUsuario(dataInput, pk));
  };
  /**
   * Metodo para eliminar un usuario de la base de datos
   */
  const deleteUserConfirm = async () => {
    setloading(true);
    setUserActualizar(await deleteUser(pk, auth.user.token));
  }
  /**
   *  Metodo para mostrar los detalles del usuario
   * @param {*} id id del usuario a buscar 
   */
  function detalles(id) {
    const user = userData.find(elemento => elemento.PK === id);
    setCorreoE(user.CorreoE);
    setNombre_Usuario(user.Nombre_Usuario);
    setTipo_Usuario(user.Tipo_Usuario);
    setUsername(user.ID_Usuario.username);
    setPassword(user.ID_Usuario.password);
    setPk(user.PK);
    setShowModalDetails(true);
    setdataInput({
      ...dataInput,
      CorreoE: user.CorreoE,
      Nombre_Usuario: user.Nombre_Usuario,
      Tipo_Usuario: user.Tipo_Usuario,
      username: user.ID_Usuario.username,
      password: "password" //No se si poner la contra xd
    });
    setUserActualizar('');

  }
  /**
 * Metodo para cerra todas los modales 
 */
  const closeAll = () => {
    setUserActualizar('');
    setShowModalAdd(false);
    setShowModalResultado(false);
    setShowModalDelete(false);
    setShowModalConfirm(false);
    setShowModalDetails(false);
    setShowModalModify(false);
  }
  /**
   * Metodo para buscar en la tabla elementos
   * @param {*} event 
   */
  const buscador = (event) => {
    var filtrados = userData.map((user) => {
      if (user.Nombre_Usuario.toLowerCase().includes(event.target.value.toLowerCase())) {
        return user;
      }
    })
    filtrados = filtrados.filter((elemento) => {
      return elemento !== undefined
    })
    setFiltrados(filtrados)
  }
  return (
    <>
      {loading === false ? (
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
                onChange={buscador}
              />
              <span className="highlight Usuarios"></span>
              <span className="bottomBar Usuarios-main"></span>
              <label className="Usuarios-search">Nombre de Usuario</label>
            </div>
          </form>

          <div className="tabla">
            {Object.keys(filtrados).length !== 0 ? (
              <table>
                <tbody>
                  {filtrados.map((user) => {
                    return (
                      <tr key={user.PK}>
                        <td onClick={() => detalles(user.PK)}>
                          {user.Nombre_Usuario}
                        </td>
                      </tr>
                    );
                  }
                  )}
                </tbody>
              </table>
            ) : (
              <>
                <div className="Sin_Resultados">
                  <p>No se encontraron resultados</p>
                </div>
                <div className="Sin_Resultados img">
                  <img src={kanaBuscar} className="kana" alt="Sin resultados" />
                </div>
              </>
            )}
          </div>

          <input
            type="submit"
            className="button Usuarios"
            value="Agregar"
            onClick={abrirAgregar}
          ></input>
          {/* Modal detalles */}
          <Modal show={showModalDetails} setShow={setShowModalDetails} title={Nombre_Usuario}>
            <form>
              <div className="form group modal Usuario">
                <input
                  type="text"
                  id="usuario-name"
                  name="Nombre_Usuario"
                  className="inputUsuarios"
                  value={dataInput.Nombre_Usuario}
                  onChange={handleInputOnChange}
                  required
                />
                <span className="highlight Usuarios"></span>
                <span className="bottomBar Usuarios"></span>
                <label className="Usuarios">Nombre de Usuario</label>
              </div>

              <div className="form group modal Usuario">
                <select name="Tipo_Usuario" onChange={handleInputOnChange} value={dataInput.Tipo_Usuario}>
                  <option value="Administrador">Administrador</option>
                  <option value="Docente" >Docente</option>
                  <option value="Espectador">Espectador</option>
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
                  name="username"
                  value={dataInput.username}
                  onChange={handleInputOnChange}
                  className="inputUsuarios"
                  required
                />
                <span className="highlight Usuarios"></span>
                <span className="bottomBar Usuarios"></span>
                <label className="Usuarios">Apodo de Usuario</label>
              </div>

              <div className="form group modal Usuario">
                <input
                  type="text"
                  id="usuario-email"
                  name="CorreoE"
                  title="Correo electronico Institucional del ITCG"
                  className="inputUsuarios"
                  value={dataInput.CorreoE}
                  onChange={handleInputOnChange}
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
                  name="password"
                  onChange={handleInputOnChange}
                  value={dataInput.password}
                  className="inputUsuarios"
                  required
                />
                <span className="highlight Usuarios"></span>
                <span className="bottomBar Usuarios"></span>
                <label className="Usuarios">Contrasena de Usuario</label>
              </div>
              <div className="form group modal Usuario">
                <label className="Usuarios-Detalles">Seleccion de Materias</label>
                <input type={"checkbox"} className="Usuarios-Detalles checkbox" />
              </div>
            </form>
            <div className="tabla">
              <table>
                <thead>
                  <tr>
                    <th>Materias</th>
                    <th>Semestre</th>
                    <th>Grupo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Matematicas</td>
                    <td>1</td>
                    <td>A</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="Usuarios-Detalles buttons">
              <input
                type="submit"
                className="button Usuarios"
                value="Modificar"
                onClick={() => setShowModalConfirm(true)}
              />
              <input
                type="submit"
                className="button Usuarios delete"
                value="Eliminar"
                onClick={() => setShowModalDelete(true)}
              />
            </div>
          </Modal>
          {/** Modal add */}
          <Modal show={showModalAdd} setShow={setShowModalAdd} title={"Agregar Usuario"}>
            <form>
              <div className="form group modal Usuario">
                <input
                  type="text"
                  id="usuario-name"
                  name="Nombre_Usuario"
                  onChange={handleInputOnChange}
                  value={dataInput.Nombre_Usuario}
                  className="inputUsuarios"
                  required
                />
                <span className="highlight Usuarios"></span>
                <span className="bottomBar Usuarios"></span>
                <label className="Usuarios">Nombre de Usuario</label>
              </div>

              <div className="form group modal Usuario">
                <select name="Tipo_Usuario" onChange={handleInputOnChange} value={dataInput.Tipo_Usuario}>
                  <option value="Administrador">Administrador</option>
                  <option value="Docente" >Docente</option>
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
                  name="username"
                  onChange={handleInputOnChange}
                  value={dataInput.username}
                  className="inputUsuarios"
                  required
                />
                <span className="highlight Usuarios"></span>
                <span className="bottomBar Usuarios"></span>
                <label className="Usuarios">Apodo de Usuario</label>
              </div>

              <div className="form group modal Usuario">
                <input
                  type="text"
                  id="usuario-email"
                  name="CorreoE"
                  onChange={handleInputOnChange}
                  value={dataInput.CorreoE}
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
                  name="password"
                  onChange={handleInputOnChange}
                  value={dataInput.password}
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
              onClick={add}
            />

          </Modal>
          {/**Modal Delete */}
          <Modal show={showModalDelete} setShow={setShowModalDelete} title={"Eliminar Usuario"}>
            <p>Realmente esta seguro que quiere eliminar al usuario: <strong className="Resaltado">{Nombre_Usuario}</strong></p>
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
                onClick={deleteUserConfirm}
              />
            </div>
          </Modal>
          {/**Modal Confirm */}
          <Modal show={showModalConfirm} setShow={setShowModalConfirm} title={"Modificar"}>
            <div className="modal group">
              <p>Realmente esta seguro que quiere actualizar los datos del usuario:</p>
              <br />
              <div className="Usuarios-Detalles summary">
                {Nombre_Usuario === dataInput.Nombre_Usuario ? null : <p>Nombre del Usuario pasara de: <strong className="Resaltado">{Nombre_Usuario}</strong> a <strong className="Resaltado">{dataInput.Nombre_Usuario}</strong></p>}
                {Tipo_Usuario === dataInput.Tipo_Usuario ? null : <p>Tipo de Usuario pasara de: <strong className="Resaltado">{Tipo_Usuario}</strong> a <strong className="Resaltado">{dataInput.Tipo_Usuario}</strong></p>}
                {username === dataInput.username ? null : <p>Apodo del Usuario pasara de: <strong className="Resaltado">{username}</strong> a <strong className="Resaltado">{dataInput.username}</strong></p>}
                {CorreoE === dataInput.CorreoE ? null : <p>Correo del Usuario pasara de: <strong className="Resaltado">{CorreoE}</strong> a <strong className="Resaltado">{dataInput.CorreoE}</strong></p>}
                {password === dataInput.password ? null : <p>Contrasena del Usuario pasara de: <strong className="Resaltado">{password}</strong> a <strong className="Resaltado">{dataInput.password}</strong></p>}
              </div>
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
              onClick={modifyUserGuardar}
            />
          </Modal>
          {/* Resultado de agregar */}
          <Modal show={showModalResultado} setShow={setShowModalResultado} title={userActualizar}>
            <div className="modal group">
              <p><strong>{statusContenido}</strong></p>
            </div>
            <input
              type="submit"
              className="button Materias"
              onClick={closeAll}
              value="OK"
            />
          </Modal>
        </div>
      ) : (<Loader />)}
    </>
  );
}
export default Usuarios;