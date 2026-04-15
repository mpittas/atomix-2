import React, { CSSProperties, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";

type VK = "b1" | "b2" | "b3";
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
const KEYS: VK[] = ["b1", "b2", "b3"];

const DEFAULTS = {
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
    keyPosition: [4, 5, 6] as [number, number, number],
    fillIntensity: 0.3,
    fillPosition: [-5, 2, 4] as [number, number, number],
    rimIntensity: 0.15,
    rimPosition: [0, -3, -5] as [number, number, number],
    sideShininess: 50,
    baseShininess: 25,
    barShininess: 60,
  },
  camera: { fov: 45, distance: 10.5 },
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
    texts: ["Fully automated", "Cheap to build", "Complex loan logic"] as [
      string,
      string,
      string,
    ],
    fontSize: 14,
    fontWeight: 600,
    worldHeight: 0.4,
    edgeOffset: 0.3,
  },
  logo: {
    svgBase64: null as string | null,
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
  slider: { leftLabel: "Legacy technology", rightLabel: "Atomix" },
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

type Cfg = typeof DEFAULTS;

function deepMerge<T>(t: T, s?: DeepPartial<T>): T {
  if (!s) return t;
  const r: Record<string, unknown> = { ...(t as Record<string, unknown>) };
  Object.keys(s).forEach((k) => {
    const sv = (s as Record<string, unknown>)[k];
    const tv = (t as Record<string, unknown>)[k];
    if (
      sv &&
      typeof sv === "object" &&
      !Array.isArray(sv) &&
      tv &&
      typeof tv === "object" &&
      !Array.isArray(tv)
    )
      r[k] = deepMerge(
        tv as Record<string, unknown>,
        sv as Record<string, unknown>,
      );
    else if (sv !== undefined) r[k] = sv;
  });
  return r as T;
}

export interface AtomixPyramidNewDesignProps {
  config?: DeepPartial<Cfg>;
  className?: string;
  style?: CSSProperties;
  initialSliderValue?: number;
  onReady?: (api: { setSlider: (v: number) => void }) => void;
}

const ABS_FILL: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
};
const LABEL_S: CSSProperties = {
  fontSize: "12px",
  fontWeight: 500,
  flexShrink: 0,
  letterSpacing: "0.02em",
  textTransform: "uppercase",
};

const clamp = (
  x: number,
  y: number,
  w: number,
  h: number,
  ww: number,
  wh: number,
  p: number,
) => ({
  x: Math.max(p, Math.min(x, ww - w - p)),
  y: Math.max(p, Math.min(y, wh - h - p)),
});

type V3 = THREE.Vector3;
const Vec3 = THREE.Vector3;
const v3 = (...a: [number, number, number]) => new Vec3(...a);

const AtomixPyramidNewDesign: React.FC<AtomixPyramidNewDesignProps> = ({
  config,
  className = "",
  style,
  initialSliderValue = 0,
  onReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const calloutRefs = useRef<Record<VK, HTMLDivElement | null>>({
    b1: null,
    b2: null,
    b3: null,
  });
  const leaderRefs = useRef<Record<VK, SVGLineElement | null>>({
    b1: null,
    b2: null,
    b3: null,
  });
  const apexRef = useRef<HTMLDivElement>(null);
  const cfg = useMemo(() => deepMerge(DEFAULTS, config), [config]);

  useEffect(() => {
    const canvas = canvasRef.current,
      wrapper = wrapperRef.current,
      slider = sliderRef.current;
    if (!canvas || !wrapper || !slider) return;

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
    [
      [lt.keyIntensity, lt.keyPosition],
      [lt.fillIntensity, lt.fillPosition],
      [lt.rimIntensity, lt.rimPosition],
    ].forEach(([i, p]) => {
      const l = new THREE.DirectionalLight(0xffffff, i as number);
      l.position.set(...(p as [number, number, number]));
      scene.add(l);
    });

    const grp = new THREE.Group();
    scene.add(grp);

    const S = cfg.pyramidScale,
      H = S * cfg.heightRatio,
      R = S * cfg.baseRatio;
    const by = -H * cfg.baseCentreY,
      ay = H + by;
    const c30 = Math.cos(Math.PI / 6),
      s30 = Math.sin(Math.PI / 6);
    const rawA = v3(0, ay, 0),
      rawB1 = v3(-R * c30, by, -R * s30),
      rawB2 = v3(R * c30, by, -R * s30),
      rawB3 = v3(0, by, R);
    const pw = 0.4,
      bw = (1 - pw) / 3;
    const ctr = new Vec3()
      .addScaledVector(rawA, pw)
      .addScaledVector(rawB1, bw)
      .addScaledVector(rawB2, bw)
      .addScaledVector(rawB3, bw);
    const apex = rawA.clone().sub(ctr),
      b1 = rawB1.clone().sub(ctr),
      b2 = rawB2.clone().sub(ctr),
      b3 = rawB3.clone().sub(ctr);
    const verts = { b1, b2, b3 };

    const phong = (color: number, spec: number, shin: number) =>
      new THREE.MeshPhongMaterial({
        color,
        side: THREE.DoubleSide,
        shininess: shin,
        specular: new THREE.Color(spec),
      });
    const sideMat = phong(
      cfg.colors.sideFace,
      cfg.colors.sideSpecular,
      lt.sideShininess,
    );
    const baseMat = phong(
      cfg.colors.baseFace,
      cfg.colors.baseSpecular,
      lt.baseShininess,
    );

    const tri = (a: V3, b: V3, c: V3, mat: THREE.Material) => {
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

    const de = cfg.dashedEdges;
    const mkEdge = (a: V3, b: V3, col: THREE.Color, dashed: boolean) => {
      const g = new THREE.BufferGeometry().setFromPoints([a, b]);
      const m = dashed
        ? new THREE.LineDashedMaterial({
            color: col,
            dashSize: de.dashSize,
            gapSize: de.gapSize,
            transparent: true,
            opacity: de.maxOpacity,
          })
        : new THREE.LineBasicMaterial({ color: col });
      const l = new THREE.Line(g, m);
      if (dashed) l.computeLineDistances();
      return l;
    };

    grp.add(
      tri(apex, b1, b2, sideMat),
      tri(apex, b2, b3, sideMat),
      tri(apex, b3, b1, sideMat),
      tri(b1, b3, b2, baseMat),
    );

    const TC = new THREE.Color(cfg.colors.apexEdge),
      PC = new THREE.Color(cfg.colors.baseEdge);
    const eDefs: [V3, V3, THREE.Color][] = [
      [apex, b1, TC],
      [apex, b2, TC],
      [apex, b3, TC],
      [b1, b2, PC],
      [b2, b3, PC],
      [b3, b1, PC],
    ];
    eDefs.forEach(([a, b, c]) => grp.add(mkEdge(a, b, c, false)));
    const dEdges = eDefs.map(([a, b, c]) => mkEdge(a, b, c, true));
    dEdges.forEach((e) => {
      e.visible = false;
      grp.add(e);
    });

    const barMat = new THREE.MeshPhongMaterial({
      color: cfg.colors.bar,
      shininess: lt.barShininess,
      specular: new THREE.Color(cfg.colors.barSpecular),
    });
    const mkCap = (from: V3, to: V3) => {
      const g2 = new THREE.Group(),
        dir = new Vec3().subVectors(to, from),
        len = dir.length();
      dir.normalize();
      g2.add(
        new THREE.Mesh(
          new THREE.CylinderGeometry(
            cfg.barCylRadius,
            cfg.barCylRadius,
            len,
            12,
            1,
          ),
          barMat,
        ),
      );
      const cap = new THREE.SphereGeometry(cfg.barSphereRadius, 16, 12);
      const t = new THREE.Mesh(cap, barMat);
      t.position.y = len / 2;
      g2.add(t);
      const bo = new THREE.Mesh(cap, barMat);
      bo.position.y = -len / 2;
      g2.add(bo);
      g2.position.copy(new Vec3().addVectors(from, to).multiplyScalar(0.5));
      g2.quaternion.setFromUnitVectors(v3(0, 1, 0), dir);
      return g2;
    };
    [b1, b2, b3].forEach((v) => grp.add(mkCap(v, apex)));

    const el = cfg.edgeLabels;
    const mkText = (text: string) => {
      const c2 = document.createElement("canvas"),
        ctx = c2.getContext("2d");
      if (!ctx) return new THREE.Mesh();
      const dpr = 2,
        font = `${el.fontWeight} ${el.fontSize * dpr}px -apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif`;
      ctx.font = font;
      const tw = Math.ceil(ctx.measureText(text).width) + 24,
        th = Math.ceil(el.fontSize * dpr * 1.5) + 16;
      c2.width = tw;
      c2.height = th;
      ctx.clearRect(0, 0, tw, th);
      ctx.font = font;
      ctx.fillStyle = cfg.colors.edgeLabelText;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, tw / 2, th / 2);
      const tex = new THREE.CanvasTexture(c2);
      tex.minFilter = THREE.LinearFilter;
      return new THREE.Mesh(
        new THREE.PlaneGeometry((el.worldHeight * tw) / th, el.worldHeight),
        new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          depthTest: true,
          depthWrite: false,
          side: THREE.DoubleSide,
        }),
      );
    };

    const eMeshes = el.texts.map(mkText);
    const bCtr = new Vec3().add(b1).add(b2).add(b3).divideScalar(3);
    const mid = (a: V3, b: V3) =>
      new Vec3().addVectors(a, b).multiplyScalar(0.5);
    const push = (pt: V3, c: V3, amt: number) =>
      pt
        .clone()
        .add(new Vec3().subVectors(pt, c).normalize().multiplyScalar(amt));

    const ePairs = [
      { m: eMeshes[0], f: b1, t: b2 },
      { m: eMeshes[1], f: b2, t: b3 },
      { m: eMeshes[2], f: b3, t: b1 },
    ];
    const eld: { m: THREE.Mesh; x: V3; ys: V3; ye: V3 }[] = [];

    ePairs.forEach((ep) => {
      const mp = mid(ep.f, ep.t);
      ep.m.position.copy(push(mp, bCtr, el.edgeOffset));
      grp.add(ep.m);
      const xA = new Vec3().subVectors(ep.t, ep.f).normalize();
      const ro = new Vec3(mp.x, 0, mp.z).normalize();
      const rp = ro
        .clone()
        .sub(xA.clone().multiplyScalar(ro.dot(xA)))
        .normalize();
      if (new Vec3().crossVectors(xA, rp).y > 0) xA.negate();
      const ta = new Vec3().subVectors(apex, mp).normalize();
      const ap = ta
        .clone()
        .sub(xA.clone().multiplyScalar(ta.dot(xA)))
        .normalize();
      eld.push({ m: ep.m, x: xA, ys: rp, ye: ap });
    });

    const logoB64 = cfg.logo.svgBase64 || "";
    const spr = new THREE.Sprite(
      new THREE.SpriteMaterial({
        transparent: true,
        depthTest: true,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    );
    spr.scale.set(1.8, 0.45, 1);
    if (logoB64) {
      const img = new Image();
      img.onload = () => {
        const c2 = document.createElement("canvas");
        c2.width = cfg.logo.canvasWidth;
        c2.height = cfg.logo.canvasHeight;
        const ctx = c2.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, c2.width, c2.height);
        const tx = new THREE.CanvasTexture(c2);
        tx.minFilter = THREE.LinearFilter;
        const mat = spr.material as THREE.SpriteMaterial;
        mat.map = tx;
        mat.needsUpdate = true;
        spr.scale.set(
          (cfg.logo.worldHeight * c2.width) / c2.height,
          cfg.logo.worldHeight,
          1,
        );
      };
      img.src = `data:image/svg+xml;base64,${logoB64}`;
    }
    spr.position.copy(apex).add(v3(0, cfg.logo.verticalOffset, 0));
    grp.add(spr);

    const resize = () => {
      const w = wrapper.clientWidth,
        h = wrapper.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const rot = cfg.rotation;
    const cOff = Object.fromEntries(
      KEYS.map((k) => [k, { ...cfg.callouts.offsets[k] }]),
    ) as Record<VK, { dx: number; dy: number }>;
    const aOff = { ...cfg.apexCallout.offset };
    let curT = 0,
      spin = 0,
      last = performance.now(),
      afId = 0;

    const animate = (now: number) => {
      afId = requestAnimationFrame(animate);
      const dt = (now - last) / 1000;
      last = now;
      const tgt = Number(slider.value) / 100;
      curT += (tgt - curT) * rot.sliderSmoothing;
      const t = curT;

      if (t > rot.spinThreshold) {
        spin +=
          rot.spinSpeed *
          dt *
          ((t - rot.spinThreshold) / (1 - rot.spinThreshold));
      } else {
        let w = spin % (Math.PI * 2);
        if (w > Math.PI) w -= Math.PI * 2;
        if (w < -Math.PI) w += Math.PI * 2;
        spin =
          w *
          Math.pow(
            0.5,
            dt /
              (rot.decayHalfLife / Math.max(0.001, 1 - t / rot.spinThreshold)),
          );
        if (Math.abs(spin) < 0.001) spin = 0;
      }

      grp.rotation.x = rot.startX + (rot.endX - rot.startX) * t;
      grp.rotation.y = rot.startY + (rot.endY - rot.startY) * t + spin;

      const dOp =
        Math.min(1, (t - de.fadeStart) / (de.fadeEnd - de.fadeStart)) *
        de.maxOpacity;
      dEdges.forEach((e) => {
        e.visible = t > de.fadeStart;
        (e.material as THREE.LineDashedMaterial).opacity = dOp;
      });

      eld.forEach((d) => {
        const yA = new Vec3().lerpVectors(d.ys, d.ye, t).normalize();
        const zA = new Vec3().crossVectors(d.x, yA).normalize();
        const xP = new Vec3().crossVectors(yA, zA).normalize();
        const m4 = new THREE.Matrix4();
        m4.makeBasis(xP, yA, zA);
        d.m.quaternion.setFromRotationMatrix(m4);
      });

      renderer.render(scene, camera);
      grp.updateMatrixWorld();
      const ww = wrapper.clientWidth,
        wh = wrapper.clientHeight;
      const proj = (pt: V3) => {
        const v = pt.clone();
        grp.localToWorld(v);
        v.project(camera);
        return { x: (v.x * 0.5 + 0.5) * ww, y: (-v.y * 0.5 + 0.5) * wh };
      };

      const cAlpha = Math.max(0, 1 - t / cfg.callouts.fadeRange);

      KEYS.forEach((key) => {
        const co = calloutRefs.current[key],
          ln = leaderRefs.current[key];
        if (!co || !ln) return;
        const p = proj(verts[key]),
          off = cOff[key];
        co.style.opacity = String(cAlpha);
        const cr = co.getBoundingClientRect();
        const c = clamp(
          p.x + off.dx,
          p.y + off.dy,
          cr.width,
          cr.height,
          ww,
          wh,
          cfg.padding,
        );
        co.style.transform = `translate(${c.x}px,${c.y}px)`;

        const wr = wrapper.getBoundingClientRect(),
          cr2 = co.getBoundingClientRect();
        const cx = cr2.left - wr.left + cr.width / 2,
          cy = cr2.top - wr.top + cr.height / 2;
        const dx = p.x - cx,
          dy = p.y - cy;
        let ix = cx,
          iy = cy;
        if (dx !== 0 || dy !== 0) {
          const tm = Math.min(
            cr.width / 2 / Math.abs(dx || 0.001),
            cr.height / 2 / Math.abs(dy || 0.001),
          );
          ix = cx + dx * tm;
          iy = cy + dy * tm;
        }
        ln.setAttribute("x1", String(p.x));
        ln.setAttribute("y1", String(p.y));
        ln.setAttribute("x2", String(ix));
        ln.setAttribute("y2", String(iy));
        ln.style.opacity = String(cAlpha);
      });

      const ac = cfg.apexCallout;
      const aOp = Math.max(
        0,
        Math.min(1, (t - ac.fadeStart) / (ac.fadeEnd - ac.fadeStart)),
      );
      const pA = proj(apex);
      if (apexRef.current) {
        apexRef.current.style.opacity = String(aOp);
        const ar = apexRef.current.getBoundingClientRect();
        const a = clamp(
          pA.x + aOff.dx,
          pA.y + aOff.dy,
          ar.width,
          ar.height,
          ww,
          wh,
          cfg.padding,
        );
        apexRef.current.style.transform = `translate(${a.x}px,${a.y}px)`;
      }
    };

    afId = requestAnimationFrame(animate);
    onReady?.({
      setSlider: (v: number) => {
        slider.value = String(Math.max(0, Math.min(100, v)));
      },
    });

    return () => {
      cancelAnimationFrame(afId);
      window.removeEventListener("resize", resize);
      grp.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        if (Array.isArray(m.material)) m.material.forEach((mt) => mt.dispose());
        else if (m.material) m.material.dispose();
      });
      renderer.dispose();
    };
  }, [cfg, initialSliderValue, onReady]);

  const cs = cfg.callouts.style,
    acs = cfg.apexCallout.style;
  const grad = `linear-gradient(135deg,${cfg.colors.sliderThumbA},${cfg.colors.sliderThumbB})`;

  return (
    <div
      className={className}
      style={{
        ...style,
        position: "relative",
        width: "100%",
        maxWidth: `${cfg.maxWidth}px`,
        fontFamily:
          "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif",
      }}
    >
      <style>{`.as::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:${grad};cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.2)}.as::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:${grad};cursor:pointer;border:none;box-shadow:0 2px 6px rgba(0,0,0,.2)}`}</style>
      <div
        ref={wrapperRef}
        style={{
          position: "relative",
          width: "100%",
          height: `${cfg.canvasHeight}px`,
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ display: "block", width: "100%", height: "100%" }}
        />
        <div style={{ ...ABS_FILL, overflow: "visible" }}>
          <svg style={ABS_FILL}>
            {KEYS.map((k) => (
              <line
                key={k}
                ref={(el) => {
                  leaderRefs.current[k] = el;
                }}
                stroke={cfg.colors.leaderStroke}
                strokeWidth={cs.leaderWidth}
                strokeDasharray={cs.leaderDash}
              />
            ))}
          </svg>
          {KEYS.map((k) => {
            const d = cfg.callouts[k];
            return (
              <div
                key={k}
                ref={(el) => {
                  calloutRefs.current[k] = el;
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transition: "opacity .15s",
                  opacity: 0,
                  background: cs.background,
                  border: cs.border,
                  borderRadius: cs.borderRadius,
                  padding: "10px 14px",
                  minWidth: cs.minWidth,
                  maxWidth: cs.maxWidth,
                }}
              >
                <div
                  style={{
                    color: cs.titleColor,
                    fontSize: cs.titleSize,
                    fontWeight: 700,
                    marginBottom: "6px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {d.title}
                </div>
                {d.lines.map((l, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: cs.lineSize,
                      lineHeight: 1.5,
                      color: cs.lineColor,
                    }}
                  >
                    <span
                      style={{ color: l.positive ? cs.yesColor : cs.noColor }}
                    >
                      {l.positive ? "✓ " : "✗ "}
                    </span>
                    {l.text}
                  </div>
                ))}
              </div>
            );
          })}
          <div
            ref={apexRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              transition: "opacity .15s",
              opacity: 0,
              background: acs.background,
              border: acs.border,
              borderRadius: acs.borderRadius,
              padding: "10px 14px",
              maxWidth: acs.maxWidth,
            }}
          >
            <div
              style={{
                color: acs.textColor,
                fontSize: acs.fontSize,
                lineHeight: acs.lineHeight,
              }}
            >
              {cfg.apexCallout.text}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "24px 20px 12px",
        }}
      >
        <span style={{ ...LABEL_S, color: cfg.colors.sliderLabel }}>
          {cfg.slider.leftLabel}
        </span>
        <input
          ref={sliderRef}
          type="range"
          min="0"
          max="100"
          defaultValue={initialSliderValue}
          className="as"
          style={{
            flex: 1,
            WebkitAppearance: "none",
            appearance: "none",
            height: "6px",
            borderRadius: "3px",
            background: cfg.colors.sliderTrack,
            outline: "none",
            cursor: "pointer",
          }}
        />
        <span style={{ ...LABEL_S, color: cfg.colors.sliderLabel }}>
          {cfg.slider.rightLabel}
        </span>
      </div>
    </div>
  );
};

export default AtomixPyramidNewDesign;
export { DEFAULTS as ATOMIX_PYRAMID_DEFAULTS };
