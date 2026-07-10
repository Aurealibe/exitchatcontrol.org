/* Language-neutral dataset cores (src/data/*.json) merged with per-locale
   prose overlays (src/i18n/content/<locale>/*.json), both validated with zod.
   Every merge checks id parity: a missing or extra overlay id throws with the
   full list, so a translation that drifts out of sync fails the build instead
   of silently shipping mixed-language content.

   Overlay files may carry top-level marker keys starting with "_"
   (e.g. "_machineTranslationPending") — they are ignored by the merge.
   Observatory core entries may carry "_pendingVerification": true while the
   fact-check of the 2025-09 → 2026-07 batch is outstanding. */

import { z } from 'astro/zod'
import type { Locale } from '../i18n/locales'

import eventsCore from '../data/events.json'
import observatoryCore from '../data/observatory.json'
import directoryCore from '../data/directory.json'
import checklistCore from '../data/checklist.json'
import alliesCore from '../data/allies.json'

import enEvents from '../i18n/content/en/events.json'
import enObservatory from '../i18n/content/en/observatory.json'
import enDirectory from '../i18n/content/en/directory.json'
import enChecklist from '../i18n/content/en/checklist.json'
import enAllies from '../i18n/content/en/allies.json'
import frEvents from '../i18n/content/fr/events.json'
import frObservatory from '../i18n/content/fr/observatory.json'
import frDirectory from '../i18n/content/fr/directory.json'
import frChecklist from '../i18n/content/fr/checklist.json'
import frAllies from '../i18n/content/fr/allies.json'
import nlEvents from '../i18n/content/nl/events.json'
import nlObservatory from '../i18n/content/nl/observatory.json'
import nlDirectory from '../i18n/content/nl/directory.json'
import nlChecklist from '../i18n/content/nl/checklist.json'
import nlAllies from '../i18n/content/nl/allies.json'

/* ─── enums (mirroring pr1's content model) ────────────────────────────── */

export const EVENT_KINDS = ['promise', 'creep', 'struck', 'revealed'] as const
export const REGIONS = ['eu', 'fr', 'uk', 'us', 'au', 'ch', 'ru', 'cn', 'vn', 'world'] as const
export const THEMES = ['messaging', 'identity', 'money', 'media', 'aibio'] as const
export const STATUSES = [
  'en_vigueur',
  'adopte',
  'negociation',
  'propose',
  'rejete',
  'suspendu',
  'revele',
] as const
export const DIRECTORY_CATEGORIES = [
  'messagerie',
  'email',
  'navigation',
  'vpn-reseau',
  'dns',
  'mots-de-passe',
  'stockage-photos',
  'quotidien',
  'social',
  'ia-locale-agentique',
  'os-mobile',
  'selfhost',
  'finance',
  'opsec',
] as const
export const CHECKLIST_LEVELS = ['green', 'yellow', 'red'] as const
export const ALLY_GROUPS = ['campaigns', 'chroniclers'] as const

export type EventKind = (typeof EVENT_KINDS)[number]
export type Region = (typeof REGIONS)[number]
export type Theme = (typeof THEMES)[number]
export type Status = (typeof STATUSES)[number]
export type DirectoryCategory = (typeof DIRECTORY_CATEGORIES)[number]
export type ChecklistLevel = (typeof CHECKLIST_LEVELS)[number]
export type AllyGroup = (typeof ALLY_GROUPS)[number]

/* ─── core schemas ─────────────────────────────────────────────────────── */

const slug = z.string().regex(/^[a-z0-9-]+$/, 'ids are lowercase slugs (deep-link anchors)')
const isoDate = z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/, 'dates are YYYY[-MM[-DD]]')
const httpsUrl = z.string().refine((u) => {
  if (!u.startsWith('https://')) return false
  try {
    new URL(u)
    return true
  } catch {
    return false
  }
}, 'source links must be valid https:// URLs')
const source = z.object({ label: z.string().min(3), href: httpsUrl }).strict()

export const eventCoreSchema = z
  .object({ id: slug, date: isoDate, kind: z.enum(EVENT_KINDS), src: source })
  .strict()

export const observatoryCoreSchema = z
  .object({
    id: slug,
    date: isoDate,
    region: z.enum(REGIONS),
    themes: z.array(z.enum(THEMES)).min(1),
    status: z.enum(STATUSES),
    src: source,
    _pendingVerification: z.literal(true).optional(),
  })
  .strict()

export const directoryCoreSchema = z
  .object({
    id: slug,
    category: z.enum(DIRECTORY_CATEGORIES),
    name: z.string().min(2),
    url: httpsUrl,
    license: z.string().min(3),
    iconSlug: z
      .string()
      .regex(/^[a-z0-9]+$/)
      .optional(),
  })
  .strict()

export const checklistCoreSchema = z.object({ id: slug, level: z.enum(CHECKLIST_LEVELS) }).strict()

export const allyCoreSchema = z
  .object({
    id: slug,
    group: z.enum(ALLY_GROUPS),
    name: z.string().min(2),
    url: httpsUrl,
    displayUrl: z.string().min(3),
  })
  .strict()

/* ─── overlay schemas (markdown prose, one shape per dataset) ──────────── */

export const proseOverlaySchema = z
  .object({ title: z.string().min(4), body: z.string().min(80) })
  .strict()
export const bodyOverlaySchema = z.object({ body: z.string().min(10) }).strict()
export const roleOverlaySchema = z.object({ role: z.string().min(20) }).strict()

export type EventCore = z.infer<typeof eventCoreSchema>
export type ObservatoryCore = z.infer<typeof observatoryCoreSchema>
export type DirectoryCore = z.infer<typeof directoryCoreSchema>
export type ChecklistCore = z.infer<typeof checklistCoreSchema>
export type AllyCore = z.infer<typeof allyCoreSchema>
export type ProseOverlay = z.infer<typeof proseOverlaySchema>
export type BodyOverlay = z.infer<typeof bodyOverlaySchema>
export type RoleOverlay = z.infer<typeof roleOverlaySchema>

interface DatasetShapes {
  events: EventCore & ProseOverlay
  observatory: ObservatoryCore & ProseOverlay
  directory: DirectoryCore & BodyOverlay
  checklist: ChecklistCore & BodyOverlay
  allies: AllyCore & RoleOverlay
}

export type DatasetName = keyof DatasetShapes
export const DATASET_NAMES = ['events', 'observatory', 'directory', 'checklist', 'allies'] as const

type OverlayFile = Record<string, unknown>

type DatasetDef = {
  core: readonly unknown[]
  coreSchema: z.ZodTypeAny
  overlaySchema: z.ZodTypeAny
  overlays: Record<Locale, OverlayFile>
}

const registry: Record<DatasetName, DatasetDef> = {
  events: {
    core: eventsCore,
    coreSchema: eventCoreSchema,
    overlaySchema: proseOverlaySchema,
    overlays: { en: enEvents, fr: frEvents, nl: nlEvents },
  },
  observatory: {
    core: observatoryCore,
    coreSchema: observatoryCoreSchema,
    overlaySchema: proseOverlaySchema,
    overlays: { en: enObservatory, fr: frObservatory, nl: nlObservatory },
  },
  directory: {
    core: directoryCore,
    coreSchema: directoryCoreSchema,
    overlaySchema: bodyOverlaySchema,
    overlays: { en: enDirectory, fr: frDirectory, nl: nlDirectory },
  },
  checklist: {
    core: checklistCore,
    coreSchema: checklistCoreSchema,
    overlaySchema: bodyOverlaySchema,
    overlays: { en: enChecklist, fr: frChecklist, nl: nlChecklist },
  },
  allies: {
    core: alliesCore,
    coreSchema: allyCoreSchema,
    overlaySchema: roleOverlaySchema,
    overlays: { en: enAllies, fr: frAllies, nl: nlAllies },
  },
}

/** Overlay entries minus top-level "_" marker keys ("_machineTranslationPending"…). */
export function overlayEntries(file: OverlayFile): Record<string, unknown> {
  return Object.fromEntries(Object.entries(file).filter(([key]) => !key.startsWith('_')))
}

/**
 * Checks id parity between a core and an overlay. Throws a single error
 * listing EVERY missing and extra id, so one build failure shows the whole
 * drift instead of one id at a time.
 */
export function assertOverlayParity(
  coreIds: readonly string[],
  overlay: OverlayFile,
  context: string,
): void {
  const entries = overlayEntries(overlay)
  const coreSet = new Set(coreIds)
  const missing = coreIds.filter((cid) => !(cid in entries))
  const extra = Object.keys(entries).filter((key) => !coreSet.has(key))
  if (missing.length > 0 || extra.length > 0) {
    const parts = [`[content] ${context}: overlay out of sync with core`]
    if (missing.length > 0) parts.push(`missing ids (${missing.length}): ${missing.join(', ')}`)
    if (extra.length > 0) parts.push(`extra ids (${extra.length}): ${extra.join(', ')}`)
    throw new Error(parts.join(' — '))
  }
}

/**
 * Validates the core and the requested locale overlay of a dataset, checks
 * id parity in both directions, and returns core rows merged with their
 * localized prose, in core (chronological/curated) order.
 */
export function loadDataset<N extends DatasetName>(name: N, locale: Locale): DatasetShapes[N][] {
  const def = registry[name]
  const core = z.array(def.coreSchema).min(1).parse(def.core) as Array<{ id: string }>

  const ids = core.map((row) => row.id)
  const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i)
  if (duplicates.length > 0) {
    throw new Error(`[content] ${name}: duplicate core ids: ${[...new Set(duplicates)].join(', ')}`)
  }

  assertOverlayParity(ids, def.overlays[locale], `${name}/${locale}`)

  const prose = overlayEntries(def.overlays[locale])
  return core.map((row) => ({
    ...row,
    ...(def.overlaySchema.parse(prose[row.id]) as Record<string, string>),
  })) as DatasetShapes[N][]
}
