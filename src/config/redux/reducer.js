const INITIAL_STATE = {
    language: 'en',
    theme: 'default',
};


export default (state = INITIAL_STATE, action) => {
    if (action.type === "TOGGLELANG") {
        return {
            ...state,
            language: action.value
        }
    }
    else if (action.type === "UPDATETHEME") {
        console.log(action);
        return {
            ...state,
            theme: action.value,
        }
    }
    return state;
}