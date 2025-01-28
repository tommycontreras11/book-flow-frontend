'use server'

import axios from "axios"
import { config } from "./config"
import { ICreateBook, IUpdateBook } from "@/interfaces/book.interface"

export const getAllBook = async () => {
    try {
        const response = await axios.get(config.apiURL + '/books')
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const getOneBook = async (uuid: string) => {
    try {
        const response = await axios.get(config.apiURL + '/books/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const createBook = async (book: ICreateBook) => {
    try {
        const response = await axios.post(config.apiURL + '/books', book)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const updateBook = async (uuid: string, book: IUpdateBook) => {
    try {
        const response = await axios.patch(config.apiURL + '/books/' + uuid, book)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const deleteBook = async (uuid: string) => {
    try {
        const response = await axios.delete(config.apiURL + '/books/' + uuid)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}