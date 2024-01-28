// search.ts
import express, { Request, Response } from 'express';
import passport from 'passport';
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

// GET request to retrieve all searches for the authenticated user
router.get('', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Retrieve user ID from the authenticated user
    const userId = (req.user as User)?._id?.toString();

    // Find all searches for the specified user
    const searches = await Search.find({ userId });

    res.status(200).json(searches);
  } catch (error) {
    console.error('Error fetching searches:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
