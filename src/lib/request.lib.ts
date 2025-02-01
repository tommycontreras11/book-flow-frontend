'use server'

import axios from "axios"
import { config } from "./config"
import { ICreateRequest, IUpdateRequest, IUpdateRequestEmployeeStatus } from "@/interfaces/request.interface"
import { StatusRequestEnum } from "@/enums/request.enum"
import { getCookie } from "./auth.lib"

export const getAllRequest = async (status?: StatusRequestEnum) => {
    try {
        const jwt = await getCookie();
        const response = await axios.get(`${config.apiURL}/requests${status ? `?status=${status}` : ''}`,  {
            headers: {
                Authorization: jwt
            }
        })
        return response.data
    } catch (error) {
        return error        
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

export const updateRequestEmployeeStatus = async ({ employeeUUID, requestUUID, status }: IUpdateRequestEmployeeStatus) => {
    try {
        const jwt = await getCookie();
        const response = await axios.patch(`${config.apiURL}/requests/${requestUUID}/employees/${employeeUUID}/status`, { status }, {
            headers: {
                Authorization: jwt
            }
        })
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
