// import React, { createContext, useContext, useState } from "react";
//
// // Tạo một context mới
// const UserContext = createContext([]);
//
// // Tạo một custom hook để sử dụng context
// export const useUserContext = () => {
//   return useContext(UserContext);
// };
//
// export const UserProvider = ({ children }) => {
//   // Định nghĩa state và các hàm cần thiết ở đây
//   const [userInfo, setUserInfo] = useState({
//     username: "",
//     img: "",
//     name: "",
//     phone: "",
//     gender: "",
//     address: "",
//     email: "",
//     createDate: "",
//   });
//
//   const updateUser = (newUserInfo) => {
//     setUserInfo({ ...userInfo, ...newUserInfo });
//   };
//
//   // Trả về Provider với thông tin và hàm cập nhật
//   return (
//     <UserContext.Provider value={{ userInfo, updateUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
