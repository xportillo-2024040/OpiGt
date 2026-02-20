
import { Router } from 'express';
import { updateUserRole } from '../users/user-controller.js'
import { getUserRoles } from '../users/user-controller.js'
import { getUsersByRole } from '../users/user-controller.js'

const router = Router();

// PUT /api/v1/users/:userId/role
router.put('/:userId/role', updateUserRole);

// GET /api/v1/users/:userId/roles
router.get('/:userId/roles', getUserRoles);

// GET /api/v1/users/by-role/:roleName
router.get('/by-role/:roleName', getUsersByRole);

export default router;
