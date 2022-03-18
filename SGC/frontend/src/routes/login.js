import React from "react";

let styles = "wrapper fadeInDown";
let si = true;

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.change = this.change.bind(true);
  }

  change() {
    if (si) {
      styles = "wrapper fadeOutRight";
    } else {
      styles = "wrapper fadeInDown";
    }
  }
  render() {
    return (
      <div>
        <h1> Sistema Gestor del Curso SGC </h1>
        <div className={styles}>
          <div id="content">
            <h2 className="fadeIn primero"> Login </h2>
            {/* Icon */}
            {/* <div className="fadeIn primero">
              <img
                src="https://scontent.fgdl2-1.fna.fbcdn.net/v/t31.18172-8/11415515_1626272620947559_1344912965730173353_o.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeGiRBEvI6e8B8Zc_vSeGlA87kDVEKQyy-LuQNUQpDLL4qZqgH1WLv8crm6c_Ghwe4bzz1CfkIazmk-HOWuYC4Ce&_nc_ohc=KXYN90cb0TcAX82oAXO&tn=4tO1QzYJ41-ZpZDc&_nc_ht=scontent.fgdl2-1.fna&oh=00_AT-mFS1fDoCDEjBrM1VgBDOfcIulQwFNKluPAJ4DXBy3EQ&oe=621FBAFB"
                id="icon"
                alt="Imagen perfil"
              />
            </div> */}
            <form>
              <div className="group fadeIn segundo">
                <input
                  type="text"
                  id="login"
                  name="login"
                  required
                />
                <span className="highlight"></span>
                <span className="bottomBar"></span>
                <label>Usuario</label>
              </div>

              <div className="group fadeIn tercero">
                <input
                  type="password"
                  id="password"
                  name="login"
                  required
                />
                <span className="highlight"></span>
                <span className="bottomBar"></span>
                <label>Contrasena</label>
              </div>
              <input
                type="submit"
                className="fadeIn cuarto"
                value="Log In"
                onClick={this.change}
              />
            </form>
          </div>
          <div id="footer">
            <a className="underlineHover" href="#">
              Olvidaste la Contrasena
            </a>
          </div>
        </div>
      </div>
    );
  }
}

