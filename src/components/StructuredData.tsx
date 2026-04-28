interface StructuredDataProps {
  type: 'Organization' | 'Service' | 'WebSite' | 'LocalBusiness';
  data?: Record<string, any>;
}

const StructuredData = ({ type, data = {} }: StructuredDataProps) => {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
    };

    switch (type) {
      case 'Organization':
        return {
          ...baseData,
          "@type": "Organization",
          "name": "Gigsta",
          "url": "https://gigsta.pro",
          "logo": "https://gigsta.pro/logo.png",
          "description": "On-demand home services platform in Uyo, Nigeria. Connecting busy professionals with vetted, reliable service providers for house cleaning, laundry, and more.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Uyo",
            "addressRegion": "Akwa Ibom",
            "addressCountry": "NG"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "areaServed": "NG",
            "availableLanguage": "English"
          },
          ...data
        };
      
      case 'LocalBusiness':
        return {
          ...baseData,
          "@type": "LocalBusiness",
          "name": "Gigsta",
          "image": "https://gigsta.pro/logo.png",
          "description": "On-demand home services in Uyo, Nigeria",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Uyo",
            "addressRegion": "Akwa Ibom",
            "addressCountry": "NG"
          },
          "areaServed": {
            "@type": "City",
            "name": "Uyo"
          },
          ...data
        };
      
      case 'Service':
        return {
          ...baseData,
          "@type": "Service",
          "serviceType": "Home Services",
          "provider": {
            "@type": "Organization",
            "name": "Gigsta"
          },
          "areaServed": {
            "@type": "City",
            "name": "Uyo",
            "@id": "https://www.wikidata.org/wiki/Q1021861"
          },
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": "https://gigsta.pro/services"
          },
          ...data
        };
      
      case 'WebSite':
        return {
          ...baseData,
          "@type": "WebSite",
          "name": "Gigsta",
          "url": "https://gigsta.pro",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://gigsta.pro/services?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          ...data
        };
      
      default:
        return { ...baseData, ...data };
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
    />
  );
};

export default StructuredData;
