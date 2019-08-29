console.log ('I live!');
//config variables
var customersPerTosser = 20;
var hoursOfOperation = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];
var controlCurve = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];
var cookies = document.getElementById('cookies');
var cookieTossers = document.getElementById('cookieTossers');
var cookiesByStoreByHour = [];
var totalCookiesByHour = [];
var totalTossersByHour = [];

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

Store.prototype.cookiesEachHour = function(variableName){
    var cookiesByHourArray = [];
    for (var i=0;i<hoursOfOperation.length;i++){
      cookiesByHourArray.push({
        storeName : this.name,
        hour: hoursOfOperation[i],
        cookieTossers : 0,
        cookiesEachHour :Math.round(getRandomIntInclusive(this.storeMin,this.storeMax)*this.avgCookies*controlCurve[i])
        });
      render(variableName,'td',cookiesByHourArray[i],'cookiesEachHour')
    }
    this.cookiesPerHourArray = cookiesByHourArray;
}

Store.prototype.cookieTossersEachHourWithMax = function(variableName){
  for (var i = 0;i<cookiesByStoreByHour.length;i++){
    var maxTossers = 0;
    if(cookiesByStoreByHour[i][0].storeName === this.name){
      for(var index = 0;index<cookiesByStoreByHour[i].length;index++){
        var tossersByHour = Math.ceil(cookiesByStoreByHour[i][index].cookiesEachHour/this.avgCookies/customersPerTosser);
        if (tossersByHour<2){
          tossersByHour = 2;
        }
        if(tossersByHour>maxTossers){
          maxTossers = tossersByHour;
        }
        cookiesByStoreByHour[i][index].cookieTossers = tossersByHour;
        cookiesByStoreByHour[i][index].maxCookieTossers = maxTossers;
        render(variableName,'td',cookiesByStoreByHour[i][index],'cookieTossers');
      }
      var tdel = document.createElement('td');
      tdel.textContent = maxTossers;
      variableName.appendChild(tdel);
    }
  } 
}

Store.prototype.totalCookies = function(variableName){
  var cookiesByHourArray = this.cookiesPerHourArray;
  var totalCookiesObj = {name: 'Total', quantity: 0};
  for(var i = 0;i<hoursOfOperation.length;i++){
    totalCookiesObj.quantity += cookiesByHourArray[i].cookiesEachHour;
  }
  render(variableName,'td',totalCookiesObj,'quantity');
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
  this.cookieTossersEachHourWithMax(trel);
  variableName.appendChild(trel);
}

function tableHeader(variableName,totalText){
  var trel = document.createElement('tr');
  var tdel = document.createElement('td');
  trel.appendChild(tdel);
  for (var i=0;i<hoursOfOperation.length;i++){
  tdel = document.createElement('td');
  tdel.textContent = hoursOfOperation[i];
  trel.appendChild(tdel);
  }
  tdel = document.createElement('td');
  tdel.textContent = totalText;
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

function calculateTotalTossersByHour(){
  for(var i=0;i<hoursOfOperation.length;i++){
    var sumOfTossersAtHour = 0;
    for(var index = 0; index<cookiesByStoreByHour.length; index++){
      sumOfTossersAtHour += cookiesByStoreByHour[index][i].cookieTossers;
    }
    totalTossersByHour.push({hour:hoursOfOperation[i],quantity:sumOfTossersAtHour});
  }
}

function tableFooter(text,variableName,functionName,array){
  functionName();
  var trel = document.createElement('tr');
  var tdel = document.createElement('td');
  tdel.textContent = text;
  trel.appendChild(tdel);
  for (var i=0;i<hoursOfOperation.length;i++){
  tdel = document.createElement('td');
  tdel.textContent = array[i].quantity;
  trel.appendChild(tdel);
  }
  variableName.appendChild(trel);
}

var firstAndPike = new Store('First and Pike',23,65,6.3);
var seaTacAirport = new Store('SeaTac Airport',3,24,1.2);
var seattleCenter = new Store('Seattle Center',11,38,3.7);
var capitolHill = new Store('Capitol Hill',20,38,2.3);
var alki = new Store('Alki',2,16,4.6);

tableHeader(cookies,'Total');
firstAndPike.renderStoreRow(cookies);
seaTacAirport.renderStoreRow(cookies);
seattleCenter.renderStoreRow(cookies);
capitolHill.renderStoreRow(cookies);
alki.renderStoreRow(cookies);
tableFooter('Total Cookies',cookies,calculateTotalCookiesByHour,totalCookiesByHour);

tableHeader(cookieTossers,'Max Tossers');
firstAndPike.renderCookieTosserRow(cookieTossers);
seaTacAirport.renderCookieTosserRow(cookieTossers);
seattleCenter.renderCookieTosserRow(cookieTossers);
capitolHill.renderCookieTosserRow(cookieTossers);
alki.renderCookieTosserRow(cookieTossers);
tableFooter('Total Tossers',cookieTossers,calculateTotalTossersByHour,totalTossersByHour);
