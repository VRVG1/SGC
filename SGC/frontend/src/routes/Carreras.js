import React, { useState, useEffect } from "react";
import Modal from './modal/Modal.js'
import getAllCarrera from "./helpers/Carreras/getAllCarrera.js";
import postCarrera from "./helpers/Carreras/postCarrera.js";
import deleteCarrera from "./helpers/Carreras/deleteCarrera.js";
import putCarrera from "./helpers/Carreras/putCarrera.js";
import Loader from "./Loader.js";

const Materias = props => {
    /**
     * A continuacion se muestran los useState utilizados en este compoennte de react
     */
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalDetails, setShowModalDetails] = useState(false);
    const [showModalModify, setShowModalModify] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalResultado, setShowModalResultado] = useState(false);
    const [carreraData, setCareraData] = useState({});
    const [filtrados, setFiltrados] = useState({})
    const [carrera, setCarrera] = useState({});
    const [nombre_Carrera, setNombre_Carrera] = useState("");
    const [ID_Carrera, setID_Carrera] = useState("")
    const [actualizar, setActualizar] = useState(0);
    const [datainput, setDataInput] = useState({
        carrera_nombre: '',
        id_carrera: ''
    });

    const [regex, setRegex] = useState({
        carrera_nombre: /^[A-Za-z\sÀ-ÿ]{0,80}$/,
        id_carrera: /^[A-Z]{0,3}-{0,1}[0-9]{0,4}$/
    });
    const [statusContenido, setStatusContenido] = useState("");
    const [resultado, setResultado] = useState("");
    const [borrado, setBorrado] = useState("");
    const [putCarreras, setPutCarreras] = useState("");
    const [loading, setLoading] = useState(false);

    /**
     * Metodo para obtener todos los datos de la 
     * carrera desde la base de datos
     */
    const obtenerCarrera = () => {
        getAllCarrera().then((data) => {
            setCareraData(data);
            setFiltrados(data)
        })
    }
    /**
     * Recibe los datos escritos en un input
     * @param {*} event 
     */
    const handleInputOnChange = (event) => {
        //console.log(event.target.value.match(regex[event.target.name]))
        if (event.target.value.match(regex[event.target.name]) != null) {
            setDataInput({
                ...datainput,
                [event.target.name]: event.target.value
            });
        }
    }

    /**
     * useEffect hook para cargar los datos obtenidos
     */
    useEffect(() => {
        obtenerCarrera();
    }, [actualizar]);
    /**
     * useEffect para el almacenamiento de datos
     */
    useEffect(() => {
        if (resultado === "OK") {
            setStatusContenido("Los datos se almacenaron correctamente");
            setShowModalResultado(true);
            setActualizar(Math.random());
        } else if (resultado !== '') {
            setStatusContenido("Error al almacenar los datos, intente mas tarde");
            setShowModalResultado(true);
            setActualizar(Math.random());
        }
        setLoading(false);
    }, [resultado]);

    /**
     * useEffect para mostrar mensaje de resultado al momento de borra
     */
    useEffect(() => {
        if (borrado === "OK") {
            setStatusContenido("Eliminacion exitosa");
            setShowModalResultado(true);
            setActualizar(Math.random());
        } else if (borrado !== '') {
            setStatusContenido("Error al aliminar los datos, intente mas tarde");
            setShowModalResultado(true);
            setActualizar(Math.random());
        }

        setLoading(false);
    }, [borrado]);
    /**
     * useEffect para mostrar mensaje de resultado al momento de actualizar
     */
    useEffect(() => {
        if (putCarreras === "OK") {
            setStatusContenido("Los datos se actualizaron correctamente");
            setShowModalResultado(true);
            setActualizar(Math.random());
        } else if (putCarreras !== '') {
            setStatusContenido("Error al actualizar los datos, intente mas tarde");
            setShowModalResultado(true);
            setActualizar(Math.random());
        }
        setLoading(false);
    }, [putCarreras]);

    /**
     * Metodo para mostar el modal actualizar
     */
    const updateCarrera = () => {
        setDataInput({
            ...datainput,
            carrera_nombre: carrera.Nombre_Carrera,
            id_carrera: carrera.ID_Carrera,
        });
        setPutCarreras('');
        setShowModalModify(true);
    }
    /**
     * Metodo para mostrar el detalle de una materia asi como sus opciones
     * @param {Object} carrera
     */
    function detalles(carrera) {
        setCarrera(carrera);
        //const carrera = carreraData.find(element => element.ID_Carrera === id);
        setNombre_Carrera(carrera.Nombre_Carrera);
        setID_Carrera(carrera.ID_Carrera);
        setShowModalDetails(true);
        setBorrado('');
    }
    /**
     * Metodo para desplegar el modal de agregar
     */
    const add = () => {
        setDataInput({
            ...datainput,
            carrera_nombre: '',
            id_carrera: ''
        });
        setResultado('');
        setShowModalAdd(true);
    }
    /**
     * Metodo para borrar carrera
     */
    const borrarCarrera = async () => {
        setLoading(true);
        setBorrado(await deleteCarrera(carrera.ID_Carrera));
    };

    /**
     * Metodo para realizar una peticion de guardado a la base de datos y desplegar el modal de resultado
     */
    const save = async () => {
        setLoading(true);
        setResultado(await postCarrera(datainput.carrera_nombre));
    }

    const put = async () => {
        setLoading(true);
        setPutCarreras(await putCarrera(datainput.carrera_nombre, carrera.ID_Carrera))
    }

    /**
     * Metodo para cerra todas los modales 
     */
    const closeAdd = () => {
        setPutCarreras('');
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
        var filtrados = carreraData.map((carrera) => {
            if (carrera.Nombre_Carrera.toLowerCase().includes(event.target.value.toLowerCase())) {
                return carrera;
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
                <div className="containerMaterias">
                    <h1>Carreras</h1>
                    <form>
                        <div className="form group modal Materia">
                            <input
                                type="text"
                                id="Materia-name"
                                name="carrera_nombre"
                                className="inputMaterias-search"
                                onChange={buscador}
                                required
                            />
                            <span className="highlight Materias"></span>
                            <span className="bottomBar Materias-main"></span>
                            <label className="Materias-search">Nombre de la Carrera</label>
                        </div>
                    </form>
                    <div className="tabla">
                        <table>
                            <tbody>
                                {Object.keys(filtrados).length !== 0 ? (filtrados.map((carrera) =>
                                    <tr key={carrera.ID_Carrera}>
                                        <td onClick={() => detalles(carrera)}>
                                            {carrera.Nombre_Carrera}
                                        </td>
                                    </tr>
                                )) : (<></>)}
                            </tbody>
                        </table>

                    </div>

                    <input
                        type="submit"
                        className="button Materias"
                        value="Agregar"
                        onClick={add}
                    ></input>
                    {/* Detalles */}
                    <Modal show={showModalDetails} setShow={setShowModalDetails} title={nombre_Carrera}>
                        <div className="Materias-Detalles grid">
                            <div className="Materias-Detalles one">
                                <label className="Materias-Detalles">ID:</label>
                                <p className="Materias-Detalles">{ID_Carrera}</p>
                                <span className="bottomBar Materias-Detalles"></span>
                            </div>

                            <div className="Materias-Detalles two">
                                <label className="Materias-Detalles">Carrera:</label>
                                <p className="Materias-Detalles">{nombre_Carrera}</p>
                                <span className="bottomBar Materias-Detalles"></span>
                            </div>
                        </div>
                        <div className="Materias-Detalles buttons">
                            <input
                                type="submit"
                                className="button Materias"
                                value="Cerrar"
                                onClick={() => setShowModalDetails(false)}
                            />
                            <input
                                type="submit"
                                className="button Materias"
                                value="Modificar"
                                onClick={updateCarrera}
                            />
                            <input
                                type="submit"
                                className="button Materias delete"
                                value="Eliminar"
                                onClick={() => setShowModalDelete(true)}
                            />
                        </div>
                    </Modal>
                    {/* Agregar */}
                    <Modal show={showModalAdd} setShow={setShowModalAdd} title={"Agregar Carrera"}>
                        <form>
                            <div className="form group modal Materia">
                                <input
                                    type="text"
                                    id="Materia-name"
                                    name="id_carrera"
                                    className="inputMaterias"
                                    onChange={handleInputOnChange}
                                    value={datainput.id_carrera}
                                    required
                                />
                                <span className="highlight Materias"></span>
                                <span className="bottomBar Materias"></span>
                                <label className="Materias">ID de la carrera</label>
                            </div>
                            <div className="form group modal Materia">
                                <input
                                    type="text"
                                    id="Materia-name"
                                    name="carrera_nombre"
                                    className="inputMaterias"
                                    onChange={handleInputOnChange}
                                    value={datainput.carrera_nombre}
                                    required
                                />
                                <span className="highlight Materias"></span>
                                <span className="bottomBar Materias"></span>
                                <label className="Materias">Nombre de la carrera</label>
                            </div>

                        </form>

                        <input
                            type="submit"
                            className="button Materias"
                            value="Guardar"
                            onClick={save}
                        />
                    </Modal>

                    {/* Eliminar */}
                    <Modal show={showModalDelete} setShow={setShowModalDelete} title={"Eliminar Carrera"}>
                        <p>Realmente esta seguro que quiere eliminar la Carrera: <strong className="Resaltado">{nombre_Carrera}</strong></p>
                        <div className="Materias-Detalles buttons">
                            <input
                                type="submit"
                                className="button Materias"
                                value="Calcelar"
                                onClick={() => setShowModalDelete(false)}
                            />
                            <input
                                type="submit"
                                className="button Materias delete"
                                value="Confirmar"
                                onClick={borrarCarrera}
                            />
                        </div>
                    </Modal>
                    {/* Modificar */}
                    <Modal show={showModalModify} setShow={setShowModalModify} title={"Modificar Carrera"}>
                        <form>
                            <div className="form group modal Materia">
                                <input
                                    type="text"
                                    id="Materia-name"
                                    name="id_carrera"
                                    className="inputMaterias"
                                    onChange={handleInputOnChange}
                                    value={datainput.id_carrera}
                                    required
                                />
                                <span className="highlight Materias"></span>
                                <span className="bottomBar Materias"></span>
                                <label className="Materias">ID de la carrera</label>
                            </div>
                            <div className="form group modal Materia">
                                <input
                                    type="text"
                                    id="Materia-name"
                                    name="carrera_nombre"
                                    className="inputMaterias"
                                    onChange={handleInputOnChange}
                                    value={datainput.carrera_nombre}
                                    required
                                />
                                <span className="highlight Materias"></span>
                                <span className="bottomBar Materias"></span>
                                <label className="Materias">Nombre de la Carrera</label>
                            </div>
                        </form>

                        <input
                            type="submit"
                            className="button Materias"
                            value="Cerrar"
                            onClick={() => setShowModalModify(false)} />

                        <input
                            type="submit"
                            className="button Materias"
                            value="Guardar"
                            onClick={put}
                        />
                    </Modal>

                    <Modal show={showModalConfirm} setShow={setShowModalConfirm} title={"Modificar"}>
                        <div className="modal group">
                            <p>Realmente esta seguro que quiere actualizar los datos de la Carrera:<strong className="Resaltado">{"Carrera actualizar"}</strong></p>
                        </div>
                        <input
                            type="submit"
                            className="button Materias"
                            value="Cancelar"
                            onClick={() => setShowModalConfirm(false)}
                        />
                        <input
                            type="submit"
                            className="button Materias delete"
                            value="Confirmar"
                            onClick={() => updateCarrera()}
                        />
                    </Modal>

                    {/* Resultado de agregar */}
                    <Modal show={showModalResultado} setShow={setShowModalResultado} title={resultado || borrado}>
                        <div className="modal group">
                            <p><strong>{statusContenido}</strong></p>
                        </div>
                        <input
                            type="submit"
                            className="button Materias"
                            onClick={closeAdd}
                            value="OK"
                        />
                    </Modal>
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
}

export default Materias;