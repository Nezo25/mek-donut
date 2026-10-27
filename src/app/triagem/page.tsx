'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, AlertCircle, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useHydratedCart } from '@/hooks/useHydratedCart';
import { deliveryNeighborhoods } from '@/data/deliveryNeighborhoods';
import { OrderSummary } from '@/components/triagem/OrderSummary';
import { DeliverySelector } from '@/components/triagem/DeliverySelector';
import { CustomerForm } from '@/components/triagem/CustomerForm';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { OrderForm } from '@/types';
import { salvarPedidoSupabase } from '@/lib/supabase/orders';

export default function TriagemPage() {
  const {
    items,
    modoEntrega,
    bairroId,
    endereco,
    isEncomenda,
    dataEncomenda,
    horaEncomenda,
    nomeCliente,
    telCliente,
    observacoes,
    updateQuantity,
    removeItem,
    setModoEntrega,
    setBairroId,
    setEndereco,
    setIsEncomenda,
    setDataEncomenda,
    setHoraEncomenda,
    setNomeCliente,
    setTelCliente,
    setObservacoes,
  } = useCartStore();

  const { isMounted, totalItems, subtotal, taxa, total } = useHydratedCart();

  // Estados de Validação
  const [nomeError, setNomeError] = useState<string | undefined>();
  const [telError, setTelError] = useState<string | undefined>();
  const [bairroError, setBairroError] = useState<string | undefined>();
  const [enderecoError, setEnderecoError] = useState<string | undefined>();
  const [dataError, setDataError] = useState<string | undefined>();
  const [horaError, setHoraError] = useState<string | undefined>();
  const [modalAviso, setModalAviso] = useState<{ titulo: string; mensagem: string } | null>(null);

  const bairroSelecionado = deliveryNeighborhoods.find((b) => b.id === bairroId);

  const validarFormulario = (): boolean => {
    let isValid = true;

    // 1. Validação de Sacola Vazia
    if (items.length === 0) {
      setModalAviso({
        titulo: 'Sua Sacola está Vazia',
        mensagem: 'Por favor, adicione pelo menos um produto do cardápio antes de enviar o pedido.',
      });
      return false;
    }

    // 2. Validação de Bairro e Endereço para Delivery
    if (modoEntrega === 'delivery') {
      if (!bairroId) {
        setBairroError('Selecione uma região de entrega para calcular a taxa.');
        isValid = false;
      } else {
        setBairroError(undefined);
      }

      if (!endereco || endereco.trim().length < 5) {
        setEnderecoError('Informe a rua e número para entrega.');
        isValid = false;
      } else {
        setEnderecoError(undefined);
      }
    } else {
      setBairroError(undefined);
      setEnderecoError(undefined);
    }

    // 3. Validação de Encomenda Agendada
    if (isEncomenda) {
      if (!dataEncomenda) {
        setDataError('Informe a data desejada para a encomenda.');
        isValid = false;
      } else {
        setDataError(undefined);
      }

      if (!horaEncomenda) {
        setHoraError('Informe o horário desejado para a encomenda.');
        isValid = false;
      } else {
        setHoraError(undefined);
      }
    } else {
      setDataError(undefined);
      setHoraError(undefined);
    }

    // 4. Validação do Nome do Cliente (mínimo 2 palavras / 5 caracteres)
    const partesNome = nomeCliente.trim().split(/\s+/).filter((p) => p.length >= 2);
    if (partesNome.length < 2 && nomeCliente.trim().length < 5) {
      setNomeError('Informe seu nome completo (ao menos duas palavras ou 5 caracteres).');
      isValid = false;
    } else {
      setNomeError(undefined);
    }

    // 5. Validação do Telefone (ao menos 10 dígitos)
    const telDigits = telCliente.replace(/\D/g, '');
    if (telDigits.length < 10) {
      setTelError('Digite um número de WhatsApp válido com DDD (ex: 11 99999-9999).');
      isValid = false;
    } else {
      setTelError(undefined);
    }

    return isValid;
  };

  const handleFinalizarPedido = () => {
    if (!validarFormulario()) {
      setModalAviso({
        titulo: 'Campos Pendentes',
        mensagem: 'Por favor, verifique os campos destacados em vermelho antes de prosseguir.',
      });
      return;
    }

    const orderFormData: OrderForm = {
      nomeCliente,
      telCliente,
      modoEntrega,
      bairroId,
      endereco,
      isEncomenda,
      dataEncomenda,
      horaEncomenda,
      observacoes,
    };

    const url = buildWhatsAppUrl(
      items,
      orderFormData,
      taxa,
      bairroSelecionado ? bairroSelecionado.label : undefined
    );

    // Salva o pedido no banco do Supabase em background (sem bloquear o cliente)
    salvarPedidoSupabase({
      items,
      form: orderFormData,
      taxa,
      subtotal,
      total,
      bairroNome: bairroSelecionado ? bairroSelecionado.label : undefined,
    }).catch((err) => console.error('Falha ao registrar no Supabase:', err));

    // Abre o WhatsApp com a mensagem formatada
    window.open(url, '_blank');
  };

  if (!isMounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Carregando triagem do seu pedido...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-10">
      
      {/* Top Header / Voltar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-b border-pink-100 pb-6">
        <div>
          <Link
            href="/cardapio"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-brand-primary transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Cardápio</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
            Triagem & Conferência do <span className="italic text-brand-primary">Pedido</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Confira seus itens, configure entrega ou agendamento e receba o atendimento personalizado no WhatsApp.
          </p>
        </div>

        <div className="bg-brand-surface border border-pink-100 px-4 py-2.5 rounded-2xl flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-sm">
            {totalItems}
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Total na Sacola</p>
            <p className="text-xs sm:text-sm font-bold text-brand-dark">
              {totalItems} {totalItems === 1 ? 'item' : 'itens'} selecionados
            </p>
          </div>
        </div>
      </div>

      {/* Grid de Triagem: 2 Colunas no Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Coluna da Esquerda: Resumo dos Itens (Etapa 1) */}
        <div className="lg:col-span-5 space-y-6">
          <OrderSummary
            items={items}
            subtotal={subtotal}
            taxa={taxa}
            total={total}
            isRetirada={modoEntrega === 'retirada'}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
          />

          {/* Dica de Segurança e Agilidade */}
          <div className="bg-brand-surface p-5 rounded-3xl border border-pink-100 text-xs text-gray-600 space-y-2">
            <p className="font-bold text-brand-dark flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span>Como funciona o fechamento?</span>
            </p>
            <p className="leading-relaxed">
              Ao clicar no botão verde, você será direcionado para o WhatsApp oficial da Mek Donuts com o resumo exato deste pedido preenchido. Lá, Mayra e Kiko conferem o estoque em tempo real e enviam a chave PIX para validação imediata!
            </p>
          </div>
        </div>

        {/* Coluna da Direita: Entrega, Agendamento e Dados (Etapas 2, 3, 4 e 5) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Etapas 2 e 3: Modo de Entrega & Agendamento */}
          <DeliverySelector
            modoEntrega={modoEntrega}
            onSelectModo={setModoEntrega}
            bairroId={bairroId}
            onSelectBairro={setBairroId}
            isEncomenda={isEncomenda}
            onToggleEncomenda={setIsEncomenda}
            dataEncomenda={dataEncomenda}
            onChangeData={setDataEncomenda}
            horaEncomenda={horaEncomenda}
            onChangeHora={setHoraEncomenda}
            bairroError={bairroError}
            dataError={dataError}
            horaError={horaError}
          />

          {/* Etapas 4 e 5: Identificação & Envio */}
          <CustomerForm
            nomeCliente={nomeCliente}
            onChangeNome={setNomeCliente}
            telCliente={telCliente}
            onChangeTel={setTelCliente}
            endereco={endereco}
            onChangeEndereco={setEndereco}
            observacoes={observacoes}
            onChangeObservacoes={setObservacoes}
            onSubmit={handleFinalizarPedido}
            nomeError={nomeError}
            telError={telError}
            enderecoError={enderecoError}
            subtotal={subtotal}
            taxa={taxa}
            total={total}
            isRetirada={modoEntrega === 'retirada'}
            bairroNome={bairroSelecionado?.label}
            disabledSubmit={items.length === 0}
          />

        </div>
      </div>

      {/* Modal / Popup de Aviso de Validação */}
      {modalAviso && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm"
            onClick={() => setModalAviso(null)}
          />
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full z-10 text-center relative border border-pink-100 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 bg-brand-surface text-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-sm">
              🍩
            </div>
            <h4 className="font-serif text-2xl font-bold text-brand-dark mb-2">
              {modalAviso.titulo}
            </h4>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              {modalAviso.mensagem}
            </p>
            <button
              onClick={() => setModalAviso(null)}
              className="w-full bg-brand-primary text-white font-bold py-3 rounded-full shadow-md hover:bg-[#d01754] transition-all"
            >
              Entendi, vou conferir
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
