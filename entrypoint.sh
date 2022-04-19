#!/bin/sh

echo "Checking for NEXT_PUBLIC_PUBLIC_API_URL env var"
test -n "$NEXT_PUBLIC_PUBLIC_API_URL"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_API_URL#$NEXT_PUBLIC_PUBLIC_API_URL#g"

echo "Checking for NEXT_PUBLIC_FOOTER_FLAG env var"
test -n "$NEXT_PUBLIC_FOOTER_FLAG"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_PUBLIC_FOOTER_FLAG#$NEXT_PUBLIC_FOOTER_FLAG#g"

echo "Starting HashiCups Frontend"
exec "$@"
