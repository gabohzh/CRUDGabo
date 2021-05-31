import React from 'react';
import {Link} from "react-router-dom";

class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            nombre:"",
            cedula:"",
            telefono:"",
            correo:""
        }
    }

    cambiodeValor= (e) =>{
    const state=this.state;
    state[e.target.name]=e.target.value;
    this.setState({ state});
    }

    enviarDatos = (e) =>{
        e.preventDefault();
        console.log("Formulario enviado...");
        const{nombre,cedula,telefono,correo}=this.state;
        console.log(nombre);
        console.log(cedula);
        console.log(telefono);
        console.log(correo);
        var datosEnviar = {nombre:nombre,cedula:cedula,telefono:telefono,correo:correo};

        fetch("http://localhost/usuarios/?insertar=1",{
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
    

    render() { 
        const{nombre,cedula,telefono,correo}=this.state;

        return ( 
            <div className="card">
                <div className="card-header">
                    Insertar nuevo Usuario
                </div>
                <div className="card-body">
                    <form onSubmit={this.enviarDatos}>
                    <div className="form-group">
                      <input type="text" name="nombre" onChange={this.cambiodeValor} id="nombre" value={nombre} className="form-control" placeholder="Nombre" aria-describedby="helpId"/>
                      <br></br>
                    </div>
                    <div className="form-group">
                      <input type="text" name="cedula" onChange={this.cambiodeValor} id="cedula" value={cedula} className="form-control" placeholder="Cédula" aria-describedby="helpId"/>
                      <br></br>
                    </div>
                    <div className="form-group">
                      <input type="text" name="telefono" onChange={this.cambiodeValor} id="telefono" value={telefono} className="form-control" placeholder="Teléfono" aria-describedby="helpId"/>
                      <br></br>
                    </div>
                    <div className="form-group">
                      <input type="mail" name="correo" id="correo" onChange={this.cambiodeValor} value={correo} className="form-control" placeholder="Correo" aria-describedby="helpId"/>
                      <br></br>
                    </div>
                    <div className="btn-group" role="group" aria-label="">
                        <button type="submit" className="btn btn-success">Guardar</button>
                        <Link type="button" className="btn btn-primary" to={"/"}>Cancelar</Link>
                    </div>
                    </form>
                </div>
            </div>
         );
    }
}
 
export default Crear;