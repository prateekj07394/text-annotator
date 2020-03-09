export default function(state={},action){
    switch(action.type){
        case "SELECT_ANNOTATION_TEXT": return {...state,selectedAnnotationDetails:action.payload}
        case "SAVE_JSON_DATA": return {...state,jsonData:action.payload}
        default:return state;
    }
}