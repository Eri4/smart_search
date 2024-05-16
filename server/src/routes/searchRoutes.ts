import { Router } from 'express';
import { extract_entities } from '../services/searchService';

const router = Router();

router.get('/', async (req, res) => {
    const searchTerm = decodeURIComponent(req.query.term as string);
    if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    try {
        const combinations = await extract_entities(searchTerm);
        res.json(combinations);
    } catch (e) {
        console.error(e);
        res.status(500).json({'server error': e});
    }

});

export default router;