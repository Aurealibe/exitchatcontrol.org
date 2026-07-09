import { T } from '../lib/i18n'
import { Box, Lvl, PartHead, TableWrap } from '../components/ui'
import { ToolCard, type Tool } from '../components/ToolCard'

/* PART 01 · Encrypted messaging + PART 02 · Email + PART 03 · Browser/search
   + DNS — content ported verbatim from v1 (both languages). */

const MESSAGING: Tool[] = [
  {
    id: 't-signal',
    name: 'Signal',
    slug: 'signal',
    tile: 'S',
    brand: '#3a76f0',
    levels: ['b', 'i', 'a'],
    tags: [
      <T key="l" fr="🟢 Débutant" en="🟢 Beginner" />,
      <T key="r" fr="Remplace WhatsApp" en="Replaces WhatsApp" />,
      '🇺🇸 · open-source',
    ],
    what: (
      <T
        fr="Une messagerie chiffrée pour vos textos, appels, visios et groupes. C'est le remplaçant direct de WhatsApp, en aussi simple."
        en="An encrypted messenger for your texts, calls, video and groups. The direct replacement for WhatsApp, just as simple."
      />
    ),
    why: (
      <T
        fr="Chiffrement de bout en bout par défaut, à but non lucratif, protocole audité qui sert de référence mondiale. Presque aucune métadonnée conservée, et l'équipe a promis de quitter l'UE plutôt que d'installer un scan."
        en="End-to-end encryption by default, non-profit, an audited protocol that is the world standard. Almost no metadata kept, and the team has pledged to leave the EU rather than install scanning."
      />
    ),
    who: (
      <T
        fr="Tout le monde, dès aujourd'hui. C'est le premier geste et le plus utile. Seule contrainte : un numéro de téléphone, que l'on peut masquer derrière un nom d'utilisateur."
        en="Everyone, starting today. It's the first and most useful step. One catch: a phone number, which you can hide behind a username."
      />
    ),
    steps: [
      <T key="1" fr={<>Installez depuis <b>signal.org</b> (App Store, Google Play, ou l'APK direct sur Android).</>} en={<>Install from <b>signal.org</b> (App Store, Google Play, or the direct APK on Android).</>} />,
      <T key="2" fr="Confirmez votre numéro par SMS, puis choisissez un code PIN." en="Confirm your number by SMS, then set a PIN." />,
      <T key="3" fr={<>Réglages &gt; Confidentialité : créez un <b>nom d'utilisateur</b> pour cacher votre numéro, et activez le <b>verrou d'inscription</b>.</>} en={<>Settings &gt; Privacy: create a <b>username</b> to hide your number, and turn on <b>registration lock</b>.</>} />,
      <T key="4" fr="Invitez vos proches. Sur ordinateur, liez l'application de bureau à votre téléphone." en="Invite your contacts. On desktop, link the desktop app to your phone." />,
    ],
    links: [{ label: 'signal.org →', href: 'https://signal.org' }],
  },
  {
    id: 't-simplex',
    name: 'SimpleX Chat',
    tile: 'SX',
    brand: '#1e63d0',
    levels: ['i', 'a'],
    tags: [
      <T key="l" fr="🟡 Intermédiaire" en="🟡 Intermediate" />,
      <T key="r" fr="Sans identifiant" en="No identifier" />,
      '🌍 · open-source',
    ],
    what: (
      <T
        fr="Une messagerie chiffrée sans aucun compte, sans numéro et sans identifiant. On se connecte en partageant un lien ou un QR code."
        en="An encrypted messenger with no account, no number and no identifier. You connect by sharing a link or QR code."
      />
    ),
    why: (
      <T
        fr="Par conception, même les serveurs ignorent qui parle à qui. C'est aujourd'hui l'option la plus protectrice contre la corrélation des métadonnées."
        en="By design, even the servers can't know who talks to whom. It's currently the strongest option against metadata correlation."
      />
    ),
    who: (
      <T
        fr="Comptes pseudonymes, contacts sensibles, haut risque. Un peu plus jeune que Signal, avec quelques aspérités."
        en="Pseudonymous accounts, sensitive contacts, high-risk. A bit younger than Signal, with a few rough edges."
      />
    ),
    steps: [
      <T key="1" fr={<>Installez depuis <b>simplex.chat</b> (F-Droid, Google Play, App Store ou APK).</>} en={<>Install from <b>simplex.chat</b> (F-Droid, Google Play, App Store or APK).</>} />,
      <T key="2" fr={<>Choisissez un nom d'affichage <b>local</b> (jamais votre vrai nom : il ne quitte pas votre appareil).</>} en={<>Pick a <b>local</b> display name (never your real name: it stays on your device).</>} />,
      <T key="3" fr={<>Pour ajouter un contact, partagez un <b>lien d'invitation à usage unique</b> ou un QR code.</>} en={<>To add a contact, share a <b>one-time invitation link</b> or a QR code.</>} />,
      <T key="4" fr="Activez le verrou par code, et (avancé) configurez vos propres serveurs SMP." en="Turn on the passcode lock, and (advanced) configure your own SMP servers." />,
    ],
    links: [{ label: 'simplex.chat →', href: 'https://simplex.chat' }],
  },
  {
    id: 't-session',
    name: 'Session',
    slug: 'session',
    tile: 'Se',
    brand: '#178a5a',
    levels: ['i', 'a'],
    tags: [
      <T key="l" fr="🟡 Intermédiaire" en="🟡 Intermediate" />,
      <T key="r" fr="Sans numéro" en="No phone" />,
      '🌍 · open-source',
    ],
    what: (
      <T
        fr="Un chiffrement à la Signal, mais sans numéro de téléphone et avec un routage en oignon."
        en="Signal-grade encryption, but with no phone number and onion routing."
      />
    ),
    why: (
      <T
        fr="Votre identité est un « Session ID » aléatoire. Le trafic passe par un réseau décentralisé (Lokinet) qui réduit fortement les métadonnées."
        en={`Your identity is a random "Session ID." Traffic goes through a decentralised network (Lokinet) that sharply reduces metadata.`}
      />
    ),
    who: (
      <T
        fr="Quand un numéro de téléphone est un risque. Écosystème plus petit, à réserver aux échanges qui comptent."
        en="When a phone number is a liability. Smaller ecosystem, best kept for conversations that matter."
      />
    ),
    steps: [
      <T key="1" fr={<>Installez depuis <b>getsession.org</b> (toutes plateformes).</>} en={<>Install from <b>getsession.org</b> (all platforms).</>} />,
      <T key="2" fr={<>« Create account » génère votre Session ID et une <b>phrase de récupération</b>.</>} en={<>"Create account" generates your Session ID and a <b>recovery phrase</b>.</>} />,
      <T key="3" fr="Notez la phrase de récupération sur papier : c'est la seule clé de votre compte." en="Write the recovery phrase on paper: it's the only key to your account." />,
      <T key="4" fr="Partagez votre Session ID (ou QR) à vos contacts." en="Share your Session ID (or QR) with your contacts." />,
    ],
    links: [{ label: 'getsession.org →', href: 'https://getsession.org' }],
  },
  {
    id: 't-briar',
    name: 'Briar',
    tile: 'Br',
    brand: '#c1272d',
    levels: ['a'],
    tags: [
      <T key="l" fr="🔴 Avancé" en="🔴 Advanced" />,
      <T key="r" fr="Hors-ligne / P2P" en="Offline / P2P" />,
      'Android · open-source',
    ],
    what: (
      <T
        fr={<>Une messagerie pair-à-pair qui fonctionne <b>sans internet</b> : par Bluetooth, Wi-Fi Direct ou Tor.</>}
        en={<>A peer-to-peer messenger that works <b>with no internet</b>: over Bluetooth, Wi-Fi Direct or Tor.</>}
      />
    ),
    why: (
      <T
        fr="Aucun serveur, donc rien à couper ni à saisir. Résiste aux coupures d'internet et à la censure réseau."
        en="No server, so nothing to shut down or seize. Survives internet shutdowns and network censorship."
      />
    ),
    who: (
      <T
        fr="Manifestations, catastrophes, zones isolées, blackout. Android uniquement, et les deux personnes doivent avoir l'application."
        en="Protests, disasters, remote areas, blackouts. Android only, and both people need the app."
      />
    ),
    steps: [
      <T key="1" fr={<>Installez depuis <b>briarproject.org</b> ou F-Droid (pas d'iOS).</>} en={<>Install from <b>briarproject.org</b> or F-Droid (no iOS).</>} />,
      <T key="2" fr={<>Créez un compte <b>local</b> (pseudo + mot de passe), stocké seulement sur le téléphone.</>} en={<>Create a <b>local</b> account (nickname + password), stored only on the phone.</>} />,
      <T key="3" fr="Ajoutez un contact proche en scannant son QR code, ou à distance via un lien." en="Add a nearby contact by scanning their QR code, or remotely via a link." />,
      <T key="4" fr="Quand le réseau est coupé, activez le Bluetooth : les messages passent d'appareil à appareil." en="When the network is down, turn on Bluetooth: messages hop device to device." />,
    ],
    links: [{ label: 'briarproject.org →', href: 'https://briarproject.org' }],
  },
  {
    id: 't-bitchat',
    name: 'Bitchat',
    tile: 'bit',
    brand: '#e8871e',
    levels: ['a'],
    tags: [
      <T key="l" fr="🔴 Avancé" en="🔴 Advanced" />,
      <T key="r" fr="Mesh Bluetooth" en="Bluetooth mesh" />,
      '🌍 · open-source',
    ],
    what: (
      <T
        fr="La messagerie mesh de Jack Dorsey : les téléphones proches se relaient les messages de proche en proche, sans internet ni serveur ni compte."
        en="Jack Dorsey's mesh messenger: nearby phones relay messages hop by hop, with no internet, server or account."
      />
    ),
    why: (
      <T
        fr="Chiffrement de bout en bout (AES-256-GCM) et un « mode panique » qui efface tout en trois tapotements sur le logo."
        en={`End-to-end encryption (AES-256-GCM) and a "panic mode" that wipes everything with three taps on the logo.`}
      />
    ),
    who: (
      <T
        fr="Manifestations et blackout, en complément de Briar. À utiliser avec prudence."
        en="Protests and blackouts, alongside Briar. Use with caution."
      />
    ),
    caution: {
      label: <T fr="Prudence : non audité" en="Caution: unaudited" />,
      body: (
        <T
          fr="Son propre dépôt avertit qu'il « n'a pas reçu de revue de sécurité externe ». Génial pour la résilience, mais n'en faites pas dépendre des vies pour l'instant."
          en={`Its own repo warns it "has not received external security review." Great for resilience, but don't stake lives on it yet.`}
        />
      ),
    },
    steps: [
      <T key="1" fr="Installez depuis l'App Store (iOS) ou l'APK/GitHub (Android)." en="Install from the App Store (iOS) or the APK/GitHub (Android)." />,
      <T key="2" fr="Ouvrez l'application et choisissez un pseudo. Aucun compte à créer." en="Open the app and pick a nickname. No account to create." />,
      <T key="3" fr="Les appareils proches se découvrent automatiquement en Bluetooth." en="Nearby devices auto-discover over Bluetooth." />,
      <T key="4" fr="En cas de danger, triple-tapez le logo pour tout effacer (mode panique)." en="In danger, triple-tap the logo to wipe everything (panic mode)." />,
    ],
    links: [{ label: 'bitchat →', href: 'https://bitchat.free' }],
  },
  {
    id: 't-molly',
    name: 'Molly',
    tile: 'M',
    brand: '#6d4bb3',
    levels: ['a'],
    tags: [
      <T key="l" fr="🔴 Avancé" en="🔴 Advanced" />,
      <T key="r" fr="Signal durci" en="Hardened Signal" />,
      'Android · open-source',
    ],
    what: (
      <T
        fr="Une version durcie de Signal pour Android, compatible avec le même réseau."
        en="A hardened build of Signal for Android, compatible with the same network."
      />
    ),
    why: (
      <T
        fr="Base de données chiffrée au repos, verrouillage automatique, et une variante « FOSS » entièrement sans services Google."
        en={`Database encrypted at rest, automatic locking, and a "FOSS" variant fully free of Google services.`}
      />
    ),
    who: (
      <T
        fr="Utilisateurs avancés, notamment sur GrapheneOS, avec un modèle de menace élevé. Android uniquement."
        en="Advanced users, especially on GrapheneOS, with a high threat model. Android only."
      />
    ),
    steps: [
      <T key="1" fr={<>Ajoutez le dépôt Molly dans F-Droid, ou récupérez l'APK sur <b>molly.im</b>.</>} en={<>Add the Molly repo in F-Droid, or grab the APK from <b>molly.im</b>.</>} />,
      <T key="2" fr={<>Choisissez <b>Molly-FOSS</b> si vous voulez zéro dépendance Google.</>} en={<>Choose <b>Molly-FOSS</b> if you want zero Google dependencies.</>} />,
      <T key="3" fr="Enregistrez-vous avec votre numéro (même réseau que Signal)." en="Register with your number (same network as Signal)." />,
      <T key="4" fr="Définissez un mot de passe de base de données et le verrouillage automatique." en="Set a database password and automatic locking." />,
    ],
    links: [{ label: 'molly.im →', href: 'https://molly.im' }],
  },
]

const EMAIL: Tool[] = [
  {
    id: 't-protonmail',
    name: 'Proton Mail',
    slug: 'protonmail',
    tile: 'Pm',
    brand: '#6d4aff',
    levels: ['b', 'i'],
    tags: [
      <T key="l" fr="🟢 Débutant" en="🟢 Beginner" />,
      <T key="r" fr="Remplace Gmail" en="Replaces Gmail" />,
      '🇨🇭 · open-source · OpenPGP',
    ],
    what: (
      <T
        fr="Une boîte mail chiffrée qui remplace Gmail ou Outlook, et le compte pivot de tout l'écosystème Proton."
        en="An encrypted inbox that replaces Gmail or Outlook, and the pivot account for the whole Proton ecosystem."
      />
    ),
    why: (
      <T
        fr="Basé en Suisse, hors juridiction des « Five Eyes ». Compatible OpenPGP : chiffrement automatique entre comptes Proton et vers les autres services PGP."
        en={`Based in Switzerland, outside "Five Eyes" jurisdiction. OpenPGP-compatible: automatic encryption between Proton accounts and to other PGP services.`}
      />
    ),
    who: (
      <T
        fr="Tout le monde. C'est le meilleur point de départ pour quitter Google (voir section 05 pour le reste de la suite)."
        en="Everyone. It's the best starting point to leave Google (see section 05 for the rest of the suite)."
      />
    ),
    steps: [
      <T key="1" fr={<>Créez un compte sur <b>proton.me</b> (offre gratuite suffisante pour commencer).</>} en={<>Create an account at <b>proton.me</b> (the free tier is enough to start).</>} />,
      <T key="2" fr={<>Importez vos anciens messages et contacts avec <b>Easy Switch</b> (intégré).</>} en={<>Import your old messages and contacts with <b>Easy Switch</b> (built in).</>} />,
      <T key="3" fr="Mettez une redirection depuis Gmail et prévenez vos contacts de votre nouvelle adresse." en="Set up forwarding from Gmail and tell your contacts your new address." />,
      <T key="4" fr={<>Installez l'application mobile, activez la <b>double authentification</b>, et utilisez Proton Bridge si vous tenez à Thunderbird.</>} en={<>Install the mobile app, turn on <b>two-factor auth</b>, and use Proton Bridge if you want Thunderbird.</>} />,
    ],
    links: [{ label: 'proton.me/mail →', href: 'https://proton.me/mail' }],
  },
  {
    id: 't-tuta',
    name: 'Tuta',
    tile: 'Tu',
    brand: '#b01e2e',
    levels: ['b', 'i'],
    tags: [
      <T key="l" fr="🟢 Débutant" en="🟢 Beginner" />,
      <T key="r" fr="Remplace Gmail" en="Replaces Gmail" />,
      <T key="q" fr="🇩🇪 · open-source · post-quantique" en="🇩🇪 · open-source · post-quantum" />,
    ],
    what: (
      <T
        fr="Une messagerie e-mail allemande, entièrement open-source et sans aucun service Google."
        en="A German email service, fully open-source and free of any Google service."
      />
    ),
    why: (
      <T
        fr={<>Elle chiffre aussi <b>l'objet et une partie des métadonnées</b>, avec un chiffrement résistant à l'informatique quantique. Juridiction UE.</>}
        en={<>It also encrypts <b>the subject line and some metadata</b>, with post-quantum-resistant encryption. EU jurisdiction.</>}
      />
    ),
    who: (
      <T
        fr="Ceux qui veulent le maximum de métadonnées chiffrées et du 100 % libre. Elle n'utilise pas PGP : pour écrire chiffré à l'extérieur, on protège le message par mot de passe."
        en="Those who want maximum encrypted metadata and fully free software. It doesn't use PGP: to write encrypted to outsiders, you password-protect the message."
      />
    ),
    steps: [
      <T key="1" fr={<>Créez un compte sur <b>tuta.com</b> et installez l'application (disponible sur F-Droid).</>} en={<>Create an account at <b>tuta.com</b> and install the app (available on F-Droid).</>} />,
      <T key="2" fr="Pour écrire à un non-utilisateur de façon chiffrée : cliquez sur le cadenas et définissez un mot de passe, transmis à votre correspondant par un autre canal." en="To write encrypted to a non-user: click the lock and set a password, shared with your correspondent through another channel." />,
      <T key="3" fr="Activez la double authentification." en="Turn on two-factor authentication." />,
    ],
    links: [{ label: 'tuta.com →', href: 'https://tuta.com' }],
  },
  {
    id: 't-mailbox',
    name: 'mailbox.org · Posteo',
    tile: 'mx',
    /* one shade darker than the brand blue: #2a7de1 passes 4.5:1 with NO ink
       (white 4.10, dark 4.41) — #2470d4 lets white ink reach 4.83 */
    brand: '#2470d4',
    levels: ['b'],
    tags: [
      <T key="l" fr="🟢 Débutant" en="🟢 Beginner" />,
      <T key="r" fr="Mail classique éthique" en="Ethical classic mail" />,
      '🇩🇪 · UE · PGP',
    ],
    what: (
      <T
        fr="Deux fournisseurs de mail européens, éthiques et peu coûteux, avec support PGP côté serveur."
        en="Two ethical, low-cost European email providers, with server-side PGP support."
      />
    ),
    why: (
      <T
        fr="Respectueux de la vie privée et de l'écologie, sur des standards ouverts (IMAP, PGP). Ils fonctionnent avec n'importe quel logiciel de messagerie."
        en="Privacy- and eco-conscious, built on open standards (IMAP, PGP). They work with any mail client."
      />
    ),
    who: (
      <T
        fr="Ceux qui veulent un mail « classique » (relevé dans Thunderbird) mais éthique, plutôt qu'une messagerie chiffrée fermée."
        en={`Those who want a "classic" mailbox (read in Thunderbird) but ethical, rather than a closed encrypted app.`}
      />
    ),
    steps: [
      <T key="1" fr="Créez un compte (payant, de l'ordre de 1 à 3 € par mois)." en="Create an account (paid, roughly €1 to €3 per month)." />,
      <T key="2" fr="Activez le chiffrement PGP côté serveur (fonction « Guard » chez mailbox.org)." en={`Enable server-side PGP encryption (the "Guard" feature at mailbox.org).`} />,
      <T key="3" fr="Configurez le compte dans Thunderbird ou l'application mobile de votre choix." en="Set the account up in Thunderbird or the mobile app of your choice." />,
    ],
    links: [
      { label: 'mailbox.org →', href: 'https://mailbox.org' },
      { label: 'posteo.de →', href: 'https://posteo.de' },
    ],
  },
]

const BROWSERS: Tool[] = [
  {
    id: 't-mullvadbrowser',
    name: 'Mullvad Browser',
    slug: 'mullvad',
    tile: 'Mb',
    brand: '#2b4b8f',
    levels: ['i', 'a'],
    tags: [
      <T key="l" fr="🟡🔴 Interm. / Avancé" en="🟡🔴 Interm. / Advanced" />,
      <T key="r" fr="Anti-empreinte" en="Anti-fingerprint" />,
      '🇸🇪 · open-source',
    ],
    what: (
      <T
        fr="Le navigateur du Tor Browser, mais sans le réseau Tor : à utiliser avec votre VPN pour un ordinateur difficile à pister."
        en="The Tor Browser's browser, but without the Tor network: use it with your VPN for a hard-to-track desktop."
      />
    ),
    why: (
      <T
        fr={<>Développé avec le Tor Project, il est conçu pour que tous ses utilisateurs présentent la <b>même empreinte numérique</b>. Résultat : au lieu d'être unique et donc traçable, vous vous fondez dans la masse. C'est le meilleur choix de vie privée sur ordinateur.</>}
        en={<>Built with the Tor Project, it's designed so all its users present the <b>same digital fingerprint</b>. The result: instead of being unique and thus trackable, you blend into the crowd. It's the best privacy choice on desktop.</>}
      />
    ),
    who: (
      <T
        fr="Ceux qui veulent aller au-delà du simple blocage de pub, notamment les comptes pseudonymes et les profils exposés."
        en="Those who want to go beyond simple ad-blocking, especially pseudonymous accounts and exposed profiles."
      />
    ),
    steps: [
      <T key="1" fr={<>Téléchargez-le sur <b>mullvad.net/browser</b> (Windows, macOS, Linux).</>} en={<>Download it from <b>mullvad.net/browser</b> (Windows, macOS, Linux).</>} />,
      <T key="2" fr="Utilisez-le tel quel, sans le personnaliser : chaque extension ou réglage ajouté vous rend à nouveau identifiable." en="Use it as-is, without customising: every added extension or setting makes you identifiable again." />,
      <T key="3" fr="Associez-le à votre VPN pour masquer aussi votre adresse IP." en="Pair it with your VPN to also mask your IP address." />,
    ],
    links: [{ label: 'mullvad.net/browser →', href: 'https://mullvad.net/browser' }],
  },
  {
    id: 't-firefox',
    name: <T fr="Firefox (durci)" en="Firefox (hardened)" />,
    slug: 'firefoxbrowser',
    tile: 'Fx',
    brand: '#e66000',
    levels: ['b'],
    tags: [
      <T key="l" fr="🟢 Débutant" en="🟢 Beginner" />,
      <T key="r" fr="Remplace Chrome" en="Replaces Chrome" />,
      '🌍 · open-source',
    ],
    what: (
      <T
        fr="Le navigateur libre de référence pour un usage quotidien respectueux de la vie privée."
        en="The reference free browser for privacy-respecting daily use."
      />
    ),
    why: (
      <T
        fr={<>Contrairement à Chrome (un mouchard publicitaire de Google), Firefox est développé par une fondation et n'a pas d'intérêt à vous profiler. Avec quelques réglages (le guide <em>arkenfox</em>) et l'extension uBlock Origin, il devient très solide.</>}
        en={<>Unlike Chrome (a Google advertising tracker), Firefox is built by a foundation with no interest in profiling you. With a few tweaks (the <em>arkenfox</em> guide) and the uBlock Origin extension, it becomes very solid.</>}
      />
    ),
    who: <T fr="Tout le monde, comme navigateur principal au quotidien." en="Everyone, as a main daily browser." />,
    steps: [
      <T key="1" fr={<>Installez Firefox depuis <b>mozilla.org/firefox</b>.</>} en={<>Install Firefox from <b>mozilla.org/firefox</b>.</>} />,
      <T key="2" fr={<>Ajoutez l'extension <b>uBlock Origin</b> (blocage des pubs et traqueurs).</>} en={<>Add the <b>uBlock Origin</b> extension (ad and tracker blocking).</>} />,
      <T key="3" fr="Dans les réglages de vie privée, choisissez « Stricte », désactivez la télémétrie, et videz les cookies à la fermeture. Pour aller plus loin, appliquez le guide arkenfox." en={`In privacy settings, choose "Strict," disable telemetry, and clear cookies on close. To go further, apply the arkenfox guide.`} />,
    ],
    links: [{ label: 'mozilla.org/firefox →', href: 'https://www.mozilla.org/firefox' }],
  },
  {
    id: 't-brave',
    name: 'Brave',
    slug: 'brave',
    tile: 'Bv',
    brand: '#fb542b',
    levels: ['b'],
    tags: [
      <T key="l" fr="🟢 Débutant" en="🟢 Beginner" />,
      <T key="r" fr="Bloque tout par défaut" en="Blocks everything by default" />,
      '🌍 · open-source',
    ],
    what: (
      <T
        fr="Un navigateur basé sur Chromium qui bloque publicités et traqueurs par défaut, avec en prime une fenêtre privée connectée à Tor."
        en="A Chromium-based browser that blocks ads and trackers by default, with a bonus private window connected to Tor."
      />
    ),
    why: (
      <T
        fr="C'est l'option la plus simple pour quelqu'un qui vient de Chrome : même ergonomie, mais sans le pistage. Il bloque les pubs YouTube nativement, propose une visio chiffrée (Brave Talk, basée sur Jitsi) et un accès Tor en un clic, pratique pour récupérer un site bloqué."
        en="It's the simplest option for someone coming from Chrome: same feel, but without the tracking. It blocks YouTube ads natively, offers encrypted video (Brave Talk, based on Jitsi) and one-click Tor access, handy to reach a blocked site."
      />
    ),
    who: (
      <T
        fr="Les débutants qui veulent un changement indolore depuis Chrome. (Ignorez les fonctions crypto/pubs récompensées si elles ne vous intéressent pas.)"
        en="Beginners who want a painless switch from Chrome. (Ignore the crypto/rewarded-ads features if they don't interest you.)"
      />
    ),
    steps: [
      <T key="1" fr={<>Installez Brave depuis <b>brave.com</b>.</>} en={<>Install Brave from <b>brave.com</b>.</>} />,
      <T key="2" fr="Réglez les « Boucliers » (Shields) sur « agressif », et désactivez Brave Rewards si vous ne voulez pas de pubs." en={`Set "Shields" to "aggressive," and turn off Brave Rewards if you don't want ads.`} />,
      <T key="3" fr="Pour Tor : menu > « Nouvelle fenêtre privée avec Tor », puis attendez « Tor connecté »." en={`For Tor: menu > "New private window with Tor," then wait for "Tor connected."`} />,
    ],
    links: [{ label: 'brave.com →', href: 'https://brave.com' }],
  },
  {
    id: 't-ublock',
    name: 'uBlock Origin',
    slug: 'ublockorigin',
    tile: 'uB',
    brand: '#7a0d0d',
    levels: ['b'],
    tags: [
      <T key="l" fr="🟢 Débutant" en="🟢 Beginner" />,
      <T key="r" fr="Extension" en="Extension" />,
      '🌍 · open-source',
    ],
    what: (
      <T
        fr="L'extension de navigateur qui bloque publicités, traqueurs et scripts espions. Le geste le plus rentable, en dix secondes."
        en="The browser extension that blocks ads, trackers and spy scripts. The highest-return move, in ten seconds."
      />
    ),
    why: (
      <T
        fr="La publicité en ligne est le principal vecteur de surveillance et de profilage. La bloquer coupe l'essentiel du pistage, accélère les pages et réduit les risques de logiciels malveillants."
        en="Online advertising is the main vector of surveillance and profiling. Blocking it cuts most tracking, speeds up pages and reduces malware risk."
      />
    ),
    who: (
      <T fr="Tout le monde, sur Firefox comme sur les navigateurs Chromium." en="Everyone, on Firefox as well as Chromium browsers." />
    ),
    steps: [
      <T key="1" fr="Ouvrez le magasin d'extensions de votre navigateur et cherchez « uBlock Origin » (l'original, par Raymond Hill)." en={`Open your browser's extension store and search "uBlock Origin" (the original, by Raymond Hill).`} />,
      <T key="2" fr="Installez-le. Il fonctionne aussitôt, sans réglage nécessaire." en="Install it. It works right away, no setup needed." />,
    ],
    links: [{ label: 'ublockorigin.com →', href: 'https://ublockorigin.com' }],
  },
  {
    id: 't-search',
    name: 'DuckDuckGo · Brave Search · SearXNG',
    slug: 'duckduckgo',
    tile: '🔎',
    brand: '#de5833',
    levels: ['b', 'i'],
    tags: [
      <T key="l" fr="🟢🟡 Moteurs" en="🟢🟡 Search engines" />,
      <T key="r" fr="Remplace Google Search" en="Replaces Google Search" />,
    ],
    what: (
      <T
        fr="Des moteurs de recherche qui ne profilent pas chaque requête, contrairement à Google."
        en="Search engines that don't profile every query, unlike Google."
      />
    ),
    why: (
      <T
        fr={<>DuckDuckGo et Brave Search ne conservent pas d'historique lié à votre identité. Startpage vous sert des résultats Google sans le pistage. SearXNG va plus loin : c'est un métamoteur <b>auto-hébergeable</b>, la souveraineté jusque dans la barre de recherche.</>}
        en={<>DuckDuckGo and Brave Search keep no history tied to your identity. Startpage serves Google results without the tracking. SearXNG goes further: a <b>self-hostable</b> metasearch engine, sovereignty down to your search bar.</>}
      />
    ),
    who: (
      <T fr="Tout le monde. SearXNG vise ceux qui veulent héberger leur propre moteur." en="Everyone. SearXNG targets those who want to host their own engine." />
    ),
    steps: [
      <T key="1" fr="Dans les réglages de votre navigateur, changez le moteur par défaut pour DuckDuckGo, Brave Search ou Startpage." en="In your browser settings, change the default engine to DuckDuckGo, Brave Search or Startpage." />,
      <T key="2" fr="Pour SearXNG : utilisez une instance publique (annuaire sur searx.space) ou hébergez la vôtre (voir section 10)." en="For SearXNG: use a public instance (directory at searx.space) or host your own (see section 10)." />,
    ],
    links: [
      { label: 'duckduckgo.com →', href: 'https://duckduckgo.com' },
      { label: 'search.brave.com →', href: 'https://search.brave.com' },
      { label: 'searx.space →', href: 'https://searx.space' },
    ],
  },
]

const DNS: Tool[] = [
  {
    id: 't-quad9',
    name: 'Quad9',
    tile: '9',
    brand: '#1a5fb4',
    levels: ['b', 'i'],
    tags: [
      <T key="l" fr="🟢 Débutant" en="🟢 Beginner" />,
      <T key="r" fr="Anti-maliciel" en="Malware-blocking" />,
      <T key="j" fr="🇨🇭 à but non lucratif" en="🇨🇭 non-profit" />,
    ],
    what: (
      <T
        fr="Un résolveur DNS chiffré, suisse et à but non lucratif, qui bloque en plus les domaines malveillants connus."
        en="An encrypted, Swiss, non-profit DNS resolver that also blocks known malicious domains."
      />
    ),
    why: (
      <T
        fr="Juridiction suisse, pas de conservation de votre adresse IP, protection contre l'hameçonnage et les logiciels malveillants. Un excellent réglage « installer et oublier »."
        en={`Swiss jurisdiction, no retention of your IP address, protection against phishing and malware. An excellent "set and forget" choice.`}
      />
    ),
    who: (
      <T
        fr="Tout le monde, en particulier ceux qui veulent la simplicité et une bonne juridiction."
        en="Everyone, especially those who want simplicity and a good jurisdiction."
      />
    ),
    steps: [
      <T key="1" fr={<>Sur Android : Réglages &gt; Réseau &gt; <b>DNS privé</b> &gt; saisissez <b>dns.quad9.net</b>.</>} en={<>On Android: Settings &gt; Network &gt; <b>Private DNS</b> &gt; enter <b>dns.quad9.net</b>.</>} />,
      <T key="2" fr="Sur iPhone/Mac : installez le profil DoH depuis quad9.net. Sur PC : configurez le DNS-over-HTTPS dans le navigateur ou le système." en="On iPhone/Mac: install the DoH profile from quad9.net. On PC: set DNS-over-HTTPS in the browser or the system." />,
    ],
    links: [{ label: 'quad9.net →', href: 'https://quad9.net' }],
  },
  {
    id: 't-mullvaddns',
    name: 'Mullvad DNS · NextDNS',
    slug: 'mullvad',
    tile: 'DNS',
    brand: '#2b4b8f',
    levels: ['i'],
    tags: [
      <T key="l" fr="🟡 Intermédiaire" en="🟡 Intermediate" />,
      <T key="r" fr="Filtrage réseau" en="Network filtering" />,
    ],
    what: (
      <T
        fr="Deux résolveurs chiffrés qui bloquent en plus pubs et traqueurs pour tout l'appareil."
        en="Two encrypted resolvers that also block ads and trackers for the whole device."
      />
    ),
    why: (
      <T
        fr={<><b>Mullvad DNS</b> (Suède, no-log) est gratuit et propose des listes de blocage. <b>NextDNS</b> est très personnalisable, avec un tableau de bord et des profils par appareil, mais il est basé aux États-Unis et journalise par défaut (à désactiver dans les réglages).</>}
        en={<><b>Mullvad DNS</b> (Sweden, no-log) is free and offers blocklists. <b>NextDNS</b> is highly customisable, with a dashboard and per-device profiles, but it's US-based and logs by default (turn it off in settings).</>}
      />
    ),
    who: (
      <T
        fr="Ceux qui veulent un blocage des pubs à l'échelle du système, sans installer d'application par navigateur."
        en="Those who want system-wide ad-blocking without installing a per-browser extension."
      />
    ),
    steps: [
      <T key="1" fr="Mullvad DNS : utilisez l'adresse indiquée sur mullvad.net/help/dns comme DNS privé (même méthode que Quad9)." en="Mullvad DNS: use the address shown at mullvad.net/help/dns as your private DNS (same method as Quad9)." />,
      <T key="2" fr={<>NextDNS : créez un profil sur nextdns.io, <b>désactivez la journalisation</b>, puis appliquez la configuration à vos appareils.</>} en={<>NextDNS: create a profile at nextdns.io, <b>disable logging</b>, then apply the config to your devices.</>} />,
    ],
    links: [
      { label: 'mullvad.net/dns →', href: 'https://mullvad.net/help/dns-over-https-and-dns-over-tls' },
      { label: 'nextdns.io →', href: 'https://nextdns.io' },
    ],
  },
  {
    id: 't-cloudflare',
    name: <T fr="Cloudflare 1.1.1.1 (à nuancer)" en="Cloudflare 1.1.1.1 (with nuance)" />,
    slug: 'cloudflare',
    tile: 'CF',
    brand: '#f38020',
    levels: ['b'],
    tags: [
      <T key="l" fr="🟢 Débutant" en="🟢 Beginner" />,
      <T key="r" fr="Rapide mais centralisé" en="Fast but centralised" />,
      '🇺🇸',
    ],
    what: (
      <T
        fr="Le DNS chiffré 1.1.1.1 et l'application WARP de Cloudflare : rapides, gratuits, et un vrai progrès face au résolveur de votre FAI."
        en="Cloudflare's 1.1.1.1 encrypted DNS and WARP app: fast, free, and a real upgrade over your ISP's resolver."
      />
    ),
    why: (
      <T
        fr={<>C'est utile, avec un engagement de non-journalisation audité. Mais soyez lucide : Cloudflare se trouve déjà devant une immense partie du web (comme intermédiaire technique, il peut voir le trafic en clair vers ces sites). Y router aussi votre DNS revient à <b>concentrer encore plus de vos traces</b> chez une seule entreprise américaine soumise au droit américain.</>}
        en={<>It's useful, with an audited no-logging pledge. But be clear-eyed: Cloudflare already sits in front of a huge share of the web (as a technical middleman, it can see plaintext traffic to those sites). Routing your DNS there too means <b>concentrating even more of your footprint</b> with one US company under US law.</>}
      />
    ),
    who: (
      <T
        fr="Bon pour un usage courant et le blocage des maliciels (1.1.1.1 for Families). À éviter ou à diversifier pour un usage sensible : préférez alors Quad9 ou Mullvad DNS."
        en="Fine for everyday use and malware-blocking (1.1.1.1 for Families). Avoid or diversify for sensitive use: prefer Quad9 or Mullvad DNS instead."
      />
    ),
    links: [{ label: '1.1.1.1 →', href: 'https://one.one.one.one' }],
  },
  {
    id: 't-pihole',
    name: 'Pi-hole · AdGuard Home',
    slug: 'pihole',
    tile: 'π',
    brand: '#96060c',
    levels: ['a'],
    tags: [
      <T key="l" fr="🔴 Avancé" en="🔴 Advanced" />,
      <T key="r" fr="Blocage tout le réseau" en="Whole-network blocking" />,
      '🌍 · open-source',
    ],
    what: (
      <T
        fr={<>Un bloqueur de publicités et de traqueurs qui protège <b>tout votre réseau à la fois</b>, installé sur un petit ordinateur comme un Raspberry Pi.</>}
        en={<>An ad and tracker blocker that protects <b>your whole network at once</b>, installed on a small computer like a Raspberry Pi.</>}
      />
    ),
    why: (
      <T
        fr={<>Là où uBlock Origin protège un navigateur, Pi-hole filtre <b>chaque appareil</b> de la maison, y compris ceux où l'on ne peut pas installer d'extension : téléphones, téléviseurs connectés, objets connectés. Les pubs et traqueurs sont bloqués au niveau du DNS, avant même de se charger. <b>AdGuard Home</b> est une alternative à l'interface plus moderne.</>}
        en={<>Where uBlock Origin protects one browser, Pi-hole filters <b>every device</b> in the home, including those where you can't install an extension: phones, smart TVs, connected objects. Ads and trackers are blocked at the DNS level, before they even load. <b>AdGuard Home</b> is an alternative with a more modern interface.</>}
      />
    ),
    who: (
      <T
        fr="Les foyers qui veulent nettoyer tous leurs appareils d'un coup, et qui ont (ou veulent) un Raspberry Pi ou un petit serveur."
        en="Households that want to clean up all their devices at once, and who have (or want) a Raspberry Pi or small server."
      />
    ),
    steps: [
      <T key="1" fr="Sur un Raspberry Pi (ou un conteneur), lancez l'installeur officiel de Pi-hole." en="On a Raspberry Pi (or a container), run Pi-hole's official installer." />,
      <T key="2" fr="Dans les réglages de votre box/routeur, indiquez l'adresse du Pi-hole comme serveur DNS." en="In your router's settings, set the Pi-hole's address as the DNS server." />,
      <T key="3" fr="Désormais, tous les appareils connectés à votre réseau sont filtrés automatiquement." en="From now on, every device on your network is filtered automatically." />,
    ],
    links: [
      { label: 'pi-hole.net →', href: 'https://pi-hole.net' },
      { label: 'adguard home →', href: 'https://adguard.com/adguard-home' },
    ],
  },
]

export function Messaging() {
  return (
    <section id="messagerie">
      <PartHead
        num={<>PARTIE 01 · <T fr="LES FONDATIONS" en="FOUNDATIONS" /> · <Lvl n={1} /></>}
        title={<T fr="Messagerie chiffrée" en="Encrypted messaging" />}
        intro={
          <T
            fr="Le premier geste, celui qui protège le plus vite : quitter WhatsApp, Messenger et Telegram pour une messagerie réellement chiffrée et, idéalement, libre."
            en="The first move, the one that protects you fastest: leave WhatsApp, Messenger and Telegram for a genuinely encrypted (ideally open-source) messenger."
          />
        }
      />
      <TableWrap>
        <table>
          <thead>
            <tr>
              <th><T fr="Vous quittez" en="You leave" /></th>
              <th><T fr="Vous adoptez" en="You adopt" /></th>
              <th><T fr="Pourquoi" en="Why" /></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="old">WhatsApp</span></td>
              <td><span className="new">Signal</span></td>
              <td><T fr="Même simplicité, sans Meta ni collecte de métadonnées" en="Same simplicity, without Meta or metadata harvesting" /></td>
            </tr>
            <tr>
              <td><span className="old">Messenger</span></td>
              <td><span className="new">Signal / SimpleX</span></td>
              <td><T fr="Messenger n'est pas chiffré par défaut et fut scanné sous Chat Control 1.0" en="Messenger isn't E2EE by default and was scanned under Chat Control 1.0" /></td>
            </tr>
            <tr>
              <td><span className="old">Telegram</span></td>
              <td><span className="new">Signal / SimpleX</span></td>
              <td><T fr="Telegram n'est pas chiffré de bout en bout par défaut" en="Telegram isn't end-to-end encrypted by default" /></td>
            </tr>
          </tbody>
        </table>
      </TableWrap>
      {MESSAGING.map((t) => (
        <ToolCard key={t.id} {...t} />
      ))}
      <Box label={<T fr="Face à Chat Control" en="Against Chat Control" />}>
        <p>
          <T
            fr={<>Privilégiez des applications <strong>libres, hors des grandes plateformes américaines</strong>, dont les équipes ont publiquement promis de quitter l'UE plutôt que d'installer un scan côté client (c'est le cas de Signal). Rappel : si l'OS lui-même impose le scan, l'application n'y peut rien, d'où l'importance de la section 12.</>}
            en={<>Prefer <strong>open-source</strong> apps <strong>outside the big US platforms</strong>, whose teams have publicly pledged to leave the EU rather than install client-side scanning (Signal has). Reminder: if the OS itself enforces scanning, the app can't help, hence section 12.</>}
          />
        </p>
      </Box>
    </section>
  )
}

export function Email() {
  return (
    <section id="email">
      <PartHead
        num={<>PARTIE 02 · <Lvl n={1} /></>}
        title={<T fr="E-mail chiffré & PGP" en="Encrypted email & PGP" />}
        intro={
          <T
            fr="Gmail lit vos e-mails et vit aux États-Unis, sous la juridiction des « Five Eyes ». Quitter Gmail/Outlook est un gain énorme pour un effort minime."
            en={`Gmail reads your email and lives in the US, under "Five Eyes" jurisdiction. Leaving Gmail/Outlook is a huge win for minimal effort.`}
          />
        }
      />
      {EMAIL.map((t) => (
        <ToolCard key={t.id} {...t} />
      ))}
      <h4>
        <T fr="PGP en une minute" en="PGP in one minute" />
      </h4>
      <p>
        <T
          fr={<><strong>PGP</strong> (Pretty Good Privacy) est le principe du chiffrement à clés : vous avez une clé <em>publique</em> que vous distribuez, et une clé <em>privée</em> que vous gardez secrète. Quiconque a votre clé publique peut vous écrire un message que <strong>vous seul</strong> pouvez déchiffrer. C'est la base de l'e-mail chiffré indépendamment de tout fournisseur. Proton Mail le gère automatiquement ; pour un usage manuel, on utilise <strong>OpenPGP</strong> (via Thunderbird, intégré depuis la version 78).</>}
          en={<><strong>PGP</strong> (Pretty Good Privacy) is key-based encryption: you have a <em>public</em> key you hand out, and a <em>private</em> key you keep secret. Anyone with your public key can send you a message that <strong>only you</strong> can decrypt. It's the basis of provider-independent encrypted email. Proton Mail handles it automatically; for manual use, <strong>OpenPGP</strong> works via Thunderbird (built in since v78).</>}
        />
      </p>
    </section>
  )
}

export function Browsers() {
  return (
    <section id="navigateur">
      <PartHead
        num={<>PARTIE 03 · <Lvl n={1} /></>}
        title={<T fr="Navigateur & recherche" en="Browser & search" />}
        intro={
          <T
            fr="Chrome est un mouchard publicitaire. Google Search profile chaque requête. On remplace les deux."
            en="Chrome is an advertising tracker. Google Search profiles every query. Replace both."
          />
        }
      />
      {BROWSERS.map((t) => (
        <ToolCard key={t.id} {...t} />
      ))}
    </section>
  )
}

export function Dns() {
  return (
    <section id="dns">
      <PartHead
        num={<>RÉSEAU · DNS · <Lvl n={2} /></>}
        title={<T fr="DNS chiffré & Cloudflare" en="Encrypted DNS & Cloudflare" />}
        intro={
          <T
            fr={<>Le DNS, c'est l'annuaire qui traduit un nom de site (exemple.com) en adresse machine. Problème : par défaut, c'est votre fournisseur d'accès qui gère cet annuaire, et il voit donc <strong>chaque site que vous visitez</strong>, même quand la page est en HTTPS. Chiffrer son DNS, c'est reprendre cette liste à son FAI. C'est un réglage discret mais parmi les plus efficaces.</>}
            en={<>DNS is the directory that turns a site name (example.com) into a machine address. The catch: by default your internet provider runs that directory, so it sees <strong>every site you visit</strong>, even when the page is HTTPS. Encrypting your DNS takes that list back from your ISP. It's a quiet setting but one of the most effective.</>}
          />
        }
      />
      {DNS.map((t) => (
        <ToolCard key={t.id} {...t} />
      ))}
    </section>
  )
}
