import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../Reducer/reducer';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta línea sirve para conectar nuestra App con la extensión REDUX DEVTOOLS DEL NAVEGADOR


const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware)) // esta línea sirva para que podamos hacer peticiones a una Api/servidor
);



export default store;

//import { createStore, applyMiddleware } from "redux"
// import { composeWithDevTools } from "redux-devtools-extension"
// import thunk from "redux-thunk"
// import rootReducer from "../reducer"

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))