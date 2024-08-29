import { Router } from 'express';
const router = Router();

// Define your routes here
router.get('/', (req, res) => {
  res.send('User Home');
});

router.get('/list', (req, res) => {
  res.send('User List');
});

export default router;