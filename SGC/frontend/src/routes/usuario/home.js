//TODO, si el mai se equivoca y tiene que modificar las materias
//Pedirle a la base de datos que me mande los datos que el selecciono y agregarlo a la tabla
import React, { useState, useEffect, useContext } from 'react'
import getAllCarrera from '../helpers/Carreras/getAllCarrera'
import getAllMaterias from '../helpers/Materias/getAllMaterias'
import postAsigna from '../helpers/Asignan/postAsignan.js'
import { AuthContext } from '../helpers/Auth/auth-context'
import Modal from '../modal/Modal'
import getInfoUser from '../helpers/Usuarios/getInfoUser'
export const Home2 = () => {
  let auth = useContext(AuthContext);
  const [infoUser, setInfoUser] = useState([]);
  const [disponible, setDisponible] = useState(true);
  const [carreras, setCarreras] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalDatosEnviados, setShowModalDatosEnviados] = useState(false);
  const [selectedData, setSelectedData] = useState({
    carrera_ID: '',
    materia_ID: '',
    grupo: '',
    semestre: '',
  });
  const [dataTable, setDataTable] = useState([]);


  /**
   * Hacer el llamado al los helper para obtener las carreras y materias
   * 
   */
  useEffect(() => {
    const obtenerMateria = async () => {
      await getAllMaterias(auth.user.token).then((data) => {
        setMaterias([{
          Carrera: "",
          ID_Materia: "",
          Nombre_Materia: ""
        }, ...data]);
      });
    };
    const obtenerCarrera = async () => {
      await getAllCarrera(auth.user.token).then((data) => {
        setCarreras([{
          ID_Carrera: "",
          Nombre_Carrera: ""
        }, ...data]);
      });
    }
    const getInforUser = async () => {
      await getInfoUser(auth.user.token).then((data) => {
        setInfoUser(data);
      }
      ).catch((err) => {
        console.log(err);
      }
      );
    }
    obtenerCarrera();
    obtenerMateria();
    getInforUser();
    return () => {
      setCarreras([]);
      setMaterias([]);
      setInfoUser([]);
    }
  }, []);

  /**
   * Metodo para obtener los datos que se selecciones de los inputs
   * @param {*} e 
   */
  const handleChange = (e) => {
    setSelectedData({
      ...selectedData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Metodo para obtener los datos que se selecciones de los inputs
   * y agregarlos a la tabla
   * @returns null
   */
  const agregarTabla = () => {
    let yaEsta = false;
    if (selectedData.carrera_ID === '' || selectedData.materia_ID === '' || selectedData.grupo === '' || selectedData.semestre === '') {
      setShowModalAlert(true);
      setMensajeAlerta('Todos los campos son obligatorios');
      return;
    }
    dataTable.map((data) => {
      if (data.carrera_ID === selectedData.carrera_ID && data.materia_ID === selectedData.materia_ID && data.grupo === selectedData.grupo && data.semestre === selectedData.semestre) {
        yaEsta = true;
        setShowModalAlert(true);
        setMensajeAlerta('Ya se a realizado esa seleccion de materias');
        return;
      }
    });
    if (!yaEsta) {
      setDataTable([...dataTable, selectedData]);
    }
  };
  /**
   * Metodo para hacer la confirmacion de los datos
   * No envia nada aunque se llame sendData
   */
  const sendData = () => {
    if (dataTable.length > 0) {
      setShowModalConfirm(true);
    }
    else {
      setShowModalAlert(true);
      setMensajeAlerta('No hay datos para enviar');
    }
  }
  /**
   * Metodo para enviar los datos a la base de datos
   */
  const mandarDatos = async () => {
    dataTable.map(async (data) => {
      await postAsigna(data, auth.user.token, infoUser.PK);
    });
    setShowModalDatosEnviados(true);
  }

  const todoListo = () => {
    setShowModalDatosEnviados(false);
    setDisponible(false);
  }


  return (
    <div className='usuario-container-parent'>
      <div className='usuario-container'>

        <h1>Bienvenido al Sistemas Gestor del Curso</h1>
        <p>Buenas las tenga {auth.user.nombre_usuario}</p>
        <p>Todo que puede no se cumplan</p>
        <ul>
          <li>
            Donde esta este txt poner por ejemplo, los reportes pendientes <br /> por subir de la semana o los que ya se retrasaron xd
          </li>
          <li>
            El div que esta abajo que se desaparesca una ya que termine de <br />seleccionar materias o que se le pase el tiempo
          </li>
        </ul>
      </div>
      {
        /* Div para la seleccion de materias */
        disponible === infoUser.Permiso ? (
          <>
            <div className='usuario-container'>
              <div className='usuario-grid'>
                <div className='usuario-grid__1'>
                  <div className='tabla-usr'>
                    <table>
                      <thead>
                        <tr>
                          <th>Carrera</th>
                          <th>Materia</th>
                          <th>Grupo</th>
                          <th>Semestre</th>
                          <th>Eliminar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataTable.map((data, index) => (
                          <tr key={index}>
                            <td>{data.carrera_ID}</td>
                            <td>{data.materia_ID}</td>
                            <td>{data.grupo}</td>
                            <td>{data.semestre}</td>
                            <td> <button onClick={() => {
                              setDataTable(dataTable.filter(data => dataTable[index] !== data))
                            }}>Eliminar</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button onClick={sendData}>Confirmar</button>
                </div>
                <div className='usuario-grid__2'>
                  <div className="form group modal Usuario usr">
                    <select name="carrera_ID" value={selectedData.carrera_ID} onChange={handleChange} className='usuarios-grid-Carrera'>
                      {Object.keys(carreras).length !== 0 ? (
                        carreras.map((carrera) => {
                          return (
                            <option key={carrera.ID_Carrera} value={carrera.ID_Carrera}>{carrera.Nombre_Carrera}</option>
                          )
                        }
                        )
                      ) : (
                        <></>
                      )}
                    </select>
                    <span className="highlight Usuarios-usr"></span>
                    <span className="bottomBar Usuarios-usr"></span>
                    <label className="Usuarios-usr">Carrera</label>
                  </div>

                  <div className="form group modal Usuario usr">
                    <select name='materia_ID' value={selectedData.materia_ID} onChange={handleChange} className='usuarios-grid-Materia'>
                      {Object.keys(materias).length !== 0 ? (
                        materias.map((materia) => {
                          return (
                            <option key={materia.ID_Materia} value={materia.ID_Materia}>{materia.Nombre_Materia}</option>
                          )
                        }
                        )
                      ) : (
                        <></>
                      )}
                    </select>
                    <span className="highlight Usuarios-usr"></span>
                    <span className="bottomBar Usuarios-usr"></span>
                    <label className="Usuarios-usr">Materia</label>
                  </div>

                  <div className="form group modal Usuario usr">
                    <select name='grupo' value={selectedData.grupo} onChange={handleChange} className='usuarios-grid-Grupo'>
                      <option value={""}></option>
                      <option value={"A"}>A</option>
                      <option value={"B"}>B</option>
                      <option value={"C"}>C</option>
                      <option value={"D"}>D</option>
                      <option value={"E"}>E</option>
                    </select>
                    <span className="highlight Usuarios-usr"></span>
                    <span className="bottomBar Usuarios-usr"></span>
                    <label className="Usuarios-usr">Grupo</label>
                  </div>

                  <div className="form group modal Usuario usr">
                    <select name='semestre' value={selectedData.semestre} onChange={handleChange} className='usuarios-grid-Opcion'>
                      <option value={""}></option>
                      <option value={"1"}>1</option>
                      <option value={"2"}>2</option>
                      <option value={"3"}>3</option>
                      <option value={"4"}>4</option>
                      <option value={"5"}>5</option>
                      <option value={"6"}>6</option>
                      <option value={"7"}>7</option>
                      <option value={"8"}>8</option>
                      <option value={"9"}>9</option>
                      <option value={"10"}>10</option>
                      <option value={"11"}>11</option>
                      <option value={"12"}>12</option>
                    </select>
                    <span className="highlight Usuarios-usr"></span>
                    <span className="bottomBar Usuarios-usr"></span>
                    <label className="Usuarios-usr">Semestre</label>
                  </div>
                  <button onClick={agregarTabla}>Agregar</button>
                </div>
              </div>
              <Modal show={showModalAlert} setShow={setShowModalAlert} title={"Advertencia"}>
                <p className='alertMSM'>{mensajeAlerta}</p>
                <button onClick={() => setShowModalAlert(false)}>Aceptar</button>
              </Modal>
              <Modal show={showModalConfirm} setShow={setShowModalConfirm} title={"Confirmación"}>
                <p className='alertMSM'>Estas seguro que quieres seleccionar estas materias</p>
                <div className='tabla-usr'>
                  <table>
                    <thead>
                      <tr>
                        <th>Carrera</th>
                        <th>Materia</th>
                        <th>Grupo</th>
                        <th>Semestre</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataTable.map((data, index) => (
                        <tr key={index}>
                          <td>{data.carrera_ID}</td>
                          <td>{data.materia_ID}</td>
                          <td>{data.grupo}</td>
                          <td>{data.semestre}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button onClick={mandarDatos}>Confirmar</button>
              </Modal>

              <Modal show={showModalDatosEnviados} setShow={setShowModalDatosEnviados} title={"Datos Enviados"}>
                <p className='alertMSM'>Materias resgistradas</p>
                <button onClick={todoListo}>Confirmar</button>
              </Modal>
            </div>
          </>) : (<></>)
      }
    </div>
  )
}

export default Home2;
