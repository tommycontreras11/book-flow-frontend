'use server'

import axios from "axios"
import { config } from "./config"
import { ICreateLoanManagement, ILoanManagementFilter, IUpdateLoanManagement } from "@/interfaces/loan-management.interface"

export const getAllLoanManagement = async (filters: ILoanManagementFilter) => {
    try {
        let filtersString = '';
        filters?.bibliographyType && (filtersString += `?bibliography_type=${filters.bibliographyType}${appendFilterString(filters?.language)}`)
        filters?.language && (filtersString += `${appendFilterString(filters?.bibliographyType)}language=${filters.language}${appendFilterString(filters?.dateLoan)}}`)
        filters?.dateLoan && (filtersString += `${appendFilterString(filters?.language)}dateLoan=${filters.dateLoan}${appendFilterString(filters?.dateReturn)}`)
        filters?.dateReturn && (filtersString += `${appendFilterString(filters?.dateLoan)}dateReturn=${filters.dateReturn}`)

        const response = await axios.get(config.apiURL + '/loan-managements')
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

const appendFilterString = async(filter?: string) => {
    return filter !== null ? '&' : '?'; 
}

export const getOneLoanManagement = async (uuid: string) => {
    try {
        const response = await axios.get(config.apiURL + '/loan-managements/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const createLoanManagement = async (loanManagement: ICreateLoanManagement) => {
    try {
        const response = await axios.post(config.apiURL + '/loan-managements', loanManagement)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const updateLoanManagement = async (uuid: string, loanManagement: IUpdateLoanManagement) => {
    try {
        const response = await axios.patch(config.apiURL + '/loan-managements/' + uuid, loanManagement)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const deleteLoanManagement = async (uuid: string) => {
    try {
        const response = await axios.delete(config.apiURL + '/loan-managements/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}