import React from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const EmbeddedVideo = () => {
  const location = useLocation();

  return (
    <div class="min-h-screen from bg-gradient-to-r from-gray-500  to-gray-900 ">
      <div class="container p-4 flex flex-col px-5 py-24 mx-auto md:items-center bg-gray-100 rounded-xl ">
        <h1>{location.state.lessonName}</h1>
        <div className="ratio ratio-16x9">
          <iframe
            width="640"
            height="480"
            src={location.state.videoLink}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default EmbeddedVideo;
