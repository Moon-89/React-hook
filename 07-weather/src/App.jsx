import { useState, useEffect } from "react";
import "./App.css";

// WMO weather codes -> [label, emoji] (Open-Meteo standard)
const WMO = {
  0: ["Clear sky", "☀️"], 1: ["Mainly clear", "🌤️"], 2: ["Partly cloudy", "⛅"], 3: ["Overcast", "☁️"],
  45: ["Fog", "🌫️"], 48: ["Rime fog", "🌫️"], 51: ["Light drizzle", "🌦️"], 53: ["Drizzle", "🌦️"], 55: ["Dense drizzle", "🌧️"],
  61: ["Light rain", "🌦️"], 63: ["Rain", "🌧️"], 65: ["Heavy rain", "🌧️"], 66: ["Freezing rain", "🌧️"], 67: ["Freezing rain", "🌧️"],
  71: ["Light snow", "🌨️"], 73: ["Snow", "🌨️"], 75: ["Heavy snow", "❄️"], 77: ["Snow grains", "🌨️"],
  80: ["Rain showers", "🌦️"], 81: ["Rain showers", "🌧️"], 82: ["Violent showers", "⛈️"],
  85: ["Snow showers", "🌨️"], 86: ["Snow showers", "❄️"], 95: ["Thunderstorm", "⛈️"], 96: ["Thunderstorm", "⛈️"], 99: ["Thunderstorm", "⛈️"],
};

/**
 * Weather App — Hook focus:
 *   useState  -> search box, target city, fetched data, request status
 *   useEffect -> fetch LIVE weather from Open-Meteo whenever the city changes
 * APIs (no key): Open-Meteo geocoding + current weather.
 */
export default function App() {
  const [query, setQuery] = useState("London");
  const [city, setCity] = useState("London");
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [error, setError] = useState("");

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
        if (!geo.results || geo.results.length === 0) {
          throw new Error(`Couldn't find "${city}".`);
        }
        const loc = geo.results[0];

        const wRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}` +
            `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`
        );
        const w = await wRes.json();
        if (cancelled) return;

        setData({
          place: loc.name,
          region: [loc.admin1, loc.country].filter(Boolean).join(", "),
          ...w.current,
        });
        setStatus("idle");
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

  function submit(e) {
    e.preventDefault();
    if (query.trim()) setCity(query.trim());
  }

  const code = data ? WMO[data.weather_code] || ["Unknown", "🌡️"] : null;

  return (
    <div className="screen">
      <div className="weather">
        <h1>☁️ Weather</h1>
        <p className="sub">Live data via Open-Meteo · useState + useEffect + fetch</p>

        <form onSubmit={submit}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a city…"
          />
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "…" : "Search"}
          </button>
        </form>

        {status === "loading" && <p className="msg">Loading live weather…</p>}
        {status === "error" && <p className="msg err">⚠️ {error}</p>}

        {status === "idle" && data && (
          <div className="wcard">
            <div className="place">{data.place}</div>
            <div className="region">{data.region}</div>
            <div className="big">
              <span className="emoji">{code[1]}</span>
              <span className="temp">{Math.round(data.temperature_2m)}°</span>
            </div>
            <div className="desc">{code[0]}</div>
            <div className="wgrid">
              <div className="cell"><b>{Math.round(data.apparent_temperature)}°</b><span>FEELS LIKE</span></div>
              <div className="cell"><b>{data.relative_humidity_2m}%</b><span>HUMIDITY</span></div>
              <div className="cell"><b>{Math.round(data.wind_speed_10m)}</b><span>WIND km/h</span></div>
            </div>
          </div>
        )}

        <p className="hint">Try: Tokyo · Lahore · New York · Cairo · Sydney</p>
      </div>
    </div>
  );
}
