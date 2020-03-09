export const selectTextRow=(selections)=>{
    
    return {
        type:"SELECT_ANNOTATION_TEXT",
        payload:selections
    }
}
export const saveJsonData=(selections)=>{
    
    return {
        type:"SAVE_JSON_DATA",
        payload:selections
    }
}

