/* The open-source directory — every entry is FREE SOFTWARE with its license
   verified against the project's repository (GitHub API spdx_id, or the
   project's LICENSE file for GitLab-hosted ones) on 2026-07-10. Projects that
   are merely source-available or fair-code (LM Studio, Open WebUI post-2025,
   n8n, Umbrel…) are deliberately NOT listed here — the narrative sections may
   mention them with caveats, this directory stays pure.
   Tested by tests/content.test.ts (license allowlist, category enum, links). */

export type DirCategory =
  | 'messagerie'
  | 'email'
  | 'navigation'
  | 'vpn-reseau'
  | 'dns'
  | 'mots-de-passe'
  | 'stockage-photos'
  | 'quotidien'
  | 'social'
  | 'ia-locale-agentique'
  | 'os-mobile'
  | 'selfhost'
  | 'finance'
  | 'opsec'

export const DIR_CATEGORIES: { key: DirCategory; fr: string; en: string }[] = [
  { key: 'messagerie', fr: 'Messagerie', en: 'Messaging' },
  { key: 'email', fr: 'E-mail', en: 'Email' },
  { key: 'navigation', fr: 'Navigateurs & recherche', en: 'Browsers & search' },
  { key: 'vpn-reseau', fr: 'VPN & réseau', en: 'VPN & network' },
  { key: 'dns', fr: 'DNS filtrant', en: 'Filtering DNS' },
  { key: 'mots-de-passe', fr: 'Mots de passe & 2FA', en: 'Passwords & 2FA' },
  { key: 'stockage-photos', fr: 'Stockage, sync & photos', en: 'Storage, sync & photos' },
  { key: 'quotidien', fr: 'Bureau & quotidien', en: 'Office & everyday' },
  { key: 'social', fr: 'Réseaux sociaux fédérés', en: 'Federated social' },
  { key: 'ia-locale-agentique', fr: 'IA locale & agentique', en: 'Local & agentic AI' },
  { key: 'os-mobile', fr: 'OS & mobile', en: 'OS & mobile' },
  { key: 'selfhost', fr: 'Auto-hébergement', en: 'Self-hosting' },
  { key: 'finance', fr: 'Souveraineté financière', en: 'Financial sovereignty' },
  { key: 'opsec', fr: 'OPSEC & journalisme', en: 'OPSEC & journalism' },
]

export type DirEntry = {
  name: string
  cat: DirCategory
  license: string
  href: string
  /** what it replaces / one-line role — bilingual */
  fr: string
  en: string
}

export const DIRECTORY: DirEntry[] = [
  // ─── messagerie ───
  { name: 'Signal', cat: 'messagerie', license: 'AGPL-3.0', href: 'https://signal.org', fr: 'Remplace WhatsApp — E2EE par défaut, fondation à but non lucratif.', en: 'Replaces WhatsApp — E2EE by default, non-profit foundation.' },
  { name: 'SimpleX Chat', cat: 'messagerie', license: 'AGPL-3.0', href: 'https://simplex.chat', fr: 'Sans aucun identifiant — même les serveurs ignorent qui parle à qui.', en: 'No identifier at all — even servers can’t know who talks to whom.' },
  { name: 'Session', cat: 'messagerie', license: 'GPL-3.0', href: 'https://getsession.org', fr: 'Sans numéro, routage en oignon.', en: 'No phone number, onion routing.' },
  { name: 'Element · Matrix', cat: 'messagerie', license: 'AGPL-3.0', href: 'https://element.io', fr: 'Remplace Discord/Slack — fédéré, auto-hébergeable.', en: 'Replaces Discord/Slack — federated, self-hostable.' },
  { name: 'Briar', cat: 'messagerie', license: 'GPL-3.0', href: 'https://briarproject.org', fr: 'P2P sans internet (Bluetooth/Tor) — manifestations, blackout.', en: 'P2P with no internet (Bluetooth/Tor) — protests, blackouts.' },
  { name: 'Molly', cat: 'messagerie', license: 'GPL-3.0', href: 'https://molly.im', fr: 'Signal durci pour Android (variante 100 % FOSS).', en: 'Hardened Signal for Android (fully FOSS variant).' },
  // ─── email ───
  { name: 'Thunderbird', cat: 'email', license: 'MPL-2.0', href: 'https://www.thunderbird.net', fr: 'Le client mail libre de référence, OpenPGP intégré.', en: 'The reference free mail client, OpenPGP built in.' },
  { name: 'Proton Mail (apps)', cat: 'email', license: 'GPL-3.0', href: 'https://proton.me/mail', fr: 'Applications open source du service chiffré suisse.', en: 'Open-source apps of the Swiss encrypted service.' },
  { name: 'Tuta (apps)', cat: 'email', license: 'GPL-3.0', href: 'https://tuta.com', fr: 'Applications libres, chiffrement post-quantique, juridiction UE.', en: 'Free apps, post-quantum encryption, EU jurisdiction.' },
  // ─── navigation ───
  { name: 'Firefox', cat: 'navigation', license: 'MPL-2.0', href: 'https://www.mozilla.org/firefox', fr: 'Remplace Chrome — le moteur indépendant.', en: 'Replaces Chrome — the independent engine.' },
  { name: 'Tor Browser', cat: 'navigation', license: 'MPL-2.0', href: 'https://www.torproject.org', fr: 'Anonymat réseau, anti-empreinte.', en: 'Network anonymity, anti-fingerprinting.' },
  { name: 'Mullvad Browser', cat: 'navigation', license: 'MPL-2.0', href: 'https://mullvad.net/browser', fr: 'Le navigateur du Tor Project, sans le réseau Tor.', en: 'The Tor Project’s browser, without the Tor network.' },
  { name: 'Brave', cat: 'navigation', license: 'MPL-2.0', href: 'https://brave.com', fr: 'Chromium qui bloque pubs et traqueurs par défaut.', en: 'Chromium that blocks ads and trackers by default.' },
  { name: 'uBlock Origin', cat: 'navigation', license: 'GPL-3.0', href: 'https://ublockorigin.com', fr: 'LE bloqueur de pubs et traqueurs.', en: 'THE ad and tracker blocker.' },
  { name: 'SearXNG', cat: 'navigation', license: 'AGPL-3.0', href: 'https://docs.searxng.org', fr: 'Métamoteur de recherche auto-hébergeable.', en: 'Self-hostable metasearch engine.' },
  // ─── vpn-reseau ───
  { name: 'WireGuard', cat: 'vpn-reseau', license: 'GPL-2.0', href: 'https://www.wireguard.com', fr: 'Le protocole VPN moderne que tout le monde utilise.', en: 'The modern VPN protocol everyone builds on.' },
  { name: 'Mullvad VPN (app)', cat: 'vpn-reseau', license: 'GPL-3.0', href: 'https://mullvad.net', fr: 'Client du VPN sans compte (cash/Monero acceptés).', en: 'Client of the no-account VPN (cash/Monero accepted).' },
  { name: 'Proton VPN (apps)', cat: 'vpn-reseau', license: 'GPL-3.0', href: 'https://protonvpn.com', fr: 'Clients libres, offre gratuite honnête.', en: 'Free clients, honest free tier.' },
  { name: 'Tor', cat: 'vpn-reseau', license: 'BSD-3-Clause', href: 'https://www.torproject.org', fr: 'Le réseau qui sépare qui vous êtes de ce que vous faites.', en: 'The network that separates who you are from what you do.' },
  { name: 'Tailscale', cat: 'vpn-reseau', license: 'BSD-3-Clause', href: 'https://tailscale.com', fr: 'Réseau privé WireGuard entre vos appareils.', en: 'Private WireGuard network between your devices.' },
  { name: 'Headscale', cat: 'vpn-reseau', license: 'BSD-3-Clause', href: 'https://headscale.net', fr: 'Le serveur de coordination Tailscale, chez vous.', en: 'The Tailscale coordination server, on your hardware.' },
  // ─── dns ───
  { name: 'Pi-hole', cat: 'dns', license: 'EUPL-1.2', href: 'https://pi-hole.net', fr: 'Bloque pubs et traqueurs pour tout le réseau.', en: 'Blocks ads and trackers for the whole network.' },
  { name: 'AdGuard Home', cat: 'dns', license: 'GPL-3.0', href: 'https://adguard.com/adguard-home.html', fr: 'Alternative à Pi-hole, interface moderne.', en: 'Pi-hole alternative with a modern UI.' },
  // ─── mots-de-passe ───
  { name: 'Bitwarden', cat: 'mots-de-passe', license: 'GPL-3.0', href: 'https://bitwarden.com', fr: 'Gestionnaire de mots de passe multiplateforme.', en: 'Cross-platform password manager.' },
  { name: 'Vaultwarden', cat: 'mots-de-passe', license: 'AGPL-3.0', href: 'https://github.com/dani-garcia/vaultwarden', fr: 'Serveur Bitwarden léger à auto-héberger.', en: 'Lightweight self-hosted Bitwarden server.' },
  { name: 'KeePassXC', cat: 'mots-de-passe', license: 'GPL-2.0/3.0', href: 'https://keepassxc.org', fr: 'Coffre 100 % local, zéro cloud.', en: '100% local vault, zero cloud.' },
  { name: 'Aegis', cat: 'mots-de-passe', license: 'GPL-3.0', href: 'https://getaegis.app', fr: 'Codes 2FA (TOTP) en coffre chiffré local (Android).', en: '2FA codes (TOTP) in a local encrypted vault (Android).' },
  { name: 'Ente Auth', cat: 'mots-de-passe', license: 'AGPL-3.0', href: 'https://ente.io/auth', fr: '2FA avec synchronisation chiffrée de bout en bout.', en: '2FA with end-to-end encrypted sync.' },
  // ─── stockage-photos ───
  { name: 'Nextcloud', cat: 'stockage-photos', license: 'AGPL-3.0', href: 'https://nextcloud.com', fr: 'Remplace toute la suite Google, chez vous.', en: 'Replaces the whole Google suite, at home.' },
  { name: 'Cryptomator', cat: 'stockage-photos', license: 'GPL-3.0', href: 'https://cryptomator.org', fr: 'Chiffre vos fichiers AVANT tout cloud.', en: 'Encrypts your files BEFORE any cloud.' },
  { name: 'Syncthing', cat: 'stockage-photos', license: 'MPL-2.0', href: 'https://syncthing.net', fr: 'Synchronisation d’appareil à appareil, sans serveur.', en: 'Device-to-device sync, no server.' },
  { name: 'restic', cat: 'stockage-photos', license: 'BSD-2-Clause', href: 'https://restic.net', fr: 'Sauvegardes chiffrées, dédupliquées, automatiques.', en: 'Encrypted, deduplicated, automatic backups.' },
  { name: 'Immich', cat: 'stockage-photos', license: 'AGPL-3.0', href: 'https://immich.app', fr: 'Google Photos auto-hébergé (visages, recherche).', en: 'Self-hosted Google Photos (faces, search).' },
  { name: 'Ente Photos', cat: 'stockage-photos', license: 'AGPL-3.0', href: 'https://ente.io', fr: 'Photos E2EE, reconnaissance sur l’appareil.', en: 'E2EE photos, on-device recognition.' },
  // ─── quotidien ───
  { name: 'LibreOffice', cat: 'quotidien', license: 'MPL-2.0', href: 'https://www.libreoffice.org', fr: 'La suite bureautique libre.', en: 'The free office suite.' },
  { name: 'OnlyOffice', cat: 'quotidien', license: 'AGPL-3.0', href: 'https://www.onlyoffice.com', fr: 'Bureautique collaborative auto-hébergeable.', en: 'Self-hostable collaborative office.' },
  { name: 'Joplin', cat: 'quotidien', license: 'AGPL-3.0', href: 'https://joplinapp.org', fr: 'Notes Markdown, chiffrement et sync au choix.', en: 'Markdown notes, optional encryption and sync.' },
  { name: 'Standard Notes', cat: 'quotidien', license: 'AGPL-3.0', href: 'https://standardnotes.com', fr: 'Notes chiffrées par défaut.', en: 'Notes encrypted by default.' },
  { name: 'CryptPad', cat: 'quotidien', license: 'AGPL-3.0', href: 'https://cryptpad.org', fr: 'Google Docs collaboratif, entièrement chiffré.', en: 'Collaborative Google Docs, fully encrypted.' },
  { name: 'Organic Maps', cat: 'quotidien', license: 'Apache-2.0', href: 'https://organicmaps.app', fr: 'Cartes hors-ligne sans traçage (OpenStreetMap).', en: 'Offline maps with zero tracking (OpenStreetMap).' },
  { name: 'OsmAnd', cat: 'quotidien', license: 'GPL-3.0', href: 'https://osmand.net', fr: 'Cartes avancées (rando, courbes de niveau).', en: 'Power-user maps (hiking, contour lines).' },
  { name: 'Jitsi Meet', cat: 'quotidien', license: 'Apache-2.0', href: 'https://jitsi.org', fr: 'Visio sans compte, auto-hébergeable.', en: 'Video calls with no account, self-hostable.' },
  // ─── social ───
  { name: 'Mastodon', cat: 'social', license: 'AGPL-3.0', href: 'https://joinmastodon.org', fr: 'Remplace X/Twitter — fédéré, sans algorithme imposé.', en: 'Replaces X/Twitter — federated, no imposed algorithm.' },
  { name: 'Pixelfed', cat: 'social', license: 'AGPL-3.0', href: 'https://pixelfed.org', fr: 'L’Instagram du fédiverse.', en: 'The fediverse’s Instagram.' },
  { name: 'PeerTube', cat: 'social', license: 'AGPL-3.0', href: 'https://joinpeertube.org', fr: 'Le YouTube fédéré.', en: 'Federated YouTube.' },
  { name: 'Lemmy', cat: 'social', license: 'AGPL-3.0', href: 'https://join-lemmy.org', fr: 'Le Reddit fédéré.', en: 'Federated Reddit.' },
  { name: 'Damus (Nostr)', cat: 'social', license: 'GPL-3.0', href: 'https://damus.io', fr: 'Client Nostr : votre identité est une paire de clés.', en: 'Nostr client: your identity is a key pair.' },
  // ─── ia-locale-agentique ───
  { name: 'Ollama', cat: 'ia-locale-agentique', license: 'MIT', href: 'https://ollama.com', fr: 'Faire tourner des LLM en local, en une commande.', en: 'Run LLMs locally, one command.' },
  { name: 'llama.cpp', cat: 'ia-locale-agentique', license: 'MIT', href: 'https://github.com/ggml-org/llama.cpp', fr: 'Le moteur d’inférence local qui a tout rendu possible.', en: 'The local inference engine that made it all possible.' },
  { name: 'vLLM', cat: 'ia-locale-agentique', license: 'Apache-2.0', href: 'https://github.com/vllm-project/vllm', fr: 'Inférence haute performance à auto-héberger.', en: 'High-throughput inference to self-host.' },
  { name: 'Jan', cat: 'ia-locale-agentique', license: 'AGPL-3.0', href: 'https://jan.ai', fr: 'ChatGPT-like 100 % local, interface simple.', en: '100% local ChatGPT-like, simple UI.' },
  { name: 'GPT4All', cat: 'ia-locale-agentique', license: 'MIT', href: 'https://gpt4all.io', fr: 'LLM locaux orientés vie privée, sur CPU.', en: 'Privacy-minded local LLMs, CPU-friendly.' },
  { name: 'Nika', cat: 'ia-locale-agentique', license: 'AGPL-3.0', href: 'https://nika.sh', fr: 'Workflows IA en un binaire : le plan est un fichier relu AVANT exécution, permissions imposées, chaque run rejouable — modèles locaux (Ollama) ou cloud.', en: 'AI workflows in one binary: the plan is a file you review BEFORE it runs, permissions enforced, every run replayable — local models (Ollama) or cloud.' },
  { name: 'goose', cat: 'ia-locale-agentique', license: 'Apache-2.0', href: 'https://github.com/block/goose', fr: 'Agent de développement extensible (MCP).', en: 'Extensible engineering agent (MCP).' },
  { name: 'OpenHands', cat: 'ia-locale-agentique', license: 'MIT', href: 'https://github.com/All-Hands-AI/OpenHands', fr: 'Agent développeur autonome auto-hébergeable.', en: 'Self-hostable autonomous dev agent.' },
  { name: 'Aider', cat: 'ia-locale-agentique', license: 'Apache-2.0', href: 'https://aider.chat', fr: 'Pair-programming IA dans le terminal, modèle au choix.', en: 'AI pair-programming in the terminal, any model.' },
  // ─── os-mobile ───
  { name: 'GrapheneOS', cat: 'os-mobile', license: 'MIT', href: 'https://grapheneos.org', fr: 'Android dégooglisé et durci (Pixel).', en: 'De-Googled, hardened Android (Pixel).' },
  { name: 'Tails', cat: 'os-mobile', license: 'GPL-3.0', href: 'https://tails.net', fr: 'OS amnésique sur clé USB, tout via Tor.', en: 'Amnesic USB OS, everything through Tor.' },
  { name: 'Qubes OS', cat: 'os-mobile', license: 'GPL-2.0', href: 'https://www.qubes-os.org', fr: 'Cloisonnement par machines virtuelles étanches.', en: 'Compartmentalisation via sealed VMs.' },
  { name: 'F-Droid', cat: 'os-mobile', license: 'GPL-3.0', href: 'https://f-droid.org', fr: 'Le magasin d’applications 100 % libres.', en: 'The 100% free app store.' },
  { name: 'postmarketOS', cat: 'os-mobile', license: 'GPL-3.0', href: 'https://postmarketos.org', fr: 'Linux sur les téléphones abandonnés.', en: 'Linux on abandoned phones.' },
  // ─── selfhost ───
  { name: 'YunoHost', cat: 'selfhost', license: 'AGPL-3.0', href: 'https://yunohost.org', fr: 'Serveur personnel clé en main (mail inclus).', en: 'Turnkey personal server (email included).' },
  { name: 'StartOS (Start9)', cat: 'selfhost', license: 'MIT', href: 'https://start9.com', fr: 'Serveur souverain, Tor par défaut.', en: 'Sovereign server, Tor by default.' },
  { name: 'Synapse (Matrix)', cat: 'selfhost', license: 'AGPL-3.0', href: 'https://element.io/server', fr: 'Votre serveur de messagerie fédéré.', en: 'Your federated chat server.' },
  // ─── finance ───
  { name: 'Bitcoin Core', cat: 'finance', license: 'MIT', href: 'https://bitcoincore.org', fr: 'La monnaie qu’on détient soi-même.', en: 'Money you hold yourself.' },
  { name: 'Monero', cat: 'finance', license: 'BSD-3-Clause', href: 'https://www.getmonero.org', fr: 'Transactions confidentielles par défaut.', en: 'Private transactions by default.' },
  // ─── opsec ───
  { name: 'SecureDrop', cat: 'opsec', license: 'AGPL-3.0', href: 'https://securedrop.org', fr: 'Dépôt anonyme de documents pour les rédactions.', en: 'Anonymous document drop for newsrooms.' },
  { name: 'OnionShare', cat: 'opsec', license: 'GPL-3.0', href: 'https://onionshare.org', fr: 'Partager des fichiers via Tor, sans intermédiaire.', en: 'Share files over Tor, no middleman.' },
  { name: 'Rayhunter (EFF)', cat: 'opsec', license: 'GPL-3.0', href: 'https://github.com/EFForg/rayhunter', fr: 'Détecteur d’IMSI-catchers.', en: 'IMSI-catcher detector.' },
  { name: 'mat2', cat: 'opsec', license: 'LGPL-3.0', href: 'https://0xacab.org/jvoisin/mat2', fr: 'Nettoie les métadonnées avant publication.', en: 'Strips metadata before publishing.' },
  { name: 'ExifTool', cat: 'opsec', license: 'Artistic/GPL', href: 'https://exiftool.org', fr: 'Lire et effacer les métadonnées EXIF.', en: 'Read and erase EXIF metadata.' },
]
