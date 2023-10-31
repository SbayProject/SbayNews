'use client'
import Link from "next/link";
import React, {useEffect, useState} from "react";
import moment from "moment/moment";
import {useRouter} from "next/router";
import {FcCalendar} from "react-icons/fc";
import {DetailPost, ListGetAllTop4NewPost} from "@/pages/service/postService";
import {ListGetTheSameKind} from "@/pages/service/typePostService";
import ImageNav from "@/pages/components/layout-view/imageNav";
import {FaCircleChevronUp} from "react-icons/fa6";
// @ts-ignore
import ReactHtmlParser from 'react-html-parser';
import {LoadingIdPost} from "@/pages/components/loading/loadingIdPost";

export default function IdPost() {
    const [newPost, setNewPost] = useState([]);
    const [newPostType, setNewPostType] = useState([]);
    const [detail, setDetail] = useState();
    const router = useRouter();
    const {idPost} = router.query;
    const GetListAllTop4NewPost = async () => {
        const res = await ListGetAllTop4NewPost();
        setNewPost(res)
    }
    // @ts-ignore
    const GetListTheSameKind = async (id) => {
        const res = await ListGetTheSameKind(id);
        setNewPostType(res)
    }
    const PostDetail = async () => {
        const res = await DetailPost(idPost)
        await GetListTheSameKind(res?.typePost.id)
        setDetail(res)
    }
    useEffect(() => {
        GetListAllTop4NewPost()
        PostDetail()
    }, [idPost])
    const scrollTop = () => {
        // @ts-ignore
        document.getElementById('myBtn').addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
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
    useEffect(() => {
        window.onscroll = function () {
            scrollFunction()
        };
    })

    if (!newPost) {
        return null;
    }
    return (
        <>
            <ImageNav/>
            {!detail?(<LoadingIdPost/>):(<>
                <nav
                    className="container flex w-full flex-wrap items-center justify-between bg-neutral-100 py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4"
                    style={{maxWidth: "100%"}}>
                    <div className="flex w-full flex-wrap items-center justify-between px-3">
                    <span
                        className=" text-neutral-500 transition duration-200  motion-reduce:transition-none dark:text-neutral-200"
                    ><Link href="/components/home-news/post_news" className="hover:text-danger-600"
                           style={{cursor: "pointer"}}>Trang chủ/ </Link><Link href="/components/home-news/post_news"
                                                                               className="hover:text-danger-600"
                        // @ts-ignore
                                                                               style={{cursor: "pointer"}}>Tin tức/ </Link>
                        <span
                            className="hover:text-danger-600"
                            // @ts-ignore
                            style={{cursor: "pointer"}}>{detail.typePost.name}/ </span>
                        <span
                            className="hover:text-danger-600" style={{cursor: "pointer"}}
                            // @ts-ignore
                        >{detail.title}</span>
                    </span>
                    </div>
                </nav>
                <div className="container grid grid-cols-3 gap- bg-neutral-100 mt-3 " style={{maxWidth: "100%"}}>

                    <div className="ml-3 mt-5">
                        <p className="justify-center text-neutral-600 dark:text-neutral-200">
                            <div className="flex"><FcCalendar size={20}
                                // @ts-ignore
                                                              style={{marginTop: "0.9px"}}/>&nbsp;{detail?.createDate === "" ? "" : moment(detail?.createDate, 'YYYY/MM/DD').format('DD-MM-YYYY')}
                            </div>
                            <hr/>
                        </p>
                        <div>
                            <h6 className="mt-2 text-[22px]">Một số bài viết cùng thể loại</h6>
                            {newPostType.map((list, index) => (
                                // @ts-ignore
                                <Link key={index} href={`/components/home-news/${list.id}`}
                                      className="flex mr-3 mb-5 flex-col items-center mt-4 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                    <img
                                        className="object-cover md:h-40 w-[12rem] rounded-t-lg md:rounded-none md:rounded-l-lg"
                                        // @ts-ignore
                                        src={list.image}
                                        alt=""
                                    />
                                    <div className="flex flex-col justify-between p-4 leading-normal">
                                        <h5 className="mb-2 text-[18px] font-bold tracking-tight text-gray-900 dark:text-white"
                                            // @ts-ignore
                                        >{list.title}
                                        </h5>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-2 mb-4  mt-5 border-2 container">
                        <h1 className="flex text-neutral-900 mt-4 dark:text-neutral-200 text-4xl"
                            // @ts-ignore
                        >{detail.title}
                        </h1>
                        <div className="mt-6">
                            <p className="mb-4">
                                <article
                                    className="mt-5 prose max-w-none prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600 text-left text-justify"
                                    // @ts-ignore
                                >{ReactHtmlParser(detail.content)}
                                </article>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 container  bg-neutral-100" style={{maxWidth: "100%"}}>
                    <h6 className="ml-3 py-6 flex justify-center font-semibold uppercase md:justify-start text-2xl">
                        CÁC BÀI VIẾT CÓ LIÊN QUAN
                    </h6>
                    <div className="grid-cols-1 sm:grid md:grid-cols-4 ">
                        {newPost.map((list, index) => (
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
                </div>
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
            </>)}

        </>
    )
}