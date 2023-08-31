import {useState, useEffect} from 'react'
import CerrarBtn from '../img/cerrar.svg'
import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

const Modal = ({
    setModal, 
    animarModal,
    setAnimarModal,
    guardarGasto,
    gastoEditar,
    setGastoEditar
}) => {

    useEffect( () => {
        if( Object.keys(gastoEditar).length > 0){
            setGasto(gastoEditar)
        }
    }, [])
    const [gasto, setGasto] = useState({
        nombre:'',
        cantidad: '',
        categoria:'',
        id:''
    })


    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleGasto = (e) => {
        const gastoActualizado = {...gasto}
        gastoActualizado[e.target.id] = e.target.value
        setGasto(gastoActualizado)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const {nombre, cantidad, categoria} = gasto
        if([nombre, cantidad, categoria].includes('')){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios',
                footer: 'Recuerda especificar que fue lo que gastaste'
              })
            return
        }
        guardarGasto(gasto)
    }


    return (
    <div className='modal'>
        <div className="cerrar-modal">
            <img 
                src={CerrarBtn} 
                alt="boton cerrar" 
                onClick={ocultarModal}
            />
        </div>
        <form onSubmit={handleSubmit} className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
            <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>
                <input 
                    id='nombre'
                    type="text" 
                    placeholder='Añade el nombre del Gasto'
                    value={gasto.nombre}
                    onChange={(e) => handleGasto(e)}
                />
            </div>
            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>
                <input 
                    id='cantidad'
                    type="number" 
                    placeholder='Añade la cantidad del Gasto: ej. 300'
                    value={gasto.cantidad}
                    onChange={(e) => handleGasto(e)}
                />
            </div>
            <div className="campo">
                <label htmlFor="cantidad">Categoria</label>
                <select
                    id='categoria'
                    value={gasto.categoria}
                    onChange={(e) => handleGasto(e)}
                >
                    <option value="" disabled>-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
            <input type="submit" value={gastoEditar.nombre ? "Editar Gasto" : "Añadir Gasto"} />
        </form>
    </div>
  )
}

export default Modal