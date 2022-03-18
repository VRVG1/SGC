import React, { useState, useEffect } from "react";
import Modal from './modal/Modal.js'
import getAllCarrera from "./helpers/Carreras/getAllCarrera.js";

const Materias = props => {
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalDetails, setShowModalDetails] = useState(false);
    const [showModalModify, setShowModalModify] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [data, setData] = useState({})

    /**
     * Metodo para obtener todos los datos de la 
     * carrera desde la base de datos
     */
    const obtenerCarrera = () => {
        getAllCarrera().then((dataObtenida) => {
            setData(dataObtenida);
        })
    }

    /**
     * useEffect hook para cargar los datos obtenidos
     */
    useEffect(() => {
        obtenerCarrera();
    }, [])

    let Nombre_Carrera = "Ingenieria en sistemas computacionales"

    function deleteCarrera() {
        setShowModalDelete(false);
        setShowModalDetails(false);
        //Poner en este metodo los pasos requeridos para borrar un Materia
    }

    function updateCarrera() {
        setShowModalConfirm(false);
        setShowModalModify(false);
        setShowModalDetails(false);
        //Poner en este metodo los pasos requeridos para actualizar un Materia
    }

    return (
        <div className="containerMaterias">
            {console.log(data)}
            <h1>Carreras</h1>
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
                    <label className="Materias-search">Nombre de la Carrera</label>
                </div>
            </form>

            <table className="tabla Materias">
                <tbody>
                    <tr>
                        <td onClick={() => setShowModalDetails(true)}>
                            Ingenieria en Sistemas Computacionales
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Ingenieria Informatica
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Ingenieria Mecanica
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Ingenieria Informatica
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Ingenieria Mecanica
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Ingenieria Informatica
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Ingenieria Mecanica
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Ingenieria Informatica
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Ingenieria Mecanica
                        </td>
                    </tr>
                </tbody>
            </table>

            <input
                type="submit"
                className="button Materias"
                value="Agregar"
                onClick={() => setShowModalAdd(true)}
            ></input>
            {/* Detalles */}
            <Modal show={showModalDetails} setShow={setShowModalDetails} title={"Nombre del Carrera"}>
                <div className="Materias-Detalles grid">

                    <div className="Materias-Detalles one">
                        <label className="Materias-Detalles">Carrera:</label>
                        <p className="Materias-Detalles">{"carrera"}</p>
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
            <Modal show={showModalAdd} setShow={setShowModalAdd} title={"Agregar Carrera"}>
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
                        <label className="Materias">Nombre de la carrera</label>
                    </div>
                </form>

                <input
                    type="submit"
                    className="button Materias"
                    value="Guardar"
                    onClick={() => setShowModalAdd(false)}
                />
            </Modal>
            {/* Eliminar */}
            <Modal show={showModalDelete} setShow={setShowModalDelete} title={"Eliminar Carrera"}>
                <p>Realmente esta seguro que quiere eliminar la Carrera:<h2 className="Resaltado">{"Carrera a eliminar"}</h2></p>
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
                        onClick={() => deleteCarrera()}
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
                            name="Materia-name"
                            className="inputMaterias"
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
                    onClick={() => setShowModalConfirm(true)}
                />
            </Modal>

            <Modal show={showModalConfirm} setShow={setShowModalConfirm} title={"Modificar"}>
                <div className="modal group">
                    <p>Realmente esta seguro que quiere actualizar los datos de la Carrera:<h2 className="Resaltado">{"Carrera actualizar"}</h2></p>
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
        </div>
    );
}

export default Materias;