import { getDataFromToken } from "@/app/helper/getDataFromToken";
import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function GET(request:NextRequest){
    try {


        // Find the user in the database based on the user ID
        const users = await User.find({role: "employee"});
        return NextResponse.json({
            message: "Employees found",
            data: users
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
        
    }
}