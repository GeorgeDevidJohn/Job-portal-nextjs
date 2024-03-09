import { getDataFromToken } from "@/app/helper/getDataFromToken";
import { getRoleFromToken } from "@/app/helper/getRoleFromToken";
import {connect} from "@/dbConfig/dbConfig";
import Job from "@/models/jobModel";
import Request from "@/models/requestModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongoose";

connect()

export async function GET(request:NextRequest){
    try {

        // Extract user ID from the authentication token
        const userId = await getDataFromToken(request);
        const role = await getRoleFromToken(request);
        const url = new URL(request.url);
        const Jobswithusers = [];
        console.log(role);
        console.log(userId);
        // Find the user in the database based on the user ID
        const jobs = await Job.find({userId:userId});
        console.log(jobs);

        for (const job of jobs) {
            const user = await User.findOne({ _id: (job.userId) }); // Assuming jobId is the reference to the job
            if (user) {
                Jobswithusers.push({ job, user });
            }
        }
        return NextResponse.json({
            message: "Jobs found with associated with user info",
            data: Jobswithusers
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
        
    }
}