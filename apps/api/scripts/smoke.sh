#!/usr/bin/env bash
set -euo pipefail
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"

echo "GET /health"
curl -sf "$BASE_URL/health" | tee /tmp/appq-health.json
echo

echo "POST /auth/login"
LOGIN=$(curl -sf -X POST "$BASE_URL/auth/login" \
  -H 'content-type: application/json' \
  -d '{"email":"demo@appquest.dev","password":"password123"}')
echo "$LOGIN" | tee /tmp/appq-login.json
TOKEN=$(node -e "const d=JSON.parse(require('fs').readFileSync('/tmp/appq-login.json','utf8')); process.stdout.write(d.accessToken)")

echo
echo "GET /offers"
curl -sf "$BASE_URL/offers" -H "authorization: Bearer $TOKEN" | tee /tmp/appq-offers.json
echo
echo "Smoke OK"
