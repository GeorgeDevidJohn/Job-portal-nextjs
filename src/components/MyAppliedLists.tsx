import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";

import { CopyIcon } from "@radix-ui/react-icons"
 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ViewJob from "./ViewJob";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";


type JobType = {
  _id: string,
  userId: string,
  title: string,
  companyName: string,
  description: string,
  type: string,
  pay: number,
  category: string,
  address: string
}

 async function MyAppliedLists() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    async function getJobs() {
      try {
        const response = await axios.get("/api/jobs/status");
        if (response.status === 200) {
          console.log(response.data); // Make sure the data structure is as expected
          setJobs(response.data.data); // Set the fetched data to the state
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }

    getJobs();
  }, []);

  function formatDataForDisplay(data :string) {

    
    

  }
  

  function truncateText(text: string, wordLimit: number) {
    const words = text.split(' ');
    let data =""
    if (words.length > wordLimit) {
       data= words.slice(0, wordLimit).join(' ') + '...';
   
    const regex = /\*\*(.*?)\*\*/g;
    const lines = data.split('\n');
    let formattedTdata = '';
  
    for (const line of lines) {
      if (line.trim().startsWith('-')) {
        formattedTdata += `<br>${line.trim()}`;
      } else {
        formattedTdata += `${line.trim()}`;
      }
      formattedTdata += '\n';
    }
     const newdata = formattedTdata.trim()
  
  // Replace ** symbols with <h2> and </h2> tags
  const formattedText = newdata.replace(regex, '<h2 style="color:gray; font-weight:800 ">$1</h2>');

//const modifiedString = data.replace(/\*\*/g, '<h2  style="color:gray; font-weight:800 ; margin-bottom:.5rem">Job Title:</h2>');
    console.log(formattedText);
    return   <div dangerouslySetInnerHTML={{ __html: formattedText }} />
  }
  else{
    return text;
  }
    
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@iconscout/unicons@3.0.6/css/line.css"
      />
{jobs.map((job) => (
        <div key={job._id} className="text-black" >
          {/* {job.description} */}
          <div className="grid mx-20">
          {/* <!-- Question Listing Item Card --> */}
          <div className="grid place-items-center">
            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg duration-500 px-2 sm:px-6   w-full sm:w-3/4 md:px-2 py-4 my-6">
              <div className="grid grid-cols-10 gap-3">
                {/* <!-- Meta Column --> */}
  
                {/* <!-- Summary Column --> */}
                <div className="col-span-12 sm:px-5  sm:col-start-1 sm:col-end-13 px-3 sm:px-0">
                
  
                  <div className="mt-2 ">
                    <div className="flex justify-between items-center">
                    <a
                      
                      className="sm:text-sm md:text-md lg:text-lg text-gray-700 font-bold hover:underline"
                    >
                      {job.job.title}
                    </a>
                    <div  className="flex justify-between  items-center">
                     <div className="flex justify-between gap-2 mr-8 items-center" >
                     <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 576 512"><path fill="#3d9ae1" d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/></svg>  {job.request.employerStatus}
                        </div>   
                        <HoverCard>
  <HoverCardTrigger>
                    <span className={` ${job.request.status == "pending"? "bg-yellow-400":job.request.status == "rejected"? "bg-red-400": job.request.status == "accepted"?"bg-green-400":"bg-blue-400" } font-semibold rounded-lg py-1 px-2`}>{job.request.status}</span>
                    </HoverCardTrigger>  
  <HoverCardContent>
    <p className= {` ${job.request.status == "accepted"? "block text-red-800":"hidden"}`}> Congradulation you will be recieving email from the employer soon</p>
    <p className= {` ${job.request.status == "rejected"? "block text-red-800":"hidden"}`}> Sorry better luck next time</p>
    <p className= {` ${job.request.status == "pending"? "block text-red-800":"hidden"}`}> Waiting for the response</p>
    <p className= {` ${job.request.status == "applied"? "block text-red-800":"hidden"}`}> Applied to the job</p>


  </HoverCardContent>
</HoverCard>

                    </div>
                    </div>
                    <div className="flex justify-between items-center hidden sm:block">
                    
                    <span className="font-bold ml-0 text-red-800 text-md">
                      {job.job.companyName}
                    </span>
                   


                  </div>
  
                    <p className="mt-2 text-gray-600 text-sm md:text-md">
                    {truncateText(job.job.description, 50)}
                    </p>
                  </div>
  
                  {/* <!-- Question Labels --> */}
                  <div className="grid grid-cols-2 mt-4 my-auto">
                    {/* <!-- Categories  --> */}
                    <div className="col-span-12 lg:col-span-8">
                      <a
                        className="inline-block rounded-full text-white 
                              bg-red-400 hover:bg-red-500 duration-300 
                              text-xs font-bold 
                              mr-1 md:mr-2 mb-2 px-3 md:px-4 py-1 
                              opacity-90 hover:opacity-100    bg-[#726cf88a] bg-gradient-to-br from-[#9996d6bf] to-[#e975a8] pb-4 pt-4 rounded-lg"
                      >
                        <svg
                          className="h-4 w-4 text-white float-left mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                              
                               
                             
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                              
                               
                             
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {job.job.address}
                      </a>
                      <a
                        href="#"
                        className="inline-block rounded-full text-white 
                              bg-yellow-400 hover:bg-yellow-500 duration-300 
                              text-xs font-bold 
                              mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 
                              opacity-90 hover:opacity-100 bg-[#726cf88a] bg-gradient-to-br from-[#9996d6bf] to-[#e975a8] pb-4 pt-4 rounded-lg"
                      >
                        <svg
                          className="h-4 w-4 text-white float-left mr-2"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                           
                          stroke="currentColor"
                          fill="none"
                            
                             
                        >
                          {" "}
                          <path stroke="none" d="M0 0h24v24H0z" />{" "}
                          <rect x="3" y="7" width="18" height="13" rx="2" />{" "}
                          <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />{" "}
                          <line x1="12" y1="12" x2="12" y2="12.01" />{" "}
                          <path d="M3 13a20 20 0 0 0 18 0" />
                        </svg>{" "}
                       {job.job.category}
                      </a>
                      <a
                        href="#"
                        className="inline-block rounded-full text-white 
                              bg-green-400 hover:bg-green-500 duration-300 
                              text-xs font-bold 
                              mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 
                              opacity-90 hover:opacity-100 bg-[#726cf88a] bg-gradient-to-br from-[#9996d6bf] to-[#e975a8] pb-4 pt-4 rounded-lg"
                      >
                        <svg
                          className="h-4 w-4 text-white  float-left mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                              
                               
                             
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {job.job.type}
                      </a>
                    </div>
  
                    {/* <!-- User --> */}
                    <div className="col-none mt-2 mr-2 lg:block lg:col-start-9 lg:col-end-12">
                    <div className=" lg:flex lg:flex-1 lg:justify-end">
             
                    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Job</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] sm:w-[620px">
        <DialogHeader>
          <DialogTitle>{job.job.title}</DialogTitle>
          <DialogDescription >
          <Suspense>
            <ViewJob _id = {job.job._id}/>
          </Suspense>
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
           
          </div>
         
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
           
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
            </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>  
        </div>
      ))}




      {/* {jobs.map((job) => {
            <div className="text-black">
              {job.category}
            </div>
   

      })} */}




    </>
  )
}

export default MyAppliedLists;