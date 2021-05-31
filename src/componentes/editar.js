import React from 'react';
import {Link} from "react-router-dom";
class Editar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            datosCargados:false,
            usuario:[]
         }
    }

    cambiodeValor= (e) =>{
        const state=this.state.usuario;
        state[e.target.name]=e.target.value;
        this.setState({ usuario:state});
        }

        enviarDatos = (e) =>{
            e.preventDefault();
            console.log("Formulario enviado...");
            const{id_usuario,nombre_usuario,cedula_usuario,telefono_usuario,mail_usuario}= this.state.usuario;
            console.log(id_usuario);
            console.log(nombre_usuario);
            console.log(cedula_usuario);
            console.log(telefono_usuario);
            console.log(mail_usuario);

            var datosEnviar = {id:id_usuario,nombre:nombre_usuario,cedula:cedula_usuario,
                                telefono:telefono_usuario,correo:mail_usuario};

            fetch("http://localhost/usuarios/?actualizar=1",{
            method:"POST",
            body:JSON.stringify(datosEnviar)
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta);
            this.props.history.push("/");
        })
        .catch(console.log)
        }

    componentDidMount(){
        console.log(this.props.match.params.id_usuario);

        fetch("http://localhost/usuarios/?consultar="+this.props.match.params.id)
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta);
            this.setState({datosCargados:true,
                usuario:datosRespuesta[0]})
        })
        .catch(console.log)
    }
    render() { 
        const{datosCargados, usuario}=this.state

        if(!datosCargados){
            return(<div>Cargando...</div>);
        } else{
        return ( <div className="card">
        <div className="card-header">
            Editar usuario
        </div>
        <div className="card-body">
            <form onSubmit={this.enviarDatos}>
                
                <div className="form-group">
              <input type="text" name="id_usuario" readOnly onChange={this.cambiodeValor} id="id_usuario" value={usuario.id_usuario} className="form-control" placeholder="Nombre" aria-describedby="helpId"/>
              <small id="helpId" className="text-muted">Identificador</small>
            </div>
            <div className="form-group">
              <input type="text" name="nombre_usuario" onChange={this.cambiodeValor} id="nombre_usuario" value={usuario.nombre_usuario} className="form-control" placeholder="Nombre" aria-describedby="helpId"/>
              <small id="helpId" className="text-muted">Nombre</small>
            </div>
            <div className="form-group">
              <input type="text" name="cedula_usuario" onChange={this.cambiodeValor} id="cedula_usuario" value={usuario.cedula_usuario} className="form-control" placeholder="Nombre" aria-describedby="helpId"/>
              <small id="helpId" className="text-muted">cédula</small>
            </div>
            <div className="form-group">
              <input type="text" name="telefono_usuario" onChange={this.cambiodeValor} id="telefono_usuario" value={usuario.telefono_usuario} className="form-control" placeholder="Nombre" aria-describedby="helpId"/>
              <small id="helpId" className="text-muted">telefono</small>
            </div>
            <div className="form-group">
              <input type="mail" name="mail_usuario" id="mail_usuario" onChange={this.cambiodeValor} value={usuario.mail_usuario} className="form-control" placeholder="Correo" aria-describedby="helpId"/>
              <small id="helpId" className="text-muted">Correo</small>
            </div>
            <div className="btn-group" role="group" aria-label="">
                <button type="submit" className="btn btn-success">Actualizar</button>
                <Link type="button" className="btn btn-primary" to={"/"}>Cancelar</Link>
            </div>
            </form>
        </div>
    </div> );
    }
}
}
 
export default Editar;