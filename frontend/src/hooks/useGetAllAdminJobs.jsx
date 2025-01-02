import { setAllAdminJobs } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/jobs/getadminJobs`,{
                 
                    withCredentials:true
                });
                // console.log('Response Status:', response.status);
                // console.log('Response Data:', response.data);
                
                if(response.data.success){
                    dispatch(setAllAdminJobs(response.data.jobs));
                } else {
                    console.error('Failed to fetch admin jobs:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching admin jobs:', error.response ? error.response.data : error.message);
            }
        }
        fetchAllAdminJobs();
    },[])
}

export default useGetAllAdminJobs