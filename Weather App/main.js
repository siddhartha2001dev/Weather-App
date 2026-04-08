const place = document.querySelector('#input');
const searchBtn = document.querySelector('.btn');
const outputval = document.querySelector('.output');


function getIcon(condition, temp, isDay) {


    const base = "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/";

    condition = condition.toLowerCase();

    
    if (isDay === 0) {
        return base + "night.svg";
    } 
    else if (condition.includes("thunder") || condition.includes("storm")) {
        return base + "thunder.svg";
    } 
    else if (condition.includes("rain") || condition.includes("drizzle")) {
        return base + "rainy-1.svg";
    } 
    else if (condition.includes("cloud")) {
        return base + "cloudy.svg";
    } 
    else if (condition.includes("sunny") || temp > 30) {
        return base + "day.svg";
    } 
    else if (temp < 10) {
        return base + "snowy-1.svg";
    }

    return base + "cloudy.svg";
}


async function weather() {

    try{

        const weatherApi = await fetch(`https://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${place.value}&aqi=no`);
        const result = await weatherApi.json();
        console.log(result);
        console.log(result.current.temp_c);

        const iconUrl = getIcon(
            result.current.condition.text,
            result.current.temp_c,
            result.current.is_day,
            result.location.region,
            result.location.name
        );



        outputval.innerHTML =

        `<img src = "${iconUrl}" width= "100">
        <h3> Country : ${result.location.country}</h3>
        <h3> Region : ${result.location.name}</h3>
        <h3> State : ${result.location.region}</h3>

        <p> Feel's like: ${result.current.temp_c} °C </p>
        <p> Condition: ${result.current.condition.text}</p>`

    } catch (error) {
        console.log('Error')
        outputval.innerHTML = "Invalid Request";
    }

};

searchBtn.addEventListener('click', weather);
place.addEventListener('keypress', (e)=> {
    if (e.key === 'Enter'){
        weather();
    }
});