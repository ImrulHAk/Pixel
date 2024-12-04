import React, { useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Avatar,
  CardHeader,
} from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';

const Friendlist = () => {
  const db = getDatabase();
  let [friendlist, setFriendlist] = useState([])
  let data = useSelector((state) => state.user.value)

  useEffect(() => {
    const friendrequestListRef = ref(db, 'friend/');
    onValue(friendrequestListRef, (snapshot) => {
      let array = []
      snapshot.forEach((item) => {
        if (data.uid == item.val().senderid || data.uid == item.val().reciverid) {
          array.push({ ...item.val(), id: item.key })
        }
      })
      setFriendlist(array);
    });
  }, []);

  let handleBlock = (item) => {
    if(data.uid == item.senderid){
      set(push(ref(db, 'blocklist/')), {
        blockby: item.sendername,
        blockbyid: item.senderid,
        block: item.recivername,
        blockid: item.reciverid,
        blockphoto: item.reciverphoto,
      }).then(() => {
        remove(ref(db, 'friend/' + item.id))
      });
    }else{
      set(push(ref(db, 'blocklist/')), {
        blockby: item.recivername,
        blockbyid: item.reciverid,
        block: item.sendername,
        blockid: item.senderid,
        blockphoto: item.senderphoto,
      }).then(() => {
        remove(ref(db, 'friend/' + item.id))
      });
    }
  }

  return (
    <div>
      <Card className="mt-6 w-[345px] h-[450px] border border-gray-300">
        <CardBody>
          <div className='flex justify-between items-center '>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Friends
            </Typography>
            <BsThreeDotsVertical />
          </div>
          <div className="h-[350px] overflow-y-scroll mt-[20px]">
            {friendlist.length > 0 ?
            friendlist.map((item) => (
              <Card color="transparent" shadow={true} className="w-full h-[70px]">
                <CardHeader
                  color="transparent"
                  floated={false}
                  shadow={false}
                  className="flex items-center gap-4 pb-4 "
                >
                  {data.uid == item.senderid ?
                    <Avatar
                      size="sm"
                      variant="circular"
                      src={item.reciverphoto}
                    /> :
                    <Avatar
                      size="sm"
                      variant="circular"
                      src={item.senderphoto}
                    />
                  }
                  <div className="flex w-full flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      {data.uid == item.senderid ? (
                        <Typography variant="h5" color="blue-gray" className='font-semibold text-[14px]'>
                          {item.recivername}
                        </Typography>
                      ) : (
                        <Typography variant="h5" color="blue-gray" className='font-semibold text-[14px]'>
                          {item.sendername}
                        </Typography>
                      )}
                    </div>
                    {data.uid == item.senderid ? (
                      <Typography color="blue-gray" className='font-medium text-[10px] text-[#000000]/50%'>
                        {item.reciveremail}
                      </Typography>
                    ) : (
                      <Typography color="blue-gray" className='font-medium text-[10px] text-[#000000]/50%'>
                        {item.senderemail}
                      </Typography>
                    )}
                  </div>
                  <button onClick={() => handleBlock(item)} className=' bg-[#03014C] px-2 py-1 rounded-md text-white text-sm mr-1 '>Block</button>
                </CardHeader>
              </Card>
            )) :
            <p>Friend not found</p>
            }
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Friendlist