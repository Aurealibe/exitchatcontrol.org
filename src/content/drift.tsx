/* The Big Brother observatory DATA — the CURRENT drift (2024-2026), every
   front at once: messages, money, identity, information, biometrics — EU,
   France, and the world mirror. Same discipline as events.tsx (the 25-year
   precedents): every entry dated, one primary source, checked weekly by the
   link-rot workflow. The two lists do not overlap: the Chat Control vote
   lineage lives in events.tsx; this file covers the machinery around it and
   the other fronts. Curated from the 2026-07-10 three-sweep research pass
   (docs/PLAN-2026-07-10-bigbrother.md). */

export type Region = 'eu' | 'fr' | 'uk' | 'us' | 'au' | 'ch' | 'ru' | 'cn' | 'vn' | 'world'
export type Theme = 'messaging' | 'identity' | 'money' | 'media' | 'aibio'
export type Status = 'en_vigueur' | 'adopte' | 'negociation' | 'propose' | 'rejete' | 'suspendu' | 'revele'
/** chips: 3 region groups + the 5 fronts */
export type BbFilter = 'eu' | 'fr' | 'world' | Theme

export type DriftEv = {
  /** stable slug — the deep-link anchor is #bb-<id> */
  id: string
  /** display date, YYYY-MM-DD or YYYY-MM — list stays chronologically sorted */
  date: string
  region: Region
  themes: Theme[]
  status: Status
  title: { fr: string; en: string }
  body: { fr: string; en: string }
  src: { label: string; href: string }
}

export const REGION_META: Record<Region, { flag: string; fr: string; en: string }> = {
  eu: { flag: '🇪🇺', fr: 'Union européenne', en: 'European Union' },
  fr: { flag: '🇫🇷', fr: 'France', en: 'France' },
  uk: { flag: '🇬🇧', fr: 'Royaume-Uni', en: 'United Kingdom' },
  us: { flag: '🇺🇸', fr: 'États-Unis', en: 'United States' },
  au: { flag: '🇦🇺', fr: 'Australie', en: 'Australia' },
  ch: { flag: '🇨🇭', fr: 'Suisse', en: 'Switzerland' },
  ru: { flag: '🇷🇺', fr: 'Russie', en: 'Russia' },
  cn: { flag: '🇨🇳', fr: 'Chine', en: 'China' },
  vn: { flag: '🇻🇳', fr: 'Vietnam', en: 'Vietnam' },
  world: { flag: '🌐', fr: 'International', en: 'International' },
}

export const STATUS_META: Record<Status, { fr: string; en: string }> = {
  en_vigueur: { fr: 'en vigueur', en: 'in force' },
  adopte: { fr: 'adopté', en: 'adopted' },
  negociation: { fr: 'en négociation', en: 'under negotiation' },
  propose: { fr: 'proposé', en: 'proposed' },
  rejete: { fr: 'rejeté — pour l’instant', en: 'rejected — for now' },
  suspendu: { fr: 'suspendu', en: 'stalled' },
  revele: { fr: 'révélé', en: 'revealed' },
}

/** filter tokens for the pure-CSS filter: region group + themes */
export function driftTags(ev: DriftEv): string {
  const group = ev.region === 'eu' ? 'eu' : ev.region === 'fr' ? 'fr' : 'world'
  return [group, ...ev.themes].join(' ')
}

export const DRIFT: DriftEv[] = [
  {
    id: 'prum-2',
    date: '2024-03-13',
    region: 'eu',
    themes: ['aibio'],
    status: 'en_vigueur',
    title: { fr: 'Prüm II : la recherche faciale entre toutes les polices d’Europe', en: 'Prüm II: face search across every police force in Europe' },
    body: {
      fr: 'Le règlement 2024/982 ajoute les images faciales — y compris de suspects jamais condamnés — à l’échange automatisé de données policières entre États membres, via un routeur central. Une capacité d’identification biométrique paneuropéenne, adoptée sans réel débat public national ; l’EDRi y voit un risque d’« excès étatique et de surveillance de masse ».',
      en: 'Regulation 2024/982 adds facial images — including of suspects never convicted — to the automated exchange of police data between member states, through a central router. A pan-European biometric identification capability, adopted with no real national debate; EDRi calls it a risk of "state over-reach and mass surveillance".',
    },
    src: { label: 'Règlement (UE) 2024/982 · Prüm II', href: 'https://eur-lex.europa.eu/EN/legal-content/summary/police-cooperation-automated-search-and-exchange-of-data.html' },
  },
  {
    id: 'eidas-wallet',
    date: '2024-05-20',
    region: 'eu',
    themes: ['identity'],
    status: 'en_vigueur',
    title: { fr: 'eIDAS 2.0 : le portefeuille d’identité arrive, les navigateurs sous tutelle', en: 'eIDAS 2.0: the identity wallet lands, browsers under state trust' },
    body: {
      fr: 'Chaque État membre doit fournir un portefeuille européen d’identité numérique (EUDI Wallet) pour le 24 décembre 2026 ; banques, télécoms, santé et très grandes plateformes devront l’accepter. Le même wallet prouvera l’âge, ouvrira le compte, signera le paiement — un point de passage unique, donc un point de contrôle unique ; l’EDPS documente les risques de traçage entre usages. Et l’article 45 impose aux navigateurs de reconnaître des certificats web désignés par les États : plus de 500 chercheurs ont alerté que c’est l’infrastructure d’une interception du trafic chiffré.',
      en: 'Every member state must provide a European digital identity wallet (EUDI Wallet) by 24 December 2026; banks, telecoms, health services and very large platforms will have to accept it. The same wallet will prove your age, open the account, sign the payment — one gateway, hence one control point; the EDPS documents cross-use tracking risks. And Article 45 forces browsers to recognise state-designated web certificates: over 500 researchers warned this is the infrastructure of encrypted-traffic interception.',
    },
    src: { label: 'Commission · règlement EUDI', href: 'https://digital-strategy.ec.europa.eu/en/policies/eudi-regulation' },
  },
  {
    id: 'going-dark',
    date: '2024-06',
    region: 'eu',
    themes: ['messaging', 'identity'],
    status: 'propose',
    title: { fr: 'Le plan « Going Dark » : l’accès policier dès la conception', en: 'The "Going Dark" plan: police access by design' },
    body: {
      fr: 'Le High-Level Group « accès aux données » — composé presque exclusivement de représentants policiers — publie 42 recommandations : « lawful access by design » (l’accès des autorités intégré dès la conception des produits), rétention harmonisée des métadonnées, obligation d’identifier chaque utilisateur, messageries comprises. 55 ONG dénoncent une feuille de route de surveillance de masse. C’est la matrice de tout ce qui suit.',
      en: 'The High-Level Group on "access to data" — staffed almost entirely by law-enforcement representatives — publishes 42 recommendations: "lawful access by design" (police access built into products from the drawing board), harmonised metadata retention, a duty to identify every user, messengers included. 55 NGOs call it a blueprint for mass surveillance. It is the matrix of everything that follows.',
    },
    src: { label: 'Commission · recommandations HLG', href: 'https://home-affairs.ec.europa.eu/document/download/1105a0ef-535c-44a7-a6d4-a8478fce1d29_en' },
  },
  {
    id: 'roumanie-tiktok',
    date: '2024-12-17',
    region: 'eu',
    themes: ['media'],
    status: 'en_vigueur',
    title: { fr: 'Roumanie : élection annulée, le DSA arbitre du visible', en: 'Romania: election annulled, the DSA arbitrates the visible' },
    body: {
      fr: 'La Cour constitutionnelle roumaine annule le premier tour de la présidentielle en invoquant une campagne coordonnée non déclarée sur TikTok ; la Commission ouvre dans la foulée une procédure formelle DSA contre la plateforme (systèmes de recommandation, publicité politique), toujours en cours en 2026. Quelle que soit l’issue, le précédent est posé : « qui décide de ce qui est visible en période électorale » se joue désormais entre plateformes, Commission et cours constitutionnelles.',
      en: 'Romania’s Constitutional Court annuls the first round of the presidential election, citing an undeclared coordinated campaign on TikTok; the Commission immediately opens formal DSA proceedings against the platform (recommender systems, political advertising), still ongoing in 2026. Whatever the outcome, the precedent stands: "who decides what is visible during an election" is now settled between platforms, the Commission and constitutional courts.',
    },
    src: { label: 'Commission · procédure DSA TikTok', href: 'https://digital-strategy.ec.europa.eu/en/news/commission-opens-formal-proceedings-against-tiktok-election-risks-under-digital-services-act' },
  },
  {
    id: 'vietnam-decret-147',
    date: '2024-12-25',
    region: 'vn',
    themes: ['identity', 'media'],
    status: 'en_vigueur',
    title: { fr: 'Vietnam : identité vérifiée ou silence', en: 'Vietnam: verified identity or silence' },
    body: {
      fr: 'Le décret 147 oblige les plateformes à vérifier l’identité de chaque utilisateur (téléphone ou numéro d’identité), à stocker ces données et à les remettre aux autorités ; seuls les comptes vérifiés peuvent publier, commenter ou streamer. L’équation est posée sans détour : pas d’identité vérifiée, pas de parole publique.',
      en: 'Decree 147 forces platforms to verify every user’s identity (phone or ID number), store the data and hand it to the authorities; only verified accounts may post, comment or stream. The equation is stated plainly: no verified identity, no public speech.',
    },
    src: { label: 'The Guardian · déc. 2024', href: 'https://www.theguardian.com/world/2024/dec/23/vietnam-identity-verification-internet-law-reactions-decree-147-censorship' },
  },
  {
    id: 'uk-apple-adp',
    date: '2025-02-21',
    region: 'uk',
    themes: ['messaging'],
    status: 'en_vigueur',
    title: { fr: 'Londres exige une porte dérobée, Apple retire son chiffrement', en: 'London demands a backdoor, Apple pulls its encryption' },
    body: {
      fr: 'Par un ordre secret (Technical Capability Notice, Investigatory Powers Act), le Home Office exige de pouvoir accéder aux données iCloud chiffrées — portée mondiale confirmée par les pièces du dossier. Apple répond en retirant Advanced Data Protection (le chiffrement de bout en bout d’iCloud) à tous les Britanniques plutôt que de fabriquer la clé. Sous pression américaine, Londres « retire » sa demande à l’été… puis émet un nouvel ordre le 1er octobre, recentré sur les données britanniques. Mi-2026, les Britanniques vivent toujours sans E2EE sur leurs sauvegardes.',
      en: 'By secret order (a Technical Capability Notice under the Investigatory Powers Act), the Home Office demands access to encrypted iCloud data — worldwide scope confirmed by case filings. Apple responds by withdrawing Advanced Data Protection (end-to-end encrypted iCloud) from all UK users rather than build the key. Under US pressure London "withdraws" the demand in the summer… then issues a fresh order on 1 October, rescoped to British users’ data. In mid-2026, UK users still live without E2EE on their backups.',
    },
    src: { label: 'Apple · retrait d’ADP au Royaume-Uni', href: 'https://support.apple.com/en-us/122234' },
  },
  {
    id: 'fr-narcotrafic-8ter',
    date: '2025-03-20',
    region: 'fr',
    themes: ['messaging'],
    status: 'rejete',
    title: { fr: 'France : la backdoor de la loi Narcotrafic tombe', en: 'France: the Narcotrafic backdoor falls' },
    body: {
      fr: 'L’article 8 ter de la loi Narcotrafic aurait obligé les messageries chiffrées à donner au renseignement l’accès aux correspondances — le mécanisme du « participant fantôme ». Supprimé en commission, son rétablissement est rejeté par une coalition transpartisane le 20 mars 2025, contre l’avis du ministre de l’Intérieur. Un parlement national peut dire non ; le gouvernement, lui, n’a pas renoncé — la demande d’accès revient par cycles, ici puis à Bruxelles.',
      en: 'Article 8 ter of the Narcotrafic law would have forced encrypted messengers to give intelligence services access to correspondence — the "ghost participant" mechanism. Deleted in committee, its reinstatement is rejected by a cross-party coalition on 20 March 2025, against the interior minister’s wishes. A national parliament can say no; the government has not given up — the access demand returns in cycles, here and then in Brussels.',
    },
    src: { label: 'La Quadrature du Net · mars 2025', href: 'https://www.laquadrature.net/2025/03/18/le-gouvernement-pret-a-tout-pour-casser-le-droit-au-chiffrement/' },
  },
  {
    id: 'protecteu',
    date: '2025-04-01',
    region: 'eu',
    themes: ['messaging'],
    status: 'propose',
    title: { fr: '« ProtectEU » : casser le chiffrement devient un objectif officiel', en: '"ProtectEU": breaking encryption becomes official policy' },
    body: {
      fr: 'La stratégie de sécurité intérieure de la Commission (COM(2025) 148) annonce une feuille de route pour l’« accès légal et effectif aux données » et une « Technology Roadmap » sur le chiffrement, plus un Europol renforcé. Des demandes policières éparses deviennent un programme politique pluriannuel de l’Union : l’accès aux communications chiffrées, écrit noir sur blanc.',
      en: 'The Commission’s internal security strategy (COM(2025) 148) announces a roadmap for "lawful and effective access to data" and a "Technology Roadmap" on encryption, plus a beefed-up Europol. Scattered police demands become a multi-year political programme of the Union: access to encrypted communications, in writing.',
    },
    src: { label: 'COM(2025) 148 · ProtectEU', href: 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:52025DC0148' },
  },
  {
    id: 'ice-palantir',
    date: '2025-04-18',
    region: 'us',
    themes: ['aibio', 'identity'],
    status: 'en_vigueur',
    title: { fr: 'ICE s’offre « ImmigrationOS » chez Palantir', en: 'ICE buys "ImmigrationOS" from Palantir' },
    body: {
      fr: '30 millions de dollars pour une plateforme croisant les fichiers fédéraux et offrant une « visibilité en quasi temps réel » sur les personnes à expulser. La surveillance ciblée d’une population entière devient un produit logiciel sur étagère, opéré par un acteur privé.',
      en: '30 million dollars for a platform that cross-references federal databases and provides "near real-time visibility" on people slated for removal. Targeted surveillance of an entire population becomes an off-the-shelf software product, operated by a private company.',
    },
    src: { label: 'WIRED · avril 2025', href: 'https://www.wired.com/story/ice-palantir-immigrationos/' },
  },
  {
    id: 'ch-vupf',
    date: '2025-05',
    region: 'ch',
    themes: ['messaging', 'identity'],
    status: 'suspendu',
    title: { fr: 'Même la Suisse : l’ordonnance qui ferait fuir Proton', en: 'Even Switzerland: the ordinance that would drive Proton out' },
    body: {
      fr: 'La révision de l’ordonnance de surveillance (VÜPF) étendrait aux services dès 5 000 utilisateurs des obligations d’identification et de rétention (IP 6 mois). Le CEO de Proton jure de quitter le pays si le texte passe (« nous serions moins confidentiels que Google ») et gèle les investissements suisses ; Threema proteste aussi. Début 2026, le projet est enlisé : consultation quasi unanimement contre, le Parlement exige une refonte. Le refuge historique de la confidentialité a tenté, par simple ordonnance, ce que l’UE débat dans Chat Control.',
      en: 'The revised surveillance ordinance (VÜPF) would extend user-identification and retention duties (6-month IP logs) to any service above 5,000 users. Proton’s CEO vows to leave the country if it passes ("we would be less confidential than Google") and freezes Swiss investment; Threema protests too. By early 2026 the project is stalled: near-unanimous opposition in consultation, parliament demands a rewrite. The historic haven of confidentiality tried, by mere ordinance, what the EU debates in Chat Control.',
    },
    src: { label: 'Statewatch · fév. 2026', href: 'https://statewatch.org/news/2026/february/swiss-government-urged-to-rethink-mass-telecoms-surveillance-plan/' },
  },
  {
    id: 'us-visa-vetting',
    date: '2025-06-18',
    region: 'us',
    themes: ['media', 'identity'],
    status: 'en_vigueur',
    title: { fr: 'Visas américains : vos réseaux sociaux en accès public, ou rien', en: 'US visas: your social media set to public, or nothing' },
    body: {
      fr: 'Le Département d’État exige des demandeurs de visas étudiants qu’ils rendent leurs profils sociaux publics, à la recherche de toute « hostilité » envers les États-Unis ; les identifiants des cinq dernières années sont à déclarer. Étendu aux H-1B en décembre, puis à d’autres catégories en mars 2026. L’accès au territoire conditionné à l’inspection idéologique de la parole en ligne : une incitation mondiale à l’autocensure.',
      en: 'The State Department requires student-visa applicants to set their social profiles to public, screening for any "hostility" toward the United States; five years of handles must be declared. Extended to H-1B in December, then to further categories in March 2026. Entry conditioned on ideological inspection of online speech: a worldwide incentive to self-censor.',
    },
    src: { label: 'Département d’État US · juin 2025', href: 'https://travel.state.gov/content/travel/en/News/visas-news/announcement-of-expanded-screening-and-vetting-for-visa-applicants.html' },
  },
  {
    id: 'roadmap-lawful-access',
    date: '2025-06-24',
    region: 'eu',
    themes: ['messaging', 'aibio'],
    status: 'propose',
    title: { fr: 'La feuille de route : décryptage d’État planifié jusqu’en 2030', en: 'The roadmap: state decryption scheduled through 2030' },
    body: {
      fr: 'La Commission publie son calendrier d’« accès légal aux données » (COM(2025) 349) : nouvelles règles de rétention, interception transfrontière d’ici 2027, IA d’analyse des données saisies d’ici 2028, et « capacité de décryptage de nouvelle génération » pour Europol à partir de 2030. L’UE planifie sur cinq ans les briques juridiques et techniques pour lire ce qui est aujourd’hui illisible. L’EFF résume : « cette feuille de route rend tout le monde moins sûr ».',
      en: 'The Commission publishes its "lawful access to data" schedule (COM(2025) 349): new retention rules, cross-border interception by 2027, AI analysis of seized data by 2028, and a "next-generation decryption capability" for Europol from 2030. The EU is planning, over five years, the legal and technical bricks to read what is unreadable today. The EFF sums it up: "this roadmap makes everyone less safe".',
    },
    src: { label: 'Commission · 24 juin 2025', href: 'https://home-affairs.ec.europa.eu/news/commission-presents-roadmap-effective-and-lawful-access-data-law-enforcement-2025-06-24_en' },
  },
  {
    id: 'age-blueprint',
    date: '2025-07-14',
    region: 'eu',
    themes: ['identity'],
    status: 'adopte',
    title: { fr: 'Vérification d’âge : l’app pilote dans cinq pays', en: 'Age verification: the pilot app in five countries' },
    body: {
      fr: 'La Commission publie ses lignes directrices « article 28 » du DSA et un blueprint de vérification d’âge (« mini-wallet »), piloté avec le Danemark, la France, la Grèce, l’Italie et l’Espagne, conçu pour converger vers l’EUDI Wallet fin 2026. Même « respectueuse de la vie privée », la logique installe un contrôle d’identité à l’entrée d’Internet : prouver un attribut d’état civil pour consulter des contenus légaux devient un geste normal.',
      en: 'The Commission publishes its DSA "Article 28" guidelines and an age-verification blueprint (a "mini-wallet"), piloted with Denmark, France, Greece, Italy and Spain, designed to converge into the EUDI Wallet by late 2026. Even "privacy-preserving", the logic installs an identity check at the entrance of the internet: proving a civil-status attribute to view legal content becomes a normal gesture.',
    },
    src: { label: 'Commission · blueprint · juil. 2025', href: 'https://digital-strategy.ec.europa.eu/en/news/commission-makes-available-age-verification-blueprint' },
  },
  {
    id: 'fr-pornhub',
    date: '2025-07-15',
    region: 'fr',
    themes: ['identity'],
    status: 'en_vigueur',
    title: { fr: 'France : le Conseil d’État rétablit le contrôle d’âge', en: 'France: the Conseil d’État reinstates the age check' },
    body: {
      fr: 'En application de la loi SREN et du référentiel Arcom (« double anonymat »), les sites adultes doivent vérifier l’âge des visiteurs. Aylo (Pornhub) coupe l’accès en France en protestation ; le tribunal administratif suspend l’arrêté en juin, le Conseil d’État annule cette suspension le 15 juillet : l’obligation tient, les sites re-bloquent. Premier déploiement grandeur nature de la « carte d’identité pour entrer sur Internet », avec le blocage comme levier de conformité.',
      en: 'Under the SREN law and the Arcom framework ("double anonymity"), adult sites must verify visitors’ age. Aylo (Pornhub) cuts access to France in protest; the administrative court suspends the decree in June, the Conseil d’État overturns that suspension on 15 July: the obligation stands, the sites re-block. The first full-scale deployment of the "ID card to enter the internet", with blocking as the compliance lever.',
    },
    src: { label: 'Conseil d’État · 15 juil. 2025', href: 'https://www.conseil-etat.fr/actualites/sites-pornographiques-l-arrete-imposant-de-verifier-l-age-des-utilisateurs-est-maintenu' },
  },
  {
    id: 'cn-cyber-id',
    date: '2025-07-15',
    region: 'cn',
    themes: ['identity'],
    status: 'en_vigueur',
    title: { fr: 'Chine : l’identifiant Internet national, centralisé chez la police', en: 'China: the national internet ID, centralised with the police' },
    body: {
      fr: 'Lancement du « cyberspace ID » : un identifiant unique délivré par le ministère de la Sécurité publique, adossé à la reconnaissance faciale et à la carte d’identité, pour se connecter aux services en ligne. Officiellement volontaire — au-dessus d’un real-name registration déjà obligatoire partout. Quand l’identification en ligne est centralisée par l’État, l’anonymat disparaît par design et l’accès à Internet devient un privilège révocable. C’est le modèle finalisé de ce que les age-checks et wallets occidentaux esquissent.',
      en: 'Launch of the "cyberspace ID": a single identifier issued by the Ministry of Public Security, backed by face recognition and the national ID card, used to log into online services. Officially voluntary — on top of real-name registration already mandatory everywhere. When online identification is centralised by the state, anonymity disappears by design and internet access becomes a revocable privilege. It is the finished model of what Western age checks and wallets sketch.',
    },
    src: { label: 'South China Morning Post · juil. 2025', href: 'https://www.scmp.com/tech/tech-trends/article/3318302/china-rolls-out-voluntary-cyber-id-system-amid-concerns-over-privacy-censorship' },
  },
  {
    id: 'emfa-article-4',
    date: '2025-08-08',
    region: 'eu',
    themes: ['media', 'messaging'],
    status: 'en_vigueur',
    title: { fr: 'EMFA : la protection des journalistes, trouée par ses exceptions', en: 'EMFA: journalist protection, holed by its exceptions' },
    body: {
      fr: 'Le règlement européen sur la liberté des médias s’applique pleinement. Son article 4 interdit en principe le logiciel espion contre les journalistes… puis l’autorise par exception pour une liste de crimes graves ; pendant la négociation, le Conseil — France en tête — poussait une exception générale de « sécurité nationale », dénoncée par RSF. Le premier texte européen censé protéger les journalistes de l’espionnage d’État codifie, en creux, les conditions dans lesquelles cet espionnage reste légal.',
      en: 'The European Media Freedom Act becomes fully applicable. Its Article 4 bans spyware against journalists in principle… then allows it by exception for a list of serious crimes; during negotiations the Council — France in the lead — pushed a blanket "national security" carve-out, denounced by RSF. The first European text meant to shield journalists from state spying codifies, in the negative space, the conditions under which that spying stays legal.',
    },
    src: { label: 'Règlement (UE) 2024/1083 · EMFA', href: 'https://eur-lex.europa.eu/EN/legal-content/summary/european-media-freedom-act.html' },
  },
  {
    id: 'ru-max',
    date: '2025-09-01',
    region: 'ru',
    themes: ['messaging', 'identity'],
    status: 'en_vigueur',
    title: { fr: 'Russie : la messagerie d’État préinstallée d’office', en: 'Russia: the state messenger pre-installed by decree' },
    body: {
      fr: 'Tout smartphone vendu en Russie doit embarquer MAX, la messagerie développée par VK et désignée « application nationale » ; fonctionnaires et enseignants sont sommés de l’utiliser. Les analyses indépendantes décrivent un traçage étendu et une intégration au système d’interception du FSB. Le point d’arrivée de la logique anti-chiffrement : une messagerie lisible par les services, imposée par le canal même de la distribution du matériel.',
      en: 'Every smartphone sold in Russia must ship with MAX, the messenger built by VK and designated the "national app"; civil servants and teachers are ordered onto it. Independent analyses describe extensive tracking and integration with the FSB’s interception system. The end point of the anti-encryption logic: a messenger readable by the services, imposed through the hardware distribution channel itself.',
    },
    src: { label: 'Reuters · août 2025', href: 'https://www.reuters.com/technology/russia-orders-state-backed-max-messenger-app-whatsapp-rival-pre-installed-phones-2025-08-21/' },
  },
  {
    id: 'ru-recherche-punie',
    date: '2025-09-01',
    region: 'ru',
    themes: ['media'],
    status: 'en_vigueur',
    title: { fr: 'Russie : chercher devient un délit', en: 'Russia: searching becomes an offence' },
    body: {
      fr: 'Rechercher « délibérément » en ligne un contenu classé « extrémiste » (une liste de plus de 5 000 entrées, opposition comprise) devient passible d’amende — y compris via VPN — et la publicité pour les outils de contournement est interdite. Un seuil historique : l’État ne punit plus ce que vous dites, mais ce que vous cherchez à savoir. C’est l’aboutissement logique de l’inspection des usages individuels.',
      en: '"Deliberately" searching online for content classified as "extremist" (a list of 5,000+ entries, opposition included) becomes finable — including through a VPN — and advertising circumvention tools is banned. A historic threshold: the state no longer punishes what you say, but what you try to find out. The logical end point of inspecting individual usage.',
    },
    src: { label: 'Reuters · juil. 2025', href: 'https://www.reuters.com/world/russia-passes-law-punishing-searches-extremist-content-2025-07-22/' },
  },
  {
    id: 'scientifiques-csar',
    date: '2025-09-09',
    region: 'eu',
    themes: ['messaging'],
    status: 'negociation',
    title: { fr: '500 scientifiques : « techniquement infaisable »', en: '500 scientists: "technically infeasible"' },
    body: {
      fr: 'Plus de 500 cryptographes et chercheurs de 34 pays (700+ ensuite) signent contre la version danoise du CSAR : détection fiable impossible à cette échelle, contournement trivial pour les criminels, et tout scan côté client « sape intrinsèquement » le chiffrement de bout en bout. La police criminelle allemande documentait 48 % de signalements erronés en 2024. Le consensus scientifique est sans appel — et le projet continue.',
      en: 'More than 500 cryptographers and researchers from 34 countries (700+ later) sign against the Danish CSAR draft: reliable detection is impossible at this scale, circumvention is trivial for criminals, and any client-side scanning "inherently undermines" end-to-end encryption. Germany’s federal criminal police documented 48% erroneous reports in 2024. The scientific consensus is unambiguous — and the project continues.',
    },
    src: { label: 'Lettre ouverte · sept. 2025', href: 'https://csa-scientist-open-letter.org/Sep2025' },
  },
  {
    id: 'uk-britcard',
    date: '2025-09-26',
    region: 'uk',
    themes: ['identity'],
    status: 'negociation',
    title: { fr: '« BritCard » : une identité numérique pour avoir le droit de travailler', en: '"BritCard": a digital ID to be allowed to work' },
    body: {
      fr: 'Le gouvernement Starmer annonce une identité numérique qui deviendra obligatoire pour les vérifications d’embauche d’ici la fin de la législature, au nom de la lutte contre l’immigration illégale. Une pétition dépasse le million de signatures en quelques jours ; le gouvernement maintient le cap (projet de loi au King’s Speech de mai 2026). Conditionner le droit de travailler à un identifiant d’État, c’est installer un point de contrôle central sur la vie économique de chacun.',
      en: 'The Starmer government announces a digital identity that will become mandatory for right-to-work checks by the end of the parliament, in the name of fighting illegal immigration. A petition passes one million signatures within days; the government holds course (a bill features in the May 2026 King’s Speech). Conditioning the right to work on a state identifier installs a central checkpoint on everyone’s economic life.',
    },
    src: { label: 'gov.uk · sept. 2025', href: 'https://www.gov.uk/government/news/new-digital-id-scheme-to-be-rolled-out-across-uk' },
  },
  {
    id: 'berlin-bloque',
    date: '2025-10-12',
    region: 'eu',
    themes: ['messaging'],
    status: 'rejete',
    title: { fr: 'Berlin fait tomber le scan obligatoire', en: 'Berlin brings down mandatory scanning' },
    body: {
      fr: 'Signal annonce qu’il quitterait le marché européen plutôt que de saper son chiffrement ; le groupe CDU/CSU compare le scan sans soupçon à l’ouverture préventive de tout le courrier. Le 12 octobre, le point est retiré de l’agenda du Conseil : la minorité de blocage est atteinte. Le rapport de force peut s’inverser — mais le projet ne meurt jamais : remanié en « volontaire », il revient six semaines plus tard.',
      en: 'Signal announces it would leave the European market rather than undermine its encryption; the CDU/CSU group compares suspicionless scanning to steaming open everyone’s mail. On 12 October the item is pulled from the Council agenda: the blocking minority holds. The balance of power can flip — but the project never dies: reworked as "voluntary", it returns six weeks later.',
    },
    src: { label: 'EU Perspectives · oct. 2025', href: 'https://euperspectives.eu/2025/10/berlin-forces-delay-whatsapp-spying-vote/' },
  },
  {
    id: 'ees-biometrie',
    date: '2025-10-12',
    region: 'eu',
    themes: ['aibio', 'identity'],
    status: 'en_vigueur',
    title: { fr: 'EES : le visage et les doigts deviennent le passeport', en: 'EES: face and fingers become the passport' },
    body: {
      fr: 'Le système d’entrée/sortie démarre : empreintes digitales et image faciale de chaque voyageur non-européen sont collectées dans une base centralisée, à la place du tampon (plein régime le 10 avril 2026) ; l’ETIAS, autorisation payante adossée à ces bases, doit suivre. L’UE bascule vers une frontière-base-de-données : le corps devient l’identifiant de voyage par défaut, stocké dans des systèmes conçus pour être interconnectés.',
      en: 'The Entry/Exit System goes live: fingerprints and a facial image of every non-EU traveller are collected into a centralised database, replacing the passport stamp (full rollout 10 April 2026); ETIAS, a paid authorisation built on those databases, is next. The EU shifts to a border-as-database: the body becomes the default travel identifier, stored in systems designed to interconnect.',
    },
    src: { label: 'Commission · EES', href: 'https://home-affairs.ec.europa.eu/policies/schengen/smart-borders/entry-exit-system_en' },
  },
  {
    id: 'onu-cybercrime',
    date: '2025-10-25',
    region: 'world',
    themes: ['messaging'],
    status: 'adopte',
    title: { fr: 'Convention ONU cybercriminalité : la surveillance s’exporte par traité', en: 'UN Cybercrime Convention: surveillance exported by treaty' },
    body: {
      fr: 'Négociée à l’initiative de la Russie, adoptée fin 2024, la convention est signée à Hanoï par 72 États. EFF et Human Rights Watch alertent : définitions larges, entraide obligatoire pour collecter des preuves électroniques — interception en temps réel comprise — sur des « crimes graves » définis par la loi du pays demandeur, garde-fous optionnels. Un canal mondial légalisé où les standards du régime le plus répressif peuvent s’exporter.',
      en: 'Negotiated at Russia’s initiative and adopted in late 2024, the convention is signed in Hanoi by 72 states. EFF and Human Rights Watch warn: broad definitions, mandatory mutual assistance to collect electronic evidence — real-time interception included — for "serious crimes" as defined by the requesting country’s law, with optional safeguards. A legalised worldwide channel through which the most repressive regime’s standards can travel.',
    },
    src: { label: 'ONU · UNODC · oct. 2025', href: 'https://www.unodc.org/unodc/en/press/releases/2025/October/un-convention-against-cybercrime-opens-for-signature-in-hanoi--viet-nam.html' },
  },
  {
    id: 'euro-numerique-pilote',
    date: '2025-10-30',
    region: 'eu',
    themes: ['money'],
    status: 'negociation',
    title: { fr: 'Euro numérique : l’architecture se construit avant les garde-fous', en: 'Digital euro: the architecture is built before the safeguards' },
    body: {
      fr: 'La BCE clôt sa « phase de préparation » et enclenche la suite : exercice pilote mi-2027, première émission possible en 2029 — alors que le règlement n’est pas voté. L’Eurogroupe s’est accordé en septembre sur la gouvernance et la fixation des plafonds de détention. Une monnaie de banque centrale numérique est une infrastructure où chaque transaction est nativement enregistrable ; elle se construit pendant que ses limites légales restent à écrire.',
      en: 'The ECB closes its "preparation phase" and starts the next one: a pilot exercise in mid-2027, possible first issuance in 2029 — while the regulation is not yet passed. The Eurogroup agreed in September on governance and the process for setting holding caps. A central-bank digital currency is an infrastructure where every transaction is natively recordable; it is being built while its legal limits are still unwritten.',
    },
    src: { label: 'BCE · 30 oct. 2025', href: 'https://www.ecb.europa.eu/press/pr/date/2025/html/ecb.pr251030~8c5b5beef0.en.html' },
  },
  {
    id: 'au-ban-16',
    date: '2025-12-10',
    region: 'au',
    themes: ['identity', 'aibio', 'media'],
    status: 'en_vigueur',
    title: { fr: 'Australie : 4,7 millions de comptes éteints en un mois', en: 'Australia: 4.7 million accounts switched off in a month' },
    body: {
      fr: 'Première mondiale : les moins de 16 ans sont bannis de dix plateformes, qui doivent estimer l’âge (analyse comportementale, selfie facial, pièce d’identité) sous peine de 49,5 M A$ d’amende. Un mois plus tard, Canberra annonce 4,7 millions de comptes désactivés ou restreints. Pour exclure les mineurs, il faut estimer l’âge de tout le monde : la biométrie devient le péage d’entrée du web social — et les gouvernements du monde entier observent le laboratoire.',
      en: 'A world first: under-16s are banned from ten platforms, which must estimate age (behavioural inference, face-scan selfies, ID documents) under penalty of A$49.5M fines. A month later, Canberra announces 4.7 million accounts deactivated or restricted. To exclude minors you must estimate everyone’s age: biometrics becomes the toll booth of the social web — and governments worldwide are watching the laboratory.',
    },
    src: { label: 'Premier ministre australien · janv. 2026', href: 'https://www.pm.gov.au/media/4-7-million-accounts-deactivated-removed-or-restricted' },
  },
  {
    id: 'fr-vsa-prolongee',
    date: '2025-12-17',
    region: 'fr',
    themes: ['aibio'],
    status: 'en_vigueur',
    title: { fr: 'VSA : l’« expérimentation » des JO en route vers sa 7e année', en: 'Algorithmic CCTV: the Olympics "experiment" heads for year seven' },
    body: {
      fr: 'Autorisée « à titre expérimental » par la loi JO de 2023 (échéance mars 2025), la vidéosurveillance algorithmique est prolongée jusqu’à fin 2027, validée par le Conseil constitutionnel. En mai 2026, le Sénat vote déjà la suite (loi « Ripost ») : prolongation jusqu’à fin 2030 et extension à tous les lieux ouverts au public. Le cliquet classique : l’exception se proroge, le périmètre s’étend, l’évaluation attendra.',
      en: 'Authorised "experimentally" by the 2023 Olympics law (expiry March 2025), algorithmic video surveillance is extended to the end of 2027, cleared by the Constitutional Council. By May 2026 the Senate is already voting the sequel (the "Ripost" law): extension to the end of 2030 and expansion to every publicly accessible space. The classic ratchet: the exception rolls over, the scope widens, the evaluation can wait.',
    },
    src: { label: 'Le Monde · 18 déc. 2025', href: 'https://www.lemonde.fr/pixels/article/2025/12/18/les-deputes-votent-la-prolongation-de-l-experimentation-de-la-videosurveillance-algorithmique-jusqu-a-la-fin-de-2027_6658502_4408996.html' },
  },
  {
    id: 'pl-ziobro-asile',
    date: '2026-01-12',
    region: 'eu',
    themes: ['media', 'messaging'],
    status: 'revele',
    title: { fr: 'Pegasus en Pologne : l’accusé trouve asile… dans l’UE', en: 'Pegasus in Poland: the accused finds asylum… inside the EU' },
    body: {
      fr: 'L’ex-ministre de la Justice Zbigniew Ziobro, visé par 26 chefs d’accusation — dont le financement de Pegasus sur un fonds d’aide aux victimes et son usage contre des opposants —, annonce avoir obtenu l’asile politique en Hongrie après la levée de son immunité. Le bilan judiciaire de l’espionnage politique d’État débouche sur une impasse inédite : un État membre de l’UE abrite le responsable présumé, et la reddition de comptes s’arrête à la frontière intérieure.',
      en: 'Former justice minister Zbigniew Ziobro, facing 26 charges — including funding Pegasus from a victims’ aid fund and using it against opponents — announces he has been granted political asylum in Hungary after his immunity was lifted. The judicial reckoning for state political spying reaches an unprecedented dead end: an EU member state shelters the alleged culprit, and accountability stops at the internal border.',
    },
    src: { label: 'Le Monde · 12 janv. 2026', href: 'https://www.lemonde.fr/international/article/2026/01/12/pologne-ancien-ministre-de-la-justice-et-procureur-general-zbigniew-ziobro-dit-avoir-obtenu-l-asile-en-hongrie_6661475_3210.html' },
  },
  {
    id: 'ru-whatsapp-bloque',
    date: '2026-02-12',
    region: 'ru',
    themes: ['messaging'],
    status: 'en_vigueur',
    title: { fr: 'Russie : WhatsApp coupé pour 100 millions d’utilisateurs', en: 'Russia: WhatsApp cut off for 100 million users' },
    body: {
      fr: 'La séquence complète a pris six mois : août 2025, les appels WhatsApp et Telegram sont dégradés (les plateformes « refusent de partager des données avec les autorités ») ; décembre, le ralentissement s’étend ; février 2026, blocage total de WhatsApp, confirmé par le Kremlin. La leçon est limpide : on exige les données, on étrangle le service qui refuse, puis on le coupe. Le refus du chiffrement se punit par l’exclusion du pays.',
      en: 'The full sequence took six months: August 2025, WhatsApp and Telegram calls are throttled (the platforms "refuse to share data with the authorities"); December, the slowdown widens; February 2026, WhatsApp is fully blocked, confirmed by the Kremlin. The lesson is plain: demand the data, strangle the service that refuses, then cut it off. Refusing to break encryption is punished by exclusion from the country.',
    },
    src: { label: 'Reuters · fév. 2026', href: 'https://www.reuters.com/technology/russia-blocks-metas-whatsapp-messaging-service-ft-reports-2026-02-12/' },
  },
  {
    id: 'gr-intellexa',
    date: '2026-02-26',
    region: 'eu',
    themes: ['media', 'messaging'],
    status: 'revele',
    title: { fr: 'Predator en Grèce : les vendeurs condamnés, les commanditaires introuvables', en: 'Predator in Greece: the vendors convicted, the buyers untraceable' },
    body: {
      fr: 'Un tribunal d’Athènes condamne quatre dirigeants liés à Intellexa — dont son fondateur — pour accès illégal à des communications privées, dans le scandale Predator (~87 cibles : journalistes, ministres, militaires). Première condamnation pénale de marchands de spyware dans l’UE. Mais aucun responsable politique n’est condamné : les commanditaires des écoutes restent officiellement introuvables.',
      en: 'An Athens court convicts four executives tied to Intellexa — its founder included — for illegal access to private communications in the Predator scandal (~87 targets: journalists, ministers, military officers). The EU’s first criminal conviction of spyware merchants. But no political official is convicted: whoever ordered the wiretaps remains officially untraceable.',
    },
    src: { label: 'Amnesty International · fév. 2026', href: 'https://www.amnesty.org/en/latest/news/2026/02/greece-spyware-scandal/' },
  },
  {
    id: 'fr-boites-noires-urls',
    date: '2026-05',
    region: 'fr',
    themes: ['messaging', 'media'],
    status: 'negociation',
    title: { fr: 'Boîtes noires : le renseignement veut lire les URL complètes', en: 'Black boxes: intelligence wants the full URLs' },
    body: {
      fr: 'Les députés élargissent les « boîtes noires » — l’analyse algorithmique des métadonnées créée en 2015 contre le terrorisme, pérennisée depuis — à la criminalité organisée et, pour la première fois, aux URL complètes des pages visitées. Le Conseil constitutionnel avait censuré un dispositif similaire en 2025 ; le gouvernement retente, ajusté. L’URL complète révèle ce que vous lisez, pas seulement à qui vous parlez : un saut qualitatif vers l’inspection automatisée des lectures, sous autorisation administrative.',
      en: 'MPs widen the "black boxes" — the algorithmic metadata analysis created in 2015 against terrorism, made permanent since — to organised crime and, for the first time, to the full URLs of pages visited. The Constitutional Council struck down a similar scheme in 2025; the government tries again, adjusted. A full URL reveals what you read, not just who you talk to: a qualitative leap toward automated inspection of reading habits, under administrative (not judicial) authorisation.',
    },
    src: { label: 'Le Monde · 7 mai 2026', href: 'https://www.lemonde.fr/pixels/article/2026/05/07/surveillance-les-deputes-elargissent-a-nouveau-le-dispositif-des-boites-noires_6686538_4408996.html' },
  },
  {
    id: 'palantir-europe',
    date: '2026-05-19',
    region: 'eu',
    themes: ['aibio'],
    status: 'en_vigueur',
    title: { fr: 'Palantir en Europe : on change de fournisseur, pas de question', en: 'Palantir in Europe: the vendor changes, the question doesn’t' },
    body: {
      fr: 'Le renseignement intérieur allemand écarte Palantir au profit du français ChapsVision ; la DGSI résilie de même son contrat par anticipation. Mais les polices de Bavière, de Hesse et de Rhénanie-du-Nord-Westphalie continuent d’utiliser Gotham, contesté devant la Cour constitutionnelle. Le débat public a glissé de « faut-il fusionner les fichiers de police par l’IA » à « avec quel prestataire le faire » : la souveraineté a remplacé la proportionnalité, et l’analyse de masse elle-même n’est plus questionnée.',
      en: 'Germany’s domestic intelligence drops Palantir for France’s ChapsVision; the DGSI likewise terminates its contract early. But police in Bavaria, Hesse and North Rhine-Westphalia keep using Gotham, challenged before the Constitutional Court. The public debate has slid from "should police files be fused by AI" to "which vendor should do it": sovereignty has replaced proportionality, and mass analysis itself is no longer questioned.',
    },
    src: { label: 'Le Monde · 19 mai 2026', href: 'https://www.lemonde.fr/economie/article/2026/05/19/les-services-secrets-allemands-se-tournent-vers-le-francais-chapsvision-pour-leur-logiciel-d-analyse-de-donnees-afin-d-eviter-palantir_6691466_3234.html' },
  },
  {
    id: 'us-fisa-702',
    date: '2026-06-12',
    region: 'us',
    themes: ['messaging'],
    status: 'negociation',
    title: { fr: 'FISA 702 expire — la collecte continue quand même', en: 'FISA 702 lapses — collection carries on anyway' },
    body: {
      fr: 'La Section 702 — collecte sans mandat des communications transitant par les fournisseurs américains — arrivait à échéance en avril 2026. Deux extensions courtes plus tard, l’autorité expire mi-juin sans accord au Congrès, bloqué sur l’exigence d’un mandat pour les recherches du FBI visant des Américains. Mais les certifications existantes restent valides jusqu’en mars 2027 : la machine tourne un an de plus, sans base renouvelée. Un pouvoir de surveillance « temporaire » ne s’éteint jamais vraiment.',
      en: 'Section 702 — warrantless collection of communications transiting US providers — was due to expire in April 2026. Two short extensions later, the authority lapses mid-June with Congress deadlocked over requiring a warrant for FBI searches of Americans. But existing certifications remain valid until March 2027: the machine runs another year on no renewed basis. A "temporary" surveillance power never quite switches off.',
    },
    src: { label: 'Brennan Center · 2026', href: 'https://www.brennancenter.org/our-work/research-reports/section-702-foreign-intelligence-surveillance-act-fisa-2026-resource-page' },
  },
  {
    id: 'euro-numerique-econ',
    date: '2026-06-23',
    region: 'eu',
    themes: ['money'],
    status: 'negociation',
    title: { fr: 'Euro numérique : « non programmable », mais conditionnel', en: 'Digital euro: "not programmable", yet conditional' },
    body: {
      fr: 'La commission ECON du Parlement adopte sa position (43 voix contre 14) : cap sur un lancement d’ici 2029. La BCE jure que l’euro numérique « ne sera pas de la monnaie programmable » — et présente en parallèle des « paiements conditionnels » comme services optionnels ; le plafond de détention (l’ordre de ~3 000 € circule) sera fixé plus tard, par elle. L’écart entre la promesse et la plateforme tient à une décision politique, pas à une impossibilité technique : l’infrastructure de conditionnalité et de traçabilité existera dès le premier jour.',
      en: 'Parliament’s ECON committee adopts its position (43 votes to 14): course set for a launch by 2029. The ECB swears the digital euro "will not be programmable money" — while presenting "conditional payments" as optional services; the holding cap (a figure around €3,000 circulates) will be set later, by the ECB itself. The gap between the promise and the platform rests on a political decision, not a technical impossibility: the conditionality and traceability infrastructure will exist from day one.',
    },
    src: { label: 'Parlement européen · 23 juin 2026', href: 'https://www.europarl.europa.eu/news/en/press-room/20260622IPR45912/digital-euro-meps-want-to-ensure-sovereignty-privacy-and-financial-stability' },
  },
  {
    id: 'europol-reforme',
    date: '2026-06-24',
    region: 'eu',
    themes: ['messaging', 'money', 'aibio'],
    status: 'propose',
    title: { fr: 'Europol : budget porté à 3 milliards, mandat sur le chiffrement', en: 'Europol: budget raised to €3 billion, a mandate on encryption' },
    body: {
      fr: 'La Commission propose la plus grande réforme d’Europol en 25 ans : budget de 1,9 à 3 milliards d’euros, 900 agents de plus, mandat étendu aux communications chiffrées, à la crypto et à la fraude assistée par IA ; hub « technologie » centré sur le décryptage ; « espace européen des données policières » à partage automatisé. Le bras armé de ProtectEU — une agence supranationale dotée de capacités de décryptage, dont une eurodéputée prévient qu’elle « ne doit pas mener à une surveillance de masse ».',
      en: 'The Commission proposes Europol’s biggest overhaul in 25 years: budget up from €1.9bn to €3bn, 900 extra staff, a mandate extended to encrypted communications, crypto-assets and AI-assisted fraud; a "technology" hub centred on decryption; an automated "European police data space". ProtectEU’s armed wing — a supranational agency with decryption capabilities, which one MEP warns "must not lead to mass surveillance".',
    },
    src: { label: 'Commission · 24 juin 2026', href: 'https://ec.europa.eu/commission/presscorner/detail/en/ip_26_1420' },
  },
  {
    id: 'pega-kouloglou',
    date: '2026-07',
    region: 'eu',
    themes: ['media', 'messaging'],
    status: 'revele',
    title: { fr: 'Pegasus au Parlement : le contrôleur était surveillé', en: 'Pegasus in Parliament: the watchdog was being watched' },
    body: {
      fr: 'Le Citizen Lab révèle qu’un eurodéputé membre de la commission PEGA — celle-là même qui enquêtait sur Pegasus et les abus de spyware en Europe — a été piraté par Pegasus pendant qu’il y siégeait, avec accès possible aux délibérations confidentielles. L’attaque n’est pas attribuée ; une coalition d’ONG exige une réaction de l’UE. Espionner l’organe chargé de contrôler le spyware est l’inversion ultime du contrôle démocratique — et personne n’est désigné responsable.',
      en: 'Citizen Lab reveals that an MEP on the PEGA committee — the very body that investigated Pegasus and spyware abuse in Europe — was hacked with Pegasus while serving on it, with possible access to confidential deliberations. The attack is unattributed; a coalition of NGOs demands an EU response. Spying on the body tasked with overseeing spyware is the ultimate inversion of democratic oversight — and nobody is named responsible.',
    },
    src: { label: 'Citizen Lab · juil. 2026', href: 'https://citizenlab.ca/research/member-of-committee-investigating-spyware-hacked-with-pegasus/' },
  },
]
