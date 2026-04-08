import React from "react";
import { motion } from "framer-motion";
import { Slide } from "../components/TabsSlider.types";
import { Tooltip } from "../components/Tooltip";

export const loanOfferSlides: Slide[] = [
  {
    id: "lo-s2",
    image: "/loan-offer/bg01.svg",
    content: (
      <Tooltip
        delay={0.3}
        top="19%"
        left="14%"
        content={
          <>
            <strong>Fast:</strong> Each stage of the borrower journey takes only
            a few minutes, enabling faster completion compared to traditional
            lending processes.
          </>
        }
        direction="bottom"
        lineToParentEdge
        edgeOffsetY={20}
        icon="fa-clock"
      />
    ),
  },
  {
    id: "lo-s3",
    image: "/loan-offer/bg01.svg",
    content: (
      <div className="absolute z-20" style={{ top: "25%", left: "-1%" }}>
        <div className="flex gap-2">
          {[
            "/loan-offer/num-card-01-white.svg",
            "/loan-offer/num-card-02-light-blue.svg",
          ].map((img, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: index === 0 ? 60 : 60,
                x: index === 0 ? 130 : 45,
                scale: index === 0 ? 0.72 : 0.72,
                borderColor: "rgba(0, 115, 222, 0)",
                boxShadow: "0px 16px 46px rgba(11, 11, 11, 0)",
              }}
              animate={{
                opacity: 1,
                y: index === 0 ? 0 : 0,
                x: index === 0 ? -20 : -30,
                scale: index === 0 ? 0.95 : 0.95,
                borderColor: "rgba(0, 115, 222, 0)",
                boxShadow: "0px 16px 46px rgba(11, 11, 11, 0)",
              }}
              exit={{
                opacity: 0,
                y: index === 0 ? 60 : 60,
                x: index === 0 ? 130 : 45,
                scale: index === 0 ? 0.72 : 0.72,
                borderColor: "rgba(0, 115, 222, 0)",
                boxShadow: "0px 16px 46px rgba(11, 11, 11, 0)",
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
              transition={{
                delay: 0.1 + index * 0.05,
                duration: 0.5,
                ease: "easeInOut",
              }}
              style={{ originX: 0, originY: 0 }}
            >
              <div className="relative rounded-[12px] border-2 border-[#0073DE] shadow-[0_16px_46px_rgba(11,11,11,0.15)] overflow-hidden bg-white">
                <img
                  src={img}
                  alt={`Overlay Asset ${index + 1}`}
                  className="w-full h-auto block"
                />
                {index === 0 && (
                  <Tooltip
                    delay={1.4}
                    content={
                      <>
                        <strong>Minimum offer</strong> Minimum offer is
                        generated using worst case assumptions based on
                        unacquired information, the offer can increase as more
                        information is submitted. <br />
                        <strong>Maximum offer</strong> is shown as a potential
                        upper bound if the best case assumptions are confirmed.
                      </>
                    }
                    direction="bottom"
                    anchorToParentBounds
                    lineWidth={10}
                    icon="fa-money-bill-1-wave"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
];
