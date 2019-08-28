console.log ('I live!');

var cookies = document.getElementById('cookies');
var cookieTossers = document.getElementById('cookieTossers');
var cookiesByStoreByHour = [];
var totalCookiesByHour = [];

var hoursOfOperation = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];
var controlCurve = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function render(variableName,element,anObject,keyvalueOne,keyvalueTwo){
  var el = document.createElement(element);
  if(keyvalueTwo === undefined){
    el.textContent = anObject[keyvalueOne];
  } else {
    el.textContent = anObject[keyvalueOne]+" "+anObject[keyvalueTwo];
  }
  variableName.appendChild(el);
}

function Store(name,storeMin,storeMax,avgCookies) {
  this.name = name;
  this.storeMin = storeMin;
  this.storeMax = storeMax;
  this.avgCookies = avgCookies;
  this.cookiesPerHourArray = [];
}
Store.prototype.pushCookies = function(){
 cookiesByStoreByHour.push(this.cookiesPerHourArray);  
}

Store.prototype.storeName = function(row){
  render(row,'td',this,'name');
}

Store.prototype.cookiesEachHour = function(row,parameter){
    var cookiesByHourArray = [];
    for (var i=0;i<hoursOfOperation.length;i++){
      cookiesByHourArray.push({
        storeName : this.name,
        hour: hoursOfOperation[i],
        cookieTossers : 0,
        cookiesEachHour :Math.round(getRandomIntInclusive(this.storeMin,this.storeMax)*this.avgCookies*controlCurve[i])
        });
      render(row,'td',cookiesByHourArray[i],'cookiesEachHour')
    }
    this.cookiesPerHourArray = cookiesByHourArray;
}

Store.prototype.totalCookies = function(row){
  var cookiesByHourArray = this.cookiesPerHourArray;
  var totalCookiesObj = {name: 'Total', quantity: 0};
  for(var i = 0;i<hoursOfOperation.length;i++){
    totalCookiesObj.quantity += cookiesByHourArray[i].cookiesEachHour;
  }
  render(row,'td',totalCookiesObj,'quantity');
}

Store.prototype.renderStoreRow = function(variableName){
  var trel = document.createElement('tr');
  this.storeName(trel);
  this.cookiesEachHour(trel);
  this.pushCookies(trel);
  this.totalCookies(trel);
  variableName.appendChild(trel);
}

Store.prototype.renderCookieTosserRow = function(variableName){
  var trel = document.createElement('tr');
  this.storeName(trel);
  this.cookiesEachHour(trel,'cookieTossers');
  variableName.appendChild(trel);
}

function tableHeader(variableName){
  var trel = document.createElement('tr');
  var tdel = document.createElement('td');
  trel.appendChild(tdel);
  for (var i=0;i<hoursOfOperation.length;i++){
  tdel = document.createElement('td');
  tdel.textContent = hoursOfOperation[i];
  trel.appendChild(tdel);
  }
  tdel = document.createElement('td');
  tdel.textContent = 'Total';
  trel.appendChild(tdel);
  variableName.appendChild(trel);
}

function calculateTotalCookiesByHour(){
  for(var i=0;i<hoursOfOperation.length;i++){
    var sumOfCookiesAtHour = 0;
    for(var index = 0; index<cookiesByStoreByHour.length; index++){
      sumOfCookiesAtHour += cookiesByStoreByHour[index][i].cookiesEachHour;
    }
    totalCookiesByHour.push({hour:hoursOfOperation[i],quantity:sumOfCookiesAtHour});
  }
}

function tableFooter(variableName){
  calculateTotalCookiesByHour();
  var trel = document.createElement('tr');
  var tdel = document.createElement('td');
  tdel.textContent = 'Total';
  trel.appendChild(tdel);
  for (var i=0;i<hoursOfOperation.length;i++){
  tdel = document.createElement('td');
  tdel.textContent = totalCookiesByHour[i].quantity;
  trel.appendChild(tdel);
  }
  variableName.appendChild(trel);
}

var firstAndPike = new Store('First and Pike',23,65,6.3);
var seaTacAirport = new Store('SeaTac Airport',3,24,1.2);
var seattleCenter = new Store('Seattle Center',11,38,3.7);
var capitolHill = new Store('Capitol Hill',20,38,2.3);
var alki = new Store('Alki',2,16,4.6);

tableHeader(cookies);
firstAndPike.renderStoreRow(cookies);
seaTacAirport.renderStoreRow(cookies);
seattleCenter.renderStoreRow(cookies);
capitolHill.renderStoreRow(cookies);
alki.renderStoreRow(cookies);
tableFooter(cookies);

tableHeader(cookieTossers);
firstAndPike.renderStoreRow(cookieTossers);
seaTacAirport.renderStoreRow(cookieTossers);
seattleCenter.renderStoreRow(cookieTossers);
capitolHill.renderStoreRow(cookieTossers);
alki.renderStoreRow(cookieTossers);

