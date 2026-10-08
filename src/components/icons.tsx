export function InstrumentIcon({ type }: { type: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
    {type === "sax" && <><path {...common} d="M5.5 4.5c2-1.6 4.5-1 5.5 1.5"/><path {...common} d="M11 6v10.5c0 2.5 1.8 4 4 4s4-1.5 4-4V13"/><path {...common} d="M16.8 12.2h4.4"/><circle cx="11" cy="9.5" r=".9" fill="currentColor"/><circle cx="11" cy="12.5" r=".9" fill="currentColor"/><circle cx="11" cy="15.5" r=".9" fill="currentColor"/></>}
    {type === "bass" && <><path {...common} d="M12 2.5v8"/><path {...common} d="M12 10.5c-2.6 0-3.8 1.8-3.8 3.2 0 1 .5 1.7 1.1 2.2-1 .8-1.6 1.8-1.6 3 0 1.8 1.9 3.1 4.3 3.1s4.3-1.3 4.3-3.1c0-1.2-.6-2.2-1.6-3 .6-.5 1.1-1.2 1.1-2.2 0-1.4-1.2-3.2-3.8-3.2z"/><path {...common} d="M12 14v5.5"/></>}
    {type === "drums" && <><ellipse {...common} cx="12" cy="11" rx="7.5" ry="2.6"/><path {...common} d="M4.5 11v5.5c0 1.5 3.4 2.7 7.5 2.7s7.5-1.2 7.5-2.7V11"/><path {...common} d="M8 3.5l4.5 6M16.5 3.5l-4 6"/></>}
    {type === "piano" && <><rect {...common} x="3" y="6" width="18" height="12" rx="2"/><path {...common} d="M9 11.5V18M15 11.5V18"/><rect x="7.6" y="6" width="2.8" height="5.5" fill="currentColor"/><rect x="13.6" y="6" width="2.8" height="5.5" fill="currentColor"/></>}
    {type === "guitar" && <><circle {...common} cx="8.5" cy="15.5" r="4.7"/><circle {...common} cx="8.5" cy="15.5" r="1.4"/><path {...common} d="M12 12l8.2-8.2M18.8 2.7l2.5 2.5"/></>}
    {type === "rec" && <path {...common} d="M5 10v4M8.5 7v10M12 4v16M15.5 8v8M19 10.5v3"/>}
  </svg>;
}

export function PhoneIcon() { return <svg className="contact-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg> }
export function MailIcon() { return <svg className="contact-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.4 7h15.2L12 12.2zM4 9.1V17h16V9.1l-8 5.5-8-5.5z"/></svg> }
