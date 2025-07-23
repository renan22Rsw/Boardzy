"use client";

import { useEffect, useState } from "react";
import { CardModal } from "../_components/modal/card-modal";

export const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <CardModal />;
};
