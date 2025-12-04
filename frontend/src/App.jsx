import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Collection from "./pages/Collections.jsx";
import CollectionDetails from "./pages/CollectionsDetails.jsx";
import Contact from "./pages/Contact.jsx";
import Faq from "./pages/Faqs.jsx";
import Privacy from "./pages/Privacy.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ShippingDelivery from "./pages/ShippingDelivery.jsx";
import TermsConditions from "./pages/TermsConditions.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Blog from "./pages/Blog.jsx";
import BlogDetailsPage from "./pages/BlogDetailsPage.jsx";
import About from "./pages/About.jsx";
import ScrollToTopAction from "./components/ScrollToTopAction.jsx";
import Error from "./pages/Error.jsx";
import NewsletterPopup from "./pages/NewsletterPopup.jsx";

function AppWrapper() {
  const location = useLocation();

  const isCheckoutPage = location.pathname === "/checkout";
  return (
    <>
      <div className="min-h-screen bg-[#172229]">
        <NewsletterPopup />
        {!isCheckoutPage && <Navbar />}
        <ScrollToTopAction />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collection />} />
          <Route
            path="/collections/:collectionsId"
            element={<CollectionDetails />}
          />
          <Route path="/products" element={<Collection />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/pages/about" element={<About />} />
          <Route path="/pages/contact" element={<Contact />} />
          <Route path="/pages/privacy" element={<Privacy />} />
          <Route path="/pages/faq" element={<Faq />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/pages/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/pages/shipping-delivery"
            element={<ShippingDelivery />}
          />
          <Route path="/pages/terms-conditions" element={<TermsConditions />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requireRole="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/realestate" element={<Blog />} />
          <Route
            path="/blogs/realestate/:blogId"
            element={<BlogDetailsPage />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
