export async function handler(event, context) {
    try {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Ignore expired SSL cert
  
      const response = await fetch("https://api.quotable.io/random");
  
      const data = await response.json();
  
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quote: data.content,
          author: data.author,
        }),
      };
    } catch (err) {
      console.error("❌ Function error:", err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Internal Server Error" }),
      };
    }
  }
  