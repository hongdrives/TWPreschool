'use client'

import { useLang } from '@/context/LangContext'
import type { BlogPost } from '@/types/content'

export default function BlogPage() {
  const { C } = useLang()
  const b = C.blog

  if (C.site.blogHidden) {
    return (
      <section className="ph">
        <div className="wrap">
          <h1>Coming Soon</h1>
          <p style={{ marginTop: 8 }}>This page is not yet available. Please check back later.</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="ph">
        <div className="ph-bg" style={{ backgroundImage: "url('/assets/schools/hualien-montessori.png')", opacity: C.site.heroBgOpacity ?? 0.10 }} />
        <div className="wrap">
          <h1>{b.title}</h1>
          <p>{b.sub}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid-3">
            {b.posts.map((post: BlogPost, i: number) => (
              <article key={i} className="blog-card">
                <div className="blog-img">
                  <img src={post.img} alt={post.title} loading="lazy" />
                </div>
                <div className="blog-body">
                  <span className="blog-tag">{post.tag}</span>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <p className="blog-meta">{post.date}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
