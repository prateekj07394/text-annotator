import annotationSelecter from './reducer_annotate';
import {combineReducers} from 'redux';

const appReducer = combineReducers({
    annotationSelecter:annotationSelecter
})


export default appReducer;