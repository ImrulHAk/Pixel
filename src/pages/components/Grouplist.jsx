import React from 'react'
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

const Grouplist = () => {
  return (
    <div>
      <Card className="mt-[127px] w-[427px] h-[347px] ">
        <CardBody>
          <div className='flex justify-between items-center '>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Group List
            </Typography>
            <BsThreeDotsVertical />
          </div>
          <div className="h-[250px] overflow-y-scroll mt-[20px] ">
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
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  alt="tania andrew"
                />
                <div className="flex w-full flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray" className='font-semibold text-[14px]'>
                      Toni Andrew
                    </Typography>
                  </div>
                </div>
                <Button className=' w-20 bg-[#03014C] rounded-[5px] mr-2 capitalize text-sm font-normal' size="sm">Join</Button>
              </CardHeader>
            </Card>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Grouplist