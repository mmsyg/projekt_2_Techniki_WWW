// Importing the Contact model and mongoose for database operations
const Contact = require('../models/contactModel')
const mongoose = require('mongoose')

// Function to get all contacts for a specific user
const getContacts = async (req, res) => {
    const user_id = req.user._id // Extracting user ID from request
    const contacts = await Contact.find({user_id}).sort({createdAt: -1}) // Retrieving contacts for the user, sorted by creation date

    res.status(200).json(contacts) // Sending contacts in response
}

// Function to get a single contact by ID
const getContact = async (req, res) => {
    const {id} = req.params // Extracting contact ID from request parameters
    // Checking if the provided ID is a valid MongoDB ObjectId
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such contact'})
    }

    const contact = await Contact.findById(id) // Retrieving the contact by ID

    if(!contact) {
        return res.status(404).json({error: 'no such contact'})
    }

    res.status(200).json(contact) // Sending contact in response
}

// Function to create a new contact
const createContact = async (req, res) => {
    const {phoneNumber, name, surname, address} = req.body // Extracting contact details from request body
    let emptyFields = []

    // Validating required fields and adding to emptyFields array if missing
    if(!phoneNumber) emptyFields.push('phoneNumber')
    if(!name) emptyFields.push('name')
    if(!surname) emptyFields.push('surname')
    if(!address) emptyFields.push('address')

    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    try {
        const user_id = req.user._id // Extracting user ID from request
        const contact = await Contact.create({phoneNumber, name, surname, address, user_id}) // Creating a new contact
        res.status(200).json(contact) // Sending newly created contact in response
    } catch(error) {
        res.status(400).json({error: error.message}) // Handling any errors
    }
}

// Function to delete a contact
const deleteContact = async (req, res) => {
    const {id} = req.params // Extracting contact ID from request parameters
    // Checking if the provided ID is a valid MongoDB ObjectId
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such contact'})
    }

    const contact = await Contact.findOneAndDelete({_id: id}) // Deleting the contact

    if(!contact) {
        return res.status(400).json({error: 'no such contact'})
    }

    res.status(200).json(contact) // Sending deleted contact in response
}

// Function to update a contact
const updateContact = async (req, res) => {
    const {id} = req.params // Extracting contact ID from request parameters
    // Checking if the provided ID is a valid MongoDB ObjectId
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such contact'})
    }

    const contact = await Contact.findByIdAndUpdate({_id: id}, {...req.body}) // Updating the contact

    if(!contact) {
        return res.status(400).json({error: 'no such contact'})
    }

    res.status(200).json(contact) // Sending updated contact in response
}

module.exports = {
    getContact,
    getContacts,
    createContact,
    deleteContact,
    updateContact
}
