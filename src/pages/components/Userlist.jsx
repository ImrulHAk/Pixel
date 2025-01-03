import React, { useEffect, useState } from "react";
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
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { userLoginInfo } from "../../slices/userSlice";

const Userlist = () => {
  let [userList, setUserlist] = useState([]);
  let [friendrequestList, setFriendrequestlist] = useState([]);
  let [friendList, setFriendlist] = useState([]);
  let [cancelrequestList, setCancelrequestlist] = useState([]);
  const db = getDatabase();
  let data = useSelector((state) => state.user.value);
  let [sentRequest, setSentrequest] = useState([]);

  useEffect(() => {
    const userListRef = ref(db, "users/");
    onValue(userListRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid != item.key) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setUserlist(array);
    });
  }, []);

  useEffect(() => {
    const userListRef = ref(db, "friendrequest/");
    onValue(userListRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push(item.val().senderid + item.val().reciverid);
      });
      setFriendrequestlist(array);
    });
  }, []);

  useEffect(() => {
    const userListRef = ref(db, "friend/");
    onValue(userListRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push(item.val().senderid + item.val().reciverid);
      });
      setFriendlist(array);
    });
  }, []);

  useEffect(() => {
    const blocklistRef = ref(db, "blocklist/");
    onValue(blocklistRef, (snapshot) => {
      let blockedUsers = [];
      snapshot.forEach((item) => {
        if (
          data.uid == item.val().blockbyid ||
          data.uid == item.val().blockid
        ) {
          blockedUsers.push(
            item.val().blockid == data.uid
              ? item.val().blockbyid
              : item.val().blockid
          );
        }
      });
      setUserlist((prevUserList) =>
        prevUserList.filter((user) => !blockedUsers.includes(user.id))
      );
    });
  }, []);

  let handleFriendrequest = (item) => {
    set(push(ref(db, "friendrequest/")), {
      senderid: data.uid,
      sendername: data.displayName,
      senderemail: data.email,
      senderphoto: data.photoURL,
      reciverid: item.id,
      recivername: item.name,
      reciveremail: item.email,
      reciverphoto: item.image,
    }).then(() => {
      setSentrequest(item.id);
    });
  };

  return (
    <div>
      <Card className="mt-6 w-[345px] h-[450px] border border-gray-300 ">
        <CardBody>
          <div className=" flex justify-between items-center ">
            <Typography variant="h5" color="blue-gray">
              User List
            </Typography>
            <BsThreeDotsVertical />
          </div>
          <div className="h-[350px] overflow-y-scroll mt-[20px] ">
            {userList.length > 0 ? (
              userList.map((item) => (
                <Card
                  color="transparent"
                  shadow={true}
                  className="w-full h-[70px]"
                >
                  <CardHeader
                    color="transparent"
                    floated={false}
                    shadow={false}
                    className="flex items-center gap-4 pb-4"
                  >
                    <Avatar size="sm" variant="circular" src={item.image} />
                    <div className="flex w-full flex-col gap-0.5">
                      <div className="flex items-center justify-between">
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="font-semibold text-[14px]"
                        >
                          {item.name}
                        </Typography>
                      </div>
                      <Typography
                        color="blue-gray"
                        className="font-medium text-[10px] text-[#000000]/50"
                      >
                        {item.email.slice(0, 12)}...
                      </Typography>
                    </div>
                    {friendList.includes(data.uid + item.id) ||
                    friendList.includes(item.id + data.uid) ? (
                      <button className=" w-12 h-[30px] bg-[#03014C]/60 rounded-md text-white mr-2 ">
                        ✔
                      </button>
                    ) : friendrequestList.includes(data.uid + item.id) ||
                      friendrequestList.includes(item.id + data.uid) ? (
                      <button
                        onClick={() => handleCancelrequest(item)}
                        className=" w-12 bg-[#03014C] rounded-md text-white font-bold text-[20px] mr-2 "
                      >
                        -
                      </button>
                    ) : cancelrequestList.includes(data.uid + item.id) ||
                      cancelrequestList.includes(item.id == data.uid) ? (
                      <button
                        onClick={() => handleFriendrequest(item)}
                        className=" w-12 bg-[#03014C]  rounded-md text-white font-bold text-[20px] mr-2 "
                      >
                        +
                      </button>
                    ) : (
                      <button
                        onClick={() => handleFriendrequest(item)}
                        className=" w-12 bg-[#03014C]  rounded-md text-white font-bold text-[20px] mr-2 "
                      >
                        +
                      </button>
                    )}
                  </CardHeader>
                </Card>
              ))
            ) : (
              <p>User not found</p>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Userlist;
