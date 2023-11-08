import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Event } from "../interfaces/app.interfaces";
import { objectToQueryString, KeyValueObject } from "../utils/objToQuery";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  tagTypes: ["Events"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3003/" }),
  endpoints: (builder) => ({
    getEvents: builder.query<Event[], KeyValueObject>({
      query: (queryParams) => `events${objectToQueryString(queryParams)}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Events" as const, id })),
              { type: "Events", id: "LIST" },
            ]
          : [{ type: "Events", id: "LIST" }],
    }),
    addEvent: builder.mutation({
      query: (body: Event) => ({ url: "events", method: "POST", body }),
      invalidatesTags: [{ type: "Events", id: "LIST" }],
    }),
    completedEvent: builder.mutation({
      query: (body: Event) => ({
        url: `events/${body.id}`,
        method: "PUTCH",
        body,
      }),
      invalidatesTags: [{ type: "Events", id: "LIST" }],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useAddEventMutation,
  useCompletedEventMutation,
} = eventsApi;
