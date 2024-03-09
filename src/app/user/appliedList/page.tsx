"use client"
import JobListing from "@/components/JobListing";
import MyAppliedLists from "@/components/MyAppliedLists";
import { Suspense } from "react";

function AppliedList() {
    return (
      <>
        {/* <!-- Hero --> */}
        <div className="relative overflow-hidden ">
          <div className="max-w-[85rem] mx-auto sm:mt-2 mt-20 px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
            <div className="text-center">
              <h2 className="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-gray-200">
                Applied List
              </h2>
  
             
  
              <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
               
  
                <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
                 
                </div>
                {/* <!-- End SVG Element -->
  
          <!-- SVG Element --> */}
                <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
                 
                </div>
                {/* <!-- End SVG Element --> */}
              </div>
            
            </div>
          </div>
        </div>
        {/* <!-- End Hero --> */}
  
        {/* <!-- Unicons --> */}
    <Suspense>
  <MyAppliedLists/>
  </Suspense> 
  
      </>
    );
  }
  export default AppliedList;
  