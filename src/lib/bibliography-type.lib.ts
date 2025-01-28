'use server'

import axios from "axios"
import { config } from "./config"
import { ICreateBibliographyType, IUpdateBibliographyType } from "@/interfaces/bibliography-type.interface"

export const getAllBibliographyType = async () => {
    try {
        const response = await axios.get(config.apiURL + '/bibliography-types')
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const getOneBibliographyType = async (uuid: string) => {
    try {
        const response = await axios.get(config.apiURL + '/bibliography-types/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const createBibliographyType = async (bibliographyType: ICreateBibliographyType) => {
    try {
        const response = await axios.post(config.apiURL + '/bibliography-types', bibliographyType)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const updateBibliographyType = async (uuid: string, bibliographyType: IUpdateBibliographyType) => {
    try {
        const response = await axios.patch(config.apiURL + '/bibliography-types/' + uuid, bibliographyType)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const deleteBibliographyType = async (uuid: string) => {
    try {
        const response = await axios.delete(config.apiURL + '/bibliography-types/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}