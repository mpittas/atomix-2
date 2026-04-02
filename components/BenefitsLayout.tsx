"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import IconBoxHorizontal from "./IconBoxHorizontal";

gsap.registerPlugin(ScrollTrigger);

export default function BenefitsLayout() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const stackedImagesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const row2Ref = useRef<HTMLDivElement>(null);
  const row2ContentRef = useRef<HTMLDivElement>(null);
  const row2MainImageRef = useRef<HTMLDivElement>(null);
  const row2SmallImageRef = useRef<HTMLImageElement>(null);

  const row3Ref = useRef<HTMLDivElement>(null);
  const row3MainImageRef = useRef<HTMLDivElement>(null);
  const row3SmallImageRef = useRef<HTMLImageElement>(null);
  const row3ContentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.set(mainImageRef.current, { opacity: 0, scale: 0.8 });
        gsap.set(stackedImagesRef.current?.children || [], {
          opacity: 0,
          x: 50,
        });
        gsap.set(contentRef.current?.children || [], {
          opacity: 0,
          y: 30,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row1Ref.current,
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(mainImageRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: "back.out(1.4)",
        });

        tl.to(
          stackedImagesRef.current?.children || [],
          {
            opacity: 1,
            x: 0,
            duration: 1.6,
            stagger: 0.3,
            ease: "power2.out",
          },
          "-=0.5",
        );

        tl.to(
          contentRef.current?.children || [],
          {
            opacity: 1,
            y: 0,
            duration: 1.6,
            stagger: 0.2,
            ease: "power2.out",
          },
          "-=1.0",
        );
      }, row1Ref);

      return () => ctx.revert();
    },
    { scope: row1Ref },
  );

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.set(row2ContentRef.current?.children || [], {
          opacity: 0,
          y: 30,
        });
        gsap.set(row2MainImageRef.current, { opacity: 0, scale: 0.8 });
        gsap.set(row2SmallImageRef.current, { opacity: 0, y: 30 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row2Ref.current,
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(row2ContentRef.current?.children || [], {
          opacity: 1,
          y: 0,
          duration: 1.6,
          stagger: 0.2,
          ease: "power2.out",
        });

        tl.to(
          row2MainImageRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.6,
            ease: "back.out(1.4)",
          },
          "-=0.8",
        );

        tl.to(
          row2SmallImageRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.6,
            ease: "power2.out",
          },
          "-=0.8",
        );
      }, row2Ref);

      return () => ctx.revert();
    },
    { scope: row2Ref },
  );

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.set(row3MainImageRef.current, { opacity: 0, scale: 0.8 });
        gsap.set(row3SmallImageRef.current, { opacity: 0, x: 50 });
        gsap.set(row3ContentRef.current?.children || [], {
          opacity: 0,
          y: 30,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row3Ref.current,
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(row3MainImageRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: "back.out(1.4)",
        });

        tl.to(
          row3SmallImageRef.current,
          {
            opacity: 1,
            x: 20,
            y: 20,
            duration: 1.6,
            ease: "power2.out",
          },
          "-=0.8",
        );

        tl.to(
          row3ContentRef.current?.children || [],
          {
            opacity: 1,
            y: 0,
            duration: 1.6,
            stagger: 0.2,
            ease: "power2.out",
          },
          "-=0.8",
        );
      }, row3Ref);

      return () => ctx.revert();
    },
    { scope: row3Ref },
  );

  return (
    <div className="bg-red-500/0 flex flex-col gap-y-32">
      {/* ROW 1 */}
      <div
        ref={row1Ref}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
      >
        <div className="bg-green-500/0">
          <div className="relative w-full pr-8 pb-8 bg-red-500/0">
            <div ref={mainImageRef}>
              <Image
                src="/images/dashboard-cp-main.svg"
                alt=""
                width={600}
                height={400}
                className="object-contain rounded-lg w-full h-auto"
              />
            </div>

            <div
              ref={stackedImagesRef}
              className="absolute bottom-0 right-0 w-50 bg-blue-500/0 min-h-20 flex flex-col gap-2"
            >
              <Image
                src="/images/dashboard-cp-1.svg"
                alt=""
                width={200}
                height={100}
                className="object-contain rounded-lg w-full h-auto"
              />

              <Image
                src="/images/dashboard-cp-2.svg"
                alt=""
                width={200}
                height={100}
                className="object-contain rounded-lg w-full h-auto"
              />

              <Image
                src="/images/dashboard-cp-3.svg"
                alt=""
                width={200}
                height={100}
                className="object-contain rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
        <div ref={contentRef} className="bg-yellow-500/0">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Capital Providers
          </h2>
          <div className="text-lg text-white/80 mb-8">
            Invest with full transparency, automated compliance, and access to
            diversified lending opportunities.
          </div>
          <div className="flex flex-col gap-y-6">
            <IconBoxHorizontal src="/icons/white/shield-check-white.svg">
              <div className="max-w-[400px]">
                <span className="font-semibold text-white">
                  Continuous compliance assuranceless
                </span>{" "}
                variance, easier audits
              </div>
            </IconBoxHorizontal>

            <IconBoxHorizontal src="/icons/white/target-arrow.svg">
              <div className="max-w-[340px]">
                <span className="font-semibold">
                  Deploy capital exactly as intended <br></br>
                </span>{" "}
                with lower risk and lower upfront costs
              </div>
            </IconBoxHorizontal>

            <IconBoxHorizontal src="/icons/white/module-simple.svg">
              <div className="max-w-[340px]">
                <span className="font-semibold">
                  One platform, many lenders<br></br>
                </span>{" "}
                removes barriers for all investor types
              </div>
            </IconBoxHorizontal>
          </div>
        </div>
      </div>

      {/* ROW 2 */}
      <div
        ref={row2Ref}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
      >
        <div className="bg-green-500/0 order-1">
          <div className="relative w-full pr-8 pb-8 bg-red-500/0">
            <div className="relative">
              <div ref={row2MainImageRef}>
                <Image
                  src="/images/dashboard-lenders-main.svg"
                  alt=""
                  width={600}
                  height={400}
                  className="object-contain rounded-lg w-full h-auto"
                />
              </div>

              <Image
                ref={row2SmallImageRef}
                src="/images/dashboard-lenders-small.svg"
                alt=""
                width={360}
                height={200}
                className="object-cover rounded-lg absolute -bottom-4 left-1/2 -translate-x-1/2"
              />
            </div>
          </div>
        </div>

        <div ref={row2ContentRef} className="bg-yellow-500/0">
          <h2 className="text-3xl font-bold mb-4 text-white">Lenders</h2>
          <div className="text-lg text-white/80 mb-8">
            Automate lending workflows, access capital faster, and scale
            operations without increasing headcount.
          </div>
          <div className="flex flex-col gap-y-6">
            <IconBoxHorizontal src="/icons/white/shield-check-white.svg">
              <div className="max-w-[500px]">
                <span className="font-semibold text-white">
                  Access funding at any scale <br></br>
                </span>{" "}
                platform handles compliance, auditing and access, attracting
                both institutional and private investors
              </div>
            </IconBoxHorizontal>

            <IconBoxHorizontal src="/icons/white/user-minus.svg">
              <div className="max-w-[400px]">
                <span className="font-semibold text-white">
                  Scale business without scaling workforce <br></br>
                </span>{" "}
                grow volume without hiring
              </div>
            </IconBoxHorizontal>

            <IconBoxHorizontal src="/icons/white/scales.svg">
              <div className="max-w-[400px]">
                <span className="font-semibold text-white">
                  Costs scale with loan size <br></br>
                </span>{" "}
                making smaller in-demand loans profitable
              </div>
            </IconBoxHorizontal>
          </div>
        </div>
      </div>

      {/* ROW 3 */}
      <div
        ref={row3Ref}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
      >
        <div className="bg-green-500/0">
          <div className="relative w-full pr-8 pb-8 bg-red-500/0">
            <div className="relative">
              <div ref={row3MainImageRef}>
                <Image
                  src="/images/dashboard-partner-main.svg"
                  alt=""
                  width={600}
                  height={400}
                  className="object-contain rounded-lg w-full h-auto"
                />
              </div>

              <Image
                ref={row3SmallImageRef}
                src="/images/dashboard-partner-small.svg"
                alt=""
                width={200}
                height={100}
                className="object-contain absolute bottom-0 right-0 h-auto"
              />
            </div>
          </div>
        </div>
        <div ref={row3ContentRef} className="bg-yellow-500/0">
          <h2 className="text-3xl font-bold mb-4 text-white">Borrowers</h2>
          <div className="text-lg text-white/80 mb-8">
            Borrowers move from enquiry to drawdown in a structured, transparent
            journey.
          </div>
          <div className="flex flex-col gap-y-6">
            <IconBoxHorizontal src="/icons/white/electricity-simple.svg">
              <div className="max-w-[400px]">
                <span className="font-semibold text-white">
                  Receive instant offer <br></br>
                </span>{" "}
                that improves as you add more details
              </div>
            </IconBoxHorizontal>

            <IconBoxHorizontal src="/icons/white/rocket-simple.svg">
              <div className="max-w-[340px]">
                <span className="font-semibold text-white">
                  Complete in &lt; 2 days<br></br>
                </span>{" "}
                meet deadlines, seize opportunities
              </div>
            </IconBoxHorizontal>

            <IconBoxHorizontal src="/icons/white/path-arrows.svg">
              <div className="max-w-[440px]">
                <span className="font-semibold text-white">
                  Always know your status and next steps<br></br>
                </span>{" "}
                no chasing, no guessing, consistent outcomes
              </div>
            </IconBoxHorizontal>
          </div>
        </div>
      </div>
    </div>
  );
}
