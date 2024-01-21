import { useState, useEffect } from 'react'
import { useContactContext } from "../hooks/useContactsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import ContactDetails from '../components/ContactDetails'
import ContactForm from '../components/ContactForm'

const HomePage = () => {
  // Using custom hooks to get contacts and dispatch method, and user object
  const {contacts, dispatch} = useContactContext()
  const {user} = useAuthContext()
  // State for managing the search term
  const [searchTerm, setSearchTerm] = useState('')

  // useEffect hook to fetch contacts from API when component mounts or user changes
  useEffect(() => {
    // Function to fetch contacts from the API
    const fetchContacts = async () => {
        const response = await fetch('/api/contacts', {
          headers: {'Authorization': `Bearer ${user.token}`}, // Setting authorization header
        })
        const json = await response.json()
  
        // Dispatching action to set contacts in context if response is OK
        if (response.ok) {
          dispatch({type: 'SET_CONTACTS', payload: json})
        }
      }
  
      // Checking if user is logged in before fetching contacts
      if (user) {
        fetchContacts()
      }
  }, [dispatch, user]) // Dependencies array for useEffect

  // Filtering contacts based on the search term
  const filteredContacts = contacts ? contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.address.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  // Rendering the HomePage component
  return (
    <div className="panel">
      {/* Contact form for adding new contacts */}
      <ContactForm />
      {/* Search input field */}
      <input 
        type="text" 
        placeholder="Szukaj..." 
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Container for displaying contacts */}
      <div className="contacts">
        {filteredContacts.map((contact) => (
          // Rendering details for each contact
          <ContactDetails key={contact._id} contact={contact} />
        ))}
      </div>
    </div>
  )
}

export default HomePage
