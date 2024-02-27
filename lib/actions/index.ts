"use server";
import { ObjectId } from 'mongodb';
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../scraper/mongoose";
import { scrapeAmazonProduct } from "../scraper";
import Product from "@/models/productModel";
import { getHighestPrice, getLowestPrice, getAveragePrice } from "../utils";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "@/components/nodemailer";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    connectToDatabase();

    const scrappedProduct = await scrapeAmazonProduct(productUrl);

    if (!scrappedProduct) {
      return console.log("Error in getting scraping product");
    }

    let product = scrappedProduct;

    //if find the product in the database
    const existingProduct = await Product.findOne({ url: scrappedProduct.url });
    if (existingProduct) {
      const updatedProductHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrappedProduct.currentPrice },
      ];

      product = {
        ...scrappedProduct,
        priceHistory: updatedProductHistory,
        lowestPrice: getLowestPrice(updatedProductHistory),
        highestPrice: getHighestPrice(updatedProductHistory),
        averagePrice: getAveragePrice(updatedProductHistory),
      };
    }
    const newProduct = await Product.findOneAndUpdate(
      { url: scrappedProduct.url },
      product,
      { new: true, upsert: true }
    );
    revalidatePath(`/products/${newProduct._id}`);
    return newProduct;
  } catch (error) {
    throw new Error(`Error scraping product: ${error}`);
  }

}

export async function getProductsById(productId: string) {
  try {
    connectToDatabase();

    const product = await Product.findOne({ _id: productId });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error); 
  }
}

export async function getProductsByUrl(productUrl: string) {
  try {
    connectToDatabase();

    const Urlproduct = await Product.findOne({ url: productUrl });
    
    if (!Urlproduct) return null;
    
    const id = new ObjectId(`${Urlproduct._id}`);
    const strId = id.toHexString();
    console.log(Urlproduct._id, strId);
    
    return strId;
  } catch (error) {
    console.log(error); 
  }
}

export async function getAllProducts() {
  try {
    connectToDatabase();
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error(`Error getting all products: ${error}`);
  }
}

export async function getSimilarProducts(productId: string) {

  try {
    
    connectToDatabase();
    const similarProducts = await Product.find({_id: {$ne: productId}}).limit(4);
    return similarProducts;
  } catch (error) {
    console.log(error);
    
  }


}

export async function addUserEmailToProduct(productId : string, userEmail: string){

  try {

    const product = await Product.findOne({productId});

    if(!product) return;  
    const userExists = product.users.some((user: User) => user.email===userEmail);
    
    if(!userExists){
      product.users.push({email: userEmail});
      await product.save();
      const emailContent = await generateEmailBody(product, 'WELCOME')
      await sendEmail(emailContent, [userEmail]);
    }


  } catch (error) {
    console.log(error);
    
  }
}