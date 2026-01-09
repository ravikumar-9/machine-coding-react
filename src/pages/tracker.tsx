import { Plus } from "lucide-react";
import Button from "../components/ui/button";
import { useState } from "react";
import Card from "../components/ui/Card";
import { Dialog, DialogContent } from "../components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  expenseSchema,
  incomeSchema,
  type expenseFormType,
  type incomeFormType,
} from "../schema/trackerschema";
import Input from "../components/ui/input";
import useStore from "../store/store";
import TextArea from "../components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import React from "react";

const Tracker = () => {
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const { addIncome, addExpenses, income, expenses } = useStore();
  const totalIncome = income?.reduce(
    (acc, income) => acc + Number(income?.income),
    0
  );
  const totalExpenses = expenses?.reduce(
    (acc, expense) => acc + Number(expense?.amount),
    0
  );
  const totalBalance = totalIncome - totalExpenses;

  const form = useForm<incomeFormType>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      date: "",
      income: "0",
    },
  });

  const expensesForm = useForm<expenseFormType>({
    resolver: zodResolver(expenseSchema),
  });

  const handleAddForm = (data: incomeFormType) => {
    addIncome(data);
    setIsIncomeModalOpen(false);
    form.reset();
  };

  const handleAddExpense = (data: expenseFormType) => {
    addExpenses({ ...data, id: expenses?.length + 1 });
    setIsExpenseModalOpen(false);
  };

  return (
    <div className="flex flex-col p-6 bg-gray-950 border border-slate-500 min-h-screen space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full md:w-1/3 gap-3">
          <Card className="bg-green-600 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 delay-100 cursor-pointer flex items-center justify-center">
            <p className="text-white font-bold">
              Income
              <br />
              <span className="font-medium text-center">{totalIncome}</span>
            </p>
          </Card>
          <Card className="bg-red-500 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 delay-100 cursor-pointer flex items-center justify-center">
            <p className="text-white font-bold">
              Expenses
              <br />
              <span className="font-medium">{totalExpenses}</span>
            </p>
          </Card>
          <Card className="bg-indigo-500 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 delay-100 cursor-pointer flex items-center justify-center">
            <p className="text-white font-bold">
              Balance
              <br />
              <span className="font-medium">{totalBalance}</span>
            </p>
          </Card>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            className="text-xs gap-2"
            onClick={() => {
              setIsIncomeModalOpen(true);
              form.reset();
            }}
          >
            <Plus className="h-4 w-4" />
            Add income
          </Button>
          <Button
            variant="primary"
            className="text-xs gap-2"
            onClick={() => {
              setIsExpenseModalOpen(true);
              expensesForm.reset();
            }}
          >
            <Plus className="h-4 w-4" />
            Add expenses
          </Button>
        </div>
      </div>
      <div>
        <Table className="text-white bg-gray-700">
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses?.map((exp, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-1 align-middle">
                  <div className="h-4 w-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in"></div>
                  {index + 1}
                </TableCell>
                <TableCell>{exp?.category}</TableCell>
                <TableCell>{exp.amount}</TableCell>
                <TableCell className="break-words max-w-96">
                  {exp?.notes ? exp?.notes : "-"}
                </TableCell>
                <TableCell>
                  {exp?.date ? new Date(exp?.date)?.toLocaleString() : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/*add income*/}
      <Dialog open={isIncomeModalOpen} onOpenChange={setIsIncomeModalOpen}>
        <DialogContent className="bg-white">
          <h2 className="font-bold">Add Income</h2>
          <form
            {...form}
            className="my-4"
            onSubmit={form.handleSubmit(handleAddForm)}
          >
            <Input
              type="date"
              {...form.register("date")}
              label="Date"
              message={form.formState.errors.date?.message}
              required
            />
            <Input
              type="text"
              message={form.formState.errors.income?.message}
              {...form.register("income")}
              label="Income"
              required
              placeholder="Enter income"
            />
            <div className="grid grid-cols-2 ml-auto gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsIncomeModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Add
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/*add expense */}
      <Dialog open={isExpenseModalOpen} onOpenChange={setIsExpenseModalOpen}>
        <DialogContent className="bg-white">
          <h2 className="font-bold">Add Expense</h2>
          <form
            {...expensesForm}
            className="space-y-4"
            onSubmit={expensesForm.handleSubmit(handleAddExpense)}
          >
            <Input
              type="date"
              label="Date"
              required
              message={expensesForm.formState.errors.date?.message}
              {...expensesForm.register("date")}
            />
            <Input
              type="text"
              label="Amount"
              required
              message={expensesForm.formState.errors.amount?.message}
              {...expensesForm.register("amount")}
            />
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                {...expensesForm.register("category")}
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:ring-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 outline-0"
              >
                <option value="Food">Food</option>
                <option value="groceries">Groceries</option>
                <option value="social">Social</option>
                <option value="lifestyle">LifeStyle</option>
                <option value="transport">Transport</option>
                <option value="other">Other</option>
              </select>
              <span className="text-xs text-red-500 w-full block leading-none">
                {expensesForm.formState.errors.category?.message &&
                  expensesForm.formState.errors.category?.message}
              </span>
            </div>
            <TextArea
              label="Notes"
              rows={4}
              message={expensesForm.formState.errors.notes?.message}
              {...expensesForm.register("notes")}
            />
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsExpenseModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Add
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tracker;
