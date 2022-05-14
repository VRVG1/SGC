import React, { useEffect, useRef, useState } from 'react'

const _ = require("lodash");

export const Reportes = () => {
    const useForceUpdate = () => useState()[1];
    const fileInput = useRef(null);
    const forceUpdate = useForceUpdate();

    useEffect(e => {
        window.addEventListener("keyup", clickFileInput);
        return () => window.removeEventListener("keyup", clickFileInput);
    });

    function clickFileInput(e) {
        if (fileInput.current.nextSibling.contains(document.activeElement)) {
            // Bind space to trigger clicking of the button when focused
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
            <div className='reportesUser-Container'>
                <div className='listReportes'>
                    <ul>
                        {_.times(20, (i) => (
                            <li>
                                <div className='listReportes__Reporte'>
                                    Reporte {i + 1}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='cabeceraReportes'>
                    <h1 className='reportesUsuario'>Nombre del reporte</h1>
                    <hr />
                    <p className='reportesUsuario'>{"mensaje"}</p>
                </div>
                <div className='subirArchivos'>
                    <ul>
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
                    </ul>
                </div>
            </div>
        </>
    )
}
