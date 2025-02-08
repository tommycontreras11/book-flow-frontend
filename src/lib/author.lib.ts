'use server'

import axios from "axios"
import { config } from "./config"
import { ICreateAuthor, IUpdateAuthor } from "@/interfaces/author.interface"
import { getCookie } from "./auth.lib"

export const getAllAuthor = async () => {
    try {
        const response = await axios.get(config.apiURL + '/authors')
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const getOneAuthor = async (uuid: string) => {
    try {
        const jwt = await getCookie();
        const response = await axios.get(config.apiURL + '/authors/' + uuid, {
            headers: {
                Authorization: jwt
            }
        })
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const createAuthor = async (author: ICreateAuthor) => {
    try {
        const jwt = await getCookie();
        const response = await axios.post(config.apiURL + '/authors', author, {
            headers: {
                Authorization: jwt
            }
        })
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const updateAuthor = async (uuid: string, author: IUpdateAuthor) => {
    try {
        const jwt = await getCookie();
        const response = await axios.patch(config.apiURL + '/authors/' + uuid, author, {
            headers: {
                Authorization: jwt
            }
        })
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const deleteAuthor = async (uuid: string) => {
    try {
        const jwt = await getCookie();
        const response = await axios.delete(config.apiURL + '/authors/' + uuid, {
            headers: {
                Authorization: jwt
            }
        })
        return response.data
    } catch (error) {
        console.log(error)        
    }
}