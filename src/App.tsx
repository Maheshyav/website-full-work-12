import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Home from './pages/Home';
import MensPage from './pages/MensPage';
import WomensPage from './pages/WomensPage';
import KidsPage from './pages/KidsPage';
import WatchesPage from './pages/WatchesPage';
import ShirtsPage from './pages/mens/ShirtsPage';
import PantsPage from './pages/mens/PantsPage';
import JacketsPage from './pages/mens/JacketsPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminCredentials from './components/AdminCredentials';
import { CartItem, Product, WaitlistItem } from './types';
import Toast from './components/Toast';
import { AdminProvider, useAdmin } from './contexts/AdminContext';
import { ProductProvider } from './contexts/ProductContext';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAdmin();
  return isAdmin ? <>{children}</> : <Navigate to="/admin/login" />;
}

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [waitlistItems, setWaitlistItems] = useState<WaitlistItem[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { isAdmin } = useAdmin();

  const updateQuantity = (id: number, size: string, quantity: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id && item.size === size ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: number, size: string) => {
    setCartItems(items => items.filter(item => !(item.id === id && item.size === size)));
  };

  const handleAddToCart = (product: Product, size: string) => {
    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.replace('$', '')),
      image: product.image,
      quantity: 1,
      size
    };

    setCartItems(items => {
      const existingItem = items.find(
        item => item.id === product.id && item.size === size
      );

      if (existingItem) {
        return items.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...items, newItem];
    });

    setToastMessage('Added to cart successfully!');
    setShowToast(true);
    setIsCartOpen(true);
  };

  const handleAddToWaitlist = (product: Product, email: string, size: string) => {
    const newWaitlistItem: WaitlistItem = {
      productId: product.id,
      email,
      size,
      dateAdded: new Date()
    };

    setWaitlistItems(items => [...items, newWaitlistItem]);
    setToastMessage('Added to waitlist successfully!');
    setShowToast(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/credentials"
          element={
            <ProtectedRoute>
              <AdminCredentials />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route
          path="*"
          element={
            <>
              <Navbar 
                cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                onCartClick={() => setIsCartOpen(true)}
              />
              <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
              />
              <main className="pt-16">
                <Routes>
                  <Route 
                    path="/" 
                    element={
                      <Home 
                        onAddToCart={handleAddToCart}
                        onAddToWaitlist={handleAddToWaitlist}
                        isAdmin={isAdmin}
                      />
                    } 
                  />
                  <Route 
                    path="/men" 
                    element={
                      <MensPage 
                        onAddToCart={handleAddToCart}
                        onAddToWaitlist={handleAddToWaitlist}
                        isAdmin={isAdmin}
                      />
                    } 
                  />
                  <Route 
                    path="/women" 
                    element={
                      <WomensPage 
                        onAddToCart={handleAddToCart}
                        onAddToWaitlist={handleAddToWaitlist}
                        isAdmin={isAdmin}
                      />
                    } 
                  />
                  <Route 
                    path="/kids" 
                    element={
                      <KidsPage 
                        onAddToCart={handleAddToCart}
                        onAddToWaitlist={handleAddToWaitlist}
                        isAdmin={isAdmin}
                      />
                    } 
                  />
                  <Route 
                    path="/watches" 
                    element={
                      <WatchesPage 
                        onAddToCart={handleAddToCart}
                        onAddToWaitlist={handleAddToWaitlist}
                        isAdmin={isAdmin}
                      />
                    } 
                  />
                  <Route 
                    path="/men/shirts" 
                    element={
                      <ShirtsPage 
                        onAddToCart={handleAddToCart}
                        onAddToWaitlist={handleAddToWaitlist}
                        isAdmin={isAdmin}
                      />
                    } 
                  />
                  <Route 
                    path="/men/pants" 
                    element={
                      <PantsPage 
                        onAddToCart={handleAddToCart}
                        onAddToWaitlist={handleAddToWaitlist}
                        isAdmin={isAdmin}
                      />
                    } 
                  />
                  <Route 
                    path="/men/jackets" 
                    element={
                      <JacketsPage 
                        onAddToCart={handleAddToCart}
                        onAddToWaitlist={handleAddToWaitlist}
                        isAdmin={isAdmin}
                      />
                    } 
                  />
                </Routes>
              </main>
              <Footer />
              <Toast
                show={showToast}
                message={toastMessage}
                onClose={() => setShowToast(false)}
              />
            </>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <ProductProvider>
          <AppContent />
        </ProductProvider>
      </AdminProvider>
    </BrowserRouter>
  );
}

export default App;