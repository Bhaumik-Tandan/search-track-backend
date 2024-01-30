import axios from 'axios';
import * as cheerio from 'cheerio';

async function getKeywordsFromUrl(url: string): Promise<string[]> {
    try {
        // Make a GET request to the URL
        const response = await axios.get(url);

        // Check if the request was successful (status code 200)
        if (response.status === 200) {
            // Parse HTML content using Cheerio
            const $ = cheerio.load(response.data);

            // Extract keywords based on your HTML structure
            // Adjust the selector based on the actual structure of the webpage
            const keywords = $('meta[name="keywords"]').attr('content');

            if (keywords) {
                // Split the keywords string into an array
                const keywordArray = keywords.split(',').map(keyword => keyword.trim());
                return keywordArray;
            } else {
                throw new Error('Keywords not found on the page');
            }
        } else {
            throw new Error(`Failed to fetch URL. Status code: ${response.status}`);
        }
    } catch (error) {
        return [];
    }
}

export default getKeywordsFromUrl;