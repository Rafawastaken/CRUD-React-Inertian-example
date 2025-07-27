export interface PostType {
    id: number;
    title: string;
    content: string;
    category: string;
    status: string;
    image: string;
}

export interface LinksType {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedPosts {
    data: PostType[];
    links: LinksType[];
    from: number;
    to: number;
    total: number;
    current_page: number;
    last_page: number;
}
