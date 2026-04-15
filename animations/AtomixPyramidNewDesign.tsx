import React, { CSSProperties, useEffect, useRef } from "react";
import * as THREE from "three";

type VertexKey = "b1" | "b2" | "b3";

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface AtomixConfig {
  dragMode: boolean;
  canvasHeight: number;
  maxWidth: number;
  padding: number;
  colors: {
    background: number;
    sideFace: number;
    sideSpecular: number;
    baseFace: number;
    baseSpecular: number;
    apexEdge: number;
    baseEdge: number;
    bar: number;
    barSpecular: number;
    leaderStroke: string;
    edgeLabelText: string;
    sliderThumbA: string;
    sliderThumbB: string;
    sliderTrack: string;
    sliderLabel: string;
  };
  pyramidScale: number;
  heightRatio: number;
  baseRatio: number;
  baseCentreY: number;
  barCylRadius: number;
  barSphereRadius: number;
  lighting: {
    ambientIntensity: number;
    keyIntensity: number;
    keyPosition: [number, number, number];
    fillIntensity: number;
    fillPosition: [number, number, number];
    rimIntensity: number;
    rimPosition: [number, number, number];
    sideShininess: number;
    baseShininess: number;
    barShininess: number;
  };
  camera: {
    fov: number;
    distance: number;
  };
  rotation: {
    startX: number;
    endX: number;
    startY: number;
    endY: number;
    sliderSmoothing: number;
    spinSpeed: number;
    spinThreshold: number;
    decayHalfLife: number;
  };
  edgeLabels: {
    texts: [string, string, string];
    fontSize: number;
    fontWeight: number;
    worldHeight: number;
    edgeOffset: number;
  };
  logo: {
    svgBase64: string | null;
    worldHeight: number;
    verticalOffset: number;
    canvasWidth: number;
    canvasHeight: number;
  };
  dashedEdges: {
    dashSize: number;
    gapSize: number;
    fadeStart: number;
    fadeEnd: number;
    maxOpacity: number;
  };
  slider: {
    leftLabel: string;
    rightLabel: string;
  };
  callouts: {
    fadeRange: number;
    offsets: Record<VertexKey, { dx: number; dy: number }>;
    b1: { title: string; lines: Array<{ positive: boolean; text: string }> };
    b2: { title: string; lines: Array<{ positive: boolean; text: string }> };
    b3: { title: string; lines: Array<{ positive: boolean; text: string }> };
    style: {
      background: string;
      border: string;
      borderRadius: string;
      titleColor: string;
      titleSize: string;
      lineColor: string;
      lineSize: string;
      yesColor: string;
      noColor: string;
      minWidth: string;
      maxWidth: string;
      leaderWidth: number;
      leaderDash: string;
    };
  };
  apexCallout: {
    fadeStart: number;
    fadeEnd: number;
    offset: { dx: number; dy: number };
    text: string;
    style: {
      background: string;
      border: string;
      borderRadius: string;
      textColor: string;
      fontSize: string;
      lineHeight: string;
      maxWidth: string;
    };
  };
}

export interface AtomixPyramidExplorerProps {
  config?: DeepPartial<AtomixConfig>;
  className?: string;
  style?: CSSProperties;
  initialSliderValue?: number;
  onReady?: (api: { setSlider: (value: number) => void }) => void;
}

const LOGO_SVG_B64 = "";

const DEFAULTS: AtomixConfig = {
  dragMode: false,
  canvasHeight: 480,
  maxWidth: 800,
  padding: 20,
  colors: {
    background: 0x000000,
    sideFace: 0x0a4a4a,
    sideSpecular: 0x1a8888,
    baseFace: 0x8888aa,
    baseSpecular: 0xaaaacc,
    apexEdge: 0x1a7a7a,
    baseEdge: 0x534ab7,
    bar: 0xb48c50,
    barSpecular: 0xddbb88,
    leaderStroke: "#b48c50",
    edgeLabelText: "#88EEBB",
    sliderThumbA: "#1D9E75",
    sliderThumbB: "#534AB7",
    sliderTrack: "#2a2a3e",
    sliderLabel: "#777",
  },
  pyramidScale: 2.2,
  heightRatio: 1.6,
  baseRatio: 1,
  baseCentreY: 0.3,
  barCylRadius: 0.04,
  barSphereRadius: 0.08,
  lighting: {
    ambientIntensity: 0.35,
    keyIntensity: 0.85,
    keyPosition: [4, 5, 6],
    fillIntensity: 0.3,
    fillPosition: [-5, 2, 4],
    rimIntensity: 0.15,
    rimPosition: [0, -3, -5],
    sideShininess: 50,
    baseShininess: 25,
    barShininess: 60,
  },
  camera: {
    fov: 45,
    distance: 10.5,
  },
  rotation: {
    startX: -Math.PI * 0.5,
    endX: 0.15,
    startY: Math.PI / 3,
    endY: 0.65 + Math.PI / 3,
    sliderSmoothing: 0.1,
    spinSpeed: 0.5,
    spinThreshold: 0.9,
    decayHalfLife: 0.3,
  },
  edgeLabels: {
    texts: ["Fully automated", "Cheap to build", "Complex loan logic"],
    fontSize: 14,
    fontWeight: 600,
    worldHeight: 0.4,
    edgeOffset: 0.3,
  },
  logo: {
    svgBase64: null,
    worldHeight: 0.55,
    verticalOffset: 0.5,
    canvasWidth: 880,
    canvasHeight: 222,
  },
  dashedEdges: {
    dashSize: 0.1,
    gapSize: 0.07,
    fadeStart: 0.3,
    fadeEnd: 0.6,
    maxOpacity: 0.4,
  },
  slider: {
    leftLabel: "Legacy technology",
    rightLabel: "Atomix",
  },
  callouts: {
    fadeRange: 0.15,
    offsets: {
      b1: { dx: -220, dy: -117 },
      b2: { dx: 108, dy: -49 },
      b3: { dx: 41, dy: -123 },
    },
    b1: {
      title: "Bespoke build",
      lines: [
        { positive: true, text: "Automated" },
        { positive: true, text: "Complex logic" },
        { positive: false, text: "£600k, slow to change" },
      ],
    },
    b2: {
      title: "Simple SaaS",
      lines: [
        { positive: true, text: "Automated" },
        { positive: true, text: "Cheap to build" },
        { positive: false, text: "Simple products only" },
      ],
    },
    b3: {
      title: "Siloed modules",
      lines: [
        { positive: true, text: "Complex logic" },
        { positive: true, text: "Cheap to build" },
        { positive: false, text: "Not automated (human glue)" },
      ],
    },
    style: {
      background: "rgba(30,30,50,0.92)",
      border: "1px solid rgba(180,140,80,0.5)",
      borderRadius: "8px",
      titleColor: "#ddb866",
      titleSize: "13px",
      lineColor: "#ccc",
      lineSize: "11.5px",
      yesColor: "#6be0a0",
      noColor: "#e06b6b",
      minWidth: "170px",
      maxWidth: "210px",
      leaderWidth: 1.5,
      leaderDash: "4,3",
    },
  },
  apexCallout: {
    fadeStart: 0.85,
    fadeEnd: 1,
    offset: { dx: 161, dy: -62 },
    text: "Declarative policy specifications mean the business logic can be complex, changed cheaply and executed automatically.",
    style: {
      background: "rgba(15,25,40,0.92)",
      border: "1px solid rgba(32,204,252,0.6)",
      borderRadius: "8px",
      textColor: "#c0dde8",
      fontSize: "12px",
      lineHeight: "1.55",
      maxWidth: "260px",
    },
  },
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge<T>(target: T, source?: DeepPartial<T>): T {
  if (!source) return target;
  const result: Record<string, unknown> = {
    ...(target as Record<string, unknown>),
  };

  Object.keys(source).forEach((key) => {
    const sourceValue = (source as Record<string, unknown>)[key];
    const targetValue = (target as Record<string, unknown>)[key];

    if (isObject(sourceValue) && isObject(targetValue)) {
      result[key] = deepMerge(targetValue, sourceValue);
    } else if (sourceValue !== undefined) {
      result[key] = sourceValue;
    }
  });

  return result as T;
}

const AtomixPyramidExplorer: React.FC<AtomixPyramidExplorerProps> = ({
  config,
  className,
  style,
  initialSliderValue = 0,
  onReady,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cfg = deepMerge(DEFAULTS, config);
    if (!cfg.logo.svgBase64) cfg.logo.svgBase64 = LOGO_SVG_B64 || null;

    root.innerHTML = "";
    root.style.position = "relative";
    root.style.width = "100%";
    root.style.maxWidth = `${cfg.maxWidth}px`;
    root.style.fontFamily =
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";

    const wrapper = document.createElement("div");
    wrapper.style.cssText = `position:relative;width:100%;height:${cfg.canvasHeight}px;overflow:hidden;`;
    root.appendChild(wrapper);

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "display:block;width:100%;height:100%;";
    wrapper.appendChild(canvas);

    const overlay = document.createElement("div");
    overlay.style.cssText =
      "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:visible;";
    wrapper.appendChild(overlay);

    const leaderSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    leaderSvg.style.cssText =
      "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;";
    overlay.appendChild(leaderSvg);

    const leaderLines = {} as Record<VertexKey, SVGLineElement>;
    (["b1", "b2", "b3"] as VertexKey[]).forEach((key) => {
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      line.setAttribute("stroke", cfg.colors.leaderStroke);
      line.setAttribute("stroke-width", String(cfg.callouts.style.leaderWidth));
      line.setAttribute("stroke-dasharray", cfg.callouts.style.leaderDash);
      leaderSvg.appendChild(line);
      leaderLines[key] = line;
    });

    const buildCalloutEl = (
      data: {
        title: string;
        lines: Array<{ positive: boolean; text: string }>;
      },
      styleConfig: AtomixConfig["callouts"]["style"],
    ) => {
      const outer = document.createElement("div");
      outer.style.cssText = "position:absolute;transition:opacity 0.15s ease;";
      const box = document.createElement("div");
      box.style.cssText = `background:${styleConfig.background};border:${styleConfig.border};border-radius:${styleConfig.borderRadius};padding:10px 14px;min-width:${styleConfig.minWidth};max-width:${styleConfig.maxWidth};`;
      const title = document.createElement("div");
      title.style.cssText = `color:${styleConfig.titleColor};font-size:${styleConfig.titleSize};font-weight:700;margin-bottom:6px;letter-spacing:0.02em;`;
      title.textContent = data.title;
      box.appendChild(title);
      data.lines.forEach((lineData) => {
        const div = document.createElement("div");
        div.style.cssText = `font-size:${styleConfig.lineSize};line-height:1.5;color:${styleConfig.lineColor};`;
        const prefix = document.createElement("span");
        prefix.style.color = lineData.positive
          ? styleConfig.yesColor
          : styleConfig.noColor;
        prefix.textContent = lineData.positive ? "✓ " : "✗ ";
        div.appendChild(prefix);
        div.appendChild(document.createTextNode(lineData.text));
        box.appendChild(div);
      });
      outer.appendChild(box);
      return outer;
    };

    const calloutEls = {} as Record<VertexKey, HTMLDivElement>;
    (["b1", "b2", "b3"] as VertexKey[]).forEach((key) => {
      const el = buildCalloutEl(cfg.callouts[key], cfg.callouts.style);
      overlay.appendChild(el);
      calloutEls[key] = el;
    });

    const apexEl = document.createElement("div");
    apexEl.style.cssText =
      "position:absolute;transition:opacity 0.15s ease;opacity:0;";
    const apexBox = document.createElement("div");
    const apexStyle = cfg.apexCallout.style;
    apexBox.style.cssText = `background:${apexStyle.background};border:${apexStyle.border};border-radius:${apexStyle.borderRadius};padding:10px 14px;max-width:${apexStyle.maxWidth};`;
    const apexText = document.createElement("div");
    apexText.style.cssText = `color:${apexStyle.textColor};font-size:${apexStyle.fontSize};line-height:${apexStyle.lineHeight};`;
    apexText.textContent = cfg.apexCallout.text;
    apexBox.appendChild(apexText);
    apexEl.appendChild(apexBox);
    overlay.appendChild(apexEl);

    const sliderRow = document.createElement("div");
    sliderRow.style.cssText =
      "display:flex;align-items:center;gap:16px;padding:24px 20px 12px;";
    const labelStyle = `font-size:12px;font-weight:500;color:${cfg.colors.sliderLabel};flex-shrink:0;letter-spacing:0.02em;text-transform:uppercase;`;

    const leftLabel = document.createElement("span");
    leftLabel.style.cssText = labelStyle;
    leftLabel.textContent = cfg.slider.leftLabel;

    const rightLabel = document.createElement("span");
    rightLabel.style.cssText = labelStyle;
    rightLabel.textContent = cfg.slider.rightLabel;

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = "100";
    slider.value = String(Math.max(0, Math.min(100, initialSliderValue)));
    slider.style.cssText = `flex:1;-webkit-appearance:none;appearance:none;height:6px;border-radius:3px;background:${cfg.colors.sliderTrack};outline:none;cursor:pointer;`;

    const thumbCSS = document.createElement("style");
    thumbCSS.textContent =
      `input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,${cfg.colors.sliderThumbA},${cfg.colors.sliderThumbB});cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.2);}` +
      `input[type=range]::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,${cfg.colors.sliderThumbA},${cfg.colors.sliderThumbB});cursor:pointer;border:none;box-shadow:0 2px 6px rgba(0,0,0,0.2);}`;
    document.head.appendChild(thumbCSS);

    sliderRow.appendChild(leftLabel);
    sliderRow.appendChild(slider);
    sliderRow.appendChild(rightLabel);
    root.appendChild(sliderRow);

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(cfg.colors.background, 1);

    const camera = new THREE.PerspectiveCamera(cfg.camera.fov, 1, 0.1, 100);
    camera.position.set(0, 0, cfg.camera.distance);
    camera.lookAt(0, 0, 0);

    const lt = cfg.lighting;
    scene.add(new THREE.AmbientLight(0xffffff, lt.ambientIntensity));

    const keyLight = new THREE.DirectionalLight(0xffffff, lt.keyIntensity);
    keyLight.position.set(...lt.keyPosition);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, lt.fillIntensity);
    fillLight.position.set(...lt.fillPosition);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, lt.rimIntensity);
    rimLight.position.set(...lt.rimPosition);
    scene.add(rimLight);

    const pyramidGroup = new THREE.Group();
    scene.add(pyramidGroup);

    const S = cfg.pyramidScale;
    const H = S * cfg.heightRatio;
    const R = S * cfg.baseRatio;
    const by = -H * cfg.baseCentreY;
    const ay = H + by;

    const rawApex = new THREE.Vector3(0, ay, 0);
    const rawB1 = new THREE.Vector3(
      -R * Math.cos(Math.PI / 6),
      by,
      -R * Math.sin(Math.PI / 6),
    );
    const rawB2 = new THREE.Vector3(
      R * Math.cos(Math.PI / 6),
      by,
      -R * Math.sin(Math.PI / 6),
    );
    const rawB3 = new THREE.Vector3(0, by, R);

    const pivotApexWeight = 0.4;
    const pivotBaseWeight = (1 - pivotApexWeight) / 3;
    const centroid = new THREE.Vector3()
      .addScaledVector(rawApex, pivotApexWeight)
      .addScaledVector(rawB1, pivotBaseWeight)
      .addScaledVector(rawB2, pivotBaseWeight)
      .addScaledVector(rawB3, pivotBaseWeight);

    const apex = rawApex.clone().sub(centroid);
    const b1 = rawB1.clone().sub(centroid);
    const b2 = rawB2.clone().sub(centroid);
    const b3 = rawB3.clone().sub(centroid);

    const sideMat = new THREE.MeshPhongMaterial({
      color: cfg.colors.sideFace,
      side: THREE.DoubleSide,
      shininess: lt.sideShininess,
      specular: new THREE.Color(cfg.colors.sideSpecular),
    });

    const baseMat = new THREE.MeshPhongMaterial({
      color: cfg.colors.baseFace,
      side: THREE.DoubleSide,
      shininess: lt.baseShininess,
      specular: new THREE.Color(cfg.colors.baseSpecular),
    });

    const triMesh = (
      a: THREE.Vector3,
      b: THREE.Vector3,
      c: THREE.Vector3,
      mat: THREE.Material,
    ) => {
      const g = new THREE.BufferGeometry();
      g.setAttribute(
        "position",
        new THREE.BufferAttribute(
          new Float32Array([a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z]),
          3,
        ),
      );
      g.computeVertexNormals();
      return new THREE.Mesh(g, mat);
    };

    const makeEdgeLine = (
      a: THREE.Vector3,
      b: THREE.Vector3,
      color: THREE.Color,
      dashed: boolean,
    ) => {
      const g = new THREE.BufferGeometry().setFromPoints([a, b]);
      const de = cfg.dashedEdges;
      const m = dashed
        ? new THREE.LineDashedMaterial({
            color,
            dashSize: de.dashSize,
            gapSize: de.gapSize,
            transparent: true,
            opacity: de.maxOpacity,
          })
        : new THREE.LineBasicMaterial({ color });
      const l = new THREE.Line(g, m);
      if (dashed) l.computeLineDistances();
      return l;
    };

    pyramidGroup.add(triMesh(apex, b1, b2, sideMat));
    pyramidGroup.add(triMesh(apex, b2, b3, sideMat));
    pyramidGroup.add(triMesh(apex, b3, b1, sideMat));
    pyramidGroup.add(triMesh(b1, b3, b2, baseMat));

    const TC = new THREE.Color(cfg.colors.apexEdge);
    const PC = new THREE.Color(cfg.colors.baseEdge);
    pyramidGroup.add(makeEdgeLine(apex, b1, TC, false));
    pyramidGroup.add(makeEdgeLine(apex, b2, TC, false));
    pyramidGroup.add(makeEdgeLine(apex, b3, TC, false));
    pyramidGroup.add(makeEdgeLine(b1, b2, PC, false));
    pyramidGroup.add(makeEdgeLine(b2, b3, PC, false));
    pyramidGroup.add(makeEdgeLine(b3, b1, PC, false));

    const dEdges = [
      makeEdgeLine(apex, b1, TC, true),
      makeEdgeLine(apex, b2, TC, true),
      makeEdgeLine(apex, b3, TC, true),
      makeEdgeLine(b1, b2, PC, true),
      makeEdgeLine(b2, b3, PC, true),
      makeEdgeLine(b3, b1, PC, true),
    ];
    dEdges.forEach((edge) => {
      edge.visible = false;
      pyramidGroup.add(edge);
    });

    const barMat = new THREE.MeshPhongMaterial({
      color: cfg.colors.bar,
      shininess: lt.barShininess,
      specular: new THREE.Color(cfg.colors.barSpecular),
    });

    const makeCapsule = (from: THREE.Vector3, to: THREE.Vector3) => {
      const group = new THREE.Group();
      const dir = new THREE.Vector3().subVectors(to, from);
      const len = dir.length();
      dir.normalize();

      const cylGeo = new THREE.CylinderGeometry(
        cfg.barCylRadius,
        cfg.barCylRadius,
        len,
        12,
        1,
      );
      group.add(new THREE.Mesh(cylGeo, barMat));

      const capGeo = new THREE.SphereGeometry(cfg.barSphereRadius, 16, 12);
      const topCap = new THREE.Mesh(capGeo, barMat);
      topCap.position.y = len / 2;
      group.add(topCap);

      const botCap = new THREE.Mesh(capGeo, barMat);
      botCap.position.y = -len / 2;
      group.add(botCap);

      group.position.copy(
        new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5),
      );
      group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      return group;
    };

    pyramidGroup.add(makeCapsule(b1, apex));
    pyramidGroup.add(makeCapsule(b2, apex));
    pyramidGroup.add(makeCapsule(b3, apex));

    const makeTextPlane = (
      text: string,
      color: string,
      fontSize: number,
      fontWeight: number,
      worldHeight: number,
    ) => {
      const c2 = document.createElement("canvas");
      const ctx = c2.getContext("2d");
      if (!ctx) return new THREE.Mesh();

      const dpr = 2;
      const font = `${fontWeight} ${fontSize * dpr}px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`;
      ctx.font = font;
      const tw = Math.ceil(ctx.measureText(text).width) + 12 * dpr;
      const th = Math.ceil(fontSize * dpr * 1.5) + 8 * dpr;

      c2.width = tw;
      c2.height = th;
      ctx.clearRect(0, 0, tw, th);
      ctx.font = font;
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, tw / 2, th / 2);

      const texture = new THREE.CanvasTexture(c2);
      texture.minFilter = THREE.LinearFilter;
      const aspect = tw / th;
      const geo = new THREE.PlaneGeometry(worldHeight * aspect, worldHeight);
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      return new THREE.Mesh(geo, mat);
    };

    const edgeLabelCfg = cfg.edgeLabels;
    const edgeMeshes = edgeLabelCfg.texts.map((text) =>
      makeTextPlane(
        text,
        cfg.colors.edgeLabelText,
        edgeLabelCfg.fontSize,
        edgeLabelCfg.fontWeight,
        edgeLabelCfg.worldHeight,
      ),
    );

    const baseCentroid = new THREE.Vector3()
      .add(b1)
      .add(b2)
      .add(b3)
      .divideScalar(3);
    const edgeMidpoint = (a: THREE.Vector3, b: THREE.Vector3) =>
      new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
    const pushOutward = (
      pt: THREE.Vector3,
      centroidPoint: THREE.Vector3,
      amount: number,
    ) =>
      pt
        .clone()
        .add(
          new THREE.Vector3()
            .subVectors(pt, centroidPoint)
            .normalize()
            .multiplyScalar(amount),
        );

    const edgePairs = [
      { mesh: edgeMeshes[0], from: b1, to: b2 },
      { mesh: edgeMeshes[1], from: b2, to: b3 },
      { mesh: edgeMeshes[2], from: b3, to: b1 },
    ];

    const edgeLabelsData: Array<{
      mesh: THREE.Mesh;
      xAxis: THREE.Vector3;
      yStart: THREE.Vector3;
      yEnd: THREE.Vector3;
    }> = [];

    edgePairs.forEach((ep) => {
      const mid = edgeMidpoint(ep.from, ep.to);
      ep.mesh.position.copy(
        pushOutward(mid, baseCentroid, edgeLabelCfg.edgeOffset),
      );
      pyramidGroup.add(ep.mesh);

      const xAxis = new THREE.Vector3().subVectors(ep.to, ep.from).normalize();
      const radialOut = new THREE.Vector3(mid.x, 0, mid.z).normalize();
      const radialPerp = radialOut
        .clone()
        .sub(xAxis.clone().multiplyScalar(radialOut.dot(xAxis)))
        .normalize();
      const testZ = new THREE.Vector3().crossVectors(xAxis, radialPerp);
      if (testZ.y > 0) xAxis.negate();
      const toApex = new THREE.Vector3().subVectors(apex, mid).normalize();
      const apexPerp = toApex
        .clone()
        .sub(xAxis.clone().multiplyScalar(toApex.dot(xAxis)))
        .normalize();
      edgeLabelsData.push({
        mesh: ep.mesh,
        xAxis,
        yStart: radialPerp,
        yEnd: apexPerp,
      });
    });

    const makeLogoSprite = (b64: string | null) => {
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          transparent: true,
          depthTest: true,
          depthWrite: false,
          sizeAttenuation: true,
        }),
      );
      sprite.scale.set(1.8, 0.45, 1);
      if (!b64) return sprite;

      const img = new Image();
      img.onload = () => {
        const c2 = document.createElement("canvas");
        c2.width = cfg.logo.canvasWidth;
        c2.height = cfg.logo.canvasHeight;
        const context = c2.getContext("2d");
        if (!context) return;
        context.drawImage(img, 0, 0, c2.width, c2.height);
        const tex = new THREE.CanvasTexture(c2);
        tex.minFilter = THREE.LinearFilter;
        const material = sprite.material as THREE.SpriteMaterial;
        material.map = tex;
        material.needsUpdate = true;
        sprite.scale.set(
          (cfg.logo.worldHeight * c2.width) / c2.height,
          cfg.logo.worldHeight,
          1,
        );
      };
      img.src = `data:image/svg+xml;base64,${b64}`;
      return sprite;
    };

    const spriteApex = makeLogoSprite(cfg.logo.svgBase64);
    spriteApex.position
      .copy(apex)
      .add(new THREE.Vector3(0, cfg.logo.verticalOffset, 0));
    pyramidGroup.add(spriteApex);

    const resize = () => {
      const w = wrapper.clientWidth;
      const h = wrapper.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener("resize", resize);

    const rot = cfg.rotation;
    const calloutOffsets: Record<VertexKey, { dx: number; dy: number }> = {
      b1: { ...cfg.callouts.offsets.b1 },
      b2: { ...cfg.callouts.offsets.b2 },
      b3: { ...cfg.callouts.offsets.b3 },
    };
    const apexDescOffset = { ...cfg.apexCallout.offset };

    if (cfg.dragMode) {
      const readout = document.createElement("div");
      readout.style.cssText =
        "padding:8px 20px;font-size:11px;font-family:monospace;color:#999;white-space:pre;user-select:all;cursor:text;";
      root.appendChild(readout);

      const updateReadout = () => {
        readout.textContent =
          `b1: { dx: ${calloutOffsets.b1.dx}, dy: ${calloutOffsets.b1.dy} }  ` +
          `b2: { dx: ${calloutOffsets.b2.dx}, dy: ${calloutOffsets.b2.dy} }  ` +
          `b3: { dx: ${calloutOffsets.b3.dx}, dy: ${calloutOffsets.b3.dy} }  ` +
          `apex: { dx: ${apexDescOffset.dx}, dy: ${apexDescOffset.dy} }`;
      };

      updateReadout();

      const enableDrag = (
        el: HTMLElement,
        offsetObj: { dx: number; dy: number },
        updateFn: () => void,
      ) => {
        el.style.pointerEvents = "auto";
        el.style.cursor = "grab";

        let dragging = false;
        let sx = 0;
        let sy = 0;
        let sdx = 0;
        let sdy = 0;

        el.addEventListener("mousedown", (e) => {
          dragging = true;
          el.style.cursor = "grabbing";
          sx = e.clientX;
          sy = e.clientY;
          sdx = offsetObj.dx;
          sdy = offsetObj.dy;
          e.preventDefault();
        });

        window.addEventListener("mousemove", (e) => {
          if (!dragging) return;
          offsetObj.dx = Math.round(sdx + (e.clientX - sx));
          offsetObj.dy = Math.round(sdy + (e.clientY - sy));
          updateFn();
        });

        window.addEventListener("mouseup", () => {
          if (!dragging) return;
          dragging = false;
          el.style.cursor = "grab";
        });
      };

      (["b1", "b2", "b3"] as VertexKey[]).forEach((key) =>
        enableDrag(calloutEls[key], calloutOffsets[key], updateReadout),
      );
      enableDrag(apexEl, apexDescOffset, updateReadout);
    }

    let currentT = 0;
    let spinAngle = 0;
    let lastTime = performance.now();
    let animationId = 0;

    const wrapAngle = (a: number) => {
      let wrapped = a % (Math.PI * 2);
      if (wrapped > Math.PI) wrapped -= Math.PI * 2;
      if (wrapped < -Math.PI) wrapped += Math.PI * 2;
      return wrapped;
    };

    const animate = (now: number) => {
      animationId = requestAnimationFrame(animate);

      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const target = Number(slider.value) / 100;
      currentT += (target - currentT) * rot.sliderSmoothing;
      const t = currentT;

      const baseRotX = rot.startX + (rot.endX - rot.startX) * t;
      const baseRotY = rot.startY + (rot.endY - rot.startY) * t;

      if (t > rot.spinThreshold) {
        const ramp = (t - rot.spinThreshold) / (1 - rot.spinThreshold);
        spinAngle += rot.spinSpeed * dt * ramp;
      } else {
        spinAngle = wrapAngle(spinAngle);
        const proximity = t / rot.spinThreshold;
        const halfLife = rot.decayHalfLife / Math.max(0.001, 1 - proximity);
        spinAngle *= Math.pow(0.5, dt / halfLife);
        if (Math.abs(spinAngle) < 0.001) spinAngle = 0;
      }

      pyramidGroup.rotation.x = baseRotX;
      pyramidGroup.rotation.y = baseRotY + spinAngle;

      const de = cfg.dashedEdges;
      const dashOn = t > de.fadeStart;
      const dashOp =
        Math.min(1, (t - de.fadeStart) / (de.fadeEnd - de.fadeStart)) *
        de.maxOpacity;
      dEdges.forEach((edge) => {
        edge.visible = dashOn;
        (edge.material as THREE.LineDashedMaterial).opacity = dashOp;
      });

      edgeLabelsData.forEach((d) => {
        const yAxis = new THREE.Vector3()
          .lerpVectors(d.yStart, d.yEnd, t)
          .normalize();
        const zAxis = new THREE.Vector3()
          .crossVectors(d.xAxis, yAxis)
          .normalize();
        const xPerp = new THREE.Vector3()
          .crossVectors(yAxis, zAxis)
          .normalize();
        const m = new THREE.Matrix4();
        m.makeBasis(xPerp, yAxis, zAxis);
        d.mesh.quaternion.setFromRotationMatrix(m);
      });

      renderer.render(scene, camera);

      pyramidGroup.updateMatrixWorld();
      const ww = wrapper.clientWidth;
      const wh = wrapper.clientHeight;
      const proj = (localPt: THREE.Vector3) => {
        const v = localPt.clone();
        pyramidGroup.localToWorld(v);
        v.project(camera);
        return { x: (v.x * 0.5 + 0.5) * ww, y: (-v.y * 0.5 + 0.5) * wh };
      };

      const calloutOpacity = Math.max(0, 1 - t / cfg.callouts.fadeRange);
      const projections: Record<VertexKey, { x: number; y: number }> = {
        b1: proj(b1),
        b2: proj(b2),
        b3: proj(b3),
      };

      (["b1", "b2", "b3"] as VertexKey[]).forEach((key) => {
        const callout = calloutEls[key];
        const line = leaderLines[key];
        const p = projections[key];
        const off = calloutOffsets[key];

        callout.style.opacity = String(calloutOpacity);

        let clx = p.x + off.dx;
        let cly = p.y + off.dy;
        const cRect = callout.getBoundingClientRect();
        const cm = cfg.padding;

        if (clx + cRect.width > ww - cm) clx = ww - cRect.width - cm;
        if (clx < cm) clx = cm;
        if (cly < cm) cly = cm;
        if (cly + cRect.height > wh - cm) cly = wh - cRect.height - cm;

        callout.style.left = `${clx}px`;
        callout.style.top = `${cly}px`;

        const box = callout.getBoundingClientRect();
        const wr = wrapper.getBoundingClientRect();
        const bx1r = box.left - wr.left;
        const by1r = box.top - wr.top;
        const cx = bx1r + box.width / 2;
        const cy = by1r + box.height / 2;

        const dirX = p.x - cx;
        const dirY = p.y - cy;
        let ix = cx;
        let iy = cy;
        if (dirX !== 0 || dirY !== 0) {
          const tMin = Math.min(
            box.width / 2 / Math.abs(dirX || 0.001),
            box.height / 2 / Math.abs(dirY || 0.001),
          );
          ix = cx + dirX * tMin;
          iy = cy + dirY * tMin;
        }

        line.setAttribute("x1", String(p.x));
        line.setAttribute("y1", String(p.y));
        line.setAttribute("x2", String(ix));
        line.setAttribute("y2", String(iy));
        line.style.opacity = String(calloutOpacity);
      });

      const ac = cfg.apexCallout;
      const apexOp = Math.max(
        0,
        Math.min(1, (t - ac.fadeStart) / (ac.fadeEnd - ac.fadeStart)),
      );
      const pApex = proj(apex);
      apexEl.style.opacity = String(apexOp);

      let axLeft = pApex.x + apexDescOffset.dx;
      let axTop = pApex.y + apexDescOffset.dy;
      const aRect = apexEl.getBoundingClientRect();
      const margin = cfg.padding;

      if (axLeft + aRect.width > ww - margin)
        axLeft = ww - aRect.width - margin;
      if (axLeft < margin) axLeft = margin;
      if (axTop < margin) axTop = margin;
      if (axTop + aRect.height > wh - margin)
        axTop = wh - aRect.height - margin;

      apexEl.style.left = `${axLeft}px`;
      apexEl.style.top = `${axTop}px`;
    };

    animationId = requestAnimationFrame(animate);

    onReady?.({
      setSlider: (value: number) => {
        slider.value = String(Math.max(0, Math.min(100, value)));
      },
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      if (thumbCSS.parentNode) thumbCSS.parentNode.removeChild(thumbCSS);

      pyramidGroup.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else if (mesh.material) {
          mesh.material.dispose();
        }
      });
      renderer.dispose();
      root.innerHTML = "";
    };
  }, [config, initialSliderValue, onReady]);

  return <div ref={rootRef} className={className} style={style} />;
};

export default AtomixPyramidExplorer;
export { DEFAULTS as ATOMIX_PYRAMID_DEFAULTS };
