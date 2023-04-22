import { useLocation } from "react-router-dom";
const UserCoursePage = () => {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <div className="text-3xl text-center">
        This is {location.state.userId}'s course page on{" "}
        {location.state.courseId}
      </div>
      <br />
      <div className="text-2xl text-center">
        user id: {location.state.userId}
      </div>
      <div className="text-2xl text-center">
        course id: {location.state.courseId}
      </div>
    </>
  );
};

export default UserCoursePage;
