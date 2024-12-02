import React, { useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Avatar,
  CardHeader,
  IconButton,
} from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';

const FriendRequest = () => {
  const db = getDatabase();
  let [friendrequestlist, setFriendrequestlist] = useState([])
  let data = useSelector((state) => state.user.value)

  useEffect(() => {
    const friendrequestListRef = ref(db, 'friendrequest/');
    onValue(friendrequestListRef, (snapshot) => {
      let array = []
      snapshot.forEach((item) => {
        if (data.uid == item.val().reciverid) {
          array.push({ ...item.val(), id: item.key })
        }
      })
      setFriendrequestlist(array);
    });
  }, []);

  let handleFriend = (item) => {
    set(push(ref(db, 'friend/')), {
      ...item,
    }).then(() => {
      remove(ref(db, 'friendrequest/' + item.id))
    });
  }

  let handleDelete=(item)=>{
    remove(ref(db, 'friendrequest/' + item.id))
  }

  return (
    <div>
      <Card className="mt-6 w-[427px] h-[450px] border border-gray-300 ">
        <CardBody>
          <div className='flex justify-between items-center '>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Friend Request
            </Typography>
            <BsThreeDotsVertical />
          </div>
          <div className="h-[350px] overflow-y-scroll mt-[20px]">
            {friendrequestlist.length > 0 ?
            friendrequestlist.map((item) => (
              <Card color="transparent" shadow={true} className="w-full h-[70px] ">
                <CardHeader
                  color="transparent"
                  floated={false}
                  shadow={false}
                  className="flex items-center gap-4 pb-4 "
                >
                  <Avatar
                    size="sm"
                    variant="circular"
                    src={item.senderphoto}
                  />
                  <div className="flex w-full flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <Typography variant="h5" color="blue-gray" className='font-semibold text-[14px]'>
                        {item.sendername}
                      </Typography>
                    </div>
                    <Typography color="blue-gray" className='font-medium text-[10px] text-[#000000]/50%'>{item.senderemail.slice(0, 12)}...</Typography>
                  </div>
                  <div className=' flex items-center gap-2 mr-1 '>
                    <button onClick={() => handleFriend(item)} className=' bg-[#03014C] px-2 py-1 rounded-md text-white text-sm '>Accept</button>
                    <button onClick={() => handleDelete(item)} className=' bg-[#03014C] px-2 py-1 rounded-md text-white text-sm '>Delete</button>
                  </div>
                </CardHeader>
              </Card>
            )) :
            <p>Friend request not found</p>
            }
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default FriendRequest