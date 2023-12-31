"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Users } from "./components/Users";
import  admin12  from "./jsons/admin.json"
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
  const [adminList, setAdminList] = useState(admin12);
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
        password: password
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
  function editID(){
   // setUpdatestatus(!updatestatus)
    console.log(" edit working ");
  }
  function adminLogIN(){
    SetAdmin(!admin)
    console.log("Working admins")
  }
  function nameCheck(value){
  
    if(adminList[0].user == value){
      setAdminAccess(true)

    }
  }
  function passCheck(value){
    console.log(adminList[0].password , value)
    if(adminList[0].password == value){
      setAdminAcces21(true)
    }
  }
  function adminLogin(){
    console.log(adminAccess , adminAccess1)
    if(adminAccess == true, adminAccess1 == true){
   router.push("/adminAccess")
    }
  }
  return (
    <div className="App bg-[#474747] w-100% h-screen flex flex-col items-center ">
      <div className="flex gap-[5px] mr-[1000px] mt-[20px] w-[300px]">
        <h1 className="text-white text-[20px] justify-center min-w-[120px] ml-[50px]">Admin Login</h1>
        <img onClick={()=>adminLogIN()} className="w-[24px] h-[24px] mr-[10px]" src="lock.png"/>
        {admin ? (
          <div></div>
        )
        :
        (<div className="flex gap-[15px]">
          <input
          placeholder="Admin name.."
          className="w-[150px] h-[30px] rounded-[7px]"
          onChange={(e)=>nameCheck(e.target.value)}
          />
            <input
          placeholder="Admin Password.."
          className="w-[150px] h-[30px] rounded-[7px]"
          onChange={(e)=>passCheck(e.target.value)}
          />
          <button onClick={()=>adminLogin()} className="w-[80px] border-[1px] bg-[black] text-white border-[black] rounded-[10px]">Log in</button>
        </div>)
        }
      </div>
      <h1 className="text-white font-[15px] border-[1px] w-[200px] rounded-[10px] bg-[black] border-black w-[300px] h-[40px] flex justify-center items-center mt-[80px] mb-[30px]">
        User CRUD whit FS Module
      </h1>
      {/* <h1>HELLO</h1> */}
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
        
        <button onClick={() => NewUser()} className="bg-black text-white">
          {" "}
          submit
        </button>
      </div>
      <h1 className="text-white mb-[30px] mt-[30px]">USER LIST \/</h1>
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
                work={e.work}
                e={e}
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
