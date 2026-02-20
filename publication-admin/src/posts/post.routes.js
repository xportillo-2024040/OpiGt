import { Router } from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from './post.controller.js';

import {
  validateCreatePost,
  validateUpdatePost,
} from '../../middlewares/post.validator.js';

import { validateJWT } from '../../middlewares/validate-JWT.js';

const router = Router();

// Rutas públicas
router.get('/', getPosts);               // Listar publicaciones
router.get('/:id', getPostById);        // Obtener publicación por ID

// Rutas privadas (requieren autenticación)
router.post('/', validateJWT, validateCreatePost, createPost);
router.put('/:id', validateJWT, validateUpdatePost, updatePost);
router.delete('/:id', validateJWT, deletePost);

export default router;