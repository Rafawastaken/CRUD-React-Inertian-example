import { Button } from '@/components/ui/button';
import { PaginatedPosts } from '@/types/posts';
import { Link } from '@inertiajs/react';

export default function InertiaPagination({ posts }: { posts: PaginatedPosts }) {
    return (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 px-10 sm:justify-between">
            <div>
                Página {posts.current_page} de {posts.last_page}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
                {posts.links.map((link, index) => {
                    const isDisabled = !link.url;

                    if (isDisabled) {
                        return (
                            <Button
                                key={index}
                                variant={'outline'}
                                disabled
                                className="pointer-events-none opacity-50"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        );
                    }

                    return (
                        <Button asChild key={index} variant={link.active ? 'default' : 'outline'}>
                            <Link href={link.url!} dangerouslySetInnerHTML={{ __html: link.label }} />
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
