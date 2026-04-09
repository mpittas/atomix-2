"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FaRobot,
  FaShieldVirus,
  FaBoxOpen,
  FaServer,
  FaTimeline,
  FaLock,
  FaBuildingColumns,
  FaLinkSlash,
  FaTriangleExclamation,
} from "react-icons/fa6";
import DefHeading from "@/components/typo/DefHeading";
import IconBox from "@/components/IconBox";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TechLimitations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);
  const box4Ref = useRef<HTMLDivElement>(null);
  const box5Ref = useRef<HTMLDivElement>(null);
  const box6Ref = useRef<HTMLDivElement>(null);
  const box7Ref = useRef<HTMLDivElement>(null);
  const box8Ref = useRef<HTMLDivElement>(null);
  const box9Ref = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  const handleHeadingAnimationComplete = () => {
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const boxes = [
      box1Ref.current,
      box2Ref.current,
      box3Ref.current,
      box4Ref.current,
      box5Ref.current,
      box6Ref.current,
      box7Ref.current,
      box8Ref.current,
      box9Ref.current,
    ];

    gsap.fromTo(
      boxes,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
      },
    );
  };

  useGSAP(
    () => {
      gsap.set(
        [
          box1Ref.current,
          box2Ref.current,
          box3Ref.current,
          box4Ref.current,
          box5Ref.current,
          box6Ref.current,
          box7Ref.current,
          box8Ref.current,
          box9Ref.current,
        ],
        {
          opacity: 0,
          scale: 0.85,
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className="py-36">
      <DefHeading
        theme="light"
        badgeText=""
        showBadge={false}
        title="Why Existing Technology Falls Short"
        description="The problem is structural — and so is the Atomix solution."
        onAnimationComplete={handleHeadingAnimationComplete}
      />

      <div className="grid grid-cols-3 gap-4 mt-16 w-full mx-auto">
        <div ref={box1Ref}>
          <IconBox
            icon={<FaRobot className="h-10 w-10" />}
            title="Task-level automation leaves underwriters reviewing everything"
            description="Costs stay high, scaling still requires hiring"
          />
        </div>
        <div ref={box2Ref}>
          <IconBox
            icon={<FaShieldVirus className="h-10 w-10" />}
            title="AI cannot guarantee compliance"
            description="a 1% error rate means thousands of non-compliant loans, with no audit trail"
          />
        </div>
        <div ref={box3Ref}>
          <IconBox
            icon={<FaBoxOpen className="h-10 w-10" />}
            title="Black-box reasoning fails audit requirements"
            description="No traceable logic, no decision trail, no accountability"
          />
        </div>
        <div ref={box4Ref}>
          <IconBox
            icon={<FaServer className="h-10 w-10" />}
            title="Legacy systems are expensive to configure and impossible to adapt quickly"
            description="New products and rule changes require developers, long lead times and significant cost"
          />
        </div>
        <div ref={box5Ref}>
          <IconBox
            icon={<FaTimeline className="h-10 w-10" />}
            title="No process orchestration"
            description="Existing systems cannot ensure the right parties verify the right documents at the right time"
          />
        </div>
        <div ref={box6Ref}>
          <IconBox
            icon={<FaLock className="h-10 w-10" />}
            title="Existing tech cannot enforce capital provider criteria"
            description="Lenders cannot demonstrate compliance, blocking access to institutional funding"
          />
        </div>
        <div ref={box7Ref}>
          <IconBox
            icon={<FaBuildingColumns className="h-10 w-10" />}
            title="No existing platform enforces end-to-end compliance or connects lenders to capital at scale"
            description=""
          />
        </div>
        <div ref={box8Ref}>
          <IconBox
            icon={<FaLinkSlash className="h-10 w-10" />}
            title="Incumbents lack the blockchain layer and regulatory architecture needed to unlock secondary liquidity"
            description=""
          />
        </div>
        <div ref={box9Ref}>
          <IconBox
            icon={<FaTriangleExclamation className="h-10 w-10" />}
            title="The root cause is infrastructure, not intent"
            description="Legacy systems were never designed to handle the volume, complexity or transparency this market demands"
          />
        </div>
      </div>
    </div>
  );
}
