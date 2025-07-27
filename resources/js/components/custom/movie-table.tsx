import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginatedPosts } from '@/types/posts';
import { Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';

export default function MovieTable({ posts }: { posts: PaginatedPosts }) {
    function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(`/posts/${id}`);
        }
    }

    return (
        <Card>
            <CardContent className="p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">#</TableHead>
                            <TableHead className="w-16">Imagem</TableHead>
                            <TableHead>Título</TableHead>
                            <TableHead className="max-w-[250px]">Conteúdo</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts?.data.map((post, index) => (
                            <TableRow key={post.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        onError={(e) => (e.currentTarget.src = '/fallback.png')}
                                        className="max-h-6 w-13 rounded border object-cover"
                                    />
                                </TableCell>
                                <TableCell className="font-medium">
                                    <Link href={`/posts/${post.id}`}>{post.title}</Link>
                                </TableCell>
                                <TableCell className="line-clamp-2 max-w-[250px] truncate text-sm text-muted-foreground">{post.content}</TableCell>
                                <TableCell>{post.category}</TableCell>
                                <TableCell>
                                    <span
                                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                                            post.status == '1' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                    >
                                        {post.status == '1' ? 'Active' : 'Inactive'}
                                    </span>
                                </TableCell>
                                <TableCell className="flex justify-end gap-2">
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={`/posts/${post.id}/edit`} prefetch>
                                            <Pencil className="mr-1 h-4 w-4" />
                                            Editar
                                        </Link>
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
                                        <Trash2 className="mr-1 h-4 w-4" />
                                        Apagar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
