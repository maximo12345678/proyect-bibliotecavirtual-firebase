export const initialState = {//para que se pueda consumir en index.js
    emailUsuario: null, //creamos un usuario vendedor que empieza siendo null, este lo podemos usar en todo el codigo
    rolUsuario: null,
    nombreUsuario: null,
    idUsuario: null,
    passAdmin: null,

    modalCrearYEditarDocumento: false,
    arrayDocumentos: [],

    arrayUsuarios: [],
    modalCrudUsuarios: false,
    modalMensajeCorrecto: false,
}



export const actionTypes = {
    SET_EMAIL_USUARIO: "SET_EMAIL_USUARIO",
    SET_ROL_USUARIO: "SET_ROL_USUARIO",
    SET_NOMBRE_USUARIO: "SET_NOMBRE_USUARIO",
    SET_PASS_ADMIN: "SET_PASS_ADMIN",


    SET_MODAL_CREAR_Y_EDITAR_DOCUMENTO: "SET_MODAL_CREAR_Y_EDITAR_DOCUMENTO",
    SET_ID_USUARIO: "SET_ID_USUARIO",
    ADD_ARRAY: "ADD_ARRAY",
    ADD_EN_ARRAY_DOCUMENTOS: "ADD_EN_ARRAY_DOCUMENTOS",


    ADD_TO_ARRAY_USUARIOS: "ADD_TO_ARRAY_USUARIOS", //esta accion
    ADD_NEW_ARRAY_USUARIOS: "ADD_NEW_ARRAY_USUARIOS",
    SET_MODAL_CRUD_USUARIOS: "SET_MODAL_CRUD_USUARIOS",

    SET_MODAL_MENSAJE_CORRECTO: "SET_MODAL_MENSAJE_CORRECTO",

}



const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case "SET_EMAIL_USUARIO":
            return {
                ...state,
                emailUsuario: action.emailUsuario
            }

        case "SET_ROL_USUARIO":
            return {
                ...state,
                rolUsuario: action.rolUsuario
            }

        case "SET_NOMBRE_USUARIO":
            return {
                ...state,
                nombreUsuario: action.nombreUsuario
            }


        case "SET_MODAL_CREAR_Y_EDITAR_DOCUMENTO":
            return {
                ...state,
                modalCrearYEditarDocumento: action.modalCrearYEditarDocumento
            }

        case "SET_ID_USUARIO":
            return {
                ...state,
                idUsuario: action.idUsuario
            }

            
        case "SET_PASS_ADMIN":
            return {
                ...state,
                passAdmin: action.passAdmin
            }



        //////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////


        case "ADD_ARRAY"://aca agregamos un array a la variable global de tipo array, no por item, directamente el array lleno
            return {
                ...state,
                arrayDocumentos: action.arrayDocumentos
            }


        case "ADD_EN_ARRAY_DOCUMENTOS": //esta la usamos cuando se agrega un nuevo documento, ademas de agregarla a firebase lo añadimos a este array global
            return { //tenemos que retornar esto. cambiamos el estado inicial
                ...state, //deja esto igual
                arrayDocumentos: [...state.arrayDocumentos, action.item],
            };

        //////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////

        case "ADD_TO_ARRAY_USUARIOS": //aca agregamos un nuevo item al array
            return { 
                ...state, 
                arrayUsuarios: [...state.arrayUsuarios, action.item], 
            };


        case "ADD_NEW_ARRAY_USUARIOS": //aca creamos un nuevo array
            return{
                ...state,
                arrayUsuarios: action.arrayUsuarios
            }


        case "SET_MODAL_CRUD_USUARIOS":
            return {
                ...state,
                modalCrudUsuarios: action.modalCrudUsuarios
            }

        //////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////

        case "SET_MODAL_MENSAJE_CORRECTO":
            return {
                ...state,
                modalMensajeCorrecto: action.modalMensajeCorrecto
            }

        default: return state; //en caso de default solo retornamos el state
    }

}

export default reducer;

