
import { apiSlice } from "../../app/api/apiSlice"



export const contactsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addNewContact: builder.mutation({
            query: initialContactData => ({
                url: '/contacts',
                method: 'POST',
                body: {
                    ...initialContactData,
                }
            }),
            invalidatesTags: [
                { type: 'Contact', id: "LIST" }
            ]
        }),
        
    }),
})

export const {
    useAddNewContactMutation,
} = contactsApiSlice

