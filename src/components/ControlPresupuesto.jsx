import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import Swal from 'sweetalert2'
import 'react-circular-progressbar/dist/styles.css'


const ControlPresupuesto = ({
    gastos,
    setGastos,
    presupuesto, 
    setPresupuesto,
    setIsValidPresupuesto

}) => {
    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(presupuesto)
    const [gastado, setGastado] = useState(0)

    useEffect( () => {
        const totalGastado = gastos.reduce( (total, gasto) => Number(gasto.cantidad) + total, 0)
        const totalDisponible = presupuesto - totalGastado

        // Calcular porcentaje gastado
        const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)
        console.log(nuevoPorcentaje)
        setGastado(totalGastado)
        setDisponible(totalDisponible)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1500);
    }, [gastos])

    
    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-CL',{
            style: 'currency',
            currency: 'CLP'
        })
    }

    const handleResetear = () => {
        Swal.fire({
            title: 'Estas seguro que quieres resetear la app?',
            text: "Se borrarán todos los gastos y el presupuesto ingresado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confimar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setGastos([])
                setPresupuesto(0)
                setIsValidPresupuesto(false)
                Swal.fire(
                    'Formateado',
                    'Todos los datos han sido eliminados',
                    'success'
              )
            }
        })
    }
    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    value={porcentaje}
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#dc2626' :'#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#dc2626' :'#3B82F6'
                    })}
                    text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className='contenido-presupuesto'>
                <button 
                    className="reset-app" 
                    type="button"
                    onClick={handleResetear}
                >
                    Resetear app
                </button>
                <p>
                    <span>Presupuesto: {''}</span>{formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 && 'negativo'}`}>
                    <span>Disponible: {''}</span>{formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado: {''}</span>{formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto