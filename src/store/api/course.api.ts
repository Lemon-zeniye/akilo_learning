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
