// core.routes.js

import { Router } from 'express'
import { deleteFiles, updateTags } from '../controllers/core.controller.js'

const router = Router()

router.post('/api/process', updateTags)
router.get('/cron/delete', deleteFiles)

export default router