import axios from "axios";
import * as cheerio from "cheerio";
import { extractPrice, extractCurrency, extractDescription } from "../utils";

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  const username = String(process.env.BIGHT_DATA_USERNAME);
  const password = String(process.env.BIGHT_DATA_PASSWORD);
  const PORT = 22225;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username} - session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io:22225",
    PORT,
    rejectUnauthorized: false,
  };

  try {
    //Fetch the data from the website
    const response = await axios.get(url, options);

    //Load the data into cheerio
    const $ = cheerio.load(response.data);

    //Scrape the data

    const title = $("#productTitle").text().trim();
    const curremtPrice = extractPrice(
      $(
        ".a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay span.a-price-whole"
      )
    );
    const originalPrice = extractPrice(
      $(".a-price.a-text-price span.a-offscreen")
    );
    const reviewCount = $("#acrCustomerReviewText").text().trim().split(" ")[0].replace(/,/g, '');
    const discountPercentage = $(".savingsPercentage")
      .text()
      .replace(/[-%]/g, '');
    const outOfStock =
      $("#availability span").text().trim() === "In stock" ? false : true;
    const image =
      $("#landingImage").attr("data-a-dynamic-image") ||
      $("#imgBlkFront").attr("data-a-dynamic-image");
    const imageUrls = Object.keys(JSON.parse(image || "{}"));
    const currency = extractCurrency($(".a-price-symbol"));
    const noOfPurchases = $("#social-proofing-faceout-title-tk_bought")
      .text()
      .trim();
    const stars = $("#averageCustomerReviews").text().trim().split(" ")[0];
    const category = $("#wayfinding-breadcrumbs_feature_div ul li a")
      .text()
      .trim()
      .split("\n");
    const getCategory = category[category.length - 1].trim();
    const description = extractDescription($);

    //Construct the data object
    const data = {
      title,
      url,
      discountPercentage : Number(discountPercentage) || 0,
      currentPrice: Number(curremtPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice),
      noOfPurchases,
      priceHistory: [],
      currency: currency || "$",
      stars: Number(stars) || 0,
      image: imageUrls[0],
      reviewsCount: Number(reviewCount),
      outOfStock,
      category: getCategory,
      description,
      lowestPrice: Number(curremtPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(curremtPrice),
      averagePrice: Number(curremtPrice) || Number(originalPrice),
    };
    console.log(data);
    
    return data;
  } catch (error: any) {
    throw new Error(`Failed to scrape product: ${error}`);
  }
}

