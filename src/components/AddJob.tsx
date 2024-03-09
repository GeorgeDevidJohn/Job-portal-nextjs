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
function Addjob() {
  const [showModal, setShowModal] = useState(false);


  const [error, setError] = useState("");
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title");
    const companyName = formData.get("companyName");
    const description = formData.get("description");
    const type = formData.get("type");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const pay = formData.get("pay");
    const category = formData.get("category");
    const country = formData.get("country");
    const street = formData.get("street");
    const city = formData.get("city");
    const postal = formData.get("postal-code");

    if (
      title == "" ||
      companyName == "" ||
      description == "" ||
      type == "" ||
      pay == "" ||
      phone == "" ||
      email == "" ||
      category == "" ||
      country == "" ||
      street == "" ||
      city == "" ||
      postal == ""
    ) {
      setError("All fields are required");
      return;
    }

    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        title : title,
        companyName : companyName,
        description : description,
        type :type , 
        phone : phone,
        email : email,
        pay : pay,
        category :category,
        address : country + ", "+ street+", "+city+ ", "+postal 
       }),
      
      
    });
     if(response.status == 200){
      toast.success('Job have  successfully psosted!');
      console.log('SUCCESS!');

      setTimeout(function() {
   window.location.reload();
}, 3000);    
     }
     else{
      toast.error('Some error have occured!');
      console.log('error!');
     }

   
  }

  return (
    <>
    <ToastContainer/>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="rounded-md bg-[#726cf88a] w-60 bg-gradient-to-br from-[#9996d6bf] to-[#e975a8] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#726cf88a] bg-gradient-to-br from-[#9996d6bf] to-[#e975a8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add Job
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Add Job</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
          {error && (
                      <div className="text-red-500 text-center mb-4">{error}</div>)}
            <div className="grid gap-4 py-4">
              {/* Title */}
              <div>
                <Label className="text-left block">Title</Label>
                <Input id="title" name="title" />
              </div>
              {/* Company Name */}
              <div>
                <Label className="text-left block">Company Name</Label>
                <Input id="companyName" name="companyName" />
              </div>
              {/* Description */}
              <div>
                <Label className="text-left block">Description</Label>
                <Textarea id="description" name="description" />
              </div>
              {/* Two columns layout */}
              <div className="grid grid-cols-2 gap-4">
                {/* Type */}
                <div>
                  <Label className="text-left block mb-3">Type</Label>
                  <Select name="type">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Type"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>                      
                        <SelectItem value="Part Time">Part Time</SelectItem>
                        <SelectItem value="Full Time">Full Time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>                      
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {/* Pay */}
                <div>
                  <Label className="text-left block mb-3">Pay</Label>
                  <Input id="pay" name="pay" type="number" />
                </div>
                {/* Category */}
                <div>
                  <Label className="text-left block mb-3">Category</Label>
                  <Select name="category">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Category"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>      
                      <SelectItem value="IT">IT</SelectItem>                
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Health">Health</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Art">Art</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-left block">Phone</Label>
                  <Input id="city" type="number" name="phone" />
                </div>
                <div>
                  <Label className="text-left block">Email</Label>
                  <Input id="city" name="email" />
                </div>
                {/* Country */}
                <div>
                  <Label className="text-left block mb-3">Country</Label>
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
                </div>
              
           
                {/* Street */}
                <div>
                  <Label className="text-left block">Street</Label>
                  <Input id="street" name="street" />
                </div>
                {/* City */}
                <div>
                  <Label className="text-left block">City</Label>
                  <Input id="city" name="city" />
                </div>
           
                {/* Postal Code */}
                <div>
                  <Label className="text-left block">Postal Code</Label>
                  <Input id="postal-code" name="postal-code" />
                </div>
              </div>
            </div>
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
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Export the App component
export default Addjob;
