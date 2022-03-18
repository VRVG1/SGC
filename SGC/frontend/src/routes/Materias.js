import React, { useState } from "react";
import Modal from './modal/Modal.js'

const Materias = props => {
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalDetails, setShowModalDetails] = useState(false);
    const [showModalModify, setShowModalModify] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    let semestre = "2"
    let carrera = "Ingenieria en sistemas computacionales"
    let MateriaEliminar = "Gestion de Proyectos"
    let MateriaActualizar = "Programacion Orientada a Objetos"

    function deleteMateria() {
        setShowModalDelete(false);
        setShowModalDetails(false);
        //Poner en este metodo los pasos requeridos para borrar un Materia
    }

    function updateMateria() {
        setShowModalConfirm(false);
        setShowModalModify(false);
        setShowModalDetails(false);
        //Poner en este metodo los pasos requeridos para actualizar un Materia
    }

    return (
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

            <table className="tabla Materias">
                <tbody>
                    <tr>
                        <td onClick={() => setShowModalDetails(true)}>
                            Cálculo Diferencial
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Fundamentos de Programación
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Taller de Ética
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Matemáticas Discretas
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Taller de Administración
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Fundamentos de Investigación I
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Cálculo Integral
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Programación Orientada a Objetos
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Contabilidad Financiera
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Química
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Álgebra Lineal
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Probabilidad y Estadística
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Fundamentos de Telecomunicaciones
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Analítica de BigData
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
            <Modal show={showModalDetails} setShow={setShowModalDetails} title={"Nombre del Materia"}>
                <div className="Materias-Detalles grid">
                    <div className="Materias-Detalles one">
                        <label className="Materias-Detalles">Semestre:</label>
                        <p className="Materias-Detalles">{semestre}</p>
                        <span className="bottomBar Materias-Detalles"></span>
                    </div>

                    <div className="Materias-Detalles two">
                        <label className="Materias-Detalles">Carrera:</label>
                        <p className="Materias-Detalles">{carrera}</p>
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
                    value="Guardar"
                    onClick={() => setShowModalAdd(false)}
                />
            </Modal>
            {/* Eliminar */}
            <Modal show={showModalDelete} setShow={setShowModalDelete} title={"Eliminar Materia"}>
                <p>Realmente esta seguro que quiere eliminar ;a Materia:<h2 className="Resaltado">{MateriaEliminar}</h2></p>
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
                        onClick={() => deleteMateria()}
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
                    <p>Realmente esta seguro que quiere actualizar los datos de la Materia:<h2 className="Resaltado">{MateriaActualizar}</h2></p>
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
        </div>
    );
}

export default Materias;