import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

interface TooltipProps {
  top?: string;
  left?: string;
  content: React.ReactNode;
  direction?: "top" | "right" | "bottom" | "left";
  position?: "center" | "left" | "right";
  maxWidth?: number | string;
  lineWidth?: number | string;
  anchorToParentBounds?: boolean;
  lineToParentEdge?: boolean;
  edgeOffsetX?: number;
  edgeOffsetY?: number;
  icon?: string;
  delay?: number;
  portal?: boolean;
}

export function Tooltip({
  top,
  left,
  content,
  direction = "right",
  position = "center",
  maxWidth = "350px",
  lineWidth = 40,
  anchorToParentBounds = false,
  lineToParentEdge = false,
  edgeOffsetX = 0,
  edgeOffsetY = 0,
  icon = "fa-question-circle",
  delay = 0,
  portal = true,
}: TooltipProps) {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [anchorPos, setAnchorPos] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [dynamicLineWidth, setDynamicLineWidth] = useState<number | null>(null);
  const [viewportNudgeX, setViewportNudgeX] = useState(0);
  const lastAnchorPosRef = useRef<{ top: number; left: number } | null>(null);
  const lastDynamicLineWidthRef = useRef<number | null>(null);
  const portalContainerRef = useRef<HTMLDivElement | null>(null);
  const [portalContainerReady, setPortalContainerReady] = useState(false);

  // If top/left are not provided, auto-position on the parent element's edge
  // corresponding to the direction the tooltip will open toward.
  const computedTop =
    top ??
    (direction === "top" ? "0%" : direction === "bottom" ? "100%" : "50%");

  const computedLeft =
    left ??
    (direction === "left" ? "0%" : direction === "right" ? "100%" : "50%");

  const autoEdgeOffsetPx = 8;
  const edgeOffset = {
    x:
      left == null
        ? direction === "right"
          ? autoEdgeOffsetPx
          : direction === "left"
            ? -autoEdgeOffsetPx
            : 0
        : 0,
    y:
      top == null
        ? direction === "bottom"
          ? autoEdgeOffsetPx
          : direction === "top"
            ? -autoEdgeOffsetPx
            : 0
        : 0,
  };

  const gap = 4; // dot radius (8px width / 2)
  const resolvedLineWidth = dynamicLineWidth ?? lineWidth;
  const lw =
    typeof resolvedLineWidth === "number"
      ? `${resolvedLineWidth}px`
      : resolvedLineWidth;
  const boxOffset = `calc(${gap}px + ${lw})`;

  const maxWidthCss = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
  const boxMaxWidth = maxWidthCss
    ? `min(${maxWidthCss}, calc(100vw - 32px))`
    : "calc(100vw - 32px)";

  const crossAxisOffset =
    position === "left" ? "-5%" : position === "right" ? "-100%" : "-50%";

  useEffect(() => {
    if (!portal) {
      setPortalContainerReady(false);
      return;
    }
    if (typeof document === "undefined") return;

    const el = document.createElement("div");
    el.setAttribute("data-tooltip-portal", "");
    document.body.appendChild(el);
    portalContainerRef.current = el;
    setPortalContainerReady(true);

    return () => {
      setPortalContainerReady(false);
      if (portalContainerRef.current && portalContainerRef.current.parentNode) {
        portalContainerRef.current.parentNode.removeChild(
          portalContainerRef.current,
        );
      }
      portalContainerRef.current = null;
    };
  }, [portal]);

  useLayoutEffect(() => {
    let rafId: number | null = null;
    let loopId: number | null = null;
    const update = () => {
      const el = anchorRef.current;
      if (!el) return;
      const parent =
        el.offsetParent instanceof HTMLElement
          ? el.offsetParent
          : el.parentElement;
      const rect = el.getBoundingClientRect();
      if (portal) {
        const parentRect = parent?.getBoundingClientRect();
        const nextAnchorPos =
          anchorToParentBounds && parentRect && top == null && left == null
            ? {
                top: Math.round(
                  (direction === "top"
                    ? parentRect.top
                    : direction === "bottom"
                      ? parentRect.bottom
                      : parentRect.top + parentRect.height / 2) + edgeOffset.y,
                ),
                left: Math.round(
                  (direction === "left"
                    ? parentRect.left
                    : direction === "right"
                      ? parentRect.right
                      : parentRect.left + parentRect.width / 2) + edgeOffset.x,
                ),
              }
            : {
                top: Math.round(rect.top + edgeOffset.y),
                left: Math.round(rect.left + edgeOffset.x),
              };

        if (
          lastAnchorPosRef.current?.top !== nextAnchorPos.top ||
          lastAnchorPosRef.current?.left !== nextAnchorPos.left
        ) {
          lastAnchorPosRef.current = nextAnchorPos;
          setAnchorPos(nextAnchorPos);
        }
      }

      if (lineToParentEdge) {
        if (!parent) {
          if (lastDynamicLineWidthRef.current !== null) {
            lastDynamicLineWidthRef.current = null;
            setDynamicLineWidth(null);
          }
          return;
        }

        const parentRect = parent.getBoundingClientRect();
        const anchorX = rect.left - parentRect.left;
        const anchorY = rect.top - parentRect.top;

        const nextLineWidth =
          direction === "bottom"
            ? parentRect.height - anchorY + edgeOffsetY
            : direction === "top"
              ? anchorY + edgeOffsetY
              : direction === "right"
                ? parentRect.width - anchorX + edgeOffsetX
                : anchorX + edgeOffsetX;

        if (lastDynamicLineWidthRef.current !== nextLineWidth) {
          lastDynamicLineWidthRef.current = nextLineWidth;
          setDynamicLineWidth(Math.max(0, Math.round(nextLineWidth)));
        }
      } else {
        if (lastDynamicLineWidthRef.current !== null) {
          lastDynamicLineWidthRef.current = null;
          setDynamicLineWidth(null);
        }
      }
    };

    const scheduleUpdate = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        update();
      });
    };

    const loopUpdate = () => {
      loopId = window.requestAnimationFrame(loopUpdate);
      update();
    };

    update();
    loopUpdate();

    const ro = new ResizeObserver(() => scheduleUpdate());
    if (anchorRef.current) ro.observe(anchorRef.current);
    const parent =
      anchorRef.current?.offsetParent instanceof HTMLElement
        ? anchorRef.current.offsetParent
        : anchorRef.current?.parentElement;
    if (parent) ro.observe(parent);

    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, true);
    return () => {
      if (rafId != null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate, true);
      ro.disconnect();
    };
  }, [
    computedTop,
    computedLeft,
    direction,
    edgeOffset.x,
    edgeOffset.y,
    edgeOffsetX,
    edgeOffsetY,
    lineToParentEdge,
    portal,
  ]);

  useLayoutEffect(() => {
    if (!portal) return;
    if (!anchorPos) return;
    const clamp = () => {
      const el = boxRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const padding = 8;
      const vw = window.innerWidth;
      let nudge = 0;
      if (rect.left < padding) nudge = padding - rect.left;
      if (rect.right > vw - padding) nudge = vw - padding - rect.right;
      const axisNudge =
        direction === "top" || direction === "bottom" ? nudge : 0;
      setViewportNudgeX(Math.round(axisNudge));
    };

    const raf = window.requestAnimationFrame(clamp);
    return () => window.cancelAnimationFrame(raf);
  }, [anchorPos, content, direction, position, lw, boxMaxWidth, portal]);

  // Box positions push outward from the exact 0x0 center point
  const boxStyles: Record<string, any> = {
    top: { bottom: boxOffset, left: 0, x: crossAxisOffset },
    right: { left: boxOffset, top: 0, y: crossAxisOffset },
    bottom: { top: boxOffset, left: 0, x: crossAxisOffset },
    left: { right: boxOffset, top: 0, y: crossAxisOffset },
  };

  // Line connects the outer edge of the dot to the inner edge of the box
  // originY/originX are Framer Motion values (0 = start, 1 = end of element)
  // For each direction the "tooltip side" is the far end from the dot:
  //   top    → box is above    → scale from top of element    → originY: 0
  //   bottom → box is below    → scale from bottom of element → originY: 1
  //   right  → box is right    → scale from right of element  → originX: 1
  //   left   → box is left     → scale from left of element   → originX: 0
  const lineStyles: Record<string, any> = {
    top: {
      bottom: gap,
      left: 0,
      x: "-50%",
      height: lw,
      borderLeftWidth: "1px",
      originY: 0,
    },
    right: {
      left: gap,
      top: 0,
      y: "-50%",
      width: lw,
      borderTopWidth: "1px",
      originX: 1,
    },
    bottom: {
      top: gap,
      left: 0,
      x: "-50%",
      height: lw,
      borderLeftWidth: "1px",
      originY: 1,
    },
    left: {
      right: gap,
      top: 0,
      y: "-50%",
      width: lw,
      borderTopWidth: "1px",
      originX: 0,
    },
  };

  const lineInitial = (dir: string) => {
    if (dir === "top" || dir === "bottom") return { scaleY: 0, opacity: 0 };
    return { scaleX: 0, opacity: 0 };
  };

  const lineAnimate = (dir: string) => {
    if (dir === "top" || dir === "bottom") return { scaleY: 1, opacity: 1 };
    return { scaleX: 1, opacity: 1 };
  };

  const tooltipDelay = delay;
  const connectorDelay = delay + 0.35;
  const dotDelay = connectorDelay + 0.4;

  const tooltipBody = (
    <div
      className="relative w-0 h-0"
      style={
        portal
          ? {
              position: "fixed",
              top: anchorPos?.top ?? 0,
              left: anchorPos?.left ?? 0,
              zIndex: 9999,
              transform: `translate3d(${viewportNudgeX}px, 0, 0)`,
            }
          : {
              position: "absolute",
              top: computedTop,
              left: computedLeft,
              zIndex: 50,
              transform: `translate(${edgeOffset.x}px, ${edgeOffset.y}px)`,
            }
      }
    >
      {/* Solid black dot anchored at exact center */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-black z-10"
        style={{ top: 0, left: 0, x: "-50%", y: "-50%" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{
          scale: 0,
          opacity: 0,
          transition: { duration: 0.5, delay: 0, ease: "easeInOut" },
        }}
        transition={{ duration: 0.4, delay: dotDelay, ease: [0.16, 1, 0.3, 1] }}
      ></motion.div>

      {/* Connecting line appended to the dot */}
      <motion.div
        className="absolute border-dashed border-black"
        style={lineStyles[direction]}
        initial={lineInitial(direction)}
        animate={lineAnimate(direction)}
        exit={{
          ...lineInitial(direction),
          transition: { duration: 0.5, delay: 0, ease: "easeInOut" },
        }}
        transition={{
          duration: 0.5,
          delay: connectorDelay,
          ease: [0.16, 1, 0.3, 1],
        }}
      ></motion.div>

      {/* Tooltip content box */}
      <motion.div
        ref={boxRef}
        className="absolute w-max bg-[#000]/90 rounded-[12px] p-3 overflow-hidden origin-center break-words"
        style={{ ...boxStyles[direction], maxWidth: boxMaxWidth }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{
          opacity: 0,
          scale: 0.8,
          transition: { duration: 0.5, delay: 0, ease: "easeInOut" },
        }}
        transition={{
          duration: 0.5,
          delay: tooltipDelay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Top-right decorative elements */}
        <div className="absolute -top-14 -right-16 w-32 h-22 bg-white/20 blur-xl rounded-full pointer-events-none"></div>

        <div className="flex gap-3 relative z-10">
          {icon && (
            <div className="flex-shrink-0">
              <i className={`fas ${icon} text-white/90 text-sm`}></i>
            </div>
          )}
          <div className="text-sm md:text-md text-white/80 leading-[1.5em]">
            {content}
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <>
      <div
        ref={anchorRef}
        className="absolute"
        style={{ top: computedTop, left: computedLeft, width: 0, height: 0 }}
      />
      {portal
        ? portalContainerReady && anchorPos && portalContainerRef.current
          ? createPortal(tooltipBody, portalContainerRef.current)
          : null
        : tooltipBody}
    </>
  );
}
