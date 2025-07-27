import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PostType } from '@/types/posts';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

export default function ShowPost({ post }: { post: PostType }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={post.title} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded border p-6 shadow-md">
                    <div className="mb-5 flex items-center justify-between">
                        <h1 className="text-xl font-semibold text-slate-700 uppercase">{post.title}</h1>
                        <Button variant="outline">
                            <Link href="/posts" prefetch>
                                Voltar
                            </Link>
                        </Button>
                    </div>

                    <div className="flex flex-col gap-6">
                        {post.image && (
                            <img
                                src={`/storage/${post.image}`}
                                alt={post.title}
                                className="mx-auto h-auto max-h-[500px] w-full max-w-4xl rounded object-cover"
                            />
                        )}

                        <div className="grid grid-cols-1 gap-4 text-sm text-muted-foreground sm:grid-cols-2">
                            <div>
                                <strong>Categoria:</strong> {post.category}
                            </div>
                            <div>
                                <strong>Estado:</strong> {post.status === '1' ? 'Ativo' : 'Inativo'}
                            </div>
                        </div>

                        <div className="mt-4 text-base leading-relaxed whitespace-pre-line text-slate-800">{post.content}</div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
