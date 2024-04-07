import express from 'express';
const router = express.Router();

import {getAll,addUser,updateUser,deleteUser} from '../controllers/user.js'

router.route('/').get(getAll);
router.route('/add').post(addUser);
router.route('/update/:id').patch(updateUser);
router.route('/remove/:id').delete(deleteUser);

export default router;