import React, { useState, useEffect, useRef } from 'react'
import Loader from './Loader';
/**
 *  Componente para crear respaldo y restaurar base de datos
 * @param {*} props 
 * @returns Componente 
 */
const BackUpRestore = props => {
    const [loading, setLodaing] = useState(false);

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

    useEffect(() => {
        var idTimeout = 0;
        idTimeout = setTimeout(() => {
            setLodaing(false)
        }, 2000);

        return () => {
            clearTimeout(idTimeout);
        }
    }, [loading])

    return (
        <>
            {loading === false ? (
                <div className='conteiner-BUR'>
                    <div className='conteiner-BUR__BU'>
                        <h1>Respaldar</h1>
                        <form>
                            <input
                                type={'button'}
                                value="BackUp"
                                className='Espacios'
                                onClick={() => setLodaing(true)}
                            />
                        </form>
                    </div>

                    <div className='conteiner-BUR__R'>
                        <h1 >Restaurar</h1>
                        <form className='conteiner-BUR_R__form' onSubmit={onSubmit}>
                            <div class="file-upload">
                                <p className='subidor__p'>Soltar archivo(s)</p>
                                <div className='subidor'>
                                    <input
                                        id="file"
                                        type="file"
                                        ref={fileInput}
                                        onChange={forceUpdate}
                                        className="file-upload__input"
                                        multiple
                                    />
                                </div>
                            </div>
                            <div className='fileNames-container'>
                                {fileNames()}
                            </div>
                            <input type="button"
                                value={"Restaurar"}
                                className='Espacios'
                                onClick={() => setLodaing(true)}
                            />
                        </form>
                    </div>
                </div>
            ) : (
                <Loader />
            )}

        </>
    )
}


export default BackUpRestore