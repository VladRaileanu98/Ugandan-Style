import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const EmbeddedVideo = () => {
  return (
    <div>
      <Container>
        <h1>Hello world!</h1>
        <div className="ratio ratio-16x9">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/5-V8V0fPEq0"
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
