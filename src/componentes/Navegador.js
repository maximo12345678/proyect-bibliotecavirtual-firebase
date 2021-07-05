import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { actionTypes } from '../reducer'
import { useStateValue } from '../StateProvider'

import logo from '../img/logaso.png'

import '../styles.css'
import { auth } from '../FirebaseConfig'


const Navegador = () => {

    const [{emailUsuario, rolUsuario, nombreUsuario, }, dispatch] = useStateValue()

    const history = useHistory()



    const cerrarSesion = () =>{
        //auth.signOut()
        dispatch({
            type: actionTypes.SET_EMAIL_USUARIO,
            emailUsuario: null,
        })
        dispatch({
            type: actionTypes.SET_NOMBRE_USUARIO,
            nombreUsuario: null
        })
        dispatch({
            type: actionTypes.SET_ROL_USUARIO,
            rolUsuario: null
        })
        history.push("/")   
    }





    return (
        <div>
            <nav className="nav-main">
                <a href="#">
                    <img src={logo} alt="Logo UNLA" className="nav-brand"></img>
                </a>

                <ul className="nav-menu"><h2><b>Hola</b> {emailUsuario ? rolUsuario + " " + nombreUsuario : "invitado!"} </h2></ul>


                    {
                        emailUsuario == null ?
                        (
                            <ul className="nav-menu">
                                <li>
                                    <a><Link to="/">Inicio</Link></a>
                                </li>
                            </ul>
                        )
                        :
                        rolUsuario == "Alumno" ?
                        (
                            <ul className="nav-menu">
                                <li>
                                    <a><Link to="/">Inicio</Link></a>
                                </li>
                                {/* <li>
                                    <a><Link to="/">Favoritos</Link></a>
                                </li> */}
                                <li>
                                    <button type="submit" className="btn btn-primary" onClick={cerrarSesion}>Cerrer sesion</button>
                                </li>
                            </ul>
                        )
                        :
                        rolUsuario == "Profesor" ?
                        (
                            <ul className="nav-menu">
                                <li>
                                    <a><Link to="/">Inicio</Link></a>
                                </li>
                                {/* <li>
                                    <a><Link to="/">Subir documento</Link></a>
                                </li>
                                <li>
                                    <a><Link to="/">Editar documento</Link></a>
                                </li>
                                <li>
                                    <a><Link to="/">Borrar documento</Link></a>
                                </li> */}
                                <li>
                                    <button type="submit" className="btn btn-primary" onClick={cerrarSesion}>Cerrer sesion</button>
                                </li>
                            </ul>
                        )
                        :
                        rolUsuario == "administrador" ?
                        (
                            <ul className="nav-menu">
                                <li>
                                    <a><Link to="/">Inicio </Link></a>
                                </li>
                                {/* <li>
                                    <a><Link to="/">Crear usuario</Link></a>
                                </li>
                                <li>
                                    <a><Link to="/">Actualizar usuario</Link></a>
                                </li>
                                <li>
                                    <a><Link to="/">Eliminar usuario</Link></a>
                                </li> */}
                                <li>
                                    <button type="submit" className="btn btn-primary" onClick={cerrarSesion}>Cerrer sesion</button>
                                </li>
                            </ul>
                        )
                        :
                        (
                            <span></span>
                        )

                    }

            </nav>
        </div>
    )
}

export default Navegador