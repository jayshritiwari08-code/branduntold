"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function TawkTo() {
  useEffect(() => {
    // Dynamically calculate 20% of the viewport height as the bottom offset
    const updatePosition = () => {
      if (typeof window !== "undefined") {
        const height = window.innerHeight;
        const yOffset = Math.round(height * 0.1); // 20% from the bottom

        (window as any).Tawk_API = (window as any).Tawk_API || {};
        (window as any).Tawk_API.customStyle = {
          visibility: {
            desktop: {
              position: "br",
              xOffset: 20,
              yOffset: yOffset,
            },
            mobile: {
              position: "br",
              xOffset: 15,
              yOffset: yOffset,
            },
          },
        };
      }
    };

    // Initialize position
    updatePosition();

    // Re-calculate on window resize
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return (
    <Script
      id="tawk-to-script"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/6a340805ccc4261d49d5d779/1jrdjulrp';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `,
      }}
    />
  );
}
