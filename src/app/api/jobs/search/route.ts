import { connect } from "@/dbConfig/dbConfig";
import Job from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request:NextRequest){
    try {
        
        const url = new URL(request.url);
        const searchQuery = url.searchParams.get('search');
        console.log(searchQuery);
        const filter: Record<string, any> = {};


        if (searchQuery) {
            filter.title = { $regex: searchQuery, $options: "i" }; // Case-insensitive search
        }


        const jobs = searchQuery ? await Job.find(filter) : await Job.find();

        return NextResponse.json({
            message: "Jobs found",
            data: jobs
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
        
    }
}

