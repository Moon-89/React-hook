import { useState, useEffect } from "react";
import "./weather.css";

// WMO weather codes -> lowercase description (Open-Meteo standard codes)
const WMO = {
  0: "clear sky", 1: "mainly clear", 2: "partly cloudy", 3: "overcast",
  45: "mist", 48: "freezing fog", 51: "light drizzle", 53: "drizzle", 55: "dense drizzle",
  61: "light rain", 63: "rain", 65: "heavy rain", 66: "freezing rain", 67: "freezing rain",
  71: "light snow", 73: "snow", 75: "heavy snow", 77: "snow grains",
  80: "rain showers", 81: "rain showers", 82: "violent rain showers",
  85: "snow showers", 86: "snow showers", 95: "thunderstorm", 96: "thunderstorm", 99: "thunderstorm",
};

export default function Weather() {
  const [query, setQuery] = useState("Bengaluru");
  const [city, setCity] = useState("Bengaluru"); // the city we actually fetch
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ok | error
  const [error, setError] = useState("");

  // useEffect: fetch live weather whenever the target city changes
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setStatus("loading");
      setError("");
      try {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
        );
        const geo = await geoRes.json();
        if (!geo.results || geo.results.length === 0) throw new Error(`Couldn't find "${city}".`);
        const loc = geo.results[0];

        const wRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}` +
            `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
        );
        const w = await wRes.json();
        if (cancelled) return;
        setData({
          name: loc.name,
          country: loc.country_code,
          temp: w.current.temperature_2m,
          humidity: w.current.relative_humidity_2m,
          wind: w.current.wind_speed_10m,
          description: WMO[w.current.weather_code] || "—",
        });
        setStatus("ok");
      } catch (e) {
        if (cancelled) return;
        setError(e.message || "Something went wrong.");
        setStatus("error");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [city]);

  function search(e) {
    e.preventDefault();
    if (query.trim()) setCity(query.trim());
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="weather-card">
      <form className="search-bar" onSubmit={search}>
        <input
          type="text"
          placeholder="Enter City Name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {status === "loading" && <p className="info">Loading…</p>}
      {status === "error" && <p className="info">{error}</p>}

      {status === "ok" && data && (
        <div className="result">
          <h2 className="city">{data.name}, {data.country}</h2>
          <p className="date">{today}</p>
          <div className="temp">
            {Math.round(data.temp)}<span>°C</span>
          </div>
          <p className="desc">{data.description}</p>
          <div className="meta">
            <div className="stat">
              <b>{data.wind}</b>
              <span>Wind Speed</span>
            </div>
            <div className="stat">
              <b>{data.humidity}%</b>
              <span>Humidity</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
