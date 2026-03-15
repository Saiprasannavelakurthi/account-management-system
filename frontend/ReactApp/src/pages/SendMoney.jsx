import { useEffect,useState } from "react"
import axios from "axios"

function SendMoney(){

const [users,setUsers] = useState([])
const [receiver,setReceiver] = useState("")
const [amount,setAmount] = useState("")

useEffect(()=>{

const token = localStorage.getItem("token")

axios.get(
"http://localhost:5000/api/account/users",
{
headers:{Authorization:`Bearer ${token}`}
}
)
.then(res=>setUsers(res.data))

},[])

const handleSend = async ()=>{

const token = localStorage.getItem("token")

await axios.post(
"http://localhost:5000/api/account/transfer",
{receiverId:receiver,amount},
{
headers:{Authorization:`Bearer ${token}`}
}
)

alert("Transfer successful")

}

return(

<div>

<h2>Send Money</h2>

<select onChange={(e)=>setReceiver(e.target.value)}>

<option>Select User</option>

{users.map((u)=>(
<option key={u.id} value={u.id}>{u.name}</option>
))}

</select>

<br /><br />

<input placeholder="Amount"
onChange={(e)=>setAmount(e.target.value)}/>

<br /><br />

<button onClick={handleSend}>Send</button>

</div>

)

}

export default SendMoney