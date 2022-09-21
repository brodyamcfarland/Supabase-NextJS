import React, { useEffect } from 'react'
import { ProfileCache } from '../utils/types'



const UserList = ({profileCache}: {profileCache: ProfileCache}) => {
 
  return (
    <div className='mx-3 md:mx-20'>
        <div className='flex gap-2 overflow-x-scroll scrollbar-hide pb-1 bg-[#000000] border-gray-700 border-r-[1px] border-l-[1px] px-2'>
            {Object.values(profileCache).map((profile) => (
            <p className='flex bg-orange-800 flex-shrink-0 font-bold items-center justify-center rounded-full w-8 h-8' key={profile.id} title={profile.username}>
                {profile.username.slice(0,2).toUpperCase()}
            </p>
            ))}
        </div>
    </div>
  )
}

export default UserList;