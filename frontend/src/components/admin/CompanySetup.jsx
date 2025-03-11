import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import useGetComapnyById from '@/hooks/useGetCompanyById'
import Footer from '../shared/Footer'

const CompanySetup = () => {
    const params = useParams()
    useGetComapnyById(params.id)
    const[input, setInput] = useState({
        name:"",
        description: "",
        website: "",
        location: "",
        file: null
    })

    const[loading, setLoading] = useState(false)
    const { singleCompany } = useSelector(store=>store.company)
    const navigate = useNavigate()

    const HandleInput = (e) =>{
        setInput({...input, [e.target.name]: e.target.value})
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setInput({ ...input, file });
      };

      const submitHandler = async(e) => {
        e.preventDefault()
        // console.log(input)

        const formdata = new FormData()
        formdata.append("name", input.name)
        formdata.append("description", input.description)
        formdata.append("website", input.website)
        formdata.append("location", input.location)
        
        if(input.file){
            formdata.append("file", input.file)
        }
        try {
            setLoading(true)
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/companies/updateCompany/${params.id}`,formdata, {
                headers:{
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            console.log(response)
            if(response.data.success){
                toast.success(response.data.message)
                navigate("/admin/companies")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
         
           
        }
        finally{
            setLoading(false)
        }
      }

      useEffect(()=>{
        setInput({
            name:singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
      }, [singleCompany])
  return (
    <div className='min-h-screen'>
  <Navbar />
  <div className="max-w-3xl mx-auto my-10 px-4 sm:px-6 md:px-8">
    <form  onSubmit={submitHandler}>
      <div className="flex items-center gap-5 p-8">
        <Button onClick={() => navigate("/admin/companies")} className="flex items-center gap-2 font-semibold">
          <ArrowLeft />
          <span>Back</span>
        </Button>
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">Company Setup</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-8 ">
        <div>
          <Label>Company Name</Label>
          <Input
            type="text"
            placeholder="Enter Company Name"
            className="mt-2 w-full"
            value={input.name}
            onChange={HandleInput}
            name="name"
          />
        </div>

        <div>
          <Label>Description</Label>
          <Input
            type="text"
            placeholder="Enter Description"
            className="mt-2 w-full"
            value={input.description}
            onChange={HandleInput}
            name="description"
          />
        </div>

        <div>
          <Label>Website</Label>
          <Input
            type="text"
            placeholder="Enter Website"
            className="mt-2 w-full"
            value={input.website}
            onChange={HandleInput}
            name="website"
          />
        </div>

        <div>
          <Label>Location</Label>
          <Input
            type="text"
            placeholder="Enter Location"
            className="mt-2 w-full"
            value={input.location}
            onChange={HandleInput}
            name="location"
          />
        </div>

        <div>
          <Label>Logo</Label>
          <Input
            type="file"
            accept="image/*"
            className="mt-2 cursor-pointer w-full"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {
        loading ? (
          <Button className="w-full my-5">
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
            Please Wait
          </Button>
        ) : (
          <Button type="submit" className="text-center w-full font-semibold">
            Update
          </Button>
        )
      }
    </form>
  </div>
  <Footer/>
</div>

  )
}

export default CompanySetup