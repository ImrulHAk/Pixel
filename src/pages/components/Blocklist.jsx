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

const Blocklist = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.user.value)
  let [blocklist, setBlocklist] = useState([])
  let [friendlist, setFriendlist] = useState([])

  useEffect(() => {
    const blocklistref = ref(db, 'blocklist/');
    onValue(blocklistref, (snapshot) => {
      let array = []
      snapshot.forEach((item) => {
        if (data.uid == item.val().blockbyid) {
          array.push({ ...item.val(), id: item.key });
        }
      })
      setBlocklist(array);
    });
  }, []);

  let handleUnblock = (item) => {
    remove(ref(db, 'blocklist/' + item.id))
      .then(() => {
        const friendsRef = ref(db, 'friend/' + data.uid);
        push(friendsRef, {
          friendid: item.blockid,
          friendname: item.block,
          friendphoto: item.blockphoto,
        })
      })
  };
  useEffect(() => {
    const friendsRef = ref(db, 'friend/' + data.uid);
    onValue(friendsRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push({ ...item.val(), id: item.key});
      });
      setFriendlist(array);
    });
  }, []);

  return (
    <div>
      <Card className="mt-6 w-[345px] h-[450px] border border-gray-300">
        <CardBody>
          <div className='flex justify-between items-center '>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Blocked Users
            </Typography>
            <BsThreeDotsVertical />
          </div>
          <div className="h-[350px] overflow-y-scroll mt-[20px] ">
            {blocklist.length > 0 ?
              blocklist.map((item) => (
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
                      src={item.blockphoto}
                    />
                    <div className="flex w-full flex-col gap-0.5">
                      <div className="flex items-center justify-between">
                        <Typography variant="h5" color="blue-gray" className='font-semibold text-[14px]'>
                          {item.block}
                        </Typography>
                      </div>
                    </div>
                    <button onClick={() => handleUnblock(item)} className=' bg-[#03014C] px-2 py-1 rounded-md text-white text-sm mr-1 '>unblock</button>
                  </CardHeader>
                </Card>
              )) :
              <p>Block list not fonud</p>
            }
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Blocklist