import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../store/store"

const USER_URL = "user"

interface LoginResponse {
  token: string
}

export interface User {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
}

export const userApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    }
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string, password: string }>({
      query: (credentials) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: credentials
      }),
      transformResponse: (response: { body: LoginResponse }) => response.body
    }),
    getUserProfile: builder.query<User, void>({
      query: () => ({
        url: `${USER_URL}/profile`,
        method: "POST"
      }),
      transformResponse: (response: { body: User }) => response.body
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query: (updatedUser) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: updatedUser
      }),
      transformResponse: (response: { body: User }) => response.body
    })
  })
})

export const { useLoginMutation, useGetUserProfileQuery, useUpdateUserMutation } = userApi