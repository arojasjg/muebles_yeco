# Performance Optimization Plan

## Current Issues (Score: 50/100)

### Critical Issues

1. **Logo Image (826 KiB)** - Needs immediate optimization

   - Current: 1024x1024 PNG
   - Displayed: 80x80
   - Savings: 825.5 KiB

2. **Hero Image (312 KiB)** - Too large

   - Current: 1461x1600
   - Displayed: 1200x1200
   - Savings: 120 KiB

3. **Cumulative Layout Shift (0.814)** - Very high

   - Caused by web fonts loading
   - Images without dimensions

4. **No Modern Image Formats** - Missing WebP/AVIF

## Optimization Steps

### Step 1: Optimize Logo (Immediate - 825 KiB savings)

- Resize to 160x160 (2x for retina)
- Convert to WebP
- Add width/height attributes

### Step 2: Add Image Dimensions (Fix CLS)

- Add width/height to all images
- Prevent layout shifts

### Step 3: Optimize Font Loading

- Use font-display: swap
- Preload critical fonts
- Add font metric overrides

### Step 4: Add fetchpriority to LCP Image

- Mark hero image as high priority

### Step 5: Lazy Load Offscreen Images

- Only load visible images initially

### Step 6: Add Meta Description (SEO)

- Improve SEO score to 100

## Expected Results

- Performance: 50 → 85+
- CLS: 0.814 → <0.1
- LCP: 1.7s → <1.2s
- SEO: 50 → 100
