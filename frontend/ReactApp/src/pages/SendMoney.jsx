import {useState} from "react";
import axios from "axios";

function SendMoney(){

const [receiverId,setReceiverId]=useState("");
const [amount,setAmount]=useState("");

const sendMoney = async()=>{

const token = localStorage.getItem("token");

await axios.post("http://localhost:5000/api/account/transfer",
{receiverId,amount},
{headers:{Authorization:`Bearer ${token}`}}
);

alert("Transfer success");

};

return(

<div>

<h2>Send Money</h2>

<input placeholder="Receiver ID" onChange={(e)=>setReceiverId(e.target.value)}/>
<input placeholder="Amount" onChange={(e)=>setAmount(e.target.value)}/>

<button onClick={sendMoney}>Send</button>

</div>

);

}

export default SendMoney;