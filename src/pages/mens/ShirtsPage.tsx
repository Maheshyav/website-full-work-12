import React from 'react';
import ProductGrid from '../../components/ProductGrid';
import { Product } from '../../types';
import { useProducts } from '../../contexts/ProductContext';

interface ShirtsPageProps {
  onAddToCart: (product: Product, size: string) => void;
  onAddToWaitlist: (product: Product, email: string, size: string) => void;
  isAdmin?: boolean;
}

export default function ShirtsPage({ onAddToCart, onAddToWaitlist, isAdmin }: ShirtsPageProps) {
  const { products, updateProduct } = useProducts();
  const shirts = products.filter(product => product.category === 'Shirts');

  return (
    <ProductGrid
      title="Men's Shirts"
      description="Classic and contemporary shirts for every occasion"
      heroImage="https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=2000&q=80"
      products={shirts}
      onAddToCart={onAddToCart}
      onAddToWaitlist={onAddToWaitlist}
      isAdmin={isAdmin}
      onProductUpdate={updateProduct}
    />
  );
}