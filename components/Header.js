import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signOut, useSession } from "next-auth/client";

function Header () {
    const [session] = useSession();
    return (
        // Button and gdoc img
        <header className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white">
        <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="md:inline-flex h-20 w-20 border-0" 
        >
        <Icon name="menu" size="3xl" />
        </Button>
        <Icon name="description" size="5xl" color="blue" />
        <h1 className="md:inline-flex ml-2 text-gray-600 text-2xl">
        TextEditor</h1>

        <div className="w-5 md:w-auto ml-2 flex 
        flex-grow items-center pl-2 py-2 
        bg-gray-100 text-gray-600 rounded-lg
         focus-within:text-gray-600 
         focus-within:shadow-md">
        <Icon name="search" size="3xl" color="darkgray" />
        <input
            type="text"
            placeholder="Search"
            className="flex-grow text-base 
            bg-transparent outline-none"
        />
    </div>
    <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="md:inline-flex h-20 w-20 border-0" 
        >
        <Icon name="apps" size="3xl" color="gray"/>
        </Button>
        <img
            onClick={signOut}
            loading="lazy"
            className="cursor-pointer h-12 w-12
            rounded-full ml-2"
            src={session?.user?.image}
            alt="image"
            />
</header>
    );
}

export default Header;