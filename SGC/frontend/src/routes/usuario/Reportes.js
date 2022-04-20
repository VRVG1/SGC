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
                    <p className='reportesUsuario'>En medio del camino de nuestra vida

                        me encontré por una selva oscura,

                        porque la recta vía era perdida.



                        ¡Ay, que decir lo que era es cosa dura

                        esta selva salvaje, áspera y fuerte,

                        cuyo recuerdo renueva la pavura!



                        Tanto es amarga, que poco lo es más la muerte:

                        pero por tratar del bien que allí encontré,

                        diré de las otras cosas que allí he visto.



                        No sé bien redecir como allí entré;

                        tan somnoliento estaba en aquel punto,

                        cuando el veraz camino abandoné.



                        Pero así como llegué junto al pie de un monte,

                        allá donde aquel valle cesaba,

                        que de pavor me había acongojado el corazón,
                        miré en alto, y vi sus espaldas

                        vestidas ya de rayos del planeta,

                        que a todos lleva por toda senda recta.



                        Entonces se aquietó un poco el espanto,

                        que en el hueco de mi corazón había durado

                        la noche entera, que pasé con tanto afán.



                        Y como aquel que con angustiado resuello

                        salido fuera del piélago a la orilla

                        se vuelve al agua peligrosa y la mira;



                        así mi alma, que aún huía,

                        volvióse atrás a remirar el cruce,

                        que jamás dejó a nadie con vida.



                        Una vez reposado el fatigado cuerpo,

                        retomé el camino por la desierta playa,

                        tal que el pie firme era siempre el más bajo;

                    </p>
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
                            </div>
                        </li>
                        <li>
                            <div className='subirArchivos__module'>
                                <h3>Materia 2</h3>
                            </div>
                        </li>
                        <li>
                            <div className='subirArchivos__module'>
                                <h3>Materia 3</h3>
                            </div>
                        </li>
                        <li>
                            <div className='subirArchivos__module'>
                                <h3>Materia 4</h3>
                            </div>
                        </li>
                        <li>
                            <div className='subirArchivos__module'>
                                <h3>Materia 5</h3>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
