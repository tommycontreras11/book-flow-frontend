'use server'

import axios from "axios"
import { config } from "./config"
import { ICreatePublisher, IUpdatePublisher } from "@/interfaces/publisher.interface"

export const getAllPublisher = async () => {
    try {
        const response = await axios.get(config.apiURL + '/publishers')
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const getOnePublisher = async (uuid: string) => {
    try {
        const response = await axios.get(config.apiURL + '/publishers/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const createPublisher = async (publisher: ICreatePublisher) => {
    try {
        const response = await axios.post(config.apiURL + '/publishers', publisher)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const updatePublisher = async (uuid: string, publisher: IUpdatePublisher) => {
    try {
        const response = await axios.patch(config.apiURL + '/publishers/' + uuid, publisher)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const deletePublisher = async (uuid: string) => {
    try {
        const response = await axios.delete(config.apiURL + '/publishers/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}