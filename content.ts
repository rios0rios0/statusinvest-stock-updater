const stockArray: string[] = ["CGY"];

function addStockRow(stockCode: string, price: string): void {
	  const table = document.querySelector("#patrimonio-table") as HTMLTableElement;
	    if (table) {
		        const newRow = table.insertRow();
			    const cell1 = newRow.insertCell(0);
			        const cell2 = newRow.insertCell(1);
				    cell1.textContent = stockCode;
				        cell2.textContent = price;
					  }
}

stockArray.forEach(stockCode => {
	  chrome.runtime.sendMessage({ action: "getStockPrice", stockCode }, response => {
		      if (response && response.price) {
			            addStockRow(stockCode, response.price);
				        }
					  });
});

