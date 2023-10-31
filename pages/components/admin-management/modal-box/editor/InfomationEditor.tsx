import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import {MdOutlineClose} from "react-icons/md";

interface InformationEditor {
    isOpen: boolean;
    onClose: () => void;
    onSave: (values: any) => void;
    editorToDetail: any;
}
// @ts-ignore
const DetailEditorModal: React.FC<InformationEditor> = ({
                                                            isOpen,
                                                            onClose,
                                                            editorToDetail,
                                                        }) => {
    Modal.setAppElement("#__next");

    const [avatarUrl, setAvatarUrl] = useState();

    useEffect(() => {
        if (editorToDetail) {
            console.log(editorToDetail)

            formik.setValues({
                name: editorToDetail?.name ||"",
                username: editorToDetail?.users?.username || "",
                email: editorToDetail?.email || "",
                gender: editorToDetail?.gender?.toString() || "",
                birthday: editorToDetail?.birthday || "",
                phoneNumber: editorToDetail?.phoneNumber || "",
                address: editorToDetail?.address || "",
                image: editorToDetail?.image || ""
            });

            // Set hình ảnh xem trước nếu có
            if (editorToDetail?.image) {
                setAvatarUrl(editorToDetail?.image);
            }
        }
    }, [editorToDetail]);
    const formik = useFormik({
        initialValues: {
            name: "",
            birthday: "",
            gender: "",
            phoneNumber: "",
            email: "",
            address: "",
            image: "",
            username: "",
        },onSubmit(){}})
    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel="Thông tin biên tập viên"
                overlayClassName="overlay"
                ariaHideApp={false}
            >
                <div
                    className="modal overflow-auto min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-white"
                >
                    <div
                        className="absolute py-3 px-6 bg-cover  bg-center opacity-80 inset-0 z-0"
                        style={{
                            backgroundImage: `url('/assets/defaut-img/bg-admin.jpg')`,
                        }}>
                        <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white">
                            <div
                                className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold"> Thông tin biên tập viên</h3>
                                <button className="modal-close" onClick={onClose}>
                                    <MdOutlineClose size="30"/>
                                </button>
                            </div>
                            <form>
                                <div className="p-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="mb-3 text-center ">
                                            <label
                                                htmlFor="image"
                                                className="text-center block text-sm font-medium text-gray-500 dark:text-gray-400"
                                            >
                                                Image
                                            </label>
                                            {avatarUrl && (
                                                <>
                                                    <img
                                                        src={avatarUrl}
                                                        alt="Loading..." className="mt-2 m-auto"
                                                    />
                                                </>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 gap-[1rem]">
                                            <div className="relative w-full md:h-auto">
                                                <input
                                                    type="text"
                                                    // name="username"
                                                    id="username"
                                                    className={`${formik.touched.username && formik.errors.username ? "text-red-500 border-red-500" : "dark:border-gray-600 border-gray-300"} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-dark  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `}
                                                    placeholder=""
                                                    readOnly
                                                    {...formik.getFieldProps("username")}
                                                />
                                                <label
                                                    htmlFor="username"
                                                    className={` ${formik.touched.username && formik.errors.username ? "text-red-500" : "text-gray-500 dark:text-gray-400"} peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 z-5 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                                >
                                                    {formik.touched.username && formik.errors.username ? formik.errors.username : "UserName"}
                                                </label>
                                            </div>
                                            <div className="relative w-full md:h-auto">
                                                <input
                                                    type="text"
                                                    // name="name"
                                                    id="name"
                                                    className={`${formik.touched.name && formik.errors.name ? "text-red-500 border-red-500" : "dark:border-gray-600 border-gray-300"} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-dark  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `}
                                                    placeholder=""
                                                    readOnly                                                     {...formik.getFieldProps("name")}
                                                />
                                                <label
                                                    htmlFor="name"
                                                    className={` ${formik.touched.name && formik.errors.name ? "text-red-500" : "text-gray-500 dark:text-gray-400"} peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 z-5 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                                >
                                                    {formik.touched.name && formik.errors.name ? formik.errors.name : "Name "}
                                                </label>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 md:gap-6">
                                        <div className="relative z-0 w-full mb-3 group">
                                            <input
                                                type="date"
                                                // name="birthday"
                                                id="birthday"
                                                max="2000-01-01"
                                                className={`${formik.touched.birthday && formik.errors.birthday ? "text-red-500 border-red-500" : "dark:border-gray-600 border-gray-300"} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-dark  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `}
                                                placeholder=""
                                                readOnly
                                                {...formik.getFieldProps("birthday")}
                                            />
                                            <label
                                                htmlFor="birthday"
                                                className={` ${formik.touched.birthday && formik.errors.birthday ? "text-red-500" : "text-gray-500 dark:text-gray-400"} peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                            >
                                                {formik.touched.birthday && formik.errors.birthday ? formik.errors.birthday : "Birthdays"}
                                            </label>
                                        </div>
                                        <div className="relative z-0 w-full mb-3 group">
                                            <select
                                                // name="gender"
                                                id="gender"
                                                className={`${formik.touched.gender && formik.errors.gender ? "text-red-500 border-red-500" : "dark:border-gray-600 border-gray-300"} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-dark  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `}
                                                placeholder=""
                                                // readOnly
                                                {...formik.getFieldProps("gender")}
                                            >
                                                {/*<option value="" defaultValue="">Lựa chọn</option>*/}
                                                <option value="0">Nam</option>
                                                <option value="1">Nữ</option>
                                            </select>
                                            <label
                                                htmlFor="gender"
                                                className={` ${formik.touched.gender && formik.errors.gender ? "text-red-500" : "text-gray-500 dark:text-gray-400"} peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                            >
                                                {formik.touched.gender && formik.errors.gender ? formik.errors.gender : "Gender (0 or 1)"}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 md:gap-6">
                                        <div className="relative z-0 w-full mb-3 group">
                                            <input
                                                type="tel"
                                                // name="phoneNumber"
                                                id="phoneNumber"
                                                className={`${formik.touched.phoneNumber && formik.errors.phoneNumber ? "text-red-500 border-red-500" : "dark:border-gray-600 border-gray-300"} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-dark  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `}
                                                placeholder=" "
                                                readOnly
                                                {...formik.getFieldProps("phoneNumber")}
                                            />
                                            <label
                                                htmlFor="phoneNumber"
                                                className={` ${formik.touched.phoneNumber && formik.errors.phoneNumber ? "text-red-500" : "text-gray-500 dark:text-gray-400"} peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                            >
                                                {formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber + " Vd: (098-456-7890)" : "Phone number (098-456-7890)"}
                                            </label>
                                        </div>
                                        <div className="relative z-0 w-full mb-3 group">
                                            <input
                                                type="email"
                                                // name="email"
                                                id="email"
                                                className={`${formik.touched.email && formik.errors.email ? "text-red-500 border-red-500" : "dark:border-gray-600 border-gray-300"} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-dark  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `}
                                                placeholder=" "
                                                readOnly
                                                {...formik.getFieldProps("email")}
                                            />
                                            <label
                                                htmlFor="email"
                                                className={` ${formik.touched.email && formik.errors.email ? "text-red-500" : "text-gray-500 dark:text-gray-400"} peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                            >
                                                {formik.touched.email && formik.errors.email ? formik.errors.email : "Email (sbay@sbay.com)"}
                                            </label>
                                        </div>

                                    </div>
                                    <div className="grid md:grid-cols-1 md:gap-6">
                                        <div className="relative z-0 w-full mb-3 group">
                                            <input
                                                type="text"
                                                // name="address"
                                                id="address"
                                                className={`${formik.touched.address && formik.errors.address ? "text-red-500 border-red-500" : "dark:border-gray-600 border-gray-300"} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-dark  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `}
                                                placeholder=" "
                                                readOnly
                                                {...formik.getFieldProps("address")}
                                            />
                                            <label
                                                htmlFor="address"
                                                className={` ${formik.touched.address && formik.errors.address ? "text-red-500" : "text-gray-500 dark:text-gray-400"} peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                            >
                                                {formik.touched.address && formik.errors.address ? formik.errors.address : "Address (03 Đinh Thị Hoà, Q. Sơn Trà, TP Đà Nẵng)"}
                                            </label>
                                        </div>
                                    </div>
                                    {/*footer*/}

                                    <div
                                        className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase p-[0.2rem] py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={onClose}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DetailEditorModal;
