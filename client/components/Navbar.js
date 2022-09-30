import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Menu } from "@headlessui/react";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

const Navbar = () => {
  const { user, error, isLoading } = useUser();
  return (
    <div className="flex py-6  justify-between">
      <div>
        <p className="text-5xl text-white font-semibold pl-20 pt-4 ">
          Flower Shop
        </p>
      </div>
      <div className="flex pr-6 ">
        <div className="pr-6">
          <Link href='/profile'>
          <img
            src={user?.picture}
            className=" w-16 h-16 object-cover rounded-full "
          />
          </Link>
          
        </div>

        <div className=" bg-indigo-900 flex justify-end pt-4 p-4">
          <Menu as="div" className="relative ">
            <Menu.Button className="inline-flex justify-center w-full rounded-md border  border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              Options Menu
            </Menu.Button>
            

            {/* Menu Items */}

            <Menu.Items className="origin-top-right z-50 absolute right-0 mt-4 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
              <div className="py-1">
                <Link
                  href="/profile"
                  className=" group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white  "
                >
                  My Profile
                </Link>
              </div>
              <div className="py-1   ">
                <Link
                  href="/api/auth/logout"
                  className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white  "
                >
                  Log out
                </Link>
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
