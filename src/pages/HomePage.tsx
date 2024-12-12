import { Avatar } from "@mantine/core";
import CourseCard from "../components/Course";
import { HeaderComponent } from "../components/Header/Header";
import {
  useGetCoursesQuery,
  useGetRecommendedCoursesQuery,
} from "../store/api/course.api";
import CourseCardComponent from "../components/CourseCard";
import { Footer } from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { data: courses, error, isLoading } = useGetCoursesQuery();
  const navigate = useNavigate();
  const {
    data: recommended_courses,
    error: error2,
    isLoading: isLoading2,
  } = useGetRecommendedCoursesQuery();

  if (isLoading || isLoading2) return <p>Loading...</p>;
  if (error || error2) return <p>Error loading posts</p>;

  return (
    <div>
      <HeaderComponent />
      <div className="px-20">
        <div className="flex gap-2 my-4">
          <Avatar />
          <h1 className="text-3xl font-bold">Welcome back, Jon</h1>
        </div>
        <div className="rounded-md bg-gray-200 min-h-[50vh] px-10  my-4">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-3xl font-semibold pb-4 ">Continue Learning</h1>

            <a className="text-lg text-violet-500 font-semibold underline cursor-pointer">
              Your Courses
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses?.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => navigate(`/course/${course.id}`)}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold">What To Learn Next</h1>
          <div>
            <h1 className="text-2xl font-semibold py-4">Recommended for you</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recommended_courses?.map((course) => (
                <CourseCardComponent
                  key={course.id}
                  thumbnail={course.thumbnail}
                  title={course.title}
                  instructor={course.instructor}
                  rating={course.rating}
                  reviews={course.reviews}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
