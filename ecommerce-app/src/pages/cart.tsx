// src/pages/cart.tsx
import { useCartStore } from './../store/cartStore';

const products = [
    { id: 1, name: 'Product 1', price: 29.99, image: '/product1.jpg' },
    { id: 2, name: 'Product 2', price: 39.99, image: '/product2.jpg' },
    // Add at least 10 products
];

export default function Cart() {
    const cart = useCartStore((state) => state.cart);
    const increaseQuantity = useCartStore((state) => state.increaseQuantity);
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    const totalAmount = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + (product ? product.price * item.quantity : 0);
    }, 0);

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold my-4">Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {cart.map((item) => {
                        const product = products.find((product) => product.id === item.id);
                        return (
                            product && (
                                <div key={item.id} className="border p-4">
                                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                                    <h2 className="text-xl font-bold">{product.name}</h2>
                                    <p className="text-lg">${product.price}</p>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            className="bg-gray-200 px-2 py-1"
                                            onClick={() => decreaseQuantity(item.id)}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className="bg-gray-200 px-2 py-1"
                                            onClick={() => increaseQuantity(item.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 mt-2"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            )
                        );
                    })}
                </div>
            )}
            <div className="mt-4">
                <h2 className="text-2xl font-bold">Total: ${totalAmount.toFixed(2)}</h2>
                <button className="bg-green-500 text-white px-4 py-2 mt-2">Checkout</button>
            </div>
        </div>
    );
}
