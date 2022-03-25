import React, { useState, useEffect } from "react";
import Modal from './modal/Modal.js'
import getAllCarrera from "./helpers/Carreras/getAllCarrera.js";
import getAllMaterias from "./helpers/Materias/getAllMaterias.js";
import deleteMateria from "./helpers/Materias/deleteMateria.js";
import Loader from "./Loader.js";
import postMateria from "./helpers/Materias/postMateria.js";

/**
 * Componente para la vista de materias
 * @param {*} props 
 * @returns componente
 */
const Materias = props => {
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalDetails, setShowModalDetails] = useState(false);
    const [showModalResultado, setShowModalResultado] = useState(false);
    const [showModalModify, setShowModalModify] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [materiaData, setMateriaData] = useState([]);
    const [carreraData, setCareraData] = useState({});
    const [addData, setAddData] = useState({
        Materia_name: '',
        materia_carrera: '',
        Materia_semestre: ''
    });
    const [actualizarCarrera, setActualizarCarrera] = useState(0);
    const [actualizarMateria, setActualizarMateria] = useState(0);
    const [loading, setLoading] = useState(false);
    const [addMaterias, setAddMaterias] = useState('');
    const [statusContenido, setStatusContenido] = useState('');

    const [ID_Materia, setID_Materia] = useState('');
    const [Grado, setGrado] = useState("");
    const [Nombre_Materia, setNombre_Materia] = useState("");
    const [ID_Carrera, setID_Carrera] = useState('');
    const [Nombre_Carrera, setNombre_Carrera] = useState('')
    /**
     * Metodo para obtener todas las materiass
     */
    const obtenerMaterias = () => {
        getAllMaterias().then((data) => {
            setMateriaData(data)
        });
    }

    /**
     * Metodo para obtener todos los datos de la 
     * carrera desde la base de datos
     */
    const obtenerCarrera = async () => {
        await getAllCarrera().then((data) => {
            setCareraData(data);
        });
    }

    /**
     * useEffect para obtener los datos de carrera cada que se actualizen
     */
    useEffect(() => {
        obtenerCarrera();
    }, [actualizarCarrera])
    /**
     * hook useEffect para la recoleccion de datos generales de materias
     */
    useEffect(() => {
        obtenerMaterias();
    }, [actualizarMateria])

    /**
     * Metodo para realizar la accion borrar materia
     */
    const deleteMaterias = async () => {
        setLoading(true);
        setAddMaterias(await deleteMateria(ID_Materia));
    }

    function updateMateria() {
        setShowModalConfirm(false);
        setShowModalModify(false);
        setShowModalDetails(false);
        //Poner en este metodo los pasos requeridos para actualizar un Materia
    }

    function details(id) {
        const materia = materiaData.find(elemento => elemento.ID_Materia === id);
        const carrera = carreraData.find(element => element.ID_Carrera === materia.Carrera);
        setGrado(materia.Grado);
        setID_Materia(materia.ID_Materia);
        setNombre_Materia(materia.Nombre_Materia);
        setID_Carrera(carrera.ID_Carrera);
        setNombre_Carrera(carrera.Nombre_Carrera);
        setShowModalDetails(true);
    }

    /**
     * metodo para limpear los datos de los inputs cada que se presione el boton
     * agregar y de paso muestra el formulario de agregar
     */
    const add = () => {
        setAddData({
            ...addData,
            Materia_name: '',
            materia_carrera: carreraData[0].ID_Carrera,
            Materia_semestre: ''
        });
        setActualizarCarrera(Math.random())
        setShowModalAdd(true);
    }
    /**
     * Metodo que tienen como parametro el eventeo del input usado para guardar el valor
     * en su respectiva variable usando useState()
     * @param {*} event 
     */
    const handleSelectOnChange = (event) => {
        setAddData({
            ...addData,
            [event.target.name]: event.target.value
        });
    }

    const postermateria = async () => {
        setLoading(true);
        console.log(addData)
        //setAddMaterias(await postMateria(addData));
    }

    /**
     * useEffect para mostrar mensaje de resultado al momento de agregar
     */
    useEffect(() => {
        if (addMaterias === "OK") {
            setShowModalResultado(true);
            setStatusContenido("Se realizo la operacion con exito");
            setActualizarMateria(Math.random())
        } else if (addMaterias !== '') {
            setShowModalResultado(true);
            setStatusContenido("Problemas al realizar la operacion, intente mas tarde")
            setActualizarMateria(Math.random())
        }
        setLoading(false)
    }, [addMaterias]);

    /**
 * Metodo para cerra todas los modales 
 */
    const closeAdd = () => {
        setShowModalAdd(false);
        setShowModalResultado(false);
        setShowModalDelete(false);
        setShowModalConfirm(false);
        setShowModalDetails(false);
        setShowModalModify(false);
    }
    return (
        <>
            {loading === false ? (
                <div className="containerMaterias">
                    <h1>Materias</h1>
                    <form>
                        <div className="form group modal Materia">
                            <input
                                type="text"
                                id="Materia-name"
                                name="Materia-name"
                                className="inputMaterias-search"
                                required
                            />
                            <span className="highlight Materias"></span>
                            <span className="bottomBar Materias-main"></span>
                            <label className="Materias-search">Nombre de Materia</label>
                        </div>
                    </form>

                    <div className="tabla">
                        <table>
                            <tbody>
                                {Object.keys(materiaData).length !== 0 ? (materiaData.map((materia) =>
                                    <tr key={materia.ID_Materia}>
                                        <td onClick={() => details(materia.ID_Materia)}>
                                            {materia.Nombre_Materia}
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
                    <Modal show={showModalDetails} setShow={setShowModalDetails} title={Nombre_Materia}>
                        <div className="Materias-Detalles grid">
                            <div className="Materias-Detalles one">
                                <label className="Materias-Detalles">Semestre:</label>
                                <p className="Materias-Detalles">{Grado}</p>
                                <span className="bottomBar Materias-Detalles"></span>
                            </div>

                            <div className="Materias-Detalles two">
                                <label className="Materias-Detalles">Carrera:</label>
                                <p className="Materias-Detalles">{Nombre_Carrera}</p>
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
                                onClick={() => setShowModalModify(true)}
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
                    <Modal show={showModalAdd} setShow={setShowModalAdd} title={"Agregar Materia"}>
                        <form>
                            <div className="form group modal Materia">
                                <input
                                    type="text"
                                    id="Materia-name"
                                    name="Materia_name"
                                    className="inputMaterias"
                                    value={addData.Materia_name}
                                    onChange={handleSelectOnChange}
                                    required
                                />
                                <span className="highlight Materias"></span>
                                <span className="bottomBar Materias"></span>
                                <label className="Materias">Nombre de Materia</label>
                            </div>

                            <div className="form group modal Materia">
                                <select name="materia_carrera" value={addData.materia_carrera} onChange={handleSelectOnChange} >
                                    {Object.keys(carreraData).length !== 0 ? (carreraData.map((carrera) =>
                                        <option key={carrera.ID_Carrera} value={carrera.ID_Carrera}>{carrera.Nombre_Carrera}</option>
                                    )) : (<></>)}
                                </select>
                                <span className="highlight Materias"></span>
                                <span className="bottomBar Materias"></span>
                                <label className="Materias">Carrera de la Materia</label>
                            </div>

                            <div className="form group modal Materia">
                                <input
                                    type="text"
                                    id="Materia-semestre"
                                    name="Materia_semestre"
                                    value={addData.Materia_semestre}
                                    onChange={handleSelectOnChange}
                                    className="inputMaterias"
                                    required
                                />
                                <span className="highlight Materias"></span>
                                <span className="bottomBar Materias"></span>
                                <label className="Materias">Semestre de la Materia</label>
                            </div>
                        </form>

                        <input
                            type="submit"
                            className="button Materias"
                            value="Guardar"
                            onClick={postermateria}
                        />
                    </Modal>
                    {/* Eliminar */}
                    <Modal show={showModalDelete} setShow={setShowModalDelete} title={Nombre_Materia}>
                        <p>Realmente esta seguro que quiere eliminar la Materia: <strong>{Nombre_Materia}</strong></p>
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
                                onClick={deleteMaterias}
                            />
                        </div>
                    </Modal>
                    {/* Modificar */}
                    <Modal show={showModalModify} setShow={setShowModalModify} title={"Modificar Materia"}>
                        <form>
                            <div className="form group modal Materia">
                                <input
                                    type="text"
                                    id="Materia-name"
                                    name="Materia-name"
                                    className="inputMaterias"
                                    required
                                />
                                <span className="highlight Materias"></span>
                                <span className="bottomBar Materias"></span>
                                <label className="Materias">Nombre de Materia</label>
                            </div>

                            <div className="form group modal Materia">
                                <select>
                                    <option value="Ingenieria en Sistemas Computacionales">Ingenieria en Sistemas Computacionales</option>
                                    <option value="Ingenieria Ambiental">Ingenieria Ambiental</option>
                                    <option value="Ingenieria Electrica">Ingenieria Electrica</option>
                                    <option value="Ingenieria Electronica">Ingenieria Electronica</option>
                                    <option value="Ingenieria Industrial">Ingenieria Industrial</option>
                                    <option value="Ingenieria Mecanica">Ingenieria Mecanica</option>
                                    <option value="Ingenieria Informatica">Ingenieria Informatica</option>
                                </select>
                                <span className="highlight Materias"></span>
                                <span className="bottomBar Materias"></span>
                                <label className="Materias">Carrera de la Materia</label>
                            </div>

                            <div className="form group modal Materia">
                                <input
                                    type="text"
                                    id="Materia-semestre"
                                    name="Materia-semestre"
                                    className="inputMaterias"
                                    required
                                />
                                <span className="highlight Materias"></span>
                                <span className="bottomBar Materias"></span>
                                <label className="Materias">Semestre de la Materia</label>
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
                            onClick={() => setShowModalConfirm(true)}
                        />
                    </Modal>

                    <Modal show={showModalConfirm} setShow={setShowModalConfirm} title={"Modificar"}>
                        <div className="modal group">
                            <p>Realmente esta seguro que quiere actualizar los datos de la Materia:<strong className="Resaltado">{"MateriaActualizar"}</strong></p>
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
                            onClick={() => updateMateria()}
                        />
                    </Modal>

                    {/* Resultado de agregar */}
                    <Modal show={showModalResultado} setShow={setShowModalResultado} title={addMaterias}>
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