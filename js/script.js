const NameCity = document.getElementById('js-city-name'),
      NameWeather = document.getElementById('js-weather-name'),
      IconWeather = document.getElementById('js-icon-weather'),
      Temperature = document.getElementById('js-temperature'),
      Humidity = document.getElementById('js-humidity'),
      Cloud = document.getElementById('js-cloud'),
      Wind = document.getElementById('js-wind');
      Display = document.getElementById('js-bg-top-bot');
const DayTwo = document.getElementById('js-day-two'),
      DayThree = document.getElementById('js-day-three'),
      DayFour = document.getElementById('js-day-four'),
      SixT = document.getElementsByClassName('js-temp-6h'),
      SixM = document.getElementsByClassName('js-main-6h'),
      TwelveT = document.getElementsByClassName('js-temp-12h'),
      TwelveM = document.getElementsByClassName('js-main-12h'),
      EighteenT = document.getElementsByClassName('js-temp-18h'),
      EighteenM = document.getElementsByClassName('js-main-18h'),
      TwentyOneT = document.getElementsByClassName('js-temp-21h'),
      TwentyOneM = document.getElementsByClassName('js-main-21h');

const AppKey = "8a37a667a679dedffbe96e33485defb5",
      SearchButton = document.getElementById("js-search-btn"),
      SearchInput = document.getElementById("js-search-txt");
const Time = document.getElementById('js-local-time'),
      Day = document.getElementById('js-local-day');
//-------------------------Call Api--------------------------------------

SearchButton.addEventListener("click", findWeatherDetails);
SearchInput.addEventListener("keyup", enterPressed);

function enterPressed(event) {
  if (event.key === "Enter") {
    findWeatherDetails();
  }
}

function findWeatherDetails() {
  if (SearchInput.value === "") {
  
  }else {
    let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + SearchInput.value + 
                      "&units=metric&appid="+ AppKey;
    let searchLink2 = "https://api.openweathermap.org/data/2.5/forecast?q="+ SearchInput.value + 
                      "&units=metric&appid="+ AppKey;
    httpRequestAsync(searchLink2, theResponse2);
    httpRequestAsync(searchLink, theResponse);
   
  }
 }
 
function theResponse(response) {
  let jsonObject = JSON.parse(response);
  // let weather = jsonObject.weather[0].main;
  // if(weather == 'Rain') document.body.style.backgroundImage = "url('../images/rain.jpg')";
  NameCity.innerHTML = jsonObject.name+' , '+jsonObject.sys.country;
  NameWeather.innerHTML=jsonObject.weather[0].description;
  IconWeather.src = "http://openweathermap.org/img/wn/" + jsonObject.weather[0].icon + ".png";
  Temperature.innerHTML = jsonObject.main.temp;
  Humidity.innerHTML = jsonObject.main.humidity;
  Cloud.innerHTML = jsonObject.clouds.all;
  Wind.innerHTML =  jsonObject.wind.speed;
  Display.style.display = 'block';
}

function theResponse2(response) {
  let jsonObject = JSON.parse(response);
  let arr = getList(jsonObject);
  for(let i=0;i<3;i++){
    SixT[i].innerHTML=arr[i][0];
    SixM[i].innerHTML=arr[i][1];
    TwelveT[i].innerHTML=arr[i+3][0]
    TwelveM[i].innerHTML=arr[i+3][1]
    EighteenT[i].innerHTML=arr[i+6][0]
    EighteenM[i].innerHTML=arr[i+6][1]
    TwentyOneT[i].innerHTML=arr[i+9][0]
    TwentyOneM[i].innerHTML=arr[i+9][1]
  }
}
function httpRequestAsync(url, callback)
{
  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => { 
      if (httpRequest.readyState == 4 && httpRequest.status == 200)
          callback(httpRequest.responseText);
  }
  httpRequest.open("GET", url, true); 
  httpRequest.send();
}
//-------------------------Display Date Time---------------------------------------
function getDay(){
let mydate=new Date();
let year=mydate.getFullYear();
  let day=mydate.getDay();
  let month=mydate.getMonth();
  let daym=mydate.getDate();
if(daym<10)
  daym="0"+daym
  let dayarray=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
	let montharray=new Array("January","February","March","April","May","June","July","August","September","October","November","December")
  Day.innerHTML=""+dayarray[day]+", "+montharray[month]+" "+daym+", "+year+"";
}
  
function startTime() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    Time.innerHTML =h + ":" + m + ":" + s;
    setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
startTime();
getDay();
//---------------------Read Json Forecast------------------------------
function getList(json){
  let pos = findNextDay(json);
  let arrTime=[];
  for(let i=0; i<24;i++){
    let temp =[]
        temp[0]=json.list[i+pos].main.temp;
        temp[1]=json.list[i+pos].weather[0].main;
        arrTime.push(temp);
  }
  return [arrTime[2],arrTime[10],arrTime[18],arrTime[4],
           arrTime[12],arrTime[20],arrTime[6],arrTime[14],
           arrTime[22],arrTime[7],arrTime[15],arrTime[23],
          ];

}
function stringToSArray(str){
  let arr = str.split(' ');
  arr = arr[0].split('-');   
  return arr;
}

function isNextDay(date){
let nextDay = stringToSArray(date);
let today = new Date();
  today = today.toLocaleDateString(); today= today.split('/');
let date1 = new Date(today[2],today[1],today[0]);
let date2 = new Date(nextDay[0],nextDay[1],nextDay[2]);
let temp2=date2.valueOf();
let temp1=date1.valueOf();
let temp = temp2 -temp1;
if((temp2 - temp1) == 86400000) return true;
else return false;
//86400000 =1 day
}
function findNextDay(json){
  for(let i=0;i<9;i++){
      let time =json.list[i].dt_txt;
      if(isNextDay(time)) return i;
  }
}
function nextThreeDay(){
let dayarray=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
let mydate =new Date();
let day=mydate.getDay();
for (let i=0;i<7;i++){
  if(i==day){
    if(i+1>6)DayTwo.innerHTML=dayarray[i-6];
    else DayTwo.innerHTML=dayarray[i+1];
    if(i+2>6)DayThree.innerHTML=dayarray[i-5];
    else DayThree.innerHTML=dayarray[i+2];
    if(i+3>6)DayFour.innerHTML=dayarray[i-4];
    else DayFour.innerHTML=dayarray[i+3];
  }
}
}
nextThreeDay();
//----------------CSS TAB-----------------
function openTab(day) {
  debugger
  let Day = document.getElementsByClassName("day");
  for (let i = 0; i < Day.length; i++) {
    Day[i].style.display = "none";
    DayTwo.style.color = 'black';
    DayTwo.style.borderColor = 'black';
    DayThree.style.color = 'black';
    DayThree.style.borderColor = 'black';
    DayFour.style.color = 'black';
    DayFour.style.borderColor = 'black';
  }
  buttonTab(day);
  document.getElementById(day).style.display = "block";
}
function buttonTab(day){
  switch(day){
    case 'js-forecast-two':
      DayTwo.style.color = 'white';
      DayTwo.style.borderColor = '#18e9a7';
      break;
    case 'js-forecast-three':
      DayThree.style.color = 'white';
      DayThree.style.borderColor = '#18e9a7';
      break;
    case 'js-forecast-four':
      DayFour.style.color = 'white';
      DayFour.style.borderColor = '#18e9a7';
      break;
  }
}
//--------------------Notification-------------------------
console.log(Notification.permission);
// Getting permission
//Notification.requestPermission().then(function(result) {
//   console.log(result);
// });