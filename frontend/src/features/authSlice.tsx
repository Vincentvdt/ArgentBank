import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { User } from "../services/userApi"
import type { RootState } from "../store/store"


interface AuthState {
  token: string | null,
  user: User | null,
  isAuthenticated: boolean
}

const initialState: AuthState = {
  token: localStorage.getItem("token") ?? null,
  user: null,
  isAuthenticated: !!localStorage.getItem("token")
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload
      state.token = token
      state.isAuthenticated = true
      localStorage.setItem("token", token)
    },
    resetAuth: (state) => {
      state.token = null
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem("token")
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    }
  }
})

export const { setToken, setUser, resetAuth } = authSlice.actions


export default authSlice.reducer

export const selectUser = (state: RootState) => state.auth.user
export const selectToken = (state: RootState) => state.auth.token





