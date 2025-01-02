import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '@/redux/applicationSlice'
import { toast } from 'sonner'

const Applicant = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const {applicants} = useSelector(store=>store.application)
    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/applications/${params.id}/applicants`, {
                    withCredentials: true
                })
                console.log(response)
                if(response.data.success){
                    dispatch(setApplicants(response.data.job))
                    toast.success(response.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllApplicants()
    }, [])
  return (
    <div>
    <Navbar />
    <div className='w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl my-5'>
            Applicants {applicants?.applications?.length}
        </h1>
        <ApplicantsTable />
    </div>
</div>

  )
}

export default Applicant