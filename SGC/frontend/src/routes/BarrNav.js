import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            collapsed: false,
            username: '',
            email: '',
        };

        this.showingMenu = this.showingMenu.bind(this);
        this.responseHandler = this.responseHandler.bind(this);
    }
    toggleMenu = (event) => {
        let sidebar = document.querySelector(".sidebar");
        sidebar.classList.toggle("close");
        //this.setState({
        //    collapsed: !this.state.collapsed,
        //})
    }

    changeRotulo = (rotulo) => {
        this.setState({
            rotulo: rotulo,
        });
    }

    showingMenu(event) {
        let arrowParent = event.target.parentElement.parentElement;
        arrowParent.classList.toggle("showMenu");
    }

    responseHandler() {
        let msg = this.state.msg;
        if (msg === 'Salir') {
            return <Link to="/" />
        } else if (msg) {
            return <p>Issa porra</p>
        }
    }



    render() {
        let afterResponse = this.responseHandler();
        return (
            <div>
                {afterResponse}
                <img id='bg' className='bg' src='https://cdguzman.tecnm.mx/pag/img/galeria/itcg/IMG_4756.JPG' alt='' />
                <div className="sidebar close">
                    <div className="logo-details">
                        <Link to="/admin/home">
                            {/* <i className='bx bx-store' ></i> */}
                            {/* <img src='/home/vrvg/Documents/SGCFRONT/fron/src/itcg.jpg'></img> */}
                            <i className='bx bxs-school'></i>
                        </Link>
                        <span className="logo_name">SGC</span>
                    </div>
                    <ul className="nav-links">
                        <li>
                            <Link to="/admin/usuarios">
                                <div className="iocn-link">
                                    <a>
                                        <i className='bx bx-user-circle' ></i>
                                        <span className="link_name">Usuarios</span>
                                    </a>
                                    <i
                                        className='bx bxs-chevron-down arrow'
                                        onClick={e => this.showingMenu(e)} >
                                    </i>
                                </div>
                            </Link>
                            <ul className="sub-menu">
                                <li><a className="link_name">Usuarios</a></li>
                                <Link to="/admin/usuarios"><li>Usuarios</li></Link>
                            </ul>
                        </li>
                        
                        <li>
                            <div className="iocn-link">
                                <a>
                                    <i className='bx bx-line-chart' ></i>
                                    <span className="link_name">Reportes</span>
                                </a>
                                <i
                                    className='bx bxs-chevron-down arrow'
                                    onClick={e => this.showingMenu(e)} >
                                </i>
                            </div>
                            <ul className="sub-menu">
                                <li><a className="link_name">Reportes</a></li>
                                <Link to="/admin/reportes/admin"><li>Admin</li></Link>
                                <Link to="/admin/reportes/check"><li>Check</li></Link>
                            </ul>
                        </li>

                        <li>
                            <Link to="/admin/materias" className="iocn-link">
                                <div className="iocn-link">
                                    <a>
                                        <i className='bx bx-book' ></i>
                                        <span className="link_name">Materias</span>
                                    </a>
                                    <i
                                        className='bx bxs-chevron-down arrow'
                                        onClick={e => this.showingMenu(e)} >
                                    </i>
                                </div>
                            </Link>
                            <ul className="sub-menu">
                                <li><a className="link_name">Materias</a></li>
                                <Link to="/admin/materias"><li>Materias</li></Link>
                            </ul>
                        </li>

                        <li>
                            <Link to="/admin/carreras" className="iocn-link">
                                <div className="iocn-link">
                                    <a>
                                        <i className='bx bxs-file-blank'></i>
                                        <span className="link_name">Carreras</span>
                                    </a>
                                    <i
                                        className='bx bxs-chevron-down arrow'
                                        onClick={e => this.showingMenu(e)} >
                                    </i>
                                </div>
                            </Link>
                            <ul className="sub-menu">
                                <li><a className="link_name">Carreras</a></li>
                                <Link to="/admin/carreras"><li>Carreras</li></Link>
                            </ul>
                        </li>

                        <li>
                            <Link to="/admin/exportardatos" className="iocn-link">
                                <div className="iocn-link">
                                    <a>
                                        <i className='bx bxs-file-export' ></i>
                                        <span className="link_name">Exporta Datos</span>
                                    </a>
                                    <i
                                        className='bx bxs-chevron-down arrow'
                                        onClick={e => this.showingMenu(e)} >
                                    </i>
                                </div>
                            </Link>
                            <ul className="sub-menu">
                                <li><a className="link_name">Exporta Datos</a></li>
                                <Link to="/admin/exportardatos"><li>Exporta Datos</li></Link>
                            </ul>
                        </li>

                        <li>
                            <Link to="/admin/Respadoyrestauraciones" className="iocn-link">
                                <div className="iocn-link">
                                    <a>
                                        <i className='bx bx-save' ></i>
                                        <span className="link_name">Respaldos y Restauraciones</span>
                                    </a>
                                    <i
                                        className='bx bxs-chevron-down arrow'
                                        onClick={e => this.showingMenu(e)} >
                                    </i>
                                </div>
                            </Link>
                            <ul className="sub-menu">
                                <li><a className="link_name">Respaldos y Restauraciones</a></li>
                                <Link to="/admin/Respadoyrestauraciones"><li>Respaldos y Restauraciones</li></Link>
                            </ul>
                        </li>

                        <li>
                            <div className="profile-details">
                                <Link to="#">
                                    <div className="profile-content">
                                        <img src={"/static/images.jpg"} alt="profileImg" />
                                    </div>
                                </Link>
                                {/* <div className="name-job">
                                    <div className="profile_name">{this.state.username}</div>
                                    <div className="job">{this.state.email}</div>
                                </div> */}
                                <i
                                    className='bx bx-log-out'
                                >
                                </i>
                            </div>
                        </li>
                    </ul>
                </div>
                <section className="home-section">
                    <div className="home-content">
                        <i className='bx bx-menu' onClick={(e) => this.toggleMenu(e)}></i>
                        <span className="text">{this.state.rotulo}</span>
                        {/* Ver si se puede cambiar inicio dependiendo de donde este */}
                    </div>
                </section>
                <Outlet />
            </div>
        );
    }
}