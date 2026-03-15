import bcrypt from "bcryptjs";
import supabase from "../config/supabaseClient.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req,res)=>{

  const {name,email,password} = req.body;

  const hashed = await bcrypt.hash(password,10);

  const {data,error} = await supabase
  .from("users")
  .insert([{name,email,password:hashed,balance:10000}])
  .select()
  .single();

  if(error){
    return res.status(400).json({message:error.message});
  }

  const token = generateToken(data.id);

  res.json({token,user:data});
};


export const login = async (req,res)=>{

  const {email,password} = req.body;

  const {data,error} = await supabase
  .from("users")
  .select("*")
  .eq("email",email)
  .single();

  if(!data){
    return res.status(404).json({message:"User not found"});
  }

  const match = await bcrypt.compare(password,data.password);

  if(!match){
    return res.status(401).json({message:"Wrong password"});
  }

  const token = generateToken(data.id);

  res.json({token,user:data});
};