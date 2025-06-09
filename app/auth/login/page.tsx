import { AuthFormWrapper } from "@/components/feature-modules/authentication/AuthFormWrapper";
import LoginForm from "@/components/feature-modules/authentication/Login";
import { supabaseServerAuthHelper } from "@/lib/util/auth/auth.util";

const page = async () => {
    const authenticationHelper = await supabaseServerAuthHelper();

    return (
        <AuthFormWrapper>
            <LoginForm callbacks={authenticationHelper} />
        </AuthFormWrapper>
    );
};

export default page;
