import React, { useContext } from "react";

const BlockPreview = () => {
  return (
    <div className=" rounded overflow-hidden shadow-lg bg-white p-2">
      <div className="mb-4">
        <span className="font-mono font-bold mb">Preview</span>
      </div>

      <div className="flex flex-row mb-4">
        <div className="basis-2/12 font-mono font-bold">Hash:</div>

        <div className="basis-10/12 font-serif pl-3">
          4284f914dca056cb0dccfba0b6bf03779c1deed9502a23d4519db316c33baecd
        </div>
      </div>

      <div className="flex flex-row mb-4">
        <div className="basis-2/12 font-mono font-bold">Block No:</div>

        <div className="basis-10/12 font-serif pl-3">test</div>
      </div>

      <div className="flex flex-row mb-4">
        <div className="basis-2/12 font-mono font-bold">3:</div>

        <div className="basis-10/12 font-serif pl-3">test</div>
      </div>

      <div className="flex flex-row mb-4">
        <div className="basis-2/12 font-mono font-bold">4:</div>

        <div className="basis-10/12 font-serif pl-3">test</div>
      </div>
    </div>
  );
};

export default BlockPreview;
