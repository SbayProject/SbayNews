import axios from "axios";

export const findByUserNameEditors = async () => {
    const token = localStorage.getItem('token');
    await new Promise((resolve) => setTimeout(resolve, 200))
    try {
        const res = await axios.get(`http://localhost:8080/api/editor/information`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        return res.data
    } catch (e) {

    }
}