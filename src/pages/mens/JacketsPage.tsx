import React from 'react';
import ProductGrid from '../../components/ProductGrid';
import { Product } from '../../types';
import { useProducts } from '../../contexts/ProductContext';

interface JacketsPageProps {
  onAddToCart: (product: Product, size: string) => void;
  onAddToWaitlist: (product: Product, email: string, size: string) => void;
  isAdmin?: boolean;
}

export default function JacketsPage({ onAddToCart, onAddToWaitlist, isAdmin }: JacketsPageProps) {
  const { products, updateProduct } = useProducts();
  const jackets = products.filter(product => product.category === 'Jackets');

  return (
    <ProductGrid
      title="Men's Jackets"
      description="Stay stylish in any weather"
      heroImage="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=2000&q=80"
      products={jackets}
      onAddToCart={onAddToCart}
      onAddToWaitlist={onAddToWaitlist}
      isAdmin={isAdmin}
      onProductUpdate={updateProduct}
    />
  );
}