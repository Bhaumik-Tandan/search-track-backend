// search.ts
import express, { Request, Response } from 'express';
import Search, { ISearch } from '../models/Search'; // Adjust the path based on your project structure
import {User} from "../models/User";

const router = express.Router();

// POST request to save a new search
router.post('', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Retrieve user ID from the authenticated user
    const userId = (req.user as User)?._id?.toString();


    // Assume 'url' is provided in the request body
    const { url } = req.body;

    // Create a new search document
    const newSearch: ISearch = new Search({ url, userId });

    // Save the search document to the database
    await newSearch.save();

    res.status(201).json({ message: 'Search saved successfully' });
  } catch (error) {
    console.error('Error saving search:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('', async (req: Request, res: Response) => {
  try {
    // Check for authentication
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Retrieve user ID from the authenticated user
    const userId = (req.user as User)?._id?.toString();

    // Set default values for page, limit, and sort
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    // Calculate the skip value based on the page and limit
    const skip = (page - 1) * limit;


    // Sanitize and get search query parameter
    const searchQuery = typeof req.query.query === 'string' ? sanitizeInput(req.query.query) : '';

    // Build the search criteria with pagination, search query, and sorting
    const searchCriteria: any = {
      userId,
      $or: [
        { searchKeywords: { $in: [searchQuery] } },
        { url: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive URL search
      ],
    };

    // Find searches for the specified user with pagination, search query, and sorting
    const searches = await Search.find(searchCriteria)
      .sort({ createdAt: 'asc' })
      .skip(skip)
      .limit(limit);

    res.status(200).json(searches);
  } catch (error) {
    console.error('Error fetching searches:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Add any additional sanitization functions if needed
function sanitizeInput(input: string): string {
  // Implement your sanitization logic here
  return input.trim();
}



export default router;
