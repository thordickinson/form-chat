import { FaBackward } from "react-icons/fa";

export default function RevertButton({ onRevert, canRevert }) {
    return (
        <button
            onClick={onRevert}
            className={`alt-button ${canRevert ? "" : "disabled"}`}
        >
            <FaBackward />
        </button>
    );
}
