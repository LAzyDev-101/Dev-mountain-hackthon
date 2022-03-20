import ModalAddedTranscript from "components/ModalAddedTranscript";
import { useEffect, useState } from "react";

const SuccessSection = () => {
  const [open, setOpen] = useState();

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div>
      <ModalAddedTranscript open={open} />
    </div>
  );
};

export default SuccessSection;
