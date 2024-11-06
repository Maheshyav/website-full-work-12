import React from 'react';
import ProductSlider from '../components/ProductSlider';
import ParallaxSection from '../components/ParallaxSection';
import FeaturedCollections from '../components/FeaturedCollections';
import TrendingProducts from '../components/TrendingProducts';
import FeatureHighlights from '../components/FeatureHighlights';
import { Product } from '../types';

interface HomeProps {
  onAddToCart: (product: Product, size: string) => void;
  onAddToWaitlist: (product: Product, email: string, size: string) => void;
  isAdmin?: boolean;
  onProductUpdate?: (product: Product) => void;
}

export default function Home({ 
  onAddToCart, 
  onAddToWaitlist,
  isAdmin,
  onProductUpdate 
}: HomeProps) {
  return (
    <>
      <ProductSlider isAdmin={isAdmin} onUpdate={onProductUpdate} />
      <FeaturedCollections isAdmin={isAdmin} onUpdate={onProductUpdate} />
      <ParallaxSection isAdmin={isAdmin} onUpdate={onProductUpdate} />
      <TrendingProducts 
        onAddToCart={onAddToCart}
        onAddToWaitlist={onAddToWaitlist}
        isAdmin={isAdmin}
        onProductUpdate={onProductUpdate}
      />
      <FeatureHighlights />
    </>
  );
}