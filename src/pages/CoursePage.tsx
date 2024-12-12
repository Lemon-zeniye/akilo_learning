import { useState, useEffect } from "react";
import {
  Accordion,
  Title,
  Checkbox,
  ScrollArea,
  AppShell,
  RingProgress,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { useGetCoursesByIdQuery } from "../store/api/course.api";
import { Lesson } from "../types/course-detail";
import VideoPlayer from "../components/VideoPlayer";
import { IconTrophy } from "@tabler/icons-react";

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: course, error, isLoading } = useGetCoursesByIdQuery(id!);
  const [opened, setOpened] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  // const toggle = () => setOpened(!opened);

  useEffect(() => {
    if (course) {
      setCurrentLesson(course.sections[0].lessons[0] || null);
    }
  }, [course]);

  const handleLessonClick = (lesson: Lesson) => {
    setCurrentLesson(lesson);
  };

  const handleNext = () => {
    if (!course || !currentLesson) return;

    const currentSectionIndex = course.sections.findIndex((section) =>
      section.lessons.some((lesson) => lesson.id === currentLesson.id)
    );

    const currentLessonIndex = course.sections[
      currentSectionIndex
    ].lessons.findIndex((lesson) => lesson.id === currentLesson.id);

    if (
      currentLessonIndex <
      course.sections[currentSectionIndex].lessons.length - 1
    ) {
      setCurrentLesson(
        course.sections[currentSectionIndex].lessons[currentLessonIndex + 1]
      );
    } else if (currentSectionIndex < course.sections.length - 1) {
      setCurrentLesson(course.sections[currentSectionIndex + 1].lessons[0]);
    }
  };

  const handlePrevious = () => {
    if (!course || !currentLesson) return;

    const currentSectionIndex = course.sections.findIndex((section) =>
      section.lessons.some((lesson) => lesson.id === currentLesson.id)
    );

    const currentLessonIndex = course.sections[
      currentSectionIndex
    ].lessons.findIndex((lesson) => lesson.id === currentLesson.id);

    if (currentLessonIndex > 0) {
      setCurrentLesson(
        course.sections[currentSectionIndex].lessons[currentLessonIndex - 1]
      );
    } else if (currentSectionIndex > 0) {
      const previousSection = course.sections[currentSectionIndex - 1];
      setCurrentLesson(
        previousSection.lessons[previousSection.lessons.length - 1]
      );
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error || !course) return <p>Error loading course data</p>;

  const items = course.sections.map((section, sectionIndex) => (
    <Accordion.Item key={section.id} value={section.title}>
      <Accordion.Control>
        <Title order={4}>
          Section {sectionIndex + 1}: {section.title}
        </Title>
        <small>{section.duration}</small>
      </Accordion.Control>
      <Accordion.Panel>
        {section.lessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`flex items-start gap-4 py-2 ${
              currentLesson?.id === lesson.id ? "bg-gray-200" : ""
            }`}
            onClick={() => handleLessonClick(lesson)}
          >
            <Checkbox checked={lesson.isCompleted} color="black" />
            <div>
              <p>{lesson.title}</p>
              <small>{lesson.duration}</small>
            </div>
          </div>
        ))}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 400,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header className="bg-black">
          <div className="flex items-center px-20 justify-between">
            <p className="text-lg font-bold">{course?.title}</p>
            <div className="flex items-center px-2">
              <RingProgress
                size={60}
                thickness={5}
                label={
                  <div className="flex items-center justify-center">
                    {" "}
                    <IconTrophy />{" "}
                  </div>
                }
                sections={[{ value: 40, color: "cyan" }]}
              />
              <p>Get Certificate</p>
            </div>
          </div>
        </AppShell.Header>
        <AppShell.Navbar>
          <ScrollArea>
            <Accordion defaultValue={course.sections[0].title}>
              {items}
            </Accordion>
          </ScrollArea>
        </AppShell.Navbar>
        <AppShell.Main>
          {currentLesson ? (
            <VideoPlayer
              videoUrl={currentLesson.videoUrl}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          ) : (
            <p>Select a lesson to start</p>
          )}
        </AppShell.Main>
      </AppShell>
    </div>
  );
};

export default CourseDetail;
