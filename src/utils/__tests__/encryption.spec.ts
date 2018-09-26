import { generateKey } from "../encryption";

beforeAll(() => {
  process.env.SALT = "10";
  process.env.HASH_ALGORITHM = "sha256";
});

test("should return a Buffer from generateKey", () => {
  const expectedBuffer = Buffer.from([
    74,
    68,
    220,
    21,
    54,
    66,
    4,
    168,
    15,
    232,
    14,
    144,
    57,
    69,
    92,
    193,
    96,
    130,
    129,
    130,
    15,
    226,
    178,
    79,
    30,
    82,
    51,
    173,
    230,
    175,
    29,
    213,
  ]);

  expect(generateKey()).toEqual(expectedBuffer);
});
