import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const { data: transactions, error: err } = await locals.supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false });

  if (err) {
    console.error('Error fetching transactions:', err.message);
    throw error(500, 'Gagal memuat riwayat keuangan');
  }

  const validTransactions = transactions || [];

  const stats = {
    income: validTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0),
    expense: validTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0)
  };
  const totalBalance = stats.income - stats.expense;

  return {
    transactions: validTransactions,
    stats: {
      ...stats,
      balance: totalBalance
    },
    dbError: false
  };
};

export const actions: Actions = {
  deleteTransaction: async ({ request, locals }) => {
    const data = await request.formData();
    const id = data.get('id') as string;

    if (!id) return { error: 'ID transaksi tidak valid' };

    const { error: err } = await locals.supabase.from('transactions').delete().eq('id', id);

    if (err) {
      console.error('Error deleting transaction:', err.message);
      return { error: 'Gagal menghapus mutasi' };
    }

    return { success: true };
  }
};
