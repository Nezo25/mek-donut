'use client';

import React from 'react';
import { Bike, Store, Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { DeliveryMode } from '@/types';
import { deliveryNeighborhoods } from '@/data/deliveryNeighborhoods';
import { formatCurrency } from '@/utils/formatters';

interface DeliverySelectorProps {
  modoEntrega: DeliveryMode;
  onSelectModo: (modo: DeliveryMode) => void;
  bairroId: string;
  onSelectBairro: (bairroId: string) => void;
  isEncomenda: boolean;
  onToggleEncomenda: (isEncomenda: boolean) => void;
  dataEncomenda: string;
  onChangeData: (data: string) => void;
  horaEncomenda: string;
  onChangeHora: (hora: string) => void;
  bairroError?: string;
  dataError?: string;
  horaError?: string;
}

export const DeliverySelector: React.FC<DeliverySelectorProps> = ({
  modoEntrega,
  onSelectModo,
  bairroId,
  onSelectBairro,
  isEncomenda,
  onToggleEncomenda,
  dataEncomenda,
  onChangeData,
  horaEncomenda,
  onChangeHora,
  bairroError,
  dataError,
  horaError,
}) => {
  return (
    <div className="space-y-6">
      {/* Etapa 2: Modalidade de Entrega */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm space-y-5">
        <div className="flex items-center gap-2.5 border-b border-pink-50 pb-4">
          <span className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm flex items-center justify-center">
            2
          </span>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark">
              Como deseja receber?
            </h2>
            <p className="text-xs text-gray-500">
              Escolha entre receber no conforto da sua casa ou retirar em nossa loja física.
            </p>
          </div>
        </div>

        {/* Botões de Alternância */}
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-brand-surface rounded-2xl border border-pink-100/60">
          <button
            type="button"
            onClick={() => onSelectModo('delivery')}
            className={`py-3.5 px-4 rounded-xl font-bold text-sm flex flex-col sm:flex-row items-center justify-center gap-2 transition-all ${
              modoEntrega === 'delivery'
                ? 'bg-brand-primary text-white shadow-md'
                : 'text-gray-600 hover:text-brand-dark hover:bg-white/60'
            }`}
          >
            <Bike className="w-5 h-5" />
            <span>Delivery (Entrega)</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectModo('retirada')}
            className={`py-3.5 px-4 rounded-xl font-bold text-sm flex flex-col sm:flex-row items-center justify-center gap-2 transition-all ${
              modoEntrega === 'retirada'
                ? 'bg-brand-primary text-white shadow-md'
                : 'text-gray-600 hover:text-brand-dark hover:bg-white/60'
            }`}
          >
            <Store className="w-5 h-5" />
            <span>Retirar na Loja (R$ 0)</span>
          </button>
        </div>

        {/* Dropdown de Bairros para Delivery */}
        {modoEntrega === 'delivery' ? (
          <div className="space-y-2 animate-in fade-in duration-300">
            <label
              htmlFor="select-bairro"
              className="block text-xs font-bold uppercase tracking-wider text-gray-700"
            >
              Região / Bairro de Bragança Paulista <span className="text-brand-primary">*</span>
            </label>
            <div className="relative">
              <select
                id="select-bairro"
                value={bairroId}
                onChange={(e) => onSelectBairro(e.target.value)}
                className={`w-full p-3.5 bg-white border rounded-2xl text-sm text-brand-dark font-medium appearance-none outline-none transition-all ${
                  bairroError
                    ? 'border-red-400 focus:border-red-500 ring-2 ring-red-100'
                    : 'border-gray-200 focus:border-brand-primary ring-2 ring-transparent focus:ring-brand-primary/10'
                }`}
              >
                <option value="">Selecione seu bairro para calcular a taxa...</option>
                {deliveryNeighborhoods.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label} — Taxa: {formatCurrency(b.taxa)}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                ▼
              </div>
            </div>
            {bairroError && (
              <p className="text-xs text-red-500 font-medium">{bairroError}</p>
            )}
            <p className="text-xs text-gray-500 flex items-center gap-1.5 pt-1">
              <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0" />
              <span>Entregamos em toda a área urbana de Bragança Paulista com embalagens especiais.</span>
            </p>
          </div>
        ) : (
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4 text-xs sm:text-sm text-emerald-900 space-y-1 animate-in fade-in duration-300">
            <p className="font-bold flex items-center gap-1.5 text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-brand-accent" />
              Taxa de Entrega Grátis (R$ 0,00)
            </p>
            <p className="text-emerald-700">
              📍 <strong>Ponto de Retirada:</strong> Rua Conselheiro Rodrigues Alves, 42 - Centro, Bragança Paulista/SP (próximo à churrascaria Coração Gaúcho).
            </p>
            <p className="text-emerald-600 text-xs">
              Horário de funcionamento: Terça a Domingo, das 13:00 às 20:00.
            </p>
          </div>
        )}
      </div>

      {/* Etapa 3: Tipo de Pedido (Hoje vs Encomenda Agendada) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm space-y-5">
        <div className="flex items-center gap-2.5 border-b border-pink-50 pb-4">
          <span className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm flex items-center justify-center">
            3
          </span>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark">
              Quando deseja receber?
            </h2>
            <p className="text-xs text-gray-500">
              Precisa de entrega imediata ou quer agendar para uma comemoração?
            </p>
          </div>
        </div>

        {/* Escolha: Para Hoje ou Agendar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            onClick={() => onToggleEncomenda(false)}
            className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${
              !isEncomenda
                ? 'border-brand-primary bg-brand-surface/70 shadow-sm'
                : 'border-gray-200 bg-white hover:border-pink-200'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                !isEncomenda ? 'border-brand-primary bg-brand-primary' : 'border-gray-300'
              }`}
            >
              {!isEncomenda && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <div>
              <p className="font-bold text-sm text-brand-dark flex items-center gap-1.5">
                <span>⚡</span> Pedido Imediato
              </p>
              <p className="text-xs text-gray-500">
                Produzido e despachado hoje durante o horário de funcionamento.
              </p>
            </div>
          </div>

          <div
            onClick={() => onToggleEncomenda(true)}
            className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${
              isEncomenda
                ? 'border-brand-primary bg-brand-surface/70 shadow-sm'
                : 'border-gray-200 bg-white hover:border-pink-200'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                isEncomenda ? 'border-brand-primary bg-brand-primary' : 'border-gray-300'
              }`}
            >
              {isEncomenda && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <div>
              <p className="font-bold text-sm text-brand-dark flex items-center gap-1.5">
                <span>📅</span> Encomenda Agendada
              </p>
              <p className="text-xs text-gray-500">
                Escolha a data e o horário ideal para festas e aniversários.
              </p>
            </div>
          </div>
        </div>

        {/* Campos de Data e Hora se Encomenda for ativada */}
        {isEncomenda && (
          <div className="bg-brand-surface p-5 rounded-2xl border border-pink-100 space-y-4 animate-in fade-in duration-300">
            <p className="text-xs uppercase font-bold tracking-wider text-brand-primary flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Dados do Agendamento</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Data da Entrega / Retirada <span className="text-brand-primary">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={dataEncomenda}
                    onChange={(e) => onChangeData(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full p-2.5 bg-white border rounded-xl text-sm text-brand-dark outline-none transition-all ${
                      dataError
                        ? 'border-red-400 focus:border-red-500 ring-2 ring-red-100'
                        : 'border-gray-200 focus:border-brand-primary'
                    }`}
                  />
                </div>
                {dataError && <p className="text-xs text-red-500 mt-1">{dataError}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Horário Desejado <span className="text-brand-primary">*</span>
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={horaEncomenda}
                    onChange={(e) => onChangeHora(e.target.value)}
                    min="13:00"
                    max="20:00"
                    className={`w-full p-2.5 bg-white border rounded-xl text-sm text-brand-dark outline-none transition-all ${
                      horaError
                        ? 'border-red-400 focus:border-red-500 ring-2 ring-red-100'
                        : 'border-gray-200 focus:border-brand-primary'
                    }`}
                  />
                </div>
                {horaError && <p className="text-xs text-red-500 mt-1">{horaError}</p>}
                <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-brand-gold" />
                  <span>Horário da loja: 13:00 às 20:00</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
