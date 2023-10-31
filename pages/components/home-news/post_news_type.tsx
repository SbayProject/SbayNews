'use client'
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import {ListGetAllTypePost, ListGetTypePostSearch} from "@/pages/service/typePostService";
import SearchPostError from "@/pages/components/error/searchPostError";
import {useContext} from 'react';
import CounterContext from "@/pages/components/reactContext/context";
import ImageNav from "@/pages/components/layout-view/imageNav";
import {LoadingPost} from "@/pages/components/loading/loadingPost";
import {Button} from "@material-tailwind/react";
import {RotatingLines} from "react-loader-spinner";
import {FaCircleChevronUp} from "react-icons/fa6";
import {AiOutlineSearch} from "react-icons/ai";

export default function NavCard() {
    const [typePost, setTypePost] = useState([]);
    const [title, setTitle] = useState('');
    const {counter, setCounter} = useContext(CounterContext);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState();
    const [button, setButton] = useState(false);

    const GetAllListPost = async () => {
        // @ts-ignore
        if (counter && counter[0] && counter[0].typePost?.id && title) {
            // @ts-ignore
            const res = await ListGetTypePostSearch(counter[0]?.typePost?.id, title, 0);
            setCounter(res.content)
            setTotalPage(res.totalPages)
        } else {
        }
    }
    //@ts-ignore
    const loadMore = async (page) => {
        setButton(true)
        await new Promise((resolve) => setTimeout(resolve, 300))
        //@ts-ignore
        const res = await ListGetTypePostSearch(counter[0]?.typePost?.id, title, page);
        setCounter(res.content);
        setTotalPage(res.totalPages)
        //@ts-ignore
        setPage((prevState) => prevState + 1)
        //@ts-ignore
        setCounter(() => [...counter, ...res.content])
        setButton(false)
    }
    // @ts-ignore
    const GetAllListTypePost = async () => {
        const res = await ListGetAllTypePost("");
        setTypePost(res);
    }
    useEffect(() => {
        GetAllListPost();
    }, [title])

    useEffect(() => {
        GetAllListTypePost();
    }, [])

    const scrollTop = () => {
        // @ts-ignore
        document.getElementById('myBtn').addEventListener('click', function () {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }
    useEffect(() => {
        window.onscroll = function () {
            scrollFunction()
        };
    })

    const scrollFunction = () => {
        const top = document.getElementById("myBtn");
        if (top) {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                top.style.display = "block";
            } else {
                top.style.display = "none";
            }
        }
    }
    if (!typePost) {
        return null;
    }
    if (!counter) {
        return null;
    }
    // @ts-ignore
    return (
        <>
            <ImageNav/>
            <>
                {(counter == 0 && title == '') ? (<LoadingPost/>) : (
                    <>
                        <nav
                            className="container  flex w-full flex-wrap items-center justify-between  bg-neutral-100 py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4"
                            style={{maxWidth: "100%"}}>
                            <div className="flex w-full flex-wrap items-center justify-between px-3">
                    <span
                        className="text-neutral-500 transition duration-200 hover:text-neutral-600 hover:ease-in-out motion-reduce:transition-none dark:text-neutral-200">
                       <Link href="/components/home-news/post_news" className="hover:text-danger-600"
                             style={{cursor: "pointer"}}>Trang chủ/ </Link><Link href="/components/home-news/post_news"
                                                                                 className="hover:text-danger-600"
                        //@ts-ignore
                                                                                 style={{cursor: "pointer"}}>Tin tức/ </Link>
                        <Link href="/components/home-news/post_news"
                              className="hover:text-danger-600"
                            //@ts-ignore
                              style={{cursor: "pointer"}}>{counter[0]?.typePost?.name
                        }</Link>
                    </span>
                                <Formik
                                    initialValues={{
                                        title: '',
                                    }}
                                    onSubmit={async (values) => {
                                        const searchPostType = async () => {
                                            // @ts-ignore
                                            setTitle(values.title.trim());
                                            // @ts-ignore
                                            const res = await ListGetTypePostSearch(counter[0]?.typePost?.id, values.title, 0);
                                            if (await res == undefined) {
                                                await GetAllListPost()
                                            } else {
                                                setCounter(res.content)
                                                setPage(() => 0)
                                            }
                                        }
                                        searchPostType()
                                    }}>
                                    <Form
                                        className="flex w-[22%] items-center justify-between text-neutral-500 transition duration-200 hover:text-neutral-600 hover:ease-in-out motion-reduce:transition-none dark:text-neutral-200">
                                        <Field
                                            type="search"
                                            className="relative block w-[12vw] min-w-0 flex-auto rounded-lg border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none motion-reduce:transition-none dark:border-neutral-500 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                                            placeholder="Tên bài viết"
                                            name="title"
                                            aria-label="Search"
                                            aria-describedby="basic-addon2"
                                        />
                                        <div>
                                            <button
                                                className="bg-white rounded-lg hover:bg-gray-100 text-gray-800 font-semibold  py-[0.25rem] ml-3 px-3 border border-gray-400 shadow">
                                                <AiOutlineSearch size={25}/>
                                            </button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </nav>
                        {counter == 0 ? <SearchPostError/> : (
                            <div className="mt-5 container mb-12" style={{maxWidth: "100%"}}>
                                <div className="grid-cols-1 sm:grid md:grid-cols-4 ">
                                    {//@ts-ignore
                                        counter.map((list, index) => (
                                            <div key={index}
                                                 className="mx-3 mt-5 md:mb-10 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0"
                                                // @ts-ignore
                                            ><Link href={`/components/home-news/${list.id}`}>
                                                <img
                                                    className="rounded-t-lg md:h-44"
                                                    style={{width: "100%"}}
                                                    // @ts-ignore
                                                    src={list.image}
                                                    alt=""
                                                />
                                            </Link>
                                                <div className="p-6">
                                                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50"
                                                        // @ts-ignore
                                                    >{list.title}
                                                    </h5>
                                                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200"
                                                       style={{
                                                           overflow: 'hidden',
                                                           whiteSpace: 'nowrap',
                                                           textOverflow: 'ellipsis'
                                                       }}
                                                        // @ts-ignore
                                                    >{list.content}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                {button == true ? <div className="flex justify-center mt-5"><RotatingLines
                                    strokeColor="grey"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="55"
                                    visible={true}
                                /></div> : (
                                    <div className="text-center">
                                        {//@ts-ignore
                                            page === totalPage - 1 ? ('') : (
                                                <Button onClick={() => loadMore(page + 1)}
                                                        className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded mt-5">
                                                    Xem thêm các tin tức
                                                </Button>
                                            )}
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}

            </>
            <button onClick={() => scrollTop()} id="myBtn" className="text-red-600 " style={{
                display: "none",
                position: "fixed",
                bottom: 20,
                right: 20,
                zIndex: 99,
                cursor: "pointer",
            }}>
                <FaCircleChevronUp size={40} style={{marginTop: "-3%"}}/>
            </button>
        </>
    )
}