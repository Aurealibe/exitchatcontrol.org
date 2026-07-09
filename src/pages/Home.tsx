import { T } from '../lib/i18n'
import { TopBar, FilterBar } from '../components/Chrome'
import { Footer } from '../components/Footer'
import { Hero, StatusBanner, Toc, Threat, Memo } from '../sections/intro'
import { Precedents } from '../sections/precedents'
import { Messaging, Email, Browsers, Dns } from '../sections/tools-foundations'
import { Vpn, Censorship, LeaveGoogle, Storage, Passwords, TwoFa } from '../sections/tools-network'
import { Social, Money, Ai, Toolbox } from '../sections/tools-social'
import { SelfHost, TorSection, FreeOs, Telephony, Opsec, Ecosystem } from '../sections/tools-advanced'
import { Allies } from '../sections/allies'
import { Action } from '../sections/action'

/* The <title> lives statically in index.html (single route); setLang() in
   lib/prefs.ts swaps it per language. No useHead here: a second title writer
   would race both setLang and the e2e verdict. */
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#menace">
        <T fr="Aller au contenu" en="Skip to content" />
      </a>
      <TopBar />
      <noscript>
        <div className="status">
          <div className="wrap">
            <p style={{ margin: 0, fontSize: '.92rem' }}>
              JavaScript est désactivé — parfait, ce guide reste entièrement lisible (version française
              affichée). <span lang="en">JavaScript is off — this guide stays fully readable; the French
              version is shown by default, and the full English text is embedded in this same page (enable
              JS to toggle).</span> Version hors-ligne / offline copy&nbsp;:{' '}
              <a href="/exitchatcontrol-offline.html">exitchatcontrol-offline.html</a>
            </p>
          </div>
        </div>
      </noscript>
      <Hero />
      <StatusBanner />
      <main className="wrap">
        <Toc />
        <FilterBar />
        <Threat />
        <Precedents />
        <Memo />
        <Messaging />
        <Email />
        <Browsers />
        <Dns />
        <Vpn />
        <Censorship />
        <LeaveGoogle />
        <Storage />
        <Passwords />
        <TwoFa />
        <Social />
        <Money />
        <Ai />
        <Toolbox />
        <SelfHost />
        <TorSection />
        <FreeOs />
        <Telephony />
        <Opsec />
        <Ecosystem />
        <Allies />
        <Action />
      </main>
      <Footer />
      <a className="to-top" href="#top" aria-label="Retour en haut — Back to top">
        ↑
      </a>
    </>
  )
}
