// userRouter nhi likhe hai in app.js

//asyncHandler ka code nhi likhe hai or smjh v nhi aya hmko abhi tk

//  review the code of file uploading , multer , cloudinary

//  .select to remove some details from the  mongo db document
//  use .select(" ") --> inside single string put the fields name without seprating them via comma.


/*

model User {

  id       String  @id @default(uuid())
  email    String
  password String
  name     String
  photo    String?

  rooms Room[]
  chats Chat[]

}

model Room {

  id        Int      @id @default(autoincrement())
  slug      String   @unique
  createdAt DateTime @default(now())
 
  adminId   String

  chats      Chat[] 
  admin     User     @relation(references: [id], fields: [adminId])

}

model Chat {
 
  id      Int    @id @default(autoincrement())
  message String
 
  userId  String
  roomId  Int
 
  user    User   @relation(references: [id], fields: [userId])
  room    Room   @relation(references: [id], fields: [roomId])

}

*/