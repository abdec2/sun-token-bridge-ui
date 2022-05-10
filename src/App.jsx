import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import Bridge from "components/Bridge/Bridge";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./style.css";
import { FooterComponent } from "components/FooterComponent";
import LogoImg from './assets/logo.png'

const { Header } = Layout;

const styles = {
  content: {
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
    height: '100%'
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, web3, chainId } =
    useMoralis();
  
  useEffect(() => {
    console.log(chainId)
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }} className="bg-[#080910]">
      <Router>
        <Header style={styles.header} className="bg-black ">
          <Logo />
          <div className="flex items-center justify-center space-x-4">
            <Chains />
            <Account />
          </div>
        </Header>

        <div style={styles.content}>
          <Switch>
            <Route path="/">
              <Bridge />
            </Route>
          </Switch>
        </div>
      </Router>
      <FooterComponent />
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex" }}>
    <div className="w-[160px]"> 
      <img src={LogoImg} alt="" />
    </div>
  </div>
);

export default App;
