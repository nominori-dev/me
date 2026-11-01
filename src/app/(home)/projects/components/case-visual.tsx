"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

type Variant = "orbit" | "layers" | "grid" | "signal";

export function CaseVisual({ variant, project }: { variant: Variant; project: string }) {
    const host = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    useEffect(() => {
        const element = host.current;
        if (!element) return;
        let renderer: THREE.WebGLRenderer;
        try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); }
        catch { element.dataset.fallback = "true"; return; }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        element.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, 1, .1, 30);
        camera.position.set(0, 0, 7.7);
        const group = new THREE.Group(); scene.add(group);
        const pink = new THREE.MeshStandardMaterial({ color: 0xf092c5, metalness: .28, roughness: .4 });
        const pale = new THREE.MeshStandardMaterial({ color: 0xd6c9ef, metalness: .2, roughness: .45 });
        const dark = new THREE.MeshStandardMaterial({ color: 0x48404f, metalness: .2, roughness: .5 });
        const geometries: THREE.BufferGeometry[] = [];
        const extraMaterials: THREE.Material[] = [];
        const pieces: THREE.Object3D[] = [];
        const add = (geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z = 0) => {
            geometries.push(geo); const mesh = new THREE.Mesh(geo, mat); mesh.position.set(x, y, z); group.add(mesh); return mesh;
        };
        const box = (w: number, h: number, d: number, x: number, y: number, z = 0, mat = pink) => add(new THREE.BoxGeometry(w, h, d), mat, x, y, z);
        const ball = (r: number, x: number, y: number, z = 0, mat = pale) => add(new THREE.SphereGeometry(r, 16, 12), mat, x, y, z);
        const bar = (x1: number, y1: number, x2: number, y2: number, z = 0, mat = pale, width = .035) => {
            const length = Math.hypot(x2 - x1, y2 - y1); const part = box(length, width, width, (x1+x2)/2, (y1+y2)/2, z, mat); part.rotation.z = Math.atan2(y2-y1, x2-x1); return part;
        };
        if (project === "b2b-platform") {
            // Two organizations linked through a shared platform.
            for (const x of [-1.1, 1.1]) {
                box(.9, 1.35, .22, x, -.12, 0, dark);
                for (const dx of [-.22, .22]) for (const y of [-.42, -.03, .36]) box(.15, .15, .06, x + dx, y, .14, pale);
                box(.5, .09, .1, x, .62, .08, pink);
            }
            bar(-.62, -.05, .62, -.05, .03, pink, .06); ball(.16, 0, -.05, .14, pink);
            pieces.push(group);
        } else if (project === "multi-vendor") {
            // A storefront with an awning, window and door.
            box(2.25, 1.45, .22, 0, -.25, 0, dark);
            box(1.05, .76, .05, -.48, -.18, .14, pale); box(.46, 1.02, .08, .68, -.42, .16, pink);
            for (let i = 0; i < 5; i++) { const awning = box(.47, .3, .58, (i-2)*.46, .57, .17, i % 2 ? pale : pink); awning.rotation.x = -.35; }
            bar(-1.2, -.98, 1.2, -.98, .14, pale, .06); pieces.push(group);
        } else if (project === "semantic-search") {
            // A magnifying lens over a small network of related points.
            const ring = add(new THREE.TorusGeometry(.74, .075, 12, 80), pink, -.2, .2, .18); pieces.push(ring);
            bar(.35, -.35, 1.12, -1.12, .18, pink, .15);
            const pts = [[-.52,.38],[-.13,.64],[.17,.27],[-.35,-.11],[.14,-.16]];
            for (const [a,b] of [[0,1],[1,2],[0,3],[3,4],[2,4],[1,4]]) bar(pts[a][0],pts[a][1],pts[b][0],pts[b][1],.04,pale,.025);
            pts.forEach(([x,y]) => pieces.push(ball(.09,x,y,.09,pale)));
        } else if (project === "helpdesk") {
            // Two speech bubbles and a set of conversation lines.
            box(1.8, 1.15, .16, -.28, .18, 0, pale);
            const tail = box(.28, .28, .12, -.87, -.49, 0, pale); tail.rotation.z = Math.PI / 4;
            box(1.45, .92, .16, .45, -.46, .23, pink);
            const tail2 = box(.24, .24, .1, .92, -1.02, .23, pink); tail2.rotation.z = Math.PI / 4;
            for (let i=0; i<3; i++) bar(-.92, .43-i*.23, .25-i*.14, .43-i*.23, .1, dark, .045);
            for (let i=0; i<3; i++) ball(.065, .08+i*.34, -.45, .33, pale);
            pieces.push(group);
        } else if (project === "limo-rent") {
            // A simple side view of a car.
            box(2.4, .48, .55, 0, -.25, 0, pink);
            box(1.05, .42, .48, .1, .18, 0, dark);
            for (const x of [-.8, .8]) { const wheel = add(new THREE.TorusGeometry(.27, .1, 12, 40), pale, x, -.5, .31); pieces.push(wheel); }
            pieces.push(group);
        } else if (project === "3d-workshop") {
            // Wireframe edges around a dimensional asset.
            const asset = add(new THREE.IcosahedronGeometry(.95, 0), pink, 0, 0, 0); pieces.push(asset);
            const edges = new THREE.EdgesGeometry(asset.geometry); geometries.push(edges);
            const lineMaterial = new THREE.LineBasicMaterial({ color: 0xe6ddff }); extraMaterials.push(lineMaterial);
            const lines = new THREE.LineSegments(edges, lineMaterial); asset.add(lines);
        } else if (project === "ecommerce") {
            // Shopping basket and wheels.
            box(1.7, .82, .24, 0, 0, 0, pink);
            bar(-.86, .48, .86, .48, .12, pale, .08); bar(-1.2, .9, -.86, .45, .12, pale, .08);
            ball(.14, -.55, -.65, .1, pale); ball(.14, .55, -.65, .1, pale); pieces.push(group);
        } else if (project === "portfolio-site") {
            // A browser window with a portrait and content.
            box(2.3, 1.6, .18, 0, 0, 0, dark); box(2.12, 1.4, .05, 0, 0, .13, pale);
            box(2.12, .16, .06, 0, .62, .17, pink); ball(.2, -.57, .04, .2, pink);
            bar(-.1, .22, .78, .22, .2, dark, .06); bar(-.1, -.08, .65, -.08, .2, dark, .05); bar(-.1, -.32, .42, -.32, .2, dark, .05); pieces.push(group);
        } else {
            // An abstract orbit for any future cases without a dedicated illustration.
            const core = add(new THREE.IcosahedronGeometry(.65, 1), pink, 0, 0); pieces.push(core);
            for (let i=0;i<3;i++) { const ring = add(new THREE.TorusGeometry(1.22, .035, 12, 80), pale, 0, 0); ring.rotation.set(i*.8, i*.9, 0); pieces.push(ring); }
        }
        group.rotation.set(-.12, -.22, 0);
        scene.add(new THREE.AmbientLight(0xffffff, 1.4));
        const light = new THREE.DirectionalLight(0xffffff, 3); light.position.set(2, 3, 5); scene.add(light);
        let frame = 0, visible = false, active = false, started = 0;
        const render = () => renderer.render(scene, camera);
        const resize = () => { const { width, height } = element.getBoundingClientRect(); if (!width || !height) return; camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height, false); render(); };
        const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(element); resize();
        const draw = (time: number) => {
            if (!active || !visible || document.hidden || reduced) { frame = 0; return; }
            if (!started) started = time;
            const t = (time-started)/1000;
            group.rotation.y = -.22 + Math.sin(t*.9)*.15;
            group.rotation.x = -.12 + Math.sin(t*.7)*.06;
            if (project === "semantic-search") pieces.forEach((piece, i) => { if (i) piece.scale.setScalar(1 + .25 * (.5 + .5*Math.sin(t*2-i))); });
            render(); frame = requestAnimationFrame(draw);
        };
        const start = () => { active = true; if (visible && !reduced && !frame) { started = 0; frame = requestAnimationFrame(draw); } };
        const stop = () => { active = false; cancelAnimationFrame(frame); frame = 0; group.rotation.set(-.12, -.22, 0); pieces.forEach(piece => piece.scale.setScalar(1)); render(); };
        const target = element.closest(".project-card, .case-hero-art") || element;
        target.addEventListener("pointerenter", start); target.addEventListener("pointerleave", stop);
        target.addEventListener("focusin", start); target.addEventListener("focusout", stop);
        const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) { render(); if (active) start(); } else { cancelAnimationFrame(frame); frame = 0; } }); intersection.observe(element);
        return () => { cancelAnimationFrame(frame); intersection.disconnect(); resizeObserver.disconnect(); target.removeEventListener("pointerenter", start); target.removeEventListener("pointerleave", stop); target.removeEventListener("focusin", start); target.removeEventListener("focusout", stop); geometries.forEach(g => g.dispose()); extraMaterials.forEach(m => m.dispose()); pink.dispose(); pale.dispose(); dark.dispose(); renderer.dispose(); renderer.domElement.remove(); };
    }, [variant, project, reduced]);
    return <div className="case-visual" ref={host} aria-hidden="true"><span className="case-visual-fallback">◇</span></div>;
}
