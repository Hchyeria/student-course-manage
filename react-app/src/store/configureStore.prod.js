import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import fetchData from '../middlewares/fetchData';



const configureStore = preloadedState =>
    createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            thunk,
            fetchData
        )
    );

export default configureStore;
