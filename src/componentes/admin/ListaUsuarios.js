import React, { useEffect, useState } from 'react'


import { useStateValue } from '../../StateProvider'
import { actionTypes } from '../../reducer'

import CrudUsuarios from './CrudUsuarios'

import { auth, store } from '../../FirebaseConfig' //no es una dependencia, es un archivo que esta en el proyecto que me exporta AUTH


const ListaUsuarios = () => {

    const [usuario, setUsuario] = useState({ //defino objeto de tipo libro, que tiene los mismos datos con el que se creo en la BD
        id: 0,
        email: "",
        password: "",
        rol: "",
        nombre: "",
    })

    const [accion, setAccion] = useState(null)

    const [{ arrayUsuarios, modalCrudUsuarios, modalMensajeCorrecto }, dispatch] = useStateValue()


    const [busqueda, setBusqueda] = useState("")


    useEffect(() => {
        traerUsuarios()

        dispatch({
            type: actionTypes.SET_MODAL_CRUD_USUARIOS,
            modalCrudUsuarios: false
        })
    }, [])


    const traerUsuarios = async () => { //en esta funcion lleno el array con los datos de todos los libros que hay en la base de datos 

        const { docs } = await store.collection("roles-por-usuario").where("rol", "!=", "administrador").get()
        const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))
        dispatch({
            type: actionTypes.ADD_NEW_ARRAY_USUARIOS, //el tipo de accion que inyectamos en ala cada de datos es agregar al basket,
            arrayUsuarios: nuevoArray
        })
    }


    const modificarModalOperaciones = () => {
        dispatch({
            type: actionTypes.SET_MODAL_CRUD_USUARIOS,
            modalCrudUsuarios: true
        })
    }

    const modificarModalCorrecto = () => {
        dispatch({
            type: actionTypes.SET_MODAL_MENSAJE_CORRECTO,
            modalMensajeCorrecto: false
        })
    }

    return (
        <div className="container">

            <p className="titulosTabla">Lista Usuarios</p>
            <p className="mt-2">
                <h4>Buscar</h4>
                <form className="d-flex">
                    <input className="form-control me-2" type="Search" onChange={(e) => { setBusqueda(e.target.value) }} placeholder="Buscar por nombre" aria-label="Search"></input>
                </form>
            </p>
            <button
                onClick={(e) => (
                    modificarModalOperaciones(),
                    setAccion("Crea"),
                    setUsuario({
                        id: 0,
                        email: "",
                        password: "",
                        rol: "",
                        nombre: "",
                    })
                )}
                className="btn btn-success">
                Nuevo Usuario
            </button>
            {
                modalMensajeCorrecto ?
                    (
                        <div className="alert alert-success alert-dismissible mt-5" role="alert">
                            <strong>Muy bien!</strong> {"Usuario creado correctamente!!"}
                            <button type="button" className="btn btn-success" data-dismiss="alert" aria-label="Close" onClick={(e) => (modificarModalCorrecto())}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                    )
                    :
                    (
                        <span></span>
                    )

            }
            <div className="card card-body" style={{ borderBlockColor: "black" }}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td className="titulosTabla">Email</td>
                            <td className="titulosTabla">Rol</td>
                            <td className="titulosTabla">Nombre</td>
                            <td className="titulosTabla">Operaciones</td>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            arrayUsuarios.filter(usu => usu.nombre.toLowerCase().includes(busqueda.toLocaleLowerCase())).map((usuarioFiltrado) => (
                                <tr key={usuarioFiltrado.id}>
                                    <td>{usuarioFiltrado.email}</td>
                                    <td>{usuarioFiltrado.rol}</td>
                                    <td>{usuarioFiltrado.nombre}</td>

                                    <td>
                                        <button onClick={(e) => ((setUsuario(usuarioFiltrado)), modificarModalOperaciones(), setAccion("Edita"))} className="btn btn-primary">Editar </button>
                                        <button onClick={(e) => ((setUsuario(usuarioFiltrado)), modificarModalOperaciones(), setAccion("Borra"))} className="btn btn-danger" >Borrar</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>


            {
                modalCrudUsuarios ?
                    (
                        <CrudUsuarios usuario={usuario} accion={accion}></CrudUsuarios>
                    )
                    :
                    (
                        <span></span>
                    )
            }




        </div>
    )
}

export default ListaUsuarios;