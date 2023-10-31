
import Image from "next/image";
import {AiOutlineMail, AiOutlinePhone} from "react-icons/ai";
import {BsArrowRight, BsFacebook} from "react-icons/bs";
import Link from "next/link";
import Logo_Header from "../../../public/img/logo-sbay-header.png";

export default function Footer() {
    return (
        <>
            {/* Footer container */}
            <footer
                className="container bg-neutral-200 text-center text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 lg:text-left"
                style={{maxWidth: "100%"}}>
                <div className="mx-6 py-10 text-center md:text-left">
                    <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="">
                            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                                <Image src={Logo_Header} alt=""/>
                            </h6>
                            <Link href="#" className="flex mb-3 hover:text-red-700">
                                <AiOutlineMail size={20} style={{marginTop: "0.9px"}}/>&nbsp;
                                <span className="text-danger-600">Email</span>: hanhchinh.sbay@gmail.com
                            </Link>
                            <p className="flex mb-3">
                                <AiOutlinePhone size={20} style={{marginTop: "0.5px"}}/>&nbsp;
                                <span className="text-danger-600">Tel</span>: 0973 20 1200
                            </p>
                            <Link href="https://www.facebook.com/SbayVietNam247"
                               className="flex mb-3 hover:text-red-700">
                                <BsFacebook size={20} style={{marginTop: "0.5px"}}/>&nbsp;
                                <span className="text-danger-600">Face Book</span>: Sbay Việt Nam
                            </Link>
                        </div>

                        <div className="">
                            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                                Thông tin cần biết
                            </h6>
                            <p className="mb-3">
                                <Link href="#!"
                                   className="flex text-neutral-600 dark:text-neutral-200 hover:text-red-700">
                                    <BsArrowRight style={{marginTop: "3px"}}/>&nbsp;
                                    Hướng dẫn đặt phòng
                                </Link>
                            </p>
                            <p className="mb-3">
                                <Link href="#!"
                                   className="flex text-neutral-600 dark:text-neutral-200 hover:text-red-700">
                                    <BsArrowRight style={{marginTop: "3px"}}/>&nbsp;
                                    Hướng dẫn thanh toán
                                </Link>
                            </p>
                            <p className="mb-3">
                                <Link href="#!"
                                   className="flex text-neutral-600 dark:text-neutral-200 hover:text-red-700">
                                    <BsArrowRight style={{marginTop: "3px"}}/>&nbsp;
                                    Hướng dẫn giao vé
                                </Link>
                            </p>
                            <p className="mb-3">
                                <Link href="#!"
                                   className="flex text-neutral-600 dark:text-neutral-200 hover:text-red-700">
                                    <BsArrowRight style={{marginTop: "3px"}}/>&nbsp;
                                    Chính sách bảo mật
                                </Link>
                            </p>
                            <p className="mb-3">
                                <Link href="#!"
                                   className="flex text-neutral-600 dark:text-neutral-200 hover:text-red-700">
                                    <BsArrowRight style={{marginTop: "3px"}}/>&nbsp;
                                    Điều khoảng điều kiện
                                </Link>
                            </p>
                        </div>

                        <div className="">
                            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                                Về chúng tôi
                            </h6>
                            <p className="mb-3">
                                <Link href="#!"
                                   className="flex text-neutral-600 dark:text-neutral-200 hover:text-red-700">
                                    <BsArrowRight style={{marginTop: "3px"}}/>&nbsp;
                                    Trang chủ
                                </Link>
                            </p>
                            <p className="mb-3">
                                <Link href="#!"
                                   className="flex text-neutral-600 dark:text-neutral-200 hover:text-red-700">
                                    <BsArrowRight style={{marginTop: "3px"}}/>&nbsp;
                                    Giới thiệu
                                </Link>
                            </p>

                            <p className="mb-3">
                                <Link href="/components/home-news/post_news"
                                   className="flex text-neutral-600 dark:text-neutral-200 hover:text-red-700">
                                    <BsArrowRight style={{marginTop: "3px"}}/>&nbsp;
                                    Tin tức
                                </Link>
                            </p>
                            <p className="mb-3">
                                <Link href="#!"
                                   className="flex text-neutral-600 dark:text-neutral-200 hover:text-red-700">
                                    <BsArrowRight style={{marginTop: "3px"}}/>&nbsp;
                                    Tin khuyến mãi
                                </Link>
                            </p>
                            <p className="md-3">
                                <Link href="#!"
                                   className="flex text-neutral-600 dark:text-neutral-200 hover:text-red-700">
                                    <BsArrowRight  style={{marginTop: "3px"}}/>&nbsp;
                                    Liên hệ
                                </Link>
                            </p>
                        </div>
                        <div>
                            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                                Các chi nhánh chính của Sbay
                            </h6>
                            <div className="mb-3">
                                <p className="text-danger-600 mb-1 flex items-center justify-center md:justify-start">
                                    📍 Hà Nội:
                                </p>
                                <Link href="#" className="hover:text-danger-600">
                                    <span className=""><span className="text-blue-500">Văn phòng giao dịch</span>: Số A3012, Tòa nhà Tứ Hiệp Plaza - KĐT Pháp Vân - Tp Hà Nội</span>
                                </Link>
                            </div>
                            <div className="mb-3">

                                <p className="text-danger-600 mb-1 flex items-center justify-center md:justify-start">
                                    📍 Đà Nẵng:
                                </p>
                                <Link href="#" className="hover:text-danger-600">
                                    <span className="">Khách sạn 3* Sbay hotel Đà Nẵng: Số 3 - Đinh Thị Hoà - Q. Sơn Trà - Tp Đà Nẵng</span>
                                </Link>
                            </div>
                            <div>
                                <p className="text-danger-600 mb-1 flex items-center justify-center md:justify-start">
                                    📍Hồ Chí Minh:
                                </p>
                                <Link href="#" className="hover:text-danger-600">
                                    <span className=""><span className="text-blue-500">Văn phòng giao dịch</span>: Số 42/112 đường Tây Hoà - TP Thủ Đức - Tp Hồ Chí Minh</span>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
                {/*Copyright section*/}

            </footer>
            <div className="bg-neutral-300 p-6 text-center dark:bg-neutral-700">
                <Link className="hover:text-danger-600 font-semibold text-neutral-600 dark:text-neutral-400"
                   href="https://sbay.com.vn/tin-tuc">© 2023 Sbay Việt Nam. </Link>
                <span style={{cursor:"default"}}>All Rights Reserved</span>
            </div>
        </>
    )
}