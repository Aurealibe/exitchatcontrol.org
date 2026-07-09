import { T } from '../lib/i18n'
import { Box, Cite, PartHead, Profiles, TableWrap } from '../components/ui'

export function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-inner">
        <span className="stamp">
          <T fr="Surveillance de masse · UE · 2026" en="Mass surveillance · EU · 2026" />
        </span>
        <div className="eyebrow">
          <T fr="Manuel de souveraineté numérique" en="A digital sovereignty field manual" />
        </div>
        <h1>
          <T fr={<>Devenir<br />Ingouvernable</>} en={<>Becoming<br />Ungovernable</>} />
          <span className="cursor" aria-hidden="true">_</span>
        </h1>
        <p className="lede">
          <T
            fr="Chat Control veut scanner vos messages privés. Voici comment reprendre le contrôle de vos conversations, de vos données et de vos outils, étape par étape, du débutant au lanceur d'alerte."
            en="Chat Control wants to scan your private messages. Here is how to take back control of your conversations, your data and your tools, step by step, from beginner to whistleblower."
          />
        </p>
        <div className="hero-meta">
          <span className="tag">🟢 <T fr="Citoyen" en="Citizen" /></span>
          <span className="tag">🟡 <T fr="Compte pseudonyme" en="Pseudonymous account" /></span>
          <span className="tag">🔴 <T fr="Lanceur d'alerte" en="Whistleblower" /></span>
        </div>
      </div>
    </header>
  )
}

export function StatusBanner() {
  return (
    <div className="status">
      <div className="wrap">
        <span className="dot" aria-hidden="true"></span>
        <div>
          <b>
            <T fr="Dernière minute : 9 juillet 2026" en="Breaking: 9 July 2026" />
          </b>
          <p>
            <T
              fr={
                <>
                  Le Parlement européen a laissé passer <strong>Chat Control 1.0</strong>. La motion de rejet a
                  échoué : 314 eurodéputés contre le texte, 276 pour, 17 abstentions, mais il fallait 361 voix pour
                  le bloquer.
                  <Cite href="https://www.patrick-breyer.de/en/eu-parliament-greenlights-chat-control-1-0-breyer-our-children-lose-out/" title="Patrick Breyer · vote du 9 juillet 2026" />{' '}
                  Le scan « volontaire » des messages est autorisé jusqu'au <strong>3 avril 2028</strong>. En
                  parallèle, le 5<sup>e</sup> trilogue sur <strong>Chat Control 2.0 (CSAR)</strong> a échoué le 29
                  juin ; les négociations continuent. La menace n'est pas passée, elle s'installe.
                </>
              }
              en={
                <>
                  The European Parliament let <strong>Chat Control 1.0</strong> through. The motion to reject
                  failed: 314 MEPs against the text, 276 in favour, 17 abstentions, but 361 votes were needed to
                  block it.
                  <Cite href="https://www.patrick-breyer.de/en/eu-parliament-greenlights-chat-control-1-0-breyer-our-children-lose-out/" title="Patrick Breyer · 9 July 2026 vote" />{' '}
                  "Voluntary" message scanning is now allowed until <strong>3 April 2028</strong>. Meanwhile the 5
                  <sup>th</sup> trilogue on <strong>Chat Control 2.0 (CSAR)</strong> collapsed on 29 June;
                  negotiations continue. The threat hasn't passed, it's settling in.
                </>
              }
            />
          </p>
        </div>
      </div>
    </div>
  )
}

const TOC: { href: string; p: string; fr: string; en: string }[] = [
  { href: '#menace', p: '00', fr: 'Comprendre la menace', en: 'Understand the threat' },
  { href: '#precedents', p: '⏱', fr: 'Les précédents (1993-2026)', en: 'The precedents (1993-2026)' },
  { href: '#memo', p: '★', fr: 'À supprimer / À adopter', en: 'Delete / Adopt' },
  { href: '#messagerie', p: '01', fr: 'Messagerie chiffrée', en: 'Encrypted messaging' },
  { href: '#email', p: '02', fr: 'E-mail chiffré & PGP', en: 'Encrypted email & PGP' },
  { href: '#navigateur', p: '03', fr: 'Navigateur & recherche', en: 'Browser & search' },
  { href: '#dns', p: '◦', fr: 'DNS chiffré & Cloudflare', en: 'Encrypted DNS & Cloudflare' },
  { href: '#vpn', p: '04', fr: 'VPN : la vérité', en: 'VPN: the truth' },
  { href: '#censure', p: '✋', fr: 'Censure & identité', en: 'Censorship & ID' },
  { href: '#proton', p: '05', fr: 'Quitter Google (Proton)', en: 'Leave Google (Proton)' },
  { href: '#stockage', p: '06', fr: 'Stockage chiffré', en: 'Encrypted storage' },
  { href: '#motsdepasse', p: '07', fr: 'Mots de passe', en: 'Passwords' },
  { href: '#deuxfa', p: '◦', fr: '2FA & clés matérielles', en: '2FA & hardware keys' },
  { href: '#social', p: '08', fr: 'Réseaux décentralisés', en: 'Decentralised social' },
  { href: '#argent', p: '09', fr: 'Souveraineté financière', en: 'Financial sovereignty' },
  { href: '#ia', p: '⚠', fr: 'IA conversationnelle', en: 'Conversational AI' },
  { href: '#boiteaoutils', p: '◦', fr: 'Boîte à outils quotidienne', en: 'Everyday toolbox' },
  { href: '#selfhost', p: '10', fr: 'Auto-hébergement', en: 'Self-hosting' },
  { href: '#tor', p: '11', fr: 'Tor', en: 'Tor' },
  { href: '#os', p: '12', fr: 'OS libres & Linux', en: 'Free OS & Linux' },
  { href: '#telephonie', p: '◦', fr: 'Téléphonie & appareil', en: 'Telephony & device' },
  { href: '#opsec', p: '13', fr: 'Anonymat & OPSEC', en: 'Anonymity & OPSEC' },
  { href: '#ecosysteme', p: '14', fr: "L'écosystème libre", en: 'The free ecosystem' },
  { href: '#allies', p: '🤝', fr: 'Les initiatives alliées', en: 'Allied initiatives' },
  { href: '#action', p: '15', fr: "Passer à l'action", en: 'Take action' },
]

export function Toc() {
  return (
    <nav className="toc" aria-label="Sommaire — Contents">
      <h2>
        <T fr="Sommaire" en="Contents" />
      </h2>
      <ol>
        {TOC.map((e) => (
          <li key={e.href}>
            <a href={e.href}>
              <span className="p">{e.p}</span>
              <T fr={e.fr} en={e.en} />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function Threat() {
  return (
    <section id="menace">
      <PartHead
        num={<>PARTIE 00 · <T fr="LE POURQUOI" en="THE WHY" /></>}
        title={<T fr="Comprendre la menace" en="Understand the threat" />}
        intro={
          <T
            fr="Avant de changer d'outils, il faut comprendre ce contre quoi on se protège. Sinon, on installe des applications au hasard et on se croit protégé alors qu'on ne l'est pas."
            en="Before you change tools, understand what you are protecting against. Otherwise you install random apps and feel safe when you are not."
          />
        }
      />

      <h3>
        <T fr="Chat Control 1.0 et 2.0, en clair" en="Chat Control 1.0 and 2.0, plainly" />
      </h3>
      <p>
        <T
          fr="« Chat Control » est le surnom donné à deux textes européens qui autorisent (ou imposeraient) le scan de vos messages privés à la recherche de contenus pédocriminels (CSAM). L'objectif affiché est légitime ; le moyen employé, le scan généralisé des communications de personnes non suspectes, revient à une surveillance de masse."
          en={`"Chat Control" is the nickname for two EU texts that allow (or would require) scanning your private messages for child sexual abuse material (CSAM). The stated goal is legitimate; the method, blanket scanning of the communications of unsuspected people, amounts to mass surveillance.`}
        />
      </p>
      <TableWrap>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Chat Control 1.0</th>
              <th>Chat Control 2.0 (CSAR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><T fr="Texte" en="Text" /></td>
              <td><T fr="Règlement (UE) 2021/1232, dérogation à la directive ePrivacy" en="Regulation (EU) 2021/1232, ePrivacy derogation" /></td>
              <td><T fr="Proposition COM/2022/209 (Ylva Johansson, mai 2022)" en="Proposal COM/2022/209 (Ylva Johansson, May 2022)" /></td>
            </tr>
            <tr>
              <td><T fr="Nature du scan" en="Scanning" /></td>
              <td><T fr={<>Volontaire, les plateformes <em>peuvent</em> scanner</>} en={<>Voluntary, platforms <em>may</em> scan</>} /></td>
              <td><T fr="Obligatoire via « ordres de détection » et « mesures d'atténuation des risques »" en={`Mandatory via "detection orders" and "risk-mitigation measures"`} /></td>
            </tr>
            <tr>
              <td><T fr="Qui est visé" en="Who" /></td>
              <td><T fr="Surtout services US non chiffrés : Gmail, Messenger/Instagram, Skype, Snapchat, iCloud Mail, Xbox" en="Mostly unencrypted US services: Gmail, Messenger/Instagram, Skype, Snapchat, iCloud Mail, Xbox" /></td>
              <td><T fr={<><strong>Toutes</strong> les plateformes, y compris les messageries chiffrées de bout en bout</>} en={<><strong>All</strong> platforms, including end-to-end encrypted messengers</>} /></td>
            </tr>
            <tr>
              <td><T fr="Durée" en="Duration" /></td>
              <td><T fr="Temporaire, prolongé jusqu'au 3 avril 2028" en="Temporary, extended to 3 April 2028" /></td>
              <td><T fr="Permanent" en="Permanent" /></td>
            </tr>
            <tr>
              <td><T fr="Statut (juil. 2026)" en="Status (Jul 2026)" /></td>
              <td><T fr="Adopté le 9 juillet 2026" en="Adopted 9 July 2026" /></td>
              <td><T fr={<>En négociation, 5<sup>e</sup> trilogue échoué le 29 juin</>} en={<>Under negotiation, 5<sup>th</sup> trilogue failed 29 June</>} /></td>
            </tr>
          </tbody>
        </table>
      </TableWrap>

      <h3>
        <T fr="Le scan côté client : le mouchard légal" en="Client-side scanning: the legal wiretap" />
      </h3>
      <p>
        <T
          fr={<>Le cœur de Chat Control 2.0 est une technique appelée <strong>scan côté client</strong> (<em>client-side scanning</em>). L'idée : au lieu de casser le chiffrement pendant le transport, on installe un logiciel <strong>directement sur votre téléphone</strong> qui inspecte chaque message, photo ou lien <strong>avant</strong> qu'il ne soit chiffré et envoyé. Signal résume ça d'une phrase : c'est « comme un malware sur votre appareil ».</>}
          en={<>The heart of Chat Control 2.0 is a technique called <strong>client-side scanning</strong>. The idea: instead of breaking encryption in transit, software is installed <strong>directly on your phone</strong> to inspect every message, photo or link <strong>before</strong> it is encrypted and sent. Signal put it in one line: it is "like malware on your device".</>}
        />
      </p>
      <Box tone="honest" label={<T fr="Honnêteté technique, à lire deux fois" en="Technical honesty, read twice" />}>
        <p>
          <T
            fr={<>Contre le scan côté client, <strong>ni un VPN ni le chiffrement de bout en bout ne suffisent</strong> si l'application ou le système d'exploitation coopère. Le scan a lieu sur l'appareil, avant chiffrement : le VPN ne voit rien à protéger, et le chiffrement intervient trop tard. Ce qui protège réellement, c'est de choisir des logiciels <strong>libres qui refusent d'implémenter le scan</strong>, des <strong>juridictions</strong> favorables, <strong>l'auto-hébergement</strong>, et de <strong>reprendre le contrôle de son appareil</strong> (un OS non piégé). Tout le reste de ce guide découle de cette vérité.</>}
            en={<>Against client-side scanning, <strong>neither a VPN nor end-to-end encryption is enough</strong> if the app or the operating system cooperates. The scan happens on the device, before encryption: the VPN has nothing to protect, and encryption kicks in too late. What actually protects you is choosing <strong>free/open-source software that refuses to implement scanning</strong>, favourable <strong>jurisdictions</strong>, <strong>self-hosting</strong>, and <strong>taking back control of your device</strong> (an untampered OS). Everything else in this guide follows from this truth.</>}
          />
        </p>
      </Box>
      <Box tone="warn" label={<T fr="Le pire : l'outil ne marche même pas" en="Worst of all: the tool doesn't even work" />}>
        <p>
          <T
            fr={<>On sacrifie la vie privée de tous pour une technologie qui échoue. La propre étude du Parlement européen conclut qu'aucun système ne détecte ce contenu sans un taux d'erreur élevé (à cause du très grand nombre de messages, un faible taux de faux positifs produit des millions de fausses accusations). Les chiffres de la police irlandaise l'illustrent : sur les signalements automatiques, environ 20 % seulement correspondaient à du vrai contenu, et plus de 11 % étaient des faux positifs manifestes. Des travaux de référence (« Bugs in Our Pockets », 2021<Cite href="https://arxiv.org/abs/2110.07450" title="Bugs in Our Pockets: The Risks of Client-Side Scanning (Abelson et al., 2021)" />) montrent en plus que le scan côté client, une fois installé, est inévitablement détourné vers d'autres usages (terrorisme, droit d'auteur, opinions).</>}
            en={<>Everyone's privacy is sacrificed for a technology that fails. The European Parliament's own study concludes no system detects this content without a high error rate (because across billions of messages, even a tiny false-positive rate yields millions of false accusations). Irish police figures show it: of automated reports, only about 20% were actual material, and over 11% were outright false positives. Landmark research ("Bugs in Our Pockets," 2021<Cite href="https://arxiv.org/abs/2110.07450" title="Bugs in Our Pockets: The Risks of Client-Side Scanning (Abelson et al., 2021)" />) further shows that once client-side scanning is installed, it is inevitably repurposed (terrorism, copyright, opinions).</>}
          />
        </p>
      </Box>

      <h3>
        <T fr="Le prétexte : « protéger les enfants »" en={`The pretext: "protecting children"`} />
      </h3>
      <p>
        <T
          fr={<>Personne n'est contre la protection des mineurs, et c'est précisément ce qui en fait un levier si efficace. La lutte contre la pédocriminalité sert de <strong>cheval de Troie émotionnel</strong> : qui oserait s'y opposer ? Sous cette bannière, on fait accepter un principe qui, présenté seul, serait rejeté en bloc, l'inspection automatisée des communications privées de <strong>centaines de millions de personnes non suspectes</strong>. Les enfants sont le motif affiché ; la cible réelle, c'est le chiffrement et la vie privée de tous.</>}
          en={<>No one is against protecting minors, which is exactly what makes it such an effective lever. Fighting child abuse serves as an <strong>emotional Trojan horse</strong>: who would dare object? Under that banner, a principle is made acceptable that, on its own, would be flatly rejected, the automated inspection of the private communications of <strong>hundreds of millions of unsuspected people</strong>. Children are the stated motive; the real target is everyone's encryption and privacy.</>}
        />
      </p>
      <p>
        <T
          fr={<>Le plus révélateur : les entreprises qui poussent le plus fort pour ce scan sont celles dont le modèle économique <strong>est</strong> la surveillance. Le 19 mars 2026, un appel commun a exhorté les législateurs européens à pérenniser la détection « volontaire », signé par&nbsp;:</>}
          en={<>The tell: the companies pushing hardest for this scanning are the ones whose business model <strong>is</strong> surveillance. On 19 March 2026, a joint appeal urged EU lawmakers to entrench "voluntary" detection, signed by:</>}
        />
      </p>
      <div className="namewall" aria-label="Google, LinkedIn, Snapchat, Microsoft, TikTok, Meta">
        <span>Google</span><span>LinkedIn</span><span>Snapchat</span><span>Microsoft</span><span>TikTok</span><span>Meta</span>
      </div>
      <blockquote className="pull">
        <T
          fr="« Ne pas agir serait irresponsable. » L'argument des géants de la tech pour maintenir le scan des messages."
          en={`"Failure to do so would be irresponsible." The tech giants' argument for keeping message scanning alive.`}
        />
      </blockquote>
      <p>
        <T
          fr={<>Ces mêmes acteurs ont d'ailleurs annoncé vouloir <strong>continuer à scanner</strong> les messages même après l'expiration de la base légale, le 4 avril 2026. On demande donc aux citoyens de confier l'inspection de leurs conversations intimes aux entreprises précisément connues pour aspirer et monétiser leurs données. Voilà le vrai visage de Chat Control : une <strong>attaque contre la vie privée</strong> emballée dans un motif que personne ne peut refuser.</>}
          en={<>Those same players even announced they would <strong>keep scanning</strong> messages after the legal basis lapsed on 4 April 2026. Citizens are thus asked to entrust the inspection of their intimate conversations to the very companies known for harvesting and monetising their data. This is the real face of Chat Control: an <strong>attack on privacy</strong> wrapped in a motive no one can refuse.</>}
        />
      </p>

      <h3>
        <T fr="Ce n'est pas « juste » de la surveillance" en={`This is not "just" surveillance`} />
      </h3>
      <p>
        <T
          fr="On cherche à vous rassurer : « ce n'est que Gmail, Instagram, Snapchat, Messenger ». C'est faux, et c'est même le plus scandaleux. Trois basculements se cachent derrière cette minimisation."
          en={`They try to reassure you: "it's only Gmail, Instagram, Snapchat, Messenger." That's false, and it's the most alarming part. Three shifts hide behind that downplaying.`}
        />
      </p>
      <ol>
        <li>
          <T
            fr={<><strong>Ce n'est pas du ciblage, c'est du ratissage.</strong> On ne surveille pas des suspects : on installe une collecte systématique des communications de populations entières. C'est de la surveillance à l'échelle étatique, en continu.</>}
            en={<><strong>It's not targeting, it's dragnet.</strong> This doesn't watch suspects: it installs systematic collection of entire populations' communications. Surveillance at state scale, continuously.</>}
          />
        </li>
        <li>
          <T
            fr={<><strong>Ce n'est plus lire, c'est pouvoir bloquer.</strong> Un logiciel qui inspecte un message avant son envoi peut aussi <strong>refuser de l'envoyer</strong>. Le scan côté client crée l'infrastructure de la censure préalable : bloquer une parole avant même qu'elle existe pour son destinataire.</>}
            en={<><strong>It's no longer reading, it's the power to block.</strong> Software that inspects a message before it's sent can also <strong>refuse to send it</strong>. Client-side scanning builds the infrastructure of prior censorship: blocking speech before it even reaches its recipient.</>}
          />
        </li>
        <li>
          <T
            fr={<><strong>Une fois l'infrastructure posée, elle sert à autre chose.</strong> Un dispositif construit « pour les enfants » devient un outil polyvalent de contrôle. Le motif change, la machine reste. La section suivante en donne <a href="#precedents">25 ans de preuves datées</a>.</>}
            en={<><strong>Once the infrastructure exists, it gets repurposed.</strong> A system built "for the children" becomes a general-purpose control tool. The motive changes; the machine stays. The next section gives <a href="#precedents">25 years of dated evidence</a>.</>}
          />
        </li>
      </ol>
      <Box tone="warn" label={<T fr="La suite logique : l'euro numérique" en="The logical next step: the digital euro" />}>
        <p>
          <T
            fr={<>La même logique s'apprête à toucher votre argent. Le projet d'euro numérique de la BCE prévoit un <strong>plafond de détention d'environ 3 000 € par personne</strong>, interdit aux entreprises d'en détenir, et repose sur une monnaie <strong>traçable</strong>. La BCE jure qu'elle ne sera pas « programmable », mais le plafond et la traçabilité, eux, sont bien au programme, et le cadre a été validé en commission au Parlement européen en juin 2026. Le jour venu, entendrez-vous « tranquille, c'est seulement jusqu'à 3 000 € » ? C'est exactement le même piège rhétorique que « ce n'est que Gmail ». La vraie question n'est jamais ce qui est contrôlé aujourd'hui, mais l'infrastructure de contrôle que l'on installe pour demain.</>}
            en={<>The same logic is about to reach your money. The ECB's digital euro plan includes a <strong>holding cap of about €3,000 per person</strong>, bars companies from holding any, and rests on a <strong>traceable</strong> currency. The ECB swears it won't be "programmable," but the cap and the traceability are very much on the menu, and the framework cleared committee in the European Parliament in June 2026. When it lands, will you say "relax, it's only up to €3,000"? That's the very same rhetorical trap as "it's only Gmail." The real question is never what is controlled today, but the control infrastructure being installed for tomorrow.</>}
          />
        </p>
      </Box>

      <h3>
        <T fr="À quel profil appartenez-vous ?" en="Which profile are you?" />
      </h3>
      <p>
        <T
          fr="Aucun outil n'est magique et personne n'a besoin de tout faire. Repérez votre profil : chaque section indiquera jusqu'où aller."
          en="No tool is magic and nobody needs to do everything. Find your profile: each section tells you how far to go."
        />
      </p>
      <Profiles />
    </section>
  )
}

export function Memo() {
  return (
    <section id="memo">
      <PartHead
        num={<>MÉMO · <T fr="LE GRAND REMPLACEMENT NUMÉRIQUE" en="THE DIGITAL SWAP" /></>}
        title={<T fr="À supprimer / À adopter" en="Delete / Adopt" />}
        intro={
          <T
            fr="La vue d'ensemble en un coup d'œil. Le détail de chaque outil suit dans les sections numérotées."
            en="The big picture at a glance. Each tool is detailed in the numbered sections below."
          />
        }
      />
      <div className="swap">
        <div className="swap-col del">
          <div className="swap-h"><T fr="À supprimer" en="Delete" /></div>
          <ul>
            <li>WhatsApp <b>(Meta)</b></li>
            <li>Messenger <b>(Meta)</b></li>
            <li>Instagram <b>(Meta)</b></li>
            <li>Snapchat</li>
            <li>Skype <b>(Microsoft)</b></li>
            <li>Discord</li>
            <li>Gmail <b>(Google)</b></li>
            <li>Outlook <b>(Microsoft)</b></li>
            <li>Google Drive / Photos</li>
            <li>OneDrive <b>(Microsoft)</b></li>
            <li>TikTok</li>
            <li>Telegram <T fr="(chats normaux)" en="(normal chats)" /></li>
          </ul>
        </div>
        <div className="swap-col keep">
          <div className="swap-h"><T fr="À adopter" en="Adopt" /></div>
          <ul>
            <li>Signal</li>
            <li>SimpleX Chat</li>
            <li>Session</li>
            <li>Bitchat</li>
            <li>Element <b>(Matrix)</b></li>
            <li>Nostr</li>
            <li>Mastodon</li>
            <li>Proton Mail</li>
            <li>Tuta Mail</li>
            <li>Mullvad <T fr="(VPN & navigateur)" en="(VPN & browser)" /></li>
            <li>GrapheneOS</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
