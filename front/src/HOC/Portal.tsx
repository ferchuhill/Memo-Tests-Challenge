import { useEffect, useState, FC } from "react";
import { createPortal } from "react-dom";

type Props = {
    children?: React.ReactNode;
};
const Portal: FC<Props> = ({ children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const element = document.querySelector("#modal-root");
    return mounted && element ? createPortal(children, element) : null;
};

export default Portal;
