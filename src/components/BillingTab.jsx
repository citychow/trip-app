import React, { useState, useEffect } from "react";
import CurrencyExchange from "./BillingSub/CurrencyExchange";
import BudgetSummary from "./BillingSub/BudgetSummary";
import SpendingList from "./BillingSub/SpendingList";

const BillingTab = ({ tripId }) => {
  const [billingData, setBillingData] = useState(() => {
    const saved = localStorage.getItem(`billing_${tripId}`);
    return saved
      ? JSON.parse(saved)
      : { budget: 0, spends: [], exchangeRate: 1 };
  });

  const [currency, setCurrency] = useState("HK$");

  useEffect(() => {
    localStorage.setItem(`billing_${tripId}`, JSON.stringify(billingData));
  }, [billingData, tripId]);

  const updateBilling = (newData) => {
    setBillingData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div>
      {/* <div className="container"> */}
      <div className="tab-container billing-page">
        <header className="tab-header">
          <h1 className="title">開支預算</h1>
        </header>

        {/* 1. 匯率轉換組件 */}
        <CurrencyExchange
          rate={billingData.exchangeRate}
          onUpdate={(r) => updateBilling({ exchangeRate: r })}
        />

        {/* 2. 預算概覽組件 */}
        <BudgetSummary
          budget={billingData.budget}
          spends={billingData.spends}
          currency={currency}
          onUpdateBudget={(b) => updateBilling({ budget: b })}
          onUpdateCurrency={setCurrency}
        />

        {/* 3. 消費紀錄清單 */}
        <SpendingList
          spends={billingData.spends}
          onUpdateSpends={(s) => updateBilling({ spends: s })}
        />
      </div>
    </div>
  );
};

export default BillingTab;
