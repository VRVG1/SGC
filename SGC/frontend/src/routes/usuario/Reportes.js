import React, { useEffect, useRef, useState, useContext } from 'react'
import getReportesU from '../helpers/usuarioReporte/getReportesU.js';

import { AuthContext } from "../helpers/Auth/auth-context.js";
const _ = require("lodash");

export const Reportes = () => {
    let auth = useContext(AuthContext);

    const useForceUpdate = () => useState()[1];
    const fileInput = useRef(null);
    const forceUpdate = useForceUpdate();
    const [reportes, setReportes] = useState([]);
    const [selReporte, setSelReporte] = useState(null);


    useEffect(() => {
        const getReportes = async () => {
            await getReportesU(auth.user.token).then((data) => {
                setReportes(data);
                console.log(data)
            });
        };
        getReportes();
    }, [auth.user.id]);//Creo que es mejor quitar esto y poner una variable x que se actualize de forma aleatoria

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
            {Object.keys(reportes).length !== 0 ? reportes.map((reporte, index) => {
                return (
                    <div className='reportesUser-Container'>
                        <div className='listReportes'>
                            <ul>
                                {Object.keys(reportes).length !== 0 ? reportes.map((reporte, index) => {
                                    return (
                                        <li key={index}>
                                            <div className='listReportes__Reporte'
                                            onClick={() => {
                                                setSelReporte(index)
                                                console.log(selReporte)
                                                }}>
                                                {"reporte.nombre"}
                                            </div>
                                        </li>
                                    )
                                }) :
                                    <>
                                    </>}
                            </ul>
                        </div>
                        <div className='cabeceraReportes'>
                            {Object.keys(reportes).length !== 0 ? reportes.map((reporte, index) => {
                                return (
                                    <>
                                        <h1 className='reportesUsuario'>Nombre del reporte</h1>
                                        <hr />
                                        <p className='reportesUsuario'>{"mensaje"}</p>
                                    </>
                                )
                            }) :
                                <>
                                </>}
                        </div>
                        <div className='subirArchivos'>
                            <ul>
                                {Object.keys(reportes).length !== 0 ? reportes.map((reporte, index) => {
                                    return (
                                        <>
                                            <li>
                                                <div className='subirArchivos__module'>
                                                    <h3>Materia 1</h3>
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
                                        <p>No hay reporte</p>
                                    </>}
                            </ul>
                        </div>
                    </div>
                )
            }) :
                <>
                <div className='imagen'>
                <img src={"https://i.ytimg.com/vi/yzPiayo3Dic/mqdefault.jpg"} alt="loading" />
                <h3 className='pito'>Sin nada que hace hijodesuchingadamadre</h3>

                </div>
                </>}

        </>
    )
}
