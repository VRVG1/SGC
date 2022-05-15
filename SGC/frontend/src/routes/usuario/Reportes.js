import React, { useEffect, useRef, useState, useContext, useCallback } from 'react'
import getReportesU from '../helpers/usuarioReporte/getReportesU.js';
import getOneAsignan from '../helpers/Asignan/getOneAsignan.js';
import getOneRepirte from '../helpers/Reportes/getOneReporte.js';
import { AuthContext } from "../helpers/Auth/auth-context.js";
import Loader from '../Loader.js';
const _ = require("lodash");

export const Reportes = () => {
    let auth = useContext(AuthContext);

    const useForceUpdate = () => useState()[1];
    const fileInput = useRef(null);
    const forceUpdate = useForceUpdate();
    const [reportes, setReportes] = useState([]);// reportes son todos los reportes que se generaron
    const [selReporte, setSelReporte] = useState(null);// selReporte es el reporte seleccionado para la vista
    const [asignan, setAsignan] = useState([]);// asignan son todas las asignan que se generaron
    const [reporteName, setReporteName] = useState([]);// reporte que es uno individual para los titulos
    const [loading, setLoading] = useState(true);
    const [idsReportes, setIdsReportes] = useState([]);




    const getReporte = useCallback(
        async () => {
            await getReportesU(auth.user.token).then(res => {
                setReportes(res);
            });
        },
        [],
    )

    const getAsignan = useCallback(
        async (id) => {
            await getOneAsignan(auth.user.token, id).then(res => {
                setAsignan(arrays => [...arrays, res]);
            });
        },
        [],
    )

    const getReporteName = useCallback(
        async (id) => {
            await getOneRepirte(auth.user.token, id).then(res => {
                setReporteName(arrays => [...arrays, res]);
            });
        },
        [],
    )
    const setIds = reportes.map(reporte => reporte.ID_Reporte);
    useEffect(() => {
        getReporte();
    }, [getReporte]);

    useEffect(() => {
        if (reportes.length > 0) {
            let array = setIds;
            let array2 = [];
            array2 = array.filter(function(item, pos) {
                return array.indexOf(item) == pos;
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

    useEffect(e => {
        window.addEventListener("keyup", clickFileInput);
        return () => window.removeEventListener("keyup", clickFileInput);
    });

    function clickFileInput(e) {
        if (fileInput.current.nextSibling.contains(document.activeElement)) {
            if (e.keyCode === 32) {
                fileInput.current.click();
            }
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        const data = new FormData(fileInput.current.files);
    }

    function fileNames() {
        const { current } = fileInput;

        if (current && current.files.length > 0) {
            let messages = [];
            for (let file of current.files) {
                messages = messages.concat(
                    <div className='archivo'>
                        <p className='archivoP' key={file.name}>{file.name}</p>
                    </div>

                );
            }
            return messages;
        }
        return null;
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
                                <ul>
                                    {(Object.keys(asignan).length !== 0 & selReporte !== null) ? asignan.map((reporte, index) => {
                                        return (
                                            <>
                                                <li>
                                                    <div className='subirArchivos__module'>
                                                        <h3>{reporte.ID_Materia + "\t" + reporte.Grado + "\t" + reporte.Grupo}</h3>
                                                        <hr />
                                                        <div className='fileUploadU-grid'>
                                                            <div className='fileUpload'>
                                                                <div className="file-uploadU">
                                                                    <p className='subidor__pU'>Soltar archivo(s)</p>
                                                                    <div className='subidorU'>
                                                                        <input
                                                                            id="file"
                                                                            type="file"
                                                                            ref={fileInput}
                                                                            onChange={forceUpdate}
                                                                            className="file-uploadU__input"
                                                                            multiple
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='listFile'>
                                                                <div className='fileNames-containerU'>
                                                                    {fileNames()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button>Enviar</button>
                                                    </div>
                                                </li>
                                            </>
                                        )
                                    }) :
                                        <>
                                        </>}
                                </ul>
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
