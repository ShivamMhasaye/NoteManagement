import { FaTrash, FaUserPlus } from "react-icons/fa6";
import { FaArchive } from "react-icons/fa";

export const notesHomeIcons = [
  {
    icon: <FaArchive />,
    title: "Archive",
    size: "30",
    method: "Archive",
  },
  {
    icon: <FaUserPlus />,
    title: "Add Collaborator",
    size: "30",
    method: "Collaborator",
  },
  {
    icon: <FaTrash />,
    title: "Move To Bin",
    size: "30",
    method: "Trash",
  },
];
