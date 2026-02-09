// api/index.js

export default async function handler(req, res) {
  // 1. Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 2. Query Get Karna
  const { number } = req.query;

  // Custom Branding Variables
  const DEVELOPER_NAME = "HUZII BALOCH OWNER OF BLACK WORLD 03058190234";
  const PREMIUM_MSG = "premium data ke price 100 hey contact owner = HUZII X HACKER 03058190234";

  if (!number) {
    return res.status(400).json({ 
      status: "error", 
      message: "Number parameter is required (e.g. ?number=03xxxx)",
      developed_by: DEVELOPER_NAME 
    });
  }

  try {
    // 3. External API Call (Updated)
    // New API URL without token, using 'number' parameter directly
    const API_URL = `https://blacksimdetail.vercel.app/public_apis/simdetailsapi.php?number=${number}`;

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();

    // 4. Agar Data Mila (Success Case)
    if (data) {
       // Note: Checking strict structure might need adjustment depending on the new API's response format
       if (typeof data === 'object') {
           data.developed_by = DEVELOPER_NAME;
       }
       return res.status(200).json(data);

    } else {
       throw new Error("No data found");
    }

  } catch (error) {
    // 5. Fallback / Error Case (Premium Message)
    return res.status(200).json({
      status: "error",
      message: PREMIUM_MSG, 
      developed_by: DEVELOPER_NAME,
      data: [] 
    });
  }
}
