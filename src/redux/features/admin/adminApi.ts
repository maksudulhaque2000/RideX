import { baseApi } from '../../api/baseApi';

type TQueryArgs = {
  searchTerm?: string;
  page?: number;
  limit?: number;
  status?: string;
};

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args?.searchTerm) params.append('searchTerm', args.searchTerm);
        if (args?.page) params.append('page', args.page);
        if (args?.limit) params.append('limit', args.limit);
        if (args?.role) params.append('role', args.role);
        
        return {
          url: `/admin/users`, 
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['users'],
    }),
    
    manageUserRole: builder.mutation({
        query: ({ userId, role }) => ({
            url: `/admin/users/${userId}/role`,
            method: 'PATCH',
            body: { role }
        }),
        invalidatesTags: ['users']
    }),

    getAllDrivers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args?.page) params.append('page', String(args.page));
        
        return {
          url: `/admin/drivers`, 
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['drivers'],
    }),

    getAllRides: builder.query({
      query: (args: TQueryArgs = {}) => {
        const params = new URLSearchParams();
        if (args.status) params.append('status', args.status);
        if (args.page) params.append('page', String(args.page));
        if (args.limit) params.append('limit', String(args.limit));
        
        return {
          url: '/admin/rides',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['rides'],
    }),

    getDashboardAnalytics: builder.query({
      query: () => ({
        url: '/admin/analytics',
        method: 'GET',
      }),
    }),

    manageUserBlockStatus: builder.mutation({
      query: ({ userId, isBlocked }) => ({
        url: `/admin/users/${userId}/block`,
        method: 'PATCH',
        body: { isBlocked },
      }),
      invalidatesTags: ['users'],
    }),

    manageDriverApproval: builder.mutation({
      query: ({ driverId, status }) => ({
        url: `/admin/drivers/${driverId}/approval`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['drivers'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useManageUserRoleMutation,
  useGetAllDriversQuery,
  useGetAllRidesQuery,
  useManageUserBlockStatusMutation,
  useManageDriverApprovalMutation,
  useGetDashboardAnalyticsQuery,
} = adminApi;