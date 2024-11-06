import React, { useState } from 'react';
import { Heart, Edit2, Save, X, Trash2 } from 'lucide-react';
import { Product } from '../types';
import Toast from './Toast';
import ProductForm from './ProductForm';

interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
  onUpdate?: (product: Product) => void;
  onDelete?: () => void;
  onQuickView?: () => void;
}

export default function ProductCard({ 
  product, 
  isAdmin, 
  onUpdate, 
  onDelete,
  onQuickView 
}: ProductCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleUpdate = async (updatedProduct: Product) => {
    try {
      if (onUpdate) {
        await onUpdate({ ...updatedProduct, id: product.id });
        setToastMessage('Product updated successfully');
        setShowToast(true);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setToastMessage('Error updating product');
      setShowToast(true);
    }
  };

  if (isEditing && isAdmin) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <h3 className="font-medium">Edit Product</h3>
          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <ProductForm
          product={product}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          {isAdmin && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </>
          )}
          <button className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
            <Heart className="h-4 w-4" />
          </button>
        </div>
        {onQuickView && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={onQuickView}
              className="w-full bg-white text-black py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              Quick View
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg mb-1">{product.name}</h3>
          <p className="text-gray-600">{product.price}</p>
        </div>
        <span className="text-sm text-gray-500">{product.category}</span>
      </div>

      <Toast
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}