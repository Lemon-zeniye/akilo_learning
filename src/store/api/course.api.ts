import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CourseDetail } from "../../types/course-detail";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getCourses: builder.query<any[], void>({
      query: () => "courses",
    }),
    getRecommendedCourses: builder.query<any[], void>({
      query: () => "recommended_courses",
    }),
    getCoursesById: builder.query<CourseDetail, any>({
      query: (id: string) => `courses_detail`,
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetRecommendedCoursesQuery,
  useGetCoursesByIdQuery,
} = courseApi;

// export const salesOrdersApi = createApi({
//   reducerPath: "salesOrders",
//   refetchOnFocus: true,
//   tagTypes: ["SalesOrder", "CustomsDetails"],
//   baseQuery: baseQuery(
//     process.env.NEXT_PUBLIC_SALES_API ??
//       "https://stage.sales.mavekoapps.com/api"
//   ),
//   endpoints: (builder) => ({
//     getSalesOrders: builder.mutation<any, any>({
//       query: (data) => ({
//         url: `/comee_core/sales_orders/filter`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//     getSalesOrderById: builder.query<{ data: SalesOrder }, { id: string }>({
//       query: (data) => `/comee_core/sales_orders/${data?.id}`,
//       providesTags: ["SalesOrder"],
//     }),
//     submitOrder: builder.mutation<any, { id: string }>({
//       query: (data) => ({
//         url: `/comee_core/customer_orders/${data?.id}/submit`,
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["SalesOrder"],
//     }),
//     acceptOrder: builder.mutation<any, { id: string }>({
//       query: (data) => ({
//         url: `/comee_core/sales_orders/${data?.id}/accept`,
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["SalesOrder"],
//     }),
//     reqSupplierConfirmation: builder.mutation<
//       any,
//       { product_ids: any | undefined[] }
//     >({
//       query: (data) => ({
//         url: `/comee_core/products/master_prices`,
//         method: "POST",
//         body: { payload: data },
//       }),
//       invalidatesTags: ["SalesOrder"],
//     }),
//     getCustomers: builder.mutation<any, any>({
//       query: (data) => ({
//         url: `/comee_core/clients/filter`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//     createSalesOrder: builder.mutation<any, SalesOrder>({
//       query: (payload) => ({
//         url: "/comee_core/clients",
//         method: "POST",
//         body: { payload: payload },
//       }),
//       invalidatesTags: ["SalesOrder"],
//     }),
//     updateSalesOrderItems: builder.mutation<any, any>({
//       query: (payload) => ({
//         url: `/comee_core/sales_order_items/${payload?.id}`,
//         method: "PUT",
//         body: { payload: payload },
//       }),
//       invalidatesTags: ["SalesOrder"],
//     }),
//     createOrderItems: builder.mutation<any, any>({
//       query: (payload) => ({
//         url: "/comee_core/sales_order_items",
//         method: "POST",
//         body: { payload: payload },
//       }),
//       invalidatesTags: ["SalesOrder"],
//     }),
//     removeOrderItem: builder.mutation<any, { id: string }>({
//       query: (payload) => ({
//         url: `/comee_core/sales_order_items/${payload.id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["SalesOrder"],
//     }),
//     productLookup: builder.mutation<any, any>({
//       query: (data) => ({
//         url: `/comee_core/product_lookups/filter`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//     customsLookup: builder.query<any, any>({
//       query: () => ({
//         url: `/comee_core/lookups`,
//         method: "GET",
//       }),
//     }),
//     saveCustomsDetails: builder.mutation<any, any>({
//       query: (data) => ({
//         url: `/comee_core/customs_details`,
//         method: "POST",
//         body: { payload: data },
//       }),
//       invalidatesTags: ["CustomsDetails", "SalesOrder"],
//     }),
//     getCustomsDetails: builder.query<any, { id: string }>({
//       query: (data) => ({
//         url: `/comee_core/customs_details/filter`,
//         method: "POST",
//         body: {
//           q: { sales_order_id_eq: data?.id },
//         },
//       }),
//       providesTags: ["CustomsDetails"],
//     }),
//     importChanges: builder.mutation<any, any>({
//       query: (payload) => ({
//         url: `sales_orders/import_changes`,
//         method: "POST",
//         data: payload,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }),
//     }),
//     getItemPrice: builder.mutation<any, any>({
//       query: (data) => ({
//         url: `/comee_core/clients/${data.itemable_id}/price`,
//         method: "POST",
//         body: { product_id: data.product_code },
//       }),
//     }),
//     convertOrder: builder.mutation<any, any>({
//       query: (data) => ({
//         url: `/converters/preview`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//     submitSalesOrder: builder.mutation<any, any>({
//       query: (data) => ({
//         url: `/comee_core/sales_orders/${data?.id}/submit`,
//         method: "POST",
//       }),
//       invalidatesTags: ["SalesOrder"],
//     }),
//     confirmSalesOrder: builder.mutation<any, any>({
//       query: (data) => ({
//         url: `/comee_core/sales_orders/${data?.id}/confirm`,
//         method: "POST",
//       }),
//       invalidatesTags: ["SalesOrder"],
//     }),
//     acceptSalesOrder: builder.mutation<any, any>({
//       query: (data) => ({
//         url: `/comee_core/sales_orders/${data?.id}/confirm`,
//         method: "POST",
//       }),
//       invalidatesTags: ["SalesOrder"],
//     }),
//     updateSalesOrder: builder.mutation<any, SalesOrder>({
//       query: (payload) => ({
//         url: `/comee_core/sales_orders/${payload.id}`,
//         method: "PUT",
//         body: { payload: payload },
//       }),
//     }),
//     getShipmentDetails: builder.query<any, { id: string }>({
//       query: (data) => ({
//         url: `/comee_core/sales_order_items/${data?.id}/shipment_details`,
//         method: "GET",
//       }),
//     }),
//     publishCustomsDetails: builder.mutation<any, any>({
//       query: (data) => ({
//         url: `/comee_core/customs_details/send`,
//         method: "POST",
//         body: { payload: data },
//       }),
//     }),
//     updateCustomsDetails: builder.mutation<any, any>({
//       query: (data) => ({
//         url: `/comee_core/customs_details/${data?.id}`,
//         method: "PUT",
//         body: { payload: data },
//       }),
//       invalidatesTags: ["CustomsDetails"],
//     }),
//     generateBeoXml: builder.mutation<any, any>({
//       query: (data) => ({
//         url: `/comee_core/customs_details/generate_beo_xml`,
//         method: "POST",
//         body: {payload: data},
//       }),
//     }),
//   }),
// });
