import React from "react";
import { Slide } from "../components/TabsSlider.types";
import { Tooltip } from "../components/Tooltip";

export const getStartedMobileSlides: Slide[] = [
  {
    id: "mob-gs-s1",
    image: "/anim-get-started/mobile-image.svg",
    content: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-black"></div>
    ),
  },

  {
    id: "mob-gs-s2",
    image: "/anim-get-started/mobile-image.svg",
    content: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-black">
        <Tooltip
          delay={0.3}
          top="24%"
          left="7%"
          content="If at this stage the responses show the applicant is ineligible they are prevented from progressing."
          direction="bottom" // You requested tooltip with direction to bottom
          lineToParentEdge
          edgeOffsetY={60}
          icon="fa-sliders-h"
          position="left"
          maxWidth="500px"
        />
      </div>
    ),
  },

  {
    id: "mob-gs-s3",
    image: "/anim-get-started/mobile-image.svg",
    content: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-black">
        <Tooltip
          delay={0.3}
          top="5%"
          left="7%"
          content={
            <>
              <strong>White Labelled:</strong> The interface is fully
              customisable to reflect the lender’s branding, including logo,
              colours, and terminology, ensuring a seamless customer experience.
            </>
          }
          direction="bottom" // You requested tooltip with direction to bottom
          lineToParentEdge
          edgeOffsetY={60}
          icon="fa-user-check"
          position="left"
          maxWidth="500px"
        />
      </div>
    ),
  },

  {
    id: "mob-gs-s4",
    image: "/anim-get-started/mobile-image.svg",
    content: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-black">
        <Tooltip
          delay={1}
          top="35%"
          left="7%"
          content={
            <>
              <strong>No re-keying:</strong> Enter information once and have it
              automatically applied across the flow, reducing repetition and
              saving time.
            </>
          }
          direction="bottom"
          lineToParentEdge
          edgeOffsetY={60}
          icon="fa-clock"
          position="left"
          maxWidth="500px"
        />
      </div>
    ),
  },
];
