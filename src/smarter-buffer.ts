import { SmartBuffer } from 'smart-buffer';

export default class SmarterBuffer {
  private smartBuffer;
  private bookmarks = {};

  constructor(buffer) {
    this.smartBuffer = SmartBuffer.fromBuffer(buffer);
  }

  public setBookmark (key, offset = this.smartBuffer.readOffset) {
    this.bookmarks[key] = offset;
  };

  public getBookmark (key) {
    if (!(key in this.bookmarks)) {
      throw "Invalid bookmark";
    }
    return this.bookmarks[key];
  };

  public useBookmark (key) {
    if (!(key in this.bookmarks)) {
      throw "Invalid bookmark";
    }
    this.smartBuffer.readOffset = this.bookmarks[key];
  };

  static fromBuffer(buffer) {
    return new this(buffer);
  }

  public skip(numBytes) {
    this.smartBuffer.readOffset += numBytes;
    return this;
  }

  public readUIntLE(numBytes) {
    const num = this.smartBuffer.internalBuffer.readUIntLE(
      this.smartBuffer.readOffset,
      numBytes
    );
    this.skip(numBytes);
    return num;
  }

  public readString(numBytes) {
    return this.smartBuffer.readString(numBytes).replace(/\0+$/, "");
  }

  public remaining() {
    return this.smartBuffer.remaining();
   }
};
