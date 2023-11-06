"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Users } from "./components/Users1";
import { useRouter } from 'next/navigation'

export default function App() {
  const router = useRouter()
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [age, SetAge] = useState("");
  const [password, SetPassword] = useState("");
  const [admin, SetAdmin] = useState(true);
  const [work, SetWork] = useState("");
  const [id, SetId] = useState("");
  const [adminAccess, setAdminAccess] =  useState(false);
  const [adminAccess1, setAdminAcces21] =  useState(false);

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
    SetWork("")
    const enerel = await axios
      .post(`http://localhost:8000/users`, {
        username: user,
        age: age,
        password: password,
        id: id,
        work: work,
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
      id: id,
    });
    console.log(deleted.data.data);
    setUsers(deleted.data.data);
  }
  function adminLogIN(){
   router.push("/")
  }
  return (
    <div className="App bg-[#ffd1ea] w-100% h-screen flex flex-col items-center ">
      <div className="flex gap-[5px] mt-[20px] w-[300px]">
        <h1 className="text-white text-[20px] justify-center ml-[45px]">Admin Access Page</h1>
        <img onClick={()=>adminLogIN()} className="w-[32px] h-[32px] mb-[-10px]" src="shiny_star.webp"/>
      </div>
      <h1 className="text-white font-[15px] border-[1px] w-[200px] rounded-[10px] bg-[#ff9fc3] border-[#ff9fc3] w-[300px] h-[40px] flex justify-center items-center mt-[80px] mb-[30px]">
        User CRUD whit FS Module
      </h1>
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
          placeholder="Work.."
          onChange={(e) => SetWork(e.target.value)}
          value={work}
        />
        <input
          placeholder="Password.."
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
        />
        
        <button onClick={() => NewUser()} className="bg-[#ff9fc3] text-white">
          {" "}
          submit
        </button>
      </div>
      <h1 className="text-white mb-[30px] mt-[30px]">USER LIST \/</h1>
      <div>
        <div className="flex flex-col gap-[20px]">
          {users?.map((e) => (
            <div className="flex  w-[1000px] h-[auto] bg-[#ff9fc3] items-center border-[1px] border-[#ff9fc3] rounded-[10px]">
              <Users
                username={e.username}
                age={e.age}
                setUsers={setUsers}
                id={e.id}
                users={e.users}
                password={e.password}
                work={e.work}
                e={e}
              />
              <div className="flex">
                <div
                  onClick={() => deleteID(e)}
                  className="flex gap-[20px] border-[1px] border-[#ff9fc3] h-[48px] w-[100px] justify-start items-center rounded-r-[10px] text-white"
                >
                  <button className="">delete</button>
                  <img
                    src="mental.jpeg"
                    className="w-[24px] h-[24px] rounded-[50%]"
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