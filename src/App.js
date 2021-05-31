import './App.css';
import Listar from "./componentes/listar";
import Crear from "./componentes/crear";
import Editar from "./componentes/editar";
import { Route, BrowserRouter as Router } from "react-router-dom";
import {Link} from "react-router-dom";

function App() {
  return (
    <Router>
            <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="nav navbar-nav">
              <Link className="nav-item nav-link active" to={"/"}>Inicio</Link>
          </div>
      </nav>
    <div className="container">
      <br></br>
    <Route exact path="/" component={Listar}></Route>
    <Route path="/crear" component={Crear}></Route>
    <Route path="/editar/:id" component={Editar}></Route>
    </div>
    </Router>
  );
}

export default App;
