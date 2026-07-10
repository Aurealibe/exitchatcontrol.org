import { describe, expect, it } from 'vitest'
import { escapeHtml, mdToHtml } from '../../src/lib/md'

// The md micro-renderer is the ONLY place dataset prose becomes HTML
// (set:html in Timeline/Observatory/Directory/Checklist). It must escape
// first and only ever emit <strong>, <br /> and Ext-policy anchors.

describe('escapeHtml', () => {
  it('escapes all five HTML special characters', () => {
    expect(escapeHtml(`<a href="x" title='y'> & </a>`)).toBe(
      '&lt;a href=&quot;x&quot; title=&#39;y&#39;&gt; &amp; &lt;/a&gt;',
    )
  })
})

describe('mdToHtml', () => {
  it('escapes HTML before rendering anything (no injection from overlays)', () => {
    expect(mdToHtml('<script>alert("x")</script>')).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;',
    )
    expect(mdToHtml('<img src=x onerror=alert(1)>')).toBe('&lt;img src=x onerror=alert(1)&gt;')
  })

  it('renders **bold** as <strong>', () => {
    expect(mdToHtml('a **very bold** claim')).toBe('a <strong>very bold</strong> claim')
  })

  it('renders [text](https://url) with the Ext.astro rel policy', () => {
    expect(mdToHtml('see [the ruling](https://example.org/a?b=c&d=e)')).toBe(
      'see <a href="https://example.org/a?b=c&amp;d=e" target="_blank" rel="noopener noreferrer">the ruling</a>',
    )
  })

  it('never links non-https URLs (they stay literal, escaped text)', () => {
    expect(mdToHtml('[x](http://insecure.example)')).toBe('[x](http://insecure.example)')
    expect(mdToHtml('[x](javascript:alert(1))')).toBe('[x](javascript:alert(1))')
  })

  it('escapes markup inside link labels', () => {
    expect(mdToHtml('[<b>hi</b>](https://example.org)')).toBe(
      '<a href="https://example.org" target="_blank" rel="noopener noreferrer">&lt;b&gt;hi&lt;/b&gt;</a>',
    )
  })

  it('renders bold inside a link label', () => {
    expect(mdToHtml('[**Blaze**, 1994](https://example.org)')).toBe(
      '<a href="https://example.org" target="_blank" rel="noopener noreferrer"><strong>Blaze</strong>, 1994</a>',
    )
  })

  it('converts line breaks to <br />', () => {
    expect(mdToHtml('one\ntwo')).toBe('one<br />two')
  })

  it('renders NOTHING else from markdown', () => {
    expect(mdToHtml('# heading * item _em_ `code`')).toBe('# heading * item _em_ `code`')
  })
})
