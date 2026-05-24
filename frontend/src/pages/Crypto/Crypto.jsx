import { useEffect, useState } from "react";
import { getCrypto } from "../../api/external";
import Loader from "../../commponents/Loader/Loader";
import style from "./Crypto.module.css";

function Crypto() {
  const [data, setData] = useState([]);
  useEffect(() => {
    //IIFE
    (async () => {
      const response = await getCrypto();
      console.log("Data Response", response); // TEST POINT
      setData(response);
    })();
  }, []);

  if (data.length === 0) {
    return <Loader text="Crypto" />;
  }
  const negtivePrice = {
    color: '#ea3943'
  }
  const postivePrice ={
    color: '#16c784'
  }

  return (
    <table className={style.table}>
      <thead className={style.head}>
        <tr>
          <th>#</th>
          <th>Coin</th>
          <th>Symbol</th>
          <th>Current Price</th>
          <th>Price change 24hrs</th>
        </tr>
      </thead>
      <tbody>
        {data.map((coin) => (
          <tr key={coin.id} className={style.tableRow}>
            <td>{coin.market_cap_rank}</td>
            <td>
              <div className={style.logo}>
                <img src={coin.image} width={35} alt="logo" />
                <p>{coin.name}</p>
              </div>
            </td>
            <td><div className={style.symbol}>{coin.symbol}</div></td>
            <td>{coin.current_price}</td>
            <td 
            style={coin.price_change_24h < 0 ? negtivePrice : postivePrice}
            >{coin.price_change_24h}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Crypto;
