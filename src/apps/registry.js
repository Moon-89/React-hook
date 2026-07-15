import Counter from "./counter/Counter.jsx";
import TodoApp from "./todo/TodoApp.jsx";
import Stopwatch from "./stopwatch/Stopwatch.jsx";
import ColorPicker from "./color-picker/ColorPicker.jsx";
import DigitalClock from "./digital-clock/DigitalClock.jsx";
import CharacterCounter from "./character-counter/CharacterCounter.jsx";
import WeatherApp from "./weather/WeatherApp.jsx";
import RecipeApp from "./recipe/RecipeApp.jsx";

// Single source of truth for the home grid and the router.
export const APPS = [
  {
    num: "01", slug: "counter", title: "Counter", icon: "🔢", accent: "#22c55e",
    blurb: "Increment, decrement, and set your own step size.",
    hooks: ["useState"], Component: Counter,
  },
  {
    num: "02", slug: "todo", title: "Todo List", icon: "✅", accent: "#14b8a6",
    blurb: "Add tasks, filter them, and everything is saved locally.",
    hooks: ["useState", "useEffect", "useRef"], Component: TodoApp,
  },
  {
    num: "03", slug: "stopwatch", title: "Stopwatch", icon: "⏱️", accent: "#8b5cf6",
    blurb: "Precise timing to the centisecond, with laps.",
    hooks: ["useState", "useEffect", "useRef"], Component: Stopwatch,
  },
  {
    num: "04", slug: "color-picker", title: "Color Picker", icon: "🎨", accent: "#f43f5e",
    blurb: "Paint the page live and copy any hex value.",
    hooks: ["useState", "useEffect"], Component: ColorPicker,
  },
  {
    num: "05", slug: "digital-clock", title: "Digital Clock", icon: "🕐", accent: "#38bdf8",
    blurb: "A live ticking clock with a 12 / 24-hour switch.",
    hooks: ["useState", "useEffect"], Component: DigitalClock,
  },
  {
    num: "06", slug: "character-counter", title: "Character Counter", icon: "✍️", accent: "#ec4899",
    blurb: "Live character, word, and line counts with a limit.",
    hooks: ["useState", "useRef"], Component: CharacterCounter,
  },
  {
    num: "07", slug: "weather", title: "Weather", icon: "☁️", accent: "#0ea5e9",
    blurb: "Live weather for any city, straight from the API.",
    hooks: ["useState", "useEffect", "fetch"], Component: WeatherApp,
  },
  {
    num: "08", slug: "recipe", title: "Recipe Finder", icon: "🍳", accent: "#f59e0b",
    blurb: "Search and filter thousands of recipes by category.",
    hooks: ["useState", "useEffect", "fetch"], Component: RecipeApp,
  },
];
