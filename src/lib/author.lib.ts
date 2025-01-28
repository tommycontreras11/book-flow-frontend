'use server'

import axios from "axios"
import { config } from "./config"
import { ICreateAuthor, IUpdateAuthor } from "@/interfaces/author.interface"

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
        const response = await axios.get(config.apiURL + '/authors/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const createAuthor = async (author: ICreateAuthor) => {
    try {
        const response = await axios.post(config.apiURL + '/authors', author)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const updateAuthor = async (uuid: string, author: IUpdateAuthor) => {
    try {
        const response = await axios.patch(config.apiURL + '/authors/' + uuid, author)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const deleteAuthor = async (uuid: string) => {
    try {
        const response = await axios.delete(config.apiURL + '/authors/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}