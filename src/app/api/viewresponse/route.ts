import { getDataFromToken } from "@/app/helper/getDataFromToken";
import { getRoleFromToken } from "@/app/helper/getRoleFromToken";
import {connect} from "@/dbConfig/dbConfig";
import Request from "@/models/requestModel";
import { NextRequest, NextResponse } from "next/server";

connect()


export async function PUT(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        console.log("touched the data");
        const url = new URL(request.url);
        const resumeId = url.searchParams.get('resumeId');
        const employerStatus = "viewed";
        console.log("resumeId: ", resumeId);
    
        // Assuming Request is a model in Mongoose or similar framework
        const updatedJob = await Request.findOneAndUpdate(
            { resumeId: resumeId }, // Assuming userId is a field in the document
            { employerStatus },
            { new: true } // Return the updated document
        );
    
        console.log("Updated job:", updatedJob);
        return NextResponse.json({
            message: "Resume updated successfully",
            success: true,
            data:updatedJob,
        });
    } catch (error) {
        console.error("Error occurred:", error);
    }
   
    

}
