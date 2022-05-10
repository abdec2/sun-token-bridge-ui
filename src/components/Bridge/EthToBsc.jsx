import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Image, Input, InputNumber, Modal } from "antd";
import TokenBalance from "components/TokenBalance";
import { useState } from "react";
import { useMoralis, useChain } from 'react-moralis';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

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

const EthToBsc = () => {

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

            if (chainId !== process.env.REACT_APP_CHAINID_ETH) {
                setLoading(false)
                return;
            }

            const options = {
                type: "erc20",
                amount: Moralis.Units.Token(amount.toString(), "5"),
                receiver: process.env.REACT_APP_ETH_BRIDGE_ADDRESS,
                contractAddress: process.env.REACT_APP_ETH_TOKEN_ADDRESS,
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
    <Card className="rounded-lg p-3 bg-slate-900 bg-opacity-50 border-none shadow-md shadow-slate-700 ">
      <div className="flex items-center justify-around">
        <div className="text-center text-[#f8583e]">
          <p className="font-bold">Origin Network</p>
          <p>Ethereum</p>
        </div>
        <div>
          <ArrowRightOutlined style={{ fontSize: "30px", color: "#f8583e" }} />
        </div>
        <div className="text-center text-[#f8583e]">
          <p className="font-bold">Destination Network</p>
          <p>BSC Network</p>
        </div>
      </div>
      <div className="mt-8">
        <label className="text-[#f8583e]">Amount</label>
        <InputNumber
          className="p-2 rounded-lg w-full text-center block bg-black bg-opacity-25 text-[#f8583e] focus:border-[#f8583e] focus:outline-none border-[#f8583e] hover:border-[#f8583e] focus:shadow-none "
          size="large"
          value={amount}
          onChange={(value) => setAmount(value)}
        />
        <TokenBalance chain={process.env.REACT_APP_CHAINID_ETH} address={process.env.REACT_APP_ETH_TOKEN_ADDRESS} setAmount={setAmount} />
      </div>
      <div className="mt-8">
        <Button
          disabled={loading}
          size="large"
          style={{ ...styles.button }}
          onClick={handleBridge}
          className="bg-[#f8583e] uppercase font-bold text-white hover:bg-[#f67d5b] hover:text-white border-none"
        >
          {loading ? (<Spin indicator={antIcon} />) : "Bridge"}
        </Button>
      </div>
    </Card>
  );
};

export default EthToBsc;
