import React from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const EmbeddedVideo = () => {
  const location = useLocation();

  return (
    <div>
      <Container>
        <h1>{location.state.courseDescription}</h1>
        <div className="ratio ratio-16x9">
          <iframe
            width="560"
            height="315"
            src={location.state.courseLink}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </Container>
    </div>
  );
};

export default EmbeddedVideo;
