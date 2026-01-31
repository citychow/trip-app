import React, { useState, useEffect } from "react";

const CurrencyExchange = ({ tripCountry, onRateUpdate }) => {
  // 常見貨幣清單
  const commonCurrencies = [
    "JPY",
    "KRW",
    "THB",
    "USD",
    "EUR",
    "GBP",
    "TWD",
    "CNY",
    "AUD",
  ];

  // 根據行程國家搵出預設貨幣代碼
  const getInitialCurrency = () => {
    const map = {
      日本: "JPY",
      韓國: "KRW",
      泰國: "THB",
      英國: "GBP",
      美國: "USD",
      歐洲: "EUR",
      台灣: "TWD",
      中國: "CNY",
    };
    return map[tripCountry] || "USD";
  };

  const [selectedCurrency, setSelectedCurrency] = useState(
    getInitialCurrency()
  );
  const [foreignAmount, setForeignAmount] = useState("");
  const [hkdAmount, setHkdAmount] = useState(0);
  const [currentRate, setCurrentRate] = useState(0);
  const [loading, setLoading] = useState(false);

  // 攞 Live Rate 嘅 Function
  const fetchLiveRate = async (currency) => {
    setLoading(true);
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${currency}`);
      const data = await res.json();
      const liveRate = data.rates.HKD;
      setCurrentRate(liveRate);
      onRateUpdate(liveRate); // 話俾 parent 組件聽最新匯率
      if (foreignAmount) setHkdAmount((foreignAmount * liveRate).toFixed(2));
    } catch (error) {
      console.error("匯率獲取失敗");
    }
    setLoading(false);
  };

  // 當組件載入或用家切換貨幣時觸發
  useEffect(() => {
    fetchLiveRate(selectedCurrency);
  }, [selectedCurrency]);

  const handleConvert = (val) => {
    setForeignAmount(val);
    setHkdAmount((val * currentRate).toFixed(2));
  };

  return (
    <div className="currency-card">
      <div className="currency-header">
        <div className="header-left">
          <span className="label">匯率計算機</span>
          <select
            className="currency-selector-inline"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            {commonCurrencies.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
        <div className="rate-info-tag">
          {loading
            ? "更新中..."
            : `1 ${selectedCurrency} = ${currentRate.toFixed(4)} HKD`}
          <button
            className="refresh-small-btn"
            onClick={() => fetchLiveRate(selectedCurrency)}
          >
            🔄
          </button>
        </div>
      </div>

      <div className="converter-row">
        {/* 左邊：手動選擇貨幣 + 輸入金額 */}
        <div className="input-group-wrapper">
          <div className="input-box">
            <input
              type="number"
              placeholder="0"
              value={foreignAmount}
              onChange={(e) => handleConvert(e.target.value)}
            />
          </div>
        </div>

        <span className="arrow">→</span>

        {/* 右邊：HKD 結果 */}
        <div className="result-box highlighted">
          <div className="display-val">{hkdAmount}</div>
          <span className="unit-hkd">HKD</span>
        </div>
      </div>
    </div>
  );
};

export default CurrencyExchange;
