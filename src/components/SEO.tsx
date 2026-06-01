import { Helmet } from 'react-helmet-async';
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  keywords?: string;
}

const SEO = ({
  title = "Gigsta - On-Demand Home Services in Uyo, Nigeria",
  description = "Book trusted, vetted home service providers in Uyo. Professional house cleaning, laundry, and more. Verified, insured providers.",
  image = "https://gigsta.pro/og-image.jpg",
  type = "website",
  keywords
}: SEOProps) => {
  const fullTitle = title.includes("Gigsta") ? title : `${title} | Gigsta`;
  const defaultKeywords = "home services Uyo, house cleaning Uyo, laundry Uyo, cleaning services Nigeria, on-demand services Uyo, professional cleaners Uyo, home services Akwa Ibom";
  const metaKeywords = keywords || defaultKeywords;

  const location = useLocation();
  const canonicalUrl = `https://gigsta.pro${location.pathname}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Gigsta" />
      <meta property="og:locale" content="en_NG" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
