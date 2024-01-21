import { ContactContext } from "../context/ContactContext";
import { useContext } from "react";

export const useContactContext = () => {

    const context = useContext(ContactContext)
    
    if(!context) {
        throw Error('useContactsContext must be used inside an contactsContextProvider')
    }
    
    return context
}
 
