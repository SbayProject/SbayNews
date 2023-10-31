'use client'
import Link from "next/link";
import Image from "next/image";
import React, {useContext, useEffect, useState} from "react";
import Logo_Header from "../../../public/img/logo-sbay-header.png";
import {AiOutlineCloseCircle, AiOutlineMenu} from "react-icons/ai";
import {ListGetAllTypePost, ListGetTypePostSearch} from "@/pages/service/typePostService";
import CounterContext from "@/pages/components/reactContext/context";
import {BiLogIn} from "react-icons/bi";
import {MdOutlineManageAccounts} from "react-icons/md";
import 'react-toastify/dist/ReactToastify.min.css';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [typePosts, setTypePosts] = useState([]);
    const [postType, setPostType] = useState([]);
    const {counter, setCounter} = useContext(CounterContext);
    const [isLogin, setIsLogin] = useState(false);
    const [token, setToken] = useState('');
    const [image, setImage] = useState('');
    const [name, setNames] = useState('');
    const [role, setRole] = useState('');

    const GetListAllTypePost = async () => {

        const res = await ListGetAllTypePost('');

        setTypePosts(res);
    }
    // @ts-ignore
    const GetListAllTypePostId = async (id) => {
        const res = await ListGetTypePostSearch(id, null, 0);
        setCounter(res.content);
        await new Promise((resolve) => setTimeout(resolve, 150))
        setPostType(res);
    }
    useEffect(() => {
        GetListAllTypePost();
    }, [])

    const handleModalOpen = (b: boolean) => {
        setMobileMenuOpen(false);
        setMenuOpen(false)
        setOpen(false)
    };
    const LogOut = async () => {
        await localStorage.removeItem("sub")
        await localStorage.removeItem("token")
        await localStorage.removeItem("name")
        await localStorage.removeItem("image")
        await localStorage.removeItem("role")
        //@ts-ignore
        await setIsLogin(false);
        setImage('');
        setNames('');
        setRole('');
        await new Promise((resolve) => setTimeout(resolve, 250))

    }
    const setTokenLogin = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token)
            //@ts-ignore
            setImage(localStorage.getItem("image"))
            //@ts-ignore
            setNames(localStorage.getItem("name"))
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
        const storedRole = localStorage.getItem('role');
        if (storedRole) {
            setRole(storedRole);
        }
    }
    useEffect(() => {
        setTokenLogin()
    })

    if (!typePosts) {
        return null;
    }
    if (!postType) {
        return null;
    }
    return <>
        <header className="">
            <nav className="border-gray-200 px-4 lg:px-6 py-2.5 lg:h-20  z-40 fixed top-0
                flex w-full items-center justify-between bg-secondary-50 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start">
                <div className="mx-auto max-w-screen-xl flex w-full flex-wrap items-center justify-between px-3">
                    <Link href="/components/home-news/layoutHome" className="flex items-center">
                        <Image src={Logo_Header} className="mr-3 h-12 sm:h-10" alt=""/>
                    </Link>
                    {isLogin ? (
                        <div className="lg:order-2 z-40 ">
                            <Link href="/#"
                                  className=" flex py-2 pr-4 relative justify-center items-center rounded group ">
                                <img
                                    //@ts-ignore
                                    src={image}
                                    className="rounded-full"
                                    style={{height: 41, width: 42}}
                                    alt=""
                                    loading="lazy"/>
                                <div
                                    className="absolute hidden top-full min-w-full w-max rounded group-hover:block mt-[-5px]">
                                    <ul className="text-left border bg-white rounded">
                                        <li className=" px-5 py-3 border-b ">
                                            <div
                                                className="block rounded-lg bg-white p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 mb-2">

                                                <Link href="/components/home-news/informationEmployees">
                                                    <h5 className="flex mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50

                                                hover:bg-secondary-100 active:bg-secondary-100 focus:outline-none focus:ring focus:ring-secondary-100 py-[0.20rem] px-[0.20rem] hover:rounded">
                                                        <img
                                                            //@ts-ignore
                                                            src={image}
                                                            className="rounded-full"
                                                            style={{height: 38, width: 39}}
                                                            alt=""
                                                            loading="lazy"/>
                                                        <span className="text-[20px] mt-1.5 px-3 ">{name}</span>
                                                    </h5>
                                                </Link>
                                                <hr className="border-t-2 border-solid border-b-gray-700 mb-1"/>

                                                <Link href="/components/layout-admin/LayoutAdmin"
                                                      className="flex hover:bg-secondary-100 active:bg-secondary-100 focus:outline-none focus:ring focus:ring-secondary-100 py-1.5 px-1.5 hover:rounded ">
                                                    <MdOutlineManageAccounts size={25} className="mt-0.5"/><h1
                                                    className="mt-1 px-2">Trang quản lý</h1>
                                                </Link>
                                            </div>
                                            <p className="flex px-3 py-3 hover:bg-secondary-100 active:bg-secondary-100 focus:outline-none focus:ring focus:ring-secondary-100  hover:rounded">
                                                <BiLogIn size={25} style={{color: "black"}} className="rounded-full"/>
                                                <Link href="/components/login/login" className="px-2"
                                                      onClick={() => LogOut()}>Đăng xuất</Link>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex mt-0 items-center lg:order-2">
                            <Link type="button" href="/components/login/login"
                                  className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow block`}>Đăng
                                nhập
                            </Link>
                        </div>
                    )}
                    <div className="flex items-center">
                        {mobileMenuOpen ? <AiOutlineCloseCircle onClick={() => {
                                setMobileMenuOpen(!mobileMenuOpen)
                            }} size={30} className="md:hidden block" style={{cursor: "pointer"}}/> :
                            <AiOutlineMenu onClick={() => {
                                setMobileMenuOpen(!mobileMenuOpen)
                            }} size={30} className="md:hidden block" style={{cursor: "pointer"}}/>
                        }
                    </div>
                    {/* Navigation links */}
                    <div
                        className="!visible hidden grow basis-[100%] justify-center items-center lg:!flex lg:basis-auto mt-0 lg:ml-32"
                        id="nava-Sbay" data-te-collapse-item="">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 md:bg">
                            <li>
                                <Link href="/"
                                      className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent
                                       lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700
                                        dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                                    Trang chủ</Link>
                            </li>
                            <li>
                                <Link href="/components/home-news/post_news"
                                      className="flex py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent
                                lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700
                                dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700
                                relative justify-center items-center rounded group">Tin tức
                                    <span className="">
                                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth={2} d="m1 1 4 4 4-4"/></svg></span>
                                    <div
                                        className="absolute hidden top-full min-w-full w-max rounded group-hover:block">
                                        <ul className="text-left border bg-white rounded ml-[-10px] w-[110%]">
                                            {typePosts.map((list, index) => (
                                                <li key={index} onClick={async () => {
                                                    // @ts-ignore
                                                    await GetListAllTypePostId(list.id)
                                                }} className="hover:text-danger-600 px-4 py-1 border-b"
                                                    // @ts-ignore
                                                ><Link href={`/components/home-news/post_news_type`}>{list.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                {(role == 'ROLE_EDITOR' || role == 'ROLE_ADMIN') ? (
                                    <Link href="/components/admin-management/manage-post"
                                          className="flex py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent
                                       lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700
                                       dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700
                                       relative justify-center items-center rounded group">Quản lý
                                        <span className="">
                                        <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth={2} d="m1 1 4 4 4-4"/></svg></span>
                                        <div
                                            className="absolute hidden top-full min-w-full w-max rounded group-hover:block">
                                            {role === 'ROLE_EDITOR' && (
                                                <ul className="text-left border bg-white rounded ml-32 ">
                                                    <li className="hover:text-danger-600 px-4 py-1 border-b">
                                                        <Link href="/components/admin-management/manage-typePost"
                                                              className="hover:text-danger-600  px-2 block">
                                                            Quản lý thể loại bài viết
                                                        </Link>
                                                    </li>
                                                </ul>)}
                                            {role === 'ROLE_ADMIN' && (
                                                <ul className="text-left border bg-white rounded ml-32 ">
                                                    <li className="hover:text-danger-600 px-4 py-1 border-b">
                                                        <Link href="/components/admin-management/manage-editor"
                                                              className="hover:text-danger-600  px-2 block">
                                                            Quản lý nhân viên
                                                        </Link>
                                                    </li>
                                                    <li className="hover:text-danger-600 px-4 py-1 border-b">
                                                        <Link href="/components/admin-management/manage-post"
                                                              className="hover:text-danger-600  px-2 block">
                                                            Quản lý bài viết
                                                        </Link>
                                                    </li>
                                                    <li className="hover:text-danger-600 px-4 py-1 border-b">
                                                        <Link href="/components/admin-management/manage-typePost"
                                                              className="hover:text-danger-600  px-2 block">
                                                            Quản lý thể loại bài viết
                                                        </Link>
                                                    </li>

                                                </ul>)
                                            }
                                        </div>
                                    </Link>
                                ) : ''}
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <div
            className={`md:hidden flex z-30 mt-[3.7%] flex-col w-[70%] h-screen fixed bg-neutral-300 text-white top-[60px]
             ${mobileMenuOpen ? `left-[0]` : `left-[-100%]`}`}>
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 md:bg">
                <li>
                    <Link href="/components/home-news/post_news"
                          onClick={() => {
                              handleModalOpen(true)
                          }}
                          className="block py-2 pr-4 pl-3 text-gray-800 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0
                          lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white
                           lg:dark:hover:bg-transparent dark:border-gray-700">
                        Trang chủ</Link>
                </li>
                <li>
                    <>
                        {/* Sidenav */}
                        <ul className="relative m-0 list-none px-[0.2rem]" data-te-sidenav-menu-ref="">
                            <li className="relative">
                                <a
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    style={{cursor: "pointer"}}
                                    className="flex py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:border-0 lg:hover:text-primary-700
                           lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700
                                      relative  items-center rounded group w-[101%]"
                                    data-te-sidenav-link-ref="">
                                    <span>Tin tức</span>
                                    <span
                                        className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-gray-600 dark:[&>svg]:text-gray-300"
                                        data-te-sidenav-rotate-icon-ref="">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"/></svg></span>
                                </a>
                                {menuOpen && (
                                    <ul className="text-left border bg-white rounded ml-[-10px] w-[104%]">
                                        {typePosts.map((list, index) => (
                                            <li

                                                key={index} onClick={async () => {
                                                // @ts-ignore
                                                await GetListAllTypePostId(list.id)
                                            }} className=" px-4 py-1 border-b"
                                                // @ts-ignore
                                            ><Link href={`/components/home-news/post_news_type`} onClick={() => {
                                                handleModalOpen(true)
                                            }}>
                                                <span className="text-black hover:text-danger-600">{
                                                    //@ts-ignore
                                                    list.name}</span></Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                            </li>
                            {(role === 'ROLE_EDITOR' || role === 'ROLE_ADMIN') && (
                                <li className="relative">
                                    <a
                                        onClick={() => setOpen(!open)}
                                        style={{cursor: "pointer"}}
                                        className="flex py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:border-0 lg:hover:text-primary-700
                           lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700
                                      relative  items-center rounded group w-[101%] "
                                        data-te-sidenav-link-ref="">
                                        <span>Quản lý</span>
                                        <span
                                            className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-gray-600 dark:[&>svg]:text-gray-300"
                                            data-te-sidenav-rotate-icon-ref=""><svg xmlns="http://www.w3.org/2000/svg"
                                                                                    viewBox="0 0 20 20"
                                                                                    fill="currentColor"
                                                                                    className="h-5 w-5"><path
                                            fillRule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                            clipRule="evenodd"/></svg></span>
                                    </a>
                                    {open && (
                                        <ul className="text-left border bg-white rounded ml-[-10px] w-[104%]">
                                            <li className="px-4 py-1 border-b">
                                                <Link href="/components/admin-management/manage-editor" onClick={() => {
                                                    handleModalOpen(true)
                                                }}>
                                                    <span
                                                        className="text-black hover:text-danger-600">Quản lý nhân viên</span>
                                                </Link>
                                            </li>
                                            <li className="px-4 py-1 border-b">
                                                <Link href="/components/admin-management/manage-post" onClick={() => {
                                                    handleModalOpen(true)
                                                }}>
                                                    <span
                                                        className="text-black hover:text-danger-600">Quản lý bài viết</span>
                                                </Link>
                                            </li>
                                            <li className=" px-4 py-1 border-b">
                                                <Link href="/components/admin-management/manage-typePost"
                                                      onClick={() => {
                                                          handleModalOpen(true)
                                                      }}>
                                                    <span className="text-black hover:text-danger-600">Quản lý thể loại bài viết</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                            )}
                        </ul>
                    </>
                </li>
            </ul>
        </div>
    </>


}