# cookie-stand
app.js has been built out so far to output a table on sales.html. I built out a constructor function, called Store, and a bunch of prototype functions to help build everything out. `this.renderStoreRow()` calls all the important functions, in order of need, and causes the store to appear on the sales.html page.

To create a new store:
`var [storeName] = new Store('Store Name as string',minimum customers as number,maximum customers as number,average cookies per customer as number)`

To render that store on the page:
`[storeName].renderStoreRow()`

To build out the full table :
`tableHeader()`;
[various storeName.renderStoreRow() calls]
`tableFooter()`;

Thanks to: 

[MDN for the help on random variables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)