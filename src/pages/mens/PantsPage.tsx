import React from 'react';
import ProductGrid from '../../components/ProductGrid';
import { Product } from '../../types';
import { useProducts } from '../../contexts/ProductContext';

interface PantsPageProps {
  onAddToCart: (product: Product, size: string) => void;
  onAddToWaitlist: (product: Product, email: string, size: string) => void;
  isAdmin?: boolean;
}

export default function PantsPage({ onAddToCart, onAddToWaitlist, isAdmin }: PantsPageProps) {
  const { products, updateProduct } = useProducts();
  const pants = products.filter(product => product.category === 'Pants');

  return (
    <ProductGrid
      title="Men's Pants"
      description="From casual to formal, find your perfect fit"
      heroImage="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=2000&q=80"
      products={pants}
      onAddToCart={onAddToCart}
      onAddToWaitlist={onAddToWaitlist}
      isAdmin={isAdmin}
      onProductUpdate={updateProduct}
    />
  );
}