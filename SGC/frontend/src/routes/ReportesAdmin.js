import React, { useState } from "react";
import Modal from './modal/Modal.js'

const _ = require("lodash");



const ReportesAdmin = props => {

    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalDetails, setShowModalDetails] = useState(false);
    const [selector, setSelector] = useState("Modal-Reportes-Admin-Select-hidden")
    const [dataInput, setdataInput] = useState({
        Repostes_name: '',
    });
    const [regex, setRegex] = useState({
        Repostes_name: /^[a-zA-Z\s\d~._-]{0,200}$/,
    });


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
    return (
        <>
            <div className="containerUsuarios">
                <h1> Reportes Admin </h1>
                <table className="tabla Usuarios">
                    <tbody>
                        {_.times(8, (i) => (
                            <tr>
                                <td onClick={() => setShowModalDetails(true)}>
                                    Reporte {i + 1}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <input
                    type="submit"
                    value="Agregar"
                    onClick={() => setShowModalAdd(true)}></input>
                <div className="Reportes-Admin-mensajes">
                    <label className="Label-ReportesAdmin">Mensaje de correo:</label>
                    <br />
                    <br />
                    <textarea className="textareaModalReportesAdmin"></textarea>
                    <form className="form-reportesAdmin-modal">
                        <div className="Reportes-Admin-mensajes-radios">
                            <label className="Label-ReportesAdmin">Destinatario:</label>
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

                    <input
                        type="submit"
                        value="Enviar"
                        onClick={() => setShowModalAdd(true)}></input>
                </div>
            </div>


            <Modal show={showModalAdd} setShow={setShowModalAdd} title={"Agregar y Enviar Reporte"}>
                <div className="ModalReportes">
                    <form>
                        <div className="form group modal Materia">
                            <input
                                type="text"
                                id="Repostes_name"
                                name="Repostes_name"
                                className="inputMaterias-search"
                                onChange={handleInputOnChange}
                                value={dataInput.Repostes_name}
                                required
                            />
                            <span className="highlight Materias"></span>
                            <span className="bottomBar Materias-main"></span>
                            <label className="Materias-search">Nombre del reporte</label>
                        </div>
                    </form>
                    <label className="LabelModalReportesAdmin">Descripción: </label>
                    <br></br>
                    <textarea className="textareaModalReportesAdmin">

                    </textarea>
                    <form className="form-reportesAdmin-modal">
                        <div className="Modal-Reportes-Admin-grid">
                            <div className="Modal-Reportes-Admin-grid-item1">
                                <label className="LabelModalReportesAdmin">Fecha de entrega: </label>
                                <input
                                    className="Modal-Reportes-Admin-Date"
                                    type="date"
                                    name="fechaEntrega"
                                ></input>
                            </div>
                            <div className="Modal-Reportes-Admin-grid-item2">
                                <label className="LabelModalReportesAdmin separado">Obligatorio</label>
                                <input type="checkbox" name="opcional" />
                            </div>
                        </div>
                    </form>
                    <input type="submit" value={"Guardar"}></input>
                    <input type="submit" value={"Guardar y Enviar"}></input>
                </div>
            </Modal>

            <Modal show={showModalDetails} setShow={setShowModalDetails} title={"Nombre del reporte"}>
                <div className="ModalReportes">
                    <form>
                        <div className="form group modal Materia">
                            <input
                                type="text"
                                id="Repostes_name"
                                name="Repostes_name"
                                className="inputMaterias-search"
                                onChange={handleInputOnChange}
                                value={dataInput.Repostes_name}
                                required
                            />
                            <span className="highlight Materias"></span>
                            <span className="bottomBar Materias-main"></span>
                            <label className="Materias-search">Nombre del reporte</label>
                        </div>
                    </form>
                    <label className="LabelModalReportesAdmin-detalles">Descripción: </label>
                    <br></br>
                    <textarea className="textareaModalReportesAdmin"
                        value="Este es el mensaje que se envio en el reporte"
                    >
                    </textarea>
                    <form>
                        <div className="Modal-Reportes-Admin-grid">
                            <div className="Modal-Reportes-Admin-grid-item1">
                                <label className="LabelModalReportesAdmin">Fecha de entrega: </label>
                                <input
                                    className="Modal-Reportes-Admin-Date"
                                    type="date"
                                    name="fechaEntrega"
                                ></input>
                            </div>
                            <div className="Modal-Reportes-Admin-grid-item2">
                                <label className="LabelModalReportesAdmin separado">Obligatorio</label>
                                <input type="checkbox" name="opcional" />
                            </div>
                        </div>
                    </form>
                    <div className="Usuarios-Detalles buttons">
                        <input type="submit" value={"Guardar"}></input>
                        <input
                            type="submit"
                            value="Eliminar"
                            className="btn-eliminar-reportes-admin"
                        ></input>
                        <input type="submit" value={"Guardar y Enviar"}></input>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ReportesAdmin;