import AdviceCard from "@/components/AdviceCard";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseItem from "@/components/ExpenseItem";
import { useAuthProtection } from "@/hooks/useAuth";
import { deleteExpense } from "@/redux/actions/expenseActions";
import type { AppDispatch, RootState } from "@/redux/store";
import { globalStyles } from "@/styles/globalStyles";
import type { Expense } from "@/types/Expense";
import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ExpensesScreen: React.FC = () => {
	// ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
	// Auth protection - redirect to login if not authenticated
	const { isAuthenticated } = useAuthProtection();
	const dispatch = useDispatch<AppDispatch>();
	const expenses = useSelector((state: RootState) => state.expenses);
	const [modalVisible, setModalVisible] = useState(false);
	const [editingExpense, setEditingExpense] = useState<Expense | undefined>(undefined);

	// Define computed values and functions AFTER hooks but BEFORE early return
	const sortedExpenses = [...expenses].sort((a, b) => b.date.getTime() - a.date.getTime());

	const handleAdd = () => {
		setEditingExpense(undefined); // clear editing
		setModalVisible(true);
	};

	const handleEdit = (expense: Expense) => {
		setEditingExpense(expense);
		setModalVisible(true);
	};

	const handleDelete = (id: string) => dispatch(deleteExpense(id));

	const renderItem = ({ item }: { item: Expense }) => (
		<ExpenseItem
			expense={item}
			category={item.category}
			onEdit={() => handleEdit(item)}
			onDelete={() => handleDelete(item.id)}
		/>
	);

	// Early return AFTER all hooks and function definitions
	if (!isAuthenticated) return null;

	return (
		<View style={globalStyles.containerGray}>
			<AdviceCard />
			<FlatList
				data={sortedExpenses}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				contentContainerStyle={globalStyles.listContent}
				ListEmptyComponent={<ExpenseItem isEmpty />}
			/>
			{/* Add Expense Button */}
			<TouchableOpacity
				style={globalStyles.fab}
				onPress={handleAdd}
			>
				<Text style={globalStyles.fabText}>+ Add Expense</Text>
			</TouchableOpacity>
			{/* Expense Form Modal */}
			<Modal
				visible={modalVisible}
				animationType="slide"
			>
				<ExpenseForm
					expense={editingExpense}
					onClose={() => setModalVisible(false)}
				/>
			</Modal>
		</View>
	);
};

export default ExpensesScreen;
