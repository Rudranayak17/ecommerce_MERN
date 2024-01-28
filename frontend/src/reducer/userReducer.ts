import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/types";

// interface UserType {
//   username?: string;
//   email: string;
//   password: string;
// }

interface UserState {
  user: User  | null;
  loading: boolean;
  isAuthenticated: boolean;
  error:string|null;
  
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {

      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null; // Reset error on successful login
    },
    registerUser: (state, action: PayloadAction<User>) => {
     
      state.user = action.payload
      state.isAuthenticated = true;
      state.loading = false;
      state.error=null; // Reset error on successful registion
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error=null; //Reset error on logout

    },
    setError:(state,action:PayloadAction<string>)=>{
        state.error=action.payload;
    }
  },
});

export const { loginUser, logoutUser, registerUser, setError  } = userSlice.actions;
export default userSlice.reducer;