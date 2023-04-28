import { useLocation, useNavigate } from "react-router-dom";

const UserCoursePage = () => {
  const navigate = useNavigate();

  function sayHello() {
    alert("You clicked me!");
    navigate("/embedded/video");
  }

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
      <div class="flex flex-col h-screen my-auto items-center">
        <button
          onClick={sayHello}
          type="button"
          class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Purple to Blue
        </button>
      </div>
    </>
  );
};

export default UserCoursePage;
