import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface idProps {
   
      _id: string;
    
  }
  const DeleteJob: React.FC<idProps> = ({_id }) => {
    const router = useRouter();

    const handleDeleteJob = async () => {
        // Call your API here to delete the job
        if (_id) {
        try {
          const response = await axios.delete("/api/jobs?jobId="+_id);
          if (response.status == 200) {
            // Job deleted successfully
            toast.success('Job have  successfully deleted!');
            console.log('SUCCESS!');
            console.log("Job deleted successfully");
            setTimeout(function() {
              router.push("/employer/dashboard");
           }, 3000);
           
          } else {
            // Handle error
            console.error("Failed to delete job");
          }
        } catch (error) {
          console.error("Error deleting job:", error);
        }
    }
      };


    return(
        <>
         <ToastContainer/>
        <AlertDialog>
  <AlertDialogTrigger className="rounded-md bg-red-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Delete</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        Are you sure you want to detele the job
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDeleteJob}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

        </>
    )
}
export default DeleteJob;