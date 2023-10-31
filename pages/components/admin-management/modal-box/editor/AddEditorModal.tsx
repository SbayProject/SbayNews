import React, {useState} from "react";
import Modal from "react-modal";
import {useFormik} from "formik";
import * as Yup from "yup";
import {differenceInYears, parseISO} from "date-fns";
import {BiHide, BiShowAlt} from "react-icons/bi";
import * as AdminEditorService from "../../../../service/adminEditorService";
import {storage} from "../../../../../firebase";
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import LoadingHidden from "../../../hooks/LoadingHidden";
import * as Swal from "sweetalert2";
import Toast from "../../../hooks/Toast";
import {MdOutlineClose} from "react-icons/md";

interface EditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

const AddEditorModal: React.FC<EditorModalProps> = ({
                                                        isOpen,
                                                        onClose,
                                                    }) => {
    Modal.setAppElement("#__next");

    const [firebaseImg, setImg] = useState(null);
    const [avatar, setAvatarFile] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string>("");
    const [showPassword, setShowPassword] = useState(true);

    const handleFileSelect = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFile: React.Dispatch<React.SetStateAction<File | null>>,
        setFileUrl: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    const handleFileUpload = async () => {
        return new Promise<string | undefined>((resolve, reject) => {
            const file = avatar;
            if (!file) return reject("No file selected");

            const getUniqueName = () => {
                return `sbay_news_topvn_${Date.now()}_${Math.random() * 1000}`;
            };

            const newName = getUniqueName() + "_" + file?.name;
            const storageRef = ref(storage, `files/${newName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    console.log(`Upload progress: ${progress}%`);
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadURL);
                }
            );
        });
    };

    const handleRemoveImage = () => {
        setImg(null);
        setAvatarFile(null);
    };

    const handleAvatarFileSelect = (event: any) => {
        handleFileSelect(event, setAvatarFile, setAvatarUrl);
    };

    const handleAvatarFileUpload = async () => {
        return handleFileUpload();
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            birthday: "",
            gender: "",
            phoneNumber: "",
            email: "",
            address: "",
            image: "",
            repeatPassword: "",
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username không được để trống"),
            email: Yup.string().email("Invalid email address").required("Email không được để trống"),
            password: Yup.string().required("Password không được để trống"),
            repeatPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords không trùng khớp'),
            gender: Yup.string().required("Gender không được để trống"),
            birthday: Yup.string()
                .required("Birthday không được để trống")
                .test("is-over-18", "Must be over 18 years old", (value) => {
                    const birthDate = parseISO(value);
                    const currentDate = new Date();
                    const age = differenceInYears(currentDate, birthDate);
                    return age >= 18;
                }),
            phoneNumber: Yup.string()
                .matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, 'Nhập đúng định dạng SDT VD: 098XXXXXXX (X là chữ số)')
                .required("Phone number không được để trống"),
            address: Yup.string().required("Address không được để trống"),
        }),
        onSubmit: async (values, {resetForm}) => {
            await LoadingHidden(null,null,onClose);
            const avatarUp = await handleAvatarFileUpload()
            let newEditor = {
                ...values,
                users: {"username": values.username, "password": values.password},
                "image": avatarUp,
                "gender": parseInt(values.gender)
            };
            const handleSaveModal = async () => {
                try {
                    await AdminEditorService.createEditor(newEditor);
                } catch (error) {
                    console.error(error);
                }
            };
            handleSaveModal();
            resetForm();
            // @ts-ignore
            Swal.close();
            Toast.fire({
                icon: 'success',
                title: `Thêm mới nhân viên ${newEditor.name} thành công!`
            })
            onClose();
        }
    });

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel="Thêm mới biên tập viên"
                overlayClassName="overlay"
                ariaHideApp={false}
            >
                <div
                    className="modal overflow-auto min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-white bg-fixed"
                >
                    <div
                        className="absolute py-3 px-6 bg-cover  bg-center opacity-80 inset-0 z-0"
                        style={{
                            backgroundImage: `url('/assets/defaut-img/bg-admin.jpg')`,
                        }}>
                        <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white">
                            <div
                                className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold">Thêm mới biên tập viên</h3>
                                <button className="modal-close" onClick={onClose}>
                                    <MdOutlineClose size="30"/>
                                </button>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="p-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="mb-3 text-center ">
                                            <label
                                                htmlFor="image"
                                                className="text-center block text-sm font-medium text-gray-500 dark:text-gray-400"
                                            >
                                                Image
                                            </label>
                                            <input
                                                type="file"
                                                name="image"
                                                id="image"
                                                accept="image/*"
                                                className="hidden m-auto"
                                                onChange={(event) => {
                                                    handleAvatarFileSelect(event);
                                                }}
                                            />
                                            {avatar && (
                                                <>
                                                    <img src={URL.createObjectURL(avatar)} alt="Loading..."
                                                         className="mt-2 m-auto"
                                                         style={{maxWidth: 150}}/>
                                                    <button
                                                        className="ext-center mt-2 text-sm text-red-500 cursor-pointer"
                                                        onClick={handleRemoveImage}
                                                    >
                                                        Xóa ảnh
                                                    </button>
                                                </>
                                            )}
                                            {!avatar && (
                                                <>
                                                    <img src="\assets\defaut-img\human.png" alt="Loading..."
                                                         className="mt-2 m-auto"
                                                         style={{maxWidth: 150}}/>
                                                    <label
                                                        htmlFor="image"
                                                        className="mt-2 cursor-pointer text-blue-500 underline"
                                                    >
                                                        Chọn ảnh
                                                    </label>
                                                </>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 gap-[1rem]">
                                            <div className="relative w-full md:h-auto">
                                                <input
                                                    type="text"
                                                    // name="usernameInput"
                                                    id="usernameInput"
                                                    className={`${formik.touched.username && formik.errors.username ? "text-red-500 border-red-500" : "dark:border-gray-600 border-gray-300"} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-dark  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `}
                                                    placeholder="Nhập tên tài khoản đăng nhập"
                                                    required
                                                    {...formik.getFieldProps("usernameInput")}
                                                />
                                                <label
                                                    htmlFor="usernameInput"
                                                    className={` ${formik.touched.username && formik.errors.username ? "text-red-500" : "text-gray-500 dark:text-gray-400"} peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 z-5 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                                >
                                                    {formik.touched.username && formik.errors.username ? formik.errors.username : "UserName"}
                                                </label>
                                            </div>
                                            <div className="relative w-full md:h-auto">
                                                <input
                                                    type="text"
                                                    // name="name"
                                                    id="name123"
                                                    className={`${formik.touched.name && formik.errors.name ? "text-red-500 border-red-500" : "dark:border-gray-600 border-gray-300"} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-dark  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `}
                                                    placeholder="Nhập họ và tên"
                                                    required
                                                    {...formik.getFieldProps("name")}
                                                />
                                                <label
                                                    htmlFor="name123"
                                                    className={` ${formik.touched.name && formik.errors.name ? "text-red-500" : "text-gray-500 dark:text-gray-400"} peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 z-5 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                                >
                                                    {formik.touched.name && formik.errors.name ? formik.errors.name : "Name "}
                                                </label>
                                            </div>
                                            <div className="relative z-0 w-full mb-3 group">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    // name="password"
                                                    id="password"
                                                    className={`${formik.touched.password && formik.errors.password ? "text-red-500 border-red-500" : "dark:border-gray-600 border-gray-300"} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-dark  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `}

                                                    placeholder="Nhập mật khẩu"
                                                    required
                                                    {...formik.getFieldProps("password")}
                                                />
                                                <label
                                                    htmlFor="password"
                                                    className={` ${formik.touched.password && formik.errors.password ? "text-red-500" : "text-gray-500 dark:text-gray-400"} peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                                >
                                                    {formik.touched.password && formik.errors.password ? formik.errors.password : "Password"}
                                                </label>
                                                <button
                                                    type="button"
                                                    className="absolute top-3 right-0 px-2 py-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <BiHide size="20" style={{marginTop: "-1.75px"}}/> :
                                                        <BiShowAlt size="20" style={{marginTop: "-1.75px"}}/>}
                                                </button>
                                            </div>

                                            <div className="relative z-0 w-full mb-3 group">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    // name="repeatPassword"
                                                    id="repeatPassword"
                                                    className={`${formik.touched.repeatPassword && formik.errors.repeatPassword ? "text-red-500 border-red-500" : "dark:border-gray-600 border-gray-300"} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-dark  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `}

                                                    placeholder="Xác nhận mật khẩu"
                                                    required
                                                    {...formik.getFieldProps("repeatPassword")}
                                                />
                                                <label
                                                    htmlFor="repeatPassword"
                                                    className={` ${formik.touched.repeatPassword && formik.errors.repeatPassword ? "text-red-500" : "text-gray-500 dark:text-gray-400"} peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                                >
                                                    {formik.touched.repeatPassword && formik.errors.repeatPassword ? formik.errors.repeatPassword : "Confirm Password"}
                                                </label>
                                                <button
                                                    type="button"
                                                    className="absolute top-3 right-0 px-2 py-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <BiHide size="20" style={{marginTop: "-1.75px"}}/> :
                                                        <BiShowAlt size="20" style={{marginTop: "-1.75px"}}/>}
                                                </button>
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
                                                required
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
                                                required
                                                {...formik.getFieldProps("gender")}
                                            >
                                                <option value="" defaultValue="">Lựa chọn</option>
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
                                                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                                                // name="phoneNumber"
                                                id="phoneNumber"
                                                className={`${formik.touched.phoneNumber && formik.errors.phoneNumber ? "text-red-500 border-red-500" : "dark:border-gray-600 border-gray-300"} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-dark  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `}
                                                placeholder=" "
                                                required
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
                                                required
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
                                                required
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
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Add new Editor
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

export default AddEditorModal;
