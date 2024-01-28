// userActions.ts
import { AppDispatch } from "../store";
import {
    loginUser as loginUserAction, registerUser as registerUserAction,
    setError as setErrorAction,
    logoutUser as logoutUserAction,
} from "../reducer/userReducer";
import axios from "axios";
import { User } from "../types/types";

const serverUrl = "http://localhost:5173";

interface LoginData {
    email: string;
    password: string;
    name?: string
    avatar?:File | null,
}
interface ErrorType{
response:{
data:{
    message:string
}
}
}
// Login
export const login = (userData: LoginData) => async (dispatch: AppDispatch): Promise<void> => {
    try {
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
        const { data } = await axios.post<User>(`${serverUrl}/api/v1/login`, { email: userData.email, password: userData.password }, config);
        // Assuming you have the user data from the response, update the action accordingly
        console.log(data.success);
        
        dispatch(loginUserAction(data));
    } catch (error) {
        // Handle error appropriately
        dispatch(setErrorAction((error as ErrorType).response?.data?.message || "An error occurred during login."));

        throw error; // You may choose to throw the error to propagate it further
    }
};


//Register

export const register = (userData: LoginData) => async (dispatch: AppDispatch) => {
    try {
        const config = { headers: {  "Content-Type": "multipart/form-data" }, withCredentials: true };
        const { data } = await axios.post<User>(`${serverUrl}/api/v1/register`, { name: userData.name, email: userData.email, password: userData.password ,avatar:userData.avatar}, config);
        console.log(userData.email);
        
        dispatch(

            registerUserAction(data)
        )
    } catch (error) {
        dispatch(setErrorAction((error as ErrorType).response?.data?.message || "An error occurred during register."));
        throw error; 
    }
}

//Logout user

export const logout = () => async (dispatch: AppDispatch) => {


    try {

        await axios.get(`${serverUrl}/api/v1/logout`)

        dispatch(logoutUserAction());
    } catch (error) {
        dispatch(setErrorAction((error as Error).message || "An error occurred during register."));
    }
};
