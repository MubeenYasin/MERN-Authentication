import { createSlice } from "@reduxjs/toolkit"

// inital state for user  (object for Slicer)
const initialState = {
    _id: '',
    name: '',
    email: '',
    auth: false

}

//  to create slice
export const userSlice = createSlice({
    name: 'user',     // name of Slice
    initialState: initialState,     // initial state of  Slice
    reducers: {
        setUser: (state, action) => {
            const { _id, name, email, auth } = action.payload;
            state._id = _id
            state.name = name
            state.email = email
            state.auth = auth
        },
        resetUser: (state, action) => {
            state._id = ''
            state.name = ''
            state.email = ''
            state.auth = false
        }
    }
})

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;



