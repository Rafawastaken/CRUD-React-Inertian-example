import MovieTable from '@/components/custom/movie-table';
import InertiaPagination from '@/components/inertia-pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PaginatedPosts } from '@/types/posts';
import { Head, Link, router, usePage } from '@inertiajs/react';
import debounce from 'lodash/debounce';
import { Search } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];
export default function Posts({ posts }: { posts: PaginatedPosts }) {
    const { flash } = usePage<{ flash: { message?: string } }>().props;

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash.message]);

    const handleSearch = useRef(
        debounce((query: string) => {
            router.get(
                '/posts',
                { search: query },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 500),
    ).current;

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        handleSearch(query);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className={'rounded border p-6 shadow-xl'}>
                    <div className={'mb-5 flex items-center justify-between'}>
                        <div className="relative w-full sm:w-1/3">
                            <Input id={'search'} className="peer ps-9" placeholder="Search..." type="search" onChange={onSearchChange} />
                            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                <Search size={16} aria-hidden="true" />
                            </div>
                        </div>
                        <Button>
                            <Link href={'/posts/create'} prefetch>
                                Create a Post
                            </Link>
                        </Button>
                    </div>

                    <MovieTable posts={posts} />
                    <InertiaPagination posts={posts} />
                </div>
            </div>
        </AppLayout>
    );
}
