import React, { useState, useEffect } from 'react'

import Documento2 from '../Documento2'

import Grid from '@material-ui/core/Grid';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';



import { actionTypes } from '../../reducer'
import { useStateValue } from '../../StateProvider'


import { auth, store } from '../../FirebaseConfig' //no es una dependencia, es un archivo que esta en el proyecto que me exporta AUTH


const MisDocumentos = () => {

    // const arrayDocumentos = [
    //     {
    //         id: 1,
    //         anioCursada: 1,
    //         idProfesor: "",
    //         nombreProfesor: "Damian Santos",
    //         titulo: "Lean Inception",
    //         carrera: "Informatica",
    //         materia: "Introduccion a la computacion",
    //         descripcion: "PDF para entender el significado de los conceptos vistos en la materia de proyecto de software",
    //         url: "https://core.ac.uk/download/pdf/46534546.pdf"
    //     },

    //     {
    //         id: 12,
    //         anioCursada: 3,
    //         idProfesor: "",
    //         nombreProfesor: "Hernan Merlino",
    //         titulo: "Redes neuronales",
    //         carrera: "Licenciatura en Sistemas",
    //         materia: "Programacion concurrente",
    //         descripcion: "PDF para entender el significado de los conceptos vistos en la materia de proyecto de software",
    //         url: "http://historiapolitica.com/datos/biblioteca/palermo3.pdf"
    //     },

    //     {
    //         id: 3,
    //         anioCursada: 4,
    //         idProfesor: "",
    //         nombreProfesor: "Luis Millan",
    //         titulo: "Geometria 4",
    //         carrera: "Ingenieria nuclear",
    //         materia: "Geometria en la luna",
    //         descripcion: "PDF para entender el significado de los conceptos vistos en la materia de proyecto de software",
    //         url: "https://www.redalyc.org/pdf/5215/521552316012.pdf"
    //     },

    //     {
    //         id: 4,
    //         anioCursada: 5,
    //         idProfesor: "",
    //         nombreProfesor: "Laura Fernandez",
    //         titulo: "Plantas canabicas",
    //         carrera: "Botanica",
    //         materia: "Introduccion a las plantas",
    //         descripcion: "PDF para entender el significado de los conceptos vistos en la materia de proyecto de software",
    //         url: "https://www.mininterior.gov.ar/agn/pdf/PERON.pdf"
    //     },

    // ]

    const [{ emailUsuario, nombreUsuario, arrayDocumentos, modalMensajeCorrecto }, dispatch] = useStateValue()

    const [documento, setDocumento] = useState({
        //id: "",
        anioCursada: 0,
        idProfesor: emailUsuario,
        nombreProfesor: nombreUsuario,
        titulo: "",
        carrera: "",
        materia: "",
        descripcion: "",
        url: "",
    })

    //const [operacion, setOperacion] = useState("")


    useEffect(() => { //esta funcion trae todas las palabras, las seteamos en el array y el array lo pasamos al estado de PALABRAS

        const llevarArray = async () => {//es una peticion asincrona, es una promesa que genera un hilo independiente al principal de ejecucion
            const { docs } = await store.collection("documentos").where("idProfesor", "==", emailUsuario).get() //esto da como resultado un objeto. por eso DOCS lo pongo asi y no normal. es lo mismo que. const respuesta = ...; y luego acceder como respuesta.docs, te ahorras eso porque docs es una propiedad de la respuesta

            const nuevoArray = docs.map(item => ({
                id: item.id, ...item.data()
            }))//por cada mapeo, se devuelve un objeto. primero ID, de la iteracion, del puntero que apunta a esa seccion. segunda, dentro de la propiedad DATA viajan muchos campos, y los ...(RES) basicamente guarda todo igual que como viene en DATA 

            dispatch({
                type: actionTypes.ADD_ARRAY, //usamos la funcion ADD_ARRAY que guarda un array entero directamente, como si fuera una variable booleana
                arrayDocumentos: nuevoArray
            })
        }



        llevarArray() //antes de terminar USSEEFECT, llamo a la constante que creamos
    }, [])



    const [busqueda, setBusqueda] = useState("")


    const [nuevoDocumento, setNuevoDocumento] = useState(false)

    const agregarDocumento = () => {
        setNuevoDocumento(!nuevoDocumento)
    }


    
    const modificarModalCorrecto = () => {
        dispatch({
            type: actionTypes.SET_MODAL_MENSAJE_CORRECTO,
            modalMensajeCorrecto: false
        })
    }

    return (
        <div className="container">

            <p className="mt-4">
                <h4>Buscar</h4>
                <form className="d-flex">
                    <input className="form-control me-2" type="Search" onChange={(e) => { setBusqueda(e.target.value) }} placeholder="Buscar por nombre del documento" aria-label="Search"></input>
                </form>
            </p>
            <h1 className="botonAgregar" >
                <button type="submit" className="btn btn-success" onClick={agregarDocumento}>Agregar</button>
            </h1>

            {
                nuevoDocumento ?
                    (

                        <div> <Documento2 accion="Crea" document={documento} ></Documento2> </div>
                    )
                    :
                    (
                        <span></span>
                    )
            }

            {
                modalMensajeCorrecto ?
                    (
                        <div className="alert alert-success alert-dismissible mt-5" role="alert">
                            <strong>Muy bien!</strong> {"Documento creado correctamente!!"}
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

            <Grid container spacing={5}> {/* spacing es como el pading entre los cards */}
                {
                    arrayDocumentos.filter( doc => doc.titulo.toLowerCase().includes(busqueda.toLowerCase()) ) .map(filteredDocumento =>(
                        <Grid item xs={12} sm={6} md={4} lg={3}>{/* cuando sea pequeño que ocupe todo, un poco mas grande solo la mitad de la tarjeta, un poco mas grande que cada tarjeta ocupe 1/3 de la pantalla, cuando sea grande que cada tarjeta ocupe 1/4 de la pantalla              este breakpoint dice que pase lo que pae con el tamaño de la resolucion, este card ocupa toda la columna igual .  XS extra small, SM small. el numero es la cantidad e columnas  -  poniendole a todos lo mismo todos se comportan igual*/}

                            <Documento2 key={filteredDocumento.id} idDoc={filteredDocumento.id} document={filteredDocumento} accion="mostrar" /> {/* le pasamos el identificador unico y el objeto completo*/}

                        </Grid>
                    ))
                }
            </Grid>

        </div>
    )
}

export default MisDocumentos
