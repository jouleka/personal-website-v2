import { ArrowRight, BookOpen, Check, Cloud, FileText, Lightbulb, Lock, MessageCircle, ShieldCheck, Smartphone, Users } from 'lucide-react';

function ArtifactShell({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="project-artifact relative min-h-64 overflow-hidden border border-border bg-background/70 p-5" aria-label={label}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      {children}
    </div>
  );
}

export function MySignerArtifact() {
  return (
    <ArtifactShell label="MySigner mobile release pipeline preview">
      <div className="mb-7 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
        <span>Release pipeline</span>
        <span className="flex items-center gap-1.5 text-emerald-500"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> ready</span>
      </div>

      <div className="rounded-sm border border-border bg-card p-4 font-mono text-xs shadow-2xl shadow-black/10">
        <div className="mb-4 flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-primary/80" />
          <span className="h-2 w-2 rounded-full bg-primary/35" />
          <span className="h-2 w-2 rounded-full bg-border" />
        </div>
        <p className="text-muted-foreground"><span className="text-primary">$</span> mysigner ship testflight</p>
        <div className="mt-4 space-y-2 text-[11px]">
          {['Build verified', 'Profile matched', 'Upload accepted'].map((step) => (
            <div key={step} className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0 last:pb-0">
              <span className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500" />{step}</span>
              <span className="text-muted-foreground">done</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
        <span className="border border-border bg-card px-2 py-2 text-center">Code</span>
        <ArrowRight className="h-3 w-3 text-primary" />
        <span className="border border-primary/30 bg-primary/5 px-2 py-2 text-center text-primary">Sign</span>
        <ArrowRight className="h-3 w-3 text-primary" />
        <span className="border border-border bg-card px-2 py-2 text-center">Store</span>
      </div>
    </ArtifactShell>
  );
}

export function AichuArtifact() {
  return (
    <ArtifactShell label="Aichu local AI prompt redaction proxy preview">
      <div className="mb-6 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
        <span className="flex items-center gap-2"><Lock className="h-3 w-3 text-primary" /> Local proxy</span>
        <span className="text-emerald-500">12 detectors active</span>
      </div>
      <div className="space-y-3 font-mono text-[10px]">
        <div className="border border-border bg-card p-3">
          <div className="mb-2 flex justify-between text-muted-foreground"><span>OUTBOUND PROMPT</span><span>localhost</span></div>
          <p>Debug <span className="bg-red-500/10 px-1 text-red-400 line-through decoration-red-400/70">sk-••••-7F2C</span> in this request</p>
        </div>
        <div className="flex items-center gap-3 px-2 text-primary"><span className="h-px flex-1 bg-primary/25" /><ShieldCheck className="h-4 w-4" /><span>redact locally</span><span className="h-px flex-1 bg-primary/25" /></div>
        <div className="border border-primary/30 bg-primary/5 p-3">
          <div className="mb-2 flex justify-between text-primary"><span>PROVIDER SEES</span><span>safe to send</span></div>
          <p>Debug <span className="text-primary">«SECRET_API_KEY_001»</span> in this request</p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[9px] font-mono uppercase text-muted-foreground">
        {['MITM mode', 'Base URL', 'Stream restore'].map((item) => <span key={item} className="border border-border bg-card py-2">{item}</span>)}
      </div>
    </ArtifactShell>
  );
}

export function OptionsArtifact() {
  const gates = ['Fresh', 'Liquid', 'Sized', 'Paper'];
  return (
    <ArtifactShell label="OptionsBot paper-trading risk console preview">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Strategy console</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">Defined risk</p>
        </div>
        <span className="border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-amber-500">Paper only</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[['Signal', '72'], ['Heat', '18%'], ['R:R', '2.1×']].map(([label, value]) => (
          <div key={label} className="border border-border bg-card p-3">
            <p className="text-[9px] font-mono uppercase text-muted-foreground">{label}</p>
            <p className="mt-2 text-lg font-semibold">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-end gap-1" aria-hidden="true">
        {[22, 35, 31, 48, 42, 57, 49, 68, 61, 77, 70, 84].map((height, index) => (
          <span key={index} className={`flex-1 ${index > 7 ? 'bg-primary/70' : 'bg-primary/25'}`} style={{ height }} />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-4 gap-1.5">
        {gates.map((gate) => <span key={gate} className="flex items-center justify-center gap-1 border border-border py-1.5 text-[9px] text-muted-foreground"><ShieldCheck className="h-3 w-3 text-emerald-500" />{gate}</span>)}
      </div>
    </ArtifactShell>
  );
}

export function PolymarketArtifact() {
  return (
    <ArtifactShell label="Polymarket deterministic proposal and risk flow preview">
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
        <span>Decision trace</span>
        <span>shadow / 0042</span>
      </div>
      <div className="my-8 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center">
        <div className="border border-border bg-card p-3"><p className="text-[9px] text-muted-foreground">AGENT</p><p className="mt-1 text-xs">Propose</p></div>
        <ArrowRight className="h-3 w-3 text-primary" />
        <div className="border border-primary/40 bg-primary/5 p-3"><p className="text-[9px] text-primary">ERS</p><p className="mt-1 text-xs">Validate</p></div>
        <ArrowRight className="h-3 w-3 text-primary" />
        <div className="border border-border bg-card p-3"><p className="text-[9px] text-muted-foreground">HARNESS</p><p className="mt-1 text-xs">Simulate</p></div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between text-xs"><span>Evidence confidence</span><span className="font-mono text-primary">68%</span></div>
        <div className="h-1.5 bg-secondary"><div className="h-full w-[68%] bg-primary" /></div>
        <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          <span className="border border-border px-2 py-2">No signer</span>
          <span className="border border-border px-2 py-2 text-right">Paper ledger</span>
        </div>
      </div>
    </ArtifactShell>
  );
}

export function SubtitleArtifact() {
  const waveform = [12, 20, 35, 28, 48, 61, 42, 67, 35, 54, 72, 39, 25, 45, 31, 18, 36, 52, 29, 14];
  return (
    <ArtifactShell label="Subtitle.fm collaborative subtitle editor preview">
      <div className="mb-7 flex items-center justify-between">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Cue editor / 01:24:08</p>
        <div className="flex -space-x-1.5" aria-label="Three collaborators online">
          {['JL', 'AM', '+1'].map((name) => <span key={name} className="grid h-6 w-6 place-items-center rounded-full border border-background bg-secondary text-[8px]">{name}</span>)}
        </div>
      </div>
      <div className="relative flex h-24 items-center gap-1 border-y border-border py-4" aria-hidden="true">
        {waveform.map((height, index) => <span key={index} className={`flex-1 ${index >= 6 && index <= 12 ? 'bg-primary' : 'bg-muted-foreground/25'}`} style={{ height: `${height}%` }} />)}
        <span className="absolute bottom-0 left-[49%] top-0 w-px bg-primary" />
      </div>
      <div className="mt-5 space-y-2 text-sm">
        <div className="grid grid-cols-[54px_1fr] gap-3 text-muted-foreground"><span className="font-mono text-[9px]">01:24:06</span><span>The story remembers where you stopped.</span></div>
        <div className="grid grid-cols-[54px_1fr] gap-3 border-l-2 border-primary bg-primary/5 py-2 pl-2"><span className="font-mono text-[9px] text-primary">01:24:08</span><span>Timing, language, and context—in sync.</span></div>
      </div>
    </ArtifactShell>
  );
}

export function ReadingArtifact() {
  return (
    <ArtifactShell label="Reading Companion spoiler-safe story memory preview">
      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground"><BookOpen className="h-3 w-3 text-primary" /> Litlet reader</div>
      <div className="mt-5 grid grid-cols-[1fr_92px] gap-4">
        <div className="border border-border bg-card p-4">
          <p className="font-serif text-lg leading-tight">The city had changed before anyone noticed.</p>
          <div className="mt-4 space-y-2">
            <div className="h-1.5 w-full bg-secondary" />
            <div className="h-1.5 w-5/6 bg-secondary" />
            <div className="h-1.5 w-11/12 bg-secondary" />
            <div className="h-1.5 w-2/3 bg-primary/30" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="border border-primary/30 bg-primary/5 p-2"><p className="text-[8px] font-mono text-primary">FRONTIER</p><p className="mt-1 text-xs">Chapter 12</p></div>
          <div className="border border-border bg-card p-2"><p className="text-[8px] font-mono text-muted-foreground">MEMORY</p><p className="mt-1 text-xs">31 facts</p></div>
          <div className="border border-border bg-card p-2"><p className="text-[8px] font-mono text-muted-foreground">SPOILERS</p><p className="mt-1 text-xs text-emerald-500">Blocked</p></div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-[10px] text-muted-foreground"><span>Reading progress</span><span>42%</span></div>
      <div className="mt-2 h-1 bg-secondary"><div className="h-full w-[42%] bg-primary" /></div>
    </ArtifactShell>
  );
}

export function GoldengoArtifact() {
  return (
    <ArtifactShell label="Goldengo private personal finance app preview">
      <div className="mx-auto max-w-[270px] rounded-[24px] border border-border bg-card p-4 shadow-2xl shadow-black/10">
        <div className="mb-5 flex items-center justify-between"><span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">August</span><Smartphone className="h-3.5 w-3.5 text-primary" /></div>
        <div className="grid grid-cols-[76px_1fr] items-center gap-5">
          <div className="relative h-[76px] w-[76px] rounded-full" style={{ background: 'conic-gradient(hsl(var(--primary)) 0 46%, hsl(var(--primary) / .45) 46% 73%, hsl(var(--secondary)) 73%)' }}>
            <div className="absolute inset-[9px] grid place-items-center rounded-full bg-card text-center"><span className="text-[9px] text-muted-foreground">spent</span><strong className="block text-xs">46%</strong></div>
          </div>
          <div><p className="text-[10px] text-muted-foreground">Monthly plan</p><p className="mt-1 text-2xl font-semibold tracking-tight">€2,400</p><p className="mt-2 flex items-center gap-1 text-[9px] text-emerald-500"><Cloud className="h-3 w-3" /> Private iCloud</p></div>
        </div>
        <div className="mt-5 space-y-2">
          {[['Food & drink', '€248'], ['Transport', '€112']].map(([name, value], index) => (
            <div key={name} className="flex items-center justify-between border-t border-border pt-2 text-xs"><span className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${index === 0 ? 'bg-primary' : 'bg-primary/40'}`} />{name}</span><span>{value}</span></div>
          ))}
        </div>
      </div>
    </ArtifactShell>
  );
}

export function OopsFeeArtifact() {
  return (
    <ArtifactShell label="OopsFee accountability promise and stake preview">
      <div className="mx-auto max-w-[280px] rounded-[24px] border border-border bg-card p-4 shadow-2xl shadow-black/10">
        <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
          <span>Your promise</span><span className="text-primary">2d 14h left</span>
        </div>
        <p className="mt-5 text-xl font-semibold leading-tight">Finish the thing I keep “researching”</p>
        <div className="my-5 grid grid-cols-2 gap-2">
          <div className="border border-primary/30 bg-primary/5 p-3"><p className="text-[9px] text-muted-foreground">ON THE LINE</p><p className="mt-1 text-xl font-semibold text-primary">€20</p></div>
          <div className="border border-border p-3"><p className="text-[9px] text-muted-foreground">VERIFIED BY</p><p className="mt-1 flex items-center gap-1 text-xs"><Users className="h-3 w-3 text-emerald-500" /> a friend</p></div>
        </div>
        <button type="button" tabIndex={-1} className="w-full bg-primary py-3 text-xs font-medium text-primary-foreground">I actually did it</button>
        <div className="mt-4 flex items-center justify-between text-[9px] text-muted-foreground"><span>🔥 6 promise streak</span><span>Your wallet is watching.</span></div>
      </div>
    </ArtifactShell>
  );
}

export function GreatWallArtifact() {
  return (
    <ArtifactShell label="Great Wall of Ideas discovery and remix preview">
      <div className="mb-5 flex items-center justify-between"><span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground"><Lightbulb className="h-3 w-3 text-primary" /> Trending idea</span><span className="text-[9px] text-emerald-500">12 viewing now</span></div>
      <div className="border border-border bg-card p-4">
        <div className="flex gap-2 text-[9px] font-mono uppercase text-primary"><span>Urban life</span><span>•</span><span>Open</span></div>
        <p className="mt-3 text-lg font-semibold leading-snug">Quiet-hour maps for people who think better without the city noise</p>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-3 text-[10px] text-muted-foreground"><span>▲ 128 votes</span><span>18 comments</span><span>7 remixes</span></div>
      </div>
      <div className="ml-8 mt-3 border-l border-primary/30 pl-4">
        <div className="border border-border bg-background/70 p-3 text-xs"><span className="mr-2 text-[9px] font-mono text-primary">REMIX 07</span> Add live crowd-sourced sound readings.</div>
      </div>
    </ArtifactShell>
  );
}

export function ResumeArtifact() {
  return (
    <ArtifactShell label="Configurable resume builder preview">
      <div className="grid grid-cols-[72px_1fr] gap-4">
        <div className="space-y-2 text-[9px] font-mono uppercase text-muted-foreground">
          <div className="border border-primary/30 bg-primary/5 p-2 text-primary">Content</div>
          <div className="border border-border p-2">Layout</div>
          <div className="border border-border p-2">Print</div>
        </div>
        <div className="relative border border-border bg-card p-4 shadow-xl shadow-black/10">
          <div className="mb-4 flex items-start justify-between"><div><div className="h-2 w-24 bg-foreground/80" /><div className="mt-2 h-1.5 w-16 bg-primary/60" /></div><FileText className="h-4 w-4 text-primary" /></div>
          <p className="text-[8px] font-mono uppercase text-muted-foreground">Experience</p>
          <div className="mt-2 space-y-2"><div className="h-1.5 w-full bg-secondary" /><div className="h-1.5 w-11/12 bg-secondary" /><div className="h-1.5 w-4/5 bg-secondary" /></div>
          <div className="mt-4 grid grid-cols-2 gap-2"><div className="h-12 border border-border bg-background/50" /><div className="h-12 border border-border bg-background/50" /></div>
          <span className="absolute bottom-2 right-2 text-[8px] font-mono text-emerald-500">A4 / print ready</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-[10px] text-muted-foreground"><span>Typed profile data</span><ArrowRight className="h-3 w-3 text-primary" /><span>Responsive CV</span><ArrowRight className="h-3 w-3 text-primary" /><span>PDF</span></div>
    </ArtifactShell>
  );
}

export function ChatArtifact() {
  return (
    <ArtifactShell label="Realtime group chat application preview">
      <div className="grid grid-cols-[86px_1fr] overflow-hidden border border-border bg-card">
        <div className="border-r border-border p-3">
          <div className="mb-4 flex items-center gap-1 text-[9px] font-mono uppercase text-muted-foreground"><MessageCircle className="h-3 w-3 text-primary" /> Chats</div>
          <div className="space-y-3">
            {['Design', 'Family', 'Team'].map((name, index) => <div key={name} className={`flex items-center gap-2 text-[9px] ${index === 0 ? 'text-primary' : 'text-muted-foreground'}`}><span className={`h-5 w-5 rounded-full ${index === 0 ? 'bg-primary/20' : 'bg-secondary'}`} />{name}</div>)}
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between border-b border-border pb-2 text-[9px]"><span className="font-medium">Design group</span><span className="text-emerald-500">4 online</span></div>
          <div className="mt-4 space-y-3 text-[10px]">
            <div className="mr-7 rounded-sm bg-secondary p-2">Did you ship the new flow?</div>
            <div className="ml-7 rounded-sm bg-primary p-2 text-primary-foreground">Just pushed it. Take a look 👀</div>
            <div className="mr-12 rounded-sm bg-secondary p-2">Much cleaner.</div>
          </div>
          <div className="mt-4 flex items-center justify-between border border-border px-2 py-2 text-[9px] text-muted-foreground"><span>Write a message…</span><span className="text-primary">Send</span></div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[9px] text-muted-foreground"><span>Groups</span><span>Favorites</span><span>Realtime</span></div>
    </ArtifactShell>
  );
}
