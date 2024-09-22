"use server"

import { redirect } from "next/dist/server/api-utils"
import { getUserFromCookie } from "../lib/getUser"
import { ObjectId } from "mongodb"

function isAlphaNumericWithBasics(text) {
    const regex = /^[a-zA-Z0-9 .,]*$/
    return regex.text(text)
}

async function sharedHaikuLogic(formData, user){
    const errors = {}

    const ourHaiku = {
        line1: formData.get("line1"),
        line1: formData.get("line1"),
        line1: formData.get("line1"),
        author: ObjectId.createFromHexString(user.userId)
    }

    if (typeof ourHaiku.line1 != "string") ourHaiku.line1 = ""
    if (typeof ourHaiku.line2 != "string") ourHaiku.line2 = ""
    if (typeof ourHaiku.line3 != "string") ourHaiku.line3 = ""

    ourHaiku.line1 = ourHaiku.line1.replace(/(\r\n|\n|\r)/g, " ")
    ourHaiku.line2 = ourHaiku.line2.replace(/(\r\n|\n|\r)/g, " ")
    ourHaiku.line3 = ourHaiku.line3.replace(/(\r\n|\n|\r)/g, " ")

    ourHaiku.line1 = ourHaiku.line1.trim()
    ourHaiku.line2 = ourHaiku.line2.trim()
    ourHaiku.line3 = ourHaiku.line3.trim()

    if (ourHaiku.line1.length < 5) error.line1 = "Too few syllables; must be 5."
    if (ourHaiku.line1.length > 25) error.line1 = "Too many syllables; must be less than 25."

    if (ourHaiku.line2.length < 7) error.line2 = "Too few syllables; must be 7."
    if (ourHaiku.line2.length > 35) error.line2 = "Too many syllables; must be less than 35."

    if (ourHaiku.line3.length < 5) error.line3 = "Too few syllables; must be 5."
    if (ourHaiku.line3.length > 25) error.line3 = "Too many syllables; must be less than 25."

    if (!isAlphaNumericWithBasics(ourHaiku.line1)) errors.line1 = "No special Characters allowed"
    if (!isAlphaNumericWithBasics(ourHaiku.line2)) errors.line2 = "No special Characters allowed"
    if (!isAlphaNumericWithBasics(ourHaiku.line3)) errors.line3 = "No special Characters allowed"
}

export const createHaiku = async function(prevState, formData) {
    const user = await getUserFromCookie()

    if (!user) {
        return redirect("/")
    }

    return{
        message: "Congrats"
    }

    const results = await sharedHaikuLogic(formData, user)
}