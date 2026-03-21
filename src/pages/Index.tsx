import { useEffect, useRef, useState, useCallback } from "react";
import {
  Smartphone, EyeOff, DollarSign, BarChart3, ClipboardList, Target,
  Zap, ShieldCheck, Gift, CreditCard, Download, Map, Rocket, TrendingUp,
  Globe, Wallet, GraduationCap, Clock, AlertTriangle, Users, Briefcase,
  Bot, Sparkles, Lock, Check, ChevronRight
} from "lucide-react";

/* ═══════════════════════════════════════════════════
   PRINTS – coloque aqui os nomes dos arquivos de /img
   ═══════════════════════════════════════════════════ */
const PRINTS = [
  "/img/print1.png",
  "/img/print2.png",
  "/img/print3.png",
  "/img/print4.png",
  "/img/print5.png",
  "/img/print6.png",
];

/* ── Scroll reveal hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.08 }
    );
    el.querySelectorAll(".reveal").forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ── Countdown hook ── */
function useCountdown() {
  const [time, setTime] = useState({ h: "04", m: "23", s: "47" });
  useEffect(() => {
    let end: number;
    try { end = parseInt(localStorage.getItem("cd5") || ""); } catch { end = 0; }
    if (!end || isNaN(end)) {
      end = Date.now() + (4 * 3600 + 23 * 60 + 47) * 1000;
      try { localStorage.setItem("cd5", String(end)); } catch {}
    }
    const tick = () => {
      let d = end - Date.now();
      if (d <= 0) { end = Date.now() + 2 * 3600 * 1000; try { localStorage.setItem("cd5", String(end)); } catch {} d = end - Date.now(); }
      const h = Math.floor(d / 3600000);
      const m = Math.floor((d % 3600000) / 60000);
      const s = Math.floor((d % 60000) / 1000);
      setTime({ h: String(h).padStart(2, "0"), m: String(m).padStart(2, "0"), s: String(s).padStart(2, "0") });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/* ── Accordion item ── */
function AccItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`acc-item ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
      <div className="acc-q"><span>{q}</span><div className="acc-btn">+</div></div>
      <div className="acc-body"><div className="acc-inner">{a}</div></div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
      <div className="faq-q"><span>{q}</span><span className="faq-arr">+</span></div>
      <div className="faq-body"><div className="faq-inner">{a}</div></div>
    </div>
  );
}

/* ── Mini progress bar component ── */
function ProgressBar({ label, value, color = "white" }: { label: string; value: number; color?: string }) {
  return (
    <div className="mini-progress">
      <div className="mp-header">
        <span className="mp-label">{label}</span>
        <span className="mp-value">{value}%</span>
      </div>
      <div className="mp-track">
        <div className="mp-fill" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════ */
export default function Index() {
  const wrapperRef = useReveal();
  const cd = useCountdown();

  const addRipple = useCallback((e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const r = document.createElement("span");
    r.className = "ripple";
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.5;
    r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;position:absolute;border-radius:50%;background:rgba(255,255,255,.25);transform:scale(0);animation:ripple-anim .55s linear;pointer-events:none;`;
    btn.appendChild(r);
    r.addEventListener("animationend", () => r.remove());
  }, []);

  return (
    <div ref={wrapperRef}>
      {/* ════ HERO ════ */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-eyebrow eyebrow">Ebook Digital · 2024</div>
          <h1 className="d-xl serif hero-title">
            Pare de<br />
            <span className="dim">SOBREVIVER.</span><br />
            COMECE A<br />lucrar.
          </h1>
          <p className="hero-sub">
            Você acorda todo dia no mesmo ciclo: trabalha, paga conta, repete. <strong>81 métodos reais e testados</strong> para gerar renda na internet — para quem está cansado de chegar no fim do mês no vermelho.
          </p>
          <div className="hero-btns">
            <a href="https://go.tribopay.com.br/w07cffe1vx" className="btn btn-primary" onClick={addRipple}>Quero começar agora</a>
            <a href="#conteudo" className="btn btn-ghost" onClick={addRipple}>Ver o conteúdo</a>
          </div>
          <div className="hero-perks">
            <span className="perk">Acesso imediato</span>
            <span className="perk">Garantia de 7 dias</span>
            <span className="perk">Para iniciantes</span>
          </div>
        </div>

        <div className="book-stage">
          <div className="book-3d">
            <div className="book-spine" />
            <img src="/img/ebook-capa.png" alt="Capa do Ebook 81 Formas" className="book-cover-img" />
            <div className="book-gloss" />
          </div>
          <div className="book-glow" />
        </div>
      </section>

      {/* ════ STATS ════ */}
      <div className="stats-bar">
        <div className="stats-inner">
          <div className="stat-col"><div className="stat-n serif">81</div><div className="stat-l">Métodos</div></div>
          <div className="stat-col"><div className="stat-n serif">2.400+</div><div className="stat-l">Leitores</div></div>
          <div className="stat-col"><div className="stat-n serif">71%</div><div className="stat-l">Resultados em 30 dias</div></div>
          <div className="stat-col"><div className="stat-n serif">4.9★</div><div className="stat-l">Avaliação</div></div>
        </div>
      </div>

      {/* ════ DOR ════ */}
      <section className="sec dor-sec">
        <div className="wrap">
          <div className="dor-grid">
            <div className="reveal">
              <span className="eyebrow">O problema real</span>
              <h2 className="d-lg serif" style={{ marginTop: 16 }}>Você não é<br /><span className="dim">PREGUIÇOSO.</span></h2>
              <p className="section-copy">Você trabalha duro. O problema é que <strong>ninguém te ensinou a ganhar dinheiro de verdade</strong> — só te ensinaram a trocar tempo por salário. E quando o salário acaba antes do mês, a culpa parece ser sua.</p>
              <div className="bubbles-row">
                <div className="bubble red"><span className="bubble-icon"><AlertTriangle size={20} /></span>"Trabalho o dia todo e nunca sobra nada"</div>
                <div className="bubble red"><span className="bubble-icon"><TrendingUp size={20} /></span>"Todo mês é a mesma luta pra pagar as contas"</div>
              </div>
              <div className="pull-q serif">"Se esforço fosse suficiente, pedreiro seria milionário."</div>
            </div>
            <div className="reveal d2">
              <ul className="pain-list">
                <li className="pain-item"><span className="pain-n">01</span><div><div className="pain-t">O salário evapora</div><div className="pain-s">Aluguel, conta, parcela. Antes do dia 20 já acabou. E o ciclo recomeça.</div></div></li>
                <li className="pain-item"><span className="pain-n">02</span><div><div className="pain-t">Falta de perspectiva</div><div className="pain-s">Cada mês igual ao anterior. Sem aumento, sem promoção, sem saída visível.</div></div></li>
                <li className="pain-item"><span className="pain-n">03</span><div><div className="pain-t">Informação demais, resultado zero</div><div className="pain-s">YouTube, Instagram, guru prometendo fortuna. Muita teoria, nenhum passo concreto.</div></div></li>
                <li className="pain-item"><span className="pain-n">04</span><div><div className="pain-t">Medo de arriscar</div><div className="pain-s">Já caiu em golpe ou perdeu dinheiro tentando algo "fácil". Agora tem medo de qualquer oportunidade.</div></div></li>
              </ul>
              {/* ── Visual break: mini chart ── */}
              <div className="visual-break reveal">
                <div className="vb-chart">
                  <div className="vb-bar" style={{ height: "30%" }}><span>Salário</span></div>
                  <div className="vb-bar accent" style={{ height: "85%" }}><span>Despesas</span></div>
                  <div className="vb-bar dim-bar" style={{ height: "8%" }}><span>Sobra</span></div>
                </div>
                <p className="vb-caption">Realidade de 78% dos brasileiros</p>
              </div>
              <div className="pain-copy-block">
                <div className="big-q">E se existissem <span className="red-txt">81 caminhos reais</span> para sair dessa?</div>
                <div className="sub-q">Não promessas vazias. Métodos testados, explicados passo a passo, que pessoas comuns já usam para gerar renda online todos os dias.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ PROMISE ════ */}
      <section className="sec promise-sec" style={{ position: "relative" }}>
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">A solução</span>
            <h2 className="d-lg serif" style={{ marginTop: 16 }}>81 formas reais<br /><span className="dim">DE GANHAR DINHEIRO.</span></h2>
          </div>
          <div className="promise-cols">
            <div className="promise-body reveal d1">
              <p>Este não é mais um ebook motivacional. É um <strong>manual direto com 81 métodos práticos</strong> que qualquer pessoa pode começar — mesmo sem experiência, sem investimento, e sem aparecer.</p>
              <p>Cada método foi <strong>pesquisado, testado e organizado</strong> para que você encontre rapidamente o que funciona para o seu perfil.</p>
              <span className="promise-em serif">"Chega de scroll infinito procurando respostas. Está tudo aqui."</span>
              {/* ── Visual break: progress bars ── */}
              <div className="progress-group reveal" style={{ marginTop: 28 }}>
                <ProgressBar label="Métodos sem investimento" value={62} color="var(--green)" />
                <ProgressBar label="Métodos pelo celular" value={78} color="#4a9eff" />
                <ProgressBar label="Sem aparecer / sem câmera" value={55} color="#c084fc" />
              </div>
            </div>
            <div className="fi-stack reveal d2">
              <div className="fi"><span className="fi-ico"><Smartphone size={18} /></span><div><div className="fi-t">Funciona pelo celular</div><div className="fi-s">A maioria dos métodos precisa só de um smartphone e internet.</div></div></div>
              <div className="fi"><span className="fi-ico"><EyeOff size={18} /></span><div><div className="fi-t">Sem aparecer</div><div className="fi-s">Métodos que não exigem mostrar o rosto, gravar vídeo ou ter seguidores.</div></div></div>
              <div className="fi"><span className="fi-ico"><DollarSign size={18} /></span><div><div className="fi-t">Sem investimento</div><div className="fi-s">Mais da metade dos métodos começam com zero reais.</div></div></div>
              <div className="fi"><span className="fi-ico"><BarChart3 size={18} /></span><div><div className="fi-t">Passo a passo</div><div className="fi-s">Cada método é explicado com clareza, sem termos técnicos.</div></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ BEFORE/AFTER ════ */}
      <section className="sec" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">Transformação</span>
            <h2 className="d-md serif" style={{ marginTop: 16 }}>ANTES vs.<br /><span className="dim">DEPOIS DO EBOOK</span></h2>
          </div>
          <div className="ba-chart reveal d1">
            <div className="ba-col">
              <span className="ba-label">Antes</span>
              {["Sem renda extra", "Perdido em informações", "Medo de começar", "Dependência do salário"].map((t) => (
                <div key={t} className="ba-item"><span className="dot dot-red" />{t}</div>
              ))}
            </div>
            <div className="ba-arrow"><ChevronRight size={28} /></div>
            <div className="ba-col after">
              <span className="ba-label">Depois</span>
              {["81 métodos na mão", "Plano claro de ação", "Confiança para agir", "Renda online crescendo"].map((t) => (
                <div key={t} className="ba-item"><span className="dot dot-green" />{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ BENEFITS ════ */}
      <section className="sec ben-sec">
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">Benefícios</span>
            <h2 className="d-lg serif" style={{ marginTop: 16 }}>Por que este<br /><span className="dim">EBOOK É DIFERENTE.</span></h2>
          </div>
          <div className="ben-grid">
            {[
              { ico: <ClipboardList size={24} />, t: "81 métodos reais", d: "Não é teoria. São formas verificadas de gerar renda na internet, com passo a passo." },
              { ico: <Target size={24} />, t: "Para qualquer perfil", d: "Estudante, CLT, desempregado, aposentado. Há métodos para todos." },
              { ico: <Zap size={24} />, t: "Resultados rápidos", d: "71% dos leitores relatam primeiro resultado em menos de 30 dias." },
              { ico: <ShieldCheck size={24} />, t: "Garantia de 7 dias", d: "Não gostou? Devolvemos 100% do valor sem perguntas." },
              { ico: <Gift size={24} />, t: "3 bônus inclusos", d: "Lista de sites, prompts de IA e guia do zero — tudo grátis." },
              { ico: <CreditCard size={24} />, t: "Preço acessível", d: "Menos do que um almoço. Pagamento único, sem mensalidade." },
            ].map((b) => (
              <div key={b.t} className="ben-card reveal">
                <div className="ben-ico">{b.ico}</div>
                <div className="ben-t serif">{b.t}</div>
                <div className="ben-d">{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ TIMELINE ════ */}
      <section className="sec" style={{ background: "var(--bg2)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">Seu caminho</span>
            <h2 className="d-md serif" style={{ marginTop: 16 }}>DA DECISÃO AO<br /><span className="dim">PRIMEIRO RESULTADO</span></h2>
          </div>
          <div className="timeline reveal d1">
            {[
              { ico: <Download size={14} />, step: "Agora", title: "VOCÊ GARANTE O ACESSO", desc: "Pagamento confirmado. Ebook + 3 bônus na sua caixa de entrada em minutos." },
              { ico: <Map size={14} />, step: "Dia 1", title: "VOCÊ ESCOLHE SEU MÉTODO", desc: "Lê o ebook, identifica os métodos que fazem sentido pro seu perfil." },
              { ico: <Rocket size={14} />, step: "Dia 2 a 7", title: "VOCÊ COMEÇA A AGIR", desc: "Segue o Guia de 7 Dias incluso. Dá os primeiros passos com clareza." },
              { ico: <DollarSign size={14} />, step: "Semana 2 a 4", title: "OS PRIMEIROS RESULTADOS APARECEM", desc: "71% dos leitores relatam o primeiro resultado dentro de 30 dias." },
              { ico: <Globe size={14} />, step: "Mês 2 em diante", title: "VOCÊ CONSTRÓI SUA RENDA", desc: "Escala o que está funcionando. Sua renda online começa a crescer." },
            ].map((t) => (
              <div key={t.step} className="tl-item">
                <div className="tl-dot">{t.ico}</div>
                <div className="tl-step">{t.step}</div>
                <div className="tl-title">{t.title}</div>
                <div className="tl-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ OBJECTIONS ════ */}
      <section className="sec obj-sec">
        <div className="wrap">
          <div className="obj-layout">
            <div className="obj-sticky reveal">
              <span className="eyebrow">Sem desculpas</span>
              <h2 className="d-md serif" style={{ marginTop: 16 }}>Suas dúvidas respondidas.</h2>
              <p className="obj-intro-sub">Entendemos cada hesitação. Respondemos com honestidade.</p>
              <div className="comp-table reveal" style={{ marginTop: 28 }}>
                <div className="ct-head">
                  <div className="ct-hcell">Situação</div>
                  <div className="ct-hcell">Sem o ebook</div>
                  <div className="ct-hcell">Com o ebook</div>
                </div>
                {[
                  { ico: <Wallet size={14} />, sit: "Sem dinheiro", sem: "Parado", com: "50+ métodos grátis" },
                  { ico: <GraduationCap size={14} />, sit: "Sem experiência", sem: "Perdido", com: "Guia do zero" },
                  { ico: <Clock size={14} />, sit: "Pouco tempo", sem: "Adiando", com: "Métodos de 30min/dia" },
                  { ico: <AlertTriangle size={14} />, sit: "Tentou antes", sem: "Com medo", com: "81 opções + garantia" },
                ].map((r) => (
                  <div key={r.sit} className="ct-row">
                    <div className="ct-cell"><span className="ct-ico">{r.ico}</span> {r.sit}</div>
                    <div className="ct-cell"><span className="ci">✗</span> {r.sem}</div>
                    <div className="ct-cell highlight"><span className="ci"><Check size={14} /></span> {r.com}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="acc reveal d1">
              <AccItem q={`"Não tenho dinheiro para investir"`} a="Mais da metade dos 81 métodos não exige nenhum investimento. Você precisa apenas de internet e vontade." />
              <AccItem q={`"Não tenho experiência com internet"`} a="O ebook foi escrito para iniciantes. Cada método é em linguagem simples. Se você usa WhatsApp, já tem o suficiente." />
              <AccItem q={`"Já tentei antes e não funcionou"`} a="O problema provavelmente foi o método errado. Com 81 opções, as chances de não achar um que funcione são praticamente nulas." />
              <AccItem q={`"Não tenho tempo, trabalho o dia todo"`} a="Há métodos para quem tem apenas 30 minutos por dia. Comece nas horas vagas." />
              <AccItem q={`"Parece mais um produto que não entrega"`} a="Por isso temos garantia incondicional de 7 dias. Devolvemos 100% sem perguntas." />
            </div>
          </div>
        </div>
      </section>

      {/* ════ PROOF / PRINTS ════ */}
      <section className="sec proof-sec">
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">Resultados reais</span>
            <h2 className="d-lg serif" style={{ marginTop: 16 }}>Quem já<br /><span className="dim">MUDOU DE VIDA.</span></h2>
          </div>
          <div className="prints-grid reveal d1">
            {PRINTS.map((src, i) => (
              <div key={i} className="print-card">
                <img
                  src={src}
                  alt={`Print de resultado ${i + 1}`}
                  className="print-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ CONTENT ════ */}
      <section className="sec idx-sec" id="conteudo">
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">O que você vai aprender</span>
            <h2 className="d-lg serif" style={{ marginTop: 16 }}>81 métodos.<br /><span className="dim">CADA UM REAL.</span></h2>
          </div>
          <div className="method-map">
            {[
              { ico: <Users size={24} />, cat: "Sem aparecer", title: "Afiliados & Comissão", count: "12 métodos", tags: ["Hotmart", "Kiwify", "Amazon", "+9"] },
              { ico: <Smartphone size={24} />, cat: "Celular apenas", title: "Redes Sociais", count: "9 métodos", tags: ["Instagram", "TikTok", "Pinterest", "+6"] },
              { ico: <Briefcase size={24} />, cat: "Serviços online", title: "Freelance Digital", count: "14 métodos", tags: ["Workana", "Fiverr", "99Freelas", "+11"] },
              { ico: <Bot size={24} />, cat: "Tecnologia", title: "Inteligência Artificial", count: "8 métodos", tags: ["ChatGPT", "Midjourney", "ElevenLabs", "+5"] },
              { ico: <GraduationCap size={24} />, cat: "Conhecimento", title: "Infoprodutos", count: "11 métodos", tags: ["Cursos", "Ebooks", "Templates", "+8"] },
              { ico: <Sparkles size={24} />, cat: "E muito mais", title: "Dropshipping, Design, YouTube…", count: "27 métodos", tags: ["Copywriting", "Print-on-demand", "+20"] },
            ].map((m) => (
              <div key={m.title} className="mm-cluster reveal">
                <div className="mm-count">{m.count}</div>
                <div className="mm-icon">{m.ico}</div>
                <div className="mm-cat">{m.cat}</div>
                <div className="mm-title">{m.title}</div>
                <div className="mm-tags">{m.tags.map((t) => <span key={t} className="mm-tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ BONUS ════ */}
      <section className="sec bonus-sec">
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">Incluído na compra</span>
            <h2 className="d-lg serif" style={{ marginTop: 16 }}>Você ainda<br /><span className="dim">LEVA DE GRAÇA.</span></h2>
          </div>
          <div className="bonus-list reveal d1">
            {[
              { n: "01", t: "Lista de 50 Sites Para Ganhar Dinheiro", d: "Plataformas verificadas onde você pode começar hoje, sem investimento.", old: "R$ 37,00" },
              { n: "02", t: "Pack com 30 Prompts Prontos de IA", d: "Use o ChatGPT para criar conteúdo e vender serviços automaticamente.", old: "R$ 47,00" },
              { n: "03", t: "Guia de Início do Zero em 7 Dias", d: "Plano de ação para quem nunca ganhou um centavo online.", old: "R$ 27,00" },
            ].map((b) => (
              <div key={b.n} className="bonus-row">
                <div className="bonus-n serif">{b.n}</div>
                <div><div className="bonus-t">{b.t}</div><div className="bonus-d">{b.d}</div></div>
                <div className="bonus-price"><div className="bp-old">{b.old}</div><div className="bp-free">Grátis</div></div>
              </div>
            ))}
            <div className="bonus-footer">
              <span className="bf-l">Valor total dos bônus</span>
              <span className="bf-v serif">R$ 111 → Grátis</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════ GUARANTEE ════ */}
      <section className="sec guar-sec">
        <div className="wrap">
          <div className="reveal"><span className="eyebrow">Proteção total</span></div>
          <div className="guar-card reveal d1">
            <div className="guar-seal">
              <div className="seal-ico"><ShieldCheck size={22} /></div>
              <div className="seal-n serif">7</div>
              <div className="seal-l">dias garantia</div>
            </div>
            <div>
              <div className="guar-t">Sem risco. Sem burocracia.</div>
              <p className="guar-b">Se em até 7 dias você não estiver satisfeito por qualquer motivo — <strong>devolvemos 100% do valor.</strong> Sem perguntas, sem formulários. O risco é todo nosso.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════ OFFER ════ */}
      <section className="sec offer-sec" id="oferta" style={{ position: "relative" }}>
        <div className="wrap">
          <div className="offer-layout">
            <div className="reveal">
              <span className="eyebrow">Sua decisão</span>
              <h2 className="d-lg serif" style={{ marginTop: 16 }}>Menos que<br />UM ALMOÇO.<br /><span className="dim">RESULTADO DE VIDA.</span></h2>
              <p className="offer-l-sub">O preço de uma refeição. <strong>Menos do que custa mais um mês parado no mesmo lugar.</strong></p>
              <div className="copy-sting" style={{ marginTop: 24 }}>Ou vai continuar contando trocado, adiando planos, assistindo outros crescerem. A escolha é só sua — e ela começa agora.</div>
            </div>

            <div className="offer-card reveal d1">
              <div className="oc-head">O que você leva hoje</div>
              <div className="oc-body">
                <div className="inc-list">
                  {["Ebook completo — 81 Formas (PDF)", "Bônus 1 — Lista de 50 Sites", "Bônus 2 — 30 Prompts de IA", "Bônus 3 — Guia do Zero em 7 Dias", "Acesso imediato após pagamento", "Garantia de 7 dias sem risco"].map((t) => (
                    <div key={t} className="inc-row"><span className="inc-chk"><Check size={14} /></span><span>{t}</span></div>
                  ))}
                </div>
                <div className="cd-box">
                  <span className="cd-lbl">Oferta expira em</span>
                  <div className="cd-row">
                    <div className="cd-blk"><span className="cd-n serif">{cd.h}</span><span className="cd-u">horas</span></div>
                    <span className="cd-sep">:</span>
                    <div className="cd-blk"><span className="cd-n serif">{cd.m}</span><span className="cd-u">min</span></div>
                    <span className="cd-sep">:</span>
                    <div className="cd-blk"><span className="cd-n serif">{cd.s}</span><span className="cd-u">seg</span></div>
                  </div>
                </div>
                <div className="sc-row"><div className="sc-dot" />Apenas 47 vagas restantes neste preço</div>
                <div className="price-area">
                  <div className="price-was">De R$ 97,00</div>
                  <div className="price-now serif"><sup>R$</sup>39<span style={{ fontSize: 28 }}>,90</span></div>
                  <div className="price-note">Pagamento único · Acesso imediato · Sem mensalidade</div>
                </div>
                <a href="https://go.tribopay.com.br/w07cffe1vx" className="offer-btn" onClick={addRipple}>Garantir meu acesso agora →</a>
                <div className="offer-note">
                  <span><Lock size={12} style={{ display: "inline", verticalAlign: "-2px" }} /> Seguro</span>
                  <span><Check size={12} style={{ display: "inline", verticalAlign: "-2px" }} /> PIX, cartão ou boleto</span>
                  <span><ShieldCheck size={12} style={{ display: "inline", verticalAlign: "-2px" }} /> 7 dias garantia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ FAQ ════ */}
      <section className="sec faq-sec">
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">Dúvidas frequentes</span>
            <h2 className="d-lg serif" style={{ marginTop: 16 }}>Perguntas<br /><span className="dim">COMUNS.</span></h2>
          </div>
          <div className="faq-cols reveal d1">
            <div>
              <FaqItem q="Como recebo o ebook após a compra?" a="Imediatamente após a confirmação, você recebe e-mail com link de download. PIX: segundos. Cartão: até 2 minutos." />
              <FaqItem q="Preciso investir dinheiro nos métodos?" a="Não. A maioria não exige investimento. Onde há opções pagas, sempre mostramos a versão gratuita primeiro." />
            </div>
            <div>
              <FaqItem q="Funciona para quem nunca vendeu nada?" a="Sim. Feito para iniciantes. Há um guia de 7 dias específico para quem está começando do zero." />
              <FaqItem q="Como funciona a garantia de 7 dias?" a="Não ficou satisfeito? Uma mensagem e devolvemos 100% do valor. Sem perguntas, sem burocracia." />
            </div>
          </div>
        </div>
      </section>

      {/* ════ FINAL CTA ════ */}
      <section className="final-sec" style={{ position: "relative" }}>
        <div className="wrap-sm reveal" style={{ textAlign: "center" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Última chance</span>
          <h2 className="d-lg serif" style={{ marginTop: 16 }}>Daqui a um ano,<br /><span className="dim">O QUE TERÁ MUDADO?</span></h2>
          <div className="copy-punch" style={{ maxWidth: 560, margin: "24px auto", fontSize: "clamp(16px,2vw,22px)" }}>
            Daqui a 5 anos, você vai estar no mesmo lugar — ou em um lugar completamente diferente. A diferença é uma decisão de R$39,90 hoje.
          </div>
          <p className="final-sub">Não existe momento perfeito. Existe o momento em que você decide que chega. Esse momento é agora.</p>
          <div className="final-btns">
             <a href="https://go.tribopay.com.br/w07cffe1vx" className="btn btn-primary" onClick={addRipple}>Garantir meu acesso agora</a>
            <a href="#conteudo" className="btn btn-ghost" onClick={addRipple}>Ver o conteúdo primeiro</a>
          </div>
          <div className="final-note">
            <span><Check size={12} style={{ display: "inline", verticalAlign: "-2px" }} /> Acesso imediato</span>
            <span><Check size={12} style={{ display: "inline", verticalAlign: "-2px" }} /> Garantia de 7 dias</span>
            <span><Check size={12} style={{ display: "inline", verticalAlign: "-2px" }} /> Pagamento seguro</span>
          </div>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer>
        <div className="footer-inner">
          <p className="footer-copy">
            © 2026 81 Formas Digital. Todos os direitos reservados.<br />
            Este produto é um ebook digital. Os resultados são individuais e não constituem garantia de ganhos.
          </p>
        </div>
      </footer>
    </div>
  );
}
