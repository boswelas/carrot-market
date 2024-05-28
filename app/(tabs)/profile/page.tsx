import UserProductCarousel from "@/components/user-product-carousel";
import db from "@/lib/database";
import getSession from "@/lib/session";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

async function getUser() {
    const session = await getSession();
    if (session.id) {
        const user = await db.user.findUnique({
            where: {
                id: session.id,
            },
        });
        if (user) {
            return user;
        }
    }
    notFound();
}

export default async function Profile() {
    const user = await getUser();
    const logOut = async () => {
        "use server";
        const session = await getSession();
        await session.destroy();
        redirect("/");
    }
    return (
        <div className="p-5 flex flex-col gap-4">
            <div >
                <h1>Welcome {user?.username}!</h1>
                <form action={logOut}>
                    <button>Log out</button>
                </form>
            </div>
            <div className="h-56 w-full bg-neutral-800 rounded-xl">
                <h1 className="text-center font-semibold text-xl">My Products</h1>
                <UserProductCarousel />
            </div>
            <div className="h-56 w-full bg-neutral-800 rounded-xl">
                <h1 className="text-center font-semibold text-xl">My Purchases</h1>

            </div>
        </div>
    )
}
