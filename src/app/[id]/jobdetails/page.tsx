"use client"
import { getDataFromToken } from "@/app/helper/getDataFromToken";
import Applyjob from "@/components/ApplyJob";
import DetailJob from "@/components/detailJobView";
import { Button } from "@nextui-org/button";
import axios from "axios";
import { usePathname } from "next/navigation";
import React from "react";

function JobDetail(){
  

    return (
      <>
  <DetailJob/>
  </>

    )
}
export default JobDetail;