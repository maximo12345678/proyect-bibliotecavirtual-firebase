import React, { useState } from 'react'
import { Button, ModalHeader, Modal, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'

import { useStateValue } from '../../StateProvider'
import { actionTypes } from '../../reducer'

import { auth, store } from '../../FirebaseConfig' //no es una dependencia, es un archivo que esta en el proyecto que me exporta AUTH

//import md5 from 'md5'

const CrudUsuarios = (props) => {

    const [usuario, setUsuario] = useState({ //defino objeto de tipo libro, que tiene los mismos datos con el que se creo en la BD
        id: props.usuario.id,
        email: props.usuario.email,
        password: props.usuario.password,
        rol: props.usuario.rol,
        nombre: props.usuario.nombre,
    })


    // capturar los datos en el evento change de los input, si ponemos a los input el mismo nombre de los campos con un solo evento, asignamos a todos los valores 
    const handleChange = e => {
        const { name, value } = e.target
        setUsuario({ ...usuario, [name]: value })
    }

    const [{ modalCrudUsuarios, arrayUsuarios, emailUsuario, modalMensajeCorrecto }, dispatch] = useStateValue()

    const modificarModalCrudUsuarios = () => {

        dispatch({
            type: actionTypes.SET_MODAL_CRUD_USUARIOS,
            modalCrudUsuarios: false
        })
    }


    const actualizarArray = async () => { //en esta funcion lleno el array con los datos de todos los libros que hay en la base de datos 

        const { docs } = await store.collection("roles-por-usuario").where("rol", "!=", "administrador").get()
        const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))
        dispatch({
            type: actionTypes.ADD_NEW_ARRAY_USUARIOS, //el tipo de accion que inyectamos en ala cada de datos es agregar al basket,
            arrayUsuarios: nuevoArray
        })
    }

    const validacionesDatos = () => {
        if (!usuario.email.trim()) {
            setMsjError("El campo 'email' esta vacio!!")
            modificarModalError()
            return
        }
        else if (!usuario.nombre.trim()) {
            setMsjError("El campo 'nombre' esta vacio!!")
            modificarModalError()
            return
        }
        else if (!usuario.password.trim()) {
            setMsjError("El campo 'contraseña' esta vacio!!")
            modificarModalError()
            return
        }
        else if (!usuario.rol.trim()) {
            setMsjError("El campo 'rol' esta vacio!!")
            modificarModalError()
            return
        }

        else {
            return true
        }
    }


    const [msjError, setMsjError] = useState("")
    const [modalError, setModalError] = useState(false)
    const modificarModalError = () => {
        setModalError(!modalError)
    }


    const modificarModalCorrecto = () => {
        dispatch({
            type: actionTypes.SET_MODAL_MENSAJE_CORRECTO,
            modalMensajeCorrecto: true
        })
    }


    const agregarOEditarUsuario = async () => {

        let validaciones = validacionesDatos()

        // q no meta eemails iguales

        if (validaciones == true) {


            const newUsuario = {
                nombre: usuario.nombre,
                rol: usuario.rol,
                email: usuario.email,
                password: usuario.password,
            }

            await store.collection("roles-por-usuario").doc(usuario.email).set(newUsuario)
                .then(r => {
                    modificarModalCorrecto()
                    actualizarArray()
                    modificarModalCrudUsuarios()
                })
                .catch(error => {
                    console.log(error)
                })



        }

    }



    //cuando borras un usuario, tambien hay que borrar todos los documentos subidos por ese profesor 
    const borrarUsuario = async () => {

        await store.collection("roles-por-usuario").doc(usuario.email).delete()
            .then(r => {

            })
            .catch(error => {
                console.log(error)
            })

        const { docs } = await store.collection("documentos").where("idProfesor", "==", usuario.email).get() //esto da como resultado un objeto. por eso DOCS lo pongo asi y no normal. es lo mismo que. const respuesta = ...; y luego acceder como respuesta.docs, te ahorras eso porque docs es una propiedad de la respuesta

        const listaDocumentos = docs.map(item => ({
            id: item.id, ...item.data()
        }))


        listaDocumentos.map((doc, posicion) => {

            store.collection("documentos").doc(doc.id).delete()
        })

        actualizarArray()
        modificarModalCrudUsuarios()

    }




    const guardarDatos = () => {


        if (props.accion == "Crea") {
            agregarOEditarUsuario()
        }
        else if (props.accion == "Edita") {
            agregarOEditarUsuario()
        }
    }

    return (
        <div>
            {/* <h1>Inicio</h1>   CON ESTO DEMOSTRAS COMO ENTRA AL COMPONENTE, ABRE LA MODAL, Y CUANDO CERRAS LA MODAL SE DESAPARECE ESTE H1, OSEA SE VA DE ESTE COMPONENTE*/}
            {
                <Modal isOpen={modalCrudUsuarios}>

                    {
                        props.accion == "Crea" || props.accion == "Edita" ?
                            (
                                <div>
                                    <ModalHeader>
                                        {props.accion} un usuario !!
                                    </ModalHeader>
                                    <ModalBody>
                                        <FormGroup>
                                            <label>Email</label>
                                            <Input type="text" placeholder="Email del usuario" value={usuario.email} name="email" onChange={handleChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <label className="mt-4">Rol</label>
                                            <select className="form-control" name="rol" value={usuario.rol} onChange={handleChange}>
                                                <option disabled="">Seleccione una opcion</option>
                                                <option className="form-control" aria-label="Server" value="Profesor">Profesor</option>
                                                <option className="form-control" aria-label="Server" value="Alumno">Alumno</option>
                                            </select>
                                        </FormGroup>
                                        <FormGroup>
                                            <label className="mt-4"> Nombre y Apellido</label>
                                            <Input type="text" placeholder="Nombre completo del usuario" value={usuario.nombre} name="nombre" onChange={handleChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <label className="mt-4"> Contraseña</label>
                                            <Input type="password" placeholder="Contraseña del usuario" value={usuario.password} name="password" onChange={handleChange} />
                                        </FormGroup>
                                    </ModalBody>

                                    {
                                        modalError ?
                                            (
                                                <div className="alert alert-danger alert-dismissible mt-5" role="alert">
                                                    <strong>Error!</strong> {msjError}
                                                    <button type="button" className="btn btn-danger" data-dismiss="alert" aria-label="Close" onClick={modificarModalError}>
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>

                                            )
                                            :
                                            (
                                                <span></span>
                                            )

                                    }

                                    <ModalFooter>
                                        <Button color="primary" onClick={(e) => { guardarDatos(e) }} >Guardar usuario</Button>
                                        <Button color="secondary" onClick={modificarModalCrudUsuarios}> No </Button>
                                    </ModalFooter>

                                </div>
                            )
                            :
                            (
                                <div>
                                    <ModalHeader>
                                        Estas seguro de eliminar al usuario {usuario.nombre}?
                                    </ModalHeader>

                                    <ModalFooter>
                                        <Button color="primary" onClick={(e) => { borrarUsuario(e) }} >Si</Button>
                                        <Button color="secondary" onClick={modificarModalCrudUsuarios}> No </Button>
                                    </ModalFooter>
                                </div>
                            )
                    }

                </Modal>
            }

        </div>
    )
}

export default CrudUsuarios;