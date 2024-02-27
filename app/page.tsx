
import Image from "next/image";
import React from "react";
import SearchBar from "@/components/SearchBar";
import HeroCourosel from "@/components/HeroCourosel";
import { getAllProducts } from "@/lib/actions"; 
import ProductCard from "@/components/ProductCard";

const page = async () => {

  const allProducts = await getAllProducts();

  return (
    <>
    
      <section className="px-5 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Your search for the best deals ends here.
              <Image
                src={"/assets/icons/arrow-right.svg"}
                alt="arrow"
                width={15}
                height={15}
              />
            </p>
            <h1 className="head-text">
              Unleash the power of{" "}
              <span className="text-primary">DealsTracker</span>
            </h1>
            <p className="mt-6">
              Get real-time updates on prices and never miss a deal again. Track
              prices across multiple websites and save money effortlessly.
            </p>
            <SearchBar />
          </div>
          <HeroCourosel />
        </div>
      </section>
      {/* Treding Section */}
      <section className="flex flex-col gap-10 px-6 md:px-20 py-24">
        <h2 className="text-secondary text-[26px] font-semibold">
          Treding Products
        </h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => {
            return <ProductCard key={product._id} product={product} />
          })}
        </div>
      </section>
    </>
  );
};

export default page;
