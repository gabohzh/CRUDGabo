import React from 'react';
import {Link} from "react-router-dom";
class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { datosCargados:false,
                        usuarios:[]
        }
    }
    cargarDatos(){
        fetch("http://localhost/usuarios/")
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta);
            this.setState({datosCargados:true, usuarios:datosRespuesta})
        })
        .catch(console.log)
    }

    borrarRegistros = (id)=> {
        console.log(id);
        fetch("http://localhost/usuarios/?borrar="+id)
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta);
            this.cargarDatos();
        })
        .catch(console.log)  
    }

    componentDidMount(){
        this.cargarDatos();
    }

    render() {
        const{datosCargados, usuarios}=this.state

        if(!datosCargados){
            return(<div>Cargando...</div>);
        } else{
        return (

            <div className="card">
                <div className="card-header">
                    <Link className="btn btn-success" to={"/crear"}>Nuevo</Link>
                </div>
                <div className="card-body">
                    <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Cédula</th>
                    <th>Teléfono</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {usuarios.map(
                (usuario)=>(
                    <tr key={usuario.id_usuario}>
                    <td>{usuario.id_usuario}</td>
                    <td>{usuario.nombre_usuario}</td>
                    <td>{usuario.cedula_usuario}</td>
                    <td>{usuario.telefono_usuario}</td>
                    <td>{usuario.mail_usuario}</td>
                    <td>
                    <div className="btn-group" role="group" aria-label="">
                        <Link to={"/editar/"+usuario.id_usuario}  className="btn btn-warning"
                        >Editar</Link>
                        <button className="btn btn-danger"
                        onClick={()=>this.borrarRegistros(usuario.id_usuario)}>Borrar</button>
                    </div>

                    </td>
                </tr> 
                )
            )

            }
            </tbody>
        </table>
                </div>
            </div>
         );
    }
    }
}
 
export default Listar;