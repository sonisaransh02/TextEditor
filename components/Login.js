import Button from "@material-tailwind/react/Button";
import Image from "next/image";
import { signIn } from "next-auth/client";
import img from "../images/google-docs.png";

function Login() {
    return (
        <div className="flex flex-col items-center
        justify-center min-h-screen py-2">
            <Image 
                src={img}
                height="300"
                width="550"
                objectFit="contain"    
            />
            <Button 
            className="w-44 mt-10"
            color="blue"
            buttonType="filled"
            ripple="light"
            onClick={ signIn } 
            > LogIn </Button>
        </div>
    );
}

export default Login;