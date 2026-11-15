/* ClickChat — Direction 4.1 hero scene (from the Living Universe experiment, revision 2; no Sadu pattern).
   Hero scene: the ClickChat icon in 3D (shape from the official SVG; white body, mint dots), five channel discs
   (WhatsApp, Instagram, Messenger, SMS, Email) on two depth layers, and message packets that fly into the icon.
   Each arrival: the dots type, an outline of the bubble pulses out, the icon brightens.
   Scroll (no pinning): the channels fly into the icon one by one while the scene rises with the page.
   Closing section: the icon returns alone above the headline, scrolls with that section, and its dots type once.
   Classic script (works from file://); Three.js r160 from the CDN via dynamic import() + the page importmap. */
(function () {
let THREE, RoomEnvironment, SVGLoader;
async function load() {
  if (THREE) return;
  THREE = await import('three');
  ({ RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js'));
  ({ SVGLoader } = await import('three/addons/loaders/SVGLoader.js'));
}
const ICON_SVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 678.79 622.03\" width=\"679\" height=\"622\">\n<path fill=\"#0B1B3A\" fill-rule=\"evenodd\" transform=\"translate(-139.41,-62.68) scale(1.00000)\" d=\"M286.98,647.16C291.72,645.86 295.65,643.37 309.10,633.17C311.70,631.19 315.53,628.38 317.61,626.92C319.69,625.45 325.43,621.21 330.37,617.50C358.55,596.33 359.57,595.61 365.75,592.56C372.23,589.36 376.17,588.11 381.73,587.46C384.77,587.10 408.76,586.99 454.75,587.12C522.55,587.30 523.29,587.31 527.00,588.35C534.14,590.35 541.79,594.44 548.73,599.95C557.22,606.70 574.53,617.74 584.36,622.68C586.23,623.61 590.90,625.62 594.75,627.13C616.44,635.66 632.93,638.52 656.50,637.83C673.42,637.34 682.31,635.89 696.75,631.27C713.91,625.77 723.87,619.47 739.43,604.27C765.25,579.05 779.76,545.91 782.99,504.80C783.70,495.75 783.68,268.52 782.97,259.47C781.36,239.09 776.41,217.23 769.51,200.06C764.87,188.53 753.99,169.79 747.30,161.79C745.90,160.11 743.00,156.57 740.86,153.91C738.72,151.25 734.89,147.21 732.36,144.93C729.82,142.65 725.82,138.95 723.46,136.70C721.10,134.46 716.82,131.07 713.96,129.17C711.09,127.27 707.29,124.68 705.50,123.42C691.77,113.71 665.97,103.63 644.50,99.58C631.80,97.18 636.64,97.25 484.25,97.25C330.36,97.25 334.92,97.18 321.70,99.77C301.35,103.76 286.17,108.97 269.00,117.86C259.76,122.65 247.86,130.54 240.50,136.75C237.34,139.42 233.15,142.94 231.20,144.57C229.24,146.19 225.19,150.26 222.20,153.60C219.20,156.94 215.69,160.79 214.39,162.15C211.54,165.14 201.72,179.36 197.79,186.19C187.32,204.37 179.33,226.39 176.54,244.75C174.16,260.37 174.30,254.00 174.10,360.75C173.91,465.32 173.93,466.28 176.08,480.25C178.41,495.34 181.52,505.17 188.69,520.18C201.59,547.16 222.65,569.56 248.50,583.78C254.94,587.32 255.39,587.69 256.68,590.50C257.66,592.65 257.70,593.49 257.58,609.30C257.45,627.14 257.77,631.04 259.77,635.42C264.22,645.18 275.88,650.21 286.98,647.16ZM693.06,607.92C689.93,607.42 686.80,606.08 684.91,604.42C684.18,603.78 680.48,598.64 676.70,593.00C672.92,587.36 668.03,580.16 665.83,577.00C663.63,573.84 660.69,569.58 659.29,567.55C657.89,565.51 655.79,562.81 654.63,561.55L652.50,559.25L651.22,560.75C649.41,562.86 645.53,568.62 643.12,572.77C638.76,580.28 631.99,589.98 630.63,590.66C622.97,594.51 616.65,591.22 615.01,582.53C614.73,581.05 614.25,578.92 613.94,577.80C613.64,576.67 612.64,572.15 611.71,567.75C609.11,555.36 602.78,528.03 599.06,513.16C597.98,508.81 596.48,502.32 595.74,498.75C594.99,495.18 593.38,488.31 592.16,483.50C588.00,467.15 585.42,454.46 585.76,452.00C586.21,448.84 588.17,445.69 590.41,444.55C593.05,443.20 596.54,442.77 598.84,443.52C601.01,444.22 613.54,451.29 628.09,460.03C633.50,463.28 638.90,466.44 640.09,467.04C642.64,468.33 656.32,476.54 659.37,478.60C660.53,479.39 663.68,481.23 666.37,482.68C669.05,484.14 673.50,486.68 676.25,488.34C686.83,494.71 692.89,498.28 696.50,500.26C698.56,501.40 701.38,503.01 702.75,503.85C707.94,507.02 718.85,513.35 721.50,514.72C723.01,515.50 725.09,516.93 726.11,517.90C731.03,522.58 729.03,530.61 722.04,534.23C720.48,535.04 712.80,536.47 704.50,537.50C690.96,539.18 685.25,540.05 684.79,540.51C684.08,541.22 683.25,539.97 696.26,558.00C703.19,567.62 705.46,570.85 709.15,576.41C715.74,586.33 715.24,585.25 715.22,589.45C715.20,594.74 714.02,597.88 710.74,601.42C707.70,604.71 704.46,606.62 700.50,607.47C696.30,608.37 695.95,608.39 693.06,607.92ZM354.25,483.95C339.63,483.66 337.67,483.44 328.50,481.17C324.77,480.24 316.66,476.88 311.67,474.19C307.24,471.81 296.82,463.79 293.69,460.36C284.56,450.37 276.59,435.35 274.27,423.75C272.45,414.73 272.44,413.93 272.61,336.75L272.78,260.75L273.89,256.00C277.06,242.42 281.99,232.46 291.34,220.72C302.37,206.89 319.18,196.93 337.87,193.15C341.99,192.32 350.39,192.25 477.25,192.11C574.31,192.00 613.66,192.11 617.25,192.51C628.50,193.77 637.14,196.61 646.33,202.07C667.30,214.53 680.72,233.66 685.58,258.00L686.72,263.75L686.87,318.25C686.97,355.48 686.84,374.33 686.47,377.75C684.78,393.11 677.11,406.02 664.85,414.16C655.15,420.60 645.38,421.92 619.47,420.30C591.57,418.55 581.14,419.53 571.75,424.74C567.58,427.06 564.89,429.29 561.44,433.28C556.42,439.08 554.78,442.73 551.52,455.32C548.68,466.27 544.15,472.28 533.93,478.66C529.63,481.33 527.52,482.15 521.86,483.31C518.11,484.09 511.16,484.16 443.25,484.20C402.27,484.23 362.23,484.12 354.25,483.95Z\"/>\n<path fill=\"#12C99B\" fill-rule=\"evenodd\" transform=\"translate(-139.41,-62.68) scale(1.00000)\" d=\"M594.59,355.77C605.20,353.01 612.16,347.40 616.96,337.75C619.41,332.82 620.24,328.40 619.84,322.28C619.31,313.99 617.38,308.89 612.61,303.21C605.81,295.12 597.65,291.31 587.00,291.27C567.91,291.20 553.47,305.58 553.51,324.60C553.52,331.32 555.60,337.20 560.30,343.82C563.20,347.92 566.47,350.71 570.73,352.74C579.08,356.71 587.09,357.72 594.59,355.77ZM383.00,355.72C399.28,351.90 410.18,336.39 408.01,320.13C405.83,303.76 393.45,292.23 376.91,291.18C367.12,290.56 358.45,293.91 351.50,301.01C344.26,308.40 341.91,313.98 341.81,324.00C341.72,332.94 344.75,340.15 351.44,346.94C356.25,351.82 361.56,354.86 367.22,355.99C370.73,356.68 379.54,356.54 383.00,355.72ZM489.40,355.72C502.06,353.16 512.18,343.27 514.83,330.87C516.57,322.74 514.57,311.92 510.25,306.06C501.88,294.70 489.41,289.32 476.50,291.50C468.46,292.86 463.33,295.59 457.29,301.73C451.13,307.99 449.03,313.65 449.01,324.02C448.99,333.59 451.64,340.12 458.25,346.80C466.33,354.98 477.40,358.15 489.40,355.72Z\"/>\n</svg>";   // injected from 01-Logo/03-icon/SVG/clickchat-icon-color.svg

const COL = { mint: 0x12C99B, mint3: 0x55DCB1, mist: 0xF5F8FB, steel: 0xB7C2D2, navy2: 0x12223F };
// The five channels named on the live site, in its order.
const CHANNELS = [
  { color: 0x25D366, glyph: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z', pos: [-4.9, 0.25, 0.7], m: [-1.85, 0.75, 0.6] },
  { color: 0x0084FF, glyph: 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z', pos: [-3.3, 1.5, -1.6], m: [-0.9, 1.75, -1.2] },
  { color: 0xE4405F, glyph: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01', pos: [4.8, 0.55, -0.5], m: [1.85, 1.15, -0.4] },
  { color: 0xB7C2D2, glyph: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', pos: [-3.0, -1.05, 1.7], m: [-1.75, -0.95, 1.0] },
  { color: 0x8FA0B8, glyph: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6', pos: [3.3, -0.95, 1.5], m: [1.75, -0.7, 1.0] },
];

function supportsWebGL() { try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl'))); } catch { return false; } }
const clamp01 = x => Math.min(1, Math.max(0, x));
const easeInOut = x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
function canvasTex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }
const radial = stops => canvasTex(128, 128, (g, w, h) => { const r = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); stops.forEach(([o, c]) => r.addColorStop(o, c)); g.fillStyle = r; g.fillRect(0, 0, w, h); });

function buildIcon(mobile) {
  const data = new SVGLoader().parse(ICON_SVG);
  const holder = new THREE.Group();
  const frameMat = new THREE.MeshPhysicalMaterial({ color: COL.mist, roughness: 0.26, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.07, sheen: 0.45, sheenColor: new THREE.Color(COL.mint3) });
  const dotMat = new THREE.MeshStandardMaterial({ color: COL.mint, emissive: COL.mint, emissiveIntensity: 0.8, roughness: 0.22, metalness: 0.05 });
  let frameGeo = null, outline = null; const dots = [];
  data.paths.forEach(p => {
    const fill = String((p.userData && p.userData.style && p.userData.style.fill) || '').toUpperCase();
    const shapes = SVGLoader.createShapes(p);
    if (fill === '#12C99B') shapes.forEach(sh => {
      const g = new THREE.ExtrudeGeometry(sh, { depth: 30, bevelEnabled: true, bevelThickness: 9, bevelSize: 7, bevelSegments: 3, curveSegments: mobile ? 14 : 22 });
      g.computeBoundingBox(); const c = g.boundingBox.getCenter(new THREE.Vector3()); g.translate(-c.x, -c.y, -c.z);
      const m = new THREE.Mesh(g, dotMat.clone()); m.position.set(c.x, c.y, 0); dots.push(m);
    });
    else { frameGeo = new THREE.ExtrudeGeometry(shapes, { depth: 70, bevelEnabled: true, bevelThickness: 14, bevelSize: 9, bevelSegments: mobile ? 2 : 4, curveSegments: mobile ? 12 : 20 }); outline = shapes[0].getPoints(90); }
  });
  dots.sort((a, b) => b.position.x - a.position.x);   // RTL: the dots type right to left
  frameGeo.computeBoundingBox();
  const bb = frameGeo.boundingBox, ctr = bb.getCenter(new THREE.Vector3()), size = bb.getSize(new THREE.Vector3());
  frameGeo.translate(-ctr.x, -ctr.y, -ctr.z);
  holder.add(new THREE.Mesh(frameGeo, frameMat));
  dots.forEach(d => { d.position.x -= ctr.x; d.position.y -= ctr.y; d.position.z = 22; d.userData.z = 22; holder.add(d); });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(400, 280), new THREE.MeshBasicMaterial({ map: radial([[0, 'rgba(18,201,155,.55)'], [0.55, 'rgba(18,201,155,.15)'], [1, 'rgba(18,201,155,0)']]), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
  screen.position.set(340.3 - ctr.x, 275.4 - ctr.y, -6); holder.add(screen);
  const s = 2.9 / size.x; holder.scale.set(s, -s, s);
  return { group: holder, dots, outline: outline.map(v => new THREE.Vector2(v.x - ctr.x, v.y - ctr.y)), scale: s };
}

function createHero(canvas, { reduceMotion = false } = {}) {
  const mobile = matchMedia('(max-width: 767px)').matches;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' }); } catch { return null; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 120);
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
  scene.add(new THREE.HemisphereLight(COL.steel, 0x040B18, 0.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.1); key.position.set(5, 7, 8); scene.add(key);
  const rim = new THREE.DirectionalLight(COL.mint3, 1.5); rim.position.set(-6, 3, -6); scene.add(rim);
  const fill = new THREE.PointLight(COL.mint, 14, 12, 2); fill.position.set(0, -0.4, 2.6); scene.add(fill);

  const world = new THREE.Group(); scene.add(world);
  const core = new THREE.Group(); world.add(core);
  const icon = buildIcon(mobile); core.add(icon.group);
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: radial([[0, 'rgba(18,201,155,.34)'], [0.4, 'rgba(18,201,155,.1)'], [1, 'rgba(18,201,155,0)']]), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
  glow.scale.setScalar(7); glow.position.z = -1.2; core.add(glow);
  const echoGeo = new THREE.BufferGeometry().setFromPoints(icon.outline.map(v => new THREE.Vector3(v.x, v.y, 0)));
  const echoes = Array.from({ length: 3 }, () => { const l = new THREE.LineLoop(echoGeo, new THREE.LineBasicMaterial({ color: COL.mint3, transparent: true, opacity: 0, depthWrite: false })); const h = new THREE.Group(); h.add(l); core.add(h); return { h, l, life: 1 }; });

  const base = { y: 1.5, endY: 2.3, scale: 1, full: 1, camZ: 14 };
  // Optional band (px from the top of the hero) that the icon and its channels must fit in: set by the page from the
  // header and the hero text, so they never touch on short or tall screens. Extents = how far the composition reaches
  // above / below the icon centre at scale 1 (channel discs, their bob and perspective included).
  let fitBand = null;
  const EXT = { desk: [2.0, 1.7], port: [2.1, 1.4] };
  function layout() {
    const portrait = innerWidth < 768; base.camZ = portrait ? 16 : 14;
    const vh = 2 * base.camZ * Math.tan(THREE.MathUtils.degToRad(18));
    base.y = (0.5 - (portrait ? 0.3 : 0.31)) * vh;
    base.endY = (0.5 - (portrait ? 0.2 : 0.25)) * vh;     // closing section: icon centre at 20% / 25% from the top
    base.full = base.scale = portrait ? 0.82 : Math.min(1, 0.62 * (innerWidth / innerHeight));
    if (fitBand && fitBand.bottom - fitBand.top > 80) {
      const [up, down] = portrait ? EXT.port : EXT.desk, k = innerHeight / vh, band = fitBand.bottom - fitBand.top;
      base.scale = Math.max(0.42, Math.min(base.full, band / ((up + down) * k)));
      const topPx = fitBand.top + (band - (up + down) * base.scale * k) / 2;
      base.y = (0.5 - (topPx + up * base.scale * k) / innerHeight) * vh;
    }
  }
  layout();

  // channels
  const discGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.12, 64); discGeo.rotateX(Math.PI / 2);
  const ringGeo = new THREE.TorusGeometry(0.46, 0.025, 12, 72);
  const channels = CHANNELS.map((ch, i) => {
    const g = new THREE.Group(); world.add(g);
    const disc = new THREE.Mesh(discGeo, new THREE.MeshPhysicalMaterial({ color: COL.navy2, roughness: 0.22, metalness: 0.3, clearcoat: 1, clearcoatRoughness: 0.08 }));
    const ring = new THREE.Mesh(ringGeo, new THREE.MeshStandardMaterial({ color: ch.color, emissive: ch.color, emissiveIntensity: 0.6 }));
    const glyph = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, toneMapped: false,
      map: canvasTex(128, 128, c => { c.translate(16, 16); c.scale(96 / 24, 96 / 24); c.strokeStyle = '#fff'; c.lineWidth = 1.9; c.lineCap = 'round'; c.lineJoin = 'round'; c.stroke(new Path2D(ch.glyph)); }) }));
    glyph.position.z = 0.075;
    const hex = '#' + ch.color.toString(16).padStart(6, '0');
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: radial([[0, hex + '55'], [0.5, hex + '14'], [1, hex + '00']]), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
    halo.scale.setScalar(1.6); halo.position.z = -0.1;
    g.add(halo, disc, ring, glyph);
    return { g, ring, phase: i * 1.37, color: ch.color, p: 0 };
  });

  // message packets
  const packetGeo = (() => { const w = 0.34, h = 0.25, r = 0.08, x = -w / 2, y = -h / 2, s = new THREE.Shape(); s.moveTo(x + r, y); s.lineTo(x + 0.05, y - 0.08); s.lineTo(x + 0.15, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h); s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); const g = new THREE.ExtrudeGeometry(s, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 }); g.center(); return g; })();
  const TRAIL = 18, dotTex = radial([[0, 'rgba(255,255,255,1)'], [0.4, 'rgba(255,255,255,.35)'], [1, 'rgba(255,255,255,0)']]);
  const packets = Array.from({ length: 6 }, () => {
    const mesh = new THREE.Mesh(packetGeo, new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.3, roughness: 0.3, metalness: 0.1 }));
    mesh.visible = false; world.add(mesh);
    const tgeo = new THREE.BufferGeometry(); tgeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(TRAIL * 3), 3));
    const trail = new THREE.Points(tgeo, new THREE.PointsMaterial({ size: 0.13, map: dotTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    trail.visible = false; world.add(trail);
    return { mesh, trail, hist: [], live: false, t: 0, dur: 1.4, curve: null, ch: 0 };
  });

  // space: far dust, near bokeh
  const dustN = mobile ? 180 : 360, dp = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) dp.set([(Math.random() - 0.5) * 34, (Math.random() - 0.5) * 18, -6 - Math.random() * 14], i * 3);
  const dust = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(dp, 3)), new THREE.PointsMaterial({ color: COL.steel, size: 0.05, transparent: true, opacity: 0.5, depthWrite: false }));
  scene.add(dust);
  const bokehTex = radial([[0, 'rgba(183,194,210,.55)'], [0.6, 'rgba(183,194,210,.18)'], [1, 'rgba(183,194,210,0)']]);
  const bokeh = Array.from({ length: mobile ? 6 : 11 }, (_, i) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: bokehTex, transparent: true, depthWrite: false, opacity: 0.05 + Math.random() * 0.07 }));
    s.position.set((Math.random() - 0.5) * 13, (Math.random() - 0.5) * 7, 5 + Math.random() * 3.5); s.scale.setScalar(0.35 + Math.random() * 0.9);
    s.userData = { ph: i * 0.9, base: s.position.clone(), op: s.material.opacity }; scene.add(s); return s;
  });

  // interaction + scroll
  const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
  function pointer(x, y) { target.x = (x / innerWidth) * 2 - 1; target.y = (y / innerHeight) * 2 - 1; }
  // u: hero scroll progress (0..1) · lift: hero scrolled px · final: closing section progress (0..1)
  // join: the closing section's offset in viewport heights (-1 = its top at the bottom of the screen, 0 = at the top)
  const state = { u: 0, lift: 0, final: 0, join: 0, joinArrived: false };
  const absorbOf = (i, u) => easeInOut(clamp01((u - (0.04 + i * 0.13)) / 0.3));

  let elapsed = 0, nextLaunch = 0.6, lastCh = -1, typeStart = -9, kick = 0, lastEcho = -9;
  const cb = { launch: null, land: null };
  function arrive(t) {
    kick = 1; typeStart = t;
    if (t - lastEcho > 0.7) { const e = echoes.find(x => x.life >= 1); if (e) { e.life = 0; lastEcho = t; } }
  }
  function launch() {
    const p = packets.find(x => !x.live); if (!p) return;
    let ch; do { ch = Math.floor(Math.random() * CHANNELS.length); } while (ch === lastCh); lastCh = ch;
    const end = new THREE.Vector3((Math.random() - 0.5) * 0.9, (Math.random() - 0.3) * 0.5, 0.45);
    const start = channels[ch].g.position.clone();
    const ctrl = start.clone().lerp(end, 0.5).add(new THREE.Vector3(0, 1.1 + Math.random(), 1.4));
    p.curve = new THREE.QuadraticBezierCurve3(start, ctrl, end); p.t = 0; p.dur = 1.25 + Math.random() * 0.35; p.live = true; p.ch = ch; p.hist = [];
    p.mesh.visible = p.trail.visible = true; p.mesh.material.emissive.setHex(channels[ch].color); p.trail.material.color.setHex(channels[ch].color);
    if (cb.launch) cb.launch(ch);
  }
  function update(dt) {
    const t = elapsed, u = state.u, portrait = innerWidth < 768;
    cur.x += (target.x - cur.x) * 0.06; cur.y += (target.y - cur.y) * 0.06;
    const visH = 2 * base.camZ * Math.tan(THREE.MathUtils.degToRad(18));
    const joinMode = state.final > 0.001, fe = easeInOut(clamp01(state.final));
    if (joinMode) { world.position.set(0, base.endY + state.join * visH, 0); world.scale.setScalar(base.full * (0.62 + 0.26 * fe)); }
    else { world.position.set(0, base.y + state.lift / innerHeight * visH, 0); world.scale.setScalar(base.scale); }
    if (joinMode && fe > 0.97 && !state.joinArrived) { state.joinArrived = true; if (!reduceMotion) arrive(t); } else if (fe < 0.6) state.joinArrived = false;
    core.rotation.y = Math.sin(t * 0.35) * 0.28 + cur.x * 0.25 + (joinMode ? (1 - fe) * 0.55 : 0); core.rotation.x = -cur.y * 0.12 + Math.sin(t * 0.5) * 0.04; core.position.y = Math.sin(t * 0.8) * 0.05;
    camera.position.set(cur.x * 0.35, -cur.y * 0.2, base.camZ); camera.lookAt(cur.x * 0.35, -cur.y * 0.2, 0);
    dust.position.x = -cur.x * 0.3;
    bokeh.forEach(s => { const d = s.userData; s.position.set(d.base.x + Math.sin(t * 0.13 + d.ph) * 0.4 - cur.x * 1.4, d.base.y + Math.cos(t * 0.11 + d.ph) * 0.3 + cur.y * 0.8, d.base.z); });
    // channels: bob; on scroll each flies into the icon (staggered)
    channels.forEach((c, i) => {
      const p0 = portrait ? CHANNELS[i].m : CHANNELS[i].pos, a = absorbOf(i, u);
      c.g.visible = !joinMode;
      if (a > 0.97 && c.p <= 0.97 && !reduceMotion && !joinMode) arrive(t);
      c.p = a;
      const bx = p0[0], by = p0[1] + Math.sin(t * 0.8 + c.phase) * 0.12 * (1 - a), bz = p0[2];
      const k = a, ik = 1 - k, cx = bx * 0.45, cy = by + 1.2, cz = 1.4;      // a gentle arc toward the icon
      c.g.position.set(ik * ik * bx + 2 * ik * k * cx, ik * ik * by + 2 * ik * k * cy, ik * ik * bz + 2 * ik * k * cz + k * k * 0.4);
      c.g.rotation.y = -cur.x * 0.3 + Math.sin(t * 0.5 + c.phase) * 0.15; c.g.rotation.x = cur.y * 0.2;
      c.g.scale.setScalar(Math.max(0.0001, (portrait ? 0.68 : 1) * (1 - 0.95 * a)));
      c.ring.material.emissiveIntensity = 0.55 + 0.35 * Math.max(0, Math.sin(t * 2 + c.phase));
    });
    if (!reduceMotion && !joinMode && u < 0.03 && t > nextLaunch) { launch(); nextLaunch = t + (portrait ? 1.9 : 1.45); }
    packets.forEach(p => {
      if (!p.live) return;
      if (joinMode) { p.live = false; p.mesh.visible = p.trail.visible = false; return; }
      p.t += dt / p.dur; const k = Math.min(1, p.t), e = k * k * (3 - 2 * k);
      const pos = p.curve.getPointAt(e); p.mesh.position.copy(pos); p.mesh.lookAt(camera.position); p.mesh.scale.setScalar(1 - 0.55 * e);
      p.hist.unshift(pos.clone()); if (p.hist.length > TRAIL) p.hist.pop();
      const arr = p.trail.geometry.attributes.position.array; for (let i = 0; i < TRAIL; i++) { const h = p.hist[Math.min(i, p.hist.length - 1)]; arr[i * 3] = h.x; arr[i * 3 + 1] = h.y; arr[i * 3 + 2] = h.z; }
      p.trail.geometry.attributes.position.needsUpdate = true;
      if (p.t >= 1) { p.live = false; p.mesh.visible = p.trail.visible = false; arrive(t); if (cb.land) cb.land(p.ch); }
    });
    icon.dots.forEach((d, i) => { const l = (t - typeStart - i * 0.13) / 0.42, a = l >= 0 && l <= 1 ? Math.sin(l * Math.PI) : 0; d.position.z = d.userData.z + a * 26; d.scale.setScalar(1 + a * 0.18); d.material.emissiveIntensity = 0.8 + a * 0.9; });
    kick *= Math.pow(0.04, dt || 0.016);
    fill.intensity = 14 + kick * 18; glow.material.opacity = 0.8 + kick * 0.2;
    echoes.forEach(e => { if (e.life < 1) { e.life = Math.min(1, e.life + dt / 1.5); const s = icon.scale * (1 + e.life * 0.9); e.h.scale.set(s, -s, s); e.l.material.opacity = 0.7 * (1 - e.life); } else e.l.material.opacity = 0; });
  }
  const clock = new THREE.Clock(); let running = false, raf = 0, onFrame = null;
  function frame() { const dt = Math.min(clock.getDelta(), 0.05); elapsed += dt; update(dt); renderer.render(scene, camera); if (onFrame) onFrame(); raf = requestAnimationFrame(frame); }
  function renderStatic() { update(0); renderer.render(scene, camera); if (onFrame) onFrame(); }
  function resize() { renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); layout(); if (!running) renderStatic(); }
  let rT = 0; addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(resize, 120); });
  canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); running = false; cancelAnimationFrame(raf); });
  resize();
  const tmpV = new THREE.Vector3(), tmpU = new THREE.Vector3(), tmpS = new THREE.Vector3();
  return {
    setActive(on) { if (reduceMotion) { renderStatic(); return; } if (on && !running) { running = true; clock.getDelta(); raf = requestAnimationFrame(frame); } if (!on && running) { running = false; cancelAnimationFrame(raf); } },
    // Scroll setters: when the loop is paused the canvas is hidden, so a static frame is drawn only in reduced motion.
    setScroll(u, liftPx = 0) { if (u === state.u && liftPx === state.lift) return; state.u = u; state.lift = liftPx; if (!running && reduceMotion) renderStatic(); },
    setFrame(topPx, bottomPx) { fitBand = { top: topPx, bottom: bottomPx }; layout(); if (!running) renderStatic(); },
    setFinal(f) { if (f === state.final) return; state.final = f; if (!running && reduceMotion) renderStatic(); },
    setLift(v) { if (v === state.join) return; state.join = v; if (!running && reduceMotion) renderStatic(); },
    pointer, onFrame(fn) { onFrame = fn; }, onLaunch(fn) { cb.launch = fn; }, onLand(fn) { cb.land = fn; },
    // Screen position of a channel disc, its on-screen radius (px, ring included) and how present it is (1 = waiting, 0 = absorbed).
    project(i) {
      const g = channels[i].g; g.getWorldPosition(tmpV); g.getWorldScale(tmpS);
      tmpU.copy(tmpV); tmpU.y += 0.49 * tmpS.y; tmpV.project(camera); tmpU.project(camera);
      return { x: (tmpV.x + 1) / 2 * innerWidth, y: (1 - tmpV.y) / 2 * innerHeight, r: Math.abs(tmpU.y - tmpV.y) / 2 * innerHeight, a: 1 - channels[i].p };
    },
  };
}
window.HeroIconScene = { load, createHero, supportsWebGL };
})();
