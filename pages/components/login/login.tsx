'use client'
import Link from "next/link";
import React, {useEffect} from "react";
import {Field, Form, Formik} from "formik";
import {loginForm} from "@/pages/service/userService";
import 'react-toastify/dist/ReactToastify.min.css';
import {useRouter} from "next/router";
import jwtDecode from "jwt-decode";
import {RotatingLines} from "react-loader-spinner";

export default function Login() {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push("/")
        }
    })
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 mt-10"
                     style={{backgroundImage: "url(/img/maybaylogin.jpg)", backgroundSize: "100vw"}}>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Đăng nhập tại đây
                            </h1>
                            <Formik initialValues={{
                                username: '',
                                password: ''
                            }} onSubmit={async (values) => {
                                const res = await loginForm(values)
                                const decode = jwtDecode(res)
                                if (decode) {
                                    //@ts-ignore
                                    await localStorage.setItem("sub", decode.sub)
                                    await localStorage.setItem("token", res)
                                    //@ts-ignore
                                    await localStorage.setItem("role", decode.role)
                                    //@ts-ignore
                                    await localStorage.setItem("name", decode.name)
                                    //@ts-ignore
                                    await localStorage.setItem("image", decode.image)
                                    await router.push("/components/home-news/post_news")
                                }

                            }}>
                                {({isSubmitting}) => (
                                    <Form className="space-y-4 md:space-y-6">
                                        <div>
                                            <label
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Tên tài khoản
                                            </label>
                                            <Field
                                                type="text"
                                                name="username"
                                                id="username"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Tên đăng nhập"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Mật khẩu
                                            </label>
                                            <Field
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="••••••••"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <Field
                                                        aria-describedby="remember"
                                                        type="checkbox"
                                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label
                                                        style={{cursor: "pointer"}}
                                                        className="text-gray-500 dark:text-gray-300"
                                                    >
                                                        Ghi nhớ đăng nhập
                                                    </label>
                                                </div>
                                            </div>
                                            <div>
                                            <Link
                                                href="#"
                                                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-danger-600"
                                                style={{textDecoration: "none"}}
                                            >
                                                Quên Mật khẩu
                                            </Link>
                                                <span className="dark:text-primary-500 text-primary-600">/</span>
                                                <Link
                                                    href="#"
                                                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-danger-600"
                                                    style={{textDecoration: "none"}}
                                                >
                                                    Tài khoản
                                                </Link>
                                            </div>
                                        </div>
                                        {isSubmitting ? (
                                            <div className="flex justify-center items-center "><RotatingLines
                                                strokeColor="grey"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                width="55"
                                                visible={true}/></div>) : (
                                            <button
                                                type="submit"
                                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            >
                                                Đăng nhập
                                            </button>
                                        )}
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Bạn vẫn chưa có tài khoản?{" "}
                                            <Link
                                                href="#"
                                                className="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-danger-600"
                                                style={{textDecoration: "none"}}
                                            >
                                                Đăng ký
                                            </Link>
                                        </p>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}