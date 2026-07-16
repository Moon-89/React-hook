import { useState } from "react";
import MenuList from "./MenuList.jsx";

/**
 * A single menu row. If it has children it renders a +/- toggle and,
 * when expanded, recursively renders another MenuList for its children.
 * Each item keeps its own open state with useState.
 */
export default function MenuItem({ item }) {
  const [open, setOpen] = useState(false);
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  return (
    <li className="menu-item">
      <div className="row" onClick={() => hasChildren && setOpen((o) => !o)}>
        <span className="label">{item.label}</span>
        {hasChildren && (
          <span className="toggle" aria-hidden="true">{open ? "−" : "+"}</span>
        )}
      </div>

      {hasChildren && open && <MenuList list={item.children} />}
    </li>
  );
}
