import React, { useEffect, useState } from "react";
import LessonService from "../../services/LessonService";

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
      <div class="grid grid-cols-3">
        <div class="col-span-2">
          <div
            data-te-spy="scroll"
            data-te-target="#scrollspy1"
            data-te-offset="200"
            class="relative h-48 overflow-auto"
          >
            {/* {lessons.map((lesson, index) => (
              <section id={"#example-" + (index + 1)}>
                <h3 class="pb-3 pt-5 text-xl font-semibold">{lesson.name}</h3>
                <p>{lesson.description}</p>
              </section>
            ))} */}
            <section id="example-1">
              <h3 class="pb-3 pt-5 text-xl font-semibold">Section 1</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
              </p>
            </section>
            <section id="example-2">
              <h3 class="pb-3 pt-5 text-xl font-semibold">Section 2</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
              </p>
            </section>
            <section id="example-3">
              <h3 class="pb-3 pt-5 text-xl font-semibold">Section 3</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
              </p>
            </section>
            <section id="example-4">
              <h3 class="pb-3 pt-5 text-xl font-semibold">Section 4</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
              </p>
            </section>
          </div>
        </div>

        <div>
          <div id="scrollspy1" class="sticky-top pl-3 text-sm">
            <ul data-te-nav-list-ref>
              {lessons.map((lesson, index) => (
                <li class="py-1">
                  <a
                    data-te-nav-link-ref
                    class="bg-transparent px-[5px] text-neutral-600 shadow-none dark:text-neutral-200"
                    href={"#example-" + (index + 1)}
                  >
                    {lesson.name} nav
                  </a>
                </li>
              ))}
              {/* <li class="py-1">
                <a
                  data-te-nav-link-ref
                  class="bg-transparent px-[5px] text-neutral-600 shadow-none dark:text-neutral-200"
                  href="#example-1"
                >
                  Section 1
                </a>
              </li>
              <li class="py-1">
                <a
                  data-te-nav-link-ref
                  class="bg-transparent px-[5px] text-neutral-600 shadow-none dark:text-neutral-200"
                  href="#example-2"
                >
                  Section 2
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonPage;
