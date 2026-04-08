import React from "react";
import { motion } from "framer-motion";
import { Slide } from "../components/TabsSlider.types";
import { Tooltip } from "../components/Tooltip";

export const getStartedSlides: Slide[] = [
  {
    id: "gs-s1",
    image: "/anim-get-started/bg01.svg",
    content: (
      <>
        <Tooltip
          delay={0.3}
          top="24%"
          left="7%"
          content="Borrowers begin their application with a short set of questions to receive an initial indicative offer."
          direction="bottom" // You requested tooltip with direction to bottom
          lineToParentEdge
          edgeOffsetY={60}
          icon="fa-question-circle"
          position="left"
          maxWidth="500px"
        />
      </>
    ),
  },
  {
    id: "gs-s2",
    image: "/anim-get-started/bg01.svg",
    content: (
      <div
        className="absolute z-20"
        style={{ top: "50%", left: "-50px", transform: "translateY(-50%)" }}
      >
        <div className="flex">
          <motion.div
            className="relative rounded-[12px] border-2 overflow-hidden bg-white"
            initial={{
              opacity: 1,
              y: 10,
              x: 174,
              scale: 0.66,
              borderColor: "rgba(0, 115, 222, 0)",
              boxShadow: "0px 16px 46px rgba(11, 11, 11, 0)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              borderColor: "rgba(0, 115, 222, 1)",
              boxShadow: "0px 16px 46px rgba(11, 11, 11, 0.15)",
            }}
            exit={{
              opacity: 0,
              y: 10,
              x: 174,
              scale: 0.66,
              borderColor: "rgba(0, 115, 222, 0)",
              boxShadow: "0px 16px 46px rgba(11, 11, 11, 0)",
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            transition={{ delay: 0, duration: 1, ease: "easeInOut" }}
            style={{ originX: 0, originY: 0 }} // Ensures it zooms out from the top-left or relative point
          >
            <img
              src="/anim-get-started/card-red-1.svg"
              alt="Overlay Asset 1"
              className="w-full h-auto block"
            />

            <Tooltip
              delay={0.5}
              content="If at this stage the responses show the applicant is ineligible they are prevented from progressing."
              direction="bottom"
              position="center"
              lineWidth={200}
              icon="fa-sliders-h"
              maxWidth="350px"
            />
          </motion.div>
        </div>
      </div>
    ),
  },
  {
    id: "gs-s3",
    image: "/anim-get-started/bg02.svg",
    content: (
      <>
        <Tooltip
          delay={0.3}
          top="10%"
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
      </>
    ),
  },
  {
    id: "gs-s4",
    image: "/anim-get-started/bg02.svg",
    content: (
      <div className="absolute z-20" style={{ top: "40%", left: "-3%" }}>
        <div className="flex">
          <motion.div
            className="relative rounded-[12px] border-2 overflow-hidden bg-white"
            initial={{
              opacity: 1,
              y: 80,
              x: 144,
              scale: 0.95,
              borderColor: "rgba(0, 115, 222, 0)",
              boxShadow: "0px 16px 46px rgba(11, 11, 11, 0)",
            }}
            // Testing values: update x, y, and scale to position the initial state.
            animate={{
              opacity: 1,
              y: 40,
              x: 0,
              scale: 1.2,
              borderColor: "rgba(0, 115, 222, 1)", // testing
              boxShadow: "0px 16px 46px rgba(11, 11, 11, 0)", // testing
            }}
            exit={{
              opacity: 0,
              y: 10,
              x: 174,
              scale: 0.66,
              borderColor: "rgba(0, 115, 222, 0)",
              boxShadow: "0px 16px 46px rgba(11, 11, 11, 0)",
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            transition={{ delay: 0, duration: 1, ease: "easeInOut" }}
            style={{ originX: 0, originY: 0 }} // Ensures it zooms out from the top-left or relative point
          >
            <img
              src="/anim-get-started/card-green-1.svg"
              alt="Overlay Asset 1"
              className="w-full h-auto block"
            />

            <Tooltip
              delay={0.5}
              content={
                <>
                  <strong>No re-keying:</strong> Enter information once and have
                  it automatically applied across the flow, reducing repetition
                  and saving time.
                </>
              }
              direction="bottom"
              lineWidth={45}
              icon="fa-clock"
              maxWidth="350px"
            />
          </motion.div>
        </div>
      </div>
    ),
  },
];
