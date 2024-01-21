const sidebarReducer = (state, action) => {
    if(action.type === 'SIDEBAR_TOGGLE'){
        return {
            ...state,
            isSidebarOpen: !state.isSidebarOpen
        }
    }

    throw new Error(`Unhandled action type: ${action.type}`);
}

export default sidebarReducer;