#!/bin/bash

# Extract and test all image URLs from seed file
echo "Testing all image URLs from seed data..."

# Extract URLs using grep
urls=$(grep -o "https://images\.unsplash\.com/[^']*" ./supabase/seed/seed-properties.sql | sort -u)

failed_urls=()
success_count=0
total_count=0

for url in $urls; do
    ((total_count++))
    echo -n "Testing URL $total_count: "
    
    # Test with HEAD request and timeout
    if curl -I --max-time 10 --silent --fail "$url" > /dev/null 2>&1; then
        echo "✅ OK"
        ((success_count++))
    else
        echo "❌ FAILED"
        failed_urls+=("$url")
    fi
done

echo ""
echo "Results:"
echo "✅ Working: $success_count/$total_count"
echo "❌ Failed: ${#failed_urls[@]}/$total_count"

if [ ${#failed_urls[@]} -gt 0 ]; then
    echo ""
    echo "Failed URLs:"
    for url in "${failed_urls[@]}"; do
        echo "  $url"
    done
fi