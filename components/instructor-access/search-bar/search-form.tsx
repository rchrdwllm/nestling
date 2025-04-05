'use client'

import MotionWrapper from "@/components/wrappers/motion-wrapper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const SearchForm = () => {
  return (
    <MotionWrapper initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} exit={{
      opacity: 0,
      y: 10
    }} className='absolute h-96 bg-card w-full mt-2 shadow-sm border border-border rounded-md p-4'>
      <Tabs defaultValue="students" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="students">Students</TabsTrigger>
          <TabsTrigger className="w-full" value="courses">Courses</TabsTrigger>
          <TabsTrigger className="w-full" value="projects">Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="students">Make changes to your account here.</TabsContent>
        <TabsContent value="courses">Change your password here.</TabsContent>
        <TabsContent value="projects">Change your password here.</TabsContent>
      </Tabs>
    </MotionWrapper>
  )
}

export default SearchForm
