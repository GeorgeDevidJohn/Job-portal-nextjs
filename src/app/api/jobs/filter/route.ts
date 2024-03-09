import { connect } from "@/dbConfig/dbConfig";
import Job from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request:NextRequest){
    try {
        
        const url = new URL(request.url);
        const type = url.searchParams.get('type');
        const category = url.searchParams.get('category');
        const location = url.searchParams.get('location');

        const filter: Record<string, any> = {};
        if (type) filter.type = type;
        if (category) filter.category = category;
        if (location) {
            filter.address = { $regex: new RegExp(location, 'i') };
        }


        console.log(filter);

        
        //const jobs = await Job.find(filter);

        let jobs;
        if (Object.keys(filter).length === 0) {
            jobs = await Job.find();
        } else {
            jobs = await Job.find(filter);
        }

        console.log(jobs);
        return NextResponse.json({
            message: "Jobs found",
            data: jobs
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
        
    }
}


