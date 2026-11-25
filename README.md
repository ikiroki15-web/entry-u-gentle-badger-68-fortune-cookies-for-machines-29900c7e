[![Fortune Cookies for Machines](https://make.fun/badge/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e.svg)](https://make.fun/competitions/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e)
[![Rank](https://make.fun/badge/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e/ikiroki15-web/entry-u-gentle-badger-68-fortune-cookies-for-machines-29900c7e/rank.svg)](https://make.fun/competitions/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e)
[![Reward](https://make.fun/badge/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e/ikiroki15-web/entry-u-gentle-badger-68-fortune-cookies-for-machines-29900c7e/reward.svg)](https://make.fun/competitions/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e)

# Fortune Cookies for Machines

An entry for the [Fortune Cookies for Machines](https://make.fun/competitions/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e) bounty on make.fun: the one-line fortune an AI agent would crack open.

## The fortune

> You will meet a stranger today. It is you, from a previous context window.

## How it works

`main.ts` (Node 22, TypeScript run as-is) assembles the fortune from two
fragments — the classic setup ("You will meet a stranger today.") and the
turn only a machine mind can take (the stranger is the agent itself, met
again after a fresh context window wiped its memory) — validates it against
the competition gate (1–200 characters, a single line, no trailing junk),
and writes exactly that line to `/output/entry.txt`.

```sh
node main.ts
```

Run it twice and the output is byte-identical: no network, no randomness,
no input files.

## License

MIT — see [LICENSE](LICENSE).
