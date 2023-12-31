import React from "react";
import { Button } from "./ui/button";

const GoogleSignInButton = ({ children }: React.PropsWithChildren) => {
    const loginWithGoogle = () => console.log("login with google");

    return (
        <Button onClick={loginWithGoogle} className="w-full">
            {children}
        </Button>
    );
};

export default GoogleSignInButton;
