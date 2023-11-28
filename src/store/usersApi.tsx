import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../interfaces/app.interfaces";
import { objectToQueryString, KeyValueObject } from "../utils/objToQuery";

export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3003/" }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], KeyValueObject>({
      query: (queryParams) => `users${objectToQueryString(queryParams)}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Users" as const, id })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
    //  addUser: builder.mutation({
    //    query: (body: IUser) => ({ url: "events", method: "POST", body }),
    //    invalidatesTags: [{ type: "Users", id: "LIST" }],
    //  }),
    //  completedUser: builder.mutation({
    //    query: (payload: IUser) => ({
    //      url: `events/${payload.id}`,
    //      method: "PATCH",
    //      body: payload,
    //    }),
    //    invalidatesTags: [{ type: "Users", id: "LIST" }],
    //  }),
  }),
});

export const { useGetUsersQuery } = usersApi;
