import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect()
// Calls the connect function to establish a connection to the database.


export async function POST(request: NextRequest){
// Defines an asynchronous POST request handler.
    try {
        const reqBody = await request.json()
        const {firstName,lastName,phone,role, email, password} = reqBody
        console.log(reqBody);
// Parses the request body to extract username, email, and password.

//Checks if a user with the provided email already exists. 
       const user = await User.findOne({email})
      

//If yes, returns a 400 response.
         if(user){
            console.log(user);
            return user;
         }else{
            console.log('user not found');
         }

//hash password using bcryptjs.
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            phone,
            role, 
            email,
            password: hashedPassword,
        })

        console.log(newUser);
// Saves the new user to the database.
        const savedUser = await User.create(newUser);

        
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}