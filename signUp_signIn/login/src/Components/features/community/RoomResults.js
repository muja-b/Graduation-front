import RoomCard from "./RoomCard";

const RoomResults = ({ lessons }) => {
  return (
    <div style={{ top: "200px" }}>
      {lessons.map((lesson) => (
        <RoomCard
          key={lesson.id}
          name={lesson.name}
          text={lesson.text}
          id={lesson.id}
          ownerId={lesson.ownerId}
          ownerName={lesson.ownerName}
        />
      ))}
    </div>
  );
};
export default RoomResults;
