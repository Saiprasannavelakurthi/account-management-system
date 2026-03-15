import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard(){

  const [balance,setBalance] = useState(0);

  useEffect(()=>{

    const token = localStorage.getItem("token");

    axios.get(
      "http://localhost:5000/api/account/balance",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )
    .then((res)=>{
      setBalance(res.data.balance);
    });

  },[]);

  return(

    <div>

      <h1>Dashboard</h1>

      <h2>Balance: ₹{balance}</h2>

      <br />

      <a href="/send">Send Money</a>

      <br /><br />

      <a href="/statement">Account Statement</a>

    </div>

  )
}

export default Dashboard