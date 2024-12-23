const INITIAL_STATE = {
    language: 'en',
    theme: 'default',
    route: 'enterprise',
    activepage: 'enterprise',
    subPage: "architecture",
    activeTree: "Tree1",
    activeTable: "Table1",
    //    //     { id: 2, layername: "as", layernotation: "f", layercolor: "Blue", parentlayer: "Architecture" },

    layers: [        { id: 1, layername: "Mussafara", layernotation: "s", layercolor: "Black", parentlayer: "None" },
     ],

};


const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "TOGGLELANG":
            return {
                ...state,
                language: action.value
            };
        case "enterprisescreen":
            return {
                ...state,
                route: action.value
            };
        case "UPDATETHEME":
            return {
                ...state,
                theme: action.value
            };
        case "SETACTIVEPAGE":
            return {
                ...state,
                activepage: action.value
            };

        case "SETSUBPAGE":
            return {
                ...state,
                subPage: action.value
            }

        case "ACTIVETREE":
            return {
                ...state,
                activeTree: action.value
            }
        case "ACTIVETABLE":
            return {
                ...state,
                activeTable: action.value

            }
        case 'SET_LAYERS':
            return { ...state, layers: action.payload };

        default:
            return state;
    }
};
export default reducer;
