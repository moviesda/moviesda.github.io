// pages/category/[slug].tsx

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { PostMeta } from '@/lib/getPosts';
import MovieItemFeed from '@/components/Movieitemfeed';
import { NextSeo } from 'next-seo';

interface CategoryPageProps {
    category: string;
    movies: PostMeta[];
    slug: string;
}

const POSTS_PER_PAGE = 20;

export default function CategoryPage({ category, movies, slug }: CategoryPageProps) {
    const totalPages = Math.ceil(movies.length / POSTS_PER_PAGE);
    const paginatedMovies = movies.slice(0, POSTS_PER_PAGE);

    return (
        <>
            <NextSeo
                title={`${category} Download - Moviesda`}
                description="Explore a wide range of movie categories on Moviesda. Find your favorite genres and discover new films."
            />
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-6">Category: {category}</h1>

                <MovieItemFeed moviefeed={paginatedMovies} />

                {/* Pagination */}
                <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <Link
                            key={index}
                            href={`/category/${slug}/page/${index + 1}`}
                            className={`px-4 py-2 border rounded ${index + 1 === 1 ? 'bg-gray-300' : ''}`}
                        >
                            {index + 1}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const contentDir = path.join(process.cwd(), 'src', 'content');
    const files = fs.readdirSync(contentDir);

    let categories: Set<string> = new Set();

    files.forEach((fileName) => {
        const filePath = path.join(contentDir, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);
        if (data.categories) {
            data.categories.forEach((cat: string) => categories.add(cat));
        }
    });

    const paths = Array.from(categories).map((category) => ({
        params: { slug: slugify(category) },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug as string;

    const contentDir = path.join(process.cwd(), 'src', 'content');
    const files = fs.readdirSync(contentDir);

    const movies: PostMeta[] = files.map((fileName) => {
        const filePath = path.join(contentDir, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);

        return {
            id: data.id,
            name: data.name,
            slug: data.slug,
            poster: data.remote_poster,
            categories: data.categories || [],
            created_at: data.created_at ? String(data.created_at) : '',
            remote_poster: data.remote_poster || '',
            original_language: data.original_language || '',
            dubbed_in: data.dubbed_in || [],
            released_date: data.released_date || '',
        } as PostMeta;
    });

    const matchedCategory = unslugify(slug);

    const filteredMovies = movies.filter((movie) =>
        movie.categories.includes(matchedCategory)
    );

    return {
        props: {
            category: matchedCategory,
            movies: filteredMovies,
            slug,
        },
    };
};

// Helper functions
function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}

function unslugify(slug: string) {
    return slug
        .toString()
        .toLowerCase()
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
}
