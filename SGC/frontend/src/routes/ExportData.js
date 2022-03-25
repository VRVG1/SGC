import React, { useState, useEffect } from 'react'
import Loader from './Loader';
/**
 *  Componente de exportar datos.
 * @param {*} props 
 * @returns componente
 */
const ExportData = props => {
    const [loading, setLodaing] = useState(false);
    /**
     * Metodo/funcion que hace el llamado para exportar datos y espera para
     * posteriormente descargar el archivo generado.
     */
    const exportData = () => {
        //Poner aqui el exportar datos ya sea del backend o del front end xd

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
                <div className='conteiner-exportdata'>
                    <h1 className='conteiner-exportdata__tile'>Exportar Informacion en una hoja de calculo</h1>
                    <input
                        className='conteiner-exportdata__button'
                        type="button"
                        value={"Exportar"}
                        onClick={() => setLodaing(true)} />
                </div>

            ) : (
                <Loader />
            )}
        </>
    )
}

export default ExportData;