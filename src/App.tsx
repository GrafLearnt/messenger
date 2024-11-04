import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import GeneratePage from "./pages/GeneratePage";
import Show from "./pages/Show"
// export * from "./shorter"

interface Link {
  url: string;
  label: string;
  component: JSX.Element;
}

const LINKS: Link[] = [
  { url: "/messenger/", label: "Home", component: <MainPage /> },
  { url: "/messenger/login", label: "Login", component: <Login /> },
  {
    url: "/messenger/generate",
    label: "Generate",
    component: <GeneratePage />,
  },
];

function LabTabs() {
  const location = useLocation();
  const navigate = useNavigate();
  const tabValueFromUrl = location.pathname || LINKS[0].url;

  const [value, setValue] = React.useState(tabValueFromUrl);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  React.useEffect(() => {
    setValue(tabValueFromUrl);
  }, [location.pathname, tabValueFromUrl]);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {LINKS.map((i, ix) => (
              <Tab key={ix} label={i.label} value={i.url} />
            ))}
          </TabList>
        </Box>
        {/*<Show/>*/}
        {LINKS.map((i, ix) => (
          <span key={ix} style={{ display: value === i.url ? 'block' : 'none' }}>
      {/*    <TabPanel
            key={ix}
            value={i.url}
          >*/}
            {i.component}
          {/*</TabPanel>*/}
          </span>
        ))}      
      </TabContext>
    </Box>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<LabTabs />} />
    </Routes>
  );
}
