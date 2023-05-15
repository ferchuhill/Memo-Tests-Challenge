import { FC, FormEvent, useState } from "react";
import Popup from "../popUp/Popup";
type NewUserProps = {
    handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
    name: string | null;
    setName: (name: string) => void;
};
const NewUser: FC<NewUserProps> = ({ handleFormSubmit, name, setName }) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const closeModal = () => {
        setIsOpen(false);
    };
    return (
        <Popup title="Enter your name" onClose={closeModal}>
            <form onSubmit={handleFormSubmit} className="flex flex-col p-2 ">
                <input
                    type="text"
                    id="name"
                    value={name || ""}
                    onChange={(event) => setName(event.target.value)}
                    className="border border-gray-400 p-2 m-2"
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </Popup>
    );
};
export default NewUser;
