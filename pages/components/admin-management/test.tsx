// import React, { useEffect, useState } from "react";
// import Layout from "../layout-admin/LayoutTest";
// import * as AdminTypePostService from "../../service/adminTypePostService";
// import { Field, Form, Formik } from "formik";
// import ReactPaginate from "react-paginate";
// import AddTypePostModal from "./modal-box/type-post/AddTypePost";
// import EditTypePostModal from "./modal-box/type-post/EditTypePost";
// import { BiSolidEdit } from "react-icons/bi";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { MdPersonAddAlt } from "react-icons/md";
// import * as Swal from "sweetalert2";
// import * as Alert from "../hooks/Alert";
//
// const ManageTypePost = () => {
//     const [typePosts, setTypePost] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [totalPages, setTotalPages] = useState(0);
//     const [currentItems, setCurrentItems] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [typePostEdit, setTypePostEdit] = useState(null);
//     const [newType, setNewType] = useState(""); // For adding new type
//     const itemsPerPage = 5;
//
//     const openAddModal = () => {
//         setShowModal(true);
//     };
//
//     const closeAddModal = () => {
//         setShowModal(false);
//         fetchData("");
//     };
//     const openEditModal = () => {
//         setShowEditModal(true);
//     };
//
//     const closeEditModal = () => {
//         setShowEditModal(false);
//         fetchData("");
//     };
//
//     useEffect(() => {
//         document.title = "Quản lý loại bài viết"; // Thay đổi title
//         window.scrollTo(0, 0);
//         fetchData();
//     }, []);
//
//     const loadCurrentPageData = (page) => {
//         return new Promise((resolve) => {
//             const startIndex = page * itemsPerPage;
//             const endIndex = startIndex + itemsPerPage;
//             const itemsToDisplay = typePosts.slice(startIndex, endIndex);
//             setCurrentItems(itemsToDisplay);
//             resolve();
//         });
//     };
//
//     const fetchData = async () => {
//         try {
//             const response = await AdminTypePostService.findAllTypePosts("");
//             setTypePost(response);
//             setIsLoading(false);
//             const totalPages = Math.ceil(response.length / itemsPerPage);
//             setTotalPages(totalPages);
//             setCurrentPage(0);
//             loadCurrentPageData(0);
//         } catch (error) {
//             console.error(error);
//         }
//     };
//
//     useEffect(() => {
//         const totalPages = Math.ceil(typePosts?.length / itemsPerPage);
//         setTotalPages(totalPages);
//         loadCurrentPageData(currentPage);
//     }, [currentPage]);
//
//     const handleDeleteUser = async (data) => {
//         try {
//             await AdminTypePostService.remove(data);
//             Swal.fire({
//                 icon: "success",
//                 title: "Xóa thành công !",
//                 timer: 3000,
//             });
//             await fetchData();
//         } catch (error) {
//             console.error(error);
//         }
//     };
//
//     const handlePageClick = async (selectedPage) => {
//         await loadCurrentPageData(selectedPage.selected);
//         setCurrentPage(0);
//     };
//
//     const handleEdit = async (data) => {
//         setTypePostEdit(data);
//         openEditModal();
//     };
//
//     const handleUpdateType = async (data) => {
//         try {
//             await AdminTypePostService.update(data);
//             Swal.fire({
//                 icon: "success",
//                 title: "Cập nhật thành công !",
//                 timer: 3000,
//             });
//             setTypePostEdit(null);
//             await fetchData();
//         } catch (error) {
//             console.error(error);
//         }
//     };
//
//     const handleAddType = async () => {
//         try {
//             await AdminTypePostService.add({ name: newType });
//             Swal.fire({
//                 icon: "success",
//                 title: "Thêm mới thành công !",
//                 timer: 3000,
//             });
//             setNewType("");
//             await fetchData();
//         } catch (error) {
//             console.error(error);
//         }
//     };
//
//     return (
//         <Layout>
//             <AddTypePostModal isOpen={showModal} onClose={closeAddModal} />
//             <EditTypePostModal
//                 isOpen={showEditModal}
//                 onClose={closeEditModal}
//                 typePost={typePostEdit}
//                 onUpdate={handleUpdateType}
//             />
//             <div className="bg-white p-6 shadow-md">
//                 <h2 className="text-2xl uppercase font-semibold mb-4">
//                     Quản lý thể loại bài viết
//                 </h2>
//                 <div className="flex justify-between items-center mb-4">
//                     <div>
//                         <button
//                             className="flex bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-4 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-2 ease-linear transition-all duration-150"
//                             onClick={openAddModal}
//                             type="button"
//                         >
//                             <MdPersonAddAlt size="20" /> Thêm mới thể loại bài viết
//                         </button>
//                     </div>
//                     <div className="relative w-48">
//                         <input
//                             type="text"
//                             className="w-full py-2 px-3 pr-10 leading-none rounded-lg border border-solid border-neutral-300 bg-clip-padding text-neutral-700 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="Thêm thể loại mới"
//                             value={newType}
//                             onChange={(e) => setNewType(e.target.value)}
//                         />
//                         <button
//                             className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white font-bold px-3 py-1 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
//                             onClick={handleAddType}
//                         >
//                             Thêm
//                         </button>
//                     </div>
//                 </div>
//                 {isLoading ? (
//                     <p>Loading...</p>
//                 ) : (
//                     <div>
//                         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//                             <Formik
//                                 initialValues={{
//                                     name: "",
//                                 }}
//                                 onSubmit={async (values) => {
//                                     const searchEditor = async () => {
//                                         const res = await AdminTypePostService.findAllTypePosts(
//                                             values.name
//                                         );
//                                         setTypePost(res);
//                                     };
//                                     await searchEditor();
//                                 }}
//                             >
//                                 <Form
//                                     className="flex  w-2/5 items-center justify-between text-neutral-500 transition duration-200 hover:text-neutral-600 hover:ease-in-out motion-reduce:transition-none dark:text-neutral-200">
//                                     <Field
//                                         type="search"
//                                         className="relative mr-3 block min-w-[25vw] flex-auto rounded-lg border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none motion-reduce:transition-none dark:border-neutral-500 dark:text-neutral-500 dark:placeholder:text-neutral-500 dark:focus:border-primary"
//                                         placeholder="Tên thể loại bài viết"
//                                         name="name"
//                                     />
//                                     <div>
//                                         <button
//                                             type="submit"
//                                             className="bg-white rounded-lg border border-gray-500 hover:bg-gray-700 text-black-800 font-semibold  py-[0.25rem] ml-3 px-3 border border-darker border-dark-400 shadow"
//                                         >
//                         <span
//                             className="input-group-text flex items-center whitespace-nowrap rounded  py-0.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-600"
//                             id="basic-addon2"
//                         >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                             className="h-5 w-5"
//                         >
//                           <path
//                               fillRule="evenodd"
//                               d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
//                               clipRule="evenodd"
//                           />
//                         </svg>
//                       </span>
//                                         </button>
//                                     </div>
//                                 </Form>
//                             </Formik>
//                             <table className="w-full text-sm text-center text-black-500 dark:text-black-400">
//                                 <thead className="text-xs text-black-700 uppercase dark:text-black-400">
//                                 <tr>
//                                     <th scope="col" className="px-6 py-3">
//                                         STT
//                                     </th>
//                                     <th scope="col" className="px-6 py-3">
//                                         Tên thể loại
//                                     </th>
//                                     <th scope="col" className="px-6 py-3">
//                                         Thao tác
//                                     </th>
//                                 </tr>
//                                 </thead>
//                                 <tbody>
//                                 {currentItems?.map((data, index) => (
//                                     <tr
//                                         key={index}
//                                         className="bg-white border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-400"
//                                     >
//                                         <td
//                                             scope="row"
//                                             className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap `dark:text-black`"
//                                         >
//                                             {index + 1}
//                                         </td>
//                                         <td
//                                             scope="row"
//                                             className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
//                                         >
//                                             {data.name}
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             <button
//                                                 type="button"
//                                                 className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
//                                                 onClick={() => handleEdit(data)}
//                                             >
//                                                 <BiSolidEdit size="20"/>
//                                             </button>
//                                             <button
//                                                 className="bg-red-500 text-white px-2 py-1 rounded-md mr-2"
//                                                 onClick={
//                                                     () => Alert.swalWithBootstrapButtons.fire({
//                                                         icon: "warning",
//                                                         title: "Xác nhận xóa",
//                                                         html: `Bạn có muốn xoá bài viết <span style="color: red">${data.name}</span> không?`,
//                                                         showCancelButton: true,
//                                                         cancelButtonText: 'Không',
//                                                         confirmButtonText: 'Có',
//                                                         reverseButtons: true
//                                                     }).then((res) => {
//                                                         if (res.isConfirmed) {
//                                                             handleDeleteUser(data)
//                                                         }
//                                                     })
//                                                 }
//                                             >
//                                                 <RiDeleteBin6Line size="20"/>
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                                 </tbody>
//                             </table>
//                             <div className="flex justify-center mt-4 mb-4">
//                                 <ReactPaginate
//                                     breakLabel="..."
//                                     nextLabel=">"
//                                     onPageChange={handlePageClick}
//                                     pageCount={totalPages}
//                                     pageRangeDisplayed={itemsPerPage}
//                                     marginPagesDisplayed={1}
//                                     previousLabel="<"
//                                     containerClassName="pagination flex space-x-2"
//                                     pageLinkClassName={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-rose-500 text-rose-500 transition-colors duration-300 hover:bg-rose-500 hover:text-white
//                                 `}
//                                     nextLinkClassName={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-rose-500 text-white bg-rose-500 transition-colors duration-300 hover:bg-white hover:text-rose-500
//                                 `}
//                                     previousLinkClassName={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-rose-500 text-white bg-rose-500 transition-colors duration-300 hover:bg-white hover:text-rose-500
//                                 `}
//                                     activeClassName="active:bg-white active:text-rose-500"
//                                     disabledClassName="d-none"
//                                 />
//
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </Layout>
//     );
// };
//
// export default ManageTypePost;
