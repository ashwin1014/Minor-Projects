import { FC, memo } from 'react';
import Head from 'next/head';

interface SeoProps {
    title?: string;
    description?: string;
    canonical?: string;
}

const Seo: FC<SeoProps> = ({ title, description, canonical }) => {

    const tags = [
        title && (
            <>
                <title key="title">{title}</title>
                <meta property="og:title" content={title} />
                <meta name="title" content={title} />
            </>
        ),
        description && (
            <>
              <meta name="description" content={description} />
              <meta property="og:description" content={description} />
            </>
        ),
        <link rel="canonical" href={canonical || "https://www.hello.world"} />
    ].filter(Boolean);

    if(tags.length === 0) return null;

    return (
        <Head>
            {
                tags && (tags || []).map((tag) => tag)
            }
        </Head>
    )
}

export default memo(Seo);
