import * as wasmModule from "../security/encrypt_decrypt.js";

interface WasmModule {
  _malloc(size: number): number;
  _free(ptr: number): void;
  stringToUTF8(str: string, ptr: number, maxBytes: number): void;
  UTF8ToString(ptr: number): string;
  _encrypt_decrypt(ptr: number, length: number): void;
}

// Forcer le type de la fonction WASM
const createEncryptDecryptModule = wasmModule as unknown as (moduleArgs?: object) => Promise<WasmModule>;

let encryptDecryptModule: WasmModule | null = null;

export const wasmReadyPromise = createEncryptDecryptModule().then((module) => {
  encryptDecryptModule = module;
  if (!encryptDecryptModule._malloc || !encryptDecryptModule._free || !encryptDecryptModule.stringToUTF8 || !encryptDecryptModule.UTF8ToString || !encryptDecryptModule._encrypt_decrypt) {
    console.error("WebAssembly module is missing required functions.");
    encryptDecryptModule = null;
  }
}).catch((err) => {
  console.error("Failed to load WebAssembly module:", err);
  encryptDecryptModule = null;
});

// Custom storage object for Zustand Persist middleware
export const cryptoLocalStorage = {
  setItem: (name: string, value: { state: { money: number | string } }) => {
    const stateToStore = { ...value }; // Clone the state object (value is {state: ..., version: ...})

    if (encryptDecryptModule) {
      try {
        // Access the actual store state nested under 'state'
        const moneyString = stateToStore.state.money.toString();
        const length = moneyString.length;

        const ptr = encryptDecryptModule._malloc(length + 1); // +1 for null terminator
        encryptDecryptModule.stringToUTF8(moneyString, ptr, length + 1);
        encryptDecryptModule._encrypt_decrypt(ptr, length);
        const encryptedMoney = encryptDecryptModule.UTF8ToString(ptr);
        encryptDecryptModule._free(ptr);

        stateToStore.state.money = encryptedMoney; // Replace with encrypted string
      } catch (e) {
        console.error("Error encrypting money with Wasm in setItem, saving unencrypted:", e);
      }
    } else {
      console.warn("WebAssembly module not loaded in setItem, saving money unencrypted.");
    }
    localStorage.setItem(name, JSON.stringify(stateToStore));
  },
  getItem: (name: string) => {
    const storedValue = localStorage.getItem(name);
    if (!storedValue) return null;

    let parsedState: { state: { money: number | string } };
    try {
      parsedState = JSON.parse(storedValue);
    } catch (e) {
      console.error("Error parsing stored data in getItem:", e);
      return null;
    }

    if (encryptDecryptModule) {
      try {
        // Access the actual store state nested under 'state'
        const encryptedMoney = parsedState.state.money;
        if (typeof encryptedMoney === 'string') {
          const length = encryptedMoney.length;

          const ptr = encryptDecryptModule._malloc(length + 1);
          encryptDecryptModule.stringToUTF8(encryptedMoney, ptr, length + 1);
          encryptDecryptModule._encrypt_decrypt(ptr, length);
          const decryptedMoney = encryptDecryptModule.UTF8ToString(ptr);
          encryptDecryptModule._free(ptr);

          parsedState.state.money = Number(decryptedMoney); // Convert back to number
        } else {
          console.warn("Money field is not a string in getItem, cannot decrypt. Using as is.");
        }
      } catch (e) {
        console.error("Error decrypting money with Wasm in getItem, using unencrypted value:", e);
      }
    } else {
      console.warn("WebAssembly module not loaded in getItem, loading money unencrypted.");
    }
    return parsedState;
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};
