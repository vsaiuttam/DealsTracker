import Image from "next/image";
import Link from "next/link";
import React from "react";

const navLinks = [
  { src: "/assets/icons/search.svg", alt: "search" },
  { src: "/assets/icons/black-heart.svg", alt: "favorites" },
  { src: "/assets/icons/user.svg", alt: "user" },
];

const Navbar = () => {
  return (
    <header className="w-full bg-slate-100/50">
      <nav className="nav">
        <Link href={"/"} className="flex items-center gap-1">
          <Image
            src={"/assets/icons/logo.svg"}
            width={30}
            height={30}
            alt="logo"
          />
          <p className="nav-logo">
            Deals<span className="text-primary">Tracker</span>
          </p>
        </Link>

        <div className="flex items-center gap-5">
          {navLinks.map((img) => {
            return (
              <Image
                key={img.alt}
                src={img.src}
                alt={img.alt}
                width={30}
                height={30}
                className="object-contain cursor-pointer"
              />
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
