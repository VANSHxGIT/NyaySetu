#!/bin/bash
# ═══════════════════════════════════════════════════════════
# NyaySetu — Pre-Submission Security Audit
# Run this before every deployment / hackathon submission
# ALL checks must pass with zero findings
# ═══════════════════════════════════════════════════════════

set -euo pipefail

echo "═══════════════════════════════════════════════"
echo "  NyaySetu Security Audit"
echo "═══════════════════════════════════════════════"
echo ""

FAIL=0

# 1. Check for hardcoded secrets
echo "[1/6] Scanning for hardcoded secrets..."
if command -v detect-secrets >/dev/null 2>&1; then
    if detect-secrets scan --all-files --exclude-files '.env.example' . | grep -q '"results":\s*{'; then
        echo "  ⚠️  Potential secrets detected! Run: detect-secrets scan ."
        FAIL=1
    else
        echo "  ✅ No hardcoded secrets found"
    fi
else
    echo "  ℹ️ detect-secrets not installed, skipping"
fi

# 2. Python security static analysis
echo "[2/6] Running bandit (Python security linter)..."
if command -v bandit >/dev/null 2>&1; then
    if bandit -r app/ -ll -q 2>/dev/null; then
        echo "  ✅ Bandit passed — no security issues"
    else
        echo "  ⚠️  Bandit found issues! Run: bandit -r app/ -ll"
        FAIL=1
    fi
else
    echo "  ℹ️ bandit not installed, skipping"
fi

# 3. Dependency vulnerability scan
echo "[3/6] Running pip-audit (CVE scan)..."
if command -v pip-audit >/dev/null 2>&1; then
    if pip-audit -r requirements.txt --progress-spinner off 2>/dev/null; then
        echo "  ✅ No known vulnerabilities in dependencies"
    else
        echo "  ⚠️  Vulnerable packages found! Run: pip-audit"
        FAIL=1
    fi
else
    echo "  ℹ️ pip-audit not installed, skipping"
fi

# 4. Code quality & unused code
echo "[4/6] Running ruff (linter)..."
if command -v ruff >/dev/null 2>&1; then
    if ruff check app/ --select F401,F841,S 2>/dev/null; then
        echo "  ✅ Ruff passed — no unused imports/vars or security flags"
    else
        echo "  ⚠️  Ruff found issues! Run: ruff check app/"
        FAIL=1
    fi
else
    echo "  ℹ️ ruff not installed, skipping"
fi

# 5. Dead code detection
echo "[5/6] Running vulture (dead code finder)..."
if command -v vulture >/dev/null 2>&1; then
    if vulture app/ --min-confidence 80 2>/dev/null; then
        echo "  ✅ No dead code found"
    else
        echo "  ⚠️  Dead code detected! Run: vulture app/ --min-confidence 80"
        FAIL=1
    fi
else
    echo "  ℹ️ vulture not installed, skipping"
fi

# 6. .env not committed
echo "[6/6] Checking .env is gitignored..."
if git ls-files --error-unmatch .env 2>/dev/null; then
    echo "  🚨 CRITICAL: .env is tracked by git! Remove it immediately!"
    FAIL=1
else
    echo "  ✅ .env is properly gitignored"
fi

echo ""
echo "═══════════════════════════════════════════════"
if [ $FAIL -eq 0 ]; then
    echo "  🎉 ALL CHECKS PASSED — Ready for deployment"
else
    echo "  ❌ SOME CHECKS FAILED — Fix issues before deploying"
fi
echo "═══════════════════════════════════════════════"
exit $FAIL
