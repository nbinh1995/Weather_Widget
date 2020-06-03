const NameCity = document.getElementById('js-city-name'),
      NameWeather = document.getElementById('js-weather-name'),
      IconWeather = document.getElementById('js-icon-weather'),
      Temperature = document.getElementById('js-temperature'),
      Humidity = document.getElementById('js-humidity'),
      Cloud = document.getElementById('js-cloud'),
      Wind = document.getElementById('js-wind');
const AppKey = "8a37a667a679dedffbe96e33485defb5",
      SearchButton = document.getElementById("js-search-btn"),
      SearchInput = document.getElementById("js-search-txt");
const Time = document.getElementById('js-local-time'),
      Day = document.getElementById('js-local-day');
//----------------------------------------------------------------

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
                      "&lang=vi&units=metric&appid="+ AppKey;
   httpRequestAsync(searchLink, theResponse);
  }
 }

function theResponse(response) {
  let jsonObject = JSON.parse(response);
  NameCity.innerHTML = jsonObject.name+' , '+jsonObject.sys.country;
  NameWeather.innerHTML=jsonObject.weather[0].description;
  IconWeather.src = "http://openweathermap.org/img/wn/" + jsonObject.weather[0].icon + ".png";
  Temperature.innerHTML = jsonObject.main.temp;
  Humidity.innerHTML = jsonObject.main.humidity;
  Cloud.innerHTML = jsonObject.clouds.all;
  Wind.innerHTML =  jsonObject.wind.speed;
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
//----------------------------------------------------------------
function getDay(){
let mydate=new Date();
let year=mydate.getFullYear();
// if(year<1000) year+=1900;
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
