
import {createContext, useReducer, useEffect} from 'react';

export const AuthContext = createContext()


export const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN': // Handling login action
            return {user: action.payload} // Setting the user in the state
        case 'LOGOUT': // Handling logout action
            return {user: null} // Removing the user from the state
        default: // Default case to handle any other action
            return state
    }
}

// Creating a provider component for the AuthContext
export const AuthContextProvider = ({ children }) => {
    // Using useReducer hook with the authReducer and initial state
    const [state, dispatch] = useReducer(authReducer, {
        user: null // Initial state with no user
    })

    // Using useEffect to load the user from local storage on component mount
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) // Retrieving user from local storage

        if(user) {
            dispatch({type: 'LOGIN', payload: user}) // Dispatching login action if user exists
        }
    }, []) // Empty dependency array to ensure this runs only once

    console.log('AuthContext state:', state) // Logging the current state for debugging

    // Providing the state and dispatch function to all children components
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {/* {App} */}
            {children} 
        </AuthContext.Provider>
    )
}
