import { useCartStore } from './../store/cartStore';
import { Button, Card, CardContent, CardMedia, Grid, Typography, IconButton, Box, Divider } from '@mui/material';
import { Remove as RemoveIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { products } from '../data/products';

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
        <Box
            padding={4}
            sx={{
                background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
                minHeight: '100vh',
            }}
        >
            <Typography variant="h2" gutterBottom>
                Cart 
            </Typography>
            {cart.length === 0 ? (
                <Typography variant="body1">Your cart is empty</Typography>
            ) : (
                <Grid container spacing={3}>
                    {cart.map((item) => {
                        const product = products.find((product) => product.id === item.id);
                        return (
                            product && (
                                <Grid item xs={12} sm={6} md={4} key={item.id}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={product.image}
                                            alt={product.name}
                                        />
                                        <CardContent>
                                            <Typography variant="h6">{product.name}</Typography>
                                            <Typography variant="body1" color="textSecondary">
                                                ${product.price.toFixed(2)}
                                            </Typography>
                                            <Box display="flex" alignItems="center" mt={2}>
                                                <IconButton onClick={() => decreaseQuantity(item.id)} color="primary">
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Typography variant="body1" mx={2}>
                                                    {item.quantity}
                                                </Typography>
                                                <IconButton onClick={() => increaseQuantity(item.id)} color="primary">
                                                    <AddIcon />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => removeFromCart(item.id)}
                                                    color="error"
                                                    sx={{ marginLeft: 'auto' }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        );
                    })}
                </Grid>
            )}
            <Divider sx={{ my: 4 }} />
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5">Total: LKR {totalAmount.toFixed(2)}</Typography>
                <Button variant="contained" color="success">
                    Checkout
                </Button>
            </Box>
        </Box>
    );
}
