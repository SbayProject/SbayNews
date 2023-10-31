// import React, {useEffect, useState} from "react";
// import ReactPaginate from "react-paginate";
//
// interface PageList {
//     dataList: any;
//     itemsPerPage:any
// }
//
// const PaginatedList:React.FC<PageList>  = ({ dataList, itemsPerPage }) => {
//     const [currentPage, setCurrentPage] = useState(0);
//     const [totalPages, setTotalPages] = useState(0);
//     const [currentItems, setCurrentItems] = useState([]);
//     console.log(dataList,itemsPerPage)
//     useEffect(() => {
//         const totalPages = Math.ceil(dataList?.length / itemsPerPage);
//         setTotalPages(totalPages);
//         loadCurrentPageData(currentPage);
//     }, [currentPage]);
//
//     const loadCurrentPageData = (page) => {
//         const startIndex = page * itemsPerPage;
//         const endIndex = startIndex + itemsPerPage;
//         const itemsToDisplay = dataList?.slice(startIndex, endIndex);
//         setCurrentItems(itemsToDisplay);
//     };
//
//     const handlePageClick = (selectedPage) => {
//         setCurrentPage(selectedPage.selected);
//     };
//
//     return (
//         <div>
//             <ul>
//                 {currentItems?.map((item) => (
//                     <li key={item.id}>{item.name}</li>
//                 ))}
//             </ul>
//             <div className="flex justify-center mt-4 mb-4">
//                 <ReactPaginate
//                     pageCount={totalPages}
//                     pageRangeDisplayed={3}
//                     marginPagesDisplayed={1}
//                     onPageChange={handlePageClick}
//                     containerClassName="pagination flex space-x-2"
//                     pageLinkClassName={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-rose-500 text-rose-500 transition-colors duration-300 hover:bg-rose-500 hover:text-white
//                     `}
//                     nextLinkClassName={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-rose-500 text-white bg-rose-500 transition-colors duration-300 hover:bg-white hover:text-rose-500
//                     `}
//                     previousLinkClassName={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-rose-500 text-white bg-rose-500 transition-colors duration-300 hover:bg-white hover:text-rose-500
//                     `}
//                     activeClassName="active:bg-white active:text-rose-500"
//                     disabledClassName="d-none"
//                 />
//             </div>
//         </div>
//     );
// };
//
// export default PaginatedList;