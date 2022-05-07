import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Image, Input, InputNumber, Modal } from "antd";
import { useState } from "react";
import { useMoralis, useChain } from 'react-moralis';

const styles = {
    
    textAlignCenter: {
        textAlign: "center"
    },
    greyColor: {
        color: "#ccc"
    },
    card: {
        boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
        border: "1px solid #e7eaf3",
        borderRadius: "1rem",
        fontSize: "16px",
        fontWeight: "500",
    },
    card__networkName: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
    },
    
    inputDiv: {
        width: "400px",
        margin: "auto",
        marginTop: "30px"
    },
    input: {
        borderRadius: "10px",
        textAlign: "center",
        width: "100%",
        padding: '5px'
    },
    button: {
        width: '100%',
        borderRadius: "10px",
    }
}

const BscToEth = () => {

    const [amount, setAmount] = useState(0);
    const { chainId, chain } = useChain();
    const { Moralis } = useMoralis();
    const [loading, setLoading] = useState(false);

    const handleBridge = async (e) => {
        setLoading(true)
        try {
            if (amount === 0) {
                setLoading(false)
                return;
            }

            if (chainId !== process.env.REACT_APP_CHAINID_BSC) {
                setLoading(false)
                return;
            }

            const options = {
                type: "erc20",
                amount: Moralis.Units.Token(amount.toString(), "5"),
                receiver: process.env.REACT_APP_BSC_BRIDGE_ADDRESS,
                contractAddress: process.env.REACT_APP_BSC_TOKEN_ADDRESS,
            };

            const transaction = await Moralis.transfer(options);
            const result = await transaction.wait();
            setLoading(false)
        } catch(e) {
            setLoading(false)
            console.log(e)
        }
    }


  return (
    <Card style={styles.card} className="mx-auto">
      <div style={styles.card__networkName}>
        <div style={{ ...styles.textAlignCenter, ...styles.greyColor }}>
          <p>Origin Network</p>
          <p>BSC Network</p>
        </div>
        <div>
          <ArrowRightOutlined style={{ fontSize: "30px", color: "#ccc" }} />
        </div>
        <div style={{ ...styles.textAlignCenter, ...styles.greyColor }}>
          <p>Destination Network</p>
          <p>Ethereum</p>
        </div>
      </div>
      <div style={{ ...styles.inputDiv }}>
        <label style={{ ...styles.greyColor }}>Amount</label>
        <InputNumber
          style={{ ...styles.input, ...styles.greyColor }}
          size="large"
          value={amount}
          onChange={(value) => setAmount(value)}
        />
      </div>
      <div style={{ ...styles.inputDiv }}>
        <Button
          disabled={loading}
          type="primary"
          size="large"
          style={{ ...styles.button }}
          onClick={handleBridge}
          className="bg-blue-500 uppercase font-bold"
        >
          {loading ? "Busy" : "Bridge"}
        </Button>
      </div>
    </Card>
  );
};

export default BscToEth;
