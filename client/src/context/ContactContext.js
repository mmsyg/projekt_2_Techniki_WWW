
import { createContext, useReducer } from "react";
export const ContactContext = createContext();

// Defining a reducer for handling contacts state changes
export const ContactsReducer = (state, action) => {
    switch(action.type){
        case 'SET_CONTACTS': // Handling action to set contacts
            return {
              contacts: action.payload // Updating contacts in the state
            }
        case 'CREATE_CONTACT': // Handling action to create a new contact
            return {
              contacts: [action.payload, ...state.contacts] // Adding new contact to the state
            }    
        case 'DELETE_CONTACT': // Handling action to delete a contact
            return {
              contacts: state.contacts.filter((w) => w._id !== action.payload._id) // Removing the deleted contact from the state
            }    
        default: // Default case to handle any other action
            return state
    }
};

// Creating a provider component for the ContactContext
export const ContactsContextProvider = ({ children }) => {
  // Using useReducer hook with the ContactsReducer and initial state
  const [state, dispatch] = useReducer(ContactsReducer, {
    contacts: null, // Initial state with no contacts
  });

  // Providing the state and dispatch function to all children components
  return (
    <ContactContext.Provider value={{...state, dispatch}}>
      {/* App */}
      {children}
    </ContactContext.Provider>
  );
};
