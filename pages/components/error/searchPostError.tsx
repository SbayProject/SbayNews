import Link from "next/link";
'use client'
export default function SearchPostError(){
return(
    <>
    <div>
        <h5 className="text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
         &nbsp;
        </h5>
        <hr className="text-black"/>
        <h5 className="mb-2 py-6 px-6 text-xl text-center font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            Không tìm thấy kết quả chứa nội dung của bạn tìm
        </h5>
        <hr className="text-black"/>
        <h5 className="text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            &nbsp;
        </h5>
    </div>
    </>
)
}