import React, {useEffect, useState} from "react";
import LayoutAdmin from "../../components/layout-admin/LayoutAdmin";
import {Field, Form, Formik} from "formik";
import moment from "moment";
import * as AdminPostService from "../../service/adminPostService";
import Swal, { SweetAlertOptions } from "sweetalert2";
import {MdPersonAddAlt} from "react-icons/md";
import {BiSolidEdit} from "react-icons/bi";
import {RiDeleteBin6Line} from "react-icons/ri";
import {SlInfo} from "react-icons/sl";
import * as Alert from "../../components/hooks/Alert";
import AddPostModal from "./modal-box/post/AddPostModal";
import ReactPaginate from "react-paginate";
import EditPostModal from "./modal-box/post/EditPostModal";
import {TypePost} from "./manage-typePost";
import DetailEditorModal from "@/pages/components/admin-management/modal-box/editor/InfomationEditor";
import DetailPostModal from "@/pages/components/admin-management/modal-box/post/DetailPostIs";

export interface Post {
    id:number;
    name:string;
    title:string;
    page:number;
    createDate: string;
    public: boolean;
}

const ManagePost = () => {
    const [posts, setPost] = useState<Post[]>([]);
    const [typePosts, setTypePost] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [size, setSize] = useState(0)
    let count = currentPage * size + 1;
    const [prevDisabled, setPrevDisabled] = useState(true);
    const [nextDisabled, setNextDisabled] = useState(true);
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [postId, setPostId] = useState(0)
    const [postToModal, setPostToModal] = useState<Post>()

    const openAddModal = () => {
        setShowModal(true);
    };

    const closeAddModal = () => {
        setShowModal(false);
        findAllListPost({type: "", title: "", page: 0});
    };
    const openEditModal = () => {
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        findAllListPost({type: "", title: "", page: currentPage});
    };
    const openDetailModal = () => {
        setShowDetailModal(true);
        console.log(showDetailModal)
    };

    const closeDetailModal = () => {
        setShowDetailModal(false);
        console.log("close")
    };

    const toggleStatus = async (postStatus:any) => {
        try {
            await AdminPostService.browsePost(postStatus);
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
        findAllListPost({type: "", title: "", page: 0});
    };
    useEffect(() => {
        document.title = "Quản lý bài viết"; // Thay đổi title

        window.scrollTo(0, 0)
    }, []);

    const findAllTypePost = async (name:string) => {
        const result = await AdminPostService.typePost("");
        setTypePost(result?.data);
        setIsLoading(false);
    };
    const findAllListPost = async ({type,title,page}:{ type: string, title:string, page: number }) => {
        const result = await AdminPostService.findAllPosts(type, title, page);
        setPost(result.content);
        setIsLoading(false);
        setCurrentPage(result.number);
        setIsLoading(false);
        const totalPages = result.totalPages;
        setPageCount(totalPages);
        setSize(result.size)

    };
    useEffect(() => {
        findAllListPost({type: "", title: "", page: currentPage});
        findAllTypePost("");
    }, []);

    const handlePageClick = async ({selected}:any) => {
        setCurrentPage(selected);
        await findAllListPost({type: "", title: "", page: selected});
        setPrevDisabled(selected === 0);
        setNextDisabled(selected >= pageCount - 1);
    };

    const handleDeletePost = async (posts:any) => {
        try {
            await AdminPostService.remove(posts);
            const swalOptions: SweetAlertOptions = {
                icon: "success",
                title: "Xóa thành công !",
                timer: 3000,
            };
            await Swal.fire(swalOptions);
            await findAllListPost({type:"",title: "", page: 0});
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditPost = async (postId:number) =>{
        setPostId(postId);
        openEditModal();
    }
    const handleDetailPost = async (post:any) =>{
        setPostToModal(post);
        openDetailModal();
    }


    return (
        <LayoutAdmin>
            <div>
                <AddPostModal
                    isOpen={showModal}
                    onClose={closeAddModal}
                    typePost={typePosts}
                    onSave={closeAddModal}
                />
                <EditPostModal
                    isOpen={showEditModal}
                    onClose={closeEditModal}
                    postId={postId}
                    typePost={typePosts}
                    onSave={closeEditModal}
                />
                <DetailPostModal
                    isOpen={showDetailModal}
                    onClose={closeDetailModal}
                    post={postToModal}/>
            </div>
            <div className="bg-white p-6 shadow-md">
                <span className="uppercase text-2xl font-semibold mb-4">Quản lý bài viết</span>
                <div className="flex justify-end">
                    <button
                        className="flex bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-4 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-2 ease-linear transition-all duration-150"
                        onClick={openAddModal}
                        type="button"
                    >
                        <MdPersonAddAlt size="20"/> Thêm mới bài viết
                    </button>
                </div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                            <Formik
                                initialValues={{
                                    title: "",
                                    type: "",
                                }}
                                onSubmit={async (values) => {
                                    const searchPost = async () => {
                                        setTitle(values.title);
                                        setType(values.type);
                                        const res = await AdminPostService.findAllPosts(
                                            values.type,
                                            values.title,
                                            0
                                        );
                                        setPost(res.content);
                                        setPageCount(res.totalPages);
                                    };
                                    await searchPost();
                                }}
                            >
                                <Form
                                    className="flex  w-2/5 items-center justify-between text-neutral-500 transition duration-200 hover:text-neutral-600 hover:ease-in-out motion-reduce:transition-none dark:text-neutral-200">
                                    <Field
                                        type="search"
                                        className="relative mr-3 block min-w-[25vw] flex-auto rounded-lg border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none motion-reduce:transition-none dark:border-neutral-500 dark:text-neutral-500 dark:placeholder:text-neutral-500 dark:focus:border-primary"
                                        placeholder="Tên bài viết"
                                        name="title"
                                    />
                                    <Field
                                        style={{cursor: "pointer"}}
                                        as="select"
                                        name="type"
                                        className=" border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[12vw]  py-[0.43rem] hover:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="">Chọn Thể Loại</option>
                                        {typePosts?.map((list:TypePost, index) => (
                                            <option key={index} value={list?.name}>
                                                {list?.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <div>
                                        <button
                                            type="submit"
                                            className="bg-white rounded-lg border border-gray-500 hover:bg-gray-700 text-black-800 font-semibold  py-[0.25rem] ml-3 px-3 border border-darker border-dark-400 shadow"
                                        >
                      <span
                          className="input-group-text flex items-center whitespace-nowrap lg:whitespace-nowrap rounded  py-0.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-600"
                          id="basic-addon2"
                      >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5"
                        >
                          <path
                              fillRule="evenodd"
                              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                              clipRule="evenodd"
                          />
                        </svg>
                      </span>
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                            <table className="md-flex mt-3 w-full text-sm text-center text-black-500 dark:text-black-400">
                                <thead className="text-xs text-black-700 uppercase dark:text-black-400">
                                <tr>
                                    <th scope="col" className="px-3 py-1">
                                        STT
                                    </th>
                                    <th scope="col" className="px-3 py-1">
                                        Tiêu đề
                                    </th>
                                    <th scope="col" className="px-3 py-1">
                                        Ngày đăng
                                    </th>
                                    <th scope="col" className="px-3 py-1">
                                        Trạng thái
                                    </th>
                                    <th scope="col" className="px-3 py-1">
                                        Thao tác
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {posts.length <= 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-4 text-red-500">
                                            Không tìm thấy nội dung bạn nhập. Vui lòng nhập lại.
                                        </td>
                                    </tr>
                                ) : (
                                    posts?.map((post, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-400"
                                    >
                                        <td
                                            scope="row"
                                            className="w-[50px] px-6 py-4 font-medium text-gray-900 whitespace-nowrap lg:whitespace-nowrap `dark:text-black`"
                                        >
                                            {count++}
                                        </td>
                                        <td
                                            scope="row"
                                            className="w-[150px] px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap lg:whitespace-nowrap dark:text-black"
                                        >
                                            {post.title}
                                        </td>
                                        <td
                                            scope="row"
                                            className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap lg:whitespace-nowrap dark:text-black"
                                        >
                                            {moment(post.createDate, "YYYY/MM/DD HH:mm:ss").format(
                                                'DD/MM/YYYY- HH[giờ], mm[phút]'
                                            )}
                                        </td>

                                        <td
                                            scope="row"
                                            className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap lg:whitespace-nowrap dark:text-black"
                                        >
                                            {post.public ? (
                                                <button
                                                    className={`center px-4 py-2 bg-green-500 text-white text-center rounded hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300`}
                                                >
                                                    Đã duyệt
                                                </button>
                                            ) : (
                                                <button
                                                    className={`center px-4 py-2 bg-red-500 text-white text-center rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300`}
                                                    onClick={() =>
                                                        Alert.swalWithBootstrapButtons
                                                            .fire({
                                                                icon: "warning",
                                                                title: "Xác nhận duyệt",
                                                                html: `Bài viết <span style="color: red">${post.title}</span> không?`,
                                                                showCancelButton: true,
                                                                cancelButtonText: "Không",
                                                                confirmButtonText: "Có",
                                                                reverseButtons: true,
                                                            })
                                                            .then((res) => {
                                                                if (res.isConfirmed) {
                                                                    toggleStatus(post);
                                                                    Swal.fire({
                                                                        icon: "success",
                                                                        title: "Duyệt thành công !",
                                                                        timer: 2000,
                                                                    });
                                                                }
                                                            })
                                                    }
                                                >
                                                    Duyệt bài viết
                                                </button>
                                            )}
                                        </td>

                                        <td className="px-6 py-4">
                                            <button
                                                className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                                                onClick={() => handleDetailPost(post)}
                                            >
                                                <SlInfo size="20"/>
                                            </button>
                                            <button
                                                type="button"
                                                className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                                                onClick={() => handleEditPost(post.id)}
                                            >
                                                <BiSolidEdit size="20"/>
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded-md mr-2"
                                                onClick={
                                                    () => Alert.swalWithBootstrapButtons.fire({
                                                        icon: "warning",
                                                        title: "Xác nhận xóa",
                                                        html: `Bạn có muốn xoá bài viết <span style="color: red">${post.title}</span> không?`,
                                                        showCancelButton: true,
                                                        cancelButtonText: 'Không',
                                                        confirmButtonText: 'Có',
                                                        reverseButtons: true
                                                    }).then((res) => {
                                                        if (res.isConfirmed) {
                                                            handleDeletePost(post)
                                                        }
                                                    })
                                                }
                                            >
                                                <RiDeleteBin6Line size="20"/>
                                            </button>
                                        </td>
                                    </tr>
                                )))}
                                </tbody>

                            </table>
                            <div className="flex justify-center mt-4 mb-4">
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel=">"
                                    onPageChange={handlePageClick}
                                    pageCount={pageCount}
                                    previousLabel="<"
                                    containerClassName="pagination flex space-x-2"
                                    pageLinkClassName={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-rose-500 transition-colors duration-300 hover:bg-rose-500 hover:text-white ${
                                        currentPage === 0 ? '' : 'disabled:opacity-50'
                                    }`}
                                    nextLinkClassName={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-rose-500 text-white bg-rose-500 transition-colors duration-300 hover:bg-white hover:text-rose-500 ${
                                        nextDisabled ? 'disabled:opacity-50' : ''
                                    }`}
                                    previousLinkClassName={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-rose-500 text-white bg-rose-500 transition-colors duration-300 hover:bg-white hover:text-rose-500 ${
                                        prevDisabled ? 'disabled:opacity-50' : ''
                                    }`}
                                    activeClassName={`relative: text-white bg-rose-500 rounded-full w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight border-rose-500`}
                                    disabledClassName="d-none"

                                />
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </LayoutAdmin>
    );
};

export default ManagePost;
