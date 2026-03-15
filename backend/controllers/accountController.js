import supabase from "../config/supabaseClient.js";

export const getBalance = async (req,res)=>{

  const userId = req.user.id;

  const {data} = await supabase
  .from("users")
  .select("balance")
  .eq("id",userId)
  .single();

  res.json(data);
};


export const getUsers = async (req,res)=>{

  const {data} = await supabase
  .from("users")
  .select("id,name");

  res.json(data);
};


export const transferMoney = async (req,res)=>{

  const senderId = req.user.id;
  const {receiverId,amount} = req.body;

  const {data:sender} = await supabase
  .from("users")
  .select("*")
  .eq("id",senderId)
  .single();

  if(sender.balance < amount){
    return res.status(400).json({message:"Insufficient balance"});
  }

  const {data:receiver} = await supabase
  .from("users")
  .select("*")
  .eq("id",receiverId)
  .single();

  await supabase
  .from("users")
  .update({balance:sender.balance - amount})
  .eq("id",senderId);

  await supabase
  .from("users")
  .update({balance:receiver.balance + amount})
  .eq("id",receiverId);

  await supabase.from("transactions").insert([
    {sender_id:senderId,receiver_id:receiverId,amount,transaction_type:"debit"},
    {sender_id:senderId,receiver_id:receiverId,amount,transaction_type:"credit"}
  ]);

  res.json({message:"Transfer successful"});
};


export const getStatement = async (req,res)=>{

  const userId = req.user.id;

  const {data} = await supabase
  .from("transactions")
  .select("*")
  .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
  .order("created_at",{ascending:false});

  res.json(data);
};