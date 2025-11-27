const db = require("../models/db.js")

/*
    This file implement all function that connect and manipulate the database.
*/

async function GetAllContacts() {
    try{
        const connect = await db.getConnection()

        const result = await connect.query("SELECT * FROM contact")

        connect.release()
        return JSON.stringify(result)
    } catch(err){
        return err
    }
}

async function Exist(email,phone) {
    try{
        const connect = await db.getConnection()
        if (typeof email === undefined && typeof phone === undefined) return false
        if (email === undefined || phone.length === 0){
            const result = (await connect.query("SELECT * FROM contact WHERE contact = ?", [phone])).length === 1
            connect.release()
            return result
        }
        if (phone === undefined || email.length === 0){
            const result = (await connect.query("SELECT * FROM contact WHERE email = ?", [email])).length === 1
            connect.release()
            return result
        }
        const result = (await connect.query("SELECT * FROM contact WHERE email = ? OR contact = ?", [email,phone])).length === 1
        connect.release()
        return result
    } catch(err){
        return err
    }
}

async function CreatContact(name,phone,email,picture_url){
    try{
        const connect = await db.getConnection()
        if (name === undefined || typeof name != "string" || name.length == 0) return "Name can not be null"
        if (phone === undefined || typeof phone != "string") return "Phone can not be null"
        if (phone.length != 9) return "Invalid phone number"
        if (email === undefined || typeof email != "string" || email.length == 0) return "Email can not be null"
        if (/.+@.+\..+/.test(email) === false) return "Invalid Email"
        //if (picture_url === undefined || typeof picture_url != "string" || picture_url.length == 0) return "Picture can not be null"

        if (await Exist(email,phone)) return "Exist a user with this email or phone"

        await connect.query(
            "INSERT INTO contact (name, contact, email, picture) VALUES (?, ?, ?, ?)",
            [name,phone,email,picture_url]
        )

        connect.release()
        return "Creat with sucess"
    } catch(err){
        return err
    }
}

async function DeletedContact(id) {
    try{
        const connect = await db.getConnection()

        if (id === undefined) return "ID can not be null"

        const result = await connect.query(
            "DELETE FROM contact WHERE id = ?",
            [id]
        )

        connect.release()
        if (result.affectedRows === 0) return "No users found with this id"
        
        return "Contact deleted with sucess"
    } catch (err){
        return err
    }
}

async function UpdateName(email, newName) {
    try {
        const connect = await db.getConnection()

        if (email === undefined || typeof email != "string" || email.length == 0) return "Email can not be null"
        if (/.+@.+\..+/.test(email) === false)return "Invalid Email"

        if (newName === undefined || typeof newName != "string" || newName.length == 0) return "Name can not be null"

        const result = await connect.query(
            "UPDATE contact SET name = ? WHERE email = ?",
            [newName, email]
        )

        connect.release()
        if (result.length === 0) return "No users found with this email"

        return "Name updated successfully"
    } catch (err) {
        return err
    }
}


async function UpdatePhone(email, newPhone) {
    try {
        const connect = await db.getConnection()

        if (email === undefined || typeof email != "string" || email.length == 0) return "Email can not be null"
        if (/.+@.+\..+/.test(email) === false) return "Invalid Email"

        if (newPhone === undefined || typeof newPhone != "string") return "Phone can not be null"
        if (newPhone.length != 9) return "Invalid phone number"

        const result = await connect.query(
            "UPDATE contact SET contact = ? WHERE email = ?",
            [newPhone, email]
        )

        connect.release()
        if (result.affectedRows === 0) return "No users found with this email"

        return "Phone updated successfully"
    } catch (err) {
        return err
    }
}


async function UpdateEmail(oldEmail, newEmail) {
    try {
        const connect = await db.getConnection()

        if (oldEmail === undefined || typeof oldEmail != "string" || oldEmail.length == 0) return "Email can not be null"
        if (/.+@.+\..+/.test(oldEmail) === false) return "Invalid Email"

        if (newEmail === undefined || typeof newEmail != "string" || newEmail.length == 0) return "New email can not be null"
        if (/.+@.+\..+/.test(newEmail) === false) return "Invalid new email"

        const result = await connect.query(
            "UPDATE contact SET email = ? WHERE email = ?",
            [newEmail, oldEmail]
        )

        connect.release()
        if (result.affectedRows === 0) return "No users found with this email"

        return "Email updated successfully"
    } catch (err) {
        return err
    }
}


module.exports = {CreatContact,DeletedContact, UpdateEmail, UpdateName, UpdatePhone, GetAllContacts}
