
/*
The NODE_ENV environment variable specifies the environment in which an application is running (usually, development or production).


One of the simplest things you can do to improve performance is to set NODE_ENV to production.


Setting NODE_ENV to “production” makes Express:


Cache view templates.
Cache CSS files generated from CSS extensions.
Generate less verbose error messages.
*/
/*
  to deal with multiple related tables queries u could use
include and select

--   user and that users post
  */

/*
await prisma.user.findFirst({
    where:{
        userId:req.params.id
    },include:{
blog:{
    select:{
        title:true,
        image:true
    }
}
    }
})

const user = await prisma.user.findFirst({
  include: {
    posts: {
      include: {
        categories: true,
      },
    },
  },
})

"user -- post --- categories"

*/

// we generally put zod for req body.
// and for other thigns we use custom generic interfaces.


// jiksa route hoga id v uska hi extract hoga
// user/:id - user ki id
//  blog/:id -- blog ki id

//  req.user.id -- middleware jwt id


// read about set -- many to many relation updations..


/*

//Done --  a slightly better approach to extract the params from the request object.

import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 })
// as websocker start from http , they have access to request object
wss.on("connection", (ws ,request) => {
const url = request.url; // contains path and query string

if(!url){
    // in normal case the url will be present always 
  ws.close(1011, "Invalid request");
    return 

}

//    "token=abc123&roomId=42&mode=edit"   internally is trh ho jyega yeh ...
const queryParam = new URLSearchParams(url.split('?')[1])

const token = queryParam.get('token')  // it will search for token and return it.
                 // if room if v hota usme 
                   //    const roomId = queryParam.get("roomId");  // "42"
if(!token){
  ws.close(1008,"Token missing")
    return 
}

    ws.send("you are connected to server")

    ws.on("message", (message) => {
        console.log("received from client", message.toString());
        ws.send(`You said: ${message}`);
    })

    ws.on("close",()=>{
        console.log("disconnected from client")
    })



})

//  ? -> extra infromation

//  /: -> params necessary information

*/

/*

multer - ARRAY VS FIELDS:

--req.files.name
 fields lets you upload multiple files of diffrent types.
  req.files.name

  Multeruploader.fields[
  {
  name : "coverImage" , 
  maxCount : 10
  }, {
  name : "profile",
  maxCount : 1
  }]

--accessible in files
  array lets you upload multple files of same type.
  req.files


  Multeruploader.array("filename", number of files)

*/