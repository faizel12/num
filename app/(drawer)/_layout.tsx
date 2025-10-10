import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Home",
          title: "All Items",
        }}
      />

      <Drawer.Screen
        name="5l" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "5L",
          title: "Five L",
        }}
      />

      <Drawer.Screen
        name="abadula" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Abadula",
          title: "Abadula",
        }}
      />

      <Drawer.Screen
        name="dolphin" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Dolphin",
          title: "Dolphin",
        }}
      />
      <Drawer.Screen
        name="2l" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "2L",
          title: "Five L",
        }}
      />
      <Drawer.Screen
        name="3l" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "3L",
          title: "Three L",
        }}
      />

<Drawer.Screen
        name="other" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Other",
          title: "Other Cars",
        }}
      />
    </Drawer>
  );
}

{
  /* <Drawer.Screen
name="(tabs)" // display none example
options={{
drawerItemStyle:{display:'none'}
}}
/> */
}
