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
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import { userLoginInfo } from '../../slices/userSlice';

const Userlist = () => {
    let [userList, setUserlist] = useState([])
    const db = getDatabase();
    let data = useSelector((state) => state.user.value)
    let [sentRequest, setSentrequest] = useState([])

    useEffect(() => {
        const userListRef = ref(db, 'users/');
        onValue(userListRef, (snapshot) => {
            let array = []
            snapshot.forEach((item) => {
                if (data.uid != item.key) {
                    array.push({ ...item.val(), id: item.key })
                }
            })
            setUserlist(array)
        });
    }, [])

    let handleFriendrequest = (item) => {
        console.log(item)
        set(push(ref(db, 'friendrequest/')), {
            senderid: data.uid,
            sendername: data.displayName,
            senderemail:data.email,
            senderphoto: data.photoURL,
            reciverid: item.id,
            recivername: item.name,
            reciveremail: item.email ,
            reciverphoto: item.image,
        }).then(() => {
            setSentrequest(item.id)
        })
    }

    return (
        <div>
            <Card className="mt-6 w-[345px] h-[450px] ">
                <CardBody>
                    <div className=' flex justify-between items-center '>
                        <Typography variant="h5" color="blue-gray">
                            User List
                        </Typography>
                        <BsThreeDotsVertical />
                    </div>
                    <div className="h-[350px] overflow-y-scroll mt-[20px]">
                        {userList.map((item) => (
                            <Card color="transparent" shadow={true} className="w-full h-[70px]">
                                <CardHeader
                                    color="transparent"
                                    floated={false}
                                    shadow={false}
                                    className="flex items-center gap-4 pb-4"
                                >
                                    <Avatar
                                        size="sm"
                                        variant="circular"
                                        src={item.image}
                                        alt=" "
                                    />
                                    <div className="flex w-full flex-col gap-0.5">
                                        <div className="flex items-center justify-between">
                                            <Typography variant="h5" color="blue-gray" className='font-semibold text-[14px]'>
                                                {item.name}
                                            </Typography>
                                        </div>
                                        <Typography color="blue-gray" className='font-medium text-[10px] text-[#000000]/50'>{item.email.slice(0, 12)}...</Typography>
                                    </div>
                                    {sentRequest.includes(item.id) ? (
                                        <IconButton
                                            className="w-20 h-20 bg-[#03014C] text-[20px] rounded-[4px] mr-2"
                                            size="sm"
                                        >
                                            ✓
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            onClick={() => handleFriendrequest(item)}
                                            className="w-20 h-20 bg-[#03014C] text-[20px] rounded-[4px] mr-2"
                                            size="sm"
                                        >
                                            +
                                        </IconButton>
                                    )}
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default Userlist