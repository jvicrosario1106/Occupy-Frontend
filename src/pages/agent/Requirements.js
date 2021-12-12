import React from "react";
import Title from "../Title";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Bank from "./requirement/Bank";
import InHouse from "./requirement/InHouse";
import Spot from "./requirement/Spot";
import Deferred from "./requirement/Deferred";
import HDMF from "./requirement/HDMF";

const Requirements = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Title title="List of Requirements" />
      <Container>
        <Paper style={{ margin: 50 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label={`Bank-Loan Requirements `} />
            <Tab label={`Deferred Cash Requirements `} />
            <Tab label={`HDMF Loan Requirements `} />
            <Tab label={`In-House Loan Requirements `} />
            <Tab label={`Spot Cash Requirements `} />
          </Tabs>
        </Paper>

        <TabPanel value={value} index={0}>
          <Bank />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Deferred />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <HDMF />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <InHouse />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Spot />
        </TabPanel>
      </Container>
    </div>
  );
  function TabPanel(props) {
    const { children, value, index } = props;
    return <div>{value === index && <Typography>{children}</Typography>}</div>;
  }
};

export default Requirements;
