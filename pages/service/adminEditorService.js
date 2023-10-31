import axios from "axios";
export const findAllEditors = async (name, page) =>{
    const token = localStorage.getItem('token')
    const result = await axios.get(`http://localhost:8080/api/editor?name=${name}&page=${page}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).catch((err)=>{
            console.log(err)
        })
    return result.data
}

export const remove = async (editor) =>{
    const token = localStorage.getItem('token')
    await axios.patch(`http://localhost:8080/api/editor/deleteEditor`,editor,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}
export const detailEditor = async (id) =>{
    const token = localStorage.getItem('token')
    const result = await axios.get(`http://localhost:8080/api/editor/detail/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    return result.data
}

export const updateEditor = async (editor) =>{
    const token = localStorage.getItem('token')
    await axios.patch(`http://localhost:8080/api/editor/updateEditor/`,{...editor},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
}

export const informationEditor = async () =>{
    const token = localStorage.getItem('token')
    const result = await axios.get(`http://localhost:8080/api/editor/information`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    return result.data
}

export const createEditor = async (newEditor) => {
    const token = localStorage.getItem('token')
    await axios.post(`http://localhost:8080/api/editor/createEditor`,newEditor,
         {
             headers: {
                 Authorization: `Bearer ${token}`,
             }
         })

}