import { Button, Card, Image, Input, InputNumber, Modal } from "antd";
import { useState } from "react";
import { useMoralis, useChain } from 'react-moralis';

const styles = {
    container: {
        padding: '10px'
    },
    textAlignCenter: {
        textAlign: "center"
    },
    greyColor: {
        color: "#ccc"
    },
    card: {
        width: "600px",
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
    bridge__h1: {
        padding: '8px',
        marginBottom: '20px',
        textAlign: "center"
    },
    inputDiv: {
        width: "250px",
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

const Bridge = () => {
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

            if (chain.networkId !== 4) {
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
        <div style={styles.container}>
            <div style={styles.bridge__h1}>
                <h1>Sun Token Bridge with Binance Smart Chain</h1>
            </div>
            <Card style={styles.card}>
                <div style={styles.card__networkName}>
                    <div style={{ ...styles.textAlignCenter, ...styles.greyColor }}>
                        <p>Origin Network</p>
                        <p>Ethereum</p>
                    </div>
                    <div style={{ ...styles.textAlignCenter, ...styles.greyColor }}>
                        <p>Destination Network</p>
                        <p>BSC Network</p>
                    </div>
                </div>
                <div style={{ ...styles.inputDiv }}>
                    <InputNumber prefix="SUN Amount" style={{ ...styles.input, ...styles.greyColor }} size="large" value={amount} onChange={(value) => setAmount(value)} />
                </div>
                <div style={{ ...styles.inputDiv }}>
                    <Button disabled={loading} type="primary" size="large" style={{ ...styles.button }} onClick={handleBridge}>
                        {loading ? 'Busy' : 'Bridge'}
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default Bridge