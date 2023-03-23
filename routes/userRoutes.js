import express from "express";
import {
  addUser,
  deletebyId,
  getAllUsers,
  getUser,
  updateById,
  depositeUser,
  withdrawUser,
  transferUser,
  getUsersByCashAmount
} from "../controllers/userController.js";

const router = express.Router();
router
.route('/negtivecash')
.get(getUsersByCashAmount)
router
.route('/')
.post(addUser)
.get(getAllUsers)
router
.route('/:id')
.put(updateById)
.get(getUser)
.delete(deletebyId);
router
.route('/deposite/:id/:cash')
.put(depositeUser)
router
.route('/withdraw/:id/:cash')
.put(withdrawUser)

router
.route('/transfer/:id_from/:id_to/:cash')
.put(transferUser);

export default router