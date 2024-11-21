import React, { useEffect } from 'react'
import Userlist from './components/Userlist'
import Friendlist from './components/Friendlist'
import Grouplist from './components/Grouplist'
import FriendRequest from './components/FriendRequest'
import MyGroup from './components/MyGroup'
import Blocklist from './components/Blocklist'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { userLoginInfo } from '../slices/userSlice'
import Searchbar from './components/Searchbar'


const Home = () => {
  const auth = getAuth();
  let dispatch = useDispatch()
  let navigate = useNavigate();
  let data = useSelector((state) => state.user.value);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (user.emailVerified) {
        dispatch(userLoginInfo(user));
      }
    } else {
      // User is signed out
      // ...
    }
  });

  useEffect(() => {
    if (!data) {
      navigate("/login")
    } else if (!data.emailVerified) {
      navigate("/login")
    }
  }, [])
  return (
    <div className='mt-[40px]'>
      <div>
        <Searchbar />
      </div>
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