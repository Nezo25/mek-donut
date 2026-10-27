'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  UploadCloud,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Tag,
  DollarSign,
  FileText,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';
import { createProductAction } from '@/app/admin/produtos/actions';
import { slugify } from '@/utils/slugify';

export default function NovoProdutoPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [nome, setNome] = useState('');
  const [slug, setSlug] = useState('');
  const [manualSlug, setManualSlug] = useState(false);
  const [categoria, setCategoria] = useState('Exclusivos');
  const [preco, setPreco] = useState('');
  const [precoPromocional, setPrecoPromocional] = useState('');
  const [descricao, setDescricao] = useState('');
  const [destaque, setDestaque] = useState(false);
  const [disponivel, setDisponivel] = useState(true);
  const [ordem, setOrdem] = useState('0');

  // Imagem
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  // Status
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Auto-geração do slug enquanto digita o nome
  const handleNomeChange = (val: string) => {
    setNome(val);
    if (!manualSlug) {
      setSlug(slugify(val));
    }
  };

  const handleSlugChange = (val: string) => {
    setSlug(slugify(val));
    setManualSlug(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!nome.trim()) {
      setErrorMessage('Informe o nome do produto.');
      return;
    }

    if (!preco || parseFloat(preco.replace(',', '.')) <= 0) {
      setErrorMessage('Informe um preço válido maior que zero.');
      return;
    }

    if (!descricao.trim()) {
      setErrorMessage('Informe a descrição do produto.');
      return;
    }

    if (!imageFile && !imageUrl.trim()) {
      setErrorMessage('Selecione uma foto para upload ou informe uma URL de imagem.');
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome.trim());
    formData.append('slug', slug.trim() || slugify(nome));
    formData.append('categoria', categoria);
    formData.append('preco', preco.replace(',', '.'));
    if (precoPromocional.trim()) {
      formData.append('preco_promocional', precoPromocional.replace(',', '.'));
    }
    formData.append('descricao', descricao.trim());
    formData.append('destaque', destaque ? 'true' : 'false');
    formData.append('disponivel', disponivel ? 'true' : 'false');
    formData.append('ordem', ordem || '0');

    if (imageFile) {
      formData.append('imagem_arquivo', imageFile);
    }
    if (imageUrl.trim()) {
      formData.append('imagem_url', imageUrl.trim());
    }

    startTransition(async () => {
      const res = await createProductAction(formData);
      if (res.success) {
        setSuccessMessage('Produto cadastrado com sucesso!');
        setTimeout(() => {
          router.push('/admin/produtos');
          router.refresh();
        }, 1200);
      } else {
        setErrorMessage(res.error || 'Erro ao salvar o produto no catálogo.');
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-b border-pink-100 pb-6">
        <div>
          <Link
            href="/admin/produtos"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-brand-primary transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para Lista de Produtos</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
            Cadastrar Novo <span className="italic text-brand-primary">Produto</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Preencha os detalhes da delícia artesanal e envie a foto diretamente para o bucket do Supabase.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-brand-surface border border-pink-100 px-3.5 py-1.5 rounded-full text-brand-primary self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Upload Direto Supabase</span>
        </span>
      </div>

      {/* Alertas */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>{errorMessage}</div>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>{successMessage} Redirecionando para o painel...</div>
        </div>
      )}

      {/* Formulário Principal */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 shadow-editorial border border-pink-100 space-y-8">
        
        {/* Seção 1: Informações Básicas */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 border-b border-pink-50 pb-3">
            <span className="w-7 h-7 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs flex items-center justify-center">
              1
            </span>
            <h2 className="font-serif text-lg font-bold text-brand-dark">
              Identificação & Categoria
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Nome do Produto <span className="text-brand-primary">*</span>
              </label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => handleNomeChange(e.target.value)}
                placeholder="Ex: Donut Red Velvet Nobre"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-brand-dark outline-none focus:bg-white focus:border-brand-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Slug (URL amigável) <span className="text-brand-primary">*</span>
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="donut-red-velvet-nobre"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-mono text-brand-dark outline-none focus:bg-white focus:border-brand-primary transition-all"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Gerado automaticamente a partir do nome.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-brand-primary" />
                <span>Categoria</span> <span className="text-brand-primary">*</span>
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-brand-dark outline-none focus:bg-white focus:border-brand-primary transition-all font-medium"
              >
                <option value="Halloween">Halloween (Edição Especial)</option>
                <option value="Exclusivos">Exclusivos (Sabores da Casa)</option>
                <option value="Combos">Combos (Caixas & Kits)</option>
                <option value="Bebidas">Bebidas (Cafés & Sucos)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Ordem de Exibição no Cardápio
              </label>
              <input
                type="number"
                min="0"
                value={ordem}
                onChange={(e) => setOrdem(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-brand-dark outline-none focus:bg-white focus:border-brand-primary transition-all"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Menor número aparece primeiro (ex: 1, 2, 3).
              </p>
            </div>
          </div>
        </div>

        {/* Seção 2: Preços */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 border-b border-pink-50 pb-3">
            <span className="w-7 h-7 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs flex items-center justify-center">
              2
            </span>
            <h2 className="font-serif text-lg font-bold text-brand-dark">
              Precificação
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-brand-primary" />
                <span>Preço Padrão (R$)</span> <span className="text-brand-primary">*</span>
              </label>
              <input
                type="text"
                required
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                placeholder="Ex: 24,00"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-brand-dark outline-none focus:bg-white focus:border-brand-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-brand-gold" />
                <span>Preço Promocional (R$, Opcional)</span>
              </label>
              <input
                type="text"
                value={precoPromocional}
                onChange={(e) => setPrecoPromocional(e.target.value)}
                placeholder="Ex: 21,50 (deixe vazio se não houver)"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-brand-dark outline-none focus:bg-white focus:border-brand-primary transition-all"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Se preenchido, o preço padrão aparecerá riscado com tag de Oferta.
              </p>
            </div>
          </div>
        </div>

        {/* Seção 3: Descrição */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 border-b border-pink-50 pb-3">
            <span className="w-7 h-7 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs flex items-center justify-center">
              3
            </span>
            <h2 className="font-serif text-lg font-bold text-brand-dark">
              Descrição & Ingredientes
            </h2>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-brand-primary" />
              <span>Descrição Completa</span> <span className="text-brand-primary">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva a massa enxuta, recheio farto, cobertura e textura (ex: Massa artesanal leve sem amido, recheio aveludado de Nutella pura, banhado em chocolate branco belga...)"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-brand-dark outline-none focus:bg-white focus:border-brand-primary transition-all resize-none"
            />
          </div>
        </div>

        {/* Seção 4: Foto do Produto (Bucket Supabase) */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 border-b border-pink-50 pb-3">
            <span className="w-7 h-7 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs flex items-center justify-center">
              4
            </span>
            <h2 className="font-serif text-lg font-bold text-brand-dark">
              Foto do Produto (Bucket Supabase Storage)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            
            {/* Upload de Arquivo */}
            <div className="border-2 border-dashed border-pink-200 rounded-3xl p-6 text-center hover:border-brand-primary transition-colors bg-brand-surface/40 group relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <UploadCloud className="w-10 h-10 text-brand-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-bold text-brand-dark mb-1">
                Clique para enviar a foto
              </p>
              <p className="text-xs text-gray-500 mb-3">
                PNG, JPG ou WEBP (armazenado no bucket <code className="font-mono bg-pink-100/70 px-1 py-0.5 rounded">produtos</code>)
              </p>
              {imageFile && (
                <div className="inline-block bg-white px-3 py-1 rounded-full text-xs font-bold text-brand-primary border border-pink-200 shadow-sm">
                  Arquivo: {imageFile.name}
                </div>
              )}
            </div>

            {/* Preview da Foto ou Fallback URL */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-brand-primary" />
                <span>Ou informe uma URL direta de imagem</span>
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  if (!imageFile) setImagePreview(e.target.value);
                }}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-brand-dark outline-none focus:bg-white focus:border-brand-primary transition-all"
              />

              {/* Box de Preview */}
              <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-pink-50 border border-pink-100 flex items-center justify-center">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Pré-visualização do produto"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-400 text-xs">
                    <p>Nenhuma imagem selecionada</p>
                    <p className="text-[10px]">O preview aparecerá aqui</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Seção 5: Flags (Disponibilidade e Destaque) */}
        <div className="space-y-4 pt-2 border-t border-pink-50">
          <div className="flex flex-col sm:flex-row gap-4">
            
            <label className="flex items-center gap-3 p-4 bg-brand-surface rounded-2xl border border-pink-100 cursor-pointer flex-1">
              <input
                type="checkbox"
                checked={disponivel}
                onChange={(e) => setDisponivel(e.target.checked)}
                className="w-5 h-5 rounded-lg text-brand-primary focus:ring-brand-primary accent-brand-primary cursor-pointer"
              />
              <div>
                <p className="text-xs font-bold text-brand-dark">Disponível para Venda Imediata</p>
                <p className="text-[11px] text-gray-500">Se desmarcado, aparecerá como &quot;Esgotado&quot; no cardápio.</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 bg-brand-surface rounded-2xl border border-pink-100 cursor-pointer flex-1">
              <input
                type="checkbox"
                checked={destaque}
                onChange={(e) => setDestaque(e.target.checked)}
                className="w-5 h-5 rounded-lg text-brand-primary focus:ring-brand-primary accent-brand-primary cursor-pointer"
              />
              <div>
                <p className="text-xs font-bold text-brand-dark">Destacar na Vitrine Principal</p>
                <p className="text-[11px] text-gray-500">Exibirá o selo dourado de produto em destaque.</p>
              </div>
            </label>

          </div>
        </div>

        {/* Botões de Ação */}
        <div className="pt-6 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-end gap-3">
          <Link
            href="/admin/produtos"
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors text-center"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-primary hover:bg-[#d01754] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95"
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Gravando no Supabase...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Salvar Produto no Catálogo</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}
