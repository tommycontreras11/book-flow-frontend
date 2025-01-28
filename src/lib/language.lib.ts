'use server'

import axios from "axios"
import { config } from "./config"

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