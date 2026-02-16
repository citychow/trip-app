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

  // Direction A: Foreign -> HKD
  const handleForeignChange = (val) => {
    setForeignAmount(val);
    if (!val) {
      setHkdAmount("");
      return;
    }
    setHkdAmount((parseFloat(val) * currentRate).toFixed(2));
  };

  // Direction B: HKD -> Foreign
  const handleHkdChange = (val) => {
    setHkdAmount(val);
    if (!val || currentRate === 0) {
      setForeignAmount("");
      return;
    }
    setForeignAmount((parseFloat(val) / currentRate).toFixed(2));
  };

  return (
    <div className="currency-card">
      <div className="currency-header">
        <div className="header-left">
          <span>匯率計算機</span>
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
            : `1 HKD ≈ ${(1 / currentRate).toFixed(4)} ${selectedCurrency}`}
          <button
            className="refresh-small-btn"
            onClick={() => fetchLiveRate(selectedCurrency)}
          >
            🔄
          </button>
        </div>
      </div>

      <div className="converter-row">
        {/* HKD Input (Now Editable) */}
        <div>
          <div className="input-box">
            <input
              type="number"
              placeholder="0"
              value={hkdAmount}
              onChange={(e) => handleHkdChange(e.target.value)}
            />
            <span className="unit-label">HKD</span>
          </div>
        </div>

        <span className="arrow">⇄</span>
        {/* Right：手動選擇貨幣 + 輸入金額 */}
        <div>
          <div className="input-box">
            <input
              type="number"
              placeholder="0"
              value={foreignAmount}
              onChange={(e) => handleForeignChange(e.target.value)}
            />

            <span className="unit-label">{selectedCurrency}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyExchange;
