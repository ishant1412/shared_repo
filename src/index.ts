//@ts-ignore
import express ,{Request,Response}from"express"
//@ts-ignore
import {Client} from "pg"
const client = new Client("postgresql://neondb_owner:npg_j8Wle1uKCBys@ep-crimson-bird-adhqteig-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")
client.connect()
const app= express()
interface body{

     user_id:Number;
     city:String;
     country:String;


     street:String ;
     pncode:String;
}
app.use(express.json());
app.get("/signup" ,async (req:any,res:any)=>{
    const username = req.body.username
    const email = req.body.email
    const password =req.body.password

 
 try{
    const insertQuery = `INSERT INTO users (username, email, password)VALUES ('${username}', '${email}', '${password}');`
    console.log(insertQuery);
  const response = await client.query(insertQuery);
  console.log(response)
  res.json({
    message:response
  })}
  catch(e){
    res.json({
        message:"error while inserting the data "
    })
  }
})

app.post("/addaddress",async (req:Request,res:Response)=>{
    
try{
    const {user_id,city,country,street,pincode}= req.body
    const adressquery =`INSERT INTO addresses(user_id,city,country,street, pincode) VALUES('${user_id}','${city}','${country}','${street}','${pincode}');`
   const response = await client.query(adressquery)
   res.json({
    message:"nicely done"
   })
}
catch(e){
    res.json({
        message:"oops"
    })
}
    
        
      



})
app.listen(3000);
