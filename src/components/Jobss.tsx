import axios from "axios";
import React, { useEffect, useState } from "react";



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


 async function Jobss() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    async function getJobs() {
      try {
        const response = await axios.get("/api/jobs/jobsbyid");
        if (response.status === 200) {
          // console.log(response.data); // Make sure the data structure is as expected
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
    // console.log(formattedText);
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
      
{ jobs && jobs.map((job) => (
        <div key={job._id} className="text-black " >
          {/* {job.description} */}
          <div className="grid mx-20">
          {/* <!-- Question Listing Item Card --> */}
          <div className="grid place-items-center">
            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg duration-500 px-2 sm:px-6   w-full sm:w-3/4 md:px-2 py-4 my-6">
              <div className="grid grid-cols-10 gap-3">
                {/* <!-- Meta Column --> */}
  
                {/* <!-- Summary Column --> */}
                <div className="col-span-12 sm:px-5  sm:col-start-1 sm:col-end-13 px-3 sm:px-0">
                
  
                  <div className="mt-2">
                    <a
                      href="#"
                      className="sm:text-sm md:text-md lg:text-lg text-gray-700 font-bold hover:underline"
                    >
                      {job.title}
                    </a>
                    <div className="flex justify-between items-center hidden sm:block">
                    
                    <span className="font-bold ml-0 text-red-800 text-md">
                      {job.companyName}
                    </span>
                   


                  </div>
  
                    <p className="mt-2 text-gray-600 text-sm md:text-md">
                    {truncateText(job.description, 50)}
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
                        {job.address}
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
                       {job.category}
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
                        {job.type}
                      </a>
                    </div>
  
                    {/* <!-- User --> */}
                    <div className="col-none mt-2 mr-2 lg:block lg:col-start-9 lg:col-end-12">
                    <div className=" lg:flex lg:flex-1 lg:justify-end">
                    <a href={`/employer/${job._id}/requestList`} className="text-lg mr-4 font-semibold leading-6 text-gray-800">
                Response <span aria-hidden="true"></span>
              </a>
              <a href={`/${job._id}/jobdetails`} className="text-lg font-semibold leading-6 text-pink-900">
                View Job <span aria-hidden="true">&rarr;</span>
              </a>
            
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

export default Jobss;