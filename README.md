# 🧪 A Rendering Perspective on SPA vs MPA: React vs jQuery

I currently work on frontend development using a jQuery-based framework.  
Due to the nature of my team and our long-running project, we've become very accustomed to this approach and have continued development without any major issues.

However, the modern web frontend landscape has clearly shifted toward SPA (Single Page Application) architecture — with **React** at its core.  
Personally, I also reach for React naturally when working on toy projects or trying out new UI ideas.  
Lately, I've been studying **Next.js**, gradually expanding my understanding of the React ecosystem.

So, in this post, I aim to compare **React as a representative SPA framework** and **jQuery as a representative MPA approach**, specifically from the **perspective of rendering performance**.

---

## 🧩 jQuery: How It Handles UI

jQuery was once the de facto standard for frontend development.  
Its syntax like `$('#element').text('change')` made DOM manipulation incredibly easy.  
Animation, AJAX, and event binding could all be handled in just a few lines of code.

But jQuery’s power stems from **direct manipulation of the DOM** — something that becomes problematic as the UI complexity grows.  
When UI must respond dynamically to **state**, things get messy:  
each affected DOM element must be manually updated, and forgetting just one can lead to inconsistencies and bugs.

In large-scale or real-time interfaces, especially SPAs, jQuery starts to show its limits.  
Because jQuery was originally designed with MPA (Multi Page Application) in mind, it lacks built-in support for:

- client-side routing
- component-based structure
- declarative UI

In practice, this leads to code duplication, state/UI mismatch, and maintainability issues — problems I’ve experienced firsthand.

---

## 🧠 React: A Declarative Approach to UI

React takes a very different approach from jQuery.  
Rather than issuing commands to update the DOM, React uses a **declarative philosophy**:  
> “Here is what the UI should look like for this state.”

React apps are built from **components** that manage their own state (`useState`) and properties (`props`).  
This modularity makes it easier to build scalable and maintainable UIs.

React also utilizes a **Virtual DOM**, a lightweight copy of the real DOM in memory.  
When state changes, React calculates the difference (diffing) and applies only the minimal required changes to the actual DOM — improving performance.

Most importantly, **React abstracts away DOM operations**, letting developers focus on “what” the UI should be, not “how” to update it.

---

## 🚀 The Experiment

To test rendering performance, I built a simple system that receives **real-time coin price data** via WebSocket.  
The UI consists of a table showing the prices of 10 major coins:

> Bitcoin, Ethereum, Ripple, Cardano, Solana, Dogecoin, Tron, Ethereum Classic, Bitcoin Cash, Cosmos

Since real data can be irregular, I used **mock data that simulates price updates at rates between 10 and 1000 updates per second** to ensure consistent test conditions.

---

## 🧪 Experiment Setup

| Category         | SPA (React)                            | MPA (jQuery)                           |
|------------------|----------------------------------------|----------------------------------------|
| UI Structure      | Render N `<Table />` components        | Manually generate N tables via jQuery  |
| Data Source       | WebSocket (10 updates/sec)             | WebSocket (same rate)                  |
| Update Method     | `setState` → Virtual DOM diffing       | Direct `.text()` / `.html()` updates   |
| Layout            | `<div id="root">` with mapped tables   | `$(".table-wrapper")` with raw DOM     |

---

## 🧪 Experiment Results

### 📄 Table Count: 1

| Metric        | React (SPA)       | jQuery (MPA)     |
|---------------|-------------------|------------------|
| LCP           | 0.18s             | 0.07s            |
| CLS           | 0.00              | 0.00             |
| INP           | 40ms              | 32ms             |
| GPU Memory    | 3.9–5.5MB         | 1.2MB            |
| Heap Memory   | 7.5–15.6MB        | 1.5–5.3MB        |
| Rendering     | 96ms              | 124ms            |
| Painting      | 44ms              | 50ms             |
| FPS           | 75fps             | 75fps            |

---

### 📄 Table Count: 20

| Metric        | React (SPA)       | jQuery (MPA)     |
|---------------|-------------------|------------------|
| LCP           | 0.18s             | 0.04s            |
| CLS           | 0.16              | 0.00             |
| INP           | 40ms              | 32ms             |
| GPU Memory    | 5.5–10.6MB        | 3.6–4.8MB        |
| Heap Memory   | 11.7–27.8MB       | 2.2–2.7MB        |
| Rendering     | 191ms             | 742ms            |
| Painting      | 67ms              | 186ms            |
| FPS           | 75fps             | 75fps            |

> \* **LCP (Largest Contentful Paint)** measures how fast the main visible content appears.  
> \* **CLS (Cumulative Layout Shift)** tracks visual layout instability.  
> \* **INP (Interaction to Next Paint)** measures responsiveness to user input.

---

## 🔍 LCP: React is Slower to Paint

React had **higher LCP values** compared to jQuery, because:

- React loads only a minimal `index.html` at first
- All visible content is rendered **after loading and executing JavaScript**

Whereas jQuery-based MPA apps render content **directly from server-generated HTML**, making initial paints much faster.

✅ **Solution?** Use **SSR (Server-Side Rendering)** with frameworks like **Next.js** to reduce React's LCP time.

---

## 💾 Memory Usage: React Uses More

React consumed significantly more:

- **Heap Memory** (due to Virtual DOM, component state, and Fiber)
- **GPU Memory** (due to layered rendering with `transform`, `opacity`, etc.)

These costs come from performance optimization mechanisms, not inefficiency.

In contrast, jQuery manipulates the DOM directly and doesn’t manage state internally — so memory usage remains lower.

---

## ⚡ Rendering & Painting: React is Faster

Despite higher LCP, React was **faster in actual rendering and painting time**:

- More efficient DOM updates using Virtual DOM
- Batch updates via `setState`
- GPU-accelerated styles reduce Reflow
- Component-scoped re-rendering

---

## 🧪 Stress Test: 1000 Updates/sec + 40 Tables

To push both systems to their limits, I:

- Increased simulated price updates to **1000 per second**
- Rendered **40 tables simultaneously**

📉 **Result:**
- **jQuery app stuttered heavily, FPS dropped sharply**
- **React app remained smooth, FPS stable**

> React only began to show visible frame drops when I increased the table count to 80+.

---

## ✅ Conclusion: React Wins in Rendering Performance

This experiment aimed to evaluate **rendering performance only**, not broader topics like state management or maintainability.

The results showed:

- React renders faster and more efficiently under stress
- React remains smooth and stable at high update frequencies
- While React uses more memory, it leverages it for smarter rendering

So, in a **real-time, data-heavy UI**, **React clearly outperforms jQuery** in rendering performance.


---

> **SPA vs MPA: From a rendering perspective, React is the clear winner in demanding environments.**
