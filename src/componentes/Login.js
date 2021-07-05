import React, { useState } from 'react'

import '../styles.css'

import { useHistory } from 'react-router-dom'
import { auth, store } from '../FirebaseConfig' //no es una dependencia, es un archivo que esta en el proyecto que me exporta AUTH

import { actionTypes } from '../reducer'
import { useStateValue } from '../StateProvider'

import md5 from 'md5'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [msjError, setMsjError] = useState("")

    const history = useHistory()

    const [{ emailUsuario, rolUsuario, nombreUsuario }, dispatch] = useStateValue()

    const [modalError, setModalError] = useState(false)

    const modificarModalError = () => {
        setModalError(!modalError)
    }



    const iniciarSesion = async (e) => {
        // VALIDAR CAMPOS VACIOS Y QUE EL EMAIL NO EXISTA YA
        e.preventDefault()

        let newUsuario = {
            nombre: "",
            rol: "",
            email: "",
            password: "",
        } 


        const { docs } = await store.collection("roles-por-usuario").get()
        const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))

        let  bandera = false

        nuevoArray.map( (user, posicion) => {
            if (user.email == email){
                if (user.password == password){
                    newUsuario = user;
                    bandera = true;
                    return;
                }
            }
        })


        if (bandera == true){
            dispatch({
                type: actionTypes.SET_EMAIL_USUARIO,
                emailUsuario: email,
            })
            dispatch({
                type: actionTypes.SET_NOMBRE_USUARIO,
                nombreUsuario: newUsuario.nombre
              })
              dispatch({
                type: actionTypes.SET_ROL_USUARIO,
                rolUsuario: newUsuario.rol
              })
        }
        else{
            <div>
                <h4>Datos incorrectos</h4>
            </div>
        }

    


        // //nos conectamos al servicio de autentificacion de firebase
        // auth.signInWithEmailAndPassword(email, password)
        //     .then(
        //     (auth)=>history.push("/")
        //     )
        //     .catch( (err) => {
        //         if (err.code == "auth/wrong-password"){
        //             setMsjError("Contraseña incorrecta!")
        //             modificarModalError()
        //         }
        //     })
    }





    return (
        <div className="container">
            <div className="login">
                <h2 className="titulo">Inicie sesion</h2>

                    <div className="card card-body">
                        <label><b>Email:</b></label>
                        <input type="text" placeholder="Ingrese su email" className="form-control" onChange={(e) => (setEmail(e.target.value))}></input>

                        <label className="mt-4"><b>Contraseña:</b></label>
                        <input type="password" placeholder="Ingrese su contraseña" className="form-control" onChange={(e) => (setPassword(e.target.value))}></input>

                        {
                            modalError ?
                                (
                                    <div className="alert alert-danger alert-dismissible mt-5" role="alert">
                                        <strong>Error!</strong> {msjError}
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={modificarModalError}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>

                                )
                                :
                                (
                                    <span></span>
                                )

                        }


                        <button type="submit" className="btn btn-primary mt-1" onClick={iniciarSesion}>Iniciar sesion</button>

                    </div>


            </div> 

        </div>
    )
}

export default Login