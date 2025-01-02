import { setSingleCompany } from '@/redux/companySlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetComapnyById = (companyId) => {
    const dispatch = useDispatch()

     useEffect(() => {
        const fetechSingleCompanyById = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/companies/getCompany/${companyId}`,{
                    withCredentials: true
                })
                if(response.data.success){
                    dispatch(setSingleCompany(response.data.company))

                    // console.log(response.data.jobs)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetechSingleCompanyById() //call kar diya 
     }, [companyId, dispatch]) //companyId jab jab change hogi tab tab hame dispatch karenge
}

export default useGetComapnyById