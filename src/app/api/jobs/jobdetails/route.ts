import { getDataFromToken } from "@/app/helper/getDataFromToken";
import { getRoleFromToken } from "@/app/helper/getRoleFromToken";
import {connect} from "@/dbConfig/dbConfig";
import Job from "@/models/jobModel";
import Request from "@/models/requestModel";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function GET(request:NextRequest){
    try {

        // Extract user ID from the authentication token
        const searchParams = request.nextUrl.searchParams;
        const Id = searchParams.get('id');
        const userId = await getDataFromToken(request);
        const role = await getRoleFromToken(request);    
       // console.log(role);
       // console.log(userId);
        // Find the user in the database based on the user ID
        const requests = await Job.find({_id:Id});
        //console.log(requests);

     
        return NextResponse.json({
            message: "Requests found with associated jobs",
            data: requests
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
        
    }
}