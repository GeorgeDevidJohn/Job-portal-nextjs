"use client"


import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

interface idProps { 
  _id: string;

}


const Resume: React.FC<idProps> = ({_id }) => {
  
  type ResumeType = {
    _id: string,
    firstName: string,
    lastName: string,
    age: number,
    experience: string,
    aboutYou: string,
    availibility: string,
    highestQualification: number,
    status:string ,
    address:string

  }

  const [resume, setJob] = React.useState<ResumeType>();
  const router = usePathname();
  let [uerid,setName] = React.useState("");
  const id = _id ;
  //console.log(id)
 

  useEffect(() => {
    const sendGetRequest = async () => {
      try {
        const response = await axios.get(`/api/resumes/`, {
          params: {
            id: id,
          },
        });



        const status = await fetch("/api/viewresponse?resumeId="+ id,  {
            method: "PUT",
            headers: { "Content-Type": "application/json" },  
            
          });


         console.log(response.data.data)
        setJob(response.data.data[0]);
      } catch (err) {
        console.log(err);
      }
    };

    sendGetRequest(); // Call the function once when component mounts
  }, []); 

    return (

  
<>

{resume &&
<div className="grid sm:max-h-80 ">
        {/* <!-- Question Listing Item Card --> */}
        <div className="grid place-items-center" >
          <div className="">
            <div className="px-2 pt-16 pb-16 h-[350px]  overflow-y-scroll">
              {/* <!-- Meta Column --> */}
             
      

      <div className=" text-lg  font-bold leading-8 text-black-800">
        About You
      </div><div>{resume.aboutYou}</div>
      <div className=" text-lg mt-4 font-bold leading-8 text-black-800">
        Availability
      </div><div>{resume.availibility}</div>

      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Experience</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{resume.experience}</dd>
      </div>
      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Heighest Qualification</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{resume.highestQualification}</dd>
      </div>
      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900"> Address</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{resume.address}</dd>
      </div>
      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Current status</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{resume.status}</dd>
      </div>            
            </div>
          </div>
          </div>
      </div>
}
        </>
    )
}
export default Resume;