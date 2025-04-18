import { Router } from 'express'
import v1Routes from './v1'

const router = Router()

router.get('/', (_req, res) => {
  res.json({
    name: 'Todo API',
    versions: {
      v1: '/api/v1',
    },
  })
})

router.use('/v1', v1Routes)

export default router
