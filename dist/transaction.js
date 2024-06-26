"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = exports.Transaction = void 0;
class Transaction {
    data;
    signer;
    waitCallback;
    constructor(data, signer, waitCallback) {
        this.data = data;
        this.signer = signer;
        this.waitCallback = waitCallback;
    }
    async wait(confirmations) {
        const tx = await this.signer.sendTransaction(this.data);
        const receipt = await tx.wait(confirmations);
        if (!receipt) {
            throw new Error(`Unable to confirm: ${tx}`);
        }
        return this.waitCallback(receipt);
    }
}
exports.Transaction = Transaction;
class Base {
    contract;
    signer;
    constructor(factory, address, signer) {
        this.contract = factory.attach(address);
        if (signer) {
            this.connect(signer);
            this.signer = signer;
        }
    }
    // Connects the API to a specific signer
    connect(signer) {
        this.contract = this.contract.connect(signer);
        this.signer = signer;
        return this;
    }
    // Gets the chain ID
    async getChainId() {
        const provider = this.contract.runner?.provider;
        if (!provider) {
            throw new Error("Unable to get the chain ID: provider wasn't set");
        }
        return (await provider.getNetwork()).chainId;
    }
}
exports.Base = Base;
//# sourceMappingURL=transaction.js.map