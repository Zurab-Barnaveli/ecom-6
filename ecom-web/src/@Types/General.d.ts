type Product = {
  id: string;
  title: string;
  description: string;
  images: string[];
  brand: string;
  category: string;
  price: number;
  rating: string;
  amount: number;
};

type Brand = string;

type ProductStore = {
  products: Product[];
  brands: Brand[];
  cartItems: Product[];
  initialPageSize: number;
  products: Product[];
  brands: Brand[];
  cartItems: Product[];
  initialPageSize: number;
  product: Product | null;
  selectedImage: string;
  setProduct: (product: Product) => void;
  setSelectedImage: (image: string) => void;
  increasePageSize: () => void;
  fetchProduct: (keyword?: string) => void;
  fetchBrands: () => void;
  setCartItems: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  getTotalPrice: () => void;
};

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password2: string;
};

type LogInType = {
  email: string;
  password: string;
};

declare type ProductType = {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
};

interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  avatar?: string;
}
