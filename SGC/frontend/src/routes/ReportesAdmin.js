import React, { useState, useEffect, useContext } from "react";
import getAllUsuarios from "./helpers/Usuarios/getAllUsuarios.js";
import Modal from './modal/Modal.js'

import { AuthContext } from "./helpers/Auth/auth-context.js";

const _ = require("lodash");



const ReportesAdmin = props => {

    let auth = useContext(AuthContext);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalDetails, setShowModalDetails] = useState(false);
    const [selector, setSelector] = useState("Modal-Reportes-Admin-Select-hidden")
    const [dataInput, setdataInput] = useState({
        Repostes_name: '',
        Repostes_descripcion: '',
        Repostes_fecha: '',
        Repostes_obligatorio: true,
        opc: "General",
        nombreMasters: "",
    });
    const [tablaData, setTablaData] = useState([]);
    const [predictionData, setPredictionData] = useState([]);
    const [predictionData2, setPredictionData2] = useState([]);
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
        if (event.target.name === "Repostes_obligatorio") {
            setdataInput({
                ...dataInput,
                [event.target.name]: event.target.checked
            });
        }
    }
    /**
     * Recibir los datos de los usuarion de la base de datos
     */
    useEffect(() => {
        const obtenerUsuarios = async () => {
            await getAllUsuarios(auth.user.token).then((data) => {
                //setPredictionData(data);
                data.map((item) => {
                    if (item.Tipo_Usuario === "Docente") {
                        // setPredictionData(predictionData => [...predictionData, {
                        //     PK: item.PK,
                        //     Tipo_Usuario: item.Tipo_Usuario,
                        //     Nombre_Usuario: item.Nombre_Usuario,
                        // }])
                        setPredictionData2(predictionData2 => [...predictionData2, {
                            PK: item.PK,
                            Tipo_Usuario: item.Tipo_Usuario,
                            Nombre_Usuario: item.Nombre_Usuario,
                        }])
                    }
                }
                )
            });
        }
        obtenerUsuarios();
        return () => {
            setTablaData([]);
            setPredictionData([]);
        }
    }, []);

    /**
     * Recibe los datos escritos en un input
     * 
     */
    const agregarReporte = () => {
        setdataInput({
            ...dataInput,
            Repostes_name: "",
            Repostes_descripcion: '',
            Repostes_fecha: '',
            Repostes_obligatorio: true
        });
        setShowModalAdd(true)
    }

    const buscador = (event) => {
        const { value } = event.target;
        const filtro = _.filter(predictionData2, (item) => {
            return item.Nombre_Usuario.toLowerCase().includes(value.toLowerCase());
        }
        );
        setPredictionData(filtro);
    }


    return (
        <>
            <div className="containerReportes">
                <h1> Reportes Admin </h1>
                <table className="tabla Usuarios-rep">
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

                <button onClick={agregarReporte}>Agregar</button>
                <div className="Reportes-Admin-mensajes">
                    <label className="Label-ReportesAdmin">Mensaje de correo:</label>
                    <textarea className="textareaModalReportesAdmin"></textarea>
                    <form className="form-reportesAdmin-modal">
                        <div className="Reportes-Admin-mensajes-radios">
                            <label className="Label-ReportesAdmin">Destinatario:</label>
                            <p className="Modal-Reportes-Admin-p"><input
                                type="radio"
                                name="opc"
                                value={"Especifico"}
                                onChange={handleInputOnChange}
                                checked={dataInput.opc === "Especifico"}
                                onClick={() => setSelector("Modal-Reportes-Admin-Select")}></input>Especifico</p>
                            <p><input
                                type="radio"
                                name="opc"
                                value={"General"}
                                onChange={handleInputOnChange}
                                checked={dataInput.opc === "General"}
                                onClick={() => setSelector("Modal-Reportes-Admin-Select-hidden")}></input>General</p>
                        </div>
                    </form>
                    <div className={selector}>
                        <label className="Label-ReportesAdmin">Usuarios:</label>
                        <div className="seleccionMasters">
                            <div className="tabla">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Opcion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tablaData.map((data, i) => (
                                            <tr key={data.id}>
                                                <td>{data.nombre}</td>
                                                <td>
                                                    <button
                                                        name="usuarios"
                                                        onClick={() => {
                                                            setTablaData(tablaData.filter(item => item.id !== data.id))
                                                            setPredictionData(predictionData => [...predictionData, {
                                                                PK: data.id,
                                                                Tipo_Usuario: "Docente",
                                                                Nombre_Usuario: data.nombre,
                                                            }])
                                                            setPredictionData2(predictionData2 => [...predictionData2, {
                                                                PK: data.id,
                                                                Tipo_Usuario: "Docente",
                                                                Nombre_Usuario: data.nombre,
                                                            }])
                                                        }}
                                                    >Eliminar</button>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                            <form>
                                <div className="form group modal Materia">
                                    <input
                                        type="text"
                                        id="nombreMasters"
                                        name="nombreMasters"
                                        className="inputMaterias-search"
                                        onChange={buscador}
                                        //value={dataInput.nombreMasters}
                                        required
                                    />
                                    <ul className="prediction">
                                        {Object.keys(predictionData).length !== 0 ? predictionData.map((data, i) => (
                                            <li key={i}
                                            onClick={() => {
                                                setTablaData(tablaData => [...tablaData, { id: data.PK, nombre: data.Nombre_Usuario }])
                                                setdataInput({
                                                    ...dataInput,
                                                    Repostes_name: ""
                                                })
                                                setPredictionData(predictionData.filter(item => item.PK !== data.PK))
                                                setPredictionData2(predictionData2.filter(item => item.PK !== data.PK))
                                            }}>{data.Nombre_Usuario}</li>
                                        )) : <></>}
                                    </ul>
                                    <span className="highlight Materias"></span>
                                    <span className="bottomBar Materias-main"></span>
                                    <label className="Materias-search">Nombre del reporte</label>
                                </div>
                            </form>
                        </div>
                    </div>
                    <button onClick={() => { alert("Mensaje Enviado") }}>Enviar</button>
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
                    <textarea
                        name="Repostes_descripcion"
                        className="textareaModalReportesAdmin"
                        value={dataInput.Repostes_descripcion}
                        onChange={handleInputOnChange}>
                    </textarea>
                    <form className="form-reportesAdmin-modal">
                        <div className="Modal-Reportes-Admin-grid">
                            <div className="Modal-Reportes-Admin-grid-item1">
                                <label className="LabelModalReportesAdmin">Fecha de entrega: </label>
                                <input
                                    className="Modal-Reportes-Admin-Date"
                                    type="date"
                                    name="Repostes_fecha"
                                    value={dataInput.Repostes_fecha}
                                    onChange={handleInputOnChange}
                                ></input>
                            </div>
                            <div className="Modal-Reportes-Admin-grid-item2">
                                <label className="LabelModalReportesAdmin separado">Obligatorio</label>
                                <input
                                    type="checkbox"
                                    name="Repostes_obligatorio"
                                    onChange={handleInputOnChange}
                                    checked={dataInput.Repostes_obligatorio} />
                            </div>
                        </div>
                    </form>
                    <div className="sinIdeas">
                        <button >Guardar</button>
                        <button >Guardar y Enviar</button>
                    </div>
                </div>
            </Modal>

            <Modal show={showModalDetails} setShow={setShowModalDetails} title={"Nombre del reporte"}>
                {/* Crear un gird de 4 columnas y 3 filas */}
                <div className="ModalReportes-grid">
                    <div className="container-rep-admin">
                        <div className="inputs-rep-admin">
                            <form>
                                <div className="form group modal Materia">
                                    <input
                                        type="text"
                                        id="Repostes_name"
                                        name="Repostes_name"
                                        className="inputModalReportesAdmin"
                                        onChange={handleInputOnChange}
                                        value={dataInput.Repostes_name}
                                        required
                                    />
                                    <span className="highlightReportesAdmin"></span>
                                    <span className="bottomBarReportesAdmin"></span>
                                    <label className="ReportesAdmin">Nombre del reporte</label>
                                </div>
                            </form>
                        </div>
                        <div className="TextArea-rep-admin">
                            <label className="labelDescripcion">Descripción: </label>
                            <textarea className="textareaModalReportesAdmin-details">
                            </textarea>
                        </div>
                        <div className="OtrosInputs-rep-admin">
                            <form>
                                <div className="modalL">
                                    <label className="LabelModalReportesAdmin">Fecha de entrega: </label>
                                    <input
                                        className="Modal-Reportes-Admin-Date"
                                        type="date"
                                        name="fechaEntrega"
                                    ></input>
                                </div>
                                <div className="modalR">
                                    <label className="LabelModalReportesAdmin separado">Obligatorio</label>
                                    <input type="checkbox" name="opcional" className="checkboxDetails" />
                                </div>
                            </form>
                        </div>
                        <div className="botones-rep-admin">
                            <button className="Eliminar" >Eliminar</button>
                            <button>Guardar</button>
                            <button >Guardar y Enviar</button>
                        </div>
                    </div>



                    <div className="Usuarios-Detalles buttons">
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ReportesAdmin;