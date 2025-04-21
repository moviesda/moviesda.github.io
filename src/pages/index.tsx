import { getAllPosts, getTotalPosts } from '@/lib/getPosts';
import Link from 'next/link';
import { PostMeta } from '@/lib/getPosts';
import MovieItemFeed from '@/components/Movieitemfeed';
import { NextSeo } from 'next-seo';



const POSTS_PER_PAGE = 20; // Define how many posts you want per page

export default function Home({
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
    <>
      <NextSeo
        title="1TamilMV: Tamil Movies Download"
        description="Download the latest Tamil movies in HD quality. Explore a wide range of genres and find your favorite films on 1TamilMV."
      />

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
    </>
  );
}

export async function getStaticProps({ params }: { params?: { page?: string } }) {
  const page = parseInt(params?.page || '1');
  const posts = getAllPosts(page, POSTS_PER_PAGE); // Fetch paginated posts
  const totalPosts = getTotalPosts(); // Get the total number of posts

  return {
    props: {
      posts,
      totalPosts,
      currentPage: page,
    },
  };
}
