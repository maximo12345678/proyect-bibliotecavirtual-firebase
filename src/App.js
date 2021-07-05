import React,{useEffect} from 'react'

import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navegador from './componentes/Navegador'
//import Documentos from './componentes/Documentos'
import Inicio from './componentes/Inicio'

import { actionTypes } from './reducer'
import {useStateValue} from './StateProvider'

import { auth, store } from './FirebaseConfig' //no es una dependencia, es un archivo que esta en el proyecto que me exporta AUTH

function App() {


  const [{emailUsuario, rolUsuario, nombreUsuario, idUsuario, passAdmin}, dispatch] = useStateValue()
   

  return (
    <div >

      <Router>

        <Navegador></Navegador>

        <Switch>

          <Route exact path="/">
            <Inicio></Inicio>
          </Route>

          {/* <Route exact path="/documentos">
            <Documentos></Documentos>
          </Route> */}
        
        </Switch>
      </Router>



    </div>
  );
}

export default App;




//GUARDAR los datos del logueado en local storage (aunque creo que solo funcionaria en google) o agregarle un campo al usuario de state, false o true
// EN EL useeffect deberia haber una consulta a las tablas para ver que usuario tiene el campo STATE en TRUE, el cual se modifica cuando alguien se loguea. asi cuando se refresca el navegador no se pierde el usuario logueado


  //ESTO LO HACEMOS ACA, asi no lo tenemos que modificar cuando se loguea y cuando se registra. esto se va a ejecutar siempre
  // useEffect(()=>{

  //   const getDatosUsuario = async (userId)=>{

  //     const docs  = await store.collection("roles-por-usuario").doc(userId).get() //DOC() ahi va el ID, pero primero tengo que crearlas asi, sino no va a andar

  //     let nombre = docs.data().nombre
  //     let rol = docs.data().rol

  //     dispatch({
  //       type: actionTypes.SET_NOMBRE_USUARIO,
  //       nombreUsuario: nombre
  //     })
  //     dispatch({
  //       type: actionTypes.SET_ROL_USUARIO,
  //       rolUsuario: rol
  //     })

  //   }


  //   auth.onAuthStateChanged((authUser)=>{
  //     console.log(authUser)
  //     if (authUser){
  //       dispatch({
  //         type: actionTypes.SET_EMAIL_USUARIO,
  //         emailUsuario: authUser.email,
  //       })

  //       getDatosUsuario(authUser.email)

  //       dispatch({
  //         type: actionTypes.SET_ID_USUARIO,
  //         idUsuario: authUser.uid //es el ID unico autogenerado en la autenticacion de firebase para cada usuario. con este tenemos q crear cada registro de ROL_POR_USUARIO
  //       })
  //     }
  //   })

  // },[]) //2 parametros, una funcion flecha y un array vacio, si esta vacio el array la funcion flecha se va a ejecutar solo 1 vez, si tiene una variable el array, la flecha se ejecutara esa N cant de veces

