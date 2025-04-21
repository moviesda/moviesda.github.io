import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export function getAllMovies() {
    const contentDir = path.join(process.cwd(), 'src', 'content');
    const files = fs.readdirSync(contentDir);

    const movies = files.map((fileName) => {
        const filePath = path.join(contentDir, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);

        return {
            ...data,
            created_at: data.created_at ? String(data.created_at) : null,
            updated_at: data.updated_at ? String(data.updated_at) : null,
        };
    });

    return movies;
}

export async function getAllCategories(): Promise<string[]> {
    const contentDir = path.join(process.cwd(), 'src', 'content');
    const files = fs.readdirSync(contentDir);

    let categories: string[] = [];

    for (const fileName of files) {
        const filePath = path.join(contentDir, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);

        if (data.categories && Array.isArray(data.categories)) {
            categories.push(...data.categories);
        }
    }

    const uniqueCategories = [...new Set(categories)].sort();
    return uniqueCategories;
}


export async function getGenres(): Promise<string[]> {
    const contentDir = path.join(process.cwd(), 'src', 'content');
    const files = fs.readdirSync(contentDir);

    let genres: string[] = [];

    for (const fileName of files) {
        const filePath = path.join(contentDir, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);

        if (data.genres && Array.isArray(data.genres)) {
            genres.push(...data.genres);
        }
    }

    const uniqueGenres = [...new Set(genres)].sort();
    return uniqueGenres;
}

export async function getUniqueField(fieldName: string): Promise<string[]> {
    const contentDir = path.join(process.cwd(), 'src', 'content');
    const files = fs.readdirSync(contentDir);

    let values: string[] = [];

    for (const fileName of files) {
        const filePath = path.join(contentDir, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);

        if (data[fieldName]) {
            if (Array.isArray(data[fieldName])) {
                values.push(...data[fieldName]);
            } else if (typeof data[fieldName] === 'string') {
                values.push(data[fieldName]);
            }
        }
    }

    const uniqueValues = [...new Set(values)].sort();
    return uniqueValues;
}

// Define PostMeta type
export interface PostMeta {
    id: number;
    name: string;
    slug: string;
    poster: string;
    remote_poster: string;
    original_language: string;
    dubbed_in: string | null;
    released_date: string;
    synopsis: string;
    type: string;
    rating: string;
    imdbid: string;
    tmdbid: string | null;
    views: number;
    likes: number;
    dislikes: number;
    author_id: number;
    trailer_url: string | null;
    runtime: string;
    is_featured: number;
    is_active: number;
    is_comingsoon: number;
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
    seo_image: string;
    screenshots: string | null;
    redirect_to: string | null;
    social_shares: number;
    created_at: string;
    updated_at: string;

    // 👇 newly added fields
    categories: string[];
    directors: string[];
    genres: string[];
    years: string[];
}


export interface Post extends PostMeta {
    contentHtml: string;
}

const postsDirectory = path.join(process.cwd(), 'src', 'content');

function parseFrontmatter(data: any): PostMeta {
    return {
        ...data,
        created_at: typeof data.created_at === 'string' ? data.created_at : data.created_at?.toISOString() ?? '',
        updated_at: typeof data.updated_at === 'string' ? data.updated_at : data.updated_at?.toISOString() ?? '',
    };
}

export function getAllPosts(page: number, limit: number): PostMeta[] {
    const fileNames = fs.readdirSync(postsDirectory);

    // Map and parse the posts as before
    const posts = fileNames
        .map((fileName) => {
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data } = matter(fileContents);

            return parseFrontmatter(data);
        })
        // Sort posts by created_at (most recent first)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // Implement pagination
    return posts.slice((page - 1) * limit, page * limit);
}


// Add a function to get the total number of posts for pagination purposes
export function getTotalPosts(): number {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.length;
}

export async function getPostBySlug(slug: string): Promise<Post> {
    const fileNames = fs.readdirSync(postsDirectory);

    for (const fileName of fileNames) {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        if (data.slug === slug) {
            const processedContent = await remark().use(html).process(content);
            const contentHtml = processedContent.toString();

            return {
                ...parseFrontmatter(data),
                contentHtml,
            };
        }
    }

    throw new Error(`Post not found with slug: ${slug}`);
}
