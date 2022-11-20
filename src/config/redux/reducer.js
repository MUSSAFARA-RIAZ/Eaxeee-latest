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
    return state;
}