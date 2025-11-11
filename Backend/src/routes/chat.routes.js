const express=require('express');
const authMiddleware=require('../middleware/auth.middleware')
const chatController=require("../controller/chat.controller")
const router=express.Router();

/* POST /api /chat */
router.post("/chats",authMiddleware.authUser,chatController.createChat)

router.get('/', authMiddleware.authUser, chatController.getChats)

/* GET /api/chat/messages/:id */
router.get('/messages/:id', authMiddleware.authUser, chatController.getMessages)

module.exports=router;