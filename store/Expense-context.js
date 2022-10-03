import { createContext, useReducer } from "react";

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];

    case "SET":
const inverted=action.payload.reverse();


      return inverted;

    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer,[]);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
    setExpenses: setExpenses,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export default ExpensesContextProvider;

// import { createContext, useReducer } from "react";

// const DUMMY_DATA = [
//     {
//       id: 'e1',
//       description: 'A pair of shoes',
//       amount: 59.99,
//       date: new Date('2021-12-19'),
//     },
//     {
//       id: 'e2',
//       description: 'A pair of trousers',
//       amount: 89.29,
//       date: new Date('2022-01-05'),
//     },
//     {
//       id: 'e3',
//       description: 'Some bananas',
//       amount: 5.99,
//       date: new Date('2021-12-01'),
//     },
//     {
//       id: 'e4',
//       description: 'A book',
//       amount: 14.99,
//       date: new Date('2022-02-19'),
//     },
//     {
//       id: 'e5',
//       description: 'Another book',
//       amount: 18.59,
//       date: new Date('2022-02-18'),
//     },
//     {
//       id: 'e6',
//       description: 'A pair of trousers',
//       amount: 89.29,
//       date: new Date('2022-01-05'),
//     },
//     {
//       id: 'e7',
//       description: 'Some bananas',
//       amount: 5.99,
//       date: new Date('2021-12-01'),
//     },
//     {
//       id: 'e8',
//       description: 'A book',
//       amount: 14.99,
//       date: new Date('2022-02-19'),
//     },
//     {
//       id: 'e9',
//       description: 'Another book',
//       amount: 18.59,
//       date: new Date('2022-02-18'),
//     },
//   ];

// export const ExpenseContext = createContext({
//   expenses: [],
//   addExpense: ({ description, date, amount }) => {},
//   deleteExpense: (id) => {},
//   updateExpense: (id, { description, date, amount }) => {},
// });

// function ExpenseReducer(state,action) {
//   switch (action.type) {
//     case "Add":
//       const id = new Date().toString() + Math.random().toString();
//       return [{ ...action.payload, id: id }, ...state];
//     case "Update":
//       //updatableExpenseIndex which is yet to be updated//
//       const updatableExpenseIndex = state.findIndex(
//         (expense) => expense.id === action.payload.id
//       );

//       const updatableExpense = state[updatableExpenseIndex];
//       const updatedItem = { ...updatableExpense, ...action.payload.data };

//       const updatedExpense = [...state];

//       //overwriting new data //
//       updatedExpense[updatableExpenseIndex] = updatedItem;

//       return updatedExpense;
//     case "Delete":
//       return state.filter((expense) => expense.id !== action.payload.id);

//     default:
//       return state;
//   }
// }

// function ExpenseContextProvider({ children }) {
//   //setting state here//
//   const [expensesState, dispatch] = useReducer(ExpenseReducer, DUMMY_DATA);

//   function addExpense(expenseData) {
//     dispatch({ type: "Add", payload: expenseData });
//   }

//   function deleteExpense(id) {
//     dispatch({ type: "Delete", payload: id });
//   }

//   function updateExpense(id, expenseData) {
//     dispatch({ type: "Update", payload: { id: id, data: expenseData } });
//   }

//   const value = {
//     expenses: expensesState,
//     addExpense: addExpense,
//     deleteExpense: deleteExpense,
//     updateExpense: updateExpense,
//   };

//   return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
// }

// export default ExpenseContextProvider;