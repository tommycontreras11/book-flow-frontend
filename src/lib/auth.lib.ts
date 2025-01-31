'use server'

import { IAuth } from "@/interfaces/auth.interface"
import axios from "axios"
import { config } from "./config"
import { cookies } from "next/headers"

export const signIn = async (auth: IAuth) => {
    try {
        console.log(auth)
        const response = await axios.post(config.apiURL + '/auth/signIn', auth)
        await saveCookie(response.data.originalToken)
        return "success"
    } catch (error) {
        console.log(error)        
    }
}

export const signOut = async () => {
    try {
        const response = await axios.post(config.apiURL + '/auth/signOut')
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

const configCookie = {
    maxAge: 60 * 60 * 24,
    path: "/",
    domain: "localhost",
    httpOnly: true,
    secure: false,
  };

export const saveCookie = async (token: string) => {
    const cookieStore = await cookies();
    cookieStore.set("jwt", token, configCookie);
}