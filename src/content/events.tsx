import type { ReactNode } from 'react'

/* The precedents timeline DATA — 25 years of dated, primary-sourced
   surveillance scope-creep receipts. Kept out of the component file so the
   list is testable (tests/content.test.ts) and fast-refresh stays clean.
   Four event kinds: promise (the reassuring pitch) · creep (the drift) ·
   struck (a rampart held) · revealed (the abuse surfaced years later). */

export type Kind = 'promise' | 'creep' | 'struck' | 'revealed'

export type Ev = {
  date: string
  kind: Kind
  title: { fr: string; en: string }
  body: { fr: ReactNode; en: ReactNode }
  src: { label: string; href: string }
}

export const KIND_LABEL: Record<Kind, { fr: string; en: string }> = {
  promise: { fr: 'la promesse', en: 'the promise' },
  creep: { fr: 'la dérive', en: 'the creep' },
  struck: { fr: 'le rempart', en: 'the rampart' },
  revealed: { fr: 'la révélation', en: 'the reveal' },
}

export const EVENTS: Ev[] = [
  {
    date: '1993',
    kind: 'promise',
    title: { fr: 'Le Clipper Chip', en: 'The Clipper Chip' },
    body: {
      fr: 'La NSA propose une puce de chiffrement avec clé en dépôt pour l’État, « uniquement pour la police, sous mandat ». Failles techniques démontrées, rejet massif : abandon en 1996. Première guerre de la crypto, même scénario qu’aujourd’hui.',
      en: 'The NSA pushes an encryption chip with a government-held key escrow, "for law enforcement, under warrant only". Flaws demonstrated, massive rejection: abandoned by 1996. The first crypto war, same script as today.',
    },
    src: { label: 'EPIC · Clipper Chip', href: 'https://archive.epic.org/crypto/clipper/' },
  },
  {
    date: '2001-07-05',
    kind: 'revealed',
    title: { fr: 'ECHELON confirmé par le Parlement européen', en: 'ECHELON confirmed by the European Parliament' },
    body: {
      fr: 'Une commission temporaire du Parlement européen confirme l’existence d’un réseau mondial d’interception des communications privées et commerciales (États-Unis, Royaume-Uni, Canada, Australie, Nouvelle-Zélande).',
      en: 'A temporary committee of the European Parliament confirms the existence of a global network intercepting private and commercial communications (US, UK, Canada, Australia, New Zealand).',
    },
    src: { label: 'Rapport A5-0264/2001', href: 'https://www.europarl.europa.eu/doceo/document/A-5-2001-0264_EN.html' },
  },
  {
    date: '2001-10-04',
    kind: 'creep',
    title: { fr: '23 jours après le 11-Septembre', en: '23 days after 9/11' },
    body: {
      fr: 'Un ordre secret du président Bush lance l’écoute domestique sans mandat de la NSA. La crise crée le programme ; le programme survit à la crise. Le Patriot Act suit le 26 octobre, « temporaire » lui aussi : ses clauses seront reconduites pendant 14 ans.',
      en: 'A secret presidential order starts the NSA’s warrantless domestic spying. The crisis creates the program; the program outlives the crisis. The Patriot Act follows on 26 October, also "temporary": its sunset clauses get renewed for 14 years.',
    },
    src: { label: 'EFF · NSA Spying Timeline', href: 'https://www.eff.org/nsa-spying/timeline' },
  },
  {
    date: '2006-01-20',
    kind: 'revealed',
    title: { fr: 'Room 641A', en: 'Room 641A' },
    body: {
      fr: 'Le technicien AT&T Mark Klein apporte à l’EFF les plans de la salle secrète de la NSA dans le central de San Francisco : l’interception se fait au niveau de l’infrastructure, sur tout le trafic, pas sur des suspects.',
      en: 'AT&T technician Mark Klein hands EFF the documents describing the NSA’s secret room in the San Francisco switching hub: interception at the infrastructure level, on all traffic, not on suspects.',
    },
    src: { label: 'EFF · Jewel v. NSA evidence', href: 'https://www.eff.org/nsa-spying/timeline' },
  },
  {
    date: '2006-03-15',
    kind: 'creep',
    title: { fr: 'Directive européenne de rétention des données', en: 'EU Data Retention Directive' },
    body: {
      fr: 'L’UE impose la conservation des métadonnées télécoms de toute la population (6 à 24 mois), « contre le crime grave ». Personne n’est suspect, tout le monde est fiché. Le modèle exact de Chat Control, vingt ans plus tôt.',
      en: 'The EU mandates retention of the whole population’s telecom metadata (6–24 months), "against serious crime". No one is a suspect, everyone is on file. Chat Control’s exact blueprint, twenty years earlier.',
    },
    src: { label: 'Directive 2006/24/EC', href: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32006L0024' },
  },
  {
    date: '2013-06-05',
    kind: 'revealed',
    title: { fr: 'Snowden : « collect it all »', en: 'Snowden: "collect it all"' },
    body: {
      fr: 'Le Guardian publie l’ordre secret de la cour FISA obligeant Verizon à livrer les métadonnées de tous ses clients, puis PRISM. Trois jours plus tôt, le directeur du renseignement Clapper avait juré au Congrès que non — sa réponse « la moins mensongère possible », dira-t-il.',
      en: 'The Guardian publishes the secret FISA order forcing Verizon to hand over all customers’ metadata, then PRISM. Days earlier, intelligence director Clapper had sworn to Congress it wasn’t happening — the "least untruthful" answer, he later said.',
    },
    src: { label: 'The Guardian · 5 juin 2013', href: 'https://www.theguardian.com/world/2013/jun/06/nsa-phone-records-verizon-court-order' },
  },
  {
    date: '2014-04-08',
    kind: 'struck',
    title: { fr: 'La CJUE annule la rétention généralisée', en: 'The CJEU strikes down blanket retention' },
    body: {
      fr: 'Arrêt Digital Rights Ireland : la directive de 2006 est invalidée en bloc, la surveillance indiscriminée de toute la population viole la Charte des droits fondamentaux. Une ONG de quelques bénévoles a fait tomber une directive européenne.',
      en: 'Digital Rights Ireland: the 2006 directive is annulled outright — indiscriminate surveillance of the whole population violates the Charter of Fundamental Rights. A tiny volunteer NGO brought down an EU directive.',
    },
    src: { label: 'CJUE · C-293/12', href: 'https://curia.europa.eu/juris/documents.jsf?num=C-293/12' },
  },
  {
    date: '2016-11-29',
    kind: 'creep',
    title: { fr: 'Le « Snooper’s Charter » britannique', en: 'The UK "Snooper’s Charter"' },
    body: {
      fr: 'L’Investigatory Powers Act légalise la collecte en masse et le piratage d’appareils par l’État, et oblige les FAI à conserver l’historique de navigation de chacun. Trois semaines plus tard, la CJUE (arrêt Tele2/Watson) redit que la rétention généralisée est illégale — Londres la garde.',
      en: 'The Investigatory Powers Act legalises bulk collection and state hacking, and forces ISPs to keep everyone’s browsing history. Three weeks later the CJEU (Tele2/Watson) repeats that blanket retention is unlawful — London keeps it anyway.',
    },
    src: { label: 'legislation.gov.uk', href: 'https://www.legislation.gov.uk/ukpga/2016/25/contents' },
  },
  {
    date: '2018-12-06',
    kind: 'creep',
    title: { fr: 'L’Australie contre les mathématiques', en: 'Australia vs mathematics' },
    body: {
      fr: 'L’Assistance and Access Act permet d’ordonner secrètement à une entreprise d’affaiblir son chiffrement (« technical capability notices »). Le Premier ministre avait donné le ton : « les lois australiennes prévalent sur les lois des mathématiques ».',
      en: 'The Assistance and Access Act lets the state secretly order a company to weaken its encryption ("technical capability notices"). The PM had set the tone: "the laws of Australia prevail over the laws of mathematics".',
    },
    src: { label: 'Parliament of Australia', href: 'https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/Bills_Search_Results/Result?bId=r6195' },
  },
  {
    date: '2020-02-11',
    kind: 'revealed',
    title: { fr: 'Crypto AG : le vendeur de coffres avait les clés', en: 'Crypto AG: the safe-maker kept the keys' },
    body: {
      fr: 'Le Washington Post révèle (histoire interne de la CIA à l’appui) que la CIA et le BND possédaient secrètement Crypto AG, le fournisseur suisse de machines de chiffrement de 120 gouvernements, depuis 1970. Dans les années 1980, 40 % des câbles diplomatiques décodés par la NSA passaient par ce canal. Morale : une porte dérobée « de confiance » est une porte dérobée.',
      en: 'The Washington Post reveals (backed by the CIA’s own internal history) that the CIA and BND secretly owned Crypto AG — the Swiss encryption vendor of 120 governments — since 1970. In the 1980s, 40% of the diplomatic cables NSA decoded came through it. Moral: a "trusted" backdoor is a backdoor.',
    },
    src: { label: 'Washington Post · Operation Rubicon', href: 'https://www.washingtonpost.com/graphics/2020/world/national-security/cia-crypto-encryption-machines-espionage/' },
  },
  {
    date: '2020-10-06',
    kind: 'struck',
    title: { fr: 'La Quadrature du Net devant la CJUE', en: 'La Quadrature du Net at the CJEU' },
    body: {
      fr: 'La Cour confirme l’interdiction de la conservation généralisée en France et au Royaume-Uni, tout en ouvrant des exceptions « sécurité nationale ». Leçon double : les recours marchent, et chaque exception devient la prochaine règle. La Commission n’a jamais ouvert d’infraction contre les États qui conservent quand même.',
      en: 'The Court upholds the ban on blanket retention against France and the UK, while carving out "national security" windows. Twin lesson: lawsuits work, and every exception becomes the next rule. The Commission has never opened an infringement case against states that retain anyway.',
    },
    src: { label: 'CJUE · C-511/18', href: 'https://curia.europa.eu/juris/documents.jsf?num=C-511/18' },
  },
  {
    date: '2021-07-14',
    kind: 'promise',
    title: { fr: 'Chat Control 1.0, « temporaire »', en: 'Chat Control 1.0, "temporary"' },
    body: {
      fr: 'Le règlement 2021/1232 autorise le scan « volontaire » des messageries, par dérogation à ePrivacy. Clause d’extinction au 3 août 2024, promis. Elle sera prolongée en 2024, expirera en 2026… puis sera ressuscitée (voir plus bas).',
      en: 'Regulation 2021/1232 allows "voluntary" scanning of private messages, derogating from ePrivacy. Sunset on 3 August 2024, promised. It gets extended in 2024, expires in 2026… then rises from the dead (see below).',
    },
    src: { label: 'Règlement (UE) 2021/1232', href: 'https://eur-lex.europa.eu/eli/reg/2021/1232/oj' },
  },
  {
    date: '2021-07-18',
    kind: 'revealed',
    title: { fr: 'Projet Pegasus', en: 'The Pegasus Project' },
    body: {
      fr: '80 journalistes de 17 rédactions documentent l’espionnage de journalistes, d’avocats, d’opposants et de chefs d’État via le logiciel espion de NSO. La forensique d’Amnesty (revue par le Citizen Lab) prouve des infections « zéro clic » sur des iPhone à jour : quand l’appareil est visé, le chiffrement ne suffit plus. Exactement la logique du scan côté client.',
      en: '80 journalists across 17 newsrooms document the spying on journalists, lawyers, dissidents and heads of state via NSO’s spyware. Amnesty’s forensics (peer-reviewed by Citizen Lab) prove zero-click infections of fully patched iPhones: when the device is targeted, encryption is not enough. Exactly the client-side scanning logic.',
    },
    src: { label: 'Amnesty · Forensic Methodology Report', href: 'https://www.amnesty.org/en/latest/research/2021/07/forensic-methodology-report-how-to-catch-nso-groups-pegasus/' },
  },
  {
    date: '2021-08-05',
    kind: 'struck',
    title: { fr: 'Apple annonce le scan sur l’appareil… puis renonce', en: 'Apple announces on-device scanning… then walks it back' },
    body: {
      fr: 'Apple présente un scan CSAM des photos directement sur l’iPhone. Tollé des chercheurs et des ONG : c’est l’infrastructure d’une surveillance généralisable. Décembre 2022 : Apple abandonne, concluant qu’on ne peut pas le construire sans « ouvrir la voie à des dérives ». Le précédent technique que Chat Control 2.0 veut rendre obligatoire.',
      en: 'Apple unveils on-device CSAM photo scanning for the iPhone. Researchers and NGOs revolt: it is the infrastructure of generalisable surveillance. December 2022: Apple abandons it, concluding it cannot be built without "the risk of a slippery slope". The very mechanism Chat Control 2.0 wants to mandate.',
    },
    src: { label: 'WIRED · Apple kills CSAM scanning', href: 'https://www.wired.com/story/apple-photo-scanning-csam-communication-safety-messages/' },
  },
  {
    date: '2022-05-11',
    kind: 'creep',
    title: { fr: 'Chat Control 2.0 : le scan obligatoire', en: 'Chat Control 2.0: mandatory scanning' },
    body: {
      fr: 'La Commission propose le règlement CSAR (COM/2022/209) : « ordres de détection » pouvant imposer le scan à toutes les plateformes, y compris chiffrées de bout en bout. Le volontaire de 2021 devient l’obligatoire de 2022 — la dérive au sens littéral.',
      en: 'The Commission proposes the CSAR regulation (COM/2022/209): "detection orders" that can force scanning on every platform, including end-to-end encrypted ones. 2021’s voluntary becomes 2022’s mandatory — scope creep in the literal sense.',
    },
    src: { label: 'COM/2022/209', href: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A52022PC0209' },
  },
  {
    date: '2023-10-26',
    kind: 'creep',
    title: { fr: 'Online Safety Act : la « spy clause »', en: 'Online Safety Act: the "spy clause"' },
    body: {
      fr: 'Le Royaume-Uni se dote du pouvoir d’ordonner aux messageries de scanner les contenus chiffrés « dès que techniquement faisable ». Signal et WhatsApp menacent de quitter le pays ; le gouvernement admet que ce n’est pas faisable — mais garde le pouvoir dans la loi.',
      en: 'The UK grants itself the power to order messengers to scan encrypted content "where technically feasible". Signal and WhatsApp threaten to leave; the government admits it is not feasible — but keeps the power on the books.',
    },
    src: { label: 'Online Safety Act 2023', href: 'https://www.legislation.gov.uk/ukpga/2023/50/contents' },
  },
  {
    date: '2024-04-29',
    kind: 'creep',
    title: { fr: 'Le « temporaire » prolongé une première fois', en: 'The "temporary" gets its first extension' },
    body: {
      fr: 'Le règlement 2024/1307 repousse l’extinction de Chat Control 1.0 du 3 août 2024 au 3 avril 2026. Un dispositif d’exception qui se renouvelle n’est plus une exception : c’est un régime.',
      en: 'Regulation 2024/1307 pushes Chat Control 1.0’s sunset from 3 August 2024 to 3 April 2026. An emergency measure that renews itself is no longer an exception: it is a regime.',
    },
    src: { label: 'Règlement (UE) 2024/1307', href: 'https://eur-lex.europa.eu/eli/reg/2024/1307/oj' },
  },
  {
    date: '2025-07-25',
    kind: 'creep',
    title: { fr: 'Royaume-Uni : une pièce d’identité pour Internet', en: 'UK: show ID to use the internet' },
    body: {
      fr: 'L’Online Safety Act impose la vérification d’âge « hautement efficace » (pièce d’identité, carte bancaire, reconnaissance faciale) pour l’accès à des pans entiers du web. Les inscriptions VPN bondissent de plus de 1 400 % en quelques heures — et les Lords discutent déjà d’encadrer les VPN.',
      en: 'The Online Safety Act switches on "highly effective" age verification (ID, credit card, face estimation) for large parts of the web. VPN signups jump over 1,400% within hours — and the Lords are already debating limits on VPNs.',
    },
    src: { label: 'Ofcom · age assurance', href: 'https://www.ofcom.org.uk/online-safety/protecting-children/age-checks-to-protect-children-online' },
  },
  {
    date: '2025-11-13',
    kind: 'creep',
    title: { fr: 'Le Conseil veut supprimer la clause d’extinction', en: 'The Council moves to delete the sunset clause' },
    body: {
      fr: 'Position du Conseil pour les trilogues CSAR (doc. 15318/25) : supprimer purement et simplement la clause d’extinction du scan « volontaire » — le rendre permanent. Le projet de la présidence danoise envisageait le scan côté client obligatoire. L’EDPS répondra en février 2026 : dégradation substantielle de la confidentialité, analyse indiscriminée disproportionnée.',
      en: 'The Council’s trilogue position (doc. 15318/25): simply delete the sunset clause of "voluntary" scanning — make it permanent. The Danish presidency draft contemplated mandatory client-side scanning. The EDPS answers in February 2026: substantial degradation of confidentiality, indiscriminate analysis disproportionate.',
    },
    src: { label: 'EDPS · Opinion 16 fév. 2026', href: 'https://www.edps.europa.eu/system/files/2026-02/26-02-16_opinion-extending-application-regulation-2021-1232_en.pdf' },
  },
  {
    date: '2026-03-26',
    kind: 'struck',
    title: { fr: 'Le Parlement dit non', en: 'Parliament says no' },
    body: {
      fr: 'Le Parlement européen rejette la prolongation du scan volontaire jusqu’en 2028 (228 pour, 311 contre, 92 abstentions). Conséquence : la base légale expire le 3 avril 2026. La pression citoyenne et le travail des ONG ont tenu — pendant trois mois.',
      en: 'The European Parliament rejects extending voluntary scanning to 2028 (228 for, 311 against, 92 abstentions). Consequence: the legal basis expires on 3 April 2026. Citizen pressure and NGO work held the line — for three months.',
    },
    src: { label: 'Parlement européen · communiqué', href: 'https://www.europarl.europa.eu/news/en/press-room/20260325IPR39207/child-sexual-abuse-online-voluntary-detection-measures-will-not-be-extended' },
  },
  {
    date: '2026-04-04',
    kind: 'revealed',
    title: { fr: 'La loi expire, le scan continue', en: 'The law lapses, the scanning continues' },
    body: {
      fr: 'La dérogation expirée, les géants (Google, Meta, Microsoft, Snap…) annoncent qu’ils continueront de scanner les messages, base légale ou pas — après avoir signé le 19 mars un appel commun pour pérenniser le dispositif. L’aveu que la « conformité » était un décor.',
      en: 'With the derogation lapsed, the giants (Google, Meta, Microsoft, Snap…) announce they will keep scanning messages, legal basis or not — after signing a joint appeal on 19 March to entrench the regime. The admission that "compliance" was scenery.',
    },
    src: { label: 'The Record · Big Tech vows to keep scanning', href: 'https://therecord.media/big-tech-vows-to-continue-csam-scanning' },
  },
  {
    date: '2026-07-02',
    kind: 'creep',
    title: { fr: 'Le Conseil ressuscite le texte expiré', en: 'The Council resurrects the lapsed text' },
    body: {
      fr: 'Trois mois après l’expiration, le Conseil adopte sa position pour rétablir le scan volontaire jusqu’au 3 avril 2028, envoyée au Parlement en seconde lecture — la procédure où le rejet exige une majorité absolue (361 voix sur 720), pas une majorité des votants.',
      en: 'Three months after the lapse, the Council adopts its position to reinstate voluntary scanning until 3 April 2028, sent to Parliament at second reading — the procedure where rejection needs an absolute majority (361 of 720), not a majority of votes cast.',
    },
    src: { label: 'Conseil de l’UE · 2 juillet 2026', href: 'https://www.consilium.europa.eu/en/press/press-releases/2026/07/02/council-moves-to-reinstate-interim-measure-to-combat-child-sexual-abuse-online/' },
  },
  {
    date: '2026-07-09',
    kind: 'creep',
    title: { fr: 'La majorité perd : 314 < 361', en: 'The majority loses: 314 < 361' },
    body: {
      fr: 'Procédure d’urgence votée le 7 juillet (331/304/11), vote le 9 : 314 eurodéputés pour le rejet, 276 contre, 17 abstentions. La majorité simple voulait rejeter — il fallait 361. Un amendement limitant le scan aux suspects désignés par un juge obtient aussi une majorité simple (322/255), même sort. Le scan « volontaire » court jusqu’en 2028 ; les trilogues sur le CSAR permanent (5 échecs, dont le « final » du 29 juin) reprennent en septembre.',
      en: 'Urgent procedure passed on 7 July (331/304/11), vote on the 9th: 314 MEPs to reject, 276 against, 17 abstentions. A simple majority wanted it gone — 361 were needed. An amendment restricting scanning to court-named suspects also won a simple majority (322/255), same fate. "Voluntary" scanning runs to 2028; trilogues on the permanent CSAR (5 failures, including the "final" one of 29 June) resume in September.',
    },
    src: { label: 'Patrick Breyer · 9 juillet 2026', href: 'https://www.patrick-breyer.de/en/eu-parliament-greenlights-chat-control-1-0-breyer-our-children-lose-out/' },
  },
]
