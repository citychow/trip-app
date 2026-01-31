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

  useEffect(() => {
    localStorage.setItem(`billing_${tripId}`, JSON.stringify(billingData));
  }, [billingData, tripId]);

  const updateBilling = (newData) => {
    setBillingData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div className="tab-container billing-page">
      <header className="header-with-action">
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
        onUpdateBudget={(b) => updateBilling({ budget: b })}
      />

      {/* 3. 消費紀錄清單 */}
      <SpendingList
        spends={billingData.spends}
        onUpdateSpends={(s) => updateBilling({ spends: s })}
      />
    </div>
  );
};

export default BillingTab;
