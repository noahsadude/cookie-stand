console.log ('I live!');

var cookies = document.getElementById('cookies');
var cookiesByStoreByHour = [];
var totalCookiesByHour = [];

var hoursOfOperation = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];


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

Store.prototype.cookiesEachHour = function(row){
    var cookiesByHourArray = [];
    for (var i=0;i<hoursOfOperation.length;i++){
      cookiesByHourArray.push({
        storeName : this.name,
        hour: hoursOfOperation[i],
        cookiesEachHour :Math.round(getRandomIntInclusive(this.storeMin,this.storeMax)*this.avgCookies),
        });
      render(row,'td',cookiesByHourArray[i],'cookiesEachHour');
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

Store.prototype.renderStoreRow = function(){
  var trel = document.createElement('tr');
  this.storeName(trel);
  this.cookiesEachHour(trel);
  this.pushCookies(trel);
  this.totalCookies(trel);
  cookies.appendChild(trel);
}

function tableHeader(){
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
  cookies.appendChild(trel);
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

function tableFooter(){
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
  cookies.appendChild(trel);
}

var firstAndPike = new Store('First and Pike',23,65,6.3);
var seaTacAirport = new Store('SeaTac Airport',3,24,1.2);
var seattleCenter = new Store('Seattle Center',11,38,3.7);
var capitolHill = new Store('Capitol Hill',20,38,2.3);
var alki = new Store('Alki',2,16,4.6);

tableHeader();
firstAndPike.renderStoreRow();
seaTacAirport.renderStoreRow();
seattleCenter.renderStoreRow();
capitolHill.renderStoreRow();
alki.renderStoreRow();
tableFooter();

