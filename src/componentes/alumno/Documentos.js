import React, { useState, useEffect } from 'react'

import Documento2 from '../Documento2'

import Grid from '@material-ui/core/Grid';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';

import { actionTypes } from '../../reducer'
import { useStateValue } from '../../StateProvider'

import { auth, store } from '../../FirebaseConfig' //no es una dependencia, es un archivo que esta en el proyecto que me exporta AUTH

const Documentos = () => {

    const [{ emailUsuario, rolUsuario, nombreUsuario, modalCrearYEditarDocumento }, dispatch] = useStateValue()

    const [documento, setDocumento] = useState({
        id: "",
        anioCursada: 0,
        idProfesor: "",
        nombreProfesor: "",
        titulo: "",
        carrera: "",
        materia: "",
        descripcion: "",
        url: "",
    })


    const [arrayDocumentos, setArrayDocumentos] = useState([documento])


    useEffect(() => { //esta funcion trae todas las palabras, las seteamos en el array y el array lo pasamos al estado de PALABRAS

        const llevarArray = async () => {//es una peticion asincrona, es una promesa que genera un hilo independiente al principal de ejecucion
            const { docs } = await store.collection("documentos").get() //esto da como resultado un objeto. por eso DOCS lo pongo asi y no normal. es lo mismo que. const respuesta = ...; y luego acceder como respuesta.docs, te ahorras eso porque docs es una propiedad de la respuesta

            const nuevoArray = docs.map(item => ({
                id: item.id, ...item.data()
            }))//por cada mapeo, se devuelve un objeto. primero ID, de la iteracion, del puntero que apunta a esa seccion. segunda, dentro de la propiedad DATA viajan muchos campos, y los ...(RES) basicamente guarda todo igual que como viene en DATA 

            //nuevoArray.sort()

            setArrayDocumentos(nuevoArray) //el array de PALABRAS del estado, lo seteamos con el nuevo array que generamos. luego lo mostramos en el listado mapeandolo
        }



        llevarArray() //antes de terminar USSEEFECT, llamo a la constante que creamos
    }, [])



    const [busqueda, setBusqueda] = useState("")

    const [filtroCarrera, setFiltroCarrera] = useState("")
    const [filtroProfesor, setFiltroProfesor] = useState("")
    const [filtroMateria, setFiltroMateria] = useState("")



    return (
        <div className="container">

            <p className="mt-4">
                <h4>Buscar</h4>
                <form className="d-flex">
                    <input className="form-control me-2" type="Search" onChange={(e) => { setBusqueda(e.target.value) }} placeholder="Buscar por nombre del documento" aria-label="Search"></input>
                </form>
            </p>

            {/*EN ESTA PARTE, CUANDO EN LA LISTA DESPLEGABLE ELIGEN UN FILTRO O UN ORDENAMIENTO, APENAS SE ELIGUE SE ACTUALIZA LA TABLA AUTOMATICAMENTE */}


            <h4 className="mt-4">Filtrar</h4>
            <div className="card  ">
                <div className="card-body">
                    <div className="row">
                        {/* <div className="col-md-6">
                            <b><label>Ordenar por:</label></b>
                            <select className="form-control">  
                                <option disabled="">Seleccione una opcion</option>
                                <option className="form-control" aria-label="Server" value="publica">A - Z</option>
                                <option className="form-control" aria-label="Server" value="publica">Z - A</option>
                            </select>
                        </div> */}

                        <div className="col-md-4">
                            <b><label>Filtrar por Carrera</label></b>
                            <input type="text" className="form-control" placeholder="Escriba el nombre de un Carrera" onChange={(e) => { setFiltroCarrera(e.target.value) }} ></input>
                        </div>

                        <div className="col-md-4">
                            <b><label>Filtrar por Materia</label></b>
                            <input type="text" className="form-control" placeholder="Escriba el nombre de una Materia" onChange={(e) => { setFiltroMateria(e.target.value) }} ></input>
                        </div>

                        <div className="col-md-4">
                            <b><label>Filtrar por Profesor</label></b>
                            <input type="text" className="form-control" placeholder="Escriba el nombre de un Profesor" onChange={(e) => { setFiltroProfesor(e.target.value) }} ></input>
                        </div>


                    </div>

                </div>
            </div>

            <br></br>
            {/* COMENTAR */}

            <Grid container spacing={4}> {/* spacing es como el pading entre los cards */}

                {
                    arrayDocumentos.filter( documento => 
                    documento.titulo.toLowerCase().includes(busqueda.toLowerCase()) &&  
                    documento.carrera.toLowerCase().includes(filtroCarrera.toLowerCase()) &&
                    documento.materia.toLowerCase().includes(filtroMateria.toLowerCase()) &&
                    documento.nombreProfesor.toLowerCase().includes(filtroProfesor.toLowerCase()) 

                    ).map(filteredDocumento => (
                        <Grid item xs={12} sm={6} md={4} lg={3}>{/* cuando sea pequeño que ocupe todo, un poco mas grande solo la mitad de la tarjeta, un poco mas grande que cada tarjeta ocupe 1/3 de la pantalla, cuando sea grande que cada tarjeta ocupe 1/4 de la pantalla              este breakpoint dice que pase lo que pae con el tamaño de la resolucion, este card ocupa toda la columna igual .  XS extra small, SM small. el numero es la cantidad e columnas  -  poniendole a todos lo mismo todos se comportan igual*/}
                            <Documento2 key={filteredDocumento.id} document={filteredDocumento} accion="mostrar" /> {/* le pasamos el identificador unico y el objeto completo*/}
                        </Grid>
                    ))
                }

                {/* arrayDocumentos.filter( documento => documento.titulo.toLowerCase().includes(busqueda.toLowerCase()) || documento.carrera.toLowerCase().includes(busqueda.toLowerCase()) || documento.materia.toLowerCase().includes(busqueda.toLowerCase()) || documento.nombreProfesor.toLowerCase().includes(busqueda.toLowerCase()) ).map(filteredDocumento =>( */}

            </Grid>



        </div>
    )
}

export default Documentos

