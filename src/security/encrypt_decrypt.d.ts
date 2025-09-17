interface WasmModule {
  _malloc(size: number): number;
  _free(ptr: number): void;
  stringToUTF8(str: string, ptr: number, maxBytes: number): void;
  UTF8ToString(ptr: number): string;
  _encrypt_decrypt(ptr: number, length: number): void;
}

declare function createEncryptDecryptModule(moduleArgs?: object): Promise<WasmModule>;
export default createEncryptDecryptModule;