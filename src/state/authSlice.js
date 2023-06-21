import { createSlice } from "@reduxjs/toolkit";

const initialState = {id : 1 , isLogged : false}

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    changeLog : (state) => {
      state.isLogged = !state.isLogged
    }
  }
});

export const {changeLog} = authSlice.actions;
export default authSlice.reducer;