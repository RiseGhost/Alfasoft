const contact = require("../controllers/contact")

exports.getAll = async (req,res) => {
    try{
        console.log("Contact router")
        const data = await contact.GetAllContacts()
        return res.status(200).json({data: data})
    } catch(err){
        return res.status(500).json({error: err})
    }
}