'use client'
import React, {useEffect, useState} from "react";
import {findByUserNameEditors} from "@/pages/service/editorsService";
import {LoadingEditors} from "@/pages/components/loading/loadingEditors";

export default function InformationEditors() {
    const [info, setInfo] = useState();
    const findByEditors = async () => {
        const res = await findByUserNameEditors();
        setInfo(res)
    }
    useEffect(() => {
        findByEditors()
    },[])

    if (info == null) {
        return (<LoadingEditors/>)
    }
    return (
        <>
            <div  className=" bg-secondary-100 ">
                <div className="lg:flex block py-40 lg:px-20 px-10">

                    <div  className="lg:ml-44">
                        <h1 className="text-3xl lg:mt-[10%] mt-[-10%] font-bold lg:text-center text-center">Thông
                            tin cá
                            nhân</h1>
                        <div className="mt-4 flex justify-center ">
                            <img className="rounded-full prose-img:container"
                                 src={
                                     //@ts-ignore
                                     info?.image}
                            />
                        </div>
                    </div>
                    <div
                        className="lg:mt-14 mt-5 lg:ml-40 block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 lg:w-[45%]">
                        <div
                            className="border-t-2 border-neutral-100  dark:border-neutral-600 dark:text-neutral-50">
                            <h5 className="ml-2.5 text-[1.085rem]  text-start px-0.5 py-0.5 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                Họ và tên
                            </h5>
                            <p className="ml-3 mt-[-4px] text-start text-base text-neutral-600 dark:text-neutral-200">
                                {
                                    //@ts-ignore
                                    info?.name}
                            </p>
                        </div>
                        <div
                            className="border-t-2 border-neutral-100  dark:border-neutral-600 dark:text-neutral-50">
                            <h5 className="ml-2.5 text-[1.085rem] text-start px-0.5 py-0.5 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                Ngày sinh
                            </h5>
                            <p className="ml-3 mt-[-4px] text-start text-base text-neutral-600 dark:text-neutral-200">
                                {
                                    //@ts-ignore
                                    info?.birthday
                                }
                            </p>
                        </div>
                        <div
                            className="border-t-2 border-neutral-100  dark:border-neutral-600 dark:text-neutral-50">
                            <h5 className="ml-2.5 text-[1.085rem] text-start px-0.5 py-0.5 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                Giới tính
                            </h5>
                            <p className="ml-3 mt-[-4px] text-start text-base text-neutral-600 dark:text-neutral-200">
                                {
                                    //@ts-ignore
                                    info?.gender === 0 ? "Nữ" : "Nam"
                                }
                            </p>
                        </div>
                        <div
                            className="border-t-2 border-neutral-100  dark:border-neutral-600 dark:text-neutral-50">
                            <h5 className="ml-2.5 text-[1.085rem] text-start px-0.5 py-0.5 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                Số điện thoại
                            </h5>
                            <p className="ml-3 mt-[-4px] text-start text-base text-neutral-600 dark:text-neutral-200">
                                {
                                    //@ts-ignore
                                    info?.phoneNumber
                                        .replace(
                                            /(\d{3})(\d{3})(\d{4})/,
                                            "($1) $2-$3"
                                        )
                                }
                            </p>
                        </div>
                        <div
                            className="border-t-2 border-neutral-100  dark:border-neutral-600 dark:text-neutral-50">
                            <h5 className="ml-2.5 text-[1.085rem] text-start px-0.5 py-0.5 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                Email
                            </h5>
                            <p className="ml-3 mt-[-4px] text-start text-base text-neutral-600 dark:text-neutral-200">
                                {
                                    //@ts-ignore
                                    info?.email
                                }
                            </p>
                        </div>
                        <div
                            className="border-t-2 border-neutral-100  dark:border-neutral-600 dark:text-neutral-50">
                            <h5 className="ml-2.5 text-[1.085rem] text-start px-0.5 py-0.5 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                Địa chỉ
                            </h5>
                            <p className="ml-3 mt-[-4px] text-start text-base text-neutral-600 dark:text-neutral-200">
                                {
                                    //@ts-ignore
                                    info?.address
                                }
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}