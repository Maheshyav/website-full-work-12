import React, { useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import { Product } from '../types';
import { useProducts } from '../contexts/ProductContext';

interface WomensPageProps {
  onAddToCart: (product: Product, size: string) => void;
  onAddToWaitlist: (product: Product, email: string, size: string) => void;
  isAdmin?: boolean;
}

export default function WomensPage({ onAddToCart, onAddToWaitlist, isAdmin }: WomensPageProps) {
  const { products, updateProduct, refreshProducts } = useProducts();
  
  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const womensProducts = products.filter(product => product.category === 'Women');

  return (
    <ProductGrid
      title="Women's Collection"
      description="Elevate your style with our latest designs"
      heroImage="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=2000&q=80"
      products={womensProducts}
      onAddToCart={onAddToCart}
      onAddToWaitlist={onAddToWaitlist}
      isAdmin={isAdmin}
      onProductUpdate={updateProduct}
    />
  );
}