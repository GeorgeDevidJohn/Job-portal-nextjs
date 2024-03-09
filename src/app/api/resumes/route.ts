import { getDataFromToken } from "@/app/helper/getDataFromToken";
import { getRoleFromToken } from "@/app/helper/getRoleFromToken";
import {connect} from "@/dbConfig/dbConfig";
import Resume from "@/models/resumeModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request:NextRequest){
    try {

        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');
        const resumes = await Resume.find({_id:id});
        return NextResponse.json({
            message: "Resume found",
            data: resumes
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
         
            if(role=="employer"){
                return NextResponse.json({
                    message: "Employer can not create resume",
                })
            }else{
            const reqBody = await request.json()
            const {
                firstName,
                lastName,
                age,
                experience,
                aboutYou, 
                highestQualification,
                availibility,
                address,
                status} = reqBody
    
            const newResume = new Resume({
                userId,
                firstName,
                lastName,
                age,
                experience,
                aboutYou, 
                highestQualification,
                availibility,
                address,
                status
            })
    
            console.log(newResume);
    // Saves the new user to the database.
            const savedResume = await newResume.save()
    
            
            return NextResponse.json({
                message: "Resume created successfully",
                success: true,
                savedResume
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
        const resumeId = url.searchParams.get('resumeId');

        if(role=="employer"){
            return NextResponse.json({
                message: "Employer can not delete resume",
            })
        }else{

        

        const deletedResume = await Resume.findOneAndDelete({ _id: resumeId, userId });

        if (!deletedResume) {
            throw new Error("Resume not found or you are not authorized to delete it.");
        }

        return NextResponse.json({
            message: "Resume deleted successfully",
            success: true,
            deletedResume
        });
    }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const userIdFromToken = await getDataFromToken(request);
        const role = await getRoleFromToken(request);
        const url = new URL(request.url);
        const resumeId = url.searchParams.get('resumeId');
    

        const reqBody = await request.json();
        const {  firstName, lastName, age, experience, aboutYou, highestQualification, availability, address, status } = reqBody;

        // Check if the resumeId is provided
        if (!resumeId) {
            return NextResponse.json({ error: "resumeId is required for updating a resume" }, { status: 400 });
        }

        // Find the existing resume by resumeId
        const existingResume = await Resume.findOne({ _id: resumeId });

        if (!existingResume) {
            return NextResponse.json({ error: "Resume not found for the given resumeId" }, { status: 404 });
        }

        // Check if the user updating the resume is the owner (userId matches)
        if (existingResume.userId !== userIdFromToken) {
            return NextResponse.json({ error: "You are not authorized to update this resume" }, { status: 403 });
        }

        // Update the existing resume with the new values
        existingResume.firstName = firstName;
        existingResume.lastName = lastName;
        existingResume.age = age;
        existingResume.experience = experience;
        existingResume.aboutYou = aboutYou;
        existingResume.highestQualification = highestQualification;
        existingResume.availability = availability;
        existingResume.address = address;
        existingResume.status = status;

        // Save the updated resume to the database
        const updatedResume = await existingResume.save();

        return NextResponse.json({
            message: "Resume updated successfully",
            success: true,
            updatedResume,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
