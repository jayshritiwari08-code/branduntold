"use client";

import { useEffect } from 'react';
import AOS from 'aos';

export default function AOSWrapper() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });
  }, []);

  return null;
}
