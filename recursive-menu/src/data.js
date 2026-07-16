// Nested menu data — rendered recursively.
export const menu = [
  { id: "home", label: "Home" },
  {
    id: "profile",
    label: "Profile",
    children: [
      {
        id: "details",
        label: "Details",
        children: [
          {
            id: "location",
            label: "Location",
            children: [{ id: "city", label: "City" }],
          },
        ],
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    children: [
      { id: "account", label: "Account" },
      {
        id: "security",
        label: "Security",
        children: [
          { id: "login", label: "Login" },
          {
            id: "register",
            label: "Register",
            children: [{ id: "random", label: "Random data" }],
          },
        ],
      },
    ],
  },
];
