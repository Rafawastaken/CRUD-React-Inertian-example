import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Posts',
        href: '/posts/create',
    },
];

export default function CreatePosts() {
    const { data, setData, post, errors, processing } = useForm<{
        title: string;
        category: string;
        status: string;
        review: string;
        image: File | null;
    }>({
        title: '',
        category: '',
        status: '',
        review: '',
        image: null,
    });

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/posts', {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Post" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className={'rounded border p-6 shadow-md'}>
                    <div className="mb-5 flex items-center justify-between">
                        <div className="text-xl text-slate-600">Create Post</div>
                        <Button>
                            <Link href={'/posts'} prefetch>
                                Go Back
                            </Link>
                        </Button>
                    </div>

                    <Card>
                        <CardContent>
                            <form onSubmit={handleFormSubmit}>
                                <div className={'grid grid-cols-2 gap-4'}>
                                    {/* title */}
                                    <div className={'col-span-2'}>
                                        <Label htmlFor={'title'}>Title</Label>
                                        <Input
                                            type={'text'}
                                            id={'title'}
                                            placeholder={'Title'}
                                            aria-invalid={!!errors.title}
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                        />
                                        <InputError message={errors.title} />
                                    </div>
                                    {/* category */}
                                    <div className={'col-span-2 md:col-span-1'}>
                                        <Label htmlFor={'category'}>Category</Label>
                                        <Select value={data.category} onValueChange={(e) => setData('category', e)}>
                                            <SelectTrigger id={'category'} aria-invalid={!!errors.category}>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Marvel">Marvel</SelectItem>
                                                <SelectItem value="DC">DC</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.category} />
                                    </div>
                                    {/* status */}
                                    <div className={'col-span-2 md:col-span-1'}>
                                        <Label htmlFor={'status'}>Status</Label>
                                        <Select value={data.status} onValueChange={(e) => setData('status', e)}>
                                            <SelectTrigger id={'status'} aria-invalid={!!errors.status}>
                                                <SelectValue placeholder="Select a status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0">Active</SelectItem>
                                                <SelectItem value="1">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.status} />
                                    </div>
                                </div>
                                {/* content */}
                                <div className={'mt-4'}>
                                    <Label htmlFor={'content'}>Content</Label>
                                    <Textarea
                                        id={'content'}
                                        rows={6}
                                        placeholder={'Type content here'}
                                        aria-invalid={!!errors.review}
                                        value={data.review}
                                        onChange={(e) => setData('review', e.target.value)}
                                    />
                                    <InputError message={errors.review} />
                                </div>
                                {/* Image */}
                                <div className="mt-4">
                                    <Label htmlFor={'image'}>Select an Image</Label>
                                    <Input
                                        type="file"
                                        id="image"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData('image', file);
                                            }
                                        }}
                                        aria-invalid={!!errors.image}
                                    />
                                    {data.image && (
                                        <img
                                            src={URL.createObjectURL(data.image)}
                                            alt={`Preview ${data.title} image`}
                                            className={'mt-2 h-32 rounded-lg object-cover'}
                                        />
                                    )}
                                    <InputError message={errors.image} />
                                </div>
                                {/* Submit */}
                                <div className="mt-4 text-end">
                                    <Button type={'submit'} disabled={processing} size={'lg'}>
                                        {processing && <Loader2 className={'animate-spin'} />}
                                        Create Post
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
