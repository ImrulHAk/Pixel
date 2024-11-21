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

const Searchbar = () => {
  return (
    <div>
      <div className="items-center gap-x-2 flex absolute mt-16">
        <div className="">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="text"
              className="w-[344px] pl-10 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-500 shadow-sm focus:shadow"
              placeholder="Type here..."
            />
          </div>
        </div>
        <Button className=' capitalize bg-[#03014C] text-sm font-normal ' size="sm">Search</Button>
      </div>
    </div>
  )
}

export default Searchbar