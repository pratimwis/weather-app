import React, { useState } from 'react'
import SearchHistoryModal from '../utils/SearchHistoryModal';
import BookmarkModal from '../utils/BookmarkModal';

const HistoryBookmark = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBookmarkOpen,setIsBookmarkOpen] = useState(false)
  return (
    <div className='text-white font-semibold pl-7 grid grid-cols-2 gap-4'>
      <button className=' px-6 py-2 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 shadow-md'
      onClick={() => setIsOpen(true)}
      >History</button>
      <SearchHistoryModal isOpen={isOpen} setIsOpen={setIsOpen} />


      <button className='px-6 py-2 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 shadow-md' onClick={()=>setIsBookmarkOpen(true)}>Bookmark</button>
      <BookmarkModal isOpen={isBookmarkOpen} setIsOpen={setIsBookmarkOpen}/>

    </div>
  )
}

export default HistoryBookmark