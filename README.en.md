# MBDF-FLV — Multi-Book Distillation Framework

> **M**ulti-**B**ook **D**istillation **F**ramework with **F**our-**L**ayer **V**erification
> Distill N classic books (N≥3) on the same domain into executable agent skills — traceable, verifiable, evolvable, and reproducible.

## What it does

Turns a set of N books on the same domain (N≥3) into a suite of **atomic, agent-invocable skills**, with strict quality gates:

- **Multi-book cross-validation**: every distilled unit requires ≥2 *independent evidence chains* (book count ≠ independent evidence — 5 books citing the same source is 1 chain × 5 transmissions)
- **Four-layer verification + V4 compression gate**: V-REF (authority check) / V-REAL (real-world) / V-NEG (counter-example) / V-E2E (end-to-end) + semantic-invariant fidelity
- **Evidence Ledger**: every skill ships with provenance trace (L0–L4 source independence levels, author role vs evidence strength)
- **V-CONFLICT**: conflicts between books are preserved and conditionally adjudicated — not forcibly unified
- **Blind-validated evaluation protocol**: two independent evaluators, unaware of the expected answer, produce identical verdicts on the same input

## When to use

| Situation | Tool |
|---|---|
| N≥3 books on the same domain → skill suite | **MBDF-FLV (this)** |
| Single book → skill | [cangjie-skill](https://github.com/kangarooking/cangjie-skill) (RIA-TV++) |
| Distill a person's thinking style | nuwa-skill |
| Evolve any skill | darwin-skill |

Not for: single-book distillation, book summaries, reading notes, or role-playing an author.

## Architecture

```
DISCOVER → DISTILL → VERIFY
   0 domain scan      3 triple filter (V1/V2/V3/MB)   6 four-layer + V4 gate
   1 multi-book extract  4 RIA++ build                 7 Evidence Ledger
   2 candidate cluster   5 V-CONFLICT                  8 pressure test
        │                                                  │
        └──────────── FAIL → back to DISTILL; stuck ×3 → CONDITIONAL (human review)
```

- **Pure methodology**: contains no domain-specific knowledge; `evidence_hierarchy` is defined per domain (medicine ≠ software engineering ≠ film)
- **States**: VERIFIED / CONDITIONAL / REJECTED / INVALID (closed state machine)
- **SSOT**: all thresholds live only in `EVALUATION_PROTOCOL.md`

## Repository layout

```
├── SKILL.md                     # Entry point (triggers / workflow / red lines)
├── EVALUATION_PROTOCOL.md       # ★ Frozen protocol v1.1.7 (sole threshold authority)
├── AUTHOR_WEIGHT.md             # Author role (prior) ≠ evidence strength (posterior)
├── FAILURE_MODES.md             # Known failure modes DM-1 ~ DM-18
├── CONFLICT_RULES.md            # Conflict adjudication rules
├── methodology/                 # 9 stage guides (DISCOVER/DISTILL/VERIFY)
├── extractors/                  # 5 parallel extractor prompts
├── templates/                   # 6 output templates
└── validation/                  # Blind-validation record (CLOSED evidence)
```

## Validation status

**Evaluation Protocol CLOSED** — 4 rounds of blind protocol validation:
16 hidden cases × 8 independent evaluators × 128 decision points,
step-level agreement 100%, final-state agreement 100%, zero disagreement in round 4.

| Round | Protocol | Step agreement | Final agreement | P-disagreements |
|---|---|---|---|---|
| 1 | v1.1.4 | 85.7% | 50% | 4 |
| 2 | v1.1.5 | 100% | 50% | 2 |
| 3 | v1.1.6 | 96.9% | 75% | 1 |
| **4** | **v1.1.7** | **100%** | **100%** | **0** |

## Quick start

1. Read `SKILL.md` for triggers and workflow
2. Follow the three loops in `methodology/00-overview.md`
3. During verification, treat `EVALUATION_PROTOCOL.md` as the single authority
4. Fill outputs with `templates/`

## Roadmap

- v2.0: runtime monitoring / drift detection / online feedback / periodic re-distillation

## Real-world example

📚 **[AI Agent Knowledge Domain](examples/ai-agent-knowledge-domain/)** — a complete distillation of 11 AI Agent books into 16 skills:

- 5 clusters: core loops / capabilities / context / collaboration / governance (react-loop, orchestration, mcp-integration, context-engineering, guardrails, etc.)
- Each skill ships with 4 files: SKILL.md (Skill Card + RIA++ six sections) / test-prompts.json / EVIDENCE_LEDGER.md / verification report
- Full audit trail: DOMAIN_OVERVIEW / verified (screening rationale) / V-CONFLICT (adjudications) / KNOWLEDGE_GRAPH / GLOSSARY (50 terms)
- Status: all CONDITIONAL (structural verification PASS; upgrade to VERIFIED after real-project V-REAL/V-E2E testing)

## Plugins (DeepSeek Harness)

🔌 **[plugins/](plugins/)** — install the framework and distillation outputs into DSH so agents can call them natively:

| Plugin | Registers | Description |
|---|---|---|
| `dsh-distill-framework` | `mbdf-flv` methodology skill | Agents natively gain multi-book distillation capability (three loops + four-layer verification) |
| `dsh-agent-skills` | 16 AI Agent design skills | Distilled outputs registered directly, ready to use (orchestration/tools/context/governance) |

Install: build (`bash scripts/build.sh`) then assemble via dsh-super-injector or add to profile bundles. See each plugin README.

## License

MIT © 2026 LRJ347
