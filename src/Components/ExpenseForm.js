import react, { useState } from "react";
import "./ExpenseForm.css";
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { add, remove, update } from "../Redux/store";
import { toast } from "react-toastify";

function ExpeseForm() {
  const [form, setForm] = useState({
    name: "",
    amount: "",
    date: "",
  });

  const [editId, setEditId] = useState(null);
  const expenses = useSelector((s) => s.expenses);
  const total = expenses.reduce((s, e) => s + Number(e.amount), 0);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.amount || !form.date) {
       toast.error("Please fill all fields");
       return;
    }

    editId ? dispatch(update({ id: editId, ...form })) : dispatch(add(form));
    toast.success("Expense Added")
    setForm({ name: "", amount: "", date: "" });
    setEditId(null);
  };

  return (
    <div className="main-div">
      <div>
        
        <Paper sx={{p:3, mb: 4}}>
            <h2>Expense Tracker</h2>
        <form onSubmit={handleSubmit}>
            
            <TextField
            placeholder="Expense Name"
              type="text"
              name="name"
              fullWidth
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          <div className="lebel-form">
             <TextField
            placeholder="Amount name"
              type="number"
              name="amount"
              fullWidth
              required
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>
          <div className="lebel-form">
             <TextField
             placeholder="Date"
                type="date"
                name="date"
                fullWidth
                required
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
          </div>

          <Button
            className="lebel-form"
            variant="contained"
            color="primary"
            type="submit"

          >
            {editId ? "Update Expense" : "Add Expense"}
          </Button>
        </form>
        </Paper>
      </div>

    <Paper sx={{p:2}}>
      <h2>Expenses (Total: {total})</h2>
      <Table border="1" width="100%">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>

            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {expenses.map((e) => (
            <TableRow key={e.id}>
              <TableCell>{e.name}</TableCell>
              <TableCell>{e.amount}</TableCell>
              <TableCell>{e.date}</TableCell>
              <TableCell >
                <IconButton
                color="primary"
                  onClick={() => {
                    setForm(e);
                    setEditId(e.id);
                  }}
                >
                  Edit
                </IconButton>
                <IconButton
                color="primary"
                  onClick={() => {
                    dispatch(remove(e.id));
                    toast.info("Expense Deleted")
                  }}
                >
                  Delete
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Paper>
    </div>
  );
}

export default ExpeseForm;
