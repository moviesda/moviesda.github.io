// pages/page/[page].tsx
import Link from 'next/link';
import { getAllPosts, getTotalPosts } from '@/lib/getPosts';
import { PostMeta } from '@/lib/getPosts';
import MovieItemFeed from '@/components/Movieitemfeed';

const POSTS_PER_PAGE = 20;

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
        <main className=''>


            <MovieItemFeed moviefeed={posts} />

            <div className='justify-center py-10 items-center grid'>

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
