import React from 'react'
import Userlist from './components/userlist'
import Friendlist from './components/Friendlist'
import Grouplist from './components/Grouplist'
import FriendRequest from './components/FriendRequest'
import MyGroup from './components/MyGroup'
import Blocklist from './components/Blocklist'

const Home = () => {
  return (
    <div className='mt-[40px]'>
      <div className='flex gap-[30px]'>
        <Grouplist />
        <Friendlist />
        <Userlist />
      </div>
      <div className='flex gap-[30px]'>
        <FriendRequest />
        <MyGroup />
        <Blocklist />
      </div>
    </div>
  )
}

export default Home