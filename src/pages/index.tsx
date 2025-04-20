import { getAllPosts, getTotalPosts } from '@/lib/getPosts';
import Link from 'next/link';
import { PostMeta } from '@/lib/getPosts';

const POSTS_PER_PAGE = 25; // Define how many posts you want per page

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
    <main className='border-x border-x-zinc-300 dark:border-x-zinc-600'>


      <div className="flex flex-wrap justify-center items-center gap-4 p-4">



        {posts.map((post) => (
          <>
            <Link className='border border-zinc-300 dark:border-zinc-600 rounded-box' key={post.slug} href={`/movie/${post.slug}`}>

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
