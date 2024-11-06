import React, { useEffect } from 'react';
import ProductSlider from './ProductSlider';
import ParallaxSection from './ParallaxSection';
import FeaturedCollections from './FeaturedCollections';
import TrendingProducts from './TrendingProducts';
import FeatureHighlights from './FeatureHighlights';
import { Product } from '../types';
import { useProducts } from '../contexts/ProductContext';

interface HomeProps {
  onAddToCart: (product: Product, size: string) => void;
  onAddToWaitlist: (product: Product, email: string, size: string) => void;
  isAdmin?: boolean;
}

export default function Home({ 
  onAddToCart, 
  onAddToWaitlist,
  isAdmin
}: HomeProps) {
  const { refreshProducts } = useProducts();

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  return (
    <>
      <ProductSlider />
      <FeaturedCollections />
      <ParallaxSection />
      <TrendingProducts 
        onAddToCart={onAddToCart}
        onAddToWaitlist={onAddToWaitlist}
        isAdmin={isAdmin}
      />
      <FeatureHighlights />
    </>
  );
}