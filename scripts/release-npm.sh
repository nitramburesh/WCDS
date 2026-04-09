#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

BUMP="${1:-patch}"
YES_FLAG="${2:-}"

if [[ "$BUMP" == "--yes" ]]; then
  YES_FLAG="$BUMP"
  BUMP="patch"
fi

echo "📦 WCDS npm release pipeline"

echo "→ Pre-condition: checking token source files"
if ! find src/tokens -type f -name '*.tokens.json' | grep -q .; then
  echo "❌ No *.tokens.json files found under src/tokens/."
  exit 1
fi

echo "→ Step 1: token transformation"
pnpm generate-tokens

echo "→ Step 2: custom elements manifest"
pnpm manifest

echo "→ Step 3: type validation (.d.ts generation)"
pnpm exec tsc -p tsconfig.build.json

echo "→ Step 4: production build"
pnpm exec vite build

echo "→ Step 5: external dependency check (lit / @lit)"
if ! grep -Fq "/^lit(\\/|$)/" vite.config.ts || ! grep -Fq "/^@lit\\//" vite.config.ts; then
  echo "❌ vite.config.ts is missing required external regex patterns for lit-related packages."
  exit 1
fi

echo "→ Step 6: version bump"
if [[ "$BUMP" =~ ^(patch|minor|major|prerelease|prepatch|preminor|premajor)$ ]]; then
  pnpm version "$BUMP" --no-git-tag-version
elif [[ "$BUMP" =~ ^[0-9]+\.[0-9]+\.[0-9]+([-.][0-9A-Za-z.-]+)?$ ]]; then
  pnpm version "$BUMP" --no-git-tag-version
else
  echo "❌ Invalid version bump '$BUMP'."
  echo "   Use one of: patch | minor | major | prerelease | prepatch | preminor | premajor | x.y.z"
  exit 1
fi

NEW_VERSION="$(node -p "require('./package.json').version")"
echo "✅ Version updated to $NEW_VERSION"

echo "→ Step 7: publish to npm"
if [[ "$YES_FLAG" != "--yes" ]]; then
  read -r -p "Publish wcds@$NEW_VERSION to npm now? [y/N] " confirm
  if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    echo "ℹ️ Publish cancelled."
    exit 0
  fi
fi

pnpm publish

echo "🎉 Release completed for wcds@$NEW_VERSION"
