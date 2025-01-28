'use server'

import axios from "axios"
import { config } from "./config"
import { ICreateLanguage, IUpdateLanguage } from "@/interfaces/language.interface"

export const getAllLanguage = async () => {
    try {
        const response = await axios.get(config.apiURL + '/languages')
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const getOneLanguage = async (uuid: string) => {
    try {
        const response = await axios.get(config.apiURL + '/languages/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const createLanguage = async (language: ICreateLanguage) => {
    try {
        const response = await axios.post(config.apiURL + '/languages', language)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const updateLanguage = async (uuid: string, language: IUpdateLanguage) => {
    try {
        const response = await axios.patch(config.apiURL + '/languages/' + uuid, language)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const deleteLanguage = async (uuid: string) => {
    try {
        const response = await axios.delete(config.apiURL + '/languages/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}