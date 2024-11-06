import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from '../types';
import { mensProducts, womensProducts, kidsProducts, watchesProducts } from '../data/products';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: number) => Promise<void>;
  getProductsByCategory: (category: string) => Product[];
  refreshProducts: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: React.ReactNode;
}

// Combine all initial products with proper categorization
const initialProducts: Product[] = [
  ...mensProducts.map(p => ({ ...p, category: 'Men' })),
  ...womensProducts.map(p => ({ ...p, category: 'Women' })),
  ...kidsProducts.map(p => ({ ...p, category: 'Kids' })),
  ...watchesProducts.map(p => ({ ...p, category: 'Watches' }))
];

const STORAGE_KEY = 'luxe_products';

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEY);
      return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    } catch (error) {
      console.error('Error loading products:', error);
      return initialProducts;
    }
  });

  const saveProducts = useCallback((newProducts: Product[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
    } catch (error) {
      console.error('Error saving products:', error);
    }
  }, []);

  const refreshProducts = useCallback(() => {
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEY);
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        setProducts(initialProducts);
        saveProducts(initialProducts);
      }
    } catch (error) {
      console.error('Error refreshing products:', error);
      setProducts(initialProducts);
      saveProducts(initialProducts);
    }
  }, [saveProducts]);

  const addProduct = useCallback(async (product: Product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      inStock: true,
      sizes: product.sizes || ['S', 'M', 'L', 'XL']
    };
    
    const newProducts = [...products, newProduct];
    setProducts(newProducts);
    saveProducts(newProducts);
  }, [products, saveProducts]);

  const updateProduct = useCallback(async (updatedProduct: Product) => {
    const newProducts = products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(newProducts);
    saveProducts(newProducts);
  }, [products, saveProducts]);

  const deleteProduct = useCallback(async (productId: number) => {
    const newProducts = products.filter(product => product.id !== productId);
    setProducts(newProducts);
    saveProducts(newProducts);
  }, [products, saveProducts]);

  const getProductsByCategory = useCallback((category: string) => {
    return products.filter(product => 
      category === 'All' ? true : product.category === category
    );
  }, [products]);

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    refreshProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}