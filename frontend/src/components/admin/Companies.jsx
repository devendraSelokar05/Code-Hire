import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import CompaniesTable from './CompaniesTable'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { useDarkMode } from '../context/DarkMode'

const Companies = () => {
  //i want all my companies so for that i have used useGetAllCompanies here
  useGetAllCompanies();
  //creating local state for comapny search
  const[input, setInput] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{   //I Have to call useEffect whenever keyword changes
    dispatch(setSearchCompanyByText(input))

  }, [input])
  const {isDarkMode} = useDarkMode()
  return (
    <div className='min-h-screen'>
  <Navbar />
  <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8 ">
    <div className="flex flex-col  sm:flex-row items-center space-y-5 sm:space-y-0 sm:space-x-2">
      {/* Filter Input */}
      <Input
        className={`w-full py-7 placeholder:text-gray-00  sm:w-[50%] ${isDarkMode && 'text-white bg-gray-800'}`}
        placeholder="Filter By Name"
        type="text"
        onChange={(e) => setInput(e.target.value)}
      />
      {/* New Company Button */}
      <Button onClick={() => navigate("/admin/companies/create")} className="w-full py-7 px-6 sm:w-auto">
        New Company
      </Button>
    </div>
  </div>
  <CompaniesTable />
</div>

  )
}

export default Companies