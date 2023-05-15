import { useContext } from "react";
import Portal from "@/HOC/Portal";
import { useState, useEffect } from "react";
import NewUser from "./NewUser";
import { UserContext } from "@/pages/_app";

const User = () => {
    const [user, setUser] = useState<string | null>(null);
    const [token, setTokenInt] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const { setToken, setUsername } = useContext(UserContext);

    useEffect(() => {
        const storedUser = localStorage.getItem("userName");
        const storedToken = localStorage.getItem("userToken");

        if (storedUser && storedToken) {
            setUser(storedUser);
            setTokenInt(storedToken);
            setToken(storedToken);
            setUsername(storedUser);
        } else {
            setShowPopup(true);
        }
    }, [setToken, setUsername]);

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const uuid = generateUUID();
        localStorage.setItem("userName", user || "");
        localStorage.setItem("userToken", uuid);
        setTokenInt(uuid);
        setToken(uuid);
        setShowPopup(false);
        setUsername(user || "");
    };

    const generateUUID = (): string => {
        return (
            Math.random().toString(36).substring(2) + Date.now().toString(36)
        );
    };

    return (
        <>
            {showPopup && (
                <Portal>
                    <NewUser
                        handleFormSubmit={handleFormSubmit}
                        name={user}
                        setName={setUser}
                    />
                </Portal>
            )}
            {user && token && (
                <div>
                    <p>Hello {user}</p>
                </div>
            )}
        </>
    );
};

export default User;
