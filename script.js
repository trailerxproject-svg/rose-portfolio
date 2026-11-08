import * as THREE from "three";

const sceneHost = document.querySelector("#scene");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (sceneHost && !reducedMotion) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, sceneHost.clientWidth / sceneHost.clientHeight, 0.1, 100);
  camera.position.z = 8;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  renderer.setSize(sceneHost.clientWidth, sceneHost.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  sceneHost.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  const geometry = new THREE.IcosahedronGeometry(1.8, 5);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x9d294b, metalness: 0.24, roughness: 0.19,
    transmission: 0.12, thickness: 1.2, clearcoat: 1, clearcoatRoughness: 0.12
  });
  const core = new THREE.Mesh(geometry, material);
  group.add(core);

  const wire = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.86, 2),
    new THREE.MeshBasicMaterial({ color: 0xffa4b8, wireframe: true, transparent: true, opacity: 0.12 })
  );
  group.add(wire);

  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xe44761, transparent: true, opacity: 0.5 });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(2.45, 0.006, 8, 180), ringMaterial);
  ring.rotation.x = 1.15;
  ring.rotation.y = 0.25;
  group.add(ring);

  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.003, 8, 180), new THREE.MeshBasicMaterial({ color: 0xffc0ce, transparent: true, opacity: 0.22 }));
  ring2.rotation.x = 0.55;
  ring2.rotation.y = -0.5;
  group.add(ring2);

  scene.add(new THREE.AmbientLight(0xffffff, 1.25));
  const keyLight = new THREE.PointLight(0xff718e, 45, 20);
  keyLight.position.set(3, 3, 5);
  scene.add(keyLight);
  const fillLight = new THREE.PointLight(0x6b315e, 28, 18);
  fillLight.position.set(-4, -2, 2);
  scene.add(fillLight);

  const particleCount = 450;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: 0xffa2b7, size: 0.018, transparent: true, opacity: 0.7 }));
  scene.add(particles);

  let pointerX = 0, pointerY = 0;
  window.addEventListener("pointermove", (event) => {
    pointerX = (event.clientX / window.innerWidth - 0.5) * 0.45;
    pointerY = (event.clientY / window.innerHeight - 0.5) * 0.3;
  }, { passive: true });

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    group.rotation.y = t * 0.12 + pointerX;
    group.rotation.x = Math.sin(t * 0.22) * 0.12 + pointerY;
    wire.rotation.y = -t * 0.08;
    ring.rotation.z = t * 0.08;
    ring2.rotation.z = -t * 0.055;
    particles.rotation.y = t * 0.008;
    renderer.render(scene, camera);
  }
  animate();

  const resizeObserver = new ResizeObserver(() => {
    const width = sceneHost.clientWidth;
    const height = sceneHost.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
  resizeObserver.observe(sceneHost);
}

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

if (window.gsap && !reducedMotion) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(".hero-copy > *", { y: 28, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.15 });
  gsap.from(".project-card", {
    y: 55, opacity: 0, duration: 0.85, stagger: 0.16, ease: "power3.out",
    scrollTrigger: { trigger: ".project-grid", start: "top 82%" }
  });
  gsap.from(".about-left, .about-right", {
    y: 45, opacity: 0, duration: 0.9, stagger: 0.2, ease: "power3.out",
    scrollTrigger: { trigger: ".about", start: "top 75%" }
  });
  gsap.from(".contact h2, .contact-link", {
    y: 35, opacity: 0, duration: 0.9, stagger: 0.15, ease: "power3.out",
    scrollTrigger: { trigger: ".contact", start: "top 78%" }
  });
}
