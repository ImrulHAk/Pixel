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

  return (
    <div>
      <Card className="mt-6 w-[427px] h-[450px] ">
        <CardBody>
          <div className='flex justify-between items-center '>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Friend Request
            </Typography>
            <BsThreeDotsVertical />
          </div>
          <div className="h-[350px] overflow-y-scroll mt-[20px]">
            {friendrequestlist.map((item) => (
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
                    alt=" "
                  />
                  <div className="flex w-full flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <Typography variant="h5" color="blue-gray" className='font-semibold text-[14px]'>
                        {item.sendername}
                      </Typography>
                    </div>
                    <Typography color="blue-gray" className='font-medium text-[10px] text-[#000000]/50%'>{item.senderemail.slice(0, 12)}...</Typography>
                  </div>
                  <Button
                    onClick={() => handleFriend(item)}
                    className=' w-28 bg-[#03014C] rounded-[5px] mr-1 capitalize font-normal text-sm'
                    size="sm">accept</Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default FriendRequest