
"use client";

import { useAtomValue } from "jotai";
import { modalState } from "@/atoms/modalAtoms";
import Modal from "./Modal";

export default function ModalWrapper() {
  const showModal = useAtomValue(modalState);

  if (!showModal) return null;

  return <Modal />;
}
