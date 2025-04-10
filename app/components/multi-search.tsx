'use client';

import { Badge } from "@/components/ui/badge";
import Image from 'next/image';

interface SearchImage {
    url: string;
    description?: string;
}

interface SearchResult {
    query: string;
    results: Array<{
        url: string;
        title: string;
        content: string;
        published_date?: string;
    }>;
    images?: SearchImage[];
}

interface MultiSearchProps {
    result?: {
        searches?: SearchResult[];
    };
    annotations?: any[];
}

export function MultiSearch({ result, annotations = [] }: MultiSearchProps) {
    // Early return if no result or searches
    if (!result?.searches || !Array.isArray(result.searches)) {
        return (
            <div className="p-4 text-center text-neutral-500">
                No search results available
            </div>
        );
    }

    // Get unique queries safely
    const queries = result.searches
        .filter(search => search && typeof search.query === 'string')
        .map(search => search.query);

    // Safely collect all images from all searches
    const allImages = result.searches
        .filter(search => search && Array.isArray(search.images))
        .flatMap(search => search.images || [])
        .filter(image => image && typeof image.url === 'string');

    return (
        <div>
            <SearchLoadingState queries={queries} annotations={annotations} />
            
            {/* Display search results */}
            <div className="space-y-6">
                {result.searches.map((search, searchIndex) => {
                    if (!search || !Array.isArray(search.results)) return null;
                    
                    return (
                        <div key={searchIndex} className="space-y-4">
                            {search.results.map((item, itemIndex) => {
                                if (!item || typeof item.content !== 'string') return null;

                                return (
                                    <div key={`${searchIndex}-${itemIndex}`} className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
                                        <h3 className="font-medium mb-2">{item.title || 'No Title'}</h3>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.content}</p>
                                        {item.published_date && (
                                            <p className="text-xs text-neutral-500 mt-2">
                                                Published: {new Date(item.published_date).toLocaleDateString()}
                                            </p>
                                        )}
                                        <a 
                                            href={item.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-xs text-blue-500 hover:underline mt-2 block"
                                        >
                                            {item.url}
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            {/* Display images if any */}
            {allImages.length > 0 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {allImages.map((image, index) => (
                        <div key={index} className="relative aspect-video">
                            <Image
                                src={image.url}
                                alt={image.description || 'Search result image'}
                                className="rounded-lg object-cover"
                                fill
                                sizes="(max-width: 768px) 50vw, 33vw"
                                priority={index < 6}
                            />
                            {image.description && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-xs rounded-b-lg">
                                    {image.description}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export function SearchLoadingState({ queries = [], annotations = [] }: { queries?: string[], annotations?: any[] }) {
    return (
        <div>
            {/* Query badges */}
            <div className="flex overflow-x-auto gap-1.5 mb-3 no-scrollbar pb-1">
                {queries.map((query, i) => {
                    const annotation = annotations.find(a => a.data?.query === query);
                    return (
                        <Badge
                            key={i}
                            variant={annotation?.data?.status === 'completed' ? 'default' : 'secondary'}
                            className="whitespace-nowrap"
                        >
                            {query}
                            {annotation?.data?.status === 'completed' && (
                                <span className="ml-1 text-green-500">✓</span>
                            )}
                        </Badge>
                    );
                })}
            </div>
        </div>
    );
} 