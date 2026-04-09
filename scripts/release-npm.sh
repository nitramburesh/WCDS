#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

BUMP="patch"
YES_FLAG=""
LOCAL_PUBLISH="false"

for arg in "$@"; do
  case "$arg" in
    --yes)
      YES_FLAG="--yes"
      ;;
    --local-publish)
      LOCAL_PUBLISH="true"
      ;;
    patch|minor|major|prerelease|prepatch|preminor|premajor)
      BUMP="$arg"
      ;;
    [0-9]*.[0-9]*.[0-9]*|[0-9]*.[0-9]*.[0-9]*-*)
      BUMP="$arg"
      ;;
    *)
      echo "❌ Unknown argument: $arg"
      echo "   Usage: ./scripts/release-npm.sh [patch|minor|major|prerelease|prepatch|preminor|premajor|x.y.z] [--yes] [--local-publish]"
      exit 1
      ;;
  esac
done

echo "📦 WCDS npm release pipeline"

if ! command -v git >/dev/null 2>&1; then
  echo "❌ git is required for release automation."
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "❌ Working tree is not clean. Commit or stash changes before releasing."
  exit 1
fi

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
  pnpm version "$BUMP"
elif [[ "$BUMP" =~ ^[0-9]+\.[0-9]+\.[0-9]+([-.][0-9A-Za-z.-]+)?$ ]]; then
  pnpm version "$BUMP"
else
  echo "❌ Invalid version bump '$BUMP'."
  echo "   Use one of: patch | minor | major | prerelease | prepatch | preminor | premajor | x.y.z"
  exit 1
fi

NEW_VERSION="$(node -p "require('./package.json').version")"
echo "✅ Version updated to $NEW_VERSION (git commit + tag created)"

if [[ "$LOCAL_PUBLISH" == "true" ]]; then
  echo "→ Step 7: publish to npm (local mode)"
  if [[ "$YES_FLAG" != "--yes" ]]; then
    read -r -p "Publish wcds@$NEW_VERSION to npm now? [y/N] " confirm
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
      echo "ℹ️ Publish cancelled."
      exit 0
    fi
  fi

  pnpm publish

  echo "→ Step 8: push release commit and tag"
  git push --follow-tags

  echo "🎉 Local publish completed for wcds@$NEW_VERSION"
else
  echo "→ Step 7: push release commit and tag (CI will publish)"
  git push --follow-tags

  echo "🎉 Release prepared for wcds@$NEW_VERSION (waiting for GitHub Actions publish job)"
fi
