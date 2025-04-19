// pages/page/[page].tsx
import Link from 'next/link';
import { getAllPosts, getTotalPosts } from '@/lib/getPosts';
import { PostMeta } from '@/lib/getPosts';

const POSTS_PER_PAGE = 12;

export default function PaginatedPage({
    posts,
    totalPosts,
    currentPage,
}: {
    posts: PostMeta[];
    totalPosts: number;
    currentPage: number;
}) {
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    return (
        <main className='border-x border-x-zinc-300 dark:border-x-zinc-600'>


            <div className="grid p-10 grid-cols-2 justify-center items-center sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">



                {posts.map((post) => (
                    <>
                        <Link className='border border-zinc-300 dark:border-zinc-600 rounded-box' key={post.id} href={`/movie/${post.slug}`}>

                            <div className="card grid justify-center  items-center text-center gap-2 bg-base-300 shadow-xl">
                                <img src={post.remote_poster ?? "https://placehold.co/200x250"} className='rounded-box w-48 bg-black h-64' alt="" />

                                <span className='truncate p-2'>
                                    {post.name}
                                </span>

                            </div>
                        </Link>

                    </>
                ))}




            </div>
            <div className='justify-center items-center grid'>

                {/* Pagination */}
                <div className="join grid justify-center items-center max-w-lg pb-10 grid-cols-2">
                    {currentPage > 1 ? (
                        <Link href={`/page/${currentPage - 1}`} className="join-item btn btn-outline">
                            &lt; Previous
                        </Link>
                    ) : (
                        <div></div> // Empty div to maintain the 2-column layout
                    )}

                    {currentPage < totalPages && (
                        <Link href={`/page/${currentPage + 1}`} className="join-item btn btn-outline">
                            Next &gt;
                        </Link>
                    )}
                </div>
            </div>
        </main>
    );
}

export async function getStaticProps({ params }: { params: { page: string } }) {
    const page = parseInt(params?.page || '1');
    const posts = getAllPosts(page, POSTS_PER_PAGE);
    const totalPosts = getTotalPosts();

    return {
        props: {
            posts,
            totalPosts,
            currentPage: page,
        },
    };
}

export async function getStaticPaths() {
    const totalPosts = getTotalPosts();
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    const paths = Array.from({ length: totalPages }, (_, i) => ({
        params: { page: (i + 1).toString() },
    }));

    return {
        paths,
        fallback: false,
    };
}
