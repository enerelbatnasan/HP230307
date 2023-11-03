import {} from "@/app/page";
import { useState, useEffect } from "react";
import axios from "axios";

export function Users(props) {
  const [status, setStatus] = useState(false);
  const [upName, setUpName] = useState("");
  const [upAge, setUpAge] = useState("");
  const { username, age, id, setUsers, password: correctPassword } = props;

  console.log(props)

  const [password, SetPassword] = useState(false);
  function editID() {
    setStatus(!status);
    console.log("working");
  }
  function CompletePass(e) {
    console.log("correctPassword", correctPassword);
  
    if (e.target.value == correctPassword) {
      SetPassword(true);
    } else {
      // alert("WRONG PASSWORD!")
    }
  }
  useEffect(() => {}, []);
  const UpUser = async () => {
    if(setUpName == null){
      alert("please enter a new username and age pls!")
    } else {
    setStatus(!status);
    // 1698832344959
    console.log(id, "test");
    const upNewUser = await axios
      .put(`http://localhost:8000/users/${id}`, {
        id: id,
        username: upName,
        age: upAge,
      })
      .then((res) => {
        setUsers(res.data.data);
      });
    }
  };

  console.log(password);
  return (
    <div className="flex justify-between items-center">
      {!password ? (
        <div className="flex gap-[273px] justify-center items-center">
          <div className="w-[50px]">
            <h3>username:</h3>
            <div>{username}</div>
          </div>
          <input
            placeholder="Enter Password.."
            onChange={CompletePass}
            className="mr-[100px]"
          />
        </div>
      ) : (
        <div className="flex gap-[130px]">
          {status ? (
            <div className="flex">
              <div className="flex align-center gap-[140px]">
                <div className="w-[50px] mt-[8px] ml-[2px]">
                  <input
                    placeholder="edit Name.."
                    onChange={(e) => setUpName(e.target.value)}
                    value={upName}
                  />
                </div>
                <div className="w-[50px] mt-[8px] ml-[2px]">
                  <input
                    placeholder="edit Age.."
                    onChange={(e) => setUpAge(e.target.value)}
                    value={upAge}
                  />
                </div>
              </div>
              <div
                onClick={() => UpUser()}
                className="w-[100px] h-[48px] flex items-center border-[1px] border-black ml-[255px]"
              >
                <button className="ml-[3px] min-h-[45px] ">finish</button>
                <img src="black_checkmark.png" className="w-[24px] h-[24px]" />
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
              </div>
              <div
                onClick={() => editID()}
                className="w-[100px] h-[100%] flex items-center border-[1px] border-black ml-[299px]"
              >
                <button className="ml-[3px] h-[46px]">edit</button>
                <img src="pencil.vector1.jpeg" className="w-[24px] h-[24px]" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
