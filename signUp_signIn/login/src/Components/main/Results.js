import LessonCard from "./LessonCard";

const Results = ({ lessons }) => {
  return (
    <div>
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.id}
          name={lesson.name}
          text={lesson.text}
          image={lesson.image}
          id={lesson.id}
        />
      ))}
    </div>
  );
};
export default Results;
