interface Progress {
  completed: number;
  total: number;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  progress: Progress;
}
