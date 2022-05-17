import React, { useEffect, useRef, useState, useContext, useCallback } from 'react'
import getReportesU from '../helpers/usuarioReporte/getReportesU.js';
import getOneAsignan from '../helpers/Asignan/getOneAsignan.js';
import getOneRepirte from '../helpers/Reportes/getOneReporte.js';
import getAllCarrera from '../helpers/Carreras/getAllCarrera.js';
import getAllMaterias from '../helpers/Materias/getAllMaterias.js';
import { AuthContext } from "../helpers/Auth/auth-context.js";
import Loader from '../Loader.js';
import _ from 'lodash';

export const Reportes = () => {
    let auth = useContext(AuthContext);

    const reference = useRef(null);

    const [reportes, setReportes] = useState([]);// reportes son todos los reportes que se generaron
    const [selReporte, setSelReporte] = useState(null);// selReporte es el reporte seleccionado para la vista
    const [asignan, setAsignan] = useState([]);// asignan son todas las asignan que se generaron
    const [reporteName, setReporteName] = useState([]);// reporte que es uno individual para los titulos
    const [loading, setLoading] = useState(true);
    const [idsReportes, setIdsReportes] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [selMateria, setSelMateria] = useState({
        index: null,
        ID_Asignan: null,
    });


    const [files, setFiles] = useState('');
    const [formData, setFormData] = useState(new FormData());
    const [filesTamano, setFilesTamano] = useState(true);
    const [fileProgeso, setFileProgeso] = useState(false);
    const [fileResponse, setFileResponse] = useState(null);

    const uploadFileHandler = (e) => {
        setFiles(e.target.files);

    }

    const fileSummit = (e) => {
        e.preventDefault();
        setFilesTamano(true);
        setFileProgeso(true);
        setFileResponse(null);
        const formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append(`file${i}`, files[i]);
        }
        for (var key of formData.entries()) {
            console.log(key[0] + ',' + key[1]);
        }
        //Aqui hacer el fech para mandar los archivos?
        //setFormData(formData);
    }

    const FilesShow = (props) => {
        let mensaje = [];
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                mensaje = mensaje.concat(
                    <div className='archivo'>
                        <p className='archivoP' key={i}>{files[i].name}</p>
                    </div>
                );
            }
            return mensaje;
        }
        return null;
    }

    /**
     * useEffect para obtener las materias
     */

    useEffect(() => {
        const getMaterias = async () => {
            await getAllMaterias(auth.user.token).then(res => {
                setMaterias(res);
            });
        }
        const getCarreras = async () => {
            await getAllCarrera(auth.user.token).then(res => {
                setCarreras(res);
            });
        }
        getMaterias();
        getCarreras();
    }, []);
    /**
     *  Funcion para obtener todos los reportes que se le asgino al maestro
     */
    const getReporte = useCallback(
        async () => {
            await getReportesU(auth.user.token).then(res => {
                setReportes(res);
            });
        },
        [],
    )

    /**
     * Funcion para obtener los asginan del maestro
     */
    const getAsignan = useCallback(
        async (id) => {
            await getOneAsignan(auth.user.token, id).then(res => {
                setAsignan(arrays => [...arrays, res]);
            });
        },
        [],
    )

    /**
     * Funcion para obtener los reportes individuales
     */
    const getReporteName = useCallback(
        async (id) => {
            await getOneRepirte(auth.user.token, id).then(res => {
                setReporteName(arrays => [...arrays, res]);
            });
        },
        [],
    )
    /**
     * Funcnion para obtener los ids de los reportes
     */
    const setIds = reportes.map(reporte => reporte.ID_Reporte);

    /**
     * Useeffect para obtener los reportes
     */
    useEffect(() => {
        getReporte();
    }, [getReporte]);

    /**
     * Useeffect para almacenar los datos a precentar
     */
    useEffect(() => {
        if (reportes.length > 0) {
            let array = setIds;
            let array2 = [];
            array2 = array.filter(function (item, pos) {
                return array.indexOf(item) === pos;
            })
            array2.map(async (id) => {
                await getReporteName(id);
            })
            reportes.map(async (reporte) => {
                await getAsignan(reporte.ID_Asignan);
            });
            setLoading(false);
        }
    }, [reportes]);

    const TituloMateria = () => {
        let titulo;
        if (selMateria.ID_Asignan !== null) {
            let grado = asignan.filter(asigna => (asigna.ID_Asignan === selMateria.ID_Asignan))[0].Grado;
            let grupo = asignan.filter(asigna => (asigna.ID_Asignan === selMateria.ID_Asignan))[0].Grupo;
            let ID_Materia = asignan.filter(asigna => (asigna.ID_Asignan === selMateria.ID_Asignan))[0].ID_Materia;
            let ID_Carrera = asignan.filter(asigna => (asigna.ID_Asignan === selMateria.ID_Asignan))[0].ID_Carrera;
            let nombreMateria = materias.filter(materia => (materia.ID_Materia === ID_Materia))[0].Nombre_Materia;
            let NombreCarrera = carreras.filter(carrera => (carrera.ID_Carrera === ID_Carrera))[0].Nombre_Carrera;
            titulo = (
                <h3>
                    {NombreCarrera + "\t" + nombreMateria + "\t" + grado + "\t" + grupo}
                </h3>
            );
        }
        return titulo
    }

    const siguiente = () => {
        if (selMateria.index < reportes.length - 1) {
            setFiles("");
            setSelMateria({
                ...selMateria,
                index: selMateria.index + 1,
                ID_Asignan: reportes[selMateria.index + 1].ID_Asignan,
            });
        }
    }

    const anterior = () => {
        if (selMateria.index > 0) {
            setFiles("");
            setSelMateria({
                ...selMateria,
                index: selMateria.index - 1,
                ID_Asignan: reportes[selMateria.index - 1].ID_Asignan,
            });
        }
    }
    return (
        <>
            {loading === false ?
                (<>
                    {Object.keys(reportes).length !== 0 ? <>
                        <div className='reportesUser-Container'>
                            <div className='listReportes'>
                                <ul>
                                    {Object.keys(reporteName).length !== 0 ? reporteName.map((reporte, index) => {
                                        return (
                                            <li key={index}>
                                                <div className='listReportes__Reporte'
                                                    onClick={() => {
                                                        setSelReporte(reporteName[index]);
                                                        setSelMateria({
                                                            ...selMateria, 
                                                            ID_Asignan : reportes[index].ID_Asignan,
                                                            index : index
                                                            });
                                                    }}>
                                                    {reporte.Nombre_Reporte}
                                                </div>
                                            </li>
                                        )
                                    }) :
                                        <>
                                        </>}
                                </ul>
                            </div>
                            <div className='cabeceraReportes'>
                                {selReporte !== null ?
                                    <>
                                        <h1 className='reportesUsuario'>{selReporte.Nombre_Reporte}</h1>
                                        <hr />
                                        <p className='reportesUsuario'>{selReporte.Descripcion}</p>

                                    </> : <></>}
                            </div>
                            <div className='subirArchivos'>
                                {selMateria.index !== null ?
                                    <>
                                        <div className='subirArchivos__module'>
                                            <TituloMateria />
                                            <hr />
                                            <div className='fileUploadU-grid'>
                                                <div className='fileUpload'>
                                                    <div className="file-uploadU">
                                                        <p className='subidor__pU'>Soltar archivo(s)</p>
                                                        <div className='subidorU'>
                                                            <input
                                                                id={"index"}
                                                                type="file"
                                                                onChange={uploadFileHandler}
                                                                className="file-uploadU__input"
                                                                multiple />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='listFile'>
                                                    <div className='fileNames-containerU'>
                                                        <FilesShow />
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={fileSummit}
                                            >Enviar</button>
                                        </div>
                                        <div className='buttons_selector'>
                                            <button onClick={anterior}>Anterior</button>
                                            <button onClick={siguiente}>Siguiente</button>
                                        </div>
                                    </> : <></>}
                                {/* <ul>
                                    {(Object.keys(asignan).length !== 0 & selReporte !== null) ? asignan.map((reporte, index) => {
                                        return (
                                            <>
                                                <li>
                                                    <div className='subirArchivos__module'>
                                                        <h3>
                                                            {carreras.filter(carrera => (carrera.ID_Carrera === reporte.ID_Carrera))[0].Nombre_Carrera + "\t" +materias.filter(materia => (materia.ID_Materia === reporte.ID_Materia))[0].Nombre_Materia + "\t" + reporte.Grado + "\t" + reporte.Grupo}
                                                        </h3>
                                                        <hr />
                                                        <div className='fileUploadU-grid'>
                                                            <div className='fileUpload'>
                                                                <div className="file-uploadU">
                                                                    <p className='subidor__pU'>Soltar archivo(s)</p>
                                                                    <div className='subidorU'>
                                                                        <input
                                                                            id={index}
                                                                            type="file"
                                                                            ref={refe}
                                                                            onChange={uploadFileHandler}
                                                                            className="file-uploadU__input"
                                                                            multiple/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='listFile'>
                                                                <div className='fileNames-containerU'>
                                                                    <FilesShow indice={index} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button
                                                        onClick={fileSummit}
                                                        >Enviar</button>
                                                    </div>
                                                </li>
                                            </>
                                        )
                                    }) :
                                        <>
                                        </>}
                                </ul> */}
                            </div>
                        </div>
                    </> :
                        <>
                            <div className='imagen'>
                                <img src={"https://i.ytimg.com/vi/yzPiayo3Dic/mqdefault.jpg"} alt="loading" />
                                <h3 className='pito'>Sin nada que hace hijodesuchingadamadre</h3>

                            </div>
                        </>}
                </>) :
                (<>
                    <Loader />
                </>)}


        </>
    )
}
