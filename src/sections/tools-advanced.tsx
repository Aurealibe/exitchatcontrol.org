import { T } from '../lib/i18n'
import { Box, Lvl, PartHead } from '../components/ui'
import { DIRECTORY, DIR_CATEGORIES } from '../content/directory'
import { ToolCard, type Tool } from '../components/ToolCard'

/* PART 10 · Self-hosting + PART 11 · Tor + PART 12 · Free OS + Telephony
   + PART 13 · OPSEC + PART 14 · Ecosystem — ported verbatim from v1. */

const SELFHOST: Tool[] = [
  {
    id: 't-yunohost',
    name: 'YunoHost · Umbrel · Start9',
    tile: 'Yh',
    brand: '#e29100',
    levels: ['a'],
    tags: [
      <T key="l" fr="🔴 Avancé" en="🔴 Advanced" />,
      <T key="r" fr="Serveur clé en main" en="Turnkey server" />,
      '🌍 · open-source',
    ],
    what: (
      <T
        fr="Des systèmes qui transforment un vieux PC ou un Raspberry Pi en serveur personnel, avec un catalogue d'applications à installer en quelques clics."
        en="Systems that turn an old PC or a Raspberry Pi into a personal server, with an app catalogue you install in a few clicks."
      />
    ),
    why: (
      <T
        fr={<>L'auto-hébergement fait peur, mais ces outils font le gros du travail. <b>YunoHost</b> gère même votre propre e-mail et une authentification unique. <b>Umbrel</b> offre un magasin de plus de 300 applications, très prisé des amateurs de vie privée et de Bitcoin. <b>Start9</b> chiffre les sauvegardes et donne une adresse Tor à chaque service par défaut.</>}
        en={<>Self-hosting sounds scary, but these tools do the heavy lifting. <b>YunoHost</b> even runs your own email and single sign-on. <b>Umbrel</b> offers a 300+ app store, popular with privacy and Bitcoin folks. <b>Start9</b> encrypts backups and gives every service a Tor address by default.</>}
      />
    ),
    who: (
      <T
        fr="Les profils avancés prêts à consacrer un après-midi à monter leur propre cloud. C'est la parade structurelle la plus radicale à Chat Control."
        en="Advanced profiles ready to spend an afternoon building their own cloud. It's the most radical structural counter to Chat Control."
      />
    ),
    steps: [
      <T key="1" fr="Récupérez un vieil ordinateur, un Raspberry Pi, ou louez un petit serveur (VPS) dans un pays protecteur." en="Get an old computer, a Raspberry Pi, or rent a small server (VPS) in a protective country." />,
      <T key="2" fr="Installez YunoHost, Umbrel ou Start9 en suivant leur guide officiel." en="Install YunoHost, Umbrel or Start9 following their official guide." />,
      <T key="3" fr="Depuis le catalogue, installez Nextcloud, un serveur Matrix, une galerie photo, etc." en="From the catalogue, install Nextcloud, a Matrix server, a photo gallery, etc." />,
      <T key="4" fr="Accédez-y en privé avec Tailscale (fiche ci-dessous) plutôt que d'exposer le serveur au public." en="Reach it privately with Tailscale (card below) rather than exposing the server to the public." />,
    ],
    links: [
      { label: 'yunohost.org →', href: 'https://yunohost.org' },
      { label: 'umbrel.com →', href: 'https://umbrel.com' },
      { label: 'start9.com →', href: 'https://start9.com' },
    ],
  },
  {
    id: 't-nextcloud',
    name: 'Nextcloud',
    slug: 'nextcloud',
    tile: 'Nc',
    brand: '#0082c9',
    levels: ['a'],
    tags: [
      <T key="l" fr="🔴 Avancé" en="🔴 Advanced" />,
      <T key="r" fr="Remplace toute la suite Google" en="Replaces all of Google" />,
      '🇩🇪 · open-source',
    ],
    what: (
      <T
        fr="Votre propre nuage : fichiers, agenda, contacts, photos, notes et documents collaboratifs, sur votre serveur."
        en="Your own cloud: files, calendar, contacts, photos, notes and collaborative documents, on your server."
      />
    ),
    why: (
      <T
        fr="C'est le remplacement complet de Google Drive, Agenda et Contacts, mais chez vous. Vous décidez de la juridiction et personne d'autre n'a la main sur vos fichiers. À savoir : c'est la confidentialité « votre serveur », pas un chiffrement de bout en bout par défaut ; vous devez le maintenir à jour."
        en={`It's the full replacement for Google Drive, Calendar and Contacts, but at home. You choose the jurisdiction and no one else controls your files. Note: it's "your server" privacy, not end-to-end encryption by default; you must keep it updated.`}
      />
    ),
    who: (
      <T
        fr="Les auto-hébergeurs. Le plus simple est de l'installer via YunoHost ou Umbrel."
        en="Self-hosters. The easiest path is to install it via YunoHost or Umbrel."
      />
    ),
    links: [{ label: 'nextcloud.com →', href: 'https://nextcloud.com' }],
  },
  {
    id: 't-synapse',
    name: 'Matrix Synapse',
    slug: 'matrix',
    tile: 'Mx',
    brand: '#0dbd8b',
    levels: ['a'],
    tags: [
      <T key="l" fr="🔴 Avancé" en="🔴 Advanced" />,
      <T key="r" fr="Votre serveur de chat" en="Your chat server" />,
      '🌍 · open-source',
    ],
    what: (
      <T
        fr="Votre propre serveur de messagerie Matrix, sur lequel tournent Element et les appels chiffrés."
        en="Your own Matrix chat server, powering Element and encrypted calls."
      />
    ),
    why: (
      <T
        fr={<>En hébergeant le serveur, vous contrôlez aussi les <b>métadonnées</b> (qui parle à qui, quand), le point faible de Matrix en fédération. C'est la messagerie communautaire dont vous êtes le seul maître.</>}
        en={<>By hosting the server, you also control the <b>metadata</b> (who talks to whom, when), Matrix's weak point in federation. It's community chat that you alone own.</>}
      />
    ),
    who: (
      <T
        fr="Communautés, collectifs, rédactions qui veulent leur espace fédéré indépendant."
        en="Communities, collectives, newsrooms that want their own independent federated space."
      />
    ),
    links: [{ label: 'element.io/server →', href: 'https://element.io/server' }],
  },
  {
    id: 't-tailscale',
    name: 'Tailscale · Headscale · WireGuard',
    slug: 'tailscale',
    tile: 'Ts',
    brand: '#242424',
    levels: ['a'],
    tags: [
      <T key="l" fr="🔴 Avancé" en="🔴 Advanced" />,
      <T key="r" fr="Accès privé à son serveur" en="Private access to your server" />,
      '🌍 · open-source',
    ],
    what: (
      <T
        fr="Un réseau privé chiffré qui relie vos appareils à votre serveur, sans jamais l'exposer sur l'Internet public."
        en="A private encrypted network linking your devices to your server, without ever exposing it on the public internet."
      />
    ),
    why: (
      <T
        fr={<>Au lieu d'ouvrir des ports (et de vous faire attaquer), <b>Tailscale</b> crée un tunnel WireGuard entre vos seuls appareils autorisés : votre serveur n'a aucune surface d'attaque publique. <b>Headscale</b> est la version que vous hébergez vous-même, pour ne dépendre d'aucun tiers. <b>WireGuard</b> seul offre le contrôle total, au prix d'une configuration manuelle.</>}
        en={<>Instead of opening ports (and getting attacked), <b>Tailscale</b> builds a WireGuard tunnel between your authorised devices only: your server has no public attack surface. <b>Headscale</b> is the self-hosted version, so you depend on no third party. <b>WireGuard</b> alone gives full control, at the cost of manual setup.</>}
      />
    ),
    who: (
      <T
        fr="Tout auto-hébergeur. C'est la façon sûre d'atteindre son Nextcloud ou ses photos depuis l'extérieur."
        en="Every self-hoster. It's the safe way to reach your Nextcloud or photos from outside."
      />
    ),
    steps: [
      <T key="1" fr="Installez Tailscale sur votre serveur et sur votre téléphone/PC, connectez-les au même compte." en="Install Tailscale on your server and on your phone/PC, connect them to the same account." />,
      <T key="2" fr="Vos appareils se voient aussitôt sur un réseau privé ; accédez à votre serveur par son adresse Tailscale." en="Your devices instantly see each other on a private network; reach your server at its Tailscale address." />,
      <T key="3" fr="Pour zéro dépendance, remplacez le serveur de coordination par Headscale, auto-hébergé." en="For zero dependency, replace the coordination server with self-hosted Headscale." />,
    ],
    links: [
      { label: 'tailscale.com →', href: 'https://tailscale.com' },
      { label: 'headscale.net →', href: 'https://headscale.net' },
    ],
  },
  {
    id: 't-website',
    name: <T fr="Votre propre site web" en="Your own website" />,
    tile: 'www',
    brand: '#7a4ddb',
    levels: ['i', 'a'],
    tags: ['🟡🔴', <T key="r" fr="Résister au bannissement" en="Ban-proof your voice" />],
    what: (
      <T
        fr="Un site à vous, sur votre nom de domaine, où votre contenu ne dépend d'aucune plateforme."
        en="A site of your own, on your own domain name, where your content depends on no platform."
      />
    ),
    why: (
      <T
        fr="Le jour où un réseau supprime ou suspend votre compte, tout votre travail disparaît. Un site personnel est votre point d'ancrage : vos articles y restent, archivés et à jour, quoi qu'il arrive. C'est exactement ce que font les comptes d'information prudents. Un site statique (généré par Hugo, Astro ou Jekyll) suffit et se publie presque gratuitement ; pour un blog dynamique, un WordPress ou un Ghost auto-hébergé fait l'affaire."
        en="The day a network deletes or suspends your account, all your work vanishes. A personal site is your anchor: your posts stay there, archived and up to date, whatever happens. It's exactly what cautious information accounts do. A static site (built with Hugo, Astro or Jekyll) is enough and publishes almost for free; for a dynamic blog, a self-hosted WordPress or Ghost does the job."
      />
    ),
    who: (
      <T
        fr="Comptes d'information, créateurs, militants, quiconque publie et craint la censure de plateforme."
        en="Information accounts, creators, activists, anyone who publishes and fears platform censorship."
      />
    ),
    steps: [
      <T key="1" fr="Achetez un nom de domaine (idéalement chez un registraire respectueux de la vie privée)." en="Buy a domain name (ideally from a privacy-respecting registrar)." />,
      <T key="2" fr="Choisissez un générateur de site statique (Astro, Hugo) et hébergez le résultat, ou installez WordPress/Ghost sur votre serveur." en="Choose a static-site generator (Astro, Hugo) and host the output, or install WordPress/Ghost on your server." />,
      <T key="3" fr="Renvoyez-y systématiquement depuis vos réseaux : votre audience vous retrouve même si un compte tombe." en="Always point to it from your social accounts: your audience finds you even if one account falls." />,
    ],
    links: [
      { label: 'astro.build →', href: 'https://astro.build' },
      { label: 'ghost.org →', href: 'https://ghost.org' },
    ],
  },
]

const OS_TOOLS: Tool[] = [
  {
    id: 't-grapheneos',
    name: 'GrapheneOS',
    slug: 'grapheneos',
    tile: 'Gr',
    brand: '#1f8a70',
    levels: ['a'],
    tags: [
      <T key="l" fr="🔴 Avancé" en="🔴 Advanced" />,
      <T key="r" fr="Mobile dégooglisé" en="De-Googled mobile" />,
      'Android · Pixel · open-source',
    ],
    what: (
      <T
        fr="Un Android entièrement dégooglisé, installé sur un téléphone Pixel : la souveraineté sur mobile."
        en="A fully de-Googled Android, installed on a Pixel phone: mobile sovereignty."
      />
    ),
    why: (
      <T
        fr={<>C'est la défense structurelle par excellence contre un OS ou un magasin d'applications qui voudrait vous scanner. Services Google en bac à sable optionnel, <b>permissions réseau par application</b>, profils cloisonnés, redémarrage automatique qui purge les clés de la mémoire, code PIN de contrainte qui efface le téléphone. Réputé pour sa sécurité au point d'être utilisé par des cibles de logiciels espions.</>}
        en={<>It's the structural defence par excellence against an OS or app store that would scan you. Google services in an optional sandbox, <b>per-app network permissions</b>, isolated profiles, auto-reboot that purges keys from memory, a duress PIN that wipes the phone. So respected for security that it's used by spyware targets.</>}
      />
    ),
    who: (
      <T
        fr="Profils exposés, mais aussi tout citoyen prêt à acheter un Pixel pour reprendre le contrôle de son téléphone."
        en="Exposed profiles, but also any citizen willing to buy a Pixel to take back control of their phone."
      />
    ),
    steps: [
      <T key="1" fr={<>Procurez-vous un téléphone <b>Google Pixel</b> compatible (c'est le seul matériel supporté, pour des raisons de sécurité).</>} en={<>Get a compatible <b>Google Pixel</b> phone (it's the only supported hardware, for security reasons).</>} />,
      <T key="2" fr={<>Sur un ordinateur, allez sur <b>grapheneos.org/install</b> et suivez l'installeur web (quelques clics, aucun terminal requis).</>} en={<>On a computer, go to <b>grapheneos.org/install</b> and follow the web installer (a few clicks, no terminal needed).</>} />,
      <T key="3" fr="Pour vos applications, installez le magasin libre F-Droid ; ajoutez Google Play en bac à sable seulement si nécessaire." en="For your apps, install the free F-Droid store; add sandboxed Google Play only if needed." />,
      <T key="4" fr="Réglez un long mot de passe (pas un code à 4 chiffres) et découvrez le mode « Lockdown »." en={`Set a long passphrase (not a 4-digit PIN) and learn the "Lockdown" mode.`} />,
    ],
    links: [{ label: 'grapheneos.org →', href: 'https://grapheneos.org' }],
  },
  {
    id: 't-linux',
    name: <T fr="Linux (sur ordinateur)" en="Linux (on desktop)" />,
    slug: 'linux',
    tile: '🐧',
    brand: '#2b2b2b',
    levels: ['i', 'a'],
    tags: [
      '🟡🔴',
      <T key="r" fr="Remplace Windows / macOS" en="Replaces Windows / macOS" />,
      <T key="f" fr="🌍 · libre & gratuit" en="🌍 · free" />,
    ],
    what: (
      <T
        fr="Un système d'exploitation libre et gratuit pour votre ordinateur, en remplacement de Windows ou de macOS. Il en existe de nombreuses variantes, appelées « distributions »."
        en={`A free operating system for your computer, replacing Windows or macOS. It comes in many flavours, called "distributions."`}
      />
    ),
    why: (
      <T
        fr="C'est le point aveugle de beaucoup de gens : ils chiffrent leurs messages mais gardent un Windows qui transmet en continu de la télémétrie à Microsoft (et dont la fonction « Recall » a voulu photographier l'écran en permanence), ou un macOS qui signale les applications que vous lancez. Linux, lui, ne vous espionne pas, il est gratuit, il ressuscite les vieux ordinateurs et il vous rend enfin maître de votre machine. C'est plus facile que sa réputation : les distributions modernes ressemblent à Windows ou macOS."
        en={`It's many people's blind spot: they encrypt their messages but keep a Windows that streams telemetry to Microsoft nonstop (whose "Recall" feature tried to screenshot the screen continuously), or a macOS that reports the apps you launch. Linux doesn't spy on you, it's free, it revives old computers, and it finally makes you master of your machine. It's easier than its reputation: modern distributions look like Windows or macOS.`}
      />
    ),
    who: (
      <T
        fr={<>Tout le monde peut franchir le pas. Pour débuter, <b>Linux Mint</b> (le plus proche de Windows) ou <b>Fedora</b> ; <b>Debian</b> pour la stabilité. Pas besoin de tout casser : on peut d'abord tester, puis installer à côté de son système actuel.</>}
        en={<>Anyone can make the switch. To start, <b>Linux Mint</b> (closest to Windows) or <b>Fedora</b>; <b>Debian</b> for stability. No need to wipe anything: you can test first, then install alongside your current system.</>}
      />
    ),
    steps: [
      <T key="1" fr={<>Pas sûr de la distribution ? Répondez au questionnaire <b>distrochooser.de/fr</b>, qui vous oriente selon vos besoins.</>} en={<>Not sure which distribution? Answer the <b>distrochooser.de/fr</b> quiz, which points you to the right one for your needs.</>} />,
      <T key="2" fr={<>Testez-la <b>sans rien installer</b> directement dans votre navigateur sur <b>distrosea.com</b>.</>} en={<>Try it <b>without installing anything</b>, right in your browser, at <b>distrosea.com</b>.</>} />,
      <T key="3" fr="Une fois convaincu, téléchargez l'image de la distribution et créez une clé USB de démarrage (avec Ventoy ou Balena Etcher)." en="Once convinced, download the distribution's image and create a bootable USB (with Ventoy or Balena Etcher)." />,
      <T key="4" fr="Démarrez sur la clé pour essayer le système « en live », puis lancez l'installation. Activez le chiffrement du disque proposé." en={`Boot from the USB to try the system "live," then run the install. Enable the disk encryption it offers.`} />,
    ],
    links: [
      { label: 'distrochooser.de/fr →', href: 'https://distrochooser.de/fr' },
      { label: 'distrosea.com →', href: 'https://distrosea.com' },
      { label: 'linuxmint.com →', href: 'https://linuxmint.com' },
    ],
  },
  {
    id: 't-tails',
    name: 'Tails',
    slug: 'tails',
    tile: 'Ta',
    brand: '#56347c',
    levels: ['a'],
    tags: [
      <T key="l" fr="🔴 Avancé" en="🔴 Advanced" />,
      <T key="r" fr="Clé USB amnésique" en="Amnesic USB" />,
      <T key="f" fr="🌍 · tout via Tor" en="🌍 · all via Tor" />,
    ],
    what: (
      <T
        fr={<>Un système qui démarre depuis une clé USB, fait passer tout le trafic par Tor et ne laisse <b>aucune trace</b> à l'extinction.</>}
        en={<>A system that boots from a USB stick, routes all traffic through Tor and leaves <b>no trace</b> when shut down.</>}
      />
    ),
    why: (
      <T
        fr="À l'arrêt, tout est oublié : c'est « amnésique ». Idéal pour un travail sensible et ponctuel sur un ordinateur qui n'est pas le vôtre, sans rien y laisser."
        en={`On shutdown, everything is forgotten: it's "amnesic." Ideal for sensitive, one-off work on a computer that isn't yours, leaving nothing behind.`}
      />
    ),
    who: (
      <T
        fr="Lanceurs d'alerte, journalistes, sources. L'outil de référence pour les missions à haut risque."
        en="Whistleblowers, journalists, sources. The reference tool for high-risk work."
      />
    ),
    steps: [
      <T key="1" fr={<>Téléchargez Tails sur <b>tails.net</b> et suivez l'assistant pour créer la clé USB.</>} en={<>Download Tails from <b>tails.net</b> and follow the wizard to create the USB stick.</>} />,
      <T key="2" fr="Redémarrez l'ordinateur sur cette clé. Utilisez-le, puis éteignez : tout disparaît." en="Reboot the computer from that USB. Use it, then shut down: everything vanishes." />,
    ],
    links: [{ label: 'tails.net →', href: 'https://tails.net' }],
  },
  {
    id: 't-qubes',
    name: 'Qubes OS · postmarketOS',
    slug: 'qubesos',
    tile: 'Qb',
    brand: '#3874d8',
    levels: ['a'],
    tags: [
      <T key="l" fr="🔴 Expert" en="🔴 Expert" />,
      <T key="r" fr="Cloisonnement" en="Compartmentalisation" />,
      '🌍 · open-source',
    ],
    what: (
      <T
        fr="Deux systèmes de niche : Qubes cloisonne votre PC en machines virtuelles étanches ; postmarketOS fait tourner du Linux sur d'anciens téléphones."
        en="Two niche systems: Qubes compartmentalises your PC into sealed virtual machines; postmarketOS runs Linux on old phones."
      />
    ),
    why: (
      <T
        fr="Qubes isole chaque activité (travail, banque, navigation risquée) dans son propre compartiment : une compromission n'atteint pas le reste. postmarketOS prolonge la vie de téléphones abandonnés par leur constructeur."
        en="Qubes isolates each activity (work, banking, risky browsing) in its own compartment: a compromise doesn't reach the rest. postmarketOS extends the life of phones abandoned by their maker."
      />
    ),
    who: (
      <T fr="Utilisateurs experts avec un modèle de menace très élevé." en="Expert users with a very high threat model." />
    ),
    links: [
      { label: 'qubes-os.org →', href: 'https://www.qubes-os.org' },
      { label: 'postmarketos.org →', href: 'https://postmarketos.org' },
    ],
  },
]

const TOR: Tool = {
  id: 't-tor',
  name: 'Tor Browser',
  slug: 'torbrowser',
  tile: 'Tor',
  brand: '#7d4698',
  levels: ['a'],
  tags: [
    <T key="l" fr="🔴 Avancé" en="🔴 Advanced" />,
    <T key="r" fr="Anonymat réseau" en="Network anonymity" />,
    '🌍 · open-source',
  ],
  what: (
    <T
      fr="Un réseau qui sépare qui vous êtes de ce que vous faites en ligne, accessible via le Tor Browser."
      en="A network that separates who you are from what you do online, accessible via the Tor Browser."
    />
  ),
  why: (
    <T
      fr="Votre trafic rebondit à travers plusieurs relais chiffrés dans le monde : aucun ne connaît à la fois votre identité et votre destination. C'est l'outil des journalistes et des sources, et le moyen d'atteindre un site bloqué (par exemple pour télécharger un VPN censuré)."
      en="Your traffic bounces through several encrypted relays worldwide: none knows both your identity and your destination. It's the tool of journalists and sources, and the way to reach a blocked site (for example to download a censored VPN)."
    />
  ),
  who: (
    <T
      fr="Profils à haut risque, et quiconque doit dissocier son activité de son adresse IP réelle. À utiliser ponctuellement, pas comme navigateur de tous les jours."
      en="High-risk profiles, and anyone who must decouple their activity from their real IP. Use it occasionally, not as an everyday browser."
    />
  ),
  steps: [
    <T key="1" fr={<>Téléchargez le Tor Browser sur <b>torproject.org</b> (Windows, macOS, Linux, Android).</>} en={<>Download the Tor Browser from <b>torproject.org</b> (Windows, macOS, Linux, Android).</>} />,
    <T key="2" fr="Lancez-le et cliquez « Se connecter ». Si Tor est bloqué dans votre pays, activez un « pont » (bridge)." en={`Launch it and click "Connect." If Tor is blocked in your country, enable a "bridge."`} />,
    <T key="3" fr={<>Naviguez sans maximiser la fenêtre, sans installer d'extension, et <b>sans vous connecter à vos vrais comptes</b>.</>} en={<>Browse without maximising the window, without installing extensions, and <b>without logging into your real accounts</b>.</>} />,
  ],
  links: [{ label: 'torproject.org →', href: 'https://www.torproject.org' }],
}

export function SelfHost() {
  return (
    <section id="selfhost">
      <PartHead
        num={<>PARTIE 10 · <T fr="AUTODÉFENSE AVANCÉE" en="ADVANCED SELF-DEFENCE" /> · <Lvl n={3} /></>}
        title={<T fr="Auto-hébergement" en="Self-hosting" />}
        intro={
          <T
            fr="Le niveau ultime de souveraineté : héberger vos services vous-même. Vos données vivent sur votre matériel, sous la juridiction que vous choisissez."
            en="The ultimate level of sovereignty: host your services yourself. Your data lives on your hardware, under the jurisdiction you choose."
          />
        }
      />
      {SELFHOST.map((t) => (
        <ToolCard key={t.id} {...t} />
      ))}
      <Box label={<T fr="Le point juridiction" en="The jurisdiction point" />}>
        <p>
          <T
            fr={<>Auto-héberger, c'est aussi choisir <em>où</em> vivent vos données. Un serveur chez vous ou dans un pays protecteur échappe aux obligations de scan imposées à une grande plateforme. C'est la parade structurelle la plus radicale à Chat Control.</>}
            en={<>Self-hosting also means choosing <em>where</em> your data lives. A server at home or in a protective country escapes the scanning duties imposed on big platforms. It's the most radical structural counter to Chat Control.</>}
          />
        </p>
      </Box>
    </section>
  )
}

export function TorSection() {
  return (
    <section id="tor">
      <PartHead
        num={<>PARTIE 11 · <Lvl n={3} /></>}
        title="Tor"
        intro={
          <T
            fr="Le réseau qui sépare qui vous êtes de ce que vous faites en ligne."
            en="The network that separates who you are from what you do online."
          />
        }
      />
      <ToolCard {...TOR} />
      <Box tone="warn" label={<T fr="Limites, pas magique" en="Limits, not magic" />}>
        <p>
          <T
            fr="Tor protège le transport, pas vos habitudes : si vous vous connectez à votre vrai compte, vous vous déanonymisez vous-même. Il est plus lent, et le nœud de sortie voit le trafic non chiffré (utilisez HTTPS). Pour un anonymat sérieux, associez-le à Tails (section 12)."
            en="Tor protects transport, not your habits: log into your real account and you deanonymise yourself. It's slower, and the exit node sees unencrypted traffic (use HTTPS). For serious anonymity, pair it with Tails (section 12)."
          />
        </p>
      </Box>
    </section>
  )
}

export function FreeOs() {
  return (
    <section id="os">
      <PartHead
        num={<>PARTIE 12 · <Lvl n={3} /></>}
        title={<T fr="Systèmes d'exploitation libres" en="Free operating systems" />}
        intro={
          <T
            fr="La pièce maîtresse. Si le scan côté client peut être imposé par le système d'exploitation lui-même, la seule vraie parade est de contrôler cet OS. C'est vrai sur le téléphone (GrapheneOS) comme sur l'ordinateur (Linux). Ne sous-estimez pas ce point : tant que vous restez sous Windows, macOS ou un Android Google, vous ne contrôlez pas vraiment votre machine."
            en="The keystone. If client-side scanning can be imposed by the operating system itself, the only real counter is to control that OS. That's true on the phone (GrapheneOS) and on the computer (Linux). Don't underestimate this: as long as you stay on Windows, macOS or a Google Android, you don't truly control your machine."
          />
        }
      />
      {OS_TOOLS.map((t) => (
        <ToolCard key={t.id} {...t} />
      ))}
      <h4>
        <T fr="Durcir l'appareil" en="Harden your device" />
      </h4>
      <p>
        <T
          fr={<>Sans changer d'OS, on gagne déjà beaucoup : installer les applications via <strong>F-Droid</strong> (magasin libre) ou <strong>Aurora Store</strong>, remplacer les services Google par <strong>microG</strong>, créer des profils séparés, couper les permissions réseau inutiles, désactiver la sauvegarde cloud automatique et l'identifiant publicitaire.</>}
          en={<>Even without switching OS, you gain a lot: install apps via <strong>F-Droid</strong> (free store) or <strong>Aurora Store</strong>, replace Google services with <strong>microG</strong>, create separate profiles, cut needless network permissions, disable automatic cloud backup and the advertising ID.</>}
        />
      </p>
    </section>
  )
}

export function Telephony() {
  return (
    <section id="telephonie">
      <PartHead
        num={<><T fr="MATÉRIEL" en="HARDWARE" /> · <Lvl n={3} /></>}
        title={<T fr="Téléphonie & appareil physique" en="Telephony & physical device" />}
        intro={
          <T
            fr="La meilleure application ne sert à rien si l'appareil lui-même vous trahit. Voici les menaces matérielles et les gestes qui les neutralisent."
            en="The best app is useless if the device itself betrays you. Here are the hardware threats and the moves that neutralise them."
          />
        }
      />
      <h4><T fr="Le numéro de téléphone est un traceur" en="The phone number is a tracker" /></h4>
      <p>
        <T
          fr="Votre numéro relie entre eux votre carte SIM, votre appareil (son identifiant IMEI), votre localisation et votre identité (la plupart des pays exigent une pièce d'identité à l'achat d'une SIM). C'est le fil qui permet de tout recouper."
          en="Your number ties together your SIM card, your device (its IMEI identifier), your location and your identity (most countries require ID to buy a SIM). It's the thread that lets everything be cross-referenced."
        />
      </p>
      <ul>
        <li>
          <T
            fr={<>Utilisez des messageries <b>sans numéro</b> (SimpleX, Session) pour vos contacts sensibles, et préférez toujours Signal au SMS.</>}
            en={<>Use <b>number-free</b> messengers (SimpleX, Session) for sensitive contacts, and always prefer Signal over SMS.</>}
          />
        </li>
        <li>
          <T
            fr="Pour une identité séparée, une carte SIM « data uniquement » ou une eSIM prépayée limite le lien au point de vente (à vérifier selon les pays)."
            en={`For a separate identity, a "data-only" SIM or prepaid eSIM limits the link at the point of sale (check your country's rules).`}
          />
        </li>
      </ul>
      <h4><T fr="IMSI-catchers & réseau téléphonique" en="IMSI-catchers & the phone network" /></h4>
      <p>
        <T
          fr="Les « IMSI-catchers » (ou « stingrays ») sont de fausses antennes-relais qui forcent les téléphones à s'y connecter pour enregistrer leur identifiant et parfois intercepter les communications, souvent en rétrogradant vers la 2G, peu chiffrée. En parallèle, une faille ancienne du réseau (SS7) permet encore d'intercepter des SMS et de localiser un téléphone à distance : une raison de plus d'abandonner le SMS."
          en={`"IMSI-catchers" (or "stingrays") are fake cell towers that force phones to connect so they can log their identifier and sometimes intercept communications, often by downgrading to weakly encrypted 2G. In parallel, an old network flaw (SS7) still allows SMS interception and remote phone location: one more reason to drop SMS.`}
        />
      </p>
      <ul>
        <li>
          <T
            fr={<><b>Désactivez la 2G</b> dans les réglages (possible sur Android et GrapheneOS) pour couper le principal vecteur d'interception.</>}
            en={<><b>Disable 2G</b> in settings (possible on Android and GrapheneOS) to cut the main interception vector.</>}
          />
        </li>
        <li>
          <T
            fr={<>En manifestation ou en zone sensible, passez en <b>mode avion</b> ou glissez le téléphone dans un <b>sac de Faraday</b> (qui bloque tout signal). L'EFF publie même un outil libre, Rayhunter, pour détecter les IMSI-catchers.</>}
            en={<>At a protest or in a sensitive area, switch to <b>airplane mode</b> or slip the phone into a <b>Faraday bag</b> (which blocks all signal). The EFF even publishes a free tool, Rayhunter, to detect IMSI-catchers.</>}
          />
        </li>
      </ul>
      <h4><T fr="Biométrie ou code ?" en="Biometrics or passcode?" /></h4>
      <Box tone="warn" label={<T fr="Un doigt se force, pas un code" en="A finger can be forced, a passcode can't" />}>
        <p>
          <T
            fr={<>On peut appliquer votre visage ou votre doigt sur le capteur pendant qu'on vous immobilise (à une frontière, lors d'une interpellation) ; un mot de passe dans votre tête, non. Avant une situation à risque, forcez le retour au code : sur iPhone, maintenez le bouton latéral et un bouton de volume (écran « SOS ») ; sur Android/GrapheneOS, utilisez le mode <b>Lockdown</b> du menu d'alimentation, qui désactive la biométrie jusqu'à saisie du code. Choisissez un mot de passe long, pas un code à quatre chiffres. GrapheneOS propose même un <b>code de contrainte</b> qui efface le téléphone.</>}
            en={<>Your face or finger can be applied to the sensor while you're restrained (at a border, during an arrest); a password in your head cannot. Before a risky situation, force a return to the passcode: on iPhone, hold the side button and a volume button (the "SOS" screen); on Android/GrapheneOS, use <b>Lockdown</b> in the power menu, which disables biometrics until the PIN is entered. Choose a long passphrase, not a four-digit PIN. GrapheneOS even offers a <b>duress PIN</b> that wipes the phone.</>}
          />
        </p>
      </Box>
      <h4><T fr="Dé-Microsoft, dé-Apple" en="De-Microsoft, de-Apple" /></h4>
      <p>
        <T
          fr="N'oubliez pas l'ordinateur : Windows transmet en continu de la télémétrie (et sa fonction « Recall » a voulu photographier l'écran en permanence), macOS signale les applications que vous lancez. La vraie sortie, c'est Linux (voir section 12). À défaut, désactivez la télémétrie, l'identifiant publicitaire et « Recall », et ajoutez un pare-feu sortant (comme Little Snitch sur Mac)."
          en={`Don't forget the computer: Windows streams telemetry nonstop (and its "Recall" feature tried to screenshot the screen continuously), macOS reports the apps you launch. The real exit is Linux (see section 12). Short of that, disable telemetry, the advertising ID and "Recall," and add an outbound firewall (like Little Snitch on Mac).`}
        />
      </p>
    </section>
  )
}

export function Opsec() {
  return (
    <section id="opsec">
      <PartHead
        num={<>PARTIE 13 · <Lvl n={3} /></>}
        title={<T fr="Anonymat & OPSEC" en="Anonymity & OPSEC" />}
        intro={
          <T
            fr={<>Pour le compte pseudonyme et le lanceur d'alerte. Ici, on ne protège plus seulement un message : on protège une <strong>identité</strong>.</>}
            en={<>For the pseudonymous account and the whistleblower. Here you no longer protect just a message: you protect an <strong>identity</strong>.</>}
          />
        }
      />
      <h4><T fr="Pseudonymat contre anonymat" en="Pseudonymity vs anonymity" /></h4>
      <p>
        <T
          fr={<>La règle d'or : <strong>ne jamais croiser votre identité réelle et votre identité publique</strong>. Pas le même e-mail, pas le même numéro, pas le même appareil, pas le même réseau, pas les mêmes horaires, pas le même style d'écriture. Une seule fuite suffit à relier les deux.</>}
          en={<>The golden rule: <strong>never cross your real identity with your public one</strong>. Not the same email, number, device, network, posting hours or writing style. A single leak links the two.</>}
        />
      </p>
      <ul>
        <li>
          <T
            fr={<><strong>Comptes sans identité</strong> : SimpleX et Session ne demandent aucun numéro ; associez-les à des alias e-mail jetables. Méfiez-vous des « numéros virtuels » revendus et traçables.</>}
            en={<><strong>Identity-less accounts</strong>: SimpleX and Session need no number; pair them with disposable email aliases. Beware resold, traceable "virtual numbers".</>}
          />
        </li>
        <li>
          <T
            fr={<><strong>Nettoyer les métadonnées</strong> : une photo publiée contient souvent la date, le modèle d'appareil et parfois les coordonnées GPS (données EXIF). Nettoyez avec <em>Metadata Cleaner</em>, <em>mat2</em> ou <em>ExifTool</em> avant de publier ; attention aussi aux noms de fichiers et aux métadonnées de documents.</>}
            en={<><strong>Clean metadata</strong>: a posted photo often carries the date, device model and sometimes GPS coordinates (EXIF data). Strip it with <em>Metadata Cleaner</em>, <em>mat2</em> or <em>ExifTool</em> before posting; watch file names and document metadata too.</>}
          />
        </li>
        <li>
          <T
            fr={<><strong>Anti-corrélation réseau</strong> : utilisez Tor/Tails pour dissocier votre activité de votre IP domestique. Ne mélangez jamais réseau personnel et réseau pseudonyme. Une carte SIM à votre nom trahit votre localisation, peu importe le reste.</>}
            en={<><strong>Network anti-correlation</strong>: use Tor/Tails to decouple your activity from your home IP. Never mix your personal and pseudonymous networks. A SIM in your name betrays your location no matter what else you do.</>}
          />
        </li>
        <li>
          <T
            fr={<><strong>Cloisonnement</strong> : un appareil ou au moins un profil dédié à l'identité publique, un gestionnaire de mots de passe séparé, jamais de connexion croisée entre les deux mondes.</>}
            en={<><strong>Compartmentalisation</strong>: a device, or at least a profile, dedicated to the public identity, a separate password manager, and never a cross-login between the two worlds.</>}
          />
        </li>
      </ul>
      <h4><T fr="Transmettre des documents en tant que source" en="Passing documents as a source" /></h4>
      <p>
        <T
          fr={<><strong>SecureDrop</strong> est le système de dépôt anonyme utilisé par de nombreuses rédactions pour recevoir des documents de sources. Beaucoup de journaux publient aussi une clé PGP et un contact Signal. Ne transmettez jamais depuis votre matériel professionnel ni votre réseau habituel.</>}
          en={<><strong>SecureDrop</strong> is the anonymous submission system many newsrooms use to receive documents from sources. Many outlets also publish a PGP key and a Signal contact. Never submit from your work hardware or usual network.</>}
        />
      </p>
      <Box tone="honest" label={<T fr="Honnêteté, ne vous surestimez pas" en="Honesty, don't overestimate yourself" />}>
        <p>
          <T
            fr={<>L'anonymat fort contre un adversaire étatique est <strong>difficile et faillible</strong>. Ce guide donne des repères, pas des garanties. Si des vies en dépendent, formez-vous auprès des références d'autorité : <em>EFF Surveillance Self-Defense</em>, <em>Freedom of the Press Foundation</em>, <em>Privacy Guides</em>. Cadre strictement défensif et journalistique.</>}
            en={<>Strong anonymity against a state adversary is <strong>hard and fallible</strong>. This guide gives bearings, not guarantees. If lives depend on it, train with the authoritative references: <em>EFF Surveillance Self-Defense</em>, <em>Freedom of the Press Foundation</em>, <em>Privacy Guides</em>. Strictly defensive and journalistic context.</>}
          />
        </p>
      </Box>
    </section>
  )
}

export function Ecosystem() {
  return (
    <section id="ecosysteme">
      <PartHead
        anchor="ecosysteme"
        num={<>PARTIE 14 · <T fr="POUR ALLER PLUS LOIN" en="GOING FURTHER" /></>}
        title={<T fr="L'annuaire open source" en="The open-source directory" />}
        intro={
          <T
            fr={<>Se dégoogliser à fond, c'est remplacer chaque brique par un équivalent libre. La logique commune (<strong>logiciel libre + contrôle de son appareil + auto-hébergement</strong>) est la vraie parade au scan côté client. Chaque projet ci-dessous est du logiciel libre au sens strict — <strong>licence vérifiée sur le dépôt</strong> (les « source-available » et « fair-code » n'y figurent pas).</>}
            en={<>Fully de-Googling means replacing each brick with a free equivalent. The common logic (<strong>free software + control of your device + self-hosting</strong>) is the real counter to client-side scanning. Every project below is free software in the strict sense — <strong>license verified against the repository</strong> (source-available and fair-code projects are not listed).</>}
          />
        }
      />
      {DIR_CATEGORIES.map((cat) => {
        const entries = DIRECTORY.filter((e) => e.cat === cat.key)
        if (entries.length === 0) return null
        return (
          <div key={cat.key}>
            <h3 id={`dir-${cat.key}`}>
              <T fr={cat.fr} en={cat.en} />
            </h3>
            <div className="allies dir-grid">
              {entries.map((e) => (
                <a key={e.name} className="ally" href={e.href} target="_blank" rel="noopener noreferrer">
                  <span className="ally-name">
                    {e.name} <span className="lic">{e.license}</span>
                  </span>
                  <span className="ally-role">
                    <T fr={e.fr} en={e.en} />
                  </span>
                  <span className="ally-url">{e.href.replace(/^https:\/\//, '').replace(/\/$/, '')} →</span>
                </a>
              ))}
            </div>
          </div>
        )
      })}
      <Box label={<T fr="Pourquoi la licence compte" en="Why the license matters" />}>
        <p>
          <T
            fr={<>La licence est la parade juridique au scénario Chat Control : un logiciel <strong>AGPL/GPL</strong> qui ajouterait un mouchard peut être <em>forké</em> sans le mouchard, le jour même, par n'importe qui. C'est l'assurance-vie structurelle qu'aucune promesse d'entreprise ne remplace — la même logique que la section <a href="#precedents">Précédents</a> : ne pas faire confiance, rendre la trahison inopérante.</>}
            en={<>The license is the legal counter to the Chat Control scenario: a <strong>AGPL/GPL</strong> program that added a scanner can be <em>forked</em> without it, same day, by anyone. Structural life insurance no corporate promise replaces — the same logic as the <a href="#precedents">Precedents</a> section: don't trust, make betrayal inoperative.</>}
          />
        </p>
      </Box>
    </section>
  )
}
