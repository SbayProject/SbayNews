import React, {useEffect, useState} from "react";
import * as AdminTypePostService from "../../service/adminTypePostService";
import ReactPaginate from "react-paginate";
import {BiSolidEdit} from "react-icons/bi";
import {MdPersonAddAlt} from "react-icons/md";
import Swal from "sweetalert2";
import fire from "sweetalert2";
import * as Alert from "../../components/hooks/Alert";
import {RiDeleteBin6Line} from "react-icons/ri";
import LoadingHidden from "../hooks/LoadingHidden";
import {Field, Form, Formik} from "formik";
import LayoutAdmin from "../layout-admin/LayoutAdmin";

export interface TypePost {
    id: number;
    name: string;
}

// @ts-ignore
const ManageTypePost = () => {
    const [typePosts, setTypePosts] = useState<TypePost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentItems, setCurrentItems] = useState<TypePost[]>([]);
    const [typePostEdit, setTypePostEdit] = useState("");
    const [newType, setNewType] = useState("");
    const [editMode, setEditMode] = useState<number | null>(null);
    const itemsPerPage = 5;

    useEffect(() => {
        document.title = "Quản lý thể loại bài viết"; // Thay đổi title
        window.scrollTo(0, 0);
        fetchData("");
    }, []);

    const loadCurrentPageData = (page: number) => {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsToDisplay = typePosts.slice(startIndex, endIndex);
        setCurrentItems(itemsToDisplay);
    };

    const fetchData = async (name: string) => {
        try {
            const response = await AdminTypePostService.findAllTypePosts(name);
            setTypePosts(response);
            setIsLoading(false);
            const totalPages = Math.ceil(response.length / itemsPerPage);
            setTotalPages(totalPages);
            setCurrentPage(0);
            loadCurrentPageData(0);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (typePosts.length > 0) {
            const totalPages = Math.ceil(typePosts.length / itemsPerPage);
            setTotalPages(totalPages);
            loadCurrentPageData(currentPage);
        }
    }, [typePosts, currentPage]);

    const handleDeleteUser = async (data: any) => {
        try {
            await AdminTypePostService.remove(data);
            Swal.fire({
                icon: "success",
                title: "Xóa thành công !",
                timer: 3000,
            });
            fetchData("");
        } catch (error) {
            console.error(error);
        }
    };

    const handlePageClick = async (selectedPage: any) => {
        loadCurrentPageData(selectedPage.selected);
        setCurrentPage(selectedPage.selected);
    };

    const handleEdit = (index: number) => {
        setEditMode(index);
        setTypePostEdit(currentItems[index]?.name);
    };

    const handleSaveEdit = async (data: any, index: number) => {
        try {
            await LoadingHidden(null, null, null);
            await AdminTypePostService.updateTypePost({name: data, id: currentItems[index]?.id});
            Swal.fire({
                icon: "success",
                title: "Cập nhật thành công !",
                timer: 3000,
            });
            setTypePostEdit("");
            setEditMode(null);
            await fetchData("");
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelEdit = () => {
        setEditMode(null);
        setTypePostEdit("");
    };

    const handleAddType = async () => {
        try {
            await LoadingHidden(null, null, null);
            await AdminTypePostService.createTypePosts({name: newType});
            await Swal.fire({
                icon: "success",
                title: "Thêm mới thành công !",
                timer: 3000,
            });
            setNewType("");
            await fetchData("");
        } catch (error) {
            console.error(error);
        }
    };

    // @ts-ignore
    const calculateSerialNumber = (pageIndex, itemIndex, itemsPerPage) => {
        return pageIndex * itemsPerPage + itemIndex + 1;
    };

    return (
        <LayoutAdmin>
            <div className="bg-white p-6 shadow-md">
                <h2 className="text-2xl uppercase font-semibold mb-4">
                    Quản lý thể loại bài viết
                </h2>
                <div className="flex justify-between items-center mb-4">
                    <div></div>
                    <div className="flex items-center w-150vw md:w-full">
                        <input
                            type="text"
                            required
                            pattern="^[A-Z][a-zA-Z0-9]*$"
                            className="w-full py-2 px-3 leading-none rounded-lg border border-solid border-neutral-300 bg-clip-padding text-neutral-700 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Điền tên thể loại muốn thêm"
                            value={newType}
                            onChange={(e) => setNewType(e.target.value)}
                        />
                        <button
                            className="flex bg-pink-500 text-white active:bg-pink-600 font-bold uppercase whitespace-nowrap text-sm text-wap px-4 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ml-2 ease-linear transition-all duration-150"
                            onClick={handleAddType}
                            type="button"
                        >
                            <MdPersonAddAlt size="20"/> Thêm mới thể loại
                        </button>
                    </div>


                </div>
                <div>
                    <Formik
                        initialValues={{
                            name: "",
                        }}
                        onSubmit={async (values) => {
                            const searchEditor = async () => {
                                const res = await AdminTypePostService.findAllTypePosts(
                                    values.name
                                );
                                setTypePosts(res);
                            };
                            await searchEditor();
                        }}>
                        <Form
                            className="flex  w-2/5 items-center justify-between text-neutral-500 transition duration-200 hover:text-neutral-600 hover:ease-in-out motion-reduce:transition-none dark:text-neutral-200">
                            <Field
                                type="search"
                                className="relative mr-3 block min-w-[25vw] flex-auto rounded-lg border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none motion-reduce:transition-none dark:border-neutral-500 dark:text-neutral-500 dark:placeholder:text-neutral-500 dark:focus:border-primary"
                                placeholder="Tên thể loại bài viết"
                                name="name"
                            />
                            <div>
                                <button
                                    type="submit"
                                    className="bg-white rounded-lg border border-gray-500 hover:bg-gray-700 text-black-800 font-semibold  py-[0.25rem] ml-3 px-3 border border-darker border-dark-400 shadow"
                                >
                                            <span
                                                className="input-group-text flex items-center whitespace-nowrap rounded  py-0.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-600"
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
                </div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-center text-black-500 dark:text-black-400">
                                <thead className="text-xs text-black-700 uppercase dark:text-black-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        STT
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tên thể loại
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Thao tác
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentItems?.map((data, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-400"
                                    >
                                        <td
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap `dark:text-black`"
                                        >
                                            {calculateSerialNumber(currentPage, index, itemsPerPage)}
                                        </td>
                                        <td
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                                        >
                                            {editMode === index ? (
                                                <div className="flex items-center">
                                                    <input
                                                        type="text"
                                                        className="w-full py-2 px-3 leading-none rounded-lg border border-solid border-neutral-300 bg-clip-padding text-neutral-700 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                                                        value={typePostEdit}
                                                        defaultValue={data?.name}
                                                        onChange={(e) => setTypePostEdit(e.target.value)}
                                                    />
                                                    <button
                                                        className="bg-green-500 text-white font-bold px-3 py-1 rounded-full hover:bg-green-700 mr-2"
                                                        onClick={() => handleSaveEdit(typePostEdit, index)}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="bg-red-500 text-white font-bold px-3 py-1 rounded-full hover:bg-red-700"
                                                        onClick={handleCancelEdit}
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            ) : (
                                                data.name
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {editMode === index ? null : (
                                                <>
                                                    <button
                                                        type="button"
                                                        id="editt"
                                                        className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                                                        onClick={() => handleEdit(index)}
                                                    >
                                                        <BiSolidEdit size="20"/>
                                                    </button>
                                                    <button
                                                        id="deleeete"
                                                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                                                        onClick={() =>
                                                            Alert.swalWithBootstrapButtons.fire({
                                                                icon: "warning",
                                                                title: "Xác nhận xóa",
                                                                html: `Bạn có muốn xoá bài viết <span style="color: red">${data.name}</span> không?`,
                                                                showCancelButton: true,
                                                                cancelButtonText: "Không",
                                                                confirmButtonText: "Có",
                                                                reverseButtons: true,
                                                            }).then((res) => {
                                                                if (res.isConfirmed) {
                                                                    handleDeleteUser(data);
                                                                }
                                                            })
                                                        }
                                                    >
                                                        <RiDeleteBin6Line size="20"/>
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="flex justify-center mt-4 mb-4">
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel=">"
                                    onPageChange={handlePageClick}
                                    pageCount={totalPages}
                                    pageRangeDisplayed={itemsPerPage}
                                    marginPagesDisplayed={1}
                                    previousLabel="<"
                                    containerClassName="pagination flex space-x-2"
                                    pageLinkClassName={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-rose-500 transition-colors duration-300 hover:bg-rose-500 hover:text-white
                                    `}
                                    nextLinkClassName={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-rose-500 text-white bg-rose-500 transition-colors duration-300 hover:bg-white hover:text-rose-500 
                                    `}
                                    previousLinkClassName={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-rose-500 text-white bg-rose-500 transition-colors duration-300 hover:bg-white hover:text-rose-500 
                                    `}
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

export default ManageTypePost;
