'use server'

import axios from "axios"
import { config } from "./config"
import { ICreateEmployee, IUpdateEmployee } from "@/interfaces/employee.interface"

export const getAllEmployee = async () => {
    try {
        const response = await axios.get(config.apiURL + '/employees')
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const getOneEmployee = async (uuid: string) => {
    try {
        const response = await axios.get(config.apiURL + '/employees/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const createEmployee = async (employee: ICreateEmployee) => {
    try {
        const response = await axios.post(config.apiURL + '/employees', employee)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const updateEmployee = async (uuid: string, employee: IUpdateEmployee) => {
    try {
        const response = await axios.patch(config.apiURL + '/employees/' + uuid, employee)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const deleteEmployee = async (uuid: string) => {
    try {
        const response = await axios.delete(config.apiURL + '/employees/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}