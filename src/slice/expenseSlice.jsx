// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     expenses: [],
// };

// export const expenseSlice = createSlice({
//     name: 'expense',
//     initialState,
//     reducers:{
//         add:(state, action) => {
//             const { description, amount} = action.payload;
//             state.expenses.push({
//                 id: new Date(),
//                 description,
//                 amount: parseFloat(amount)
//             })

//         },
//         remove: (state, action) => {
//             const expenseId = action.payload;
//             state.expenses = state.expenses.filter(expense => expense.id !== expenseId);
//         }
//     }
// })


// export const {add, remove} = expenseSlice.actions;
// export default expenseSlice.reducer;



// expenseSlice.js
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    expenses: [],
    editingExpenseId: null, // Add this line to manage editing state
};

export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        add: (state, action) => {
            const { description, amount } = action.payload;
            state.expenses.push({
                id: Date.now(),
                description,
                amount: parseFloat(amount)
            });
        },
        remove: (state, action) => {
            const expenseId = action.payload;
            state.expenses = state.expenses.filter(expense => expense.id !== expenseId);
        },
        // edit: (state, action) => {
        //     const { id, description, amount } = action.payload;
        //     const expense = state.expenses.find(expense => expense.id === id);
        //     if (expense) {
        //         expense.description = description;
        //         expense.amount = parseFloat(amount);
        //     }
            
        // },
        edit: (state, action) => {
            const { id, description, amount } = action.payload;
            const expenseIndex = state.expenses.findIndex(expense => expense.id === id);
            if (expenseIndex !== -1) {
                // Update the expense
                state.expenses[expenseIndex] = { ...state.expenses[expenseIndex], description, amount: parseFloat(amount) };
                // Move the updated expense to the top
                const [updatedExpense] = state.expenses.splice(expenseIndex, 1);
                state.expenses.unshift(updatedExpense);
            }
        },
        setEditingExpense: (state, action) => {
            state.editingExpenseId = action.payload;
        },
        clearEditingExpense: (state) => {
            state.editingExpenseId = null;
        },
    }
});

export const { add, remove, edit, setEditingExpense, clearEditingExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
