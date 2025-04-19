import { GetStaticProps, GetStaticPaths } from 'next';
import { getPostBySlug, getAllPosts } from '@/lib/getPosts';
import { Post } from '@/lib/getPosts';

export default function PostPage({ post }: { post: Post }) {
    return (
        <main className="border-x border-x-zinc-300 dark:border-x-zinc-600 max-w-4xl mx-auto p-4">
            {/* Page Title */}
            <h1 className="text-center text-2xl font-bold  mb-6">{post.name} Movie Download</h1>

            {/* Movie Info Section */}
            <section className="rounded-md p-6 space-y-6">
                {/* Poster and Details */}
                <div className="grid justify-center text-center gap-6">
                    {/* Poster */}
                    {post.poster && (
                        <div className="w-full flex h-48 justify-center">
                            <img
                                src={post.remote_poster ?? "https://placehold.co/200x250"}
                                alt={post.name}
                                className="rounded-md shadow-md bg-black w-38 object-cover"
                            />
                        </div>
                    )}

                    {/* Details */}
                    <div className="flex-1 justify-center space-y-2 text-sm ">
                        <p><span className="font-semibold">Movie</span> : {post.name}</p>

                        <p><span className="font-semibold">Rating</span> : {post.rating}/10</p>
                        <p><span className="font-semibold">Release Date</span> : {post.released_date}</p>
                        <p><span className="font-semibold">Runtime</span> : {post.runtime}</p>
                        <p><span className="font-semibold">IMDb ID</span> : {post.imdbid}</p>
                        <p><span className="font-semibold">Updated on</span> : {post.updated_at}</p>

                    </div>
                </div>


                {/* Synopsis */}
                <div className="border border-yellow-600 p-4 rounded-md">
                    <p><span className="font-semibold">Synopsis:</span> {post.synopsis}</p>
                </div>
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
