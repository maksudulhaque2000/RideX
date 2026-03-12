import { baseApi } from '../../api/baseApi';

const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDriverEarnings: builder.query({
      query: () => ({
        url: '/drivers/me/earnings',
        method: 'GET',
      }),
    }),

    getEarningsAnalytics: builder.query({
      query: () => ({
        url: '/drivers/me/earnings-analytics',
        method: 'GET',
      }),
    }),

    getMyDriverProfile: builder.query({
        query: () => ({
            url: '/drivers/me',
            method: 'GET'
        }),
        providesTags: ['drivers']
    }),

    updateAvailability: builder.mutation({
      query: (payload: { availability: 'online' | 'offline' }) => ({
        url: '/drivers/availability',
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['drivers'],
    }),
  }),
});

export const { useGetDriverEarningsQuery, useGetEarningsAnalyticsQuery, useGetMyDriverProfileQuery, useUpdateAvailabilityMutation } = driverApi;