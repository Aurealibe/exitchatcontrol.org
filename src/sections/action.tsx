import { T } from '../lib/i18n'
import { Box, PartHead } from '../components/ui'
import { Checklist, type CheckItem } from '../components/Checklist'
import { ShareRow } from '../components/Share'

/* PART 15 · Take action — upgraded with a persisted migration checklist
   (localStorage only) replacing v1's static 3-line plan. */

const PLAN: CheckItem[] = [
  { id: 'signal', lvl: '🟢', label: <T fr={<><b>Installez Signal</b> et faites-y venir vos trois contacts les plus fréquents.</>} en={<><b>Install Signal</b> and bring your three most frequent contacts over.</>} /> },
  { id: 'email', lvl: '🟢', label: <T fr={<><b>Ouvrez un Proton Mail ou Tuta</b>, importez, mettez la redirection depuis Gmail.</>} en={<><b>Open a Proton Mail or Tuta</b>, import, set up forwarding from Gmail.</>} /> },
  { id: 'pass', lvl: '🟢', label: <T fr={<><b>Installez Bitwarden</b> et un mot de passe maître long (une phrase).</>} en={<><b>Install Bitwarden</b> with a long master password (a phrase).</>} /> },
  { id: 'ublock', lvl: '🟢', label: <T fr={<><b>Ajoutez uBlock Origin</b> à votre navigateur (dix secondes).</>} en={<><b>Add uBlock Origin</b> to your browser (ten seconds).</>} /> },
  { id: 'browser', lvl: '🟢', label: <T fr={<><b>Remplacez Chrome et Google Search</b> (Firefox/Brave + DuckDuckGo).</>} en={<><b>Replace Chrome and Google Search</b> (Firefox/Brave + DuckDuckGo).</>} /> },
  { id: 'twofa', lvl: '🟡', label: <T fr={<><b>Activez la 2FA</b> (Aegis / Ente Auth, jamais par SMS) sur e-mail + gestionnaire.</>} en={<><b>Turn on 2FA</b> (Aegis / Ente Auth, never SMS) on email + password manager.</>} /> },
  { id: 'cloud', lvl: '🟡', label: <T fr={<><b>Migrez vos fichiers</b> vers un cloud chiffré (Proton Drive / Cryptomator).</>} en={<><b>Move your files</b> to an encrypted cloud (Proton Drive / Cryptomator).</>} /> },
  { id: 'vpn', lvl: '🟡', label: <T fr={<><b>Prenez un VPN</b> (Mullvad), idéalement payé anonymement.</>} en={<><b>Get a VPN</b> (Mullvad), ideally paid anonymously.</>} /> },
  { id: 'dns', lvl: '🟡', label: <T fr={<><b>Chiffrez votre DNS</b> (Quad9 / Mullvad DNS) sur téléphone et ordinateur.</>} en={<><b>Encrypt your DNS</b> (Quad9 / Mullvad DNS) on phone and computer.</>} /> },
  { id: 'social', lvl: '🟡', label: <T fr={<><b>Créez votre compte Mastodon</b> et ancrez votre présence hors plateformes.</>} en={<><b>Open your Mastodon account</b> and anchor your presence off-platform.</>} /> },
  { id: 'linux', lvl: '🔴', label: <T fr={<><b>Testez Linux</b> (distrosea.com), puis installez-le (Mint pour commencer).</>} en={<><b>Try Linux</b> (distrosea.com), then install it (Mint to start).</>} /> },
  { id: 'graphene', lvl: '🔴', label: <T fr={<><b>Passez le téléphone sur GrapheneOS</b> (Pixel requis) ou durcissez Android.</>} en={<><b>Move the phone to GrapheneOS</b> (Pixel needed) or harden Android.</>} /> },
  { id: 'selfhost', lvl: '🔴', label: <T fr={<><b>Auto-hébergez</b> un premier service (YunoHost / Umbrel + Tailscale).</>} en={<><b>Self-host</b> a first service (YunoHost / Umbrel + Tailscale).</>} /> },
  { id: 'opsec', lvl: '🔴', label: <T fr={<><b>Adoptez la discipline OPSEC</b> si vous publiez sous pseudonyme.</>} en={<><b>Adopt OPSEC discipline</b> if you publish pseudonymously.</>} /> },
]

export function Action() {
  return (
    <section id="action">
      <PartHead
        num={<>PARTIE 15 · <T fr="PASSER À L'ACTION" en="TAKE ACTION" /></>}
        title={<T fr="Migration & désobéissance civile numérique" en="Migration & digital civil disobedience" />}
      />
      <h4><T fr="Le plan, à cocher" en="The plan, tickable" /></h4>
      <p>
        <T
          fr={<>Semaine 1 : les 🟢. Semaine 2 : les 🟡. Ensuite, selon votre profil : les 🔴. Votre progression est enregistrée <strong>uniquement dans votre navigateur</strong> (localStorage) : ce site n'envoie rien, nulle part. Ouvrez l'inspecteur réseau pour vérifier.</>}
          en={<>Week 1: the 🟢. Week 2: the 🟡. Then, per your profile: the 🔴. Your progress is stored <strong>in your browser only</strong> (localStorage): this site sends nothing, anywhere. Open the network inspector and check.</>}
        />
      </p>
      <Checklist items={PLAN} />
      <Box tone="warn" label={<T fr="Erreurs classiques" en="Common mistakes" />}>
        <p>
          <T
            fr="Croire qu'un seul outil suffit ; réutiliser son vrai numéro pour un compte anonyme ; installer dix applications sans changer ses habitudes ; oublier que le maillon faible, c'est souvent l'appareil lui-même."
            en="Believing one tool is enough; reusing your real number for an anonymous account; installing ten apps without changing habits; forgetting the weak link is often the device itself."
          />
        </p>
      </Box>
      <h4><T fr="La souveraineté est collective" en="Sovereignty is collective" /></h4>
      <p>
        <T
          fr={<>Une messagerie chiffrée ne sert que si votre interlocuteur l'utilise aussi. Faites migrer vos contacts, votre famille, votre communauté. Changer d'outils, c'est <strong>voter avec ses usages</strong> : chaque personne qui quitte les plateformes de surveillance affaiblit le modèle.</>}
          en={<>An encrypted messenger only works if the other person uses it too. Bring your contacts, family and community along. Switching tools is <strong>voting with your usage</strong>: every person who leaves surveillance platforms weakens the model.</>}
        />
      </p>
      <h4><T fr="Agir politiquement" en="Act politically" /></h4>
      <p>
        <T
          fr={<>La technique ne remplace pas la politique. Le 9 juillet l'a montré : une <strong>majorité simple</strong> d'eurodéputés voulait rejeter le texte — c'est la procédure qui a manqué, pas l'opinion. Les trilogues sur Chat Control 2.0 reprennent en <strong>septembre 2026</strong> : suivez et soutenez <a href="https://fightchatcontrol.eu" target="_blank" rel="noopener noreferrer">fightchatcontrol.eu</a>, <a href="https://edri.org" target="_blank" rel="noopener noreferrer">EDRi</a>, le travail de <a href="https://www.patrick-breyer.de/en/posts/chat-control/" target="_blank" rel="noopener noreferrer">Patrick Breyer</a>, et contactez vos eurodéputés (voir la <a href="#allies">section Alliés</a>).</>}
          en={<>Technology doesn't replace politics. 9 July proved it: a <strong>simple majority</strong> of MEPs wanted the text gone — procedure failed, not opinion. Trilogues on Chat Control 2.0 resume in <strong>September 2026</strong>: follow and support <a href="https://fightchatcontrol.eu" target="_blank" rel="noopener noreferrer">fightchatcontrol.eu</a>, <a href="https://edri.org" target="_blank" rel="noopener noreferrer">EDRi</a>, <a href="https://www.patrick-breyer.de/en/posts/chat-control/" target="_blank" rel="noopener noreferrer">Patrick Breyer</a>'s work, and contact your MEPs (see the <a href="#allies">Allies section</a>).</>}
        />
      </p>
      <div className="manifesto">
        <div className="eyebrow"><T fr="Manifeste" en="Manifesto" /></div>
        <p>
          <T
            fr={<>Refuser une surveillance de masse illégitime n'est pas se cacher : c'est un acte citoyen, légal et pacifique. La vie privée est un droit, pas un aveu. Chiffrer, c'est <strong>voter</strong>. S'auto-héberger, c'est <strong>désobéir</strong>. Reprendre ses outils, c'est <strong>devenir ingouvernable</strong>.</>}
            en={<>Refusing illegitimate mass surveillance is not hiding: it is a lawful, peaceful, civic act. Privacy is a right, not a confession. To encrypt is to <strong>vote</strong>. To self-host is to <strong>disobey</strong>. To reclaim your tools is to <strong>become ungovernable</strong>.</>}
          />
        </p>
      </div>
      <p>
        <T
          fr={<>Ce guide ne vit que s'il circule. Envoyez-le à trois personnes, imprimez-le pour ceux qui n'ont pas ce réflexe, gardez la <a href="/exitchatcontrol-offline.html">copie hors-ligne</a>.</>}
          en={<>This guide only lives if it travels. Send it to three people, print it for those who wouldn't find it, keep the <a href="/exitchatcontrol-offline.html">offline copy</a>.</>}
        />
      </p>
      <ShareRow />
    </section>
  )
}
