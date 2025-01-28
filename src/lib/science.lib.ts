'use server'

import axios from "axios"
import { config } from "./config"
import { ICreateScience, IUpdateScience } from "@/interfaces/science.interface"

export const getAllScience = async () => {
    try {
        const response = await axios.get(config.apiURL + '/sciences')
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const getOneScience = async (uuid: string) => {
    try {
        const response = await axios.get(config.apiURL + '/sciences/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const createScience = async (science: ICreateScience) => {
    try {
        const response = await axios.post(config.apiURL + '/sciences', science)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const updateScience = async (uuid: string, science: IUpdateScience) => {
    try {
        const response = await axios.patch(config.apiURL + '/sciences/' + uuid, science)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const deleteScience = async (uuid: string) => {
    try {
        const response = await axios.delete(config.apiURL + '/sciences/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}