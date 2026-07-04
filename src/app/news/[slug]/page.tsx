import { notFound } from 'next/navigation';
import BlogPostContent from '@/components/blog/BlogPostContent';
import { getNewsBySlug, getNews } from '@/lib/newsApi';
import Link from 'next/link';
import { User, Calendar, Clock, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import BlogFAQs from '@/components/blog/BlogFAQs';

export async function generateStaticParams() {
  try {
    const data = await getNews({ limit: "1000" });
    const news = data?.news ?? [];
    return news.map((item: { slug: string }) => ({ slug: item.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const item = await getNewsBySlug(slug);
    const title = item.metaTitle || `${item.title} | MJ Digital Services`;
    const description = item.metaDescription || item.excerpt;
    const canonical = `https://www.mjdigitalservices.com/news/${slug}`;
    const ogImage = item.coverImage
      ? item.coverImage
      : "https://www.mjdigitalservices.com/og-image.png";

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: "MJ Digital Services",
        type: "article",
        publishedTime: item.publishedAt ?? undefined,
        images: [{ url: ogImage, width: 1200, height: 630, alt: item.title }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };
  } catch {
    return {};
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let item: any;

  try {
    item = await getNewsBySlug(slug);
  } catch {
    notFound();
  }

  const publishedDate = item.publishedAt
    ? new Date(item.publishedAt).toLocaleDateString('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : '';

    const faqs = item.faqs ?? [];
    const faqsTitle = item.faqsTitle || 'Frequently Asked Questions';

  let relatedNews = (item.relatedPosts || []).slice(0, 3);
  if (relatedNews.length === 0) {
    try {
      const recent = await getNews({ limit: '4' });
      relatedNews = recent.news
        .filter((n: any) => n.slug !== slug)
        .slice(0, 3)
        .map((n: any) => ({ slug: n.slug, title: n.title, coverImage: n.coverImage }));
    } catch {}
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: item.excerpt,
    image: item.coverImage ?? "https://www.mjdigitalservices.com/og-image.png",
    author: {
      "@type": "Person",
      name: item.createdBy?.name ?? "MJ Digital Team",
    },
    publisher: {
      "@type": "Organization",
      name: "MJ Digital Services",
      logo: {
        "@type": "ImageObject",
        url: "https://www.mjdigitalservices.com/og-image.png",
      },
    },
    datePublished: item.publishedAt ?? undefined,
    dateModified: item.updatedAt ?? item.publishedAt ?? undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.mjdigitalservices.com/news/${item.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mjdigitalservices.com" },
      { "@type": "ListItem", position: 2, name: "News", item: "https://www.mjdigitalservices.com/news" },
      { "@type": "ListItem", position: 3, name: item.title, item: `https://www.mjdigitalservices.com/news/${item.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="blog-post-main blog-post-main-no-cover">
        <div className="blog-post-container">

          <nav className="blog-post-breadcrumb">
            <Link href="/news" className="blog-post-breadcrumb-link">News</Link>
            <ChevronRight size={12} />
            <span className="blog-post-breadcrumb-current">
              {item.title.length > 50 ? item.title.slice(0, 50) + '…' : item.title}
            </span>
          </nav>

          <h1 className="blog-post-title">{item.title}</h1>

          <div className="blog-post-meta">
            <span className="blog-post-meta-item">
              <User size={14} />
              {item.createdBy?.name ?? 'MJ Digital Team'}
            </span>
            {publishedDate && (
              <span className="blog-post-meta-item">
                <Calendar size={14} />
                {publishedDate}
              </span>
            )}
            {item.readTime && (
              <span className="blog-post-meta-item">
                <Clock size={14} />
                {item.readTime}
              </span>
            )}
            {item.tags?.map((tag: string) => (
              <span key={tag} className="blog-post-tag">{tag}</span>
            ))}
          </div>

          <div className="blog-post-layout">
            <div className="blog-post-body">
              <BlogPostContent content={item.content ?? ''} />

              {faqs.length > 0 && (
                <BlogFAQs faqs={faqs} title={faqsTitle} />
                )}

              <Link href="/news" className="blog-post-back">
                <ArrowLeft size={14} />
                Back to News
              </Link>
            </div>

            <aside className="blog-post-aside">
              {relatedNews.length > 0 && (
                <div className="blog-aside-section">
                  <h2 className="blog-aside-title">Related News</h2>
                  <div className="blog-aside-related-list">
                    {relatedNews.map((n: any) => (
                      <Link key={n.slug} href={`/news/${n.slug}`} className="blog-aside-related-card">
                        <div className="blog-aside-related-thumb">
                          {n.coverImage ? (
                            <img src={n.coverImage} alt={n.title} />
                          ) : (
                            <span className="blog-aside-related-thumb-empty">MJ</span>
                          )}
                        </div>
                        <div className="blog-aside-related-body">
                          <span className="blog-aside-related-text">{n.title}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="blog-aside-cta">
                <span className="blog-aside-cta-eyebrow">MJ Digital Services</span>
                <h3 className="blog-aside-cta-title">Have a project in mind?</h3>
                <p className="blog-aside-cta-text">
                  From fintech platforms to high-converting websites — let&apos;s build it together.
                </p>
                <Link href="/contact" className="blog-aside-cta-btn">
                  Get in touch
                  <ArrowRight size={15} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}