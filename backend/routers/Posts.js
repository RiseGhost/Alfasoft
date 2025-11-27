const contact = require("../controllers/contact")
port = 10093

exports.create = async (req,res) => {
    try {
        const { name, phone, email } = req.body

        const imageUrl = req.file ? `${req.protocol}://127.0.0.1:${port}/images/${req.file.filename}` : ""

        if (phone == undefined || email == undefined || phone.length == 0 || email.length == 0)
            return res.status(400).json({ error: "Email and phone number can not be null" })
        if (phone.length != 9 || !/^\d{9}$/.test(phone)) return res.status(400).json({ error: "Invalid phone number. The phone number must contain 9 characters from 0-9" })
        if (name == undefined || name.length == 0) return res.status(400).json({ error: "Name can not be null" })
        if (/.+@.+\..+/.test(email) === false) return res.status(400).json({error: "Invalid Email"})
        const response = await contact.CreatContact(name,phone,email,imageUrl)
        return res.status(200).json({ msg: response })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: err })
    }
}