import React, { useState, useEffect, useRef, useContext } from 'react'
import Loader from './Loader';
import getBackup from './helpers/RespaldoYRestauracion/getBackup'
import makeRestore from './helpers/RespaldoYRestauracion/postRestore'
import { AuthContext } from './helpers/Auth/auth-context'

/**
 *  Componente para crear respaldo y restaurar base de datos
 * @param {*} props 
 * @returns Componente 
 */
const BackUpRestore = props => {
  let auth = useContext(AuthContext);
  const [loading, setLodaing] = useState(false);
  const [restoreMessage, setRestoreMessage] = useState('');

  const useForceUpdate = () => useState()[1];
  const fileInput = useRef(null);
  const forceUpdate = useForceUpdate();

  //
    //NOTE: No se que hacia todo esto que comente xd
  //
  //useEffect(e => {
  //    window.addEventListener("keyup", clickFileInput);
  //    return () => window.removeEventListener("keyup", clickFileInput);
  //});

  //function clickFileInput(e) {
  //    if (fileInput.current.nextSibling.contains(document.activeElement)) {
  //        // Bind space to trigger clicking of the button when focused
  //        if (e.keyCode === 32) {
  //            fileInput.current.click();
  //        }
  //    }
  //}

  function onSubmit(e) {
    e.preventDefault();
    console.log(e.loaded);
    const data = new FormData(fileInput.current.files);
  }

  function fileNames() {
    const { current } = fileInput;

    if (current && current.files.length > 0) {
      console.log(current.files);
      let messages = [];
      let cont = 0;
      for (let file of current.files) {
        console.log(cont)
        messages = messages.concat(
          <div className='archivo'>
            <p className='archivoP' key={cont}>{file.name}</p>
          </div>
        );
        cont++;
      }
      return messages;
    }
    return null;
  }

  /**
  * Funcion encargada de llamar al servidor para que le envíe un archivo
  * comprimido con todos los datos de respaldo del servidor SGC.
  *
  * **/
  function getBackupFile() {
    setLodaing(true);
    getBackup(auth.user.token);
  }

  function restoreSubmitHandler(event) {
    event.preventDefault();

    const successCallback = (message) => {
      setRestoreMessage(message);
    }

    const failureCallback = (message) => {

    }

    let formData = new FormData(event.currentTarget);
    makeRestore(auth.user.token, formData);
  }

  function makeRestoreFile() {
    setLodaing(true);
    makeRestore(auth.user.token);
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
                onClick={getBackupFile}
              />
            </form>
          </div>

          <div className='conteiner-BUR__R'>
            <h1 >Restaurar</h1>
            <form
              className='conteiner-BUR_R__form'
              onSubmit={restoreSubmitHandler}
            >
              <div className="file-upload">
                <p className='subidor__p'>Soltar archivo(s)</p>
                <div className='subidor'>
                  <input
                    id="file"
                    type="file"
                    ref={fileInput}
                    onChange={forceUpdate}
                    className="file-upload__input"
                    name="restorefile"
                    required
                  />
                </div>
              </div>
              <div className='fileNames-container'>
                {fileNames()}
              </div>
              <input type="submit"
                value={"Restaurar"}
                className='Espacios'
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
