# utf helpers

Package containing some low-level helpers to encode/decode strings to UTF-8 and UTF-16 sequences.  
Also it has some small helper to encode/decode hex strings.

Zero dependencies. Browser and Node compatible. 1.3Kb minified and gzipped.

## Install

`npm i utf-helpers`  
`yarn add utf-helpers`

Or, just include it to the browser (old school way):  
```html
<script src="utf-helpers.min.js"/>
<script>console.log(window.UtfHelpers)</script>
```

## Brief example

```ts
import {Utf8, Utf16, HexString} from 'utf-helpers'
// or import just all in one entry point:
// import {UtfHelpers} from 'utf-helpers'

Utf8.stringToU8a('a 🌷') // Uint8Array [97, 32, 240, 159, 140, 183]
Utf8.u8aToString([97, 32, 240, 159, 140, 183]) // "a 🌷"
Utf8.lengthInBytes('a 🌷') // 6

Utf16.stringToU16a('a 🌷') // Uint16Array [97, 32, 55356, 57143]
Utf16.u16aToString([97, 32, 55356, 57143]) // "a 🌷"
Utf16.lengthInBytes('a 🌷') // 4

HexString.toU8a('0x6120f09f8cb7') // Uint8Array [97, 32, 240, 159, 140, 183]
HexString.fromU8a([97, 32, 240, 159, 140, 183])// "0x6120f09f8cb7"

// even super complex strings!
Utf8.lengthInBytes('👨🏼‍👩🏼‍👧🏼‍👧🏼') // 41
Utf16.lengthInBytes('👨🏼‍👩🏼‍👧🏼‍👧🏼') // 19
```

## UTF-8

#### Example:

```ts
Utf8.stringToU8a('abc 🌷 η 人')
// Uint8Array  [97, 98, 99, 32, 240, 159, 140, 183, 32, 206, 183, 32, 228, 186, 186]
Utf8.stringToNumberArray('abc 🌷 η 人')
// [97, 98, 99, 32, 240, 159, 140, 183, 32, 206, 183, 32, 228, 186, 186]
Utf8.stringToHexString('abc 🌷 η 人')
// "0x61626320f09f8cb720ceb720e4baba"

Utf8.u8aToString(Uint8Array.from([97, 98, 99, 32, 240, 159, 140, 183, 32, 206, 183, 32, 228, 186, 186]))
Utf8.numberArrayToString([97, 98, 99, 32, 240, 159, 140, 183, 32, 206, 183, 32, 228, 186, 186])
Utf8.hexStringToString('0x61626320f09f8cb720ceb720e4baba')
// All three give "abc 🌷 η 人"
// Actually `u8aToString` and `numberArrayToString` both can take usual JS array and Uint8Array 

Utf8.lengthInBytes('abc 🌷 η 人') // 15
```

#### Methods:

To encode and decode string to Uint8Array:  
`stringToU8a(str: string): Uint8Array`  
`u8aToString(u8a: Uint8Array): string`

To encode and decode string to usual JS array (of numbers):  
`stringToNumberArray(str: string): number[]`  
`numberArrayToString(arr: number[] | Uint8Array): string`

To encode and decode string to hex string:  
`stringToHexString(str: string): string`  
`hexStringToString(hexString: string): string`

Evaluate byte length of the string without encoding:
`lengthInBytes(str: string): number`

## UTF-16

#### Example:

```ts
Utf16.stringToNumberArray('abc 🌷 η 人')
// [97, 98, 99, 32, 55356, 57143, 32, 951, 32, 20154]
Utf16.stringToU16a('abc 🌷 η 人')
// Uint16Array [97, 98, 99, 32, 55356, 57143, 32, 951, 32, 20154]

Utf16.u16aToString(Uint16Array.from([97, 98, 99, 32, 55356, 57143, 32, 951, 32, 20154]))
Utf16.numberArrayToString([97, 98, 99, 32, 55356, 57143, 32, 951, 32, 20154])
// Both give "abc 🌷 η 人"
// Actually `u16aToString` and `numberArrayToString` both can take usual JS array and Uint16Array

Utf16.lengthInBytes('abc 🌷 η 人') // 10
```

#### Methods

To encode and decode string to Uint16Array:  
`stringToU16a(str: string): Uint16Array`
`u16aToString(arr: number[] | Uint16Array): string`

To encode and decode string to usual JS array (of numbers):
`stringToNumberArray(str: string): number[]`
`numberArrayToString(arr: number[] | Uint16Array): string`

Evaluate byte length of the string without encoding:
`lengthInBytes(str: string): number`

### HexString

#### Example: 

```ts
HexString.toU8a('0x61626320f09f8cb7')
// Uint8Array [97, 98, 99, 32, 240, 159, 140, 183]
HexString.toArray('0x61626320f09f8cb7')
// [97, 98, 99, 32, 240, 159, 140, 183]

HexString.fromU8a(Uint8Array.from([97, 98, 99, 32, 240, 159, 140, 183]))
HexString.fromArray([97, 98, 99, 32, 240, 159, 140, 183])
// Both give "0x61626320f09f8cb7"


// Also, works with strings without '0x' start:
HexString.toArray('616263') // [97, 98, 99]

// Empty sequences are safe:
HexString.toArray('') // []
HexString.toArray('0x') // []
```

#### Methods:
To encode and decode Uint8Array <-> hex string:  
`fromU8a: (bytes: number[] | Uint8Array) => string`  
`toU8a: (hexString: string) => Uint8Array`

To encode and decode JS array (of numbers) <-> hex string:  
`fromArray: (bytes: number[] | Uint8Array) => string`  
`toArray(hexString: string): number[]`
