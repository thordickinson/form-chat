import { FaBackward } from "react-icons/fa";

export default function RevertButton({ onRevert, canRevert }) {
    const onRevertClick = () => {
        if(canRevert) onRevert();
    }
    return (
        <button
            onClick={onRevertClick}
            className={`alt-button ${canRevert ? "" : "disabled"}`}
        >
            <FaBackward />
        </button>
    );
}
