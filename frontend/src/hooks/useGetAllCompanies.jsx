import { setCompanies } from '@/redux/companySlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch()
     useEffect(() => {
        const fetechCompanies = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/companies/getCompany`,{
                    withCredentials: true
                })
                if(response.data.success){
                    dispatch(setCompanies(response.data.companies))
                    // console.log(response.data.jobs)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetechCompanies() //call kar diya 
     }, [])
}

export default useGetAllCompanies