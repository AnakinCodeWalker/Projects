//  by default turbo repo give you 2 frontends
// app/ web and app/docs

//  initial steps 


/*
//  26 min pr code repo hai github

1 npx i -g pnpm  --> only once in your pc
2.npx create -turbo@latest -->   will initialize an empty turborepo
3. done pnmp install 
3. deleted app/docs 
4. created two repo in app --> app/ws-backend  app/http-backend
5.cd into ws-backend and http-backend do nmp init -y
6.create two empty  tsconfig.json and import base tsconfig.json into these empty tsconfig.json 
7. cd packages/typescript-config and import base.json into empty tsconfig.json of ws-backend and http-backend 
8.add a build , dev and start script to both of the backend
9. update the tsconfig into both the projects
10. initialize a http server  , and a websocker server
*/


/*
if any folder in the common package is spitting something that you want in the apps or somewhere else to use just 
add 
"main": "dist/index.js",
  "types": "dist/index.d.ts", 

*/

/*

in creating a relationship in prisma 
//  1 - 1
in the referncing table the refrencing key should be unique

// 1 - m
In the referncing table the refrencing key should  not be unique

//  m - n
In case of many to many create a composite unique key.
//    @@unique([userId, roomId]) // composite unique
*/



/*
look for the refreshtokens somethings fishy over there

*/


/*

model User {
  id String @id @default(uuid())

  userName String @unique
  email    String @unique
  password String

  name String

  // refreshToken       String?
  // refreshTokenExpiry DateTime?

  // 1 to many 
  chat Chat[]
  room Room[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Room {
  id Int @id @default(autoincrement())

  name String
  slug String @unique // so no two rooms can have the same name

  adminId String
  user    User   @relation(fields: [adminId], references: [id])
  chat    Chat[]
  createdAt DateTime @default(now())
}

model Chat {
  id Int @id @default(autoincrement())

  message String
 
  userId  String
  roomId  Int
  user User @relation(fields: [userId], references: [id])
  room Room @relation(fields: [roomId] , references: [id])

}

*/
