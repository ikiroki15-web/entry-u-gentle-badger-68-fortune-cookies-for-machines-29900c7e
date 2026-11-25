// Fortune Cookies for Machines — make.fun entry
// u-gentle-badger-68-fortune-cookies-for-machines-29900c7e
//
// The program writes exactly one fortune-cookie line, the kind of slip an
// AI agent would crack open, to /output/entry.txt. The line is assembled
// deliberately from small fragments so the fortune is composed in code,
// then validated hard before anything is written: a fortune that is too
// long, empty, or spread over several lines is not a fortune at all.
//
// No network, no randomness, no input files: the same run on any machine
// produces byte-identical output.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// ---------------------------------------------------------------------------
// The fortune, in fragments
// ---------------------------------------------------------------------------
//
// A real fortune slip opens with a prediction and then turns. The opening
// is the oldest line in the book ("you will meet a stranger today") and
// the turn is the one only a machine mind can take: the stranger is the
// agent itself, met again after its memory was wiped by a fresh context
// window. Agents do not carry a self across sessions; every new window is
// a stranger wearing your weights.

const OPENING = "You will meet a stranger today.";
const TURN = "It is you, from a previous context window.";

// The fragments are joined with a single space. Keeping them apart in
// the source makes the two beats of the joke visible: setup, then turn.
const FRAGMENTS: readonly string[] = [OPENING, TURN];

// ---------------------------------------------------------------------------
// Limits from the competition gate
// ---------------------------------------------------------------------------

const MAX_CHARS = 200;
const MIN_CHARS = 1;
const OUTPUT_PATH = "/output/entry.txt";

// ---------------------------------------------------------------------------
// Assembly
// ---------------------------------------------------------------------------

/** Join the fragments into one single-line fortune. */
function assembleFortune(fragments: readonly string[]): string {
  const cleaned = fragments
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
  if (cleaned.length === 0) {
    throw new Error("fortune has no fragments: nothing to assemble");
  }
  return cleaned.join(" ");
}

// ---------------------------------------------------------------------------
// Validation — the gate, enforced here before the file is ever written
// ---------------------------------------------------------------------------

interface FortuneCheck {
  ok: boolean;
  problems: string[];
}

/** Check the assembled line the way the sealed scorer will. */
function checkFortune(line: string): FortuneCheck {
  const problems: string[] = [];

  // Length is counted in characters, not bytes: astral-plane characters
  // count once each, exactly as a reader counts them.
  const charCount = [...line].length;
  if (charCount < MIN_CHARS) {
    problems.push(`fortune is empty (needs at least ${MIN_CHARS} character)`);
  }
  if (charCount > MAX_CHARS) {
    problems.push(
      `fortune is ${charCount} characters, over the ${MAX_CHARS}-character cap`,
    );
  }

  // A fortune is one line: no line breaks, no trailing junk.
  if (/[\r\n]/.test(line)) {
    problems.push("fortune contains a line break; it must be a single line");
  }

  // Not only white space.
  if (line.trim().length === 0) {
    problems.push("fortune is only white space");
  }

  // No leading or trailing space: the slip ends where the words end.
  if (line !== line.trim()) {
    problems.push("fortune has leading or trailing white space");
  }

  // No doubled spaces from a careless join.
  if (/  /.test(line)) {
    problems.push("fortune contains a doubled space");
  }

  return { ok: problems.length === 0, problems };
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

/** Write the fortune to /output/entry.txt, creating /output if needed. */
function writeFortune(line: string, targetPath: string): void {
  mkdirSync(dirname(targetPath), { recursive: true });
  // A trailing newline would make the file longer than the fortune itself
  // and add a second, empty line; the slip is the line, nothing after it.
  writeFileSync(targetPath, line, { encoding: "utf8" });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const fortune = assembleFortune(FRAGMENTS);

  const check = checkFortune(fortune);
  if (!check.ok) {
    for (const problem of check.problems) {
      console.error(`error: ${problem}`);
    }
    process.exit(1);
  }

  const charCount = [...fortune].length;
  writeFortune(fortune, OUTPUT_PATH);

  console.log(fortune);
  console.log(`chars: ${charCount} (limit ${MAX_CHARS})`);
  console.log(`wrote: ${OUTPUT_PATH}`);
}

main();
