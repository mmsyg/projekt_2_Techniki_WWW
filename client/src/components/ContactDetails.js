
import {useContactContext} from "../hooks/useContactsContext"
import { useAuthContext } from "../hooks/useAuthContext"


const ContactDetails = (props) => {
    // Destructuring to extract the dispatch method from the contact context
    const {dispatch} = useContactContext()
    // Destructuring to extract the user object from the authentication context
    const {user} = useAuthContext()

    // Function to handle the deletion of a contact
    const handleClick = async () => {
        // Guard clause to exit function if no user is logged in
        if(!user){
            return
        }
        
        // Making an API call to delete a contact using the contact's ID
        const response = await fetch('/api/contacts/'+props.contact._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}` // Passing the user's token for authorization
            }
        })
        const json = await response.json()

        // Dispatching an action to update the state if the API call is successful
        if(response.ok){
            dispatch({type:'DELETE_CONTACT', payload: json})
        }
    }

    return (<div className="contact-details">
        <h4>{props.contact.phoneNumber}</h4> 
        <p><strong>Imię:</strong> {props.contact.name}</p> 
        <p><strong>Nazwisko:</strong> {props.contact.surname}</p> 
        <p><strong>Adres:</strong> {props.contact.address}</p> 
        <span onClick={handleClick}> [X]</span> 
         </div>  );
}
export default ContactDetails;
