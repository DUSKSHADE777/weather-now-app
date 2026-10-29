import { useState, useEffect } from "react";
import "./App.css";
import dropdown from "./assets/images/icon-dropdown.svg";
import units from "./assets/images/icon-units.svg";
import logo from "./assets/images/logo.svg";
import checkmark from "./assets/images/icon-checkmark.svg";
import search from "./assets/images/icon-search.svg";
import overcast from "./assets/images/icon-overcast.webp";
import rain from "./assets/images/icon-rain.webp";
import drizzle from "./assets/images/icon-drizzle.webp";
import snow from "./assets/images/icon-snow.webp";
import storm from "./assets/images/icon-storm.webp";
import sunny from "./assets/images/icon-sunny.webp";
import partyCloudy from "./assets/images/icon-partly-cloudy.webp";
import fog from "./assets/images/icon-fog.webp";
import loading from "./assets/images/icon-loading.svg";
import retry from "./assets/images/icon-retry.svg";
import error from "./assets/images/icon-error.svg";
function Emptycomponent(): any {
  return <div className="Day-card2"></div>;
}
function ErrorMassegeAD(props:any){
if (props.Errormassege==="Somthing went wrong") {
  return(
    <div className="API-error-ad">
     <img src={error} alt="error-icon" />
     <h1>Somthing went wrong</h1>
     <pre>We couldn't coneccet to the server (API error).Please try again in a few moments</pre>
     <button type="button" onClick={()=>{props.respon()
      props.setErrormassege("Ok")
      props.setisLoading(true);
      props.setisLoading2(true);
     }}><img src={retry} alt="try-again-icon"/>Retry</button>
    </div>
  )
} else if(props.Errormassege==="No search result found"){
return(<div className="API-error-ad">
      <h1>No search results found!</h1>
    </div>)
}
else{
  return null;
}
}
type Temperature = "Celsius" | "Fahrenheit";
type WindSpeed = "km/h" | "mph";
type Precipitation = "Millimeters" | "Inches";
type SwitchMode = "Imperial" | "Metric";
type Day =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";
type errors = "Somthing went wrong" | "No search result found" | "Ok";
function App() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [CountryData, setCountryData] = useState<any>(null);
  const [Seggusetion, setSeggusetion] = useState<any>(null);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [isLoading2, setisLoading2] = useState<boolean>(true);
  const [Errormassege, setErrormassege] = useState<errors>("Ok");
  const [userinput, setuserinput] = useState<string>("");

  const respon = async (cityName?:string) => {
    try {
      const targetCity = cityName ?? (userinput.trim() ? userinput : "Berlin");
      const fetchLGitude = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${targetCity}&count=3`,
      );

      if (!fetchLGitude.ok) {
        throw console.error();
      } 
      else {

        const dataLG = await fetchLGitude.json();
        if (dataLG.results && dataLG.results.length > 0) {
          setCountryData(dataLG);
          const fetchweather = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${dataLG.results[0].latitude}&longitude=${dataLG.results[0].longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`,
          );

          if (!fetchweather.ok){
            throw console.error();
          }
          else{
          const weatherdata = await fetchweather.json();
          setWeatherData(weatherdata);
          setErrormassege("Ok")
          setisLoading(false);
          console.log(weatherdata); 
          }
        }
        else{
  setErrormassege("No search result found");
  setisLoading(false);
        }
      }
    } catch (error) {
      setErrormassege("Somthing went wrong");
      console.log(Errormassege);
      setisLoading(false);
    }
  };
  useEffect(() => {
    respon();
  }, []);

  const countrysnames = async () => {
    try {
      const fetchCountryName = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${userinput.trim()}&count=3`,
      );
       if(!fetchCountryName.ok){
        throw console.error();
        
       }
       else{
      const seggusetion = await fetchCountryName.json();
      console.log(seggusetion);
          setErrormassege("Ok")
      setSeggusetion(seggusetion);
      setisLoading2(false); 
       }

    } catch (error) {
      setErrormassege("Somthing went wrong");
      console.log(Errormassege);
      setisLoading2(false);
    }
  };
  useEffect(() => {
    if (userinput.trim().length > 0) {
      countrysnames();
    }
  }, [userinput]);

  function setWeatheIMG(weatherCode: number) {
    let currentIMG;
    let secondaryIMG;
    switch (weatherCode) {
      case 0:
        currentIMG = sunny;
        break;
      case 1:
        currentIMG = sunny;
        break;

      case 2:
        currentIMG = partyCloudy;
        break;
      case 3:
        currentIMG = overcast;
        break;

      case 45:
        currentIMG = fog;
        break;
      case 48:
        currentIMG = fog;
        break;
      case 80:
        currentIMG = rain;
        break;
      case 55:
        currentIMG = drizzle;
        break;
      case 53:
        currentIMG = drizzle;
        break;
      case 51:
        currentIMG = drizzle;
        break;

      case 71:
        currentIMG = snow;
        break;
      case 73:
        currentIMG = snow;
        break;
      case 75:
        currentIMG = snow;
        break;
      case 66:
        currentIMG = snow;
        secondaryIMG = rain;
        break;
      case 67:
        currentIMG = snow;
        secondaryIMG = rain;
        break;

      case 82:
        currentIMG = rain;
        break;
      case 81:
        currentIMG = rain;
        break;
      case 65:
        currentIMG = rain;
        break;
      case 63:
        currentIMG = rain;
        break;
      case 61:
        currentIMG = drizzle;
        break;

      case 95:
        currentIMG = storm;
        break;
      case 86:
        currentIMG = storm;
        secondaryIMG = snow;
        break;
      case 85:
        currentIMG = storm;
        secondaryIMG = snow;
        break;
      case 96:
        currentIMG = storm;
        secondaryIMG = rain;
        break;
      case 99:
        currentIMG = storm;
        secondaryIMG = rain;
        break;
    }
    return [currentIMG, secondaryIMG];
  }
  function handleerrormassege() {
    if (!isLoading2) {
      if (Seggusetion.results === undefined) {
        setErrormassege("No search result found");
        console.log(Errormassege);
      }
    }
  }

  const [open, setopen] = useState(false);
  const [openinput, setopeninput] = useState(false);
  const [opendayMenu, setopendayMenu] = useState(false);

  const [Temperature, setTemperature] = useState<Temperature>("Celsius");
  const [WindSpeed, setWindSpeed] = useState<WindSpeed>("km/h");
  const [Precipitation, setPrecipitation] =
    useState<Precipitation>("Millimeters");
  const [SwitchMode, setSwitchMode] = useState<SwitchMode>("Metric");
  const [Day, setDay] = useState<Day>(
    new Date().toLocaleDateString("en-US", { weekday: "long" }) as Day,
  );

  return (
    <>
      <header>
        <img src={logo} alt="logo-icon" className="logo-icon" />
        <div className="units-container">
          <button className="unites" onClick={() => setopen(!open)}>
            <img src={units} alt="units-icon" />
            <p>Units</p>
            <img
              src={dropdown}
              alt="dropdown-icon"
              className={open ? "flip" : ""}
            />
          </button>
          <div className={`unites-shows ${open ? "open" : ""}`}>
            <button
              type="button"
              onClick={() => {
                if (SwitchMode === "Metric") {
                  setSwitchMode("Imperial");
                  setTemperature("Fahrenheit");
                  setWindSpeed("mph");
                  setPrecipitation("Inches");
                } else {
                  setSwitchMode("Metric");
                  setTemperature("Celsius");
                  setWindSpeed("km/h");
                  setPrecipitation("Millimeters");
                }
              }}
              className="switch"
            >
              <b>Switch to {SwitchMode === "Metric" ? "Imperial" : "Metric"}</b>
            </button>
            <h3>Temperature</h3>
            <button
              type="button"
              className={Temperature === "Celsius" ? "checked" : ""}
              onClick={() => setTemperature("Celsius")}
            >
              Celsius (°C){" "}
              <img
                src={checkmark}
                alt="checkmark-icon"
                className={`checked-icon ${Temperature === "Celsius" ? "show" : ""}`}
              />
            </button>
            <button
              type="button"
              className={Temperature !== "Celsius" ? "checked" : ""}
              onClick={() => setTemperature("Fahrenheit")}
            >
              Fahrenheit (°F){" "}
              <img
                src={checkmark}
                alt="checkmark-icon"
                className={`checked-icon ${Temperature !== "Celsius" ? "show" : ""}`}
              />
            </button>
            <hr />
            <h3>Wind Speed</h3>
            <button
              type="button"
              className={WindSpeed === "km/h" ? "checked" : ""}
              onClick={() => setWindSpeed("km/h")}
            >
              km/h
              <img
                src={checkmark}
                alt="checkmark-icon"
                className={`checked-icon ${WindSpeed === "km/h" ? "show" : ""}`}
              />
            </button>
            <button
              type="button"
              className={WindSpeed !== "km/h" ? "checked" : ""}
              onClick={() => setWindSpeed("mph")}
            >
              mph{" "}
              <img
                src={checkmark}
                alt="checkmark-icon"
                className={`checked-icon ${WindSpeed !== "km/h" ? "show" : ""}`}
              />
            </button>
            <hr />
            <h3>Precipitation</h3>
            <button
              type="button"
              className={Precipitation === "Millimeters" ? "checked" : ""}
              onClick={() => setPrecipitation("Millimeters")}
            >
              Millimeters (mm)
              <img
                src={checkmark}
                alt="checkmark-icon"
                className={`checked-icon ${Precipitation === "Millimeters" ? "show" : ""}`}
              />
            </button>
            <button
              type="button"
              className={Precipitation !== "Millimeters" ? "checked" : ""}
              onClick={() => setPrecipitation("Inches")}
            >
              Inches (in){" "}
              <img
                src={checkmark}
                alt="checkmark-icon"
                className={`checked-icon ${Precipitation !== "Millimeters" ? "show" : ""}`}
              />
            </button>
          </div>
        </div>

       {Errormassege!=="Somthing went wrong"?<section className="search-div">
          <h1>How's the sky looking today?</h1>
          <div className="input-buttons1">
            <div className="input-search-btn">
              <div className="input-lable">
                <label
                  htmlFor="search-bar"
                  className={`serach-icon ${openinput || userinput.length > 0 ? "show" : ""}`}
                >
                  <img src={search} alt="serach-icon" />
                </label>
                <input
                  type="text"
                  name=""
                  id="search-bar"
                  value={userinput}
                  onChange={(e) => {
                    setuserinput(e.target.value);
                  }}
                  placeholder={
                    openinput
                      ? `Search for a city, e.g., New York`
                      : "Search fro a place...."
                  }
                  onFocus={() => setopeninput(true)}
                  onBlur={() => setopeninput(false)}
                />
              </div>
              <button
                type="button"
                className="search-btn"
                onClick={() => {
                  if (userinput.trim()) {
                    respon();
                    setuserinput("");
                    handleerrormassege();
                  }
                }}
              >
                Search
              </button>
            </div>
            {!isLoading2 && Seggusetion?.results && (
              <div className={`input-buttons2 ${openinput ? "show" : ""}`}>
                {!isLoading2 &&
                  Seggusetion?.results?.map((item: any, index: number) => (
                    <button
                      key={index}
                      type="button"
                      onMouseDown={() => {
                        setuserinput(item.name);
                        setopeninput(false);
                        respon(item.name);
                      }}
                    >
                      {item.name}, {item.country}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </section>:""}
      </header>

{Errormassege!=="No search result found"&&Errormassege!=="Somthing went wrong"?<main>
        <section className={`sec1 ${isLoading ? "sec1-loading" : ""}`}>
          {isLoading && <h1 className="sec1-Loading-h1">Loading...</h1>}
          <div>
            <h2>
              {!isLoading
                ? `${CountryData.results[0].name},${CountryData.results[0].country} `
                : ""}
            </h2>
            <p>
              {!isLoading
                ? `${new Date(weatherData.current.time).toLocaleDateString("en-US", { weekday: "long" })},${new Date(weatherData.current.time).toLocaleDateString("en-US", { month: "long", day: "numeric" })},${new Date(weatherData.current.time).toLocaleDateString("en-US", { year: "numeric" })}`
                : ""}
            </p>
          </div>
          <div>
          <img
            src={
              !isLoading
                ? setWeatheIMG(weatherData?.daily?.weather_code[0])[0]
                : loading
            }
            alt="wether-img"
            className={`dailycurrentIMG ${isLoading ? "animation" : ""}`}
          />
          {weatherData?.daily?.weather_code?.[0] !== undefined &&
            !isLoading &&
            setWeatheIMG(weatherData?.daily?.weather_code[0])[1] && (
              <img
                src={
                  !isLoading
                    ? setWeatheIMG(weatherData?.daily?.weather_code[0])[1]
                    : ""
                }
                alt="wether-img"
                className="dailycurrentIMG2"
              />
            )}

          {!isLoading && (
            <span className="daily-tempreture">
              {Temperature === "Celsius"
                ? `${Math.round(weatherData.current.temperature_2m)}°`
                : `${Math.round(weatherData.current.temperature_2m * 1.8 + 32)}°`}
            </span>
          )}
          </div>
        </section>

        <section className="sec2">
          <div>
            <p>Feels like</p>
            {!isLoading ? (
              <h1>
                {Temperature === "Celsius"
                  ? `${Math.round(weatherData.current.apparent_temperature)}°`
                  : `${Math.round(weatherData.current.apparent_temperature * 1.8 + 32)}°`}
              </h1>
            ) : (
              "__"
            )}
          </div>
          <div>
            <p>Humidity</p>
            <h1>
              {!isLoading
                ? `${weatherData.current.relative_humidity_2m}%`
                : "__"}
            </h1>
          </div>
          <div>
            <p>Wind</p>
            {!isLoading ? (
              <h1>
                {WindSpeed === "km/h"
                  ? `${weatherData.current.wind_speed_10m} km/h`
                  : `${Math.round(weatherData.current.wind_speed_10m / 1.609)} mph`}
              </h1>
            ) : (
              "__"
            )}
          </div>
          <div>
            <p>Precipitation</p>
            {!isLoading ? (
              <h1>
                {Precipitation === "Millimeters"
                  ? `${weatherData.current.precipitation} mm`
                  : `${Math.round(weatherData.current.precipitation / 25.4)} in`}
              </h1>
            ) : (
              "__"
            )}
          </div>
        </section>
        <section className="sec3">
          <h3>Daily forecast</h3>

          <div className="sec3-main-div">
            {[0, 1, 2, 3, 4, 5, 6].map((i) =>
              !isLoading ? (
                <div className="Day-card" key={i}>
                  <p>
                    {new Date(weatherData.daily.time[i]).toLocaleDateString(
                      "en-US",
                      { weekday: "short" },
                    )}
                  </p>
                  <img
                    src={setWeatheIMG(weatherData.daily.weather_code[i])[0]}
                    alt=""
                    className="weather-IMG-week"
                  />
                  {setWeatheIMG(weatherData.daily.weather_code[i])[1] &&
                    !isLoading &&
                    weatherData.daily.weather_code[i] !== undefined && (
                      <img
                        src={setWeatheIMG(weatherData.daily.weather_code[i])[1]}
                        alt=""
                        className="weather-IMG-week2"
                      />
                    )}
                  <div className="Daily-forecast-tempretuer">
                    <span>
                      {Temperature === "Celsius"
                        ? `${Math.round(weatherData.daily.temperature_2m_max[i])}°`
                        : `${Math.round(1.8 * weatherData.daily.temperature_2m_max[i] + 32)}°`}
                    </span>
                    <span>
                      {Temperature === "Celsius"
                        ? `${Math.round(weatherData.daily.temperature_2m_min[i])}°`
                        : `${Math.round(1.8 * weatherData.daily.temperature_2m_min[i] + 32)}°`}
                    </span>
                  </div>
                </div>
              ) : (
                <Emptycomponent key={i}></Emptycomponent>
              ),
            )}
          </div>
        </section>
        <section className="sec4">
          <section className="header-section">
            <h3>Hourly forecast</h3>
            <button
              className="dropdown-menu"
              onClick={() => setopendayMenu(!opendayMenu)}
            >
              <span>{Day}</span>
              <img
                src={dropdown}
                alt="dropdown-icon"
                className={opendayMenu ? "flip" : ""}
              />{" "}
            </button>
            <dialog className={opendayMenu ? "show" : ""}>
              <button
                className="day-select"
                onClick={() => {
                  setDay("Monday");
                  setopendayMenu(!opendayMenu);
                }}
              >
                Monday
              </button>
              <button
                className="day-select"
                onClick={() => {
                  setDay("Tuesday");
                  setopendayMenu(!opendayMenu);
                }}
              >
                Tuesday
              </button>
              <button
                className="day-select"
                onClick={() => {
                  setDay("Wednesday");
                  setopendayMenu(!opendayMenu);
                }}
              >
                Wednesday
              </button>
              <button
                className="day-select"
                onClick={() => {
                  setDay("Thursday");
                  setopendayMenu(!opendayMenu);
                }}
              >
                Thursday
              </button>
              <button
                className="day-select"
                onClick={() => {
                  setDay("Friday");
                  setopendayMenu(!opendayMenu);
                }}
              >
                Friday
              </button>
              <button
                className="day-select"
                onClick={() => {
                  setDay("Saturday");
                  setopendayMenu(!opendayMenu);
                }}
              >
                Saturday
              </button>
              <button
                className="day-select"
                onClick={() => {
                  setDay("Sunday");
                  setopendayMenu(!opendayMenu);
                }}
              >
                Sunday
              </button>
            </dialog>
          </section>

          <section className="main-section">
            {!isLoading &&
              Array.from({ length: 168 }, (_, i) => i).map((i) =>
                Day ===
                (new Date(weatherData.hourly.time[i]).toLocaleDateString(
                  "en-US",
                  { weekday: "long" },
                ) as Day) ? (
                  <div className="hourly-weather-card" key={i}>
                    <img
                      src={setWeatheIMG(weatherData.hourly.weather_code[i])[0]}
                      alt=""
                      className="weather-IMG-hourly"
                    />
                    {setWeatheIMG(weatherData.hourly.weather_code[i])[1] &&
                      !isLoading &&
                      weatherData.hourly.weather_code[i] !== undefined && (
                        <img
                          src={
                            setWeatheIMG(weatherData.hourly.weather_code[i])[1]
                          }
                          alt=""
                          className="weather-IMG-hourly2"
                        />
                      )}
                    <span className="hour-time">
                      {new Date(weatherData.hourly.time[i]).toLocaleTimeString(
                        "en-US",
                        { hour: "numeric" },
                      )}
                    </span>
                    <span className="hour-terpretuer">
                      {Temperature === "Celsius"
                        ? `${Math.round(weatherData.hourly.temperature_2m[i])}°`
                        : `${Math.round(1.8 * weatherData.hourly.temperature_2m[i] + 32)}°`}
                    </span>
                  </div>
                ) : null,
              )}
          </section>
        </section>
      </main>:<ErrorMassegeAD setErrormassege={setErrormassege} Errormassege={Errormassege} respon={respon} setisLoading={setisLoading} setisLoading2={setisLoading2}></ErrorMassegeAD>}

      <footer className="attribution">
        {" "}
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge">
          Frontend Mentor
        </a>
        . Coded by <a href="https://github.com/DUSKSHADE777">DUSK</a>.
      </footer>
    </>
  );
}

export default App;
