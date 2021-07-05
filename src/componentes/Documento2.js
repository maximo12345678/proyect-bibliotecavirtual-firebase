import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GetAppIcon from '@material-ui/icons/GetApp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DeleteIcon from '@material-ui/icons/Delete';

import { actionTypes } from '../reducer'
import { useStateValue } from '../StateProvider'

import EditIcon from '@material-ui/icons/Edit';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { auth, store } from '../FirebaseConfig' //no es una dependencia, es un archivo que esta en el proyecto que me exporta AUTH

import { useHistory } from 'react-router-dom'
import { ViewArraySharp } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),

    },

    // ESTILOS DE LA CARD DEL PRODUCTO 
    root: {
        maxWidth: 345,

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },

    // CREADOS POR MI
    botonStock: {
        marginLeft: theme.spacing(18)
    },
    unidadMedida: {
        marginLeft: theme.spacing(18)

    }


}));


const Documento2 = (props) => {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const history = useHistory()


    const [{ emailUsuario, rolUsuario, nombreUsuario, arrayDocumentos, modalMensajeCorrecto }, dispatch] = useStateValue()


    const [documento, setDocumento] = useState({
        //id: props.document.id,
        anioCursada: props.document.anioCursada,
        idProfesor: emailUsuario,
        nombreProfesor: nombreUsuario,
        titulo: props.document.titulo,
        carrera: props.document.carrera,
        materia: props.document.materia,
        descripcion: props.document.descripcion,
        url: props.document.url,
    })

    const [accion, setAccion] = useState(props.accion)


    const [modalDocumento, setModalDocumento] = useState(false)


    const [msjError, setMsjError] = useState("")

    const [modalError, setModalError] = useState(false)

    const modificarModalError = () => {
        setModalError(!modalError)
    }


    const handleChange = e => {
        const { name, value } = e.target
        setDocumento({ ...documento, [name]: value })
    }

    useEffect(() => {



        if (accion == "Crea" || accion == "Edita") {
            modifica()
            //alert(props.docId)

        }



    }, [])

    const modifica = () => {
        setModalDocumento(!modalDocumento)
    }


    const validacionesDatos = () => {
        if (!documento.titulo.trim()) {
            setMsjError("El campo 'titulo' esta vacio!!")
            modificarModalError()
            return
        }
        else if (documento.anioCursada <= 0) {
            setMsjError("El campo 'año cursada' esta vacio!!")
            modificarModalError()
            return
        }
        else if (!documento.carrera.trim()) {
            setMsjError("El campo 'carrera' esta vacio!!")
            modificarModalError()
            return
        }
        else if (!documento.materia.trim()) {
            setMsjError("El campo 'materia' esta vacio!!")
            modificarModalError()
            return
        }
        else if (!documento.url.trim()) {
            setMsjError("El campo 'url' esta vacio!!")
            modificarModalError()
            return
        }
        else {
            return true
        }
    }


    const guardardatos = async (e) => { //esta funcion se llama en el boton de guardar en el formulario, sea editar o crear


        e.preventDefault()
        let validaciones = validacionesDatos()

        if (validaciones == true) {


            if (accion == "Crea") {


                const newDocument = { //creo un nuevo objeto con lo mismo que el otro pero sin el ID, asi no lo subo ni edito con ID ya que ya tiene el generado por firebase
                    // id: documento.id,
                    anioCursada: documento.anioCursada,
                    idProfesor: emailUsuario,
                    nombreProfesor: nombreUsuario,
                    titulo: documento.titulo,
                    carrera: documento.carrera,
                    materia: documento.materia,
                    descripcion: documento.descripcion,
                    url: documento.url,
                }

                //limpiar objeto a null

                await store.collection("documentos").add(newDocument)
                    .then((docRef) =>
                        dispatch({
                            type: actionTypes.ADD_EN_ARRAY_DOCUMENTOS,
                            item: {
                                id: docRef.id,
                                anioCursada: newDocument.anioCursada,
                                idProfesor: emailUsuario,
                                nombreProfesor: nombreUsuario,
                                titulo: newDocument.titulo,
                                carrera: newDocument.carrera,
                                materia: newDocument.materia,
                                descripcion: newDocument.descripcion,
                                url: newDocument.url,
                            }
                        })

                        ,

                        modifica()

                        ,

                        modificarModalCorrecto()

                    )
                    .catch((e) =>
                        console.log(e)
                    )
            }
            if (accion == "Edita") {

                //alert(documento.materia)

                const newDocument = { //creo un nuevo objeto con lo mismo que el otro pero sin el ID, asi no lo subo ni edito con ID ya que ya tiene el generado por firebase
                    //id: documento.id,
                    anioCursada: documento.anioCursada,
                    idProfesor: emailUsuario,
                    nombreProfesor: nombreUsuario,
                    titulo: documento.titulo,
                    carrera: documento.carrera,
                    materia: documento.materia,
                    descripcion: documento.descripcion,
                    url: documento.url,
                }

                const newDocument2 = {
                    id: props.document.id,
                    anioCursada: documento.anioCursada,
                    idProfesor: emailUsuario,
                    nombreProfesor: nombreUsuario,
                    titulo: documento.titulo,
                    carrera: documento.carrera,
                    materia: documento.materia,
                    descripcion: documento.descripcion,
                    url: documento.url,

                }

                //alert(props.document.id)
                await store.collection("documentos").doc(props.document.id).set(newDocument) //documento.id tiene el id del elemento donde se toco el boton de editar
                    .then(


                        arrayDocumentos.map((doc, posicion) => {
                            if (doc.id == props.document.id) { //EVALUO si el id del elemento del array global es igual al id que me viene por la prop, si viene de editar, va a contener el id generado por firebase
                                arrayDocumentos[posicion] = newDocument2 //cuando entre, es porque encontre el elemento que tengo que modificar, entonces lo cambio

                            }
                        })


                        ,

                        dispatch({
                            type: actionTypes.ADD_ARRAY,
                            arrayDocumentos: arrayDocumentos //actualizo el array global con la modificada de recien, sino haria falta refrescar la pagina para que se vean los cambios
                        })



                        ,

                        modifica()

                    )
                    .catch((e) =>
                        console.log(e)
                    )
            }
        }
    }

    const borrarDocumento = async (e) => {
        e.preventDefault()

        try {

            await store.collection("documentos").doc(props.document.id).delete()

            // arrayDocumentos.map((doc, posicion) => {
            //     if (doc.id == documento.id) {
            //         alert(doc.id)
            //        delete arrayDocumentos[posicion] 

            //     }
            // })

            const { docs } = await store.collection("documentos").where("idProfesor", "==", emailUsuario).get() //esto da como resultado un objeto. por eso DOCS lo pongo asi y no normal. es lo mismo que. const respuesta = ...; y luego acceder como respuesta.docs, te ahorras eso porque docs es una propiedad de la respuesta

            const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))


            dispatch({
                type: actionTypes.ADD_ARRAY,
                arrayDocumentos: nuevoArray //actualizo el array global con la modificada de recien, sino haria falta refrescar la pagina para que se vean los cambios
            })


            modifica()


        }
        catch (e) {
            console.log(e)
        }


    }
    //await store.collection("documentos").doc(documento.id).delete()


    const accionEditar = () => { //si se aprieta el boton de editar viene aca
        setAccion("Edita") //seteo la accion a Edita ya que por las props siempre viene MOSTRAR o CREA
        modifica() //llamo la funcion que abre la modal
    }

    const accionBorrar = () => {
        setAccion("Borrar")
        modifica()
    }


    const modificarModalCorrecto = () => {
        dispatch({
            type: actionTypes.SET_MODAL_MENSAJE_CORRECTO,
            modalMensajeCorrecto: true
        })
    }


    return (
        <div>
            {
                props.accion == "mostrar" ? //aca entra cuando en el componente MisDocumentos mostramos el catalogo para el profesor y lo mismo para el alumno
                    (
                        // no me queda otra que crear una CARD distinta
                        <Card className={classes.root}>

                            {
                                rolUsuario == "Profesor" ?
                                    (
                                        <CardHeader title={props.document.titulo} subheader={props.document.nombreProfesor}
                                            action={
                                                <IconButton aria-label="editar" title="Editar documento" onClick={accionEditar}>
                                                    <EditIcon />
                                                </IconButton>
                                            }
                                        />
                                    )
                                    :
                                    (
                                        <CardHeader title={props.document.titulo} subheader={props.document.nombreProfesor} />

                                    )

                            }

                            <CardMedia
                                className={classes.media}
                                image="https://i.imgur.com/QdEHjj3.png"
                                title="Documento pdf"
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <b>Carrera: </b>{props.document.carrera}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <b>Materia: </b>{props.document.materia}
                                </Typography>
                            </CardContent>

                            <CardActions disableSpacing>

                                {
                                    rolUsuario == "Alumno" ?
                                        (
                                            <div>
                                                <IconButton aria-label="add to favorites">
                                                    <FavoriteIcon />
                                                </IconButton>

                                            </div>

                                        )
                                        :
                                        rolUsuario == "Profesor" ?
                                            (
                                                <IconButton aria-label="add to favorites" title="Borrar documento" onClick={accionBorrar}>
                                                    <DeleteIcon />
                                                </IconButton>

                                            )
                                            :
                                            (
                                                <span></span>
                                            )

                                }


                                <a href={props.document.url} target=" _blank">
                                    <IconButton aria-label="share">
                                        <GetAppIcon />
                                    </IconButton>
                                </a>


                                {/* estrellitas de valoracion
                                {Array(3) //crea un array, lo rellena con ese codigo entre P que representa la estrellita de valoracion, el 4 son 4 estrellitas 
                                    .fill()
                                    .map((_, i) => (
                                        <p>&#11088;</p> //podes cambiar el codigo para que muestre otra cosa
                                    ))
                                } */}

                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    title="Ver descripcion"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>



                            </CardActions>

                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>Descripcion:</Typography>
                                    <Typography paragraph>
                                        {props.document.descripcion}
                                    </Typography>

                                </CardContent>
                            </Collapse>

                        </Card>
                    )
                    :
                    (
                        <span></span>
                    )
            }



            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={modalDocumento}
                onClose={modifica}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modalDocumento}>
                    <div className={classes.paper}>
                        {
                            //VALIDACION PARA VER SI ES MODAL DE ELIMINAR O DE EDITAR/CREAR . asi no creo otra modal al pedo
                            accion == "Borrar" ?
                                (
                                    <div className={classes.expand} >
                                        <h3>Estas seguro de eliminar este documento?</h3>

                                        <button type="submit" className="btn btn-primary btn btn-block" onClick={borrarDocumento}>Si</button>
                                        <button type="submit" className="btn btn-secondary btn btn-block" onClick={modifica}>No</button>

                                    </div>
                                )
                                :
                                (
                                    <div className="row">
                                        <div className="col">
                                            <Card className={classes.root}>
                                                <CardHeader

                                                    title={documento.titulo}
                                                    subheader={documento.nombreProfesor}
                                                />
                                                <CardMedia
                                                    className={classes.media}
                                                    image="https://i.imgur.com/QdEHjj3.png"
                                                    title="Paella dish"
                                                />

                                                <CardContent>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <b>Carrera: </b>{documento.carrera}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <b>Materia: </b>{documento.materia}
                                                    </Typography>
                                                </CardContent>

                                                <CardActions disableSpacing>
                                                    <IconButton aria-label="add to favorites"> {/*ESTE y el de descargar, los dejo en la vista previa de lo creado o editado, sin funcionalidad. */}
                                                        <FavoriteIcon />
                                                    </IconButton>

                                                    <a href={documento.url} target=" _blank">
                                                        <IconButton aria-label="share">
                                                            <GetAppIcon />
                                                        </IconButton>
                                                    </a>

                                                    <IconButton
                                                        className={clsx(classes.expand, {
                                                            [classes.expandOpen]: expanded,
                                                        })}
                                                        onClick={handleExpandClick}
                                                        aria-expanded={expanded}
                                                        aria-label="Borrar documento"
                                                    >
                                                        <ExpandMoreIcon />
                                                    </IconButton>



                                                </CardActions>

                                                <Collapse in={expanded} timeout="auto" unmountOnExit>

                                                    <CardContent>
                                                        <Typography paragraph>Descripcion:</Typography>
                                                        <Typography paragraph>
                                                            {documento.descripcion}
                                                        </Typography>
                                                    </CardContent>

                                                </Collapse>
                                            </Card>
                                        </div>
                                        <div className="col">
                                            <h3>{accion} tu documento!!</h3>
                                            <label>Titulo</label>
                                            <input placeholder="Titulo del documento" className="form-control" type="text" name="titulo" value={documento.titulo} onChange={handleChange}></input>

                                            <label>Año cursada</label>
                                            <input placeholder="Año cursada" className="form-control" type="number" name="anioCursada" value={documento.anioCursada} onChange={handleChange}></input>

                                            <label>Carrera</label>
                                            <input placeholder="Carrera" className="form-control" type="text" name="carrera" value={documento.carrera} onChange={handleChange}></input>

                                            <label>Materia</label>
                                            <input placeholder="Materia" className="form-control" type="text" name="materia" value={documento.materia} onChange={handleChange}></input>

                                            <label>Descripcion</label>
                                            <textarea placeholder="Descripcion" className="form-control" type="text" name="descripcion" value={documento.descripcion} onChange={handleChange}></textarea>

                                            <label>Url</label>
                                            <input placeholder="Link del pdf" className="form-control" type="text" name="url" value={documento.url} onChange={handleChange}></input>

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

                                            <button className="btn btn-primary btn btn-block mt-3" onClick={guardardatos} type="submit" >Guardar</button>
                                            <button type="submit" className="btn btn-secondary  btn btn-block mt-3" onClick={modifica}>No</button>

                                        </div>
                                    </div>
                                )
                        }

                    </div>
                </Fade>
            </Modal>

        </div>



    )
}
export default Documento2