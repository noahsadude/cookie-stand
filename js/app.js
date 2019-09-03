'use strict'
console.log ('I live!');
//config variables
var customersPerTosser = 20;
var hoursOfOperation = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];
var controlCurve = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];
var cookies = document.getElementById('cookies');
var cookieTossers = document.getElementById('cookieTossers');
var storeForm = document.getElementById('storeSubmission');
var storeLocations = [];
var cookiesByStoreByHour = [];
var totalCookiesByHour = [];
var totalTossersByHour = [];


function Store(name,storeMin,storeMax,avgCookies) {
  this.name = name;
  this.storeMin = storeMin;
  this.storeMax = storeMax;
  this.avgCookies = avgCookies;
  this.cookiesPerHourArray = [];
  storeLocations.push(this);
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

Store.prototype.renderCookieRow = function(variableName){
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

function renderAllStores(variableName,tossersOrCookies){
  for(var i=0;i<storeLocations.length;i++){
    if(tossersOrCookies === 'cookies'){
    storeLocations[i].renderCookieRow(variableName);
  } else {
    storeLocations[i].renderCookieTosserRow(variableName);
    }
  }
}

new Store('First and Pike',23,65,6.3);
new Store('SeaTac Airport',3,24,1.2);
new Store('Seattle Center',11,38,3.7);
new Store('Capitol Hill',20,38,2.3);
new Store('Alki',2,16,4.6);

function addStoreData(e){
  e.preventDefault();
  var storeSubmitName = e.target.storeSubmitName.value;
  var storeSubmitminCustomers = parseInt(e.target.storeSubmitminCustomers.value);
  var storeSubmitmaxCustomers = parseInt(e.target.storeSubmitmaxCustomers.value);
  var storeSubmitavgCookies = parseFloat(e.target.storeSubmitavgCookies.value);

  var index = 0;
  for(var i = 0;i<storeLocations.length;i++){
    if(storeLocations[i].name === storeSubmitName){
      storeLocations[i].storeMin = storeSubmitminCustomers;
      storeLocations[i].storeMax = storeSubmitmaxCustomers;
      storeLocations[i].avgCookies = storeSubmitavgCookies;
    } else {
      console.log (`${storeSubmitName} not found at position ${i}`);
      index ++;
    }
  }
  if(index === storeLocations.length){
  new Store(storeSubmitName,storeSubmitminCustomers,storeSubmitmaxCustomers,storeSubmitavgCookies);
  }
  // reset everything except store objects
  var deleteCookies = document.getElementById('cookies');
  var deleteCookieTossers = document.getElementById('cookieTossers');
  deleteCookies.innerHTML='';
  deleteCookieTossers.innerHTML='';
  cookiesByStoreByHour = [];
  totalCookiesByHour = [];
  totalTossersByHour = [];

  //rebuild tables
  tableHeader(cookies,'Total');
  renderAllStores(cookies,'cookies');
  tableFooter('Total Cookies',cookies,calculateTotalCookiesByHour,totalCookiesByHour);

  tableHeader(cookieTossers,'Max Tossers');
  renderAllStores(cookieTossers,'tossers');
  tableFooter('Total Tossers',cookieTossers,calculateTotalTossersByHour,totalTossersByHour);
}

tableHeader(cookies,'Total');
renderAllStores(cookies,'cookies');
tableFooter('Total Cookies',cookies,calculateTotalCookiesByHour,totalCookiesByHour);

tableHeader(cookieTossers,'Max Tossers');
renderAllStores(cookieTossers,'tossers');
tableFooter('Total Tossers',cookieTossers,calculateTotalTossersByHour,totalTossersByHour);

storeForm.addEventListener('submit',addStoreData);