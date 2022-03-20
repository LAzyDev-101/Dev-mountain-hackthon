// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

import React, { useState } from "react";
import { ethers } from "ethers";
import SimpleStorage_abi from "../contracts/SimpleStorage_abi.json";

const SimpleStorage = () => {
  let contractAddress = "0xC6CD08Fd1E07a81afC2286235de3f25053e857E4";

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const [currentContractVal, setCurrentContractVal] = useState(null);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(contractAddress, SimpleStorage_abi, tempSigner);
    setContract(tempContract);
  };

  const setHandler = (event) => {
    event.preventDefault();
    console.log("sending " + ethers.utils.parseUnits(event.target.setText.value, "wei") + " to the contract");
    contract.store(ethers.utils.parseUnits(event.target.setText.value, "wei"));
  };

  const getCurrentVal = async () => {
    let val = await contract.retrieve();
    console.log("current value is " + val);
    setCurrentContractVal("" + val);
  };

  return (
    <div className="bg-slate-400 m-2 p-8 drop-shadow rounded">
      <h4 className="mb-5 font-mono font-bold"> {"Get/Set Contract interaction"} </h4>
      <button
        className=" bg-blue-500 hover:bg-blue-700 text-white font-semibold text-sm py-1 px-2 rounded"
        onClick={connectWalletHandler}
      >
        {connButtonText}
      </button>
      <div className="mt-5 font-mono font-bold">
        <h3>
          Address <span className=" text-blue-200 font-thin">{defaultAccount}</span>
        </h3>
      </div>
      <form className="mt-5" onSubmit={setHandler}>
        <input className="rounded p-0.5" id="setText" type="text" />
        <button
          className=" bg-blue-500 hover:bg-blue-700 text-white font-semibold text-sm py-1 px-2 rounded ml-3"
          type={"submit"}
        >
          Update Contract
        </button>
      </form>
      <div>
        <button
          className=" bg-blue-500 hover:bg-blue-700 text-white font-semibold text-sm py-1 px-2 rounded mt-5"
          onClick={getCurrentVal}
        >
          Get Current Contract Value
        </button>
      </div>
      <div className="mt-5 font-mono font-bold">
        <h3>Result</h3>
        <span className=" text-blue-600 font-semibold">
          {currentContractVal}
          {errorMessage}
        </span>
      </div>
    </div>
  );
};

export default SimpleStorage;
