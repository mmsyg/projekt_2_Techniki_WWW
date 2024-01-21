
import { useState } from "react"
import {useContactContext} from "../hooks/useContactsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const ContactForm = () => {
    // Destructuring to extract the dispatch method from the contact context
    const {dispatch} = useContactContext()
    // Destructuring to extract the user object from the authentication context
    const {user} = useAuthContext()
    // State variables for contact details and error handling
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [surname, setSurname] = useState('')
    const [address, setAddress] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault() // Preventing default form submission behavior

        // Guard clause to check if user is logged in
        if(!user){
            setError('You must be logged in')
            return
        }
        // Creating a contact object with the form data
        const contact = {name, surname, phoneNumber, address}

        // Making an API call to create a new contact
        const response = await fetch('/api/contacts', {
            method: 'POST',
            body: JSON.stringify(contact),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}` // Passing the user's token for authorization
            }
        })

        const json = await response.json()

        // Handling errors from the API response
        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        // Resetting form and updating state on successful response
        if(response.ok){
            setName('')
            setSurname('')
            setPhoneNumber('')
            setAddress('')
            setError(null)
            setEmptyFields([])
            console.log("new contact added", json)
            dispatch({type: 'CREATE_CONTACT', payload: json})
        }
    }
    return ( <div>
        <form className="create" onSubmit={handleSubmit}>
            <h3>Dodaj kontakt</h3>

            <label>Numer telefonu</label>
            <input  type="tel" id="phone" name="phone" placeholder="123-456-789" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" required onChange={(e)=> setPhoneNumber(e.target.value)} value={phoneNumber} />
            <label>Imię</label>
            <input type="text" placeholder="Imie" onChange={(e)=> setName(e.target.value)} value={name} />

            <label>Nazwisko</label>
            <input type="text" placeholder="Nazwisko" onChange={(e)=> setSurname(e.target.value)} value={surname} />

            <label>Adres</label>
            <input type="text" placeholder="Adres" onChange={(e)=> setAddress(e.target.value)} value={address} />
            <button>Dodaj</button>
            {error && <div className="error">{error}</div>}
        </form>
    </div> );
}
 
export default ContactForm;