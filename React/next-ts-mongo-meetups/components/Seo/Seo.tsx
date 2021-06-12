import { memo, ReactNode } from "react";
import Head from "next/head";

const getUrlPathName = () => window.location.pathname;


type StrUndefined = string | undefined;

interface OpenGraphProps {
    title?: StrUndefined;
    description?: StrUndefined;
    url?: StrUndefined;
    locale?: StrUndefined;
    siteName?: StrUndefined;
    country?: StrUndefined;
    type?: StrUndefined;
}

interface TwitterProps {
    handle?: StrUndefined,
    title?: StrUndefined,
    description?: StrUndefined,
    creator?: StrUndefined
}

interface AmountProps {
    currency?: StrUndefined;
    amount?: StrUndefined
}

interface SeoProps {
    title?: string;
    description?: string;
    canonical?: string;
    locale?: StrUndefined;
    openGraph?: OpenGraphProps| undefined;
    twitter?: TwitterProps| undefined;
    amount?: AmountProps | undefined;
    children?: ReactNode;
    image?: StrUndefined;
    keywords?: StrUndefined;
  }

const absoluteUrl = (path: string) => `https://example.com${path}`;

const Seo = ({
  title = "Meetups App",
  description = "Lorem ipsum dolor set amet",
  canonical = "https://www.google.com",
  locale = "en_US",
  openGraph = {
    title: undefined,
    description: undefined,
    locale: "en_US",
    type: undefined,
    country: "India",
    siteName: "Example Site",
    url: undefined
  },
  twitter,
  amount,
  image,
  keywords,
  children,
}: SeoProps) => {
  const tags = [
    <title key="title">{title}</title>,
    <meta key="og:title" property="og:title" content={openGraph?.title ?? title} />,
    <meta key="name" name="title" content={title} />,
    <meta key="description" name="description" content={description} />,
    <meta key="itemPropDescription" itemProp="description" content={description} />,
    <meta key="meta-description" property="og:description" content={openGraph?.description ?? description} />,
    <meta
      key="content-language"
      httpEquiv="content-language"
      content={locale}
    />,
    <meta key="language" name="language" content={locale} />,
    <meta key="og:locale" property="og:locale" content={openGraph?.locale ?? locale} />,
    <meta key="og:type" property="og:type" content={openGraph?.type ?? "website"} />,
    <meta key="og:url" property="og:url" content={openGraph?.url ??  absoluteUrl(getUrlPathName())} />,
    openGraph?.country && <meta key="og:country-name" property="og:country-name" content={openGraph?.country ?? ""} />,
    keywords && <meta key="keywords" name="keywords" content={keywords} />,
  ].filter(Boolean);

  if (image) {
    tags.push(<meta key="image" itemProp="image" content={image} />);
    tags.push(<meta key="twitter:image:src" name="twitter:image:src" content={image} />);
    tags.push(<meta key="og:image" name="og:image" content={image} />);
    tags.push(<meta key="twitter:card" name="summary_large_image" content={image} />);
  }

  if (amount) {
    tags.push(<meta key="og:price:currency" name="og:price:currency" content={amount?.currency ?? "INR"} />);
    tags.push(<meta key="og:price:amount" name="og:price:amount" content={amount?.amount ?? ""} />);
  }

  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={canonical || absoluteUrl(getUrlPathName())} />
      <meta property="og:site_name" content={openGraph?.siteName ?? "Example Site"} />
      <meta key="robots" content="index, follow" />
      {tags.map((tag) => tag)}
      {children}
    </Head>
  );
};

export default memo(Seo);