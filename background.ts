chrome.runtime.onInstalled.addListener(() => {
	  console.log("Extension installed");
});

async function getStockPrice(stockCode: string): Promise<string> {
	  const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY';
	    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockCode}.TO&apikey=${apiKey}`;
		      const response = await fetch(url);
	      const data = await response.json();
	        return data['Global Quote']['05. price'];
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	  if (request.action === "getStockPrice") {
		      getStockPrice(request.stockCode).then(price => {
			            sendResponse({ price });
				        });
					    return true;  // Will respond asynchronously.
					      }
});

