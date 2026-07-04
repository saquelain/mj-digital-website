import { getNews } from '@/lib/newsApi';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "News | MJ Digital Services",
  description:
    "Company news, product launches, and milestones from the MJ Digital Services team.",
  alternates: {
    canonical: "https://www.mjdigitalservices.com/news",
  },
  openGraph: {
    title: "News | MJ Digital Services",
    description:
      "Company news, product launches, and milestones from the MJ Digital Services team.",
    url: "https://www.mjdigitalservices.com/news",
    siteName: "MJ Digital Services",
    type: "website",
    images: [
      {
        url: "https://www.mjdigitalservices.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "MJ Digital Services News",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "News | MJ Digital Services",
    description:
      "Company news, product launches, and milestones from the MJ Digital Services team.",
    images: ["https://www.mjdigitalservices.com/og-image.png"],
  },
};

function NewsCard({ item }: { item: any }) {
  return (
    <Link href={`/news/${item.slug}`} className="blog-card">
      <div className="blog-card-image">
        {item.coverImage ? (
          <img src={item.coverImage} alt={item.title} className="blog-card-img" />
        ) : (
          <div className="blog-card-img-placeholder">No cover</div>
        )}
      </div>
      <div className="blog-card-body">
        <div className="blog-card-meta">
          {item.readTime && (
            <span className="blog-card-readtime">
              <Clock size={11} />
              {item.readTime}
            </span>
          )}
        </div>
        <h3 className="blog-card-title">{item.title}</h3>
        <p className="blog-card-excerpt">{item.excerpt}</p>
        {item.publishedAt && (
          <div className="blog-card-date">
            <Calendar size={11} />
            {new Date(item.publishedAt).toLocaleDateString('en-IN', {
              year: 'numeric', month: 'short', day: 'numeric',
            })}
          </div>
        )}
      </div>
    </Link>
  );
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = pageParam || '1';

  const { news, pagination } = await getNews({ page, limit: '9' }).catch(() => ({
    news: [],
    pagination: { total: 0, page: 1, limit: 9, totalPages: 0 },
  }));

  return (
    <>
      <section className="blog-hero">
        <div className="container">
          <div className="blog-hero-card">
            <span className="blog-hero-eyebrow">
              <span className="hero-badge-dot" />
              Company Updates
            </span>
            <h1 className="blog-hero-headline">
              MJ Digital <span>News</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="blog-listing-section">
        <div className="container">
          {news.length === 0 ? (
            <p className="blog-empty">No news published yet</p>
          ) : (
            <>
              <div className="blog-grid">
                {news.map((item) => (
                  <NewsCard key={item._id} item={item} />
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="blog-pagination">
                  <Link
                    href={`/news?page=${Math.max(1, pagination.page - 1)}`}
                    className={`blog-pagination-btn ${pagination.page === 1 ? 'blog-pagination-btn--disabled' : ''}`}
                    aria-disabled={pagination.page === 1}
                  >
                    Previous
                  </Link>
                  <span className="blog-pagination-current">
                    {pagination.page} / {pagination.totalPages}
                  </span>
                  <Link
                    href={`/news?page=${Math.min(pagination.totalPages, pagination.page + 1)}`}
                    className={`blog-pagination-btn ${pagination.page === pagination.totalPages ? 'blog-pagination-btn--disabled' : ''}`}
                    aria-disabled={pagination.page === pagination.totalPages}
                  >
                    Next
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}