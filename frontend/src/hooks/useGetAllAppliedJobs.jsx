import { setAllAppliedJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAppliedJobs = () => {
    const dispatch = useDispatch()
     useEffect(() => {
        const fetechAppliedJobs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/applications/get`,{
                    withCredentials: true
                })
                // console.log(response)
                if(response.data.success){
                    dispatch(setAllAppliedJobs(response.data.application))
                    // console.log(response.data.jobs)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetechAppliedJobs() //call kar diya 
     }, [])
}

export default useGetAllAppliedJobs