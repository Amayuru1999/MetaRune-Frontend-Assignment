
import create from 'zustand';

type CartItem = {
    id: number;
    quantity: number;
};

type CartState = {
    cart: CartItem[];
    addToCart: (id: number) => void;
    removeFromCart: (id: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
};

export const useCartStore = create<CartState>((set) => ({
    cart: [],
    addToCart: (id) =>
        set((state) => {
            const item = state.cart.find((item) => item.id === id);
            if (item) {
                return {
                    cart: state.cart.map((item) =>
                        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                };
            }
            return { cart: [...state.cart, { id, quantity: 1 }] };
        }),
    removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
    increaseQuantity: (id) =>
        set((state) => ({
            cart: state.cart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            ),
        })),
    decreaseQuantity: (id) =>
        set((state) => ({
            cart: state.cart.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ),
        })),
}));
