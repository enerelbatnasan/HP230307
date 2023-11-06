import {} from "@/app/page";
import { useState, useEffect } from "react";
import axios from "axios";

export function Users(props) {
  const [status, setStatus] = useState(false);
  const [upName, setUpName] = useState("");
  const [upAge, setUpAge] = useState("");
  const [upWork, setUpWork] =  useState("");
  const [upPass, setUpPass] =  useState("")
  const { username, age, id, setUsers, password: correctPassword, work } = props;

  console.log(props)

  function editID() {
    setStatus(!status);
    console.log("working");
  }
  useEffect(() => {}, []);
  const UpUser = async () => {
    if(setUpName == null){
      alert("please enter a new username and age pls!")
    } else {
    setStatus(!status);
    console.log(id, "test");
    const upNewUser = await axios
      .put(`http://localhost:8000/users/${id}`, {
        id: id,
        username: upName,
        age: upAge,
        work: upWork,
        password: upPass,
      })
      .then((res) => {
        setUsers(res.data.data);
      });
    }
  };
  return (
    <div className="flex bg-[#ff9fc3] rounded-[5px] text-[white]">
        <div className="flex gap-[130px]">
          {status ? (
            <div className="flex">
              <div className="flex align-center gap-[140px] text-[grey]">
                <div className="w-[50px] mt-[8px] ml-[2px]">
                  <input
                   className="rounded-[5px] outline-0"
                    placeholder="edit Name.."
                    onChange={(e) => setUpName(e.target.value)}
                    value={upName}
                  />
                </div>
                <div className="w-[50px] mt-[8px] ml-[2px]">
                  <input
                   className="rounded-[5px] outline-0"
                    placeholder="edit Age.."
                    onChange={(e) => setUpAge(e.target.value)}
                    value={upAge}
                  />
                </div>
                <div className="w-[50px] mt-[8px] ml-[2px]">
                  <input
                  className="rounded-[5px] outline-0"
                    placeholder="edit Work.."
                    onChange={(e) => setUpWork(e.target.value)}
                    value={upWork}
                  />
                </div>
                <div className="w-[50px] mt-[8px] ml-[2px]">
                  <input
                   className="rounded-[5px] outline-0"
                    placeholder="edit Password.."
                    onChange={(e) => setUpPass(e.target.value)}
                    value={upPass}
                  />
                </div>
              </div>
              <div
                onClick={() => UpUser()}
                className="w-[100px] h-[48px] flex items-center border-[1px] border-[#ff9fc3] text-white ml-[150px]"
              >
                <button className="ml-[3px] min-h-[45px] ">finish</button>
                <img src="ill.webp" className="w-[24px] h-[24px]" />
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="flex gap-[100px]">
                <div className="w-[50px]">
                  <h3>username:</h3>
                  <div>{username}</div>
                </div>
                <div className="w-[50px]">
                  <h3>age:</h3>
                  <div>{age}</div>
                </div>
                <div className="w-[50px]">
                  <h3>work:</h3>
                  <div>{work}</div>
                </div>
                <div className="w-[180px]">
                    <h3>password:</h3>
                    <div>{correctPassword}</div>
                </div>
              </div>
              <div
                onClick={() => editID()}
                className="w-[100px] h-[100%] flex items-center border-[1px] border-[#ff9fc3] ml-[150px]"
              >
                <button className="ml-[3px] h-[46px]">edit</button>
                <img src="White_pencil.png" className="w-[24px] h-[24px]" />
              </div>
             
            </div>
          )}
        </div>
      
    </div>
  );
}
