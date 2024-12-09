import React, { useEffect, useState } from "react";
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
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { Bounce, toast, ToastContainer } from "react-toastify";

const Grouplist = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.user.value);
  let [grouplist, setGrouplist] = useState([]);

  useEffect(() => {
    const groupListRef = ref(db, "mygrouplist/");
    onValue(groupListRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push({ ...item.val(), id: item.key });
      });
      setGrouplist(array);
    });
  }, []);

  return (
    <div>
      <Card className="mt-[127px] w-[427px] h-[347px] border border-gray-300">
        <CardBody>
          <div className="flex justify-between items-center ">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Group List
            </Typography>
            <BsThreeDotsVertical />
          </div>
          <div className="h-[250px] overflow-y-scroll mt-[20px] ">
            {grouplist.length > 0 ? (
              grouplist.map((item) => (
                <Card
                  color="transparent"
                  shadow={true}
                  className="w-full h-[70px] "
                >
                  <CardHeader
                    color="transparent"
                    floated={false}
                    shadow={false}
                    className="flex items-center gap-4 pb-4 "
                  >
                    <Avatar size="sm" variant="circular" src={data.photoURL} />
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
                    </div>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="font-semibold text-[14px] text-nowrap"
                    >
                      {item.admin}
                    </Typography>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <p>Group list not fonud</p>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Grouplist;
