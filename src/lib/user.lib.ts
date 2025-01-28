'use server'

import axios from "axios"
import { config } from "./config"
import { ICreateUser, IUpdateUser } from "@/interfaces/user.interface"

export const getAllUser = async () => {
    try {
        const response = await axios.get(config.apiURL + '/users')
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const getOneUser = async (uuid: string) => {
    try {
        const response = await axios.get(config.apiURL + '/users/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const createUser = async (user: ICreateUser) => {
    try {
        const response = await axios.post(config.apiURL + '/users', user)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const updateUser = async (uuid: string, user: IUpdateUser) => {
    try {
        const response = await axios.patch(config.apiURL + '/users/' + uuid, user)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const deleteUser = async (uuid: string) => {
    try {
        const response = await axios.delete(config.apiURL + '/users/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}