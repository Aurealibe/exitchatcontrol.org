import { T } from '../lib/i18n'
import { BRAND_ICONS } from '../icons.generated'

export function Footer() {
  return (
    <footer>
      <div className="wrap cols">
        <div>
          <h4><T fr="Ressources" en="Resources" /></h4>
          <p className="srclist">
            <a href="https://www.privacyguides.org" target="_blank" rel="noopener noreferrer">Privacy Guides</a><br />
            <a href="https://ssd.eff.org" target="_blank" rel="noopener noreferrer">EFF · Surveillance Self-Defense</a><br />
            <a href="https://freedom.press" target="_blank" rel="noopener noreferrer">Freedom of the Press Foundation</a><br />
            <a href="https://fightchatcontrol.eu" target="_blank" rel="noopener noreferrer">Fight Chat Control</a>
          </p>
        </div>
        <div>
          <h4><T fr="Sources · le texte" en="Sources · the law" /></h4>
          <p className="srclist">
            <a href="https://www.consilium.europa.eu/en/press/press-releases/2026/07/02/council-moves-to-reinstate-interim-measure-to-combat-child-sexual-abuse-online/" target="_blank" rel="noopener noreferrer"><T fr="Conseil de l'UE · position du 2 juillet 2026" en="Council of the EU · 2 July 2026 position" /></a><br />
            <a href="https://www.europarl.europa.eu/news/en/press-room/20260325IPR39207/child-sexual-abuse-online-voluntary-detection-measures-will-not-be-extended" target="_blank" rel="noopener noreferrer"><T fr="Parlement · rejet du 26 mars 2026" en="Parliament · 26 March 2026 rejection" /></a><br />
            <a href="https://www.patrick-breyer.de/en/eu-parliament-greenlights-chat-control-1-0-breyer-our-children-lose-out/" target="_blank" rel="noopener noreferrer"><T fr="Breyer · vote du 9 juillet 2026" en="Breyer · 9 July 2026 vote" /></a><br />
            <a href="https://www.edps.europa.eu/system/files/2026-02/26-02-16_opinion-extending-application-regulation-2021-1232_en.pdf" target="_blank" rel="noopener noreferrer"><T fr="EDPS · avis du 16 février 2026 (PDF)" en="EDPS · 16 February 2026 opinion (PDF)" /></a><br />
            <a href="https://eur-lex.europa.eu/eli/reg/2021/1232/oj" target="_blank" rel="noopener noreferrer">Règlement (UE) 2021/1232</a><br />
            <a href="https://fightchatcontrol.eu/chat-control-overview" target="_blank" rel="noopener noreferrer">Chat Control 1.0 vs 2.0</a><br />
            <a href="https://proton.me/blog/why-client-side-scanning-isnt-the-answer" target="_blank" rel="noopener noreferrer">Proton · client-side scanning</a><br />
            <a href="https://values.snap.com/news/joint-statement-eu-eprivacy-derogation" target="_blank" rel="noopener noreferrer"><T fr="Appel commun des géants (19 mars 2026)" en="Tech giants' joint appeal (19 Mar 2026)" /></a><br />
            <a href="https://therecord.media/big-tech-vows-to-continue-csam-scanning" target="_blank" rel="noopener noreferrer">Big Tech vows to keep scanning</a>
          </p>
        </div>
        <div>
          <h4><T fr="Agir" en="Act" /></h4>
          <p className="srclist">
            <a href="https://edri.org" target="_blank" rel="noopener noreferrer">European Digital Rights (EDRi)</a><br />
            <a href="https://www.patrick-breyer.de/en/posts/chat-control/" target="_blank" rel="noopener noreferrer">Patrick Breyer · Chat Control</a><br />
            <a href="https://stopscanningme.eu" target="_blank" rel="noopener noreferrer">Stop Scanning Me (EDRi)</a><br />
            <a href="https://signal.org/blog/" target="_blank" rel="noopener noreferrer">Signal · blog</a>
          </p>
        </div>
      </div>
      <div className="wrap" style={{ textAlign: 'center', paddingTop: '.5rem' }}>
        <a className="ghlink" href="https://github.com/Aurealibe/exitchatcontrol" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d={BRAND_ICONS.github} />
          </svg>
          <T fr="Code source ouvert sur GitHub" en="Open source on GitHub" />
        </a>
        <span style={{ display: 'inline-block', width: '.6rem' }} />
        <a className="ghlink" href="/exitchatcontrol-offline.html" download>
          ⭳ <T fr="Télécharger le guide (1 fichier)" en="Download the guide (1 file)" />
        </a>
      </div>
      <div className="wrap">
        <p className="proofline">
          <T
            fr={<><b>Zéro traqueur, zéro cookie, zéro requête externe.</b> Tout (polices, icônes, styles) est embarqué. Vérifiez : ouvrez l'inspecteur réseau, rechargez — rien ne part vers un tiers.</>}
            en={<><b>Zero trackers, zero cookies, zero external requests.</b> Everything (fonts, icons, styles) is embedded. Verify it: open the network inspector, reload — nothing leaves for a third party.</>}
          />
        </p>
        <small>
          <T
            fr="Ce guide est un document d'information sur la protection de la vie privée et la défense du chiffrement. Il ne conseille aucune activité illégale. Vérifiez toujours l'actualité législative : la situation évolue vite. Dernière mise à jour des faits : 10 juillet 2026."
            en="This guide is an information document on privacy protection and the defence of encryption. It advises no illegal activity. Always check the legislative news: the situation moves fast. Facts last updated: 10 July 2026."
          />
        </small>
      </div>
    </footer>
  )
}
