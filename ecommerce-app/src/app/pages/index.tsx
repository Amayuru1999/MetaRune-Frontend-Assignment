
import { useState } from 'react';

const products = [
    { id: 1, name: 'Product 1', price: 29.99, image: '/product1.jpg' },
    { id: 2, name: 'Product 2', price: 39.99, image: '/product2.jpg' },
    // Add at least 10 products
];

export default function ProductList() {
    const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);

    const addToCart = (productId: number) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === productId);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { id: productId, quantity: 1 }];
        });
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold my-4">Product List</h1>
            <div className="grid grid-cols-4 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border p-4">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                        <h2 className="text-xl font-bold">{product.name}</h2>
                        <p className="text-lg">${product.price}</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 mt-2"
                            onClick={() => addToCart(product.id)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
