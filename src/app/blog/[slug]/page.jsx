import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Heading, Subheading } from '@/components/text'
import { image } from '@/sanity/image'
import { getPost } from '@/sanity/queries'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import dayjs from 'dayjs'
import { PortableText } from 'next-sanity'
import { notFound } from 'next/navigation'
import { franc } from 'franc';
import langs from 'langs';

export async function generateMetadata({ params }) {
  let post = await getPost(params.slug)

  return post ? { title: post.title, description: post.excerpt } : {}
}

export default async function BlogPost({ params }) {
  let post = (await getPost(params.slug)) || notFound()

  // Detect language from the title
  const detectedLangCode = franc(post.title || ''); // Use title for detection
  const detectedLang = langs.where('3', detectedLangCode);

  // Determine direction based on detected language
  const direction = detectedLang?.name === 'Arabic' ? 'rtl' : 'ltr';

  return (
      <main className="overflow-hidden">
        <GradientBackground />
        <Container>
          <Navbar />
          <div dir={direction}>
            <Subheading dir={direction} className="mt-16">
              {dayjs(post.publishedAt).format('dddd, MMMM D, YYYY')}
            </Subheading>
            <Heading dir={direction} as="h1" className="mt-4 text-purple-900">
              {post.title}
            </Heading>
            <div dir={direction}
                 className="mt-24 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
              <div className="flex flex-wrap items-center gap-4 max-lg:justify-between lg:flex-col lg:items-start">
                {post.author && (
                    <div className="flex items-center gap-3">
                      {post.author.image && (
                          <img
                              alt=""
                              src={image(post.author.image).size(64, 64).url()}
                              className="aspect-square size-6 rounded-full object-cover"
                          />
                      )}
                      <div className="text-sm/5 text-gray-700">
                        {post.author.name}
                      </div>
                    </div>
                )}
                {Array.isArray(post.categories) && (
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((category) => (
                          <Link
                              key={category.slug}
                              href={`/blog?category=${category.slug}`}
                              className="rounded-full border-2 border-purple-900  px-4 py-1 text-sm/6 font-medium text-gray-950"
                          >
                            {category.title}
                          </Link>
                      ))}
                    </div>
                )}
              </div>
              <div dir={direction} className="text-gray-700">
                <div className="max-w-2xl xl:mx-auto">
                  {post.mainImage && (
                      <img
                          alt={post.mainImage.alt || ''}
                          src={image(post.mainImage).size(2016, 1344).url()}
                          className="mb-10 aspect-[3/2] w-full rounded-2xl object-cover shadow-xl"
                      />
                  )}
                  {post.body && (
                      <PortableText
                          value={post.body}
                          components={{
                            block: {
                              normal: ({children}) => (
                                  <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                                    {children}
                                  </p>
                              ),
                              h2: ({children}) => (
                                  <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                                    {children}
                                  </h2>
                              ),
                              h3: ({children}) => (
                                  <h3 className="mb-10 mt-12 text-xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                                    {children}
                                  </h3>
                              ),
                              blockquote: ({children}) => (
                                  <blockquote
                                      className="my-10 border-l-2 border-l-gray-300 pl-6 text-base/8 text-gray-950 first:mt-0 last:mb-0">
                                    {children}
                                  </blockquote>
                              ),
                            },
                            types: {
                              image: ({value}) => (
                                  <img
                                      alt={value.alt || ''}
                                      src={image(value).width(2000).url()}
                                      className="w-full rounded-2xl"
                                  />
                              ),
                              separator: ({value}) => {
                                switch (value.style) {
                                  case 'line':
                                    return (
                                        <hr className="my-8 border-t border-gray-200"/>
                                    )
                                  case 'space':
                                    return <div className="my-8"/>
                                  default:
                                    return null
                                }
                              },
                            },
                            list: {
                              bullet: ({children}) => (
                                  <ul className="list-disc pl-4 text-base/8 marker:text-gray-400">
                                    {children}
                                  </ul>
                              ),
                              number: ({children}) => (
                                  <ol className="list-decimal pl-4 text-base/8 marker:text-gray-400">
                                    {children}
                                  </ol>
                              ),
                            },
                            listItem: {
                              bullet: ({children}) => {
                                return (
                                    <li className="my-2 pl-2 has-[br]:mb-8">
                                      {children}
                                    </li>
                                )
                              },
                              number: ({children}) => {
                                return (
                                    <li className="my-2 pl-2 has-[br]:mb-8">
                                      {children}
                                    </li>
                                )
                              },
                            },
                            marks: {
                              strong: ({children}) => (
                                  <strong className="font-semibold text-gray-950">
                                    {children}
                                  </strong>
                              ),
                              code: ({children}) => (
                                  <>
                                    <span aria-hidden>`</span>
                                    <code className="text-[15px]/8 font-semibold text-gray-950">
                                      {children}
                                    </code>
                                    <span aria-hidden>`</span>
                                  </>
                              ),
                              link: ({value, children}) => {
                                return (
                                    <Link
                                        href={value.href}
                                        className="font-medium text-gray-950 underline decoration-gray-400 underline-offset-4 data-[hover]:decoration-gray-600"
                                    >
                                      {children}
                                    </Link>
                                )
                              },
                            },
                          }}
                      />
                  )}
                  <div className="mt-10">
                    <Button variant="outline" href="/blog">
                      {direction === 'rtl' ? 'العودة إلى الاخبار' : 'Back to News'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </Container>
        <Footer/>
      </main>
  )
}
