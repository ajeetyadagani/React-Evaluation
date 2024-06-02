// src/pages/ProductDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Text, Spinner, useToast, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import axios from 'axios';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const cancelRef = React.useRef();
    const toast = useToast();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`YOUR_PRODUCT_DETAILS_API_ENDPOINT/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        setIsDialogOpen(true);
    };

    const handleConfirm = () => {
        setIsDialogOpen(false);
        toast({
            title: 'Item added to cart',
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
    };

    if (loading) return <Spinner />;
    if (error) return <Text>{error}</Text>;

    return (
        <Box maxW="md" mx="auto" mt={10}>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                <Text fontSize="2xl">{product.title}</Text>
                <Text>{product.category}</Text>
                <Text>${product.price}</Text>
                <Text mt={4}>{product.description}</Text>
                <Button colorScheme="teal" mt={4} onClick={handleAddToCart}>
                    Add to Cart
                </Button>
            </Box>

            <AlertDialog
                isOpen={isDialogOpen}
                leastDestructiveRef={cancelRef}
                onClose={handleCancel}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>Confirm Add to Cart</AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to add this item to cart?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button colorScheme="teal" onClick={handleConfirm} ml={3}>
                                Confirm
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
};

export default ProductDetailsPage;
