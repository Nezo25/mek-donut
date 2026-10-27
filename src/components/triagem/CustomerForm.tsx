'use client';

import React from 'react';
import { User, Phone, MessageSquare, Send, ShieldCheck, Heart, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { formatCurrency, formatPhone } from '@/utils/formatters';

interface CustomerFormProps {
  nomeCliente: string;
  onChangeNome: (nome: string) => void;
  telCliente: string;
  onChangeTel: (tel: string) => void;
  endereco?: string;
  onChangeEndereco?: (endereco: string) => void;
  observacoes: string;
  onChangeObservacoes: (obs: string) => void;
  onSubmit: () => void;
  nomeError?: string;
  telError?: string;
  enderecoError?: string;
  subtotal: number;
  taxa: number;
  total: number;
  isRetirada: boolean;
  bairroNome?: string;
  disabledSubmit?: boolean;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  nomeCliente,
  onChangeNome,
  telCliente,
  onChangeTel,
  endereco = '',
  onChangeEndereco,
  observacoes,
  onChangeObservacoes,
  onSubmit,
  nomeError,
  telError,
  enderecoError,
  subtotal,
  taxa,
  total,
  isRetirada,
  bairroNome,
  disabledSubmit = false,
}) => {
  const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    onChangeTel(formatted);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm space-y-6">
      {/* Etapa 4: Identificação */}
      <div className="flex items-center gap-2.5 border-b border-pink-50 pb-4">
        <span className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm flex items-center justify-center">
          4
        </span>
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark">
            Seus Dados de Contato
          </h2>
          <p className="text-xs text-gray-500">
            Usaremos para identificar seu pedido e enviar as atualizações no WhatsApp.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Input
          label="Nome Completo"
          placeholder="Ex: Ana Clara Ferreira"
          value={nomeCliente}
          onChange={(e) => onChangeNome(e.target.value)}
          error={nomeError}
          leftIcon={<User className="w-4 h-4" />}
          required
        />

        <Input
          label="WhatsApp com DDD"
          placeholder="(11) 99999-9999"
          value={telCliente}
          onChange={handleTelChange}
          error={telError}
          maxLength={15}
          leftIcon={<Phone className="w-4 h-4" />}
          helperText="Digite com DDD para receber a confirmação e a chave PIX."
          required
        />

        {!isRetirada && onChangeEndereco && (
          <Input
            label="Endereço de Entrega (Rua, Número e Complemento)"
            placeholder="Ex: Av. Salvador Markowicz, 120, Apto 42"
            value={endereco}
            onChange={(e) => onChangeEndereco(e.target.value)}
            error={enderecoError}
            leftIcon={<MapPin className="w-4 h-4" />}
            helperText={`Bairro selecionado: ${bairroNome || 'A combinar'}`}
            required
          />
        )}

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-brand-primary" />
            <span>Observações ou Bilhete Especial (Opcional)</span>
          </label>
          <textarea
            value={observacoes}
            onChange={(e) => onChangeObservacoes(e.target.value)}
            placeholder="Ex: Por favor, colocar bilhete 'Com carinho, de Mayra para Kiko' ou instruções para o entregador..."
            rows={3}
            className="w-full bg-white text-brand-dark text-sm rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all p-3 outline-none resize-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Etapa 5: Resumo e Disparo do Pedido */}
      <div className="pt-6 border-t border-pink-50 space-y-4">
        <div className="bg-brand-surface p-4 rounded-2xl border border-pink-100/70 text-xs sm:text-sm text-gray-700 space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Modalidade:</span>
            <span className="font-bold text-brand-dark">
              {isRetirada ? 'Retirada na Loja (Rua Conselheiro Rodrigues Alves, 42)' : `Delivery (${bairroNome || 'Bragança Paulista'})`}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Subtotal:</span>
            <span className="font-semibold text-brand-dark">{formatCurrency(subtotal)}</span>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Taxa de Entrega:</span>
            <span className="font-semibold text-brand-dark">
              {isRetirada ? 'R$ 0,00' : formatCurrency(taxa)}
            </span>
          </div>

          <div className="flex justify-between items-center text-base sm:text-lg font-bold text-brand-dark pt-2 border-t border-pink-100">
            <span>Total a Pagar:</span>
            <span className="text-brand-primary text-xl">{formatCurrency(total)}</span>
          </div>
        </div>

        {/* Botão de Envio WhatsApp */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={disabledSubmit}
          className="w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none group"
        >
          <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          <span>Finalizar e Enviar no WhatsApp</span>
        </button>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-[11px] text-gray-400 pt-1 text-center">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
            <span>Atendimento direto pelo número oficial</span>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-brand-primary fill-brand-primary" />
            <span>Chave PIX enviada instantaneamente na conversa</span>
          </span>
        </div>
      </div>
    </div>
  );
};
