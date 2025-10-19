# Code Cleanup Execution Plan

## Files Currently In Use ✅

### HTML

- index.html ✅
- admin.html ✅

### CSS (Only 1 used)

- css/furniture-optimized.css ✅ USED

### JavaScript (Only 3 used)

- js/furniture-optimized.js ✅ USED
- js/admin.js ✅ USED
- js/storage-warning.js ✅ USED

### API Endpoints (Active)

- /api/gallery ✅
- /api/contact ✅
- /api/admin/auth ✅
- /api/admin/gallery ✅
- /api/admin/upload ✅
- /api/admin/backup ✅

### Libraries (Active)

- lib/supabase.js ✅
- lib/supabase-admin.js ✅

## Files to REMOVE ❌

### Unused CSS Files

- css/styles.css ❌
- css/furniture-landing.css ❌
- css/gallery.css ❌
- css/hero.css ❌
- css/responsive.css ❌

### Unused JavaScript Files

- js/image-item.js ❌
- js/gallery.js ❌ (replaced by furniture-optimized.js)
- js/main.js ❌
- js/furniture-landing.js ❌
- js/utils.js ❌
- js/pdf-generator.js ❌
- lib/jspdf-simple.js ❌

### Deprecated API Files

- api/admin/upload-cloudinary.js ❌ (Cloudinary deprecated)
- api/admin/cleanup-localStorage.js ❌
- api/shared/gallery-data.js ❌
- api/storage/gallery-storage.js ❌

### Utility Files (Keep for development)

- utils/generate-password.js ✅ KEEP
- generate-hash.js ✅ KEEP
- scripts/\* ✅ KEEP (optimization tools)

## Cleanup Actions

### Phase 1: Remove Unused CSS

- Delete 5 unused CSS files
- Verify only furniture-optimized.css is loaded

### Phase 2: Remove Unused JS

- Delete 7 unused JS files
- Verify functionality with remaining 3 files

### Phase 3: Remove Deprecated APIs

- Delete 4 deprecated API files
- Verify no references in active code

### Phase 4: Clean Documentation

- Archive old documentation
- Keep only essential docs

## Safety Measures

1. Create backup before deletion
2. Check for any hidden references
3. Test all functionality after cleanup
4. Keep git history for rollback
