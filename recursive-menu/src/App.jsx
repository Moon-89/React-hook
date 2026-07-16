import MenuList from "./MenuList.jsx";
import { menu } from "./data.js";
import "./menu.css";

export default function App() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <MenuList list={menu} />
      </aside>
      <main className="content" />
    </div>
  );
}
