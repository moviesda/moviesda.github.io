import { getAllCategories } from '@/lib/getPosts';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

type Props = {
    categories: string[];
};

const AllCategoriesPage = ({ categories }: Props) => {
    return (<>

        <NextSeo
            title="Categories - 1TamilMV"
            description="Explore a wide range of movie categories on 1TamilMV. Find your favorite genres and discover new films."
        />

        <main className="mx-auto">
            <h1 className="text-3xl font-bold mb-8">All Categories</h1>
            <div className="grid grid-cols-1 items-center justify-center md:grid-cols-4 gap-4">
                {categories.map((category) => (
                    <Link
                        key={category}
                        href={`/category/${encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'))}`}
                        className="btn btn-block"
                    >
                        {category}
                    </Link>
                ))}
            </div>
        </main>
    </>
    );
};

export async function getStaticProps() {
    const categories = await getAllCategories();

    return {
        props: {
            categories,
        },
    };
}

export default AllCategoriesPage;
