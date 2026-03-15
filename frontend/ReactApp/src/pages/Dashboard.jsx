import {useEffect,useState} from "react";
import axios from "axios";

function Dashboard(){

const [balance,setBalance]=useState(0);

useEffect(()=>{

const token = localStorage.getItem("token");

axios.get("http://localhost:5000/api/account/balance",{
headers:{Authorization:`Bearer ${token}`}
})
.then(res=>setBalance(res.data.balance));

},[]);

return(

<div>

<h2>Dashboard</h2>

<h1>Balance: ₹{balance}</h1>

</div>

);

}

export default Dashboard;