import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import axios from 'axios'
import { toast } from 'sonner'
import { useDarkMode } from '../context/DarkMode'
import Footer from '../shared/Footer'

const CompanyCreate = () => {
    const navigate = useNavigate()
    const [companyName, setCompanyName] = useState("")
    const dispatch = useDispatch()
    const {isDarkMode} = useDarkMode()
    const registerNewCompany = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/companies/register`,{companyName}, {
                headers: {
                   "Content-Type": "application/json"
                },
                withCredentials: true
            }) 
            // console.log(response)
            if(response.data.success){
                dispatch(setSingleCompany(response.data.company))
                toast.success(response.data.message)
                const companyId = response?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

  return (
    <div>
    <div className='min-h-screen'>
  <Navbar />
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="my-10">
      <h1 className="font-bold text-2xl sm:text-4xl">Your Company Name</h1>
      <p className="text-gray-500 text-sm sm:text-base">
        What would you like to give your company name? You can change this later.
      </p>
    </div>

    <Label className="text-sm sm:text-base">Company Name</Label>
    <Input
      type="text"
      className={`my-2 w-full sm:w-3/ $ {isDarkMode && 'bg-white text-black} `}
      placeholder="JobHunt, Microsoft etc."
      onChange={(e) => setCompanyName(e.target.value)}
    />
    <div className="flex flex-col sm:flex-row items-center gap-4 my-10">
      <Button
        variant="outline"
        onClick={() => navigate("/admin/companies")}
        className="w-full sm:w-auto"
      >
        Cancel
      </Button>
      <Button
        onClick={registerNewCompany}
        className="w-full sm:w-auto mt-4 sm:mt-0"
      >
        Continue
      </Button>
    </div>
  
  </div>

</div>
<Footer />
</div>

  )
}

export default CompanyCreate