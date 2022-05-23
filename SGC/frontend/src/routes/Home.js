import React, {useContext} from "react";
import { AuthContext } from "./helpers/Auth/auth-context.js";
const Home = () => {
  let auth = useContext(AuthContext);
  return (
    <div>
      {console.log(auth)}
      <h1>Bienvenido al Sistema Gestor del Curso</h1>
      <p>
        Todo que puede no se cumplan
      </p>
    </div>
  );
}

export default Home;