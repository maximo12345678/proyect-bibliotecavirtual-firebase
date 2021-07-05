import React, {useEffect} from 'react'
import Login from './Login'

import '../styles.css'

import { actionTypes } from '../reducer'
import { useStateValue } from '../StateProvider'

import Documentos from './alumno/Documentos'

import MisDocumentos from './profesor/MisDocumentos'
import ListaUsuarios from './admin/ListaUsuarios'


const Inicio = () => {

    const [{ emailUsuario, rolUsuario, idUsuario }, dispatch] = useStateValue();//hacer el destructory para obtener el basket que ahora esta vacio, y la funcion dispatch que usamos para despachar los datos


    return (
        <div className="container"> 
            {
                
                emailUsuario ?//puedo usar este inicio para admin, profe y alumno, o puedo crear un Inicio en cada carpeta distinta. por ahora hago solo alumno aca
                (   
                    rolUsuario == "Alumno" ?
                    (
                        <div>
                            <h1>Lista de documentos</h1>
                            <Documentos></Documentos>
                        </div>
                    )
                    :
                    rolUsuario == "Profesor" ?
                    (
                        <div>
                            <h2>Mis documentos</h2>
                            <MisDocumentos></MisDocumentos>
                        </div>
                        
                    )
                    :
                    (
                        <div>
                            <h2 className="texto">Bienvenido admin, aca vas a poder dar de alta profesores o alumnos, indicando que rol y nombre tiene cada uno!</h2>
                            <ListaUsuarios></ListaUsuarios>
                        </div>
                    )

                )
                :
                (
                    <div>
                        <h1 className="titulo2">BIBLIOTECA VIRTUAL UNLA</h1>
                        <p className="texto">Inicia tu sesion como <b>profesor</b> o <b>alumno</b> para poder interactuar con </p>
                        <p className="texto"> la biblioteca virtual de la <b>Universidad Nacional de Lanus !!</b></p>
                        <Login></Login>
                    </div>
                )


               
            }
        </div>
    )
}

export default Inicio