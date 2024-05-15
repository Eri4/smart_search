import { Router } from 'express';
import { extract_entities } from '../services/searchService';

const router = Router();

router.get('/', async (req, res) => {
    const searchTerm = decodeURIComponent(req.query.term as string);
    const combinations = await extract_entities(searchTerm);
    res.json(combinations);
});

export default router;