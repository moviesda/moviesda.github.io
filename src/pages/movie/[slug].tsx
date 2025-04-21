import { GetStaticProps, GetStaticPaths } from 'next';
import { getPostBySlug, getAllPosts } from '@/lib/getPosts';
import { Post } from '@/lib/getPosts';
import { NextSeo } from 'next-seo';

export default function PostPage({ post }: { post: Post }) {
    return (
        <>
            <NextSeo
                title={`${post.name} Movie Download - 1TamilMV`}
                description=""
                openGraph={{
                    title: post.name,
                    description:
                        post.synopsis,
                    images: [
                        {
                            url: post.remote_poster ? 'https://wsrv.nl/?url=' + post.remote_poster : "https://placehold.co/200x250",
                            width: 800,
                            height: 1200,
                            alt: post.name,
                        },
                    ],
                    site_name: '1TamilMV',
                }}
                additionalMetaTags={[
                    {
                        property: 'og:type',
                        content: 'video.movie',
                    },
                ]}

            />
            <main className="lg:max-w-4xl mx-auto">
                {/* Page Title */}
                <h1 className="text-center text-2xl font-bold  mb-6">{post.name} Movie Download</h1>

                {/* Movie Info Section */}
                <section className="rounded-md p-6 space-y-6">
                    {/* Poster and Details */}
                    <div className="grid  gap-6">
                        {/* Poster */}
                        {post.poster && (
                            <div className="w-full flex h-[230px] justify-center">
                                <img
                                    src={post.remote_poster ? 'https://wsrv.nl/?url=' + post.remote_poster : "https://placehold.co/200x250"}
                                    alt={post.name}
                                    className="rounded-md shadow-md bg-black w-[180px] object-cover"
                                />
                            </div>
                        )}

                        {/* Details */}

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box min-w-full border p-4">
                            <legend className="fieldset-legend">Movie Information</legend>
                            <div className="min-w-full flex-1 justify-center text-left space-y-2 text-sm">
                                <p><span className="font-semibold">Movie</span> : {post.name}</p>
                                <p><span className="font-semibold">Rating</span> : {post.rating}/10</p>
                                <p><span className="font-semibold">Release Date</span> : {post.released_date}</p>
                                <p><span className="font-semibold">Runtime</span> : {post.runtime}</p>
                                <p><span className="font-semibold">IMDb ID</span> : {post.imdbid}</p>
                                <p><span className="font-semibold">Updated on</span> : {post.updated_at}</p>

                                {post.categories && post.categories.length > 0 && (
                                    <p><span className="font-semibold">Categories</span> : {post.categories.join(', ')}</p>
                                )}

                                {post.genres && post.genres.length > 0 && (
                                    <p><span className="font-semibold">Genres</span> : {post.genres.join(', ')}</p>
                                )}

                                {post.directors && post.directors.length > 0 && (
                                    <p><span className="font-semibold">Directors</span> : {post.directors.join(', ')}</p>
                                )}

                                {post.years && post.years.length > 0 && (
                                    <p><span className="font-semibold">Years</span> : {post.years.join(', ')}</p>
                                )}
                            </div>

                        </fieldset>



                    </div>
                    <div className="border border-yellow-600 p-4 rounded-md">
                        <p><span className="font-semibold">Synopsis:</span> {post.synopsis}</p>
                    </div>


                    {/* Synopsis */}

                </section>
                <div className="mt-8">
                    <h2 className="text-lg font-bold  mb-4">Watch Online</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <a href="#" className="btn bg-green-700 text-white">Watch Link 1</a>
                        <a href="#" className="btn bg-green-700 text-white">Watch Link 2</a>
                        <a href="#" className="btn bg-green-700 text-white">Watch Link 3</a>
                        <a href="#" className="btn bg-green-700 text-white">Watch Link 4</a>
                    </div>
                </div>

                {/* Download Links */}
                <div className="mt-8">
                    <h2 className="text-lg font-bold  mb-4">Download Links</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <a href="#" className="btn bg-blue-700 text-white">Download 480p</a>
                        <a href="#" className="btn bg-blue-700 text-white">Download 720p</a>
                        <a href="#" className="btn bg-blue-700 text-white">Download 1080p</a>
                        <a href="#" className="btn bg-blue-700 text-white">Download 4K</a>
                    </div>
                </div>
                {/* Additional Content */}
                <section className="mt-10 prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                </section>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug as string;
    const post = await getPostBySlug(slug);

    return {
        props: {
            post,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = getAllPosts(1, 9999);
    const paths = posts.map((post) => ({
        params: { slug: post.slug },
    }));

    return {
        paths,
        fallback: false,
    };
};
