import { useDarkMode } from '@/components/context/DarkMode'
import { Button } from '@/components/ui/button'
import { setSearchQuery} from '@/redux/jobSlice'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const[query, setQuery] =useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isDarkMode} = useDarkMode()

  const searchJobHandler = () => {
    dispatch(setSearchQuery(query))
    navigate('/browse')
  }
  return (
    <div className={`text-center px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>
    <div className="flex flex-col gap-4 sm:gap-5 my-6 sm:my-8 lg:my-10 max-w-4xl mx-auto">
      {/* Badge */}
      <span className={`mx-auto text-xl sm:text-2xl lg:text-3xl font-bold px-4 py-1 sm:py-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-slate-400'}`}>
        No1 Job Hunt website
      </span>

      {/* Heading */}
      <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
        Search, Apply & <br className="sm:hidden" />
        Get Your <span className="text-[#4f3489]">Dream Job</span>
      </h1>

      {/* Description */}
      <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt cum animi a, 
        ex autem odit et minima facere optio neque officiis, expedita laboriosam quasi molestias 
        asperiores! Voluptate nihil ipsa expedita! 
        Voluptatum vero molestiae iusto cum vel,
      </p>

      {/* Search Bar */}
      <div className="flex w-full sm:w-[80%] lg:w-[60%] shadow-lg mx-auto rounded-full items-center gap-2 bg-white p-1">
        <input
          type="text"
          className="w-full py-2 px-4 border-none outline-none rounded-l-full text-sm sm:text-black"
          placeholder="Find Your Dream Jobs"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          onClick={searchJobHandler}
          className="rounded-r-full bg-[#4f3489] hover:bg-[#3b2666] px-4 sm:px-4"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>
    </div>
  </div>
  )
}

export default HeroSection