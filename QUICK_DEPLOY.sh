#!/bin/bash

# Quick Deploy Script for Liquidación Feature
# Principal Engineer - Muebles Yeco
# Run this script to deploy the clearance feature

echo "🔥 Liquidación Feature - Quick Deploy"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Step 1: Show what will be deployed
echo -e "${BLUE}📋 Files to be deployed:${NC}"
echo "  ✓ admin.html (category dropdowns + pricing fields)"
echo "  ✓ index.html (clearance section + navigation)"
echo "  ✓ js/furniture-optimized.js (clearance logic)"
echo "  ✓ css/furniture-optimized.css (clearance styles)"
echo "  ✓ supabase/ADD_LIQUIDACION_CATEGORY.sql (database migration)"
echo ""

# Step 2: Verify no uncommitted changes
echo -e "${BLUE}🔍 Checking git status...${NC}"
if [[ -n $(git status -s) ]]; then
    echo -e "${YELLOW}⚠️  Uncommitted changes found:${NC}"
    git status --short
    echo ""
    read -p "Continue with deployment? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Deployment cancelled."
        exit 1
    fi
fi

# Step 3: Commit changes
echo -e "${BLUE}📦 Committing changes...${NC}"
git add admin.html index.html js/furniture-optimized.js css/furniture-optimized.css
git add supabase/ADD_LIQUIDACION_CATEGORY.sql
git add LIQUIDACION_FEATURE_COMPLETE.md DEPLOY_LIQUIDACION.md LIQUIDACION_SUMMARY.txt
git commit -m "feat: Add liquidación category with pricing and special styling

- Database: New liquidacion category with pricing fields
- Frontend: Dedicated clearance section on landing page
- Admin: Category management with pricing controls
- Styling: Red gradient theme with animations
- Performance: Indexed queries and lazy loading
- Documentation: Complete implementation guide

Principal Engineer Implementation
Closes #liquidacion-feature"

echo -e "${GREEN}✓ Changes committed${NC}"
echo ""

# Step 4: Push to repository
echo -e "${BLUE}🚀 Pushing to GitHub...${NC}"
git push origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Code pushed successfully${NC}"
else
    echo "❌ Failed to push code"
    exit 1
fi
echo ""

# Step 5: Database migration instructions
echo -e "${YELLOW}⚠️  IMPORTANT: Database Migration Required${NC}"
echo ""
echo "Run the following SQL in your Supabase dashboard:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql"
echo "2. Copy the contents of: supabase/ADD_LIQUIDACION_CATEGORY.sql"
echo "3. Paste and execute"
echo "4. Verify success messages"
echo ""
echo "Or use psql:"
echo "  psql -h your-project.supabase.co -U postgres -d postgres"
echo "  \\i supabase/ADD_LIQUIDACION_CATEGORY.sql"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 6: Deployment status
echo -e "${GREEN}✅ Code Deployment Complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Run database migration (see above)"
echo "  2. Wait for Vercel auto-deploy (~2 minutes)"
echo "  3. Visit your production URL"
echo "  4. Verify clearance section appears"
echo "  5. Test admin panel functionality"
echo ""
echo "Documentation:"
echo "  📖 LIQUIDACION_FEATURE_COMPLETE.md - Full documentation"
echo "  📖 DEPLOY_LIQUIDACION.md - Deployment checklist"
echo "  📖 LIQUIDACION_SUMMARY.txt - Quick summary"
echo ""
echo "🎉 Deployment initiated successfully!"
