import React, { useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import { Product } from '../types';
import { useProducts } from '../contexts/ProductContext';

interface KidsPageProps {
  onAddToCart: (product: Product, size: string) => void;
  onAddToWaitlist: (product: Product, email: string, size: string) => void;
  isAdmin?: boolean;
}

export default function KidsPage({ onAddToCart, onAddToWaitlist, isAdmin }: KidsPageProps) {
  const { products, updateProduct, refreshProducts } = useProducts();
  
  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const kidsProducts = products.filter(product => product.category === 'Kids');

  return (
    <ProductGrid
      title="Kids Collection"
      description="Fun and comfortable styles for little ones"
      heroImage="https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=2000&q=80"
      products={kidsProducts}
      onAddToCart={onAddToCart}
      onAddToWaitlist={onAddToWaitlist}
      isAdmin={isAdmin}
      onProductUpdate={updateProduct}
    />
  );
}