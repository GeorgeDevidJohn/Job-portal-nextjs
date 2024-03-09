"use client";
import React, { FormEvent, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input, Textarea } from "@nextui-org/react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";
import { useRouter } from "next/navigation";
interface idProps {
   
  _id: string;

}
const Addjob: React.FC<idProps> = ({_id }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  function getCurrentDate() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();

    return `${month}/${day}/${year}`;
}
  const [error, setError] = useState("");
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const age = formData.get("age");
    const experience = formData.get("experience");
    const aboutYou = formData.get("aboutYou");
    const highestQualification = formData.get("highestQualification");
    const availibility = formData.get("availibility");
    const status = formData.get("status");
    const country = formData.get("country");
    const street = formData.get("street");
    const city = formData.get("city");
    const postal = formData.get("postalcode");

    if (
      firstName == "" ||
      lastName == "" ||
      age == "" ||
      experience == "" ||
      aboutYou == "" ||
      highestQualification == "" ||
      availibility == "" ||
      status == "" ||
      country == "" ||
      street == "" ||
      city == "" ||
      postal == ""
    ) {
      setError("All fields are required");
      return;
    }

    const response = await axios("/api/resumes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ 
        firstName : firstName ,
        lastName : lastName,
        age : age,
        experience: experience,
        aboutYou: aboutYou, 
        highestQualification: highestQualification,
        availibility: availibility,
        address: country + ", "+ city+", "+street+", "+ postal,
        status: status 
       }),
      
      
    });
    if(response.status == 200){
    
      console.log(response);
      const data = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
           jobId :_id,
           resumeId :response.data.savedResume._id ,
          dateApplied: getCurrentDate(), 
         }),      
      });
      toast.success('Successfully Applied to the job!');
      console.log('SUCCESS!');
      setTimeout(function() {
        router.push("/user/appliedList");
     }, 3000);
    }
  
   
  
   
  }

  return (
    <>
     <ToastContainer/>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="rounded-md bg-[#726cf88a] w-40 bg-gradient-to-br from-[#9996d6bf] to-[#e975a8] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#726cf88a] bg-gradient-to-br from-[#9996d6bf] to-[#e975a8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Apply  Now
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Fill Your Resume</DialogTitle>
          </DialogHeader>
          <form className="space-y-4 p-6" onSubmit={handleSubmit}>
        
      <div className="grid grid-cols-3 gap-4">
        {/* First Name, Last Name, and Age */}
        <div className="col-span-1">
        
                  <Input id="postal-code" placeholder="First Name" name="firstName" />
        </div>
        <div className="col-span-1">
        
                  <Input id="postal-code" placeholder="Last Name" name="lastName" />
        </div>
        <div className="col-span-1">
                  <Input id="postal-code" placeholder="Age" type="number" name="age" />
        </div>

        {/* Experience, Highest Qualification, and Status */}
        <div className="col-span-1">
        
                  <Select name = "experience">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Experience "/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Less Than 1 Year">Less Than 1 Year</SelectItem>
                        <SelectItem value="1 year">1 Year</SelectItem>
                        <SelectItem value="2 Year">2 Year</SelectItem>
                        <SelectItem value="3 Year">3 Year</SelectItem>
                        <SelectItem value="4 Year and above">4 Year and above</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
            {/* Add experience options */}
         
        </div>
        <div className="col-span-1">
        
                  <Select name = "highestQualification">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select  Qualification"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Heigh School">Heigh School</SelectItem>
                        <SelectItem value="Graduate">Graduate</SelectItem>
                        <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                        <SelectItem value="Masters">Masters</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
        </div>
        <div className="col-span-1">
        
                  <Select name = "status">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select  Status"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Permanent Residence">Permanent Residence</SelectItem>
                        <SelectItem value="Citizen">Citizen</SelectItem>
                        <SelectItem value="Study Permit">Study Permit</SelectItem>
                        <SelectItem value="Work Permit">Work Permit</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
        </div>

        {/* About You */}
        <div className="col-span-3">
        <Textarea id="description" name="aboutYou"  placeholder="About You"/>
        </div>

        {/* Availability */}
        <div className="col-span-3">
        <Textarea id="description" name="availibility"  placeholder="Enter your Avaialability"/>
        </div>

        {/* Country, City, Street, and Zip Code */}
        <Select name = "country">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Country"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="USA">USA</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        
                      </SelectGroup>
                    </SelectContent>
                  </Select>
        <div className="col-span-1">
        <Input id="postal-code" placeholder="City" name="city" />

        </div>
        <div className="col-span-1">
        <Input id="postal-code" placeholder="Street" name="street" />

        </div>
        <div className="col-span-1">
        <Input id="postal-code" placeholder="Zip code" name="pincode" />

        </div>
      </div>
    

                <div className="flex justify-end space-x-2">
                <DialogFooter>
                <DialogClose asChild>
              <Button
                type="submit"
                className="rounded-md bg-[#726cf88a] w-60 bg-gradient-to-br from-[#9996d6bf] to-[#e975a8] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#726cf88a] bg-gradient-to-br from-[#9996d6bf] to-[#e975a8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Save changes
              </Button>
              </DialogClose>
            </DialogFooter>
                </div>
              </form>

        </DialogContent>
      </Dialog>
    </>
  );
}

// Export the App component
export default Addjob;
