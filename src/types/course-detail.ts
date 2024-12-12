export type Lesson = {
  id: number;
  title: string;
  duration: string;
  isCompleted: boolean;
  videoUrl: string;
  resources?: string;
};

type Section = {
  id: number;
  title: string;
  duration: string;
  lessons: Lesson[];
};

export type CourseDetail = {
  id: number;
  title: string;
  sections: Section[];
};
