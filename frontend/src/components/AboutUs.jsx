import React from "react";
import "../styles/AboutUs.scss";

const AboutUs = () => {
  return (
    <main className="main-container-au">
      <h1 className="title-au">About Us</h1>
      <h2 className="subtitle-au">Perfect wine for every occasion</h2>
      <div className="paragraph-container-au">
        <p className="paragraphs-au">
          <span className="text-bold-au">What The Wine</span> is a responsive
          web application for choosing the perfect wine fit for the given
          occasion.
        </p>
        <div className="divider-horizontal-au"></div>
        <p className="paragraphs-au">
          Through its simple and clean interface, users can search for different
          wines in a matter of seconds. With a few filters such as the desired
          food pairing, preferred price range and wine type, the search will
          give users perfectly tailored recommendations currently available on
          the German market. By providing users only with the most essential
          information about the recommended options, WTW makes the world of
          wines easier and more fun to approach for everyone.
        </p>
        <p className="paragraphs-au">
          WTW prototype was built as an educational project and as part of the
          TechLabs Digital Shaper Program Berlin. The project team consists of
          three members of the User Experience and two of the Web Development
          track and was supported by a mentor.
        </p>
      </div>
    </main>
  );
};

export default AboutUs;

//This is an about us page.
