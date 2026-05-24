// netlify/functions/redditProxy.js

exports.handler = async (event) => {
    // We grab the specific Reddit URL our frontend wants to hit
    const targetUrl = event.queryStringParameters.url;
  
    if (!targetUrl) {
      return { statusCode: 400, body: "Missing URL parameter" };
    }
  
    try {
      const response = await fetch(targetUrl, {
        headers: {
          // This specific string format is required by Reddit to prove we aren't a bot
          "User-Agent": "web:com.pediadigital.redditviewer:v1.0.0 (by /u/Jay52_TX)",
          "Accept": "application/json"
        }
      });
  
      if (!response.ok) {
        return { 
          statusCode: response.status, 
          body: `Reddit blocked the request: ${response.statusText}` 
        };
      }
  
      const data = await response.json();
  
      // We send the clean data back to your React frontend with CORS unblocked
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
    } catch (error) {
      return { 
        statusCode: 500, 
        body: JSON.stringify({ error: error.message }) 
      };
    }
};
