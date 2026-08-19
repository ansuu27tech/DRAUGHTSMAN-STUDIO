import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title,
    description,
    keywords,
    image = 'https://draughtsmanstudio.com/draughtsmanstudio.jpg',
    url = 'https://draughtsmanstudio.com/'
}) => {
    const siteName = 'Draughtsman Studio';
    const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Architectural & Interior Design`;
    const defaultDescription = 'Draughtsman Studio is a premier architectural and interior design firm specializing in luxury residential, commercial spaces, and holistic master planning in Chennai.';
    const defaultKeywords = 'Architects in Chennai, Interior Designers Chennai, Luxury Architecture, Commercial Building Design, Residential Architects, 3D Visualization, Draughtsman Studio';

    const schemaOrgJSONLD = {
        "@context": "http://schema.org",
        "@type": "LocalBusiness",
        "name": "Draughtsman Studio",
        "image": "https://draughtsmanstudio.com/draughtsmanstudio.jpg",
        "description": description || defaultDescription,
        "url": "https://draughtsmanstudio.com/",
        "telephone": "+919176561515",
        "email": "contact@draughtsmanstudio.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "No,1131, Vedachalam Main Road, Adhanur",
            "addressLocality": "Guduvanchery",
            "addressRegion": "Chengalpattu",
            "postalCode": "603202",
            "addressCountry": "IN"
        }
    };

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <meta name="author" content="Draughtsman Studio" />

            {/* Open Graph / Social Media (Facebook, LinkedIn, WhatsApp) */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={image} />

            {/* JSON-LD Schema */}
            <script type="application/ld+json">
                {JSON.stringify(schemaOrgJSONLD)}
            </script>
        </Helmet>
    );
};

export default SEO;
