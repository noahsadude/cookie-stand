console.log ('I live!');

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

var cookies = document.getElementById('cookies');

function render(variableName,element,anobject,keyvalueOne,keyvalueTwo){
  var el = document.createElement(element);
  if(keyvalueTwo === undefined){
    el.textContent = anobject[keyvalueOne];
  } else {
    el.textContent = anobject[keyvalueOne]+" "+anobject[keyvalueTwo];
  }
  variableName.appendChild(el);
}

var hourOfOperation = [
  '6am',
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
  '8pm',
]
var firstAndPike = {
  name: '1st and Pike',
  storeMin: 23,
  storeMax: 65,
  avgCookies: 6.3,
  cookiesByHour: function(){
    var cookiesByHourArray = [];
    var sumOfCookiesByLocation = {name:'Total:', quantity: 0};
    render(cookies,'p',this,'name');
    for(var i=0;i<hourOfOperation.length;i++){
      cookiesByHourArray.push({hour: hourOfOperation[i],
        cookiesByLocationByHour :Math.round(getRandomIntInclusive(this.storeMin,this.storeMax)*this.avgCookies)});
      render(cookies,'li',cookiesByHourArray[i],'hour','cookiesByLocationByHour');
    }
    //adding it all together
    for(var i = 0;i<cookiesByHourArray.length;i++){
      sumOfCookiesByLocation.quantity = sumOfCookiesByLocation.quantity + cookiesByHourArray[i].cookiesByLocationByHour;
    }
      render(cookies,'li',sumOfCookiesByLocation,'name','quantity');
  }
}

var seaTacAirport = {
  name: 'SeaTac Airport',
  storeMin: 3,
  storeMax: 24,
  avgCookies: 1.2,
  cookiesByHour: function(){
    var cookiesByHourArray = [];
    var sumOfCookiesByLocation = {name:'Total:', quantity: 0};
    render(cookies,'p',this,'name');
    for(var i=0;i<hourOfOperation.length;i++){
      cookiesByHourArray.push({hour: hourOfOperation[i],
        cookiesByLocationByHour :Math.round(getRandomIntInclusive(this.storeMin,this.storeMax)*this.avgCookies)});
      render(cookies,'li',cookiesByHourArray[i],'hour','cookiesByLocationByHour');
    }
    //adding it all together
    for(var i = 0;i<cookiesByHourArray.length;i++){
      sumOfCookiesByLocation.quantity = sumOfCookiesByLocation.quantity + cookiesByHourArray[i].cookiesByLocationByHour;
    }
      render(cookies,'li',sumOfCookiesByLocation,'name','quantity');
  }
}

var seattleCenter = {
  name: 'Seattle Center',
  storeMin: 11,
  storeMax: 38,
  avgCookies: 3.7,
  cookiesByHour: function(){
    var cookiesByHourArray = [];
    var sumOfCookiesByLocation = {name:'Total:', quantity: 0};
    render(cookies,'p',this,'name');
    for(var i=0;i<hourOfOperation.length;i++){
      cookiesByHourArray.push({hour: hourOfOperation[i],
        cookiesByLocationByHour :Math.round(getRandomIntInclusive(this.storeMin,this.storeMax)*this.avgCookies)});
      render(cookies,'li',cookiesByHourArray[i],'hour','cookiesByLocationByHour');
    }
    //adding it all together
    for(var i = 0;i<cookiesByHourArray.length;i++){
      sumOfCookiesByLocation.quantity = sumOfCookiesByLocation.quantity + cookiesByHourArray[i].cookiesByLocationByHour;
    }
      render(cookies,'li',sumOfCookiesByLocation,'name','quantity');
  }
}

var capitolHill = {
  name: 'Capitol Hill',
  storeMin: 20,
  storeMax: 38,
  avgCookies: 2.3,
  cookiesByHour: function(){
    var cookiesByHourArray = [];
    var sumOfCookiesByLocation = {name:'Total:', quantity: 0};
    render(cookies,'p',this,'name');
    for(var i=0;i<hourOfOperation.length;i++){
      cookiesByHourArray.push({hour: hourOfOperation[i],
        cookiesByLocationByHour :Math.round(getRandomIntInclusive(this.storeMin,this.storeMax)*this.avgCookies)});
      render(cookies,'li',cookiesByHourArray[i],'hour','cookiesByLocationByHour');
    }
    //adding it all together
    for(var i = 0;i<cookiesByHourArray.length;i++){
      sumOfCookiesByLocation.quantity = sumOfCookiesByLocation.quantity + cookiesByHourArray[i].cookiesByLocationByHour;
    }
      render(cookies,'li',sumOfCookiesByLocation,'name','quantity');
  }
}

var alki = {
  name: 'Alki',
  storeMin: 2,
  storeMax: 16,
  avgCookies: 4.6,
  cookiesByHour: function(){
    var cookiesByHourArray = [];
    var sumOfCookiesByLocation = {name:'Total:', quantity: 0};
    render(cookies,'p',this,'name');
    for(var i=0;i<hourOfOperation.length;i++){
      cookiesByHourArray.push({hour: hourOfOperation[i],
        cookiesByLocationByHour :Math.round(getRandomIntInclusive(this.storeMin,this.storeMax)*this.avgCookies)});
      render(cookies,'li',cookiesByHourArray[i],'hour','cookiesByLocationByHour');
    }
    //adding it all together
    for(var i = 0;i<cookiesByHourArray.length;i++){
      sumOfCookiesByLocation.quantity = sumOfCookiesByLocation.quantity + cookiesByHourArray[i].cookiesByLocationByHour;
    }
      render(cookies,'li',sumOfCookiesByLocation,'name','quantity');
  }
}

firstAndPike.cookiesByHour();
seaTacAirport.cookiesByHour();
seattleCenter.cookiesByHour();
capitolHill.cookiesByHour();
alki.cookiesByHour();
