import React, { useState } from 'react'
import SearchHistoryModal from '../utils/SearchHistoryModal';
import BookmarkModal from '../utils/BookmarkModal';
import { Bookmark, History } from 'lucide-react';

const HistoryBookmark = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBookmarkOpen,setIsBookmarkOpen] = useState(false)
  return (
    <div className='text-white font-semibold flex gap-3 pl-4'>
      <button className='text-sm md:px-4 p-4 py-1 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 shadow-md '
      onClick={() => setIsOpen(true)}
      >
        <span className='hidden md:inline'>History</span>
        <span className='inline md:hidden'><History/></span>
      </button>
      <SearchHistoryModal isOpen={isOpen} setIsOpen={setIsOpen} />


      <button className='text-sm md:px-4 p-4 py-1 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 shadow-md' onClick={()=>setIsBookmarkOpen(true)}>
        <span className='hidden md:inline '>Bookmark</span>
        <span className='inline md:hidden'><Bookmark /></span>
      </button>
      <BookmarkModal isOpen={isBookmarkOpen} setIsOpen={setIsBookmarkOpen}/>

    </div>
  )
}

export default HistoryBookmark