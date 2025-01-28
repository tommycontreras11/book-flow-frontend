'use server'

import axios from "axios"
import { config } from "./config"
import { ICreateLoanManagement, ILoanManagementFilter, IUpdateLoanManagement } from "@/interfaces/loan-management.interface"

export const getAllLoanManagement = async (filters: ILoanManagementFilter) => {
    try {
        let filtersString = appendFilterString(filters);

        const response = await axios.get(config.apiURL + '/loan-managements/' + filtersString)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

const appendSignFilterString = async(filter?: string) => {
    return filter !== null ? '&' : '?'; 
}

const appendFilterString = async(filters: ILoanManagementFilter, filtersString?: string) => {
    filters?.bibliographyType && (filtersString += `?bibliography_type=${filters.bibliographyType}${appendSignFilterString(filters?.language)}`)
    filters?.language && (filtersString += `${appendSignFilterString(filters?.bibliographyType)}language=${filters.language}${appendSignFilterString(filters?.dateLoan)}}`)
    filters?.dateLoan && (filtersString += `${appendSignFilterString(filters?.language)}dateLoan=${filters.dateLoan}${appendSignFilterString(filters?.dateReturn)}`)
    filters?.dateReturn && (filtersString += `${appendSignFilterString(filters?.dateLoan)}dateReturn=${filters.dateReturn}`)
    
    return filtersString;
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