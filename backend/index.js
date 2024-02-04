const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
const { MongoClient, ServerApiVersion, createCollection } = require('mongodb');
const uri = "mongodb+srv://adisney365:gUqy9fiRds7DuH0y@cluster0.hjggbur.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const Users = client.db("db").collection("users");

async function CheckClientCredentials(user, password){
    try {
        
        await client.connect();
        const query = { Username: user, password: password };
        const User = await Users.findOne(query);
         
        
        console.log(User + "h")
        if( User == null){
           return data = {
                status: "fail"
            }
        }
        else{
            return data = {
                status: "success",
                content: User
            }
        }
        
     
      } finally {
        await client.close();
      }
}

app.get('/hello', (req, res) => {
    console.log("entered")
    res.send("HREllo")
    
})

app.get('/CreateUser/:Username/:Password', async (req, res) => {
    let user = req.params["Username"]
    let password = req.params["Password"]
    const NewUser = { Username: user, Password:password};
    const result = await Users.insertOne(NewUser);
    res.send(result)
})

app.get('/:Username/:Password', (req, res) => {
    let user = req.params["Username"]
    let password = req.params["Password"]
    CheckClientCredentials(user, password)
    .then(data => {
        const jsonContent = JSON.stringify(data);
        console.log(data + "sup")
        console.log(jsonContent)
        res.send(jsonContent)
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})