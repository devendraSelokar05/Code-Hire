
import { useDarkMode } from '@/components/context/DarkMode'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { setSearchQuery } from '@/redux/jobSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'


const FilterData = [
    {
        filterType: 'Location',
        array:["Delhi", "Hyderabad", "Mumbai", "Pune", "Chennai"]
    },
    {
        filterType: 'Industry',
        array:["IT", "Bussiness", "Finance", "HR", "Sales"]
    },
 
    {
        filterType: 'Salary',
        array:["1-2 LPA", "2-4 LPA", "4-6 LPA", "6-8 LPA", "8-10 LPA", "10-12 LPA", "12-14 LPA", "14-16 LPA", "16-18 LPA", "18-20 LPA", "20-25 LPA"]
    }
]
const FilterCard = () => {
   const[selectedValue, setSelectedValue] = useState('')
   const dispatch = useDispatch()

   const handleValueChange = (value) => {
    setSelectedValue(value);
   }

   useEffect(()=>{
        dispatch(setSearchQuery(selectedValue))
   },[selectedValue]) // tab tab call hoga jab jab selectedValue change hoga

   const {isDarkMode} = useDarkMode()
  return (
    
    <div className={`w-full  p-12 mb-3  sm:p-2 lg:p-5 rounded-md shadow-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h1 className="text-base sm:text-lg font-bold">Filter Jobs</h1>
      
      <hr className="my-3" />
      
      <RadioGroup 
        value={selectedValue} 
        onValueChange={handleValueChange}
        className="space-y-4 sm:space-y-6"
      >
        {FilterData.map((data, index1) => (
          <div key={index1} className="space-y-2  sm:space-y-2">
            <h2 className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {data.filterType}
            </h2>
            
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-1 gap-2">
              {data.array.map((item, index2) => {
                const uniqueId = `${index1}-${index2}`; //unique id will get while subtracting index1 from index2
                return (
                  <div 
                    key={uniqueId} 
                    className={`flex items-center space-x-2 p-1 rounded-md transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}
                  >
                    <RadioGroupItem 
                      value={item} 
                      id={uniqueId}
                      className="text-sm sm:text-base" 
                    />
                    <Label 
                      htmlFor={uniqueId}
                      className="text-sm sm:text-base cursor-pointer"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterCard