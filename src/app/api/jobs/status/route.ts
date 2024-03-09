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
        const userId = await getDataFromToken(request);
        const role = await getRoleFromToken(request);
        const url = new URL(request.url);
        const status = url.searchParams.get('status');
        const requestsWithJobs = [];

        console.log(status);
        console.log(role);
        console.log(userId);
        // Find the user in the database based on the user ID
        const requests = await Request.find({userId:userId});
        console.log(requests);

        for (const request of requests) {
            const job = await Job.findOne({ _id: request.jobId }); // Assuming jobId is the reference to the job
            if (job) {
                requestsWithJobs.push({ request, job });
            }
        }
        return NextResponse.json({
            message: "Requests found with associated jobs",
            data: requestsWithJobs
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
        
    }
}