"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
  { src: "/assets/images/hero-1.svg", alt: "Watch" },
  { src: "/assets/images/hero-2.svg", alt: "TV" },
  { src: "/assets/images/hero-3.svg", alt: "Laptop" },
  { src: "/assets/images/hero-4.svg", alt: "Mobile Phone" },
  { src: "/assets/images/hero-5.svg", alt: "Table" },
];

const HeroCourosel = () => {
  return (
    <div className="hero-carousel">
      <Carousel 
        showThumbs={false}
        // autoPlay={true}
        // infiniteLoop={true}
        // interval = {3000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((img) => {
          return <Image key={img.alt} src={img.src} alt={img.alt} height={484} width={484}  className="object-contain"/>;
        })}
      </Carousel>
      <Image 
        src={'/assets/icons/hand-drawn-arrow.svg'}
        alt="arrow"
        width={175}
        height={175}
        className="absolute max-xl:hidden -left-[15%] "
      />
    </div>
  );
};

export default HeroCourosel;
