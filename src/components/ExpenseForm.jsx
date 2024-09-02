
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, edit, clearEditingExpense } from "../slice/expenseSlice";

function ExpenseForm() {
    const [description, setDescription] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const dispatch = useDispatch();
    const editingExpenseId = useSelector(state => state.expense.editingExpenseId);
    const expenses = useSelector(state => state.expense.expenses);
    const currentExpense = expenses.find(expense => expense.id === editingExpenseId);

    useEffect(() => {
        if (editingExpenseId) {
            setDescription(currentExpense.description);
            setAmount(currentExpense.amount);
        } else {
            setDescription('');
            setAmount('');
        }
    }, [editingExpenseId, currentExpense]);

    function handleSubmit(e) {
        e.preventDefault();
        if (description && amount) {
            if (editingExpenseId) {
                dispatch(edit({ id: editingExpenseId, description, amount }));
                dispatch(clearEditingExpense());
            } else {
                dispatch(add({ description, amount }));
            }
            setDescription('');
            setAmount('');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-container">
                <input
                    className="form-input"
                    placeholder="Description.."
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input
                    className="form-input"
                    placeholder="Amount.."
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                />
                <button type="submit" className="submit-btn">
                    {editingExpenseId ? 'Update Expense' : 'Add Expense'}
                </button>
            </form>
        </div>
    );
}

export default ExpenseForm;
