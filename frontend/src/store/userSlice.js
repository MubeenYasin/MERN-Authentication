import { createSlice } from "@reduxjs/toolkit"

// inital state for user  (object for Slicer)
const initialState = {
    _id: '',
    name: '',
    mobile: '',
    email: '',
    auth: ''

}

//  to create slice
export const userSlice = createSlice({
    name: 'user',     // name of Slice
    initialState: initialState,     // initial state of  Slice
    reducers: {
        setUser: (state, action) => {
            const { _id, name, mobile, email, auth } = action.payload;
            state._id = _id
            state.name = name
            state.email = email
            state.mobile = mobile
            state.auth = auth
        },
        resetUser: (state, action) => {
            state._id = ''
            state.name = ''
            state.email = ''
            state.mobile = ''
            state.auth = false
        }
    }
})

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;



