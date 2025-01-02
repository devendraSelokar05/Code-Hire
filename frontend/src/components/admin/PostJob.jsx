import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { toast } from 'sonner'
import { useDarkMode } from '../context/DarkMode'

const companyArray=[] //comapny honi chaiye databse me
const PostJob = () => {
    const [input, setInput] = useState({
        title:"",
        description: "",
        requirements: "",
        salary:"",
        experience: "",
        location: "",
        jobType: "",
        position: 0,
        companyId: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {isDarkMode} = useDarkMode()
    const { companies } = useSelector(store=>store.company)
    
    const HandleInput = (e) =>{
        setInput({...input, [e.target.name]: e.target.value})
    }

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=>company.name.toLowerCase() === value)
        setInput({ ...input, companyId:selectedCompany._id })
      };
      

      const submitHandler = async(e) => {
        e.preventDefault()
        // console.log(input)

        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/jobs/postJob`,input, {
                headers:{
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            console.log(response)
            if(response.data.success){
                toast.success(response.data.message)
                navigate("/admin/jobs")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
         
           
        }
        finally{
            setLoading(false)
        }
      }
  return (
    <div className='min-h-screen'>
      <Navbar />    
      <div className="flex items-center justify-center my-5 px-4 sm:px-8">
  <form onSubmit={submitHandler} className="max-w-4xl w-full p-8 border border-gray-300 rounded-md shadow-lg">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label>Title</Label>
        <Input
          type="text"
          className={`focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full ${isDarkMode && 'text-white bg-gray-700'}`}
          value={input.title}
          onChange={HandleInput}
          name="title"
        />
      </div>

      <div>
        <Label>Description</Label>
        <Input
          type="text"
          className={`focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full ${isDarkMode && 'text-white bg-gray-700'}`}
          value={input.description}
          onChange={HandleInput}
          name="description"
        />
      </div>

      <div>
        <Label>Requirements</Label>
        <Input
          type="text"
          className={`focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full ${isDarkMode && 'text-white bg-gray-700'}`}
          value={input.requirements}
          onChange={HandleInput}
          name="requirements"
        />
      </div>

      <div>
        <Label>Salary</Label>
        <Input
          type="number"
          className={`focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full ${isDarkMode && 'text-white bg-gray-700'}`}
          value={input.salary}
          onChange={HandleInput}
          name="salary"
        />
      </div>

      <div>
        <Label>Location</Label>
        <Input
          type="text"
          className={`focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full ${isDarkMode && 'text-white bg-gray-700'}`}
          value={input.location}
          onChange={HandleInput}
          name="location"
        />
      </div>

      <div>
        <Label>Job Type</Label>
        <Input
          type="text"
          className={`focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full ${isDarkMode && 'text-white bg-gray-700'}`}
          value={input.jobType}
          onChange={HandleInput}
          name="jobType"
        />
      </div>

      <div>
        <Label>Experience Level</Label>
        <Input
          type="number"
          className={`focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full ${isDarkMode && 'text-white bg-gray-700'}`}
          value={input.experience}
          onChange={HandleInput}
          name="experience"
        />
      </div>

      <div>
        <Label>No of Positions</Label>
        <Input
          type="number"
          className={`focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full ${isDarkMode && 'text-white bg-gray-700'}`}
          value={input.position}
          onChange={HandleInput}
          name="position"
        />
      </div>

      {companies.length > 0 && (
        <div>
          <Label>Company</Label>
          <Select  onValueChange={selectChangeHandler}>
            <SelectTrigger className={isDarkMode && 'bg-gray-700'}>
              <SelectValue  placeholder={'Select a Company'} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {companies.map((company) => (
                  <SelectItem value={company?.name?.toLowerCase()} key={company._id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>

    {loading ? (
      <Button className="w-full my-5 flex justify-center items-center">
        <Loader2 className="animate-spin mr-2 h-4 w-4" />
        Please Wait
      </Button>
    ) : (
      <Button type="submit" className="text-center w-full font-semibold mt-4">
        Post New Job
      </Button>
    )}

    {companies.length === 0 && (
      <p className="text-xs font-bold text-center mt-4 text-violet-600 hover:underline cursor-pointer">
        Please Register A Company First Before Posting A Job
      </p>
    )}
  </form>
</div>
</div>


  )
}

export default PostJob