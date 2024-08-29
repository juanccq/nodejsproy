import { Router } from 'express';

const router = Router();

// Route to get product details by ID
router.get('/:productId', (req, res) => {
  const { productId } = req.params;

  // Simulate fetching product details from a database
  const productDetails = {
    id: productId,
    name: 'Sample Product',
    description: 'This is a detailed description of the product.',
    price: 99.99,
    inStock: true,
  };

  res.json(productDetails);
});

// Export the router
export default router;