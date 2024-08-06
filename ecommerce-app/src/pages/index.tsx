import { useRouter } from 'next/router';
import { useCartStore } from './../store/cartStore';
import { Button, Card, CardContent, CardMedia, Grid, Typography, Badge, IconButton,Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { products } from '../data/products';

export default function ProductList() {
    const router = useRouter();
    const addToCart = useCartStore((state) => state.addToCart);
    const cart = useCartStore((state) => state.cart);
    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const handleCartClick = () => {
        router.push('/cart');
    };

    return (
        <div style={{
            padding: '16px',
            background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
            minHeight: '100vh',
        }}>
            <Typography variant="h2" gutterBottom>
                Store
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
                                    LKR {product.price.toFixed(2)}
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
            <Box sx={{ position: 'fixed', top: 16, right: 16 }}>
            <IconButton
                color="primary"
                onClick={handleCartClick}
                sx={{
                    width: 56, 
                    height: 56, 
                    padding: 0,
                }}
            >
                <Badge badgeContent={cartItemCount} color="secondary" sx={{ width: 40, height: 40 }}>
                    <ShoppingCartIcon sx={{ fontSize: 32 }} /> {/* Adjust the icon size */}
                </Badge>
            </IconButton>
        </Box>
        </div>
    );
}
