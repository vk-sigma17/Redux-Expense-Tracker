import React from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { FaListCheck } from "react-icons/fa6";

// import { add } from "./slice/expenseSlice";
import { useDispatch, useSelector } from "react-redux";

export default function App(){

  const expenses = useSelector((state) => state.expense.expenses);
  // const dispatch = useDispatch();
  return (
    <div className="app">
      <h1 className="app-heading">Expense Tracker <span className="heading-logo"><FaListCheck /></span> </h1>
      <ExpenseForm />
      <ExpenseList expenses={expenses}/>
    </div>
  )
}