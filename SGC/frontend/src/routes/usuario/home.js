import React from 'react'

export const Home2 = () => {
  return (
    <div className='usuario-container parent'>
      <div className='usuario-container'>

        <h1>Bienvenido al Sistemas Gestor del Curso</h1>
        <p>Buenas {"Insertar aqui usuario"}</p>
        <p>Todo que puede no se cumplan</p>
        <ul>
          <li>
            Donde esta este txt poner por ejemplo, los reportes pendientes <br /> por subir de la semana o los que ya se retrasaron xd
          </li>
          <li>
            El div que esta abajo que se desaparesca una ya que termine de <br />seleccionar materias o que se le pase el tiempo
          </li>
        </ul>
      </div>
      <div className='usuario-container'>
        <div className='usuario-grid'>
          <div className='usuario-grid__1'>
            <table>
              <thead>
                <th>
                  <td>
                    Carrera
                  </td>
                </th>
                <th>
                  <td>
                    Materia
                  </td>
                </th>
                <th>
                  <td>
                    Grupo
                  </td>
                </th>
                <th>
                  <td>
                    Opcion
                  </td>
                </th>
              </thead>


              <tbody>
                <tr>
                  <td>
                    hoal
                  </td>
                  <td>
                    hoal
                  </td>
                  <td>
                    hoal
                  </td>
                  <td>
                    hoal
                  </td>
                </tr>
                <tr>
                  <td>
                    hoal
                  </td>
                  <td>
                    hoal
                  </td>
                  <td>
                    hoal
                  </td>
                  <td>
                    hoal
                  </td>
                </tr>
                <tr>
                  <td>
                    hoal
                  </td>
                  <td>
                    hoal
                  </td>
                  <td>
                    hoal
                  </td>
                  <td>
                    hoal
                  </td>
                </tr>
                <tr>
                  <td>
                    hoal
                  </td>
                  <td>
                    hoal
                  </td>
                  <td>
                    hoal
                  </td>
                  <td>
                    hoal
                  </td>
                </tr>
              </tbody>
            </table>
            <button>Confirmar</button>
          </div>
          <div className='usuario-grid__2'>
            <select>
              <option>Carrera 1</option>
              <option>Carrera 2</option>
              <option>Carrera 3</option>
            </select>
            <select>
              <option>Materia 1</option>
              <option>Materia 2</option>
              <option>Materia 3</option>
            </select>
            <select>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
              <option>E</option>
            </select>
            <button>Agregar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home2;