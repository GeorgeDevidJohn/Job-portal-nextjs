"use client";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";

export type User = {
  _id: string,
  firstName: string,
  lastName: string,
  role: string,
  email: string,
  password: string,

};

function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<User>();



  const getUser = async (): Promise<void> => {
    try {
      const response = await axios.get("/api/users/me");
      console.log("status : " + response.status);
      setUser(response.data.data);

    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);


  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
      window.location.reload();        

    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <nav
        className="flex items-center justify-between p-.5 lg:px-8  backdrop-blur-3xl   z-50 w-full fixed"
        aria-label="Global"
      >
        <div className="flex p-6">
          <div className="flex justify-center items-center">
            <div className={`relative  w-10 mr-2  ${user != undefined ? "block" : "hidden"} overflow-hidden bg-gray-100 h-10 rounded-full dark:bg-gray-600`}>
              <svg className="absolute  h-10 w-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
            </div>
            <div className={`font-medium mr-6 dark:text-white  relative`}>
              <div>{user?.firstName} {user?.lastName}</div>
              <div className="text-sm  w-auto text-gray-500 dark:text-gray-400">{user?.role} </div>
            </div>
          </div>

        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden items-center lg:flex lg:gap-x-12">
          <Link
            href="/"
            className={`
              ${pathname == "/"
                ? "text-sm font-bold leading-6 text-gray-900 "
                : "text-sm font-semibold leading-6 text-gray-500"} ${user?.role == "user" || null || undefined ? "block" : "hidden"}
            `}
          >
            Home
          </Link>
          <Link
            href="/employer/dashboard"
            className={`
              ${pathname == "/employer/dashboard"
                ? "text-sm font-bold leading-6 text-gray-900 "
                : "text-sm font-semibold leading-6 text-gray-500"} ${user?.role == "employer" ? "block" : "hidden"}
            `}
          >
            Home
          </Link>
          <Link
            href="/user/appliedList"
            className={`
              ${pathname == "/user/appliedList"
                ? "text-sm font-bold leading-6 text-gray-900 "
                : "text-sm font-semibold leading-6 text-gray-500"} ${user?.role == "user" ? "block" : "hidden"}
            `}
          >
            Applied List
          </Link>

          <button className={`${user != undefined || null ? "block" : "hidden"} text-sm font-semibold leading-6 text-gray-900`} onClick={logout} > Logout <span aria-hidden="true">&rarr;</span></button>
          <div className="lg:flex lg:flex-1 lg:justify-end">
            <a href="/login" className={`${user?._id == "" || undefined ? "block" : "hidden"} text-sm font-semibold leading-6 text-gray-900`}>
              Log in <span aria-hidden="true">&rarr;</span>
            </a>





          </div>
        </div>

        {!user && (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        )}
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-opacity-6 backdrop-blur-3xl px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <div className={`relative w-10 mr-4  ${user != undefined || null ? "block" : "hidden"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
                  <svg className="absolute w-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                </div>
                <div className={`font-medium mr-6 dark:text-white`}>
                  <div>{user?.firstName} {user?.lastName}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{user?.role} </div>
                </div>
                <Link
                  href="/"
                  className={
                    pathname == "/"
                      ? "-mx-3 block rounded-lg px-3 py-2 text-base font-bold leading-7 text-gray-900 hover:bg-gray-500 "
                      : "-mx-3 block rounded-lg px-3 py-2 text-base font-bold leading-7 text-gray-500 hover:bg-gray-500"
                  }
                >
                  Home
                </Link>
                <Link
                  href="/user/appliedList"
                  className={`
                    ${pathname == "/user/appliedList"
                      ? "-mx-3 block rounded-lg px-3 py-2 text-base font-bold leading-7 text-gray-900 hover:bg-gray-500 "
                      : "-mx-3 block rounded-lg px-3 py-2 text-base font-bold leading-7 text-gray-500 hover:bg-gray-500"} ${user?.role == "user" ? "block" : "hidden"
                    }`}
                >
                  Applied List
                </Link>


              </div>
              <div className="py-6">
                <a href="/login" className={`${user?._id == "" || undefined ? "block" : "hidden"} text-sm font-semibold leading-6 text-gray-900`}>
                  Log in <span aria-hidden="true">&rarr;</span>
                </a>
                <button className={`${user != undefined || null ? "block" : "hidden"} text-sm font-semibold leading-6 text-gray-900`} onClick={logout} > Logout <span aria-hidden="true">&rarr;</span></button>

              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>


    </>
  );
};
export default Navigation;
