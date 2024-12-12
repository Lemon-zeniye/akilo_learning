import React from "react";
import { Course } from "../types/course";

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  const { title, description, thumbnail, progress } = course;

  const progressPercentage = (
    (progress.completed / progress.total) *
    100
  ).toFixed(1);

  return (
    <div
      onClick={onClick}
      className="border rounded-lg shadow-md p-4 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 cursor-pointer bg-white"
    >
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt={title}
        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded"
      />
      {/* Details */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        {/* Progress */}
        <div className="mt-2 flex items-center space-x-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-500">{progressPercentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
