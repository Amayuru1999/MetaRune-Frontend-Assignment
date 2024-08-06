import { useRouter } from 'next/router';
import { useCartStore } from './../store/cartStore';
import { Button, Card, CardContent, CardMedia, Grid, Typography, Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const products = [
    { id: 1, name: 'Product 1', price: 29.99, image: '/product1.jpg' },
    { id: 2, name: 'Product 2', price: 39.99, image: '/product2.jpg' },
    // Add at least 10 products
];

export default function ProductList() {
    const router = useRouter();
    const addToCart = useCartStore((state) => state.addToCart);
    const cart = useCartStore((state) => state.cart);
    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const handleCartClick = () => {
        router.push('/cart');
    };

    return (
        <div style={{ padding: '16px' }}>
            <Typography variant="h4" gutterBottom>
                Product List
            </Typography>
            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.image}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {product.name}
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    ${product.price.toFixed(2)}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => addToCart(product.id)}
                                    style={{ marginTop: '8px' }}
                                >
                                    Add to Cart
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <div style={{ position: 'fixed', top: 16, right: 16 }}>
                <IconButton color="primary" onClick={handleCartClick}>
                    <Badge badgeContent={cartItemCount} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </div>
        </div>
    );
}
