// app/components/aos-init.tsx
// Tiny "use client" island — only purpose is to run AOS.init() on mount.
// Keeps the parent page.tsx a pure Server Component.
"use client";

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AosInit() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
        });
    }, []);

    return null; // renders nothing — side-effect only
}