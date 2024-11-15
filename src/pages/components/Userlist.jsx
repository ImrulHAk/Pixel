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
import { getDatabase, ref, onValue } from "firebase/database";

const Userlist = () => {
    let [userList, setUserlist] = useState([])
    const db = getDatabase();

    useEffect(() => {
        const userListRef = ref(db, 'users/');
        onValue(userListRef, (snapshot) => {
            let array = []
            snapshot.forEach((item) => {
                array.push(item.val())
            })
            setUserlist(array)
        });
    }, [])

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
                                        alt="tania andrew"
                                    />
                                    <div className="flex w-full flex-col gap-0.5">
                                        <div className="flex items-center justify-between">
                                            <Typography variant="h5" color="blue-gray" className='font-semibold text-[14px]'>
                                                {item.name}
                                            </Typography>
                                        </div>
                                        <Typography color="blue-gray" className='font-medium text-[10px] text-[#000000]/50'>{item.email}</Typography>
                                    </div>
                                    <IconButton className='w-20 h-20 bg-[#03014C] text-[20px]' size="sm">+</IconButton>
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