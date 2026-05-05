/** @public */
export function uint8ArrayToArrayBuffer(unit8Arr: Uint8Array): ArrayBuffer {
    const copied = new Uint8Array(unit8Arr.byteLength)

    copied.set(unit8Arr)

    const buffer = copied.buffer.slice(
        //
        copied.byteOffset,
        copied.byteOffset + copied.byteLength
    )
    return buffer
}
