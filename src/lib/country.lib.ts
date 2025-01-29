'use server'

import axios from "axios"
import { config } from "./config"

export const getAllCountries = async () => {
    try {
        const response = await axios.get(config.apiURL + '/countries')
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const getOneCountry = async (uuid: string) => {
    try {
        const response = await axios.get(config.apiURL + '/countries/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}