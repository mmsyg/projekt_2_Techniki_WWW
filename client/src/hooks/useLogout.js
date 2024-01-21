import { useAuthContext } from "./useAuthContext"
import { useContactContext } from "./useContactsContext"

export const useLogout = () => {
    const {dispatch} =useAuthContext()
    const {dispatch: contactsDispatch} =useContactContext()

    const logout = () =>{
        //Remove user from storage
        localStorage.removeItem('user')

        //Dispatch logout action
        dispatch({type: 'LOGOUT'})
        contactsDispatch({type:'SET_CONTACTS', payload: null})
    }
    return {logout}
}
 
