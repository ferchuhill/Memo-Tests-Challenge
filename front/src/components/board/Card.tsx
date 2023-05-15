import react from "react";
import Image from "next/image";

export type CardProps = {
    card: CardType;
    onClick: (card: CardType) => void;
};

const Card = ({ card, onClick }: CardProps) => {
    //  check if the card is flipped
    const isFlipped = card.state === "Flipped";
    //  check if the card is paired
    const isPaired = card.state === "Paired";
    //  check if the card is hidden
    const isHidden = card.state === "Hidden";

    // show the card front and back
    const renderCard = (
        <>
            <div
                className={`absolute top-0 left-0 w-full h-full bg-gray-400`}
                style={{ backfaceVisibility: "hidden" }}
            >
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <h4 className="text-6xl">{+card.position + 1}</h4>
                </div>
            </div>
            <div
                className={`absolute top-0 left-0 w-full h-full`}
                style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                }}
            >
                <Image
                    src={card.url}
                    alt="card"
                    fill={true}
                    className={"object-cover"}
                    object-fit="cover"
                    priority={true}
                />
            </div>
        </>
    );

    return (
        <div
            className="inline-block w-28 h-28"
            style={{ perspective: "600px" }}
        >
            <button
                aria-label="card"
                className={`flex flex-col items-center justify-center w-28 h-28 bg-gray-400 rounded-md shadow-md relative`}
                style={{
                    transform:
                        isFlipped || isPaired
                            ? "translateX(-100%) rotateY(-180deg)"
                            : "translateX(0%) rotateY(0deg)",
                    transition: "0.4s",
                    transformStyle: "preserve-3d",
                    transformOrigin: "center right",
                }}
                onClick={() => onClick(card)}
            >
                {renderCard}
            </button>
        </div>
    );
};

export default Card;
