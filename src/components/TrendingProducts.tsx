import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import ProductLightbox from './ProductLightbox';
import { useProducts } from '../contexts/ProductContext';

interface TrendingProductsProps {
  onAddToCart: (product: Product, size: string) => void;
  onAddToWaitlist: (product: Product, email: string, size: string) => void;
  isAdmin?: boolean;
  onProductUpdate?: (product: Product) => void;
}

export default function TrendingProducts({ 
  onAddToCart, 
  onAddToWaitlist,
  isAdmin,
  onProductUpdate
}: TrendingProductsProps) {
  const { products, updateProduct, refreshProducts } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  // Get the first 8 products for trending section
  const trendingProducts = products.slice(0, 8);

  const handleQuickView = (product: Product, index: number) => {
    setSelectedProduct(product);
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? trendingProducts.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedProduct(trendingProducts[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex === trendingProducts.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedProduct(trendingProducts[newIndex]);
  };

  const handleProductUpdate = (product: Product) => {
    updateProduct(product);
    if (onProductUpdate) {
      onProductUpdate(product);
    }
    refreshProducts();
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Trending Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              isAdmin={isAdmin}
              onUpdate={handleProductUpdate}
              onQuickView={() => handleQuickView(product, index)}
            />
          ))}
        </div>
      </div>

      <ProductLightbox
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onPrevious={handlePrevious}
        onNext={handleNext}
        showNavigation={true}
        onAddToCart={onAddToCart}
        onAddToWaitlist={onAddToWaitlist}
        isAdmin={isAdmin}
        onUpdate={handleProductUpdate}
      />
    </section>
  );
}