import React, { useState } from "react";
import { Keypair, SystemProgram,Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {MINT_SIZE,createInitializeMint2Instruction ,getMinimumBalanceForRentExemptMint,TOKEN_PROGRAM_ID} from "@solana/spl-token";

const Tokenlaunchpad = () => {
  
  const wallet = useWallet();
  const {connection} = useConnection();


  const [formdata, setFormdata] = useState({
    tokenname: "",
    symbol: "",
    imageUrl: "",
    initialSupply: "",
  }); 
  async function createToken() {

    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const keypair = Keypair.generate();

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        formPubkey: wallet.publicKey,
        newAccountPubkey: keypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId:TOKEN_PROGRAM_ID,
      }),
      
      createInitializeMint2Instruction(keypair.publicKey,6,wallet.publicKey,wallet.publicKey,TOKEN_PROGRAM_ID)

      
    );

    const recentBlockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = recentBlockhash.blockhash;
    transaction.feePayer = wallet.publicKey


    transaction.partialSign(keypair);
    let responce = await wallet.sendTransaction(transaction,connection);
    console.log(responce);

  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  }

  return (


    <div>
      <div className="">
        <h1 className="font-semibold text-2xl text-center bg-">
          Solana Token LaunchPad
        </h1>
        <div className="flex flex-col justify-center items-center ">
          <input
            className="border-3 p-2 w-[30%] mt-2 rounded-xl"
            name="tokenname"
            value={formdata.tokenname}
            onChange={handleInputChange}
            type="text"
            placeholder="Name"
          />
          <input
            className="border-3 p-2 w-[30%] mt-2 rounded-xl"
            name="symbol"
            value={formdata.symbol}
            onChange={handleInputChange}
            type="text"
            placeholder="Symbol"
          />
          <input
            className="border-3 p-2 w-[30%] mt-2 rounded-xl"
            name="imageUrl"
            value={formdata.imageUrl}
            onChange={handleInputChange}
            type="text"
            placeholder="Image URL"
          />
          <input
            className="border-3 p-2 w-[30%] mt-2 rounded-xl"
            name="initialSupply"
            value={formdata.initialSupply}
            onChange={handleInputChange}
            type="text"
            placeholder="Initial Supply"
          />
          <button onClick={createToken} className="bg-black text-white p-2 mt-2 rounded hover:bg-[]">
            Create a token
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tokenlaunchpad;
