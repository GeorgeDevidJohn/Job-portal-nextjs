import { getDataFromToken } from "@/app/helper/getDataFromToken";
import { getRoleFromToken } from "@/app/helper/getRoleFromToken";
import {connect} from "@/dbConfig/dbConfig";
import Job from "@/models/jobModel";
import Request from "@/models/requestModel";
import { NextRequest, NextResponse } from "next/server";


connect()
export async function GET(request:NextRequest){
    try {

         const url = new URL(request.url);
            const resumeid = url.searchParams.get('resumeId');
        // Find the user in the database based on the user ID
        const requests = await Request.find({resumeId:resumeid});
        console.log(requests);

        return NextResponse.json({
            message: "Requests found with associated jobs",
            data: requests
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
        
    }
}