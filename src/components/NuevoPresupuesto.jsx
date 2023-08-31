import { useState} from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const NuevoPresupuesto = ({
    presupuesto, 
    setPresupuesto,
    setIsValidPresupuesto
  }) => {
  const MySwal = withReactContent(Swal)


  const handlePresupuesto = (e) =>{
    e.preventDefault();
    console.log(Number(presupuesto))
    if(!presupuesto || presupuesto <= 0){
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El presupuesto no es valido',
        footer: 'Prueba intentando con un numero y que sea mayor a cero'
      })
      return
    }
    setIsValidPresupuesto(true)

  }
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form onSubmit={handlePresupuesto} className='formulario'>
        <div className="campo">
          <label >Definir Presupuesto</label>
          <input 
            type="number" 
            className="nuevo-presupuesto" 
            placeholder='Añade tu presupuesto'
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
        </div>
          <input type="submit" value="Añadir" />

      </form>
    </div>
  )
}

export default NuevoPresupuesto