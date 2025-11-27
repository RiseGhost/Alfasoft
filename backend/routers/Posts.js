const contact = require("../controllers/contact")

// All posts routers are implement in this file

/*
    Create new contact

    POST /contacts

    Parameters:
    name as String -> The name of the contact
    phone as String -> Number of the contact. Only accepts 9-digits numbers
    email as String -> Mail of the contact. The mail needs to be in the following format: x@y.z
    image as Byte[] -> Image to use in contact. This image is upload to the server. (Can be null)
*/
exports.create = async (req,res) => {
    try {
        const { name, phone, email } = req.body

        const imageUrl = req.file ? `${req.protocol}://josesantos-nodejs.recruitment.alfasoft.pt/images/${req.file.filename}` : ""

        // Valite the request parameters
        if (phone == undefined || email == undefined || phone.length == 0 || email.length == 0)
            return res.status(400).json({ error: "Email and phone number can not be null" })
        if (phone.length != 9 || !/^\d{9}$/.test(phone)) return res.status(400).json({ error: "Invalid phone number. The phone number must contain 9 characters from 0-9" })
        if (name == undefined || name.length == 0) return res.status(400).json({ error: "Name can not be null" })
        if (/.+@.+\..+/.test(email) === false) return res.status(400).json({error: "Invalid Email"})
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        
        const response = await contact.CreatContact(name,phone,email,imageUrl)
        return res.status(200).json({ msg: response })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: err })
    }
}