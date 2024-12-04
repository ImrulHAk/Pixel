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
import { IoSend } from "react-icons/io5";
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { chatingInfo } from '../slices/chatSlice';

const Message = () => {
  let dispatch = useDispatch();
  const db = getDatabase();
  let [message, setMessage] = useState([])
  let [friendlist, setFriendlist] = useState([])
  let data = useSelector((state) => state.user.value);
  let chatdata = useSelector((state) => state.chating.value);

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

  let handleMessage = (item) => {
    if (data.uid == item.senderid) {
      dispatch(chatingInfo({ name: item.recivername, id: item.reciverid }))
    } else {
      dispatch(chatingInfo({ name: item.sendername, id: item.senderid }))
    }
  };

  let handleSendmsg = () => {
    if (message) {
      set(push(ref(db, 'messagelist/')), {
        senderid: data.uid,
        sendername: data.displayName,
        reciverid: chatdata.id,
        recivername: chatdata.name,
        message: message,
        data: `${new Date().getFullYear()}.${new Date().getMonth() + 1}.${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      }).then(() => {
        alert("Message send successfully")
      });
    } else {
      alert("Please write a message")
    }
  }

  return (
    <div>
      {/* component */}
      {/* This is an example component */}
      <div className="container h-[955px] mx-auto shadow-md rounded-lg border-2 mt-10 ">
        {/* headaer */}
        <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
          <div className="font-semibold text-2xl">GoingChat</div>
          <div className="w-1/2">
            <input
              type="text"
              name=""
              id=""
              placeholder="search IRL"
              className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
            />
          </div>
          <div className="h-12 w-12 p-2 bg-primary rounded-full text-white text-sm font-semibold flex items-center justify-center">
            PIXEL
          </div>
        </div>
        {/* end header */}
        {/* Chatting */}
        <div className="h-[862px] flex flex-row justify-between bg-white">
          {/* chat list */}
          <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
            {/* search compt */}
            <div className="border-b-2 py-4 px-2">
              <input
                type="text"
                placeholder="search chatting"
                className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
              />
            </div>
            {/* end search compt */}
            {/* user list */}
            {friendlist.map((item) => (
              <div onClick={() => handleMessage(item)} className={`${item.reciverid == chatdata?.id || item.senderid == chatdata?.id ? "bg-[#000000]/20" : "bg-white"} flex flex-row py-4 px-2 justify-center items-center gap-2 border-b-2`}>
                <div className="w-1/4">
                  {data.uid == item.senderid ?
                    <img
                      src={item.reciverphoto}
                      className="object-cover h-12 w-12 rounded-full"
                      alt=""
                    />
                    :
                    <img
                      src={item.senderphoto}
                      className="object-cover h-12 w-12 rounded-full"
                      alt=""
                    />
                  }
                </div>
                <div className="w-full">
                  {data.uid == item.senderid ?
                    <div className="text-lg font-semibold">{item.recivername}</div>
                    :
                    <div className="text-lg font-semibold">{item.sendername}</div>
                  }
                </div>
                <button></button>
              </div>
            ))}
            {/* end user list */}
          </div>
          {/* end chat list */}
          {/* message */}
          {chatdata ?
            <div className="w-full px-5 flex flex-col justify-between">
              <div className="flex flex-col mt-5">
                <div className="flex justify-end mb-4">
                  <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                    Welcome to group everyone !
                  </div>
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                </div>
                <div className="flex justify-start mb-4">
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                  <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                    at praesentium, aut ullam delectus odio error sit rem. Architecto
                    nulla doloribus laborum illo rem enim dolor odio saepe,
                    consequatur quas?
                  </div>
                </div>
              </div>
              <div className="py-5 flex justify-between items-center gap-2">
                <input
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                  type="text"
                  placeholder="type your message here..."
                />
                <IoSend onClick={handleSendmsg} className='text-[30px] text-[#03014C]' />
              </div>
            </div>
            :
            <div className="w-[1000px] px-5 flex justify-center items-center">
              <h2 className='text-[#000000]/60 text-[20px] text-center'>No user selected</h2>
            </div>
          }
          {/* end message */}
          <div className="w-2/5 border-l-2 px-5">
            <div className="flex flex-col">
              <div className="font-semibold text-xl py-4">{chatdata?.name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message