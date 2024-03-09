import { getDataFromToken } from "@/app/helper/getDataFromToken";
import { getRoleFromToken } from "@/app/helper/getRoleFromToken";
import {connect} from "@/dbConfig/dbConfig";
import Job from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request:NextRequest){
    try {
        const jobs = await Job.find();
        return NextResponse.json({
            message: "Jobs found",
            data: jobs
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
        
    }
}


export async function POST(request: NextRequest){
    // Defines an asynchronous POST request handler.
        try {
            const userId = await getDataFromToken(request);
            const role = await getRoleFromToken(request);
         
            if(role=="employee"){
                return NextResponse.json({
                    message: "Employee can not create a job",
                })
            }else{
                const reqBody = await request.json()
                const {title,companyName,description,type, pay,category,address,email,phone} = reqBody
        
                const newJob = new Job({
                    userId,
                    title,
                    companyName,
                    description,
                    type, 
                    pay,
                    category,
                    address,
                    email,
                    phone
                })
        
                console.log(newJob);
        // Saves the new user to the database.
                const savedJob = await newJob.save()
        
                
                return NextResponse.json({
                    message: "Job created successfully",
                    success: true,
                    savedJob
                })
            }



           
    
    
        } catch (error: any) {
            return NextResponse.json({error: error.message}, {status: 500})
    
        }
    }



    export async function DELETE(request: NextRequest) {
        try {
            const userId = await getDataFromToken(request);
            const role = await getRoleFromToken(request);
            const url = new URL(request.url);
            const jobId = url.searchParams.get('jobId');
    

            if(role=="employee"){
                return NextResponse.json({
                    message: "Employee can not delete a job",
                })
            }else{

            const deletedJob = await Job.findOneAndDelete({ _id: jobId, userId });
    
            if (!deletedJob) {
                throw new Error("Job not found or you are not authorized to delete it.");
            }
    
            return NextResponse.json({
                message: "Job deleted successfully",
                success: true,
                deletedJob
            });
        }
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }


    export async function PUT(request: NextRequest) {
        try {
            const userId = await getDataFromToken(request);
            const role = await getRoleFromToken(request);
    
            const url = new URL(request.url);
            const jobId = url.searchParams.get('jobId');
        
            const reqBody = await request.json();
            const { title, companyName, description, pay } = reqBody;
    
            const updatedJob = await Job.findOneAndUpdate(
                { _id: jobId, userId },
                { title, companyName, description, pay },
                { new: true } // Return the updated document
            );
    
            if (!updatedJob) {
                throw new Error("Job not found or you are not authorized to update it.");
            }
    
            return NextResponse.json({
                message: "Job updated successfully",
                success: true,
                updatedJob
            });
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }