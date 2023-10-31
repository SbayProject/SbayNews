import axios from "axios";
import {toast} from "react-toastify";
import {async} from "@firebase/util";
//@ts-ignore
export const loginForm = async (values) => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const res = await axios.post('http://localhost:8080/api/user/authenticate', values)
        return res.data
    } catch (e) {
        //@ts-ignore
        return toast.error(e.response.data)
    }
}
