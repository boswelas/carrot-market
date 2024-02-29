import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function CreateAccount() {
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl ">Welcome!</h1>
                <h2 className="text-xl">Fill in the form below to join!</h2>
            </div>
            <form className="flex flex-col gap-3">
                <FormInput
                    type="text"
                    placeholder="Username"
                    required
                    errors={[]} />
                <FormInput
                    type="Email"
                    placeholder="email"
                    required
                    errors={[]} />
                <FormInput
                    type="password"
                    placeholder="Password"
                    required
                    errors={[]} />
                <FormInput
                    type="password"
                    placeholder="Confirm Password"
                    required
                    errors={[]} />
                <FormButton loading={false} text={"Create Account"} />
            </form>
            <SocialLogin />
        </div>
    );
}