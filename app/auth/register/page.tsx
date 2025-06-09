"use server";

import { AuthFormWrapper } from "@/components/feature-modules/authentication/AuthFormWrapper";
import RegisterForm from "@/components/feature-modules/authentication/Register";
import { AuthClientHelper } from "@/lib/interfaces/auth.interface";
import { supabaseServerAuthHelper } from "@/lib/util/auth/auth.util";

const page = async () => {
    const authHelper: AuthClientHelper = await supabaseServerAuthHelper();

    return (
        <AuthFormWrapper>
            <RegisterForm callbacks={authHelper} />
        </AuthFormWrapper>
    );
};

export default page;
