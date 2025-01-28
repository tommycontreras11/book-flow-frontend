'use server'

import axios from "axios"
import { config } from "./config"

export const getAllCountry = async () => {
    try {
        const response = await axios.get(config.apiURL + '/countrys')
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const getOneCountry = async (uuid: string) => {
    try {
        const response = await axios.get(config.apiURL + '/countrys/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}