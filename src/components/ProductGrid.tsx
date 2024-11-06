import React, { useState, useEffect } from 'react';
import ProductLightbox from './ProductLightbox';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { useProducts } from '../contexts/ProductContext';

interface ProductGridProps {
  title: string;
  description: string;
  heroImage: string;
  products: Product[];
  onAddToCart: (product: Product, size: string) => void;
  onAddToWaitlist: (product: Product, email: string, size: string) => void;
  isAdmin?: boolean;
  onProductUpdate?: (product: Product) => void;
}

export default function ProductGrid({ 
  title, 
  description, 
  heroImage, 
  products,
  onAddToCart,
  onAddToWaitlist,
  isAdmin,
  onProductUpdate 
}: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { refreshProducts } = useProducts();

  // Refresh products when component mounts
  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedProduct(products[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex === products.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedProduct(products[newIndex]);
  };

  const handleQuickView = (product: Product, index: number) => {
    setSelectedProduct(product);
    setCurrentIndex(index);
  };

  const handleProductUpdate = (updatedProduct: Product) => {
    if (onProductUpdate) {
      onProductUpdate(updatedProduct);
      refreshProducts(); // Refresh after update
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative h-[300px] mb-8 rounded-xl overflow-hidden">
        <img
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-xl">{description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            isAdmin={isAdmin}
            onUpdate={handleProductUpdate}
            onQuickView={() => handleQuickView(product, index)}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      )}

      <ProductLightbox
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onPrevious={handlePrevious}
        onNext={handleNext}
        showNavigation={products.length > 1}
        onAddToCart={onAddToCart}
        onAddToWaitlist={onAddToWaitlist}
        isAdmin={isAdmin}
        onUpdate={handleProductUpdate}
      />
    </div>
  );
}