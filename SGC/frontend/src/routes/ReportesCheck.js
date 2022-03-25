import React, { useState } from "react";
import Modal from './modal/Modal.js'

const _ = require("lodash");



const ReportesCheck = props => {

    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalDetails, setShowModalDetails] = useState(false);
    const [selector, setSelector] = useState("Modal-Reportes-Admin-Select-hidden")

    return (
        <>
            <div className="container-ReportesCheck">
                <div className="ReportesCheck-search">
                    <h1> Reportes Check </h1>
                    <form>
                        <div className="form group reportes-check">
                            <input
                                type="text"
                                className="input-report-check-search"
                                required
                            />
                            <span className="highlight reportes-check"></span>
                            <span className="bottomBar reportes-check"></span>
                            <label className="reportes-check">Nombre de Materia</label>
                        </div>
                        <div className="search-button-dialog">
                            <div className="search-button-dialog__content">
                                <p><input type="radio" name="rbtn-search" value="Maestro" />Maestro</p>
                                <p><input type="radio" name="rbtn-search" value="Carrera" />Carrera</p>
                                <p><input type="radio" name="rbtn-search" value="Grupo" />Grupo</p>
                                <p><input type="radio" name="rbtn-search" value="Materia" />Materia</p>
                            </div>
                        </div>
                    </form>

                </div>

                <div className="contenedorRerportes">

                    {_.times(20, (i) => (
                        <div className="contenedorMasterReporte">
                            <h2 className="Reportes-Check">Reporte {i}</h2>

                            <div className="contenedorMaterReporteTable">
                                {_.times(5, (j) => (
                                    <>
                                        <h3 className="Reportes-Check">Profesor {j}</h3>
                                        <table className="table-ReportesCheck">
                                            <thead>
                                                <tr>
                                                    <th>Materia</th>
                                                    <th>Grupo</th>
                                                    <th>Estado</th>
                                                    <th>Archivo</th>
                                                </tr>
                                            </thead>
                                            <tbody className="tbody-ReportesCheck">
                                                {_.times(5, (c) => (
                                                    <tr>
                                                        <td>Materia {c}</td>
                                                        <td>Grupo {c}</td>{/*Futuros pedo seguros */}
                                                        <td>Estado {c}</td>
                                                        <td>Archivos {c}</td> {/*Creo que es mejor descargar todos en un zip */}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                                ))}
                            </div>
                        </div>
                    ))}
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

                            {/* <p className="Modal-Reportes-Admin-p"><input
                                type="radio"
                                name="opc"
                                value={"Especifico"}
                                onClick={() => setSelector("Modal-Reportes-Admin-Select")}></input>Especifico</p>
                            <p><input
                                type="radio"
                                name="opc"
                                value={"General"}
                                onClick={() => setSelector("Modal-Reportes-Admin-Select-hidden")}></input>General</p> */}
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
    )
}

export default ReportesCheck;