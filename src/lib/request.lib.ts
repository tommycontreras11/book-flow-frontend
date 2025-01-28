'use server'

import axios from "axios"
import { config } from "./config"
import { ICreateRequest, IUpdateRequest } from "@/interfaces/request.interface"

export const getAllRequest = async () => {
    try {
        const response = await axios.get(config.apiURL + '/requests')
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const getOneRequest = async (uuid: string) => {
    try {
        const response = await axios.get(config.apiURL + '/requests/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const createRequest = async (request: ICreateRequest) => {
    try {
        const response = await axios.post(config.apiURL + '/requests', request)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const updateRequest = async (uuid: string, request: IUpdateRequest) => {
    try {
        const response = await axios.patch(config.apiURL + '/requests/' + uuid, request)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const deleteRequest = async (uuid: string) => {
    try {
        const response = await axios.delete(config.apiURL + '/requests/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}