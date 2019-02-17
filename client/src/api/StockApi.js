import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const stocks = [
    {
        id: "react-flux-building-applications",
        title: "Building Applications in React and Flux",
        watchHref: "http://www.pluralsight.com/stocks/react-flux-building-applications",
        authorId: "cory-house",
        length: "5:08",
        category: "JavaScript"
    },
    {
        id: "clean-code",
        title: "Clean Code: Writing Code for Humans",
        watchHref: "http://www.pluralsight.com/stocks/writing-clean-code-humans",
        authorId: "cory-house",
        length: "3:10",
        category: "Software Practices"
    },
    {
        id: "architecture",
        title: "Architecting Applications for the Real World",
        watchHref: "http://www.pluralsight.com/stocks/architecting-applications-dotnet",
        authorId: "cory-house",
        length: "2:52",
        category: "Software Architecture"
    },
    {
        id: "career-reboot-for-developer-mind",
        title: "Becoming an Outlier: Reprogramming the Developer Mind",
        watchHref: "http://www.pluralsight.com/stocks/career-reboot-for-developer-mind",
        authorId: "cory-house",
        length: "2:30",
        category: "Career"
    },
    {
        id: "web-components-shadow-dom",
        title: "Web Component Fundamentals",
        watchHref: "http://www.pluralsight.com/stocks/web-components-shadow-dom",
        authorId: "cory-house",
        length: "5:10",
        category: "HTML5"
    }
];

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (stock) => {
    return replaceAll(stock.title, ' ', '-');
};


function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error); // eslint-disable-line no-console
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}

class StockApi {
    static getAllStocks(query) {
        return fetch(`/api/stocks?firstName=${query}`, {
            accept: 'application/json',
        }).then(checkStatus)
            .then(parseJSON);
    }

    static saveStock(stock) {
        stock = Object.assign({}, stock); // to avoid manipulating object passed in.
        return fetch('/api/addstocks', {
            method: 'POST',
            body: stock
        }).then(checkStatus)
          .then(parseJSON);
    }

    static deleteStock(stockId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const indexOfStockToDelete = stocks.findIndex(stock => stock.id === stockId);
                stocks.splice(indexOfStockToDelete, 1);
                resolve();
            }, delay);
        });
    }


    static getStock(stockId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const existingStockIndex = stocks.findIndex(stock => stock.id === stockId);

                const stockFound = Object.assign({}, stocks[existingStockIndex]);

                resolve(stockFound);

            }, delay);
        });
    }

}

export default StockApi;
