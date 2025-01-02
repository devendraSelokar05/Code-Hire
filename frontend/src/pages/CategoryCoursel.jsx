import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { setSearchQuery } from '@/redux/jobSlice'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const category = [
  "Fullstack Developer",
  "Devops Engineer",
  "Data Science",
  "Cloud Computing",
  "Cyber Security",
  "Machine Learning",
  "Blockchain",
  "Graphic Designer",
  "Web Designer",
  "UI/UX Designer",
  "Video Editor",
]
const CategoryCoursel = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
  const searchJobHandler = (query) => {
    dispatch(setSearchQuery(query))
    navigate('/browse')
  }
  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <Carousel className="w-[80%] sm:w-[95%] lg:w-[80%] max-w-xs sm:max-w-md lg:max-w-xl mx-auto my-8 sm:my-12 lg:my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className=" basis-1/2 md:basis-1/3 lg-basis-1/3">
                                <Button onClick={() => searchJobHandler(cat)}  variant="outline"  className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
    </div>
  )
}

export default CategoryCoursel