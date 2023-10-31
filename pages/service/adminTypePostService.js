import axios from "axios";
export const findAllTypePosts = async (name) =>{
    const token = localStorage.getItem('token')
    const result = await axios.get(`http://localhost:8080/api/typePost?name=${name}`
           ).catch((err)=>{
            console.log(err)
        })
    return result.data
}

export const remove = async (typePost) =>{
    const token = localStorage.getItem('token')
    await axios.patch(`http://localhost:8080/api/typePost/deleteTypePost`,typePost,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const updateTypePost = async (typePost) =>{
    const token = localStorage.getItem('token')
    await axios.patch(`http://localhost:8080/api/typePost/updateTypePost`,typePost,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}
export const createTypePosts = async (newTypePost) => {
    const token = localStorage.getItem('token')
    await axios.post(`http://localhost:8080/api/typePost/createTypePost`,newTypePost,
         {
             headers: {
                 Authorization: `Bearer ${token}`,
             }
         })

}