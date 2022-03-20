import { ethers } from 'ethers'

export const hashSha256 = (obj) => {
    const byte32Data = ethers.utils.toUtf8Bytes(JSON.stringify(obj));
    const hash = ethers.utils.sha256(byte32Data);
    return hash
};
