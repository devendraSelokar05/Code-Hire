import { setAllJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const{searchQuery} = useSelector(state => state.job)
    const dispatch = useDispatch()
     useEffect(() => {
        const fetechAllJobs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/jobs/getJob?keywords=${searchQuery}`,{
                    withCredentials: true
                })
                if(response.data.success){
                    dispatch(setAllJobs(response.data.jobs))
                    // console.log(response.data.jobs)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetechAllJobs() //call kar diya 
     }, [])
}

export default useGetAllJobs