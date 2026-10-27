'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Trash2,
  ExternalLink,
  LogOut,
  Sparkles,
  ShoppingBag,
  Filter,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { Product } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import { toggleProductStatus, deleteProduct } from '@/app/admin/produtos/actions';
import { createClient } from '@/lib/supabase/client';

interface AdminProductsDashboardProps {
  initialProducts: Product[];
  userEmail?: string;
  isDemo?: boolean;
}

export const AdminProductsDashboard: React.FC<AdminProductsDashboardProps> = ({
  initialProducts,
  userEmail = 'admin@mekdonuts.com.br',
  isDemo = false,
}) => {
  const router = useRouter();
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedStatus, setSelectedStatus] = useState<'todos' | 'disponivel' | 'esgotado'>('todos');
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  // Alternar Disponibilidade (Disponível / Esgotado)
  const handleToggleStatus = async (product: Product) => {
    setActionLoadingId(product.id);
    const newStatus = !product.disponivel;

    // Atualização otimista
    setProductsList((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, disponivel: newStatus } : p))
    );

    const res = await toggleProductStatus(product.id, !!product.disponivel);

    if (res.success) {
      showToast(
        `"${product.nome}" agora está ${newStatus ? 'Disponível para venda' : 'Esgotado'}.`
      );
    } else {
      // Reverter se falhou
      setProductsList((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, disponivel: !newStatus } : p))
      );
      showToast(res.error || 'Erro ao atualizar status do produto.', 'error');
    }

    setActionLoadingId(null);
  };

  // Excluir Produto
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);

    const res = await deleteProduct(productToDelete.id);

    if (res.success) {
      setProductsList((prev) => prev.filter((p) => p.id !== productToDelete.id));
      showToast(`Produto "${productToDelete.nome}" removido do catálogo com sucesso.`);
      setProductToDelete(null);
    } else {
      showToast(res.error || 'Erro ao excluir produto.', 'error');
    }

    setIsDeleting(false);
  };

  // Filtragem
  const filteredProducts = useMemo(() => {
    return productsList.filter((prod) => {
      const matchesCat =
        selectedCategory === 'Todos' || prod.categoria === selectedCategory;

      const matchesStatus =
        selectedStatus === 'todos'
          ? true
          : selectedStatus === 'disponivel'
          ? prod.disponivel !== false
          : prod.disponivel === false;

      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        term === '' ||
        prod.nome.toLowerCase().includes(term) ||
        prod.desc.toLowerCase().includes(term) ||
        (prod.slug && prod.slug.toLowerCase().includes(term));

      return matchesCat && matchesStatus && matchesSearch;
    });
  }, [productsList, selectedCategory, selectedStatus, searchTerm]);

  // Estatísticas
  const stats = useMemo(() => {
    const total = productsList.length;
    const disponiveis = productsList.filter((p) => p.disponivel !== false).length;
    const esgotados = total - disponiveis;
    const categorias = Array.from(new Set(productsList.map((p) => p.categoria))).length;
    return { total, disponiveis, esgotados, categorias };
  }, [productsList]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-8">
      
      {/* Top Bar da Área Administrativa */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-editorial border border-pink-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🍩</span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark">
                Painel Administrativo
              </h1>
              <span className="bg-brand-primary/10 text-brand-primary text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                Mek Donuts
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Conectado como <strong className="text-brand-dark">{userEmail}</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link
            href="/cardapio"
            target="_blank"
            className="px-4 py-2 rounded-full border border-gray-200 text-xs font-bold text-gray-700 hover:text-brand-primary hover:border-pink-200 transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Ver Cardápio Público</span>
          </Link>

          <Link
            href="/admin/produtos/novo"
            className="px-5 py-2 rounded-full bg-brand-primary hover:bg-[#d01754] text-white text-xs font-bold shadow-sm hover:shadow transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Produto</span>
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Sair do painel"
            aria-label="Sair da conta"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Banner de Demonstração / Aviso se aplicável */}
      {isDemo && (
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 text-amber-900 text-xs flex items-start gap-3 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm mb-0.5">Modo de Catálogo Padrão (Sem Banco Conectado)</p>
            <p className="leading-relaxed text-amber-800">
              Você está visualizando os produtos pré-cadastrados do catálogo de demonstração. Quando configurar as credenciais do Supabase no <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.env.local</code> e rodar a migração do <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">supabase/schema.sql</code>, todas as alterações de estoque e novos uploads serão persistidos diretamente no seu banco e bucket de armazenamento!
            </p>
          </div>
        </div>
      )}

      {/* Toast de Notificação */}
      {toast && (
        <div
          className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold border animate-in fade-in slide-in-from-top-4 duration-300 ${
            toast.type === 'success'
              ? 'bg-brand-dark text-white border-pink-500/40'
              : 'bg-red-600 text-white border-red-700'
          }`}
        >
          <span>{toast.type === 'success' ? '✓' : '⚠️'}</span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Cards de Métricas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-pink-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Total Produtos</p>
            <p className="text-2xl sm:text-3xl font-bold text-brand-dark mt-1">{stats.total}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-surface text-brand-primary flex items-center justify-center text-xl font-bold">
            🍩
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-pink-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Disponíveis</p>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-1">{stats.disponiveis}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-pink-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Esgotados</p>
            <p className="text-2xl sm:text-3xl font-bold text-red-500 mt-1">{stats.esgotados}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
            <XCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-pink-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Categorias</p>
            <p className="text-2xl sm:text-3xl font-bold text-brand-gold mt-1">{stats.categorias}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-brand-gold flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Busca por Nome/Slug */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por sabor, nome ou slug..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm text-brand-dark outline-none focus:bg-white focus:border-brand-primary transition-all"
            />
          </div>

          {/* Filtro de Disponibilidade */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-gray-500 hidden sm:inline">Status:</span>
            <div className="flex bg-gray-100 p-1 rounded-2xl text-xs font-semibold w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSelectedStatus('todos')}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl transition-all ${
                  selectedStatus === 'todos' ? 'bg-white shadow text-brand-dark' : 'text-gray-600'
                }`}
              >
                Todos
              </button>
              <button
                type="button"
                onClick={() => setSelectedStatus('disponivel')}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl transition-all ${
                  selectedStatus === 'disponivel'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-gray-600'
                }`}
              >
                Disponíveis
              </button>
              <button
                type="button"
                onClick={() => setSelectedStatus('esgotado')}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl transition-all ${
                  selectedStatus === 'esgotado'
                    ? 'bg-red-500 text-white shadow'
                    : 'text-gray-600'
                }`}
              >
                Esgotados
              </button>
            </div>
          </div>

        </div>

        {/* Pílulas de Categoria */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Categoria:</span>
          </span>
          {['Todos', 'Halloween', 'Exclusivos', 'Combos', 'Bebidas'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'bg-brand-surface text-gray-700 hover:bg-pink-100/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tabela / Grid de Produtos */}
      <div className="bg-white rounded-3xl shadow-editorial border border-pink-100 overflow-hidden">
        <div className="p-6 border-b border-pink-50 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-brand-dark">
              Catálogo de Produtos Cadastrados
            </h2>
            <p className="text-xs text-gray-500">
              Gerencie a visibilidade em tempo real. Itens marcados como esgotados não poderão ser adicionados pelos clientes.
            </p>
          </div>
          <span className="text-xs font-bold text-gray-400">
            {filteredProducts.length} de {productsList.length} itens
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-surface/70 text-[11px] uppercase tracking-wider text-gray-500 font-bold border-b border-pink-100">
                  <th className="py-4 px-6">Produto</th>
                  <th className="py-4 px-6">Categoria</th>
                  <th className="py-4 px-6">Preço</th>
                  <th className="py-4 px-6">Destaque</th>
                  <th className="py-4 px-6 text-center">Status / Disponibilidade</th>
                  <th className="py-4 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredProducts.map((product) => {
                  const isAvailable = product.disponivel !== false;
                  const isLoading = actionLoadingId === product.id;

                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-pink-50/30 transition-colors group"
                    >
                      {/* Foto e Nome */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-pink-50 shrink-0 border border-pink-100">
                            <Image
                              src={product.img}
                              alt={product.nome}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
                              {product.nome}
                            </p>
                            <p className="text-xs text-gray-400 font-mono">
                              /{product.slug || product.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Categoria */}
                      <td className="py-4 px-6">
                        <span className="inline-block bg-brand-surface text-brand-dark border border-pink-100 text-xs font-semibold px-3 py-1 rounded-full">
                          {product.categoria}
                        </span>
                      </td>

                      {/* Preço */}
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-bold text-brand-dark">
                            {formatCurrency(product.precoPromocional ?? product.preco)}
                          </p>
                          {product.precoPromocional && (
                            <span className="text-[11px] text-gray-400 line-through">
                              {formatCurrency(product.preco)}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Destaque */}
                      <td className="py-4 px-6">
                        {product.destaque ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                            <Sparkles className="w-3 h-3 text-amber-600" />
                            <span>Destaque</span>
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>

                      {/* Alternância de Status (Disponível vs Esgotado) */}
                      <td className="py-4 px-6 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(product)}
                          disabled={isLoading}
                          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                            isAvailable
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          } disabled:opacity-50`}
                          title="Clique para alternar o status do produto"
                        >
                          {isLoading ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : isAvailable ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-red-600" />
                          )}
                          <span>{isAvailable ? 'Disponível' : 'Esgotado'}</span>
                        </button>
                      </td>

                      {/* Ações */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setProductToDelete(product)}
                            className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Excluir produto"
                            aria-label={`Excluir ${product.nome}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-brand-surface rounded-full flex items-center justify-center mx-auto text-3xl">
              🔍
            </div>
            <h3 className="font-serif text-lg font-bold text-brand-dark">
              Nenhum produto encontrado
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Não encontramos produtos para os filtros selecionados. Tente alterar a busca ou cadastre um novo item.
            </p>
            <Link
              href="/admin/produtos/novo"
              className="inline-flex items-center gap-2 bg-brand-primary text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#d01754]"
            >
              <Plus className="w-4 h-4" />
              <span>Cadastrar Novo Produto</span>
            </Link>
          </div>
        )}
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm"
            onClick={() => !isDeleting && setProductToDelete(null)}
          />
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full z-10 space-y-5 border border-pink-100 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto text-xl">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-serif text-xl font-bold text-brand-dark">
                Excluir Produto?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Você tem certeza que deseja remover o produto{' '}
                <strong className="text-brand-dark">&quot;{productToDelete.nome}&quot;</strong> do catálogo? Esta ação não pode ser desfeita.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                disabled={isDeleting}
                className="w-1/2 py-2.5 rounded-full border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="w-1/2 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Excluindo...</span>
                  </>
                ) : (
                  <span>Sim, Excluir</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
