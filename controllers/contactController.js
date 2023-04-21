const asyncHandler = require('express-async-handler');
const Contact = require("../model/Contacts");


const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({});
    if(!contacts){
        res.status(404);
        throw new Error("No item found");
    }
        res.status(200).json({contacts});
    
});

const createContact = asyncHandler(async (req, res) => {
    const contactDetail = await Contact.create(req.body);
    res.status(201).json({"Created new contact" : contactDetail});   
});

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById({_id : req.params.id});
    if(!contact){
        res.status(404);
        throw new Error(`Contact with id ${req.params.id} not found.`);
    }
    res.status(200).json({[`Specific contact with id ${req.params.id}`] : contact});
});

const updateContact = asyncHandler(async (req, res) => {
    const updatedContact = await Contact.findByIdAndUpdate({_id : req.params.id}, req.body, {new:true});
    if(!updatedContact){
        res.status(404);
        throw new Error(`Contact with id ${req.params.id} not found.`);
    }
    res.status(200).json({[`Updated contact with id ${req.params.id}`] : updatedContact});

});
const deleteContact = asyncHandler(async (req, res) => {
    const deletedContact = await Contact.findByIdAndDelete({_id : req.params.id});
    if(!deletedContact){
        res.status(404);
        throw new Error(`Contact with id ${req.params.id} not found.`);
    }
    res.status(200).json({[`Deleted contact with id ${req.params.id}`] : deletedContact});

});

module.exports = {
    getAllContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
};