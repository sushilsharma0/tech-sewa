import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../components/layout/AdminLayout";
import { AppLayout } from "../components/layout/AppLayout";
import { AdminDashboard, AdminResourcePage } from "../pages/admin/AdminPages";
import { AuthPage } from "../pages/auth/AuthPages";
import { BrandsPage, SearchPage } from "../pages/public/BrandAndSearchPages";
import { ArticleDetailPage, BrandDetailPage, ComparisonPage, GenericPage, ProductDetailPage } from "../pages/public/DetailPages";
import { HomePage } from "../pages/public/HomePage";
import { ListingPage } from "../pages/public/ListingPage";
import { UserDashboard } from "../pages/user/UserDashboard";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/news", element: <ListingPage kind="news" title="Tech News" description="Search, category filters, tag filters, infinite scroll, pagination, and trending articles." /> },
      { path: "/news/:slug", element: <ArticleDetailPage type="news" /> },
      { path: "/reviews", element: <ListingPage kind="reviews" title="Product Reviews" description="Latest and popular product reviews sorted by rating and category." /> },
      { path: "/reviews/:slug", element: <ArticleDetailPage type="reviews" /> },
      { path: "/mobile-price-nepal", element: <ListingPage kind="product" category="mobile" title="Mobile Price in Nepal" description="Brand, price, RAM, storage, 5G, refresh rate filters, grid and list views." /> },
      { path: "/laptop-price-nepal", element: <ListingPage kind="product" category="laptop" title="Laptop Price in Nepal" description="Brand, processor, RAM, storage, GPU, price filters, and search." /> },
      { path: "/smartwatch-price-nepal", element: <ListingPage kind="product" category="smartwatch" title="Smartwatch Price in Nepal" description="Latest smartwatch prices, specifications, reviews, and availability." /> },
      { path: "/tablet-price-nepal", element: <ListingPage kind="product" category="tablet" title="Tablet Price in Nepal" description="Latest tablet prices, specifications, reviews, and availability." /> },
      { path: "/product/:slug", element: <ProductDetailPage /> },
      { path: "/compare", element: <ComparisonPage /> },
      { path: "/brands", element: <BrandsPage /> },
      { path: "/brands/:slug", element: <BrandDetailPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/videos", element: <GenericPage title="Videos" description="YouTube integration, categories, and latest videos." /> },
      { path: "/best-phones-under-rs.-20000", element: <GenericPage title="Best Phones Under Rs. 20000" description="Curated buying guide for Nepal." /> },
      { path: "/best-phones-under-rs.-30000", element: <GenericPage title="Best Phones Under Rs. 30000" description="Curated buying guide for Nepal." /> },
      { path: "/best-phones-under-rs.-50000", element: <GenericPage title="Best Phones Under Rs. 50000" description="Curated buying guide for Nepal." /> },
      { path: "/best-laptops-under-rs.-100000", element: <GenericPage title="Best Laptops Under Rs. 100000" description="Curated buying guide for Nepal." /> },
      { path: "/best-gaming-phones", element: <GenericPage title="Best Gaming Phones" description="Gaming phone recommendations." /> },
      { path: "/best-camera-phones", element: <GenericPage title="Best Camera Phones" description="Camera phone recommendations." /> },
      { path: "/about", element: <GenericPage title="About" description="About TechSewa Nepal." /> },
      { path: "/contact", element: <GenericPage title="Contact" description="Contact form, Google Map, and social links." /> },
      { path: "/privacy-policy", element: <GenericPage title="Privacy Policy" description="Privacy policy for TechSewa Nepal." /> },
      { path: "/terms", element: <GenericPage title="Terms" description="Terms and conditions for TechSewa Nepal." /> },
      { path: "/dashboard", element: <UserDashboard /> },
      { path: "/login", element: <AuthPage mode="login" /> },
      { path: "/register", element: <AuthPage mode="register" /> },
      { path: "/forgot-password", element: <AuthPage mode="forgot" /> },
      { path: "/reset-password", element: <AuthPage mode="reset" /> },
      { path: "/verify-email", element: <AuthPage mode="verify" /> }
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "news", element: <AdminResourcePage resource="news" /> },
      { path: "reviews", element: <AdminResourcePage resource="reviews" /> },
      { path: "products", element: <AdminResourcePage resource="products" /> },
      { path: "brands", element: <AdminResourcePage resource="brands" /> },
      { path: "ads", element: <AdminResourcePage resource="advertisements" /> },
      { path: "media", element: <AdminResourcePage resource="media" /> },
      { path: "users", element: <AdminResourcePage resource="users" /> },
      { path: "settings", element: <AdminResourcePage resource="settings" /> }
    ]
  }
]);
