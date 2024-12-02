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
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const MyGroup = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.user.value)
  let [creategroupmodal, setCreateGroupModal] = useState(false)
  let [groupname, setGroupname] = useState("")
  const [mygrouplist, setMyGroupList] = useState([]);

  useEffect(() => {
    const mygroupListRef = ref(db, 'mygrouplist/');
    onValue(mygroupListRef, (snapshot) => {
      let array = []
      snapshot.forEach((item) => {
        if (item.val().adminid == data.uid) {
          array.push({ ...item.val(), id: item.key })
        }
      })
      setMyGroupList(array);
    });
  }, []);

  let handleSubmit = (item) => {
    set(push(ref(db, 'mygrouplist/')), {
      name: groupname,
      adminid: data.uid,
      admin: data.displayName,
    }).then(() => {
      toast.success('Group create successfully', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setCreateGroupModal(false)
      setGroupname("")
    });
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Card className="mt-6 w-[345px] h-[450px] border border-gray-300">
        <CardBody>
          <div className='flex justify-between items-center '>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              My Groups
            </Typography>
            {creategroupmodal ?
              <button onClick={() => setCreateGroupModal(!creategroupmodal)} className=' bg-[#03014C] px-2 py-1 rounded-md text-white text-sm '>Cancle</button>
              :
              <button onClick={() => setCreateGroupModal(!creategroupmodal)} className=' bg-[#03014C] px-2 py-1 rounded-md text-white text-sm '>Create</button>
            }

          </div>
          <div className="h-[350px] overflow-y-scroll mt-[20px]">
            {creategroupmodal ?
              <div>
                <h1 className=' text-[18px] text-blue-gray-900 font-semibold mb-1 '>Create a group</h1>
                <input onChange={(e) => setGroupname(e.target.value)} className=' w-full border-2 border-gray-400 py-3 px-3 rounded-md ' placeholder='Enter your group name' type="text" />
                {groupname ?
                  <button onClick={() => handleSubmit(false)} className='bg-[#03014C] px-2 py-1 rounded-md text-white text-sm mt-2'>Submit</button> :
                  <button disabled onClick={() => handleSubmit(true)} className='bg-gray-400 px-2 py-1 rounded-md text-white text-sm mt-2'>Submit</button>
                }
                {console.log("click")}
              </div>
              :
              <div>
                {mygrouplist.length > 0 ?
                  mygrouplist.map((item) => (
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
                          alt="image"
                        />
                        <div className="flex w-full flex-col gap-0.5">
                          <div className="flex items-center justify-between">
                            <Typography variant="h5" color="blue-gray" className='font-semibold text-[14px]'>
                              {item.name}
                            </Typography>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  )) :
                  <p>There is no group you have create</p>
                }
              </div>
            }
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default MyGroup