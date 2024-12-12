import React from "react";

interface CourseCardProps {
  thumbnail: string;
  title: string;
  instructor: string;
  rating: number;
  reviews: number;
}

const CourseCardComponent: React.FC<CourseCardProps> = ({
  thumbnail,
  title,
  instructor,
  rating,
  reviews,
}) => {
  return (
    <div className="max-w-xs border rounded-lg shadow-md overflow-hidden">
      {/* Thumbnail */}
      <img src={thumbnail} alt={title} className="w-full h-40 object-cover" />

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-lg font-semibold line-clamp-2">{title}</h2>

        {/* Instructor */}
        <p className="text-sm text-gray-500 mt-1">{instructor}</p>

        {/* Rating and Reviews */}
        <div className="flex items-center mt-3 text-sm text-gray-600">
          <span className="text-yellow-500 font-bold mr-1">{rating}</span>
          <span className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ${
                  index < Math.floor(rating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.217c.969 0 1.371 1.24.588 1.81l-3.415 2.481a1 1 0 00-.364 1.118l1.286 3.959c.3.921-.755 1.688-1.538 1.118l-3.415-2.481a1 1 0 00-1.176 0l-3.415 2.481c-.783.57-1.837-.197-1.538-1.118l1.286-3.959a1 1 0 00-.364-1.118L2.98 9.386c-.783-.57-.38-1.81.588-1.81h4.217a1 1 0 00.95-.69l1.286-3.959z" />
              </svg>
            ))}
          </span>
          <span className="ml-2">({reviews.toLocaleString()})</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCardComponent;
