import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import Loading from "../components/UI/Loading";
import { ExpenseContext } from "../store/Expense-context";

import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";

function RecentExpenses() {
  // const [fetchedExpenses,setFetchedExpenses]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const expensesCtx = useContext(ExpenseContext);
  const [error, setError] = useState();

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch Expenses!");
      }

      // setFetchedExpenses(expenses);
      setIsLoading(false);
    }

    getExpenses();
  }, []);
  function errorHandler() {
    setError(null);
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  
  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isLoading) {
    return <Loading />;
  }


  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
