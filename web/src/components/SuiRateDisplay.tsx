import React from 'react';
import { useSuiPrice } from '../hooks/useSuiPrice';

interface SuiRateDisplayProps {
  hourlyRateSui: number;
  budgetSui: number;
}

export const SuiRateDisplay: React.FC<SuiRateDisplayProps> = ({ hourlyRateSui, budgetSui }) => {
  const { price, loading, error } = useSuiPrice();

  const hourlyRateUsd = price ? (hourlyRateSui * price).toFixed(2) : '...';
  const budgetUsd = price ? (budgetSui * price).toFixed(2) : '...';

  return (
    <div className="space-y-2">
      <div>
        <strong>Hourly Rate:</strong> {hourlyRateSui} SUI
        {loading ? ' (Loading USD...)' : error ? ` (Error: ${error})` : ` ≈ $${hourlyRateUsd}`}
      </div>
      <div>
        <strong>Budget:</strong> {budgetSui} SUI
        {loading ? ' (Loading USD...)' : error ? ` (Error: ${error})` : ` ≈ $${budgetUsd}`}
      </div>
    </div>
  );
};
