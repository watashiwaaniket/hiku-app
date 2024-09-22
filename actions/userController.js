"use server"

import {getCollection} from "../lib/db.js"
import bcrypt from "bcrypt"
import { cookies } from "next/headers.js"
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation.js"

function isAlphaNumeric(x){
    const regex = /^[a-zA-Z0-9]*$/
    return regex.test(x)
}

export const login = async function(prevState, formData) {
    const failObject = {
        success: false,
        message: "Invalid username / password. "
    }

    const ourUser = {
        username: formData.get("username"),
        password: formData.get("password")
    }

    if (typeof ourUser.username != "string") ourUser.username = ""
    if (typeof ourUser.password != "string") ourUser.password = ""

    const collection = await getCollection("users")
    const user = await collection.findOne({username: ourUser.username})

    if (!user){
        return failObject
    }


    const matchOne = bcrypt.compareSync(ourUser.password, user.password)

    if(!matchOne) {
        return failObject
    }

    //create jwt value
    const ourTokenValue = jwt.sign({skyColor:"blue", userId: user._id, exp: Math.floor(Date.now() / 1000) + 60*60*24}, process.env.JWTSECRET)

    //log the user in by giving them a cookie
    cookies().set("haikuapp", ourTokenValue, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        secure: true
    })

    return redirect("/")
}

export const logout = async function() {
    cookies().delete("haikuapp")
    redirect("/")
}


export const register = async function(prevState, formData){
    const errors = {}

    const ourUser = {
        username: formData.get("username"),
        password: formData.get("password")
    }

    if (typeof ourUser.username != "string") ourUser.username = ""
    if (typeof ourUser.password != "string") ourUser.password = ""

    ourUser.username = ourUser.username.trim()
    ourUser.password = ourUser.password.trim()

    if (ourUser.username.length < 3) errors.username = "Username must be atleast 3 characters"
    if (ourUser.username.length > 30) errors.username = "Username cannot be greater than 30 characters"
    if (!isAlphaNumeric(ourUser.username)) errors.username = "Usernames can only contain letters and numbers"
    if(ourUser.username == "") errors.username = "You must provide a username"

    // see if username already exists or not
    const usersCollection = await getCollection("users")
    const usernameInQuestion = await usersCollection.findOne({username: ourUser.username})

    if (usernameInQuestion) {
        errors.username = "Username already exists"
    }
    


    if (ourUser.password.length < 12) errors.password = "Password must be atleast 12 characters"
    if (ourUser.password.length > 50) errors.password = "Password cannot be greater than 50 characters"
    if(ourUser.password == "") errors.password = "You must provide a password"

    if (errors.username || errors.password) {
        return {
            errors: errors,
            success: false
        }
    }

    //hash password first
    const salt = bcrypt.genSaltSync(10);
    ourUser.password = bcrypt.hashSync(ourUser.password, salt)

    //storing a new user in the database    
    const newUser = await usersCollection.insertOne(ourUser)
    const userId = newUser.insertedId.toString()

    //create our JWT value
    const ourTokenValue = jwt.sign({skyColor:"blue", userId: userId, exp: Math.floor(Date.now() / 1000) + 60*60*24}, process.env.JWTSECRET)

    //log the user in by giving them a cookie
    cookies().set("haikuapp", ourTokenValue, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        secure: true
    })

    return{
        success: true,
    }
}

