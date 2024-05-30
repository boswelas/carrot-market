import db from "@/lib/database";
import { formatToTimeAgo } from "@/lib/utils";
import { HandThumbUpIcon } from "@heroicons/react/16/solid";
import { PlusIcon } from "@heroicons/react/24/solid";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

async function getPosts() {
    const posts = await db.post.findMany({
        orderBy: {
            created_at: 'desc',
        },
        select: {
            id: true,
            title: true,
            description: true,
            views: true,
            created_at: true,
            _count: {
                select: {
                    comments: true,
                    likes: true,
                }
            }
        }
    });
    return posts;
}

export const metadata = {
    title: "Forum"
}

export default async function Board() {
    const posts = await getPosts();
    return (
        <div className="p-5 flex flex-col">
            {posts.map((post) => (
                <Link
                    key={post.id}
                    href={`/posts/${post.id}`}
                    className="pb-5 mb-5 border-b border-neutral-500 text-neutral-400 flex  flex-col gap-2 last:pb-0 last:border-b-0"
                >
                    <h2 className="text-white text-lg font-semibold">{post.title}</h2>
                    <p>{post.description}</p>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex gap-4 items-center">
                            <span>{formatToTimeAgo(post.created_at.toString())}</span>
                            <span>·</span>
                            <span>{post.views} views</span>
                        </div>
                        <div className="flex gap-4 items-center *:flex *:gap-1 *:items-center my-8">
                            <span>
                                <HandThumbUpIcon className="size-4" />
                                {post._count.likes}
                            </span>
                            <span>
                                <ChatBubbleBottomCenterIcon className="size-4" />
                                {post._count.comments}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
            <Link href="/board/add-post" className="bg-orange-500 flex items-center justify-center rounded-full 
            size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400">
                <PlusIcon className="size-10" />
            </Link>
        </div>
    );
}