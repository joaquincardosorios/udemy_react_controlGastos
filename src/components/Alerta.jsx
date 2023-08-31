import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const Alerta = () => {
    const MySwal = withReactContent(Swal)
    return (
        MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos son obligatorios',
            footer: 'Recuerda especificar que fue lo que gastaste'
          })
    )
}

export default Alerta