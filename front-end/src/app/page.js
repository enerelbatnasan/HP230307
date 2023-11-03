"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Users } from "./components/Users";

export default function App() {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [age, SetAge] = useState("");
  const [password, SetPassword] = useState("");
  // const[updatestatus,setUpdatestatus]=useState(false)

  async function fetchData() {
    const url = `http://localhost:8000/users`;
    const res = await axios.get(url);
    setUsers(res.data.data);
    console.log(res);
  }

  async function NewUser() {
    setUser("");
    SetAge("");
    SetPassword("");
    const enerel = await axios
      .post(`http://localhost:8000/users`, {
        username: user,
        age: age,
        password: password,
      })
      .then((res) => {
        setUsers(res.data.data);
      });
    console.log(users);
  }
  useEffect(() => {
    fetchData();
  }, []);
  async function deleteID(e) {
    const deleted = await axios.delete(`http://localhost:8000/users/${e.id}`, {
      username: user,
    });
    console.log(deleted.data.data);
    setUsers(deleted.data.data);
  }
  // function editID(){
  //  // setUpdatestatus(!updatestatus)
  //   console.log(" edit working ");

  // }
  return (
    <div className="App bg-[#474747] w-100% h-screen flex flex-col items-center ">
      <h1 className="text-white font-[15px] border-[1px] w-[200px] rounded-[10px] bg-[black] border-black w-[300px] h-[40px] flex justify-center items-center mt-[80px] mb-[30px]">
        User CRUD whit FS Module
      </h1>
      <h1>HELLO :D</h1>
      <div>
        <input
          placeholder="Name.."
          onChange={(e) => setUser(e.target.value)}
          value={user}
        />
        <input
          placeholder="Age.."
          onChange={(e) => SetAge(e.target.value)}
          value={age}
        />
        <input
          placeholder="Password.."
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
        />
        <button onClick={() => NewUser()} className="bg-black text-white">
          {" "}
          submit
        </button>
      </div>
      <h1 className="text-white mb-[30px] mt-[30px]">USER LIST \/</h1>
      {/* <div className="text-white flex justify-around w-[600px]">
        <h2 className="">Users</h2>
        <h2>Age</h2>
        <h2>Work</h2>
      </div> */}
      <div>
        <div className="flex flex-col gap-[20px]">
          {users?.map((e) => (
            <div className="flex  w-[700px] h-[auto] bg-[white] items-center border-[1px] border-[black] rounded-[10px]">
              <Users
                username={e.username}
                age={e.age}
                setUsers={setUsers}
                id={e.id}
                users={e.users}
                password={e.password}
              />
              <div className="flex">
                <div
                  onClick={() => deleteID(e)}
                  className="flex gap-[20px] border-[1px] border-[black] h-[48px] w-[100px] justify-start items-center rounded-r-[10px]"
                >
                  <button className="">delete</button>
                  <img
                    src="trash-var-solid.png"
                    className="w-[24px] h-[24px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
