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
  { num: "01", slug: "counter", title: "Counter", hooks: ["useState"], Component: Counter },
  { num: "02", slug: "todo", title: "Todo List", hooks: ["useState", "useEffect", "useRef"], Component: TodoApp },
  { num: "03", slug: "stopwatch", title: "Stopwatch", hooks: ["useState", "useEffect", "useRef"], Component: Stopwatch },
  { num: "04", slug: "color-picker", title: "Color Picker", hooks: ["useState", "useEffect"], Component: ColorPicker },
  { num: "05", slug: "digital-clock", title: "Digital Clock", hooks: ["useState", "useEffect"], Component: DigitalClock },
  { num: "06", slug: "character-counter", title: "Character Counter", hooks: ["useState", "useRef"], Component: CharacterCounter },
  { num: "07", slug: "weather", title: "Weather (live API)", hooks: ["useState", "useEffect", "fetch"], Component: WeatherApp },
  { num: "08", slug: "recipe", title: "Recipe Finder (search + filter)", hooks: ["useState", "useEffect", "fetch"], Component: RecipeApp },
];
