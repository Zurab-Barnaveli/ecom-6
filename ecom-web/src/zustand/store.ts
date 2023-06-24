import { create } from "zustand";
import { Ajax } from "../../src/utils/Ajax";

type UserState = {
  user: any;
  setUser: (user: any) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

type ProductType = {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
};

export const useStore = create<ProductStore>((set) => ({
  products: [],
  brands: [],
  initialPageSize: 16,
  cartItems: [],
  product: null,
  selectedImage: "",

  increasePageSize: () =>
    set((state) => ({ initialPageSize: state.initialPageSize + 16 })),

  setProduct: (product: Product) => set({ product }),
  setSelectedImage: (image: string) => set({ selectedImage: image }),

  fetchProduct: async (keyword) => {
    const { initialPageSize } = useStore.getState();
    try {
      const data = {
        page_size: initialPageSize,
        page: 1,
        keyword: keyword,
      };
      const response = await Ajax.post("/products", data);
      const { products } = await response.data;
      set({ products });
    } catch (error) {
      console.log(error);
    }
  },

  fetchBrands: async () => {
    try {
      const {
        data: { brands },
      } = await Ajax.get("/brands");
      set({ brands });
    } catch (error) {
      console.log(error);
    }
  },

  setCartItems: (product) => {
    set((prev) => {
      const indexOfItem = prev.cartItems.findIndex(
        (item) => item.id === product.id
      );
      if (indexOfItem === -1) {
        return {
          cartItems: [...(prev.cartItems || []), { ...product, amount: 1 }],
        };
      }
      const newCartItems = [...prev.cartItems];
      const existingProduct = newCartItems[indexOfItem];
      const updatedProduct = {
        ...existingProduct,
        amount: existingProduct.amount + 1,
      };
      newCartItems[indexOfItem] = updatedProduct;
      return { ...prev, cartItems: newCartItems };
    });
  },

  removeFromCart: (itemId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== itemId),
    })),
  clearCart: () => set({ cartItems: [] }),
  //   getTotalPrice: () => {
  //     const { cartItems } = useStore.getState();
  //     cartItems.reduce((total: number, item: Product) => total + item.price, 0);
  //   },

  getTotalPrice: () => {
    const cartItems = useStore.getState().cartItems;
    let totalPrice = 0;
    for (const item of cartItems) {
      totalPrice += item.amount * item.price;
    }
    return totalPrice;
  },
}));
