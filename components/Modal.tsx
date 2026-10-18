
"use client";

import MuiModal from "@mui/material/Modal";
import { useAtom } from "jotai";
import { modalState } from "@/atoms/modalAtoms";

export default function Modal() {
  const [showModal, setShowModal] = useAtom(modalState);

  const handleClose = () => setShowModal(false);

  return (
    <MuiModal open={showModal} onClose={handleClose}>
      <div>Modal</div>
    </MuiModal>
  );
}
