# Mek Donuts • Catálogo & Triagem de Pedidos (V1)

Sistema web completo e moderno da doceria artesanal **Mek Donuts** (Bragança Paulista/SP), desenvolvido com **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Zustand (com persistência de sacola)** e Clean Architecture.

---

## 🍩 Arquitetura de Rotas Independentes (Next.js App Router)

A aplicação abandona o modelo de landing page de âncoras (`#`) e adota rotas reais com navegação via `next/link` e preservação global da sacola entre páginas:

| Rota | Descrição |
|---|---|
| [`/`](src/app/page.tsx) | **Home / Institucional**: Hero imersivo ("Um pedacinho da natureza no centro da cidade"), banner de destaques, diferenciais (massa artesanal zero amido, chocolates nobres), prova social 5 estrelas e marquee promocional. |
| [`/cardapio`](src/app/cardapio/page.tsx) | **Catálogo Interativo**: Barra de busca por nome/ingrediente, filtros dinâmicos por categoria ("Todos", "Halloween", "Exclusivos", "Combos", "Bebidas"), modal de detalhes com seletor de quantidade e barra flutuante de sacola. |
| [`/triagem`](src/app/triagem/page.tsx) | **Funil de Checkout & Triagem**: Conferência de itens, seletor Delivery (cálculo de taxa por bairros de Bragança Paulista) vs. Retirada na Loja, agendamento de encomendas (data/hora), validação de cliente e disparo direto no WhatsApp com payload formatado. |
| [`/espaco`](src/app/espaco/page.tsx) | **O Espaço Físico & Experiência**: Mosaico fotográfico das áreas interna climatizada, deck, piscina, área verde com vista panorâmica e recepção de eventos. |
| [`/historia`](src/app/historia/page.tsx) | **Nossa História**: A jornada dos fundadores Mayra e Kiko, a transição da capital para o interior, os 5 anos de delivery com bilhetes manuscritos e a conquista da loja física. |
| [`/localizacao`](src/app/localizacao/page.tsx) | **Onde Estamos & Rotas**: Rua Conselheiro Rodrigues Alves, 42 - Centro, horário de funcionamento, iframe embutido do Google Maps, atalhos de rotas em vídeo e formas de pagamento. |

---

## 🎨 Design System & Identidade Visual

- **Cores Oficiais**:
  - `brand-primary`: `#E91E63` (Rosa emblemático)
  - `brand-accent`: `#10B981` (Verde esmeralda / frescor)
  - `brand-surface`: `#FFF5F8` (Fundo sutil delicado)
  - `brand-secondary`: `#FCF8F9` (Fundo base)
  - `brand-dark`: `#2A2A2A` (Tipografia e contraste nobre)
  - `brand-gold`: `#D4AF37` (Dourado de excelência)
- **Tipografia**:
  - Títulos elegantes: `Playfair Display` (serif)
  - UI e Texto base: `Poppins` (sans)
  - Assinaturas e Logo: `Dancing Script` (cursive)
- **Componentes**: Bordas arredondadas generosas (`rounded-2xl`, `rounded-3xl`), sombras editoriais (`shadow-editorial`) e glassmorphism (`backdrop-blur`).

---

## 🛒 Gerenciamento de Estado & Persistência

- Gerenciado via **Zustand** com o middleware `persist` (`localStorage`), localizado em [`src/store/useCartStore.ts`](src/store/useCartStore.ts).
- O cliente pode navegar livremente pelo site (ex: adicionar um donut em `/cardapio`, ler `/historia` e ir para `/triagem`) sem perder os itens selecionados ou as opções de entrega preenchidas.

---

## 📲 Disparo para o WhatsApp da Mek Donuts (`5511975049091`)

O gerador de mensagens em [`src/utils/whatsapp.ts`](src/utils/whatsapp.ts) monta a mensagem estruturada com formatação Markdown compatível com o WhatsApp:

```text
*NOVO PEDIDO - MEK DONUTS* 🍩

👤 *Cliente:* Mayra Silva
📱 *Telefone:* (11) 97504-9091
⏳ *Tipo de Pedido:* Para Hoje
📦 *Entrega:* Delivery (Bairro: Centro / Jd. Público)

*ITENS DA SACOLA:*
▪ 2x Homertella Especial - R$ 44,00
▪ 1x Combo 3 Sabores Festivos - R$ 78,00

Subtotal: R$ 122,00
Taxa de Entrega: R$ 5,00
*TOTAL: R$ 127,00*

Por favor, me confirme o pedido e envie a chave PIX.
```

---

## 🚀 Como Executar o Projeto

1. Instalar as dependências:
   ```bash
   npm install
   ```

2. Executar em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
   Acesse: `http://localhost:3000`

3. Gerar o build de produção:
   ```bash
   npm run build
   npm run start
   ```
