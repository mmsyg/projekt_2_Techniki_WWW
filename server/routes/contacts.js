const express = require('express')
const {
    createContact, 
    getContact,
    getContacts,
    deleteContact,
    updateContact
} = require('../controllers/contactConroller')
const requireAuth = require('../middleware/requireAuth')

// require auth for
const router = express.Router()

router.use(requireAuth)

//GET all Contacts
router.get('/',getContacts)

//GET  a single contact
router.get('/:id', getContact)
// POST  a new contact
router.post('/', createContact)


//DELETE  a contact
router.delete('/:id', deleteContact)


// UPDADTE  a Contact
router.patch('/:id', updateContact)



module.exports = router