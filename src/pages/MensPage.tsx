import React, { useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import { Product } from '../types';
import { useProducts } from '../contexts/ProductContext';

interface MensPageProps {
  onAddToCart: (product: Product, size: string) => void;
  onAddToWaitlist: (product: Product, email: string, size: string) => void;
  isAdmin?: boolean;
}

export default function MensPage({ onAddToCart, onAddToWaitlist, isAdmin }: MensPageProps) {
  const { products, updateProduct, refreshProducts } = useProducts();
  
  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const mensProducts = products.filter(product => product.category === 'Men');

  return (
    <ProductGrid
      title="Men's Collection"
      description="Discover our latest styles"
      heroImage="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=2000&q=80"
      products={mensProducts}
      onAddToCart={onAddToCart}
      onAddToWaitlist={onAddToWaitlist}
      isAdmin={isAdmin}
      onProductUpdate={updateProduct}
    />
  );
}