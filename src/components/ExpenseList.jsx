
import React from 'react';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { remove, setEditingExpense } from '../slice/expenseSlice';

function ExpenseList({ expenses }) {
    const dispatch = useDispatch();

    function handleRemove(id) {
        dispatch(remove(id));
    }

    function handleEdit(expense) {
        dispatch(setEditingExpense(expense.id));
    }
    

    return (
        <div>
            <ul className='list-show'>
                {expenses.length > 0 ? <h2 className='list-count'><span>Expenses List :</span> <span className='list-value'>{expenses.length}</span></h2> : <h2>No Expenses</h2>}
                {expenses.map((expense) => (
                    <li key={expense.id} className='list-content'>
                        <span className='expense-description'>{expense.description}</span>
                       
                        <span className='expense-amount'>₹{expense.amount.toFixed(2)}</span>
                        <div className='expense-actions'>

                            <button className='one' onClick={() => handleEdit(expense)}><MdEditSquare /></button>
                            <button className='two' onClick={() => handleRemove(expense.id)}><MdDelete /></button>
                        </div>
                    </li>
                ))}
            </ul>
            <p className='total'>Total Amount :  ₹{expenses.reduce((acc, expense) => acc + expense.amount, 0).toFixed(2)}</p>
        </div>
    );
}

export default ExpenseList;
