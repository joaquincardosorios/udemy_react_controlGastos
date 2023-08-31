import { useState, useEffect } from "react"


const ControlPresupuesto = ({presupuesto, gastos}) => {
    const [disponible, setDisponible] = useState(presupuesto)
    const [gastado, setGastado] = useState(0)

    useEffect( () => {
        const totalGastado = gastos.reduce( (total, gasto) => Number(gasto.cantidad) + total, 0)
        const totalDisponible = presupuesto - totalGastado
        setGastado(totalGastado)
        setDisponible(totalDisponible)
    }, [gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-CL',{
            style: 'currency',
            currency: 'CLP'
        })
    }
    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                Grafica aqui
            </div>
            <div className='contenido-presupuesto'>
                <p>
                    <span>Presupuesto: {''}</span>{formatearCantidad(presupuesto)}
                </p>
                <p>
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