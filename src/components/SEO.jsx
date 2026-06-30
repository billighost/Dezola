import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Dezola Studio'
const DOMAIN = 'https://dezolastudio.name.ng'
const DEFAULT_OG_IMAGE = `${DOMAIN}/og-image.png`

function truncate(str, maxLen = 155) {
  if (!str || str.length <= maxLen) return str
  const truncated = str.slice(0, maxLen)
  const lastSpace = truncated.lastIndexOf(' ')
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + '...'
}

export default function SEO({
  title,
  description,
  canonicalPath,
  ogImage,
  ogType = 'website',
  structuredData,
  keywords
}) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME
  const canonicalUrl = canonicalPath ? `${DOMAIN}${canonicalPath}` : DOMAIN
  const ogImageUrl = ogImage || DEFAULT_OG_IMAGE
  const desc = truncate(description)

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImageUrl} />
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}
