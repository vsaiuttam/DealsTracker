"use client";

import { getProductsByUrl, scrapeAndStoreProduct } from "@/lib/actions";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";

const isValidAamazonLink = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    if (
      hostname.includes("amazon.in") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
  } catch (error) {
    new Error("Invalid Amazon Link");
    return false;
  }
  return false;
};

const SearchBar = () => {
  const [searchPromt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidLink = isValidAamazonLink(searchPromt);

    if (!isValidLink) {
      return alert("Please enter a valid Amazon link");
    }

    try {
      setIsLoading(true);
      //Scrap the Product
      const product = await scrapeAndStoreProduct(searchPromt);
      const products = await getProductsByUrl(searchPromt);
      setIsLoading(false);
      redirect('/products/' + products);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

    
  };


  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPromt}
        placeholder="Paste the product link"
        onChange={(e) => setSearchPrompt(e.target.value)}
        className="searchbar-input"
      />
      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPromt.length === 0 || isLoading}
      >
        {isLoading ? "Tracking..." : "Track"}
      </button>
    </form>
  );
};

export default SearchBar;
