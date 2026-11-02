import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Home, ShoppingCart, ShoppingBag, Box, Contact, Landmark, BarChart3, ChevronDown, ChevronUp,
  ClipboardList, Settings, Zap, Search, Bell, HelpCircle, Calendar, MapPin, Layers, RefreshCw,
  Boxes, Sparkles, BarChart2, ArrowLeftRight, FileText, Layers3, AlertTriangle, Clock, Package,
  ChevronRight, Info, X, Target, TrendingUp, Gauge, Truck, CheckCircle2, Columns3, FileSpreadsheet,
  Download, MoreVertical, ArrowUp, ArrowDown, Hexagon,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import cement from "@/assets/cement.jpg";
import plaster from "@/assets/plaster.jpg";
import adhesive from "@/assets/adhesive.jpg";
import rebar from "@/assets/rebar.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stok Analiz Merkezi | İnşaatÇevrem ERP" },
      { name: "description", content: "Stoklarınızı analiz edin, riskleri görün, doğru zamanda aksiyon alın." },
      { property: "og:title", content: "Stok Analiz Merkezi | İnşaatÇevrem ERP" },
      { property: "og:description", content: "Stoklarınızı analiz edin, riskleri görün, doğru zamanda aksiyon alın." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const card = "rounded-lg border border-border bg-card shadow-sm";

function Sidebar() {
  const items: [ReactNode, string, boolean?][] = [
    [<Home key="h" size={17} />, "Ana Sayfa"], [<ShoppingCart key="s" size={17} />, "Satış", true],
    [<ShoppingBag key="sa" size={17} />, "Satın Alma", true], [<Box key="b" size={17} />, "Stok", true],
    [<Contact key="c" size={17} />, "Cari Hesaplar", true], [<Landmark key="f" size={17} />, "Finans", true],
  ];
  return (
    <aside className="fixed inset-y-0 left-0 flex w-[198px] flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2 px-5 py-5 whitespace-nowrap text-[15px] font-bold text-sidebar-accent-foreground">
        <Hexagon className="fill-primary text-primary" size={22} /> İnşaatÇevrem ERP
      </div>
      <nav className="flex-1 space-y-0.5 px-3 text-[13.5px]">
        {items.map(([i, l, c]) => (
          <div key={l} className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 hover:bg-sidebar-accent">
            {i}<span className="flex-1">{l}</span>{c && <ChevronDown size={14} />}
          </div>
        ))}
        <div className="flex items-center gap-3 rounded-md bg-sidebar-accent px-3 py-2.5 font-semibold text-sidebar-accent-foreground">
          <BarChart3 size={17} /><span className="flex-1">Raporlar</span><ChevronUp size={14} />
        </div>
        <div className="space-y-1 py-1 pl-4 text-[13px]">
          <div className="flex items-center gap-2 px-3 py-2"><span className="h-1 w-1 rounded-full bg-sidebar-foreground" />Satış Raporları</div>
          <div className="rounded-md bg-primary px-5 py-2 font-semibold text-primary-foreground">Stok Analizleri</div>
          <div className="whitespace-nowrap px-5 py-2">Satın Alma Raporları</div>
          <div className="px-5 py-2">Finansal Raporlar</div>
        </div>
        {[[<ClipboardList key="t" size={17} />, "Tanımlar"], [<Settings key="a" size={17} />, "Ayarlar"]].map(([i, l]) => (
          <div key={l as string} className="flex items-center gap-3 rounded-md px-3 py-2.5 hover:bg-sidebar-accent">
            {i}<span className="flex-1">{l}</span><ChevronDown size={14} />
          </div>
        ))}
      </nav>
      <div className="m-3 flex items-center gap-2 rounded-md border border-sidebar-border px-4 py-2.5 text-[13.5px]">
        <Zap size={16} /> Hızlı İşlemler
      </div>
    </aside>
  );
}

function Select({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button className="whitespace-nowrap flex h-9 items-center gap-2 rounded-md border border-border bg-card px-3 text-[13px] font-medium">
      {icon}<span className="mr-6">{label}</span><ChevronDown size={15} />
    </button>
  );
}

const tabs: [ReactNode, string][] = [
  [<Home key="1" size={16} />, "Genel Bakış"], [<ShoppingCart key="2" size={16} />, "Yeniden Sipariş"],
  [<Sparkles key="3" size={16} />, "Akıllı Analizler"], [<BarChart2 key="4" size={16} />, "Stok Performansı"],
  [<Layers3 key="5" size={16} />, "Depo Analizi"], [<ArrowLeftRight key="6" size={16} />, "Hareketler"],
  [<FileText key="7" size={16} />, "Raporlar"],
];

function Kpi({ icon, iconBg, title, value, valueCls = "", sub }: { icon: ReactNode; iconBg: string; title: string; value: string; valueCls?: string; sub: ReactNode }) {
  return (
    <div className={`${card} flex min-w-0 flex-1 gap-2 overflow-hidden p-2.5`}>
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconBg}`}>{icon}</div>
      <div className="min-w-0">
        <div className="whitespace-nowrap text-[12.5px] font-medium">{title}</div>
        <div className={`whitespace-nowrap text-[19px] font-bold leading-tight ${valueCls}`}>{value}</div>
        <div className="whitespace-nowrap text-[11px] text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}

const Pill = ({ tone, children }: { tone: "danger" | "warning" | "info" | "success"; children: ReactNode }) => {
  const m = { danger: "bg-danger-soft text-danger", warning: "bg-warning-soft text-foreground", info: "bg-info-soft text-primary", success: "bg-success-soft text-success" };
  return <span className={`inline-block rounded px-2 py-0.5 text-[12px] font-semibold ${m[tone]}`}>{children}</span>;
};

const health = [
  { n: "Sağlıklı", v: 268, p: "%86,7", c: "var(--success)" },
  { n: "İzlenmeli", v: 21, p: "%6,8", c: "var(--warning)" },
  { n: "Kritik", v: 12, p: "%3,9", c: "var(--danger)" },
  { n: "Hareketsiz", v: 8, p: "%2,6", c: "var(--violet)" },
];

const trend = Array.from({ length: 31 }, (_, i) => ({
  d: i + 1,
  s: 6400 + Math.sin(i / 1.3) * 250 - i * 15 + (i > 26 ? (i - 26) * 120 : 0),
  q: 1500 + Math.sin(i / 1.6) * 220 + i * 18 - (i > 28 ? 300 : 0),
}));

const aging = [
  ["%30", "0–30 gün", "bg-success", "bg-success"],
  ["%24", "31–60 gün", "bg-warning", "bg-warning"],
  ["%20", "61–90 gün", "bg-orange", "bg-orange"],
  ["%16", "91–180 gün", "bg-pink", "bg-pink"],
  ["%10", "180+ gün", "bg-violet", "bg-violet"],
];

const rows = [
  { img: cement, n: "Çimento 50 kg", c: "CMT-050", d: "Merkez", k: "47 torba", g: "12,7", y: "4 gün", yt: "danger", t: "7 gün", a: "-", o: "150 torba", s: "Kritik", st: "danger", r: <>Satış <ArrowUp size={12} className="inline text-danger" />%26</> },
  { img: plaster, n: "Alçı Sıva", c: "ALC-025", d: "Depo 2", k: "85 torba", g: "8,0", y: "11 gün", yt: "warning", t: "6 gün", a: "30 torba", o: "90 torba", s: "İzle", st: "warning", r: <>Satış <ArrowUp size={12} className="inline text-danger" />%18</> },
  { img: rebar, n: "İnşaat Demiri Ø12", c: "DMR-012", d: "Depo 2", k: "12 ton", g: "0,6", y: "20 gün", yt: "success", t: "10 gün", a: "5 ton", o: "10 ton", s: "İzle", st: "warning", r: <>Talep artıyor</> },
  { img: adhesive, n: "Seramik Yapıştırıcı", c: "SRM-210", d: "Merkez", k: "382 paket", g: "4,5", y: "85 gün", yt: "info", t: "5 gün", a: "-", o: "-", s: "Fazla", st: "info", r: <>Satış <ArrowDown size={12} className="inline text-danger" />%32</> },
] as const;

function Index() {
  const [tab, setTab] = useState("Genel Bakış");
  const [ftab, setFtab] = useState("Tüm Ürünler (309)");
  const [ptab, setPtab] = useState("Özet");
  const [sel, setSel] = useState<number[]>([0]);
  const [panel, setPanel] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="ml-[198px]">
        <header className="whitespace-nowrap flex h-10 items-center justify-between border-b border-border bg-card px-5 text-[13px]">
          <div className="flex items-center gap-2"><span>Raporlar</span><ChevronRight size={13} /><span className="font-semibold">Stok Analiz Merkezi</span></div>
          <div className="flex items-center gap-5">
            <div className="whitespace-nowrap flex h-7 w-60 items-center gap-2 rounded-md border border-border px-2 text-muted-foreground"><Search size={15} /><input className="w-full bg-transparent text-[12px] outline-none" placeholder="Ürün, kod, barkod ara..." /></div>
            <div className="relative"><Bell size={18} /><span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-danger" /></div>
            <HelpCircle size={18} />
            <div className="flex items-center gap-1"><div className="whitespace-nowrap flex h-7 w-7 items-center justify-center rounded-full bg-muted text-[11px] font-semibold">MK</div><ChevronDown size={14} /></div>
          </div>
        </header>

        <div className="flex gap-3 p-3 pl-4">
          <main className="min-w-0 flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Boxes size={44} className="text-primary" strokeWidth={1.5} />
                <div>
                  <h1 className="text-[24px] font-bold leading-tight">Stok Analiz Merkezi</h1>
                  <p className="text-[12.5px] text-muted-foreground">Stoklarınızı analiz edin, riskleri görün, doğru zamanda aksiyon alın.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Select icon={<Calendar size={15} />} label="Son 30 Gün" />
                <Select icon={<MapPin size={15} />} label="Tüm Depolar" />
                <Select icon={<Layers size={15} />} label="Tüm Kategoriler" />
                <button className="whitespace-nowrap flex h-9 items-center gap-2 rounded-md bg-primary px-5 text-[13px] font-semibold text-primary-foreground"><RefreshCw size={15} />Analizi Yenile</button>
              </div>
            </div>

            <div className="flex gap-2 border-b border-border pb-2">
              {tabs.map(([i, l]) => (
                <button key={l} onClick={() => setTab(l)} className={`flex h-9 items-center gap-2 rounded-md px-4 text-[13px] font-semibold ${tab === l ? "bg-primary text-primary-foreground" : "border border-border bg-card"}`}>{i}{l}</button>
              ))}
            </div>

            <div className="flex gap-2">
              <Kpi icon={<Layers size={22} className="text-success" />} iconBg="bg-success-soft" title="Stok Değeri" value="₺ 1.842.486" sub={<><span className="text-success">↑ %4,6</span> (önceki aya göre)</>} />
              <Kpi icon={<Box size={22} className="text-primary" />} iconBg="bg-info-soft" title="Stoklu Ürün" value="309" sub="Aktif ürün çeşidi" />
              <Kpi icon={<AlertTriangle size={24} className="text-danger" />} iconBg="bg-danger-soft" title="Kritik Ürün" value="12" valueCls="text-danger" sub="Hemen aksiyon gerekli" />
              <Kpi icon={<Clock size={22} className="text-warning" />} iconBg="bg-warning-soft" title="Tedarik Riski" value="8" valueCls="text-warning" sub="30 gün içinde" />
              <Kpi icon={<Package size={22} className="text-violet" />} iconBg="bg-violet-soft" title="Hareketsiz Stok" value="₺ 184.320" sub="90+ gün" />
              <Kpi icon={<RefreshCw size={22} className="text-primary" />} iconBg="bg-info-soft" title="Stok Devir Hızı" value="3,2x" sub="Yıllıklandırılmış" />
            </div>

            <div className="grid grid-cols-[1.12fr_1fr] gap-3">
              <section className={`${card} p-3`}>
                <div className="mb-1 flex items-center justify-between">
                  <h2 className="text-[16px] font-bold">Bugün Dikkat Etmeniz Gerekenler</h2>
                  <span className="rounded bg-danger-soft px-2 py-0.5 text-[12px] font-semibold text-danger">3 kritik • 5 izlenmeli</span>
                </div>
                {[
                  { ic: <AlertTriangle className="text-danger" size={22} />, bg: "bg-danger-soft", img: cement, n: "Çimento 50 kg", p: <Pill tone="danger">Kritik</Pill>, l: "Stok 4 gün yeterli. Tedarik süresi 7 gün.", w: "Satış artışı (+%26) ve açık sipariş yok." },
                  { ic: <AlertTriangle className="text-warning" size={22} />, bg: "bg-warning-soft", img: plaster, n: "Alçı Sıva", p: <Pill tone="warning">İzle</Pill>, l: "Stok 11 gün yeterli. Tedarik süresi 6 gün.", w: "Geçen aya göre satış artışı (+%18)." },
                  { ic: <Info className="text-primary" size={20} />, bg: "bg-info-soft", img: adhesive, n: "Seramik Yapıştırıcı", p: <Pill tone="info">Fazla Stok</Pill>, l: "Stok 85 gün yeterli.", w: "Satış hızı düştü (-%32) ve yüksek stok var." },
                ].map((x, i) => (
                  <div key={x.n} className={`flex cursor-pointer items-center gap-3 py-2 ${i ? "border-t border-border" : ""}`}>
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full ${x.bg}`}>{x.ic}</div>
                    <img src={x.img} alt={x.n} className="h-12 w-12 rounded object-contain" loading="lazy" width={48} height={48} />
                    <div className="flex-1 text-[12.5px]">
                      <div className="flex items-center gap-2 text-[14px] font-bold">{x.n}{x.p}</div>
                      <div>{x.l}</div>
                      <div><span className="font-semibold text-danger">Neden?</span> {x.w}</div>
                    </div>
                    <ChevronRight size={18} />
                  </div>
                ))}
              </section>

              <section className={`${card} p-3`}>
                <h2 className="text-[16px] font-bold">Stok Sağlığı</h2>
                <div className="flex items-center gap-6">
                  <div className="relative h-[190px] w-[190px]">
                    <ResponsiveContainer>
                      <PieChart><Pie data={health} dataKey="v" innerRadius={58} outerRadius={88} startAngle={90} endAngle={-270} stroke="var(--card)" strokeWidth={2} isAnimationActive={false}>
                        {health.map((h) => <Cell key={h.n} fill={h.c} />)}
                      </Pie></PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-[24px] font-bold">309</span><span className="text-[15px]">ürün</span></div>
                  </div>
                  <div className="flex-1 space-y-4 text-[14px]">
                    {health.map((h) => (
                      <div key={h.n} className="grid grid-cols-[1fr_50px_60px] items-center">
                        <span className="flex items-center gap-3"><span className="h-3 w-3 rounded-full" style={{ background: h.c }} />{h.n}</span>
                        <span className="text-right font-semibold">{h.v}</span><span className="text-right">{h.p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className={`${card} p-3`}>
                <div className="flex items-center justify-between">
                  <h2 className="text-[16px] font-bold">Satış – Stok Trendi</h2>
                  <div className="flex gap-5 text-[12px]"><span className="flex items-center gap-1.5"><span className="h-2 w-3.5 rounded-full bg-primary" />Satış (adet)</span><span className="flex items-center gap-1.5"><span className="h-2 w-3.5 rounded-full bg-success" />Stok (adet)</span></div>
                </div>
                <div className="h-[125px]">
                  <ResponsiveContainer>
                    <AreaChart data={trend} margin={{ top: 8, right: 8, left: -14, bottom: 0 }}>
                      <CartesianGrid vertical={false} stroke="var(--border)" />
                      <XAxis dataKey="d" ticks={[1, 5, 10, 15, 20, 25, 30]} tickFormatter={(v) => `${v} Oca`} tick={{ fontSize: 11, fill: "var(--foreground)" }} axisLine={false} tickLine={false} />
                      <YAxis ticks={[0, 2000, 4000, 6000, 8000]} domain={[0, 8000]} tickFormatter={(v) => v ? v.toLocaleString("tr-TR", { minimumFractionDigits: 0 }).replace(",", ".") : "0"} tick={{ fontSize: 11, fill: "var(--foreground)" }} axisLine={false} tickLine={false} />
                      <Area dataKey="s" stroke="var(--success)" strokeWidth={2} fill="var(--success-soft)" dot={{ r: 1.5 }} isAnimationActive={false} />
                      <Area dataKey="q" stroke="var(--primary)" strokeWidth={2} fill="var(--info-soft)" dot={{ r: 1.5 }} isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </section>

              <section className={`${card} p-3`}>
                <h2 className="text-[16px] font-bold">Stok Yaşlandırma <span className="font-medium">(Değer)</span></h2>
                <div className="mt-3 flex h-8 overflow-hidden rounded-full text-[13px] font-semibold">
                  {aging.map(([p, , c], i) => <div key={i} className={`${c} flex items-center justify-center`} style={{ width: (p ?? "").slice(1) + "%" }}>{p}</div>)}
                </div>
                <div className="mt-3 grid grid-cols-5 text-[12.5px]">
                  {aging.map(([p, l, , d]) => <div key={l}><div className="flex items-center gap-1.5"><span className={`h-2.5 w-2.5 rounded-full ${d}`} />{l}</div><div className="pl-4 font-semibold">{p}</div></div>)}
                </div>
              </section>
            </div>

            <section className={`${card} overflow-hidden`}>
              <div className="flex items-center justify-between border-b border-border p-2">
                <div className="flex gap-2">
                  {["Tüm Ürünler (309)", "Kritik (12)", "Tedarik Riski (8)", "Fazla Stok (18)", "Hareketsiz (8)"].map((t) => (
                    <button key={t} onClick={() => setFtab(t)} className={`h-8 rounded-md px-5 text-[12.5px] font-medium ${ftab === t ? "bg-primary text-primary-foreground" : "border border-border"}`}>{t}</button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="whitespace-nowrap flex h-8 items-center gap-2 rounded-md border border-border px-5 text-[12.5px]"><Columns3 size={15} />Sütunlar</button>
                  <button className="whitespace-nowrap flex h-8 items-center gap-2 rounded-md border border-border px-4 text-[12.5px]"><FileSpreadsheet size={15} className="text-success" />Excel</button>
                </div>
              </div>
              <table className="w-full text-[12.5px]">
                <thead><tr className="border-b border-border text-left font-semibold">
                  <th className="w-8 px-3 py-2"><input type="checkbox" checked={sel.length === rows.length} onChange={(e) => setSel(e.target.checked ? rows.map((_, i) => i) : [])} /></th>
                  {["Ürün", "Depo", "Kullanılabilir", "Günlük Satış", "Yeterlilik", "Tedarik Süresi", "Açık Sipariş", "Önerilen Sipariş", "Durum", "Neden", ""].map((h) => <th key={h} className={`py-2 font-semibold ${h === "Ürün" || h === "Neden" ? "" : "text-center"}`}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.c} className={`border-b border-border ${sel.includes(i) ? "bg-info-soft/50" : ""}`}>
                      <td className="px-3"><input type="checkbox" checked={sel.includes(i)} onChange={() => setSel(sel.includes(i) ? sel.filter((x) => x !== i) : [...sel, i])} /></td>
                      <td className="py-1"><div className="flex items-center gap-2"><img src={r.img} alt={r.n} className="h-7 w-7 object-contain" loading="lazy" width={28} height={28} /><div className="leading-tight"><div className="font-medium">{r.n}</div><div className="text-[11px] text-muted-foreground">{r.c}</div></div></div></td>
                      <td className="text-center">{r.d}</td><td className="text-center">{r.k}</td><td className="text-center">{r.g}</td>
                      <td className="text-center"><Pill tone={r.yt}>{r.y}</Pill></td>
                      <td className="text-center">{r.t}</td><td className="text-center">{r.a}</td><td className="text-center">{r.o}</td>
                      <td className="text-center"><Pill tone={r.st}>{r.s}</Pill></td>
                      <td>{r.r}</td>
                      <td><MoreVertical size={16} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex gap-2 p-2 text-[12.5px]">
                <span className="whitespace-nowrap flex h-8 items-center rounded-md bg-info-soft px-5 font-medium text-primary">{sel.length} ürün seçildi</span>
                <button className="whitespace-nowrap flex h-8 items-center gap-2 rounded-md bg-primary px-5 font-medium text-primary-foreground"><ShoppingCart size={15} />Satın Alma Talebi Oluştur</button>
                <button className="whitespace-nowrap flex h-8 items-center gap-2 rounded-md border border-border px-4"><ArrowLeftRight size={15} />Depolar Arası Transfer</button>
                <button className="whitespace-nowrap flex h-8 items-center gap-2 rounded-md border border-border px-4"><Download size={15} />Dışa Aktar<ChevronDown size={14} /></button>
              </div>
            </section>
          </main>

          {panel && (
            <aside className={`${card} w-[340px] shrink-0 space-y-3 self-start p-3`}>
              <div className="flex items-center justify-between"><h2 className="text-[19px] font-bold">Ürün Analizi</h2><button onClick={() => setPanel(false)}><X size={20} /></button></div>
              <div className="flex items-center gap-3">
                <img src={cement} alt="Çimento 50 kg" className="h-16 w-16 rounded border border-border object-contain" width={64} height={64} />
                <div className="flex-1"><div className="text-[17px] font-bold">Çimento 50 kg</div><div className="text-[13px]">CMT-050 • Merkez Depo</div></div>
                <span className="self-start rounded bg-danger-soft px-2.5 py-1 text-[13px] font-semibold text-danger">Kritik</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {["Özet", "Analiz", "Hareketler", "Tahmin"].map((t) => <button key={t} onClick={() => setPtab(t)} className={`h-8 rounded-md text-[13px] font-semibold ${ptab === t ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{t}</button>)}
              </div>
              <div className="rounded-md border border-border p-2 text-[13.5px]">
                <div className="mb-1 px-1 text-[15px] font-bold">Mevcut Durum</div>
                {[["Kullanılabilir Stok", "47 torba"], ["Ayrılmış Stok", "0 torba"], ["Yoldaki Sipariş", "0 torba"]].map(([a, b]) => <div key={a} className="flex justify-between border-b border-border px-2 py-1"><span>{a}</span><span className="font-semibold">{b}</span></div>)}
                <div className="mt-1 flex justify-between rounded bg-info-soft px-2 py-1 font-bold text-primary"><span>Net Kullanılabilir</span><span>47 torba</span></div>
              </div>
              <div className="overflow-hidden rounded-md border border-border text-[13.5px]">
                <div className="flex items-center gap-2 bg-danger-soft px-3 py-2 text-[15px] font-bold text-danger"><Target size={18} />Neden Kritik?</div>
                <div className="space-y-2 p-3">
                  {[[Calendar, "Geçen ay satış: 380 torba"], [TrendingUp, "Satış değişimi: +%26 (önceki aya göre)"], [Gauge, "Günlük ortalama talep: 12,7 torba"], [Truck, "Tedarik süresi: 7 gün"]].map(([I, t], i) => { const Ic = I as typeof Calendar; return <div key={i} className="flex items-center gap-3"><Ic size={16} className={i === 1 ? "text-danger" : ""} />{t as string}</div>; })}
                  <div className="flex gap-2 rounded bg-danger-soft p-2 text-danger"><AlertTriangle size={18} className="shrink-0 text-orange" />Mevcut stok, tedarik gelmeden önce yaklaşık 4 günde tükenebilir.</div>
                </div>
              </div>
              <div className="rounded-md border border-border p-3 text-[12.5px]">
                <div className="mb-2 flex items-center gap-2 text-[15px] font-bold">Yeniden Sipariş Önerisi <Info size={15} /></div>
                <div className="mb-3 grid grid-cols-[1.4fr_1fr] gap-2">
                  <div className="rounded-md bg-warning-soft p-2"><div>Önerilen Miktar</div><div className="text-[21px] font-bold">150 torba</div></div>
                  <div className="whitespace-nowrap rounded-md border border-border p-2"><div>Hedef Stok Süresi</div><div className="text-[18px] font-bold">30 gün</div></div>
                </div>
                {["Satış hızı, tedarik süresi ve emniyet stoğu dikkate alındı.", "Açık sipariş bulunmuyor.", "Paket katı: 25 torba (öneri 150 torba)."].map((t) => <div key={t} className="flex items-center gap-2 py-0.5"><CheckCircle2 size={15} className="text-success" />{t}</div>)}
              </div>
              <div className="flex gap-2 pt-4">
                <button className="whitespace-nowrap flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-primary text-[13.5px] font-semibold text-primary-foreground"><ShoppingCart size={17} />Satın Alma Talebi Oluştur</button>
                <button className="h-10 rounded-md border border-border px-4 text-[13.5px] font-semibold">Detaylı Analiz</button>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
