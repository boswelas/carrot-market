import db from "@/lib/database";
import getSession from "@/lib/session";
import Link from "next/link";
import Image from "next/image";

async function getProducts(userId: number) {
    const products = await db.product.findMany({
        where: {
            userId,
        },
        select: {
            id: true,
            title: true,
            photo: true,
            created_at: true,
        },
        orderBy: {
            created_at: "desc",
        }
    });
    return products;
}

export default async function UserProductCarousel() {
    const session = await getSession();
    const user = await session.id;
    if (user) {
        const products = await getProducts(user);
        return (
            <div className="flex gap-5 flex-wrap">
                {products.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`} className="flex flex-col items-center w-40 m-2">
                        <div className="relative w-full h-28 rounded-md overflow-hidden">
                            <Image fill src={product.photo} alt={product.title} className="object-cover" />
                        </div>
                        <div className="flex flex-col items-center mt-2 text-center">
                            <span className="text-md text-white text-center">{product.title}</span>
                        </div>
                    </Link>
                ))}
            </div>
        );
    }

}
