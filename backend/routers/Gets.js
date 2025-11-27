const contact = require("../controllers/contact")

// All GET routes are implement in this file

/*
    Return all contacts

    GET /contacts

    Parameters:
    ----
*/
exports.getAll = async (req,res) => {
    try{
        const data = await contact.GetAllContacts()
        return res.status(200).json({data: data})
    } catch(err){
        return res.status(500).json({error: err})
    }
}