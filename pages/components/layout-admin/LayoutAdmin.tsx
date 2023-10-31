import React, { useState } from "react";
import Link from "next/link";
import { useMediaQuery } from 'react-responsive';


// @ts-ignore
const LayoutAdmin = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
            <div className="min-h-screen flex flex-col">
            <div className="container xl:max-w-full lg:max-w sm:max-w-[2vw] flex-grow  mx-auto lg:mx-auto py-[15vh] flex">
                {!isMobile && (
                    <ul className="lag:hidden py-15 w-1/5 h-full">
                        <li className="mb-2">
                            <Link href="/components/admin-management/manage-editor" className="hover:text-gray-400 py-3 px-2 block">
                                Quản lý nhân viên
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/components/admin-management/manage-post" className="hover:text-gray-400 py-3 px-2 block">
                                Quản lý bài viết
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/components/admin-management/manage-typePost" className="hover:text-gray-400 py-3 px-2 block">
                                Quản lý loại bài viết
                            </Link>
                        </li>
                    </ul>
                ) }
                <main className="w-full">{children}</main>
            </div>
            <footer className="bg-red-500 text-white py-4 flex justify-between items-center">
            </footer>
        </div>
    );
};

export default LayoutAdmin;