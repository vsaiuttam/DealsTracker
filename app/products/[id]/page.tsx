import EmailModel from "@/components/EmailModel";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductsById, getSimilarProducts } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import React from "react";

type Props = {
  params: { id: string };
};

const productDetails = async ({ params: { id } }: Props) => {
  var count = 0;
  const product: Product = await getProductsById(id);
  const similarProducts = await getSimilarProducts(id);

  if (!product) redirect("/");

  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            width={480}
            height={300}
            className="mx-auto"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[24px] text-secondary font-semibold">
                {product.title}
              </p>

              <Link
                href={product.url}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                Visit Product
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <Image
                  src={"/assets/icons/red-heart.svg"}
                  alt="heart"
                  width={20}
                  height={20}
                />

                <p className="tast-base font-semibold text-[#D46f77]">
                  {formatNumber(product.reviewsCount)}
                </p>
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src={"/assets/icons/bookmark.svg"}
                  alt="bookmark"
                  width={20}
                  height={20}
                />
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src={"/assets/icons/share.svg"}
                  alt="share"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold">
                {product.currency} {formatNumber(product.currentPrice)}
              </p>
              <p className="text-[21px] text-black opacity-50 line-through">
                {product.currency} {formatNumber(product.originalPrice)}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image
                    src={"/assets/icons/star.svg"}
                    alt="star"
                    width={20}
                    height={20}
                  />
                  <p className="text-sm text-primary-orange font-semibold">
                    {product.stars || 0}
                  </p>
                </div>
                <div className="product-reviews">
                  <Image
                    src={"/assets/icons/comment.svg"}
                    alt="comment"
                    width={20}
                    height={20}
                  />
                  <p className="text-sm text-secondary/80 font-semibold">
                    {formatNumber(product.reviewsCount)} Reviews
                  </p>
                </div>
              </div>
              <p className="text-sm text-black opacity-50">
                <span className="text-primary-green font-semibold">93% </span>
                of buyers have recommended this product
              </p>
            </div>
          </div>
          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Current Price"
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
                iconSrc="/assets/icons/price-tag.svg"
              />
              <PriceInfoCard
                title="Average Price"
                value={`${product.currency} ${formatNumber(
                  product.averagePrice
                )}`}
                iconSrc="/assets/icons/chart.svg"
              />
              <PriceInfoCard
                title="Highest Price"
                value={`${product.currency} ${formatNumber(
                  product.highestPrice
                )}`}
                iconSrc="/assets/icons/arrow-up.svg"
              />
              <PriceInfoCard
                title="Lowest Price"
                value={`${product.currency} ${formatNumber(
                  product.lowestPrice
                )}`}
                iconSrc="/assets/icons/arrow-down.svg"
              />
            </div>
          </div>
          <EmailModel productId={id} />
        </div>
      </div>

      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <h3 className="section-text text-socondary">Product Desciption</h3>
          <div className="flex flex-col gap4">
            {product.description.split("\n").map((desc, index) => {
              const descrip = desc.trim();
              if (descrip.length < 60 || count == 10) return null;
              count++;
              return (
                <ul role="list" className="list-disc my-1 list-outside">
                  <li
                    key={index}
                    className="text-base leading-6 text-black opacity-80"
                  >
                    {desc}
                  </li>
                </ul>
              );
            })}
          </div>
        </div>

        <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
          <Image
            src={"/assets/icons/bag.svg"}
            alt="bag"
            width={22}
            height={22}
          />
          <Link href={`${product.url}`} className="text-base text-white">
            Buy Now
          </Link>
        </button>
      </div>

      {similarProducts && similarProducts?.length > 0 && (
        <div className="py-10 flex flex-col gap-2 w-full">
          <h3 className="section-text">Similar Products</h3>
          <div className="flex flex-wrap mx-auto justify-center gap-10 mt-7 w-full">
            {similarProducts.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default productDetails;
