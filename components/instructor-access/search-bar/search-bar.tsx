'use client'

import React, { useState } from 'react'
import { Input } from '../../ui/input'
import { Search } from 'lucide-react'
import MotionWrapper from '../../wrappers/motion-wrapper'
import SearchForm from './search-form'
import { AnimatePresence } from 'motion/react'

const SearchBar = () => {
  const [isClicked, setIsClicked] = useState(false)

  return (
    <div className='relative'>
      <Input Icon={Search} placeholder='Search' onClick={() => setIsClicked(true)} />
      <AnimatePresence>
        {isClicked && (
          <SearchForm />
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchBar
