import MenuItem from "./MenuItem.jsx";

/**
 * Renders a list of menu items. MenuItem may render a MenuList again for its
 * children — that mutual recursion is what makes the tree arbitrarily deep.
 */
export default function MenuList({ list }) {
  if (!Array.isArray(list) || list.length === 0) return null;
  return (
    <ul className="menu-list">
      {list.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
