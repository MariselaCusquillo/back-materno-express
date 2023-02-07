
import { EstablecimientoController  } from './../controller/EstablecimientoController';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', EstablecimientoController .getAll);

// Get one user
router.get('/:id', EstablecimientoController .getById);

// Create a new user
router.post('/',  EstablecimientoController .new);

// Edit user
router.patch('/:id', EstablecimientoController .edit);

// Delete
router.delete('/:id', EstablecimientoController .delete);

export default router;
