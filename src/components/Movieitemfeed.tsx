import React from 'react';
import { PostMeta } from '@/lib/getPosts';
import Link from 'next/link';


interface MovieItemFeedProps {
    moviefeed: PostMeta[];
}
export default function MovieItemFeed({ moviefeed }: MovieItemFeedProps) {


    return (
        <>
            <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 auto-rows-fr">
                {moviefeed.map((item, index) => (
                    <div className="movie-card h-full" key={index}>
                        <Link href={`/movie/${item.slug}`} className="block h-full">
                            <div className="relative flex flex-col h-full overflow-hidden rounded border border-gray-200 hover:shadow-lg transition-shadow">
                                <div className="flex-shrink-0">
                                    <picture>
                                        <source
                                            media="(min-width: 768px)"
                                            srcSet={`https://wsrv.nl/?url=${item.remote_poster}?width=300 1x, https://wsrv.nl/?url=${item.remote_poster}?width=600 2x`}
                                        />
                                        <source
                                            media="(max-width: 767px)"
                                            srcSet={`https://wsrv.nl/?url=${item.remote_poster}?width=150 1x, https://wsrv.nl/?url=${item.remote_poster}?width=300 2x`}
                                        />
                                        <img
                                            alt={item.name}
                                            className="w-full aspect-[2/3] object-cover"
                                            loading="lazy"
                                            src={'https://wsrv.nl/?url=' + item.remote_poster}
                                        />
                                    </picture>
                                </div>
                                <div className="p-2 text-center flex-grow flex items-center justify-center">
                                    <h3 className="font-bold capitalize text-[#2a6496] line-clamp-2">
                                        {item.name}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};