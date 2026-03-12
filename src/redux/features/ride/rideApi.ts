import { baseApi } from '../../api/baseApi';

const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestRide: builder.mutation({
      query: (rideData) => ({
        url: '/rides/request',
        method: 'POST',
        body: rideData,
      }),
    }),

    getRideHistory: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args?.page) params.append('page', String(args.page));
        if (args?.status) params.append('status', args.status);

        return {
          url: `/rides/history/${args.role}`,
          method: 'GET',
          params: params,
        }
      },
      providesTags: ['rides'],
    }),

    getPendingRequests: builder.query({
      query: () => ({
        url: '/rides/requests',
        method: 'GET',
      }),
      providesTags: ['rides'],
    }),

    acceptRide: builder.mutation({
      query: (rideId) => ({
        url: `/rides/${rideId}/accept`,
        method: 'PATCH',
      }),
      invalidatesTags: ['rides'],
    }),

    rejectRide: builder.mutation({
      query: (rideId) => ({
        url: `/rides/${rideId}/reject`,
        method: 'PATCH',
      }),
      invalidatesTags: ['rides'],
    }),

    getActiveRideAsDriver: builder.query({
      query: () => '/rides/driver/active-ride',
      providesTags: ['rides'],
    }),

    updateRideStatus: builder.mutation({
      query: ({ rideId, status }) => ({
        url: `/rides/${rideId}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['rides'],
    }),

    getActiveRideAsRider: builder.query({
      query: () => '/rides/rider/active-ride',
        providesTags: ['rides'],
    }),

  }),
});

export const {
  useRequestRideMutation,
  useGetRideHistoryQuery,
  useGetPendingRequestsQuery,
  useAcceptRideMutation,
  useRejectRideMutation,
  useGetActiveRideAsDriverQuery,
  useUpdateRideStatusMutation,
  useGetActiveRideAsRiderQuery,
} = rideApi;