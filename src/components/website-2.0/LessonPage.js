import React, { useEffect, useState } from "react";
import LessonService from "../../services/LessonService";
import ScrollSpy from "react-ui-scrollspy";

function LessonPage() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    getAllLessons();
  }, []);

  const getAllLessons = () => {
    LessonService.getAllLessons()
      .then((response) => {
        setLessons(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div class="h-56 grid grid-cols-3 gap-4 content-startgrid pl-10">
        <div>
          <p data-to-scrollspy-id="first">Section 1</p>
          <p data-to-scrollspy-id="second">Section 2</p>
        </div>
        <ScrollSpy>
          <div id="first">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut dolores
            veritatis doloremque fugit. Soluta aperiam atque inventore deleniti,
            voluptatibus non fuga eos magni natus vel, rerum excepturi expedita.
            Tempore, vero!
          </div>
          <div id="second">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut dolores
            veritatis doloremque fugit. Soluta aperiam atque inventore deleniti,
            voluptatibus non fuga eos magni natus vel, rerum excepturi expedita.
            Tempore, vero!
          </div>
        </ScrollSpy>
      </div>
    </div>
  );
}

export default LessonPage;
