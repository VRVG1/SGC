import React, { useEffect, useState, useContext, useCallback } from "react";
import Modal from './modal/Modal.js'
import getAllReportes from './helpers/Reportes/getAllReportes.js'
import getAllUsuarios from "./helpers/Usuarios/getAllUsuarios.js";
import getAsignanAllUser from "./helpers/Asignan/getAsignanAllUser.js";
import getGeneran from "./helpers/Generan/getGeneran.js";
import { AuthContext } from './helpers/Auth/auth-context.js';


import kanaBuscar from "../img/kana-buscar.png"
import Loader from "./Loader.js";
const _ = require("lodash");

const ReportesCheck = props => {
    let auth = useContext(AuthContext);

    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalDetails, setShowModalDetails] = useState(false);
    const [selector, setSelector] = useState("Modal-Reportes-Admin-Select-hidden")
    const [hidden, setHidden] = useState({
        hidden1: "form group reportes-check",
        hidden2: "form group reportes-check hidden",
        hidden3: "form group reportes-check hidden",
        hidden4: "form group reportes-check hidden",
        hidden5: "form group reportes-check hidden",
    });
    const [oculto, setOculto] = useState({
        hidden1: "",
        hidden2: " hidden",
        hidden3: " hidden",
        hidden4: " hidden",
        hidden5: " hidden",
    });

    const [loading, setLoading] = useState(true);//useState para el loader
    const [reportes, setReportes] = useState([]);
    const [maestros, setMaestros] = useState([]);
    const [asignan, setAsignan] = useState([]);
    const [generan, setGeneran] = useState([]);

    /**
     * Metodo para obtener los generan de un reporte
     */
    const getGenerann = useCallback(async () => {
        await getGeneran(auth.user.token).then(res => {
            setGeneran(res);
        }).catch(err => {
            console.log(err);
        });
    }, []);
    /**
     * Metodo para obtener todos los asignan
     */
    const getAsignan = useCallback(async () => {
        await getAsignanAllUser(auth.user.token).then(res => {
            setAsignan(res);
        }).catch(err => {
            console.log(err);
        });
    }, []);
    /**
     * Metodo para obtener todos los usuarios
     */

    const getMaestros = useCallback(async () => {
        getAllUsuarios(auth.user.token).then(res => {
            setMaestros(res);
        }).catch(err => {
            console.log(err);
        });
    },
        [],
    );
    /**
    * Metodo para obtener todos los reportes de la base de datos
    */
    const getReportes = useCallback(async () => {
        await getAllReportes(auth.user.token).then(res => {
            setReportes(res);
        }).catch(err => {
            console.log(err);
        }, []);
    });

    /**
     * Hook para cargar todos los datos necesarios para la vista
     */
    useEffect(() => {
        getReportes();
        getMaestros();
        getAsignan();
        getGenerann();
        setLoading(false);
        return () => {
            setReportes([]);
            setMaestros([]);
            setAsignan([]);
            setGeneran([]);
        }
    }, []);


    /**
     * Metodo para ocultar los inputs de busqueda
     * @param {*} e 
     */
    const changeEstado = (e) => {
        console.log(e.target.checked)
        if (e.target.checked === true) {
            setHidden({
                ...hidden,
                [e.target.id]: "form group reportes-check",
            });
            setOculto({
                ...oculto,
                [e.target.id]: "",
            });
        } else {
            setHidden({
                ...hidden,
                [e.target.id]: "form group reportes-check hidden",
            });
            setOculto({
                ...oculto,
                [e.target.id]: " hidden",
            });
        }
    }

    return (
        <>
            {loading === false ? (
                <>
                    <div className="container-ReportesCheck">
                        <div className="ReportesCheck-search">
                            <h1> Reportes Check </h1>

                            <div className="search-button-dialog">
                                <div className="search-button-dialog__content">
                                    <p><input type="checkbox" defaultChecked="true" id="hidden1" name="rbtn-search" value="Maestro"
                                        onClick={changeEstado}
                                    />Maestro</p>

                                    <p><input type="checkbox" id="hidden2" name="rbtn-search" value="Carrera"
                                        onClick={changeEstado} />Carrera</p>

                                    <p><input type="checkbox" id="hidden3" name="rbtn-search" value="Grupo"
                                        onClick={changeEstado} />Grupo</p>

                                    <p><input type="checkbox" id="hidden4" name="rbtn-search" value="Materia"
                                        onClick={changeEstado} />Materia</p>
                                </div>
                            </div>
                            <form>
                                <div className={hidden.hidden1}>
                                    <input
                                        type="text"
                                        className={"input-report-check-search" + oculto.hidden1}
                                        required
                                    />
                                    <span className={"highlight reportes-check" + oculto.hidden1}></span>
                                    <span className={"bottomBar reportes-check" + oculto.hidden1}></span>
                                    <label className={"reportes-check" + oculto.hidden1}>Nombre del Maestro</label>
                                </div>
                                <div className={hidden.hidden2}>
                                    <input
                                        type="text"
                                        className={"input-report-check-search" + oculto.hidden2}
                                        required
                                    />
                                    <span className={"highlight reportes-check" + oculto.hidden2}></span>
                                    <span className={"bottomBar reportes-check" + oculto.hidden2}></span>
                                    <label className={"reportes-check" + oculto.hidden2}>Nombre de la Carrera</label>
                                </div>
                                <div className={hidden.hidden3}>
                                    <input
                                        type="text"
                                        className={"input-report-check-search" + oculto.hidden3}
                                        required
                                    />
                                    <span className={"highlight reportes-check" + oculto.hidden3}></span>
                                    <span className={"bottomBar reportes-check" + oculto.hidden3}></span>
                                    <label className={"reportes-check" + oculto.hidden3}>Grupo</label>
                                </div>
                                <div className={hidden.hidden4}>
                                    <input
                                        type="text"
                                        className={"input-report-check-search" + oculto.hidden4}
                                        required
                                    />
                                    <span className={"highlight reportes-check" + oculto.hidden4}></span>
                                    <span className={"bottomBar reportes-check" + oculto.hidden4}></span>
                                    <label className={"reportes-check" + oculto.hidden4}>Nombre de la Materia</label>
                                </div>

                            </form>

                        </div>

                        <div className="contenedorRerportes">
                            {Object.keys(reportes).length !== 0 && Object.keys(generan).length !== 0 ?
                                (<>
                                    {console.log(generan)}
                                    {reportes.map((reporte, index) => {
                                        return (
                                            <div className="contenedorMasterReporte">
                                                <h2 className="Reportes-Check">{reporte.Nombre_Reporte}</h2>
                                                <div className="contenedorMaterReporteTable">
                                                    {maestros.map((maestro, index2) => {
                                                        if (maestro.Tipo_Usuario === "Docente") {
                                                            return (
                                                                <div>
                                                                    <h3 className="Reportes-Check">{maestro.Nombre_Usuario}</h3>
                                                                    <table className="table-ReportesCheck">
                                                                        <thead>
                                                                            <tr key={index2}>
                                                                                <th>Materias</th>
                                                                                <th>Grupo</th>
                                                                                <th>Estado</th>
                                                                                <th>Archivos</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="tbody-ReportesCheck">
                                                                            {asignan.map((asignan, index) => {
                                                                                let estado = generan.filter(generan => generan.ID_Reporte === reporte.ID_Reporte).filter(segundoFiltro => segundoFiltro.ID_Asignan === asignan.ID_Asignan)[0].Estatus;
                                                                                if (estado === null) {
                                                                                    estado = "No entregado"
                                                                                }
                                                                                if (asignan.ID_Usuario === maestro.PK) {
                                                                                    return (
                                                                                        <tr key={index}>
                                                                                            <td>{asignan.ID_Materia}</td>
                                                                                            <td>{asignan.Grupo}</td>
                                                                                            <td>{estado}</td>
                                                                                            <td>
                                                                                                <ul>
                                                                                                    {_.times(5, (index) => {
                                                                                                        return (
                                                                                                            <li>
                                                                                                                {"Archivo " + index}
                                                                                                            </li>
                                                                                                        )
                                                                                                    })}
                                                                                                </ul>
                                                                                            </td>
                                                                                        </tr>
                                                                                    )
                                                                                }
                                                                            }
                                                                            )}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>)
                                :
                                (<>
                                    <div className="Sin_Resultados">
                                        <p>No hay reportes creados</p>
                                    </div>
                                    <div className="Sin_Resultados img">
                                        <img src={kanaBuscar} className="kana" alt="Sin resultados" />
                                    </div>
                                </>)}

                        </div>
                    </div>


                    <Modal show={showModalAdd} setShow={setShowModalAdd} title={"Agregar y Enviar Reporte"}>
                        <div className="ModalReportes">
                            <label className="LabelModalReportesCheck">Mensaje: </label>
                            <br></br>
                            <textarea className="textareaModalReportesCheck">

                            </textarea>
                            <form>
                                <div className="Modal-Reportes-Admin-Radios">
                                    <input
                                        className="Modal-Reportes-Admin-Date"
                                        type="date"
                                        name="fechaEntrega"
                                    ></input>

                                    <p className="Modal-Reportes-Admin-p"><input
                                        type="radio"
                                        name="opc"
                                        value={"Especifico"}
                                        onClick={() => setSelector("Modal-Reportes-Admin-Select")}></input>Especifico</p>
                                    <p><input
                                        type="radio"
                                        name="opc"
                                        value={"General"}
                                        onClick={() => setSelector("Modal-Reportes-Admin-Select-hidden")}></input>General</p>
                                </div>
                                <select className={selector}>
                                    {_.times(8, (i) => (
                                        <option value={i}>Opcion {i}</option>
                                    ))}

                                </select>
                            </form>
                            <input type="submit" value={"Guardar/Enviar"}></input>
                        </div>
                    </Modal>

                    <Modal show={showModalDetails} setShow={setShowModalDetails} title={"Nombre del reporte"}>
                        <div className="ModalReportes">
                            <label className="LabelModalReportesCheck">Mensaje: </label>
                            <br></br>
                            <textarea className="textareaModalReportesCheck"
                                value="Este es el mensaje que se envio en el reporte"
                            >
                            </textarea>
                            <form>
                                <div className="Modal-Reportes-Admin-Radios">
                                    <input
                                        className="Modal-Reportes-Admin-Date"
                                        type="date"
                                        name="fechaEntrega"
                                    ></input>
                                </div>
                                <select className={selector}>
                                    {_.times(8, (i) => (
                                        <option value={i}>Opcion {i}</option>
                                    ))}

                                </select>
                            </form>
                            <div className="Usuarios-Detalles buttons">
                                <input
                                    type="submit"
                                    value={"Cerrar"}
                                    className="button Usuarios"></input>
                                <input
                                    type="submit"
                                    value="Eliminar"
                                    className="button Usuarios delete"></input>
                            </div>
                        </div>
                    </Modal>

                </>
            ) : (
                <>
                    <Loader />
                </>
            )}
        </>
    )
}

export default ReportesCheck;