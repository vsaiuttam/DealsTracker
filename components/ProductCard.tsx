import React from 'react'
import {Product} from '@/types';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
    product:  Product;
}


const ProductCard = ( {product} : Props) => {
  return (
    <Link href={`/products/${product._id}`} className='product-card'> 
        <div className='product-card_img-container'>
                <Image 
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={200}
                    className='product-card_img'
                /> 
        </div>

        <div className='flex flex-col gap-3'> 
            <h3 className='product-title'>{product.title}</h3>

            <div className='flex justify-between pr-4'>
                <p className='text-black opacity-50 text-md captilize'>{product.category}</p>
                <p>
                    <span className='mr-2 text-red-700'>-{product.discountPercentage}%</span>
                    <span className='text-lg text-black font-semibold'>{product.currency}</span>
                    <span className='text-lg text-black font-semibold'>{product.currentPrice}</span>
                </p>
            
            </div>

        </div>


    </Link>
  )
}

export default ProductCard
