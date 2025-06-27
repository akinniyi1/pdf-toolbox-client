import axios from "axios";

// Replace with your receiving wallet address
const RECEIVER_WALLET = "UQD-iJ1whFaOz-42NRmJPJ9U7bKAjsXgPiaY-cqRiHeq8AKs";

// Amount to check for (in nanotons)
const AMOUNT = "500000000"; // 0.5 TON

// TonCenter API (no key needed for now)
const TONCENTER_API = "https://toncenter.com/api/v2";

export async function checkPayment(userAddress) {
  try {
    const res = await axios.get(`${TONCENTER_API}/getTransactions`, {
      params: {
        address: RECEIVER_WALLET,
        limit: 20,
      },
    });

    const txs = res.data.result || [];
    return txs.some(tx =>
      tx.in_msg &&
      tx.in_msg.source === userAddress &&
      tx.in_msg.value === AMOUNT
    );
  } catch (err) {
    console.error("TON API error:", err);
    return false;
  }
}
