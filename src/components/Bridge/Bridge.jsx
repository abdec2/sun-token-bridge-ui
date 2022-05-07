import { useMoralis } from 'react-moralis';

import EthToBsc from "./EthToBsc";
import BscToEth from './BscToEth';

const styles = {
    container: {
        padding: '10px'
    },
    bridge__h1: {
        padding: '8px',
        marginBottom: '20px',
        textAlign: "center"
    }

}

const Bridge = () => {
    const { chainId } = useMoralis();
    return (
        <div style={styles.container}>
            <div style={styles.bridge__h1}>
                <h1 className='text-3xl font-bold uppercase'>Sun Token Bridge with Binance Smart Chain</h1>
            </div>
            <div className='w-full'>
                {chainId === process.env.REACT_APP_CHAINID_ETH ? (<EthToBsc />) : (<BscToEth />) }
            </div>
        </div>
    )
}

export default Bridge