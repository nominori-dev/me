"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

const COUNT = 2400;
const TAU = Math.PI * 2;

// Corresponding points move from a woven knot to an ordered sphere, then a ring.
function makeForms() {
    const forms = [new Float32Array(COUNT * 3), new Float32Array(COUNT * 3), new Float32Array(COUNT * 3)];
    for (let i = 0; i < COUNT; i++) {
        const u = i / COUNT;
        const angle = i * Math.PI * (3 - Math.sqrt(5));
        const y = 1 - 2 * (i + .5) / COUNT;
        const radius = Math.sqrt(1 - y * y);
        const offset = i * 3;
        // A thin tube follows a trefoil knot: complicated, but still coherent.
        const t = TAU * ((i * 0.61803398875) % 1);
        const side = TAU * ((i * 0.754877666) % 1);
        const tube = .11;
        forms[0][offset] = (Math.sin(t) + 2 * Math.sin(2 * t)) * .31 + Math.cos(side) * tube;
        forms[0][offset + 1] = (Math.cos(t) - 2 * Math.cos(2 * t)) * .31 + Math.sin(side) * tube;
        forms[0][offset + 2] = -Math.sin(3 * t) * .4 + Math.cos(side) * tube;
        forms[1][offset] = Math.cos(angle) * radius * .88;
        forms[1][offset + 1] = y * .88;
        forms[1][offset + 2] = Math.sin(angle) * radius * .88;
        const ringAngle = TAU * u * 7;
        const ringSide = angle;
        const ringRadius = .78 + .17 * Math.cos(ringSide);
        forms[2][offset] = ringRadius * Math.cos(ringAngle);
        forms[2][offset + 1] = .17 * Math.sin(ringSide);
        forms[2][offset + 2] = ringRadius * Math.sin(ringAngle);
    }
    return forms;
}

export function ParticleMorph() {
    const host = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    useEffect(() => {
        const container = host.current;
        if (!container) return;
        let renderer: THREE.WebGLRenderer;
        try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); }
        catch { container.dataset.fallback = "true"; return; }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(36, 1, .1, 20);
        camera.position.set(0, 0, 4.8);
        const group = new THREE.Group();
        scene.add(group);
        const forms = makeForms();
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(forms[0].slice(), 3));
        const material = new THREE.PointsMaterial({ color: 0x345f70, size: .022, transparent: true, opacity: .8, depthWrite: false, sizeAttenuation: true });
        group.add(new THREE.Points(geometry, material));
        // Fine orbital lines give the sculpture structure without obscuring the particles.
        const ringGeometry = new THREE.BufferGeometry().setFromPoints(Array.from({ length: 129 }, (_, i) => {
            const a = i / 128 * TAU;
            return new THREE.Vector3(Math.cos(a) * 1.17, Math.sin(a) * 1.17, 0);
        }));
        const ringMaterial = new THREE.LineBasicMaterial({ color: 0x345f70, transparent: true, opacity: .18 });
        const ringA = new THREE.Line(ringGeometry, ringMaterial);
        const ringB = new THREE.Line(ringGeometry, ringMaterial);
        ringA.rotation.x = 1.15; ringB.rotation.y = 1.1;
        group.add(ringA, ringB);
        const resize = () => {
            const { width, height } = container.getBoundingClientRect();
            if (!width || !height) return;
            camera.aspect = width / height; camera.updateProjectionMatrix();
            renderer.setSize(width, height, false);
        };
        const observer = new ResizeObserver(resize);
        observer.observe(container); resize();
        let visible = true;
        const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0 });
        visibility.observe(container);
        let frame = 0;
        let start: number | undefined;
        const draw = (time: number) => {
            if (start === undefined) start = time;
            if (visible && !document.hidden) {
                const seconds = reduced ? 7 : (time - start) / 1000;
                const cycle = seconds % 21;
                const stage = Math.floor(cycle / 7);
                const fraction = Math.max(0, Math.min(1, (cycle % 7 - 3) / 3));
                const blend = fraction * fraction * (3 - 2 * fraction);
                const from = forms[stage]; const to = forms[(stage + 1) % forms.length];
                const positions = geometry.attributes.position as THREE.BufferAttribute;
                const data = positions.array as Float32Array;
                for (let i = 0; i < data.length; i++) data[i] = from[i] + (to[i] - from[i]) * blend;
                positions.needsUpdate = true;
                group.rotation.y = reduced ? .4 : seconds * .11;
                group.rotation.x = .18 + (reduced ? 0 : Math.sin(seconds * .18) * .12);
                const dark = document.documentElement.classList.contains("dark");
                material.color.set(dark ? 0xa4d8e8 : 0x345f70);
                ringMaterial.color.set(dark ? 0x94c6d7 : 0x345f70);
                renderer.render(scene, camera);
            }
            frame = requestAnimationFrame(draw);
        };
        frame = requestAnimationFrame(draw);
        return () => { cancelAnimationFrame(frame); observer.disconnect(); visibility.disconnect(); geometry.dispose(); material.dispose(); ringGeometry.dispose(); ringMaterial.dispose(); renderer.dispose(); renderer.domElement.remove(); };
    }, [reduced]);
    return <div className="morph-wrap"><div ref={host} className="sculpture" role="img" aria-label="An abstract sculpture moving from a complex knot into simple geometric forms"><span className="sculpture-fallback">◌</span></div></div>;
}
