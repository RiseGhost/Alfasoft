const contact = require("../controllers/contact")

/*
    Delete contact

    DELETE /contacts

    Parameters:
    id as Number, the ID of the contact you want to delete
*/
exports.delete = async (req,res) => {
    try{
        const { id } = req.body
        if (id == undefined || isNaN(id)) return res.status(400).json({error: "ID can not be null"})
        
        const result = await contact.DeletedContact(id)
        return res.status(200).json({msg: "OK"})
    } catch(err){
        console.log(err)
        return res.status(500).json({error: err})
    }
}