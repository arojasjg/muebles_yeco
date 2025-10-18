<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galería Visual Mejorada - Generación Avanzada de PDF v2.0</title>
    <!-- Cache buster: <?php echo time(); ?> -->
    <style>
        /* Modern Design System Foundation */
        :root {
            /* Color Palette - Sophisticated & Accessible */
            --primary-50: #f0f9ff;
            --primary-100: #e0f2fe;
            --primary-200: #bae6fd;
            --primary-300: #7dd3fc;
            --primary-400: #38bdf8;
            --primary-500: #0ea5e9;
            --primary-600: #0284c7;
            --primary-700: #0369a1;
            --primary-800: #075985;
            --primary-900: #0c4a6e;
            
            --secondary-50: #fafafa;
            --secondary-100: #f4f4f5;
            --secondary-200: #e4e4e7;
            --secondary-300: #d4d4d8;
            --secondary-400: #a1a1aa;
            --secondary-500: #71717a;
            --secondary-600: #52525b;
            --secondary-700: #3f3f46;
            --secondary-800: #27272a;
            --secondary-900: #18181b;
            
            --accent-50: #fefce8;
            --accent-100: #fef9c3;
            --accent-200: #fef08a;
            --accent-300: #fde047;
            --accent-400: #facc15;
            --accent-500: #eab308;
            --accent-600: #ca8a04;
            --accent-700: #a16207;
            --accent-800: #854d0e;
            --accent-900: #713f12;
            
            --success-50: #f0fdf4;
            --success-500: #22c55e;
            --success-600: #16a34a;
            --success-700: #15803d;
            
            --error-50: #fef2f2;
            --error-500: #ef4444;
            --error-600: #dc2626;
            --error-700: #b91c1c;
            
            --warning-50: #fffbeb;
            --warning-500: #f59e0b;
            --warning-600: #d97706;
            --warning-700: #b45309;
            
            /* Typography Scale */
            --font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            --font-family-display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            
            --text-xs: 0.75rem;    /* 12px */
            --text-sm: 0.875rem;   /* 14px */
            --text-base: 1rem;     /* 16px */
            --text-lg: 1.125rem;   /* 18px */
            --text-xl: 1.25rem;    /* 20px */
            --text-2xl: 1.5rem;    /* 24px */
            --text-3xl: 1.875rem;  /* 30px */
            --text-4xl: 2.25rem;   /* 36px */
            --text-5xl: 3rem;      /* 48px */
            --text-6xl: 3.75rem;   /* 60px */
            
            --font-weight-light: 300;
            --font-weight-normal: 400;
            --font-weight-medium: 500;
            --font-weight-semibold: 600;
            --font-weight-bold: 700;
            --font-weight-extrabold: 800;
            
            --line-height-tight: 1.25;
            --line-height-snug: 1.375;
            --line-height-normal: 1.5;
            --line-height-relaxed: 1.625;
            --line-height-loose: 2;
            
            /* Spacing Scale */
            --space-1: 0.25rem;   /* 4px */
            --space-2: 0.5rem;     /* 8px */
            --space-3: 0.75rem;    /* 12px */
            --space-4: 1rem;       /* 16px */
            --space-5: 1.25rem;    /* 20px */
            --space-6: 1.5rem;     /* 24px */
            --space-8: 2rem;       /* 32px */
            --space-10: 2.5rem;    /* 40px */
            --space-12: 3rem;      /* 48px */
            --space-16: 4rem;      /* 64px */
            --space-20: 5rem;      /* 80px */
            --space-24: 6rem;      /* 96px */
            --space-32: 8rem;      /* 128px */
            
            /* Border Radius */
            --radius-sm: 0.375rem;  /* 6px */
            --radius-md: 0.5rem;    /* 8px */
            --radius-lg: 0.75rem;   /* 12px */
            --radius-xl: 1rem;      /* 16px */
            --radius-2xl: 1.5rem;  /* 24px */
            --radius-3xl: 2rem;     /* 32px */
            --radius-full: 9999px;
            
            /* Shadows */
            --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
            --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
            --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
            --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
            
            /* Glassmorphism */
            --glass-bg: rgba(255, 255, 255, 0.1);
            --glass-border: rgba(255, 255, 255, 0.2);
            --glass-backdrop: blur(16px);
            
            /* Transitions */
            --transition-fast: 150ms ease-out;
            --transition-normal: 300ms ease-out;
            --transition-slow: 500ms ease-out;
            --transition-bounce: 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        /* Reset & Base Styles */
        * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
        }
        
        html {
            scroll-behavior: smooth;
        }
        
        body { 
            font-family: var(--font-family-primary);
            font-size: var(--text-base);
            line-height: var(--line-height-normal);
            color: var(--secondary-900);
            background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 50%, var(--secondary-800) 100%);
            min-height: 100vh;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        /* Layout Components */
        .container { 
            max-width: 1400px; 
            margin: 0 auto; 
            padding: var(--space-6); 
        }
        
        .header { 
            text-align: center; 
            margin-bottom: var(--space-16); 
            color: white;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            border-radius: var(--radius-full);
            z-index: -1;
        }
        
        .header h1 { 
            font-family: var(--font-family-display);
            font-size: var(--text-6xl);
            font-weight: var(--font-weight-extrabold);
            margin-bottom: var(--space-4);
            background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 4px 8px rgba(0,0,0,0.3);
            letter-spacing: -0.02em;
        }
        
        .header p { 
            font-size: var(--text-xl);
            font-weight: var(--font-weight-medium);
            opacity: 0.9;
            color: var(--primary-100);
            max-width: 600px;
            margin: 0 auto;
            line-height: var(--line-height-relaxed);
        }
        
        .pdf-options {
            background: rgba(255,255,255,0.95);
            color: #333;
            padding: 25px;
            border-radius: 15px;
            margin: 20px auto;
            max-width: 1200px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            backdrop-filter: blur(10px);
        }
        .pdf-options h3 { 
            margin-bottom: 20px; 
            font-size: 1.5rem;
            text-align: center;
            color: #333;
        }
        
        .options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
        }
        
        .option-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border: 1px solid #e9ecef;
        }
        
        .option-section h4 {
            color: #495057;
            margin-bottom: 15px;
            font-size: 1.1rem;
            border-bottom: 2px solid #dee2e6;
            padding-bottom: 8px;
        }
        
        .radio-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .radio-group label {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        
        .radio-group label:hover {
            background: rgba(0,123,255,0.1);
        }
        
        .option-group { margin: 10px 0; }
        .option-group label { 
            display: flex; 
            align-items: center; 
            gap: 8px; 
            margin: 8px 0; 
            cursor: pointer; 
            color: #495057;
            font-weight: 500;
        }
        .option-group input { margin: 0; }
        
        .option-section select {
            padding: 8px 12px;
            border: 1px solid #ced4da;
            border-radius: 6px;
            background: white;
            color: #495057;
            font-size: 14px;
            min-width: 150px;
        }
        
        /* Control Components */
        .controls { 
            display: flex; 
            gap: var(--space-4); 
            justify-content: center; 
            margin-bottom: var(--space-16); 
            flex-wrap: wrap; 
            align-items: center;
        }
        
        .btn { 
            padding: var(--space-3) var(--space-6); 
            border: none; 
            border-radius: var(--radius-xl); 
            cursor: pointer; 
            font-size: var(--text-base);
            font-weight: var(--font-weight-semibold);
            font-family: var(--font-family-primary);
            transition: all var(--transition-normal);
            box-shadow: var(--shadow-lg);
            position: relative;
            overflow: hidden;
            min-height: 48px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: var(--space-2);
        }
        
        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left var(--transition-slow);
        }
        
        .btn:hover::before {
            left: 100%;
        }
        
        .btn:hover { 
            transform: translateY(-2px) scale(1.02); 
            box-shadow: var(--shadow-2xl);
        }
        
        .btn:active {
            transform: translateY(0) scale(0.98);
        }
        
        .btn:disabled { 
            opacity: 0.6; 
            cursor: not-allowed; 
            transform: none;
            box-shadow: var(--shadow-sm);
        }
        
        .btn:disabled:hover {
            transform: none;
        }
        
        .btn-primary { 
            background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
            color: white;
            border: 1px solid var(--primary-400);
        }
        
        .btn-secondary { 
            background: linear-gradient(135deg, var(--secondary-600) 0%, var(--secondary-700) 100%);
            color: white;
            border: 1px solid var(--secondary-500);
        }
        
        .btn-accent { 
            background: linear-gradient(135deg, var(--accent-500) 0%, var(--accent-600) 100%);
            color: white;
            border: 1px solid var(--accent-400);
        }
        
        .btn-success { 
            background: linear-gradient(135deg, var(--success-500) 0%, var(--success-600) 100%);
            color: white;
            border: 1px solid var(--success-400);
        }
        
        .btn-warning { 
            background: linear-gradient(135deg, var(--warning-500) 0%, var(--warning-600) 100%);
            color: white;
            border: 1px solid var(--warning-400);
        }
        
        /* Status Components */
        .status { 
            text-align: center; 
            padding: var(--space-4) var(--space-6); 
            margin: var(--space-6) auto;
            border-radius: var(--radius-xl);
            max-width: 600px;
            font-weight: var(--font-weight-medium);
            font-size: var(--text-sm);
            backdrop-filter: var(--glass-backdrop);
            border: 1px solid var(--glass-border);
            position: relative;
            overflow: hidden;
        }
        
        .status::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, transparent, currentColor, transparent);
            opacity: 0.3;
        }
        
        .status.success { 
            background: var(--success-50); 
            color: var(--success-700); 
            border-color: var(--success-200);
        }
        
        .status.error { 
            background: var(--error-50); 
            color: var(--error-700); 
            border-color: var(--error-200);
        }
        
        .status.info { 
            background: var(--primary-50); 
            color: var(--primary-700); 
            border-color: var(--primary-200);
        }
        
        /* Gallery Components */
        .gallery { 
            display: flex; 
            flex-wrap: wrap; 
            gap: var(--space-6); 
            margin-top: var(--space-12);
            justify-content: center;
            padding: 0 var(--space-6);
        }
        
        .gallery-item { 
            background: var(--glass-bg);
            backdrop-filter: var(--glass-backdrop);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-2xl); 
            overflow: hidden; 
            box-shadow: var(--shadow-xl);
            transition: all var(--transition-normal);
            width: 320px;
            height: 240px;
            position: relative;
            flex-shrink: 0;
            cursor: pointer;
        }
        
        .gallery-item:hover { 
            transform: translateY(-8px) scale(1.03); 
            box-shadow: var(--shadow-2xl);
            border-color: var(--primary-300);
        }
        
        .gallery-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%);
            opacity: 0;
            transition: opacity var(--transition-normal);
            z-index: 1;
        }
        
        .gallery-item:hover::before {
            opacity: 1;
        }
        
        .gallery-item img { 
            width: 100%; 
            height: 100%; 
            object-fit: cover; 
            cursor: pointer;
            transition: transform var(--transition-normal);
            position: relative;
            z-index: 0;
        }
        
        .gallery-item:hover img { 
            transform: scale(1.05); 
        }
        
        .delete-btn {
            position: absolute;
            top: var(--space-3);
            right: var(--space-3);
            background: linear-gradient(135deg, var(--error-500) 0%, var(--error-600) 100%);
            color: white;
            border: none;
            border-radius: var(--radius-full);
            width: 36px;
            height: 36px;
            cursor: pointer;
            font-size: var(--text-sm);
            font-weight: var(--font-weight-bold);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all var(--transition-normal);
            opacity: 0;
            transform: scale(0.8);
            z-index: 10;
            box-shadow: var(--shadow-lg);
            backdrop-filter: var(--glass-backdrop);
        }
        
        .gallery-item:hover .delete-btn {
            opacity: 1;
            transform: scale(1);
        }
        
        .delete-btn:hover {
            background: linear-gradient(135deg, var(--error-600) 0%, var(--error-700) 100%);
            transform: scale(1.1);
            box-shadow: var(--shadow-xl);
        }
        
        .delete-btn:active {
            transform: scale(0.95);
        }
        
        
        /* Lightbox Components */
        .lightbox {
            display: none;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.95);
            backdrop-filter: blur(8px);
            z-index: 1000;
            justify-content: center;
            align-items: center;
            padding: var(--space-6);
            animation: fadeIn var(--transition-normal) ease-out;
        }
        
        .lightbox.active { 
            display: flex; 
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .lightbox-content {
            display: flex;
            max-width: 90%;
            max-height: 90%;
            background: var(--glass-bg);
            backdrop-filter: var(--glass-backdrop);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-3xl);
            overflow: hidden;
            box-shadow: var(--shadow-2xl);
            animation: slideUp var(--transition-normal) ease-out;
        }
        
        @keyframes slideUp {
            from { 
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
            to { 
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .lightbox img { 
            max-width: 60%; 
            max-height: 90%; 
            object-fit: contain;
            border-radius: var(--radius-xl);
        }
        
        .lightbox-info {
            padding: var(--space-12);
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: rgba(255, 255, 255, 0.05);
        }
        
        .lightbox-info h3 {
            margin: 0 0 var(--space-4) 0;
            font-size: var(--text-3xl);
            color: white;
            font-weight: var(--font-weight-bold);
            font-family: var(--font-family-display);
        }
        
        .lightbox-info p {
            margin: 0 0 var(--space-6) 0;
            font-size: var(--text-lg);
            color: rgba(255, 255, 255, 0.8);
            line-height: var(--line-height-relaxed);
        }
        
        .lightbox-meta {
            display: flex;
            gap: var(--space-4);
            flex-wrap: wrap;
        }
        
        .lightbox-meta .category-badge {
            background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
            color: white;
            padding: var(--space-2) var(--space-4);
            border-radius: var(--radius-full);
            font-size: var(--text-sm);
            font-weight: var(--font-weight-semibold);
            backdrop-filter: var(--glass-backdrop);
            border: 1px solid var(--primary-400);
        }
        
        .lightbox-meta .price-badge {
            background: linear-gradient(135deg, var(--success-500) 0%, var(--success-600) 100%);
            color: white;
            padding: var(--space-2) var(--space-4);
            border-radius: var(--radius-full);
            font-size: var(--text-sm);
            font-weight: var(--font-weight-bold);
            backdrop-filter: var(--glass-backdrop);
            border: 1px solid var(--success-400);
        }
        .lightbox-close {
            position: absolute;
            top: var(--space-8); 
            right: var(--space-8);
            background: var(--glass-bg);
            backdrop-filter: var(--glass-backdrop);
            border: 1px solid var(--glass-border);
            padding: var(--space-4) var(--space-6);
            border-radius: var(--radius-xl);
            cursor: pointer;
            font-size: var(--text-base);
            font-weight: var(--font-weight-semibold);
            color: white;
            transition: all var(--transition-normal);
            box-shadow: var(--shadow-lg);
        }
        
        .lightbox-close:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.05);
            box-shadow: var(--shadow-xl);
        }
        
        .hidden { display: none; }
        #file-input { display: none; }
        
        /* Login Button */
        .login-btn {
            position: fixed;
            top: var(--space-6);
            right: var(--space-6);
            background: var(--glass-bg);
            backdrop-filter: var(--glass-backdrop);
            border: 1px solid var(--glass-border);
            color: white;
            padding: var(--space-3) var(--space-6);
            border-radius: var(--radius-full);
            font-size: var(--text-sm);
            font-weight: var(--font-weight-semibold);
            cursor: pointer;
            transition: all var(--transition-normal);
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            font-family: var(--font-family-primary);
        }
        
        .login-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px) scale(1.05);
            box-shadow: var(--shadow-xl);
        }
        
        .login-btn.logged-in {
            background: linear-gradient(135deg, var(--success-500) 0%, var(--success-600) 100%);
            border-color: var(--success-400);
        }
        
        .login-btn.logged-in:hover {
            background: linear-gradient(135deg, var(--success-600) 0%, var(--success-700) 100%);
        }
        
        .admin-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            z-index: 2000;
            display: none;
            justify-content: center;
            align-items: center;
        }
        
        .admin-modal-content {
            background: white;
            padding: 40px;
            border-radius: 15px;
            text-align: center;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        
        .admin-modal h2 {
            color: #333;
            margin-bottom: 20px;
            font-size: 1.8rem;
        }
        
        .admin-modal input {
            width: 100%;
            padding: 15px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            margin-bottom: 20px;
            box-sizing: border-box;
        }
        
        .admin-modal input:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .admin-modal button {
            background: #667eea;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            margin: 0 10px;
            transition: background 0.3s ease;
        }
        
        .admin-modal button:hover {
            background: #5a6fd8;
        }
        
        .admin-modal button.cancel {
            background: #6c757d;
        }
        
        .admin-modal button.cancel:hover {
            background: #5a6268;
        }
        
        .error-message {
            color: #dc3545;
            margin-top: 10px;
            font-size: 14px;
        }
        
        .controls.disabled {
            opacity: 0.5;
            pointer-events: none;
        }
        
        .controls.disabled button {
            cursor: not-allowed;
        }
        
        .admin-panel {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.9);
            z-index: 1500;
            display: none;
            overflow-y: auto;
            padding: 20px;
        }
        
        .admin-panel-content {
            background: white;
            border-radius: 15px;
            padding: 30px;
            max-width: 1200px;
            margin: 0 auto;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        
        .admin-panel h2 {
            color: #333;
            margin-bottom: 30px;
            font-size: 2rem;
            text-align: center;
            border-bottom: 2px solid #667eea;
            padding-bottom: 15px;
        }
        
        .admin-section {
            margin-bottom: 40px;
            padding: 25px;
            background: #f8f9fa;
            border-radius: 10px;
            border: 1px solid #e9ecef;
        }
        
        .admin-section h3 {
            color: #495057;
            margin-bottom: 20px;
            font-size: 1.3rem;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #495057;
        }
        
        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 12px;
            border: 2px solid #ced4da;
            border-radius: 8px;
            font-size: 14px;
            box-sizing: border-box;
            transition: border-color 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .form-group textarea {
            resize: vertical;
            min-height: 80px;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .form-row .form-group {
            margin-bottom: 0;
        }
        
        .btn-admin {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            margin: 5px;
            transition: all 0.3s ease;
        }
        
        .btn-admin:hover {
            background: #5a6fd8;
            transform: translateY(-2px);
        }
        
        .btn-admin.danger {
            background: #dc3545;
        }
        
        .btn-admin.danger:hover {
            background: #c82333;
        }
        
        .btn-admin.success {
            background: #28a745;
        }
        
        .btn-admin.success:hover {
            background: #218838;
        }
        
        .btn-admin.secondary {
            background: #6c757d;
        }
        
        .btn-admin.secondary:hover {
            background: #5a6268;
        }
        
        .categories-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        
        .category-item {
            background: white;
            padding: 15px;
            border-radius: 8px;
            border: 2px solid #e9ecef;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .category-item.selected {
            border-color: #667eea;
            background: #f0f4ff;
        }
        
        .images-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .image-admin-item {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            border: 2px solid #e9ecef;
        }
        
        .image-admin-item img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        
        .image-admin-info {
            padding: 15px;
        }
        
        .image-admin-info h4 {
            margin: 0 0 10px 0;
            color: #333;
            font-size: 14px;
        }
        
        .image-admin-info p {
            margin: 5px 0;
            font-size: 12px;
            color: #666;
        }
        
        .close-admin {
            position: absolute;
            top: 20px;
            right: 20px;
            background: #dc3545;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
        }
        
        .close-admin:hover {
            background: #c82333;
        }
        
        .price-input {
            width: 100px !important;
        }
        
        .category-select {
            width: 200px !important;
        }
        
        .category-filter {
            background: rgba(255,255,255,0.95);
            padding: 20px;
            border-radius: 15px;
            margin: 20px auto;
            max-width: 1200px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            backdrop-filter: blur(10px);
        }
        
        .category-filter h3 {
            margin: 0 0 15px 0;
            color: #333;
            font-size: 1.2rem;
            text-align: center;
        }
        
        .category-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
            margin-bottom: 15px;
        }
        
        .category-btn {
            background: #f8f9fa;
            color: #495057;
            border: 2px solid #e9ecef;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .category-btn:hover {
            background: #e9ecef;
            border-color: #dee2e6;
        }
        
        .category-btn.active {
            background: #667eea;
            color: white;
            border-color: #667eea;
        }
        
        .category-btn.active:hover {
            background: #5a6fd8;
            border-color: #5a6fd8;
        }
        
        .category-section {
            margin-bottom: 40px;
            width: 100%;
        }
        
        .category-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            margin-bottom: 20px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }
        
        .category-header h2 {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 600;
        }
        
        .category-count {
            margin-top: 5px;
            opacity: 0.9;
            font-size: 0.9rem;
        }
        
        .carousel {
            position: relative;
            width: 100%;
            max-width: 1200px;
            margin: 20px auto;
            background: rgba(255,255,255,0.95);
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            overflow: hidden;
        }
        
        .carousel-container {
            position: relative;
            width: 100%;
            height: 300px;
            overflow: hidden;
        }
        
        .carousel-track {
            display: flex;
            transition: transform 0.5s ease;
            height: 100%;
        }
        
        .carousel-slide {
            min-width: 100%;
            height: 100%;
            position: relative;
        }
        
        .carousel-slide img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .carousel-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0,0,0,0.7));
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .carousel-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0 0 5px 0;
        }
        
        .carousel-description {
            font-size: 1rem;
            opacity: 0.9;
            margin: 0;
        }
        
        .carousel-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255,255,255,0.9);
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .carousel-nav:hover {
            background: rgba(255,255,255,1);
            transform: translateY(-50%) scale(1.1);
        }
        
        .carousel-prev {
            left: 20px;
        }
        
        .carousel-next {
            right: 20px;
        }
        
        .carousel-dots {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
        }
        
        .carousel-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255,255,255,0.5);
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .carousel-dot.active {
            background: rgba(255,255,255,1);
            transform: scale(1.2);
        }
        
        .carousel-dot:hover {
            background: rgba(255,255,255,0.8);
        }
        
        .image-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0,0,0,0.8));
            color: white;
            padding: 15px;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        }
        
        .gallery-item:hover .image-overlay {
            transform: translateY(0);
        }
        
        .image-overlay h4 {
            margin: 0 0 8px 0;
            font-size: 14px;
            font-weight: 600;
        }
        
        .image-description {
            margin: 0 0 8px 0;
            font-size: 12px;
            line-height: 1.3;
            opacity: 0.9;
        }
        
        .image-meta {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }
        
        .category-badge {
            background: rgba(102, 126, 234, 0.9);
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 500;
            margin-right: 8px;
        }
        
        .price-badge {
            background: rgba(40, 167, 69, 0.9);
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
        }
        
        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: white;
            grid-column: 1 / -1;
        }
        .empty-state h3 { font-size: 1.5rem; margin-bottom: 10px; }
        .empty-state p { opacity: 0.8; }
        
        .progress-bar {
            width: 100%;
            height: 20px;
            background: rgba(255,255,255,0.2);
            border-radius: 10px;
            overflow: hidden;
            margin: 10px 0;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #4CAF50, #45a049);
            width: 0%;
            transition: width 0.3s ease;
        }
        
        /* Responsive Design */
        @media (max-width: 1200px) {
            .gallery-item {
                width: 280px;
                height: 220px;
            }
            
            .header h1 {
                font-size: var(--text-5xl);
            }
        }
        
        @media (max-width: 768px) {
            .container {
                padding: var(--space-4);
            }
            
            .header {
                margin-bottom: var(--space-12);
            }
            
            .header h1 { 
                font-size: var(--text-4xl);
                margin-bottom: var(--space-3);
            }
            
            .header p {
                font-size: var(--text-lg);
            }
            
            .gallery { 
                padding: 0 var(--space-3);
                gap: var(--space-4);
            }
            
            .gallery-item {
                width: 100%;
                max-width: 320px;
                height: 200px;
            }
            
            .category-filter {
                margin: var(--space-3);
                padding: var(--space-4);
            }
            
            .category-buttons {
                gap: var(--space-2);
            }
            
            .category-btn {
                padding: var(--space-2) var(--space-3);
                font-size: var(--text-xs);
            }
            
            .controls { 
                flex-direction: column; 
                align-items: center;
                gap: var(--space-3);
            }
            
            .btn { 
                width: 100%; 
                max-width: 320px;
                padding: var(--space-4) var(--space-6);
            }
            
            .lightbox-content {
                flex-direction: column;
                max-width: 95%;
                max-height: 95%;
            }
            
            .lightbox img {
                max-width: 100%;
                max-height: 60%;
            }
            
            .lightbox-info {
                padding: var(--space-6);
            }
            
            .lightbox-info h3 {
                font-size: var(--text-2xl);
            }
            
            .lightbox-info p {
                font-size: var(--text-base);
            }
            
            .login-btn {
                top: var(--space-4);
                right: var(--space-4);
                padding: var(--space-2) var(--space-4);
                font-size: var(--text-xs);
            }
        }
        
        @media (max-width: 480px) {
            .header h1 {
                font-size: var(--text-3xl);
            }
            
            .header p {
                font-size: var(--text-base);
            }
            
            .gallery-item {
                width: 100%;
                max-width: 280px;
                height: 180px;
            }
            
            .category-header h2 {
                font-size: var(--text-xl);
            }
            
            .category-count {
                font-size: var(--text-sm);
            }
            
            .lightbox-info h3 {
                font-size: var(--text-xl);
            }
            
            .lightbox-info p {
                font-size: var(--text-sm);
            }
            
            .carousel-container {
                height: 200px;
            }
            
            .carousel-nav {
                width: 36px;
                height: 36px;
                font-size: var(--text-lg);
            }
            
            .carousel-prev {
                left: var(--space-3);
            }
            
            .carousel-next {
                right: var(--space-3);
            }
            
            .carousel-title {
                font-size: var(--text-lg);
            }
            
            .carousel-description {
                font-size: var(--text-sm);
            }
            
            .btn {
                padding: var(--space-3) var(--space-5);
                font-size: var(--text-sm);
            }
        }
        
        /* Accessibility Improvements */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
        
        /* Focus States for Accessibility */
        .btn:focus,
        .login-btn:focus,
        .delete-btn:focus,
        .lightbox-close:focus {
            outline: 2px solid var(--primary-500);
            outline-offset: 2px;
        }
        
        /* High Contrast Mode Support */
        @media (prefers-contrast: high) {
            :root {
                --glass-bg: rgba(255, 255, 255, 0.9);
                --glass-border: rgba(0, 0, 0, 0.3);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Galeria</h1>
        </div>
        
        
        

        <!-- Login Button -->
        <button id="login-btn" class="login-btn" onclick="toggleLogin()">
            🔐 Login
        </button>
        
        <div class="controls hidden" id="controls">
            <input type="file" id="file-input" multiple accept="image/*">
            <button class="btn btn-primary" onclick="document.getElementById('file-input').click()">
                📁 Subir Imágenes
            </button>
            <button class="btn btn-success" onclick="generateAdvancedPDF()" style="font-size: 18px; padding: 15px 30px; box-shadow: 0 0 20px rgba(40, 167, 69, 0.5);">
                📄 PDF
            </button>
            <button class="btn btn-secondary" onclick="openAdminPanel()">
                ⚙️ Panel Admin
            </button>
        </div>
        
        <!-- Admin Password Modal -->
        <div id="admin-modal" class="admin-modal">
            <div class="admin-modal-content">
                <h2>🔐 Acceso de Administrador</h2>
                <p>Ingresa la contraseña para acceder a las funciones de administración:</p>
                <input type="password" id="admin-password" placeholder="Contraseña de administrador" autocomplete="off">
                <div id="password-error" class="error-message hidden"></div>
                <div>
                    <button onclick="checkAdminPassword()">Acceder</button>
                    <button class="cancel" onclick="closeAdminModal()">Cancelar</button>
                </div>
            </div>
        </div>
        
        <!-- Admin Panel -->
        <div id="admin-panel" class="admin-panel">
            <button class="close-admin" onclick="closeAdminPanel()">✕</button>
            <div class="admin-panel-content">
                <h2>⚙️ Panel de Administración</h2>
                
                <!-- Gallery Settings -->
                <div class="admin-section">
                    <h3>📋 Configuración de la Galería</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="gallery-title">Título de la Galería</label>
                            <input type="text" id="gallery-title" placeholder="Mi Galería de Imágenes">
                        </div>
                        <div class="form-group">
                            <label for="gallery-description">Descripción</label>
                            <textarea id="gallery-description" placeholder="Descripción de la galería..."></textarea>
                        </div>
                    </div>
                    <button class="btn-admin success" onclick="saveGallerySettings()">💾 Guardar Configuración</button>
                </div>
                
                <!-- Categories Management -->
                <div class="admin-section">
                    <h3>📂 Gestión de Categorías</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="new-category">Nueva Categoría</label>
                            <input type="text" id="new-category" placeholder="Nombre de la categoría">
                        </div>
                        <div class="form-group">
                            <label>&nbsp;</label>
                            <button class="btn-admin" onclick="addCategory()">➕ Agregar Categoría</button>
                        </div>
                    </div>
                    <div id="categories-list" class="categories-list"></div>
                </div>
                
                <!-- Images Management -->
                <div class="admin-section">
                    <h3>🖼️ Gestión de Imágenes</h3>
                    <div id="images-admin-grid" class="images-grid"></div>
                </div>
            </div>
        </div>
        
        <div id="status" class="status hidden"></div>
        
        <div id="progress-container" class="hidden">
            <div class="progress-bar">
                <div id="progress-fill" class="progress-fill"></div>
            </div>
            <p id="progress-text" style="text-align: center; color: white; margin-top: 10px;">Procesando...</p>
        </div>
        
        <!-- Carousel -->
        <div id="carousel" class="carousel hidden">
            <div class="carousel-container">
                <div id="carousel-track" class="carousel-track"></div>
                <button id="carousel-prev" class="carousel-nav carousel-prev" onclick="prevSlide()">‹</button>
                <button id="carousel-next" class="carousel-nav carousel-next" onclick="nextSlide()">›</button>
                <div id="carousel-dots" class="carousel-dots"></div>
            </div>
        </div>
        
        <!-- Category Filter -->
        <div id="category-filter" class="category-filter hidden">
            <h3>Filtrar por Categoría</h3>
            <div id="category-buttons" class="category-buttons"></div>
        </div>
        
        <div id="gallery" class="gallery">
            <div class="empty-state">
                <h3>Cargando imágenes...</h3>
                <p>Por favor espera mientras cargamos tu galería</p>
            </div>
        </div>
        
        <div id="lightbox" class="lightbox">
            <button class="lightbox-close" onclick="closeLightbox()">✕ Cerrar</button>
            <div class="lightbox-content">
                <img id="lightbox-img" src="" alt="">
                <div id="lightbox-info" class="lightbox-info">
                    <h3 id="lightbox-title"></h3>
                    <p id="lightbox-description"></p>
                    <div id="lightbox-meta" class="lightbox-meta"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Load jsPDF -->
    <script src="lib/jspdf-simple.js"></script>
    
    <script>
        let currentImages = [];
        let isAdmin = false;
        const ADMIN_PASSWORD = 'admin123'; // Change this to your desired password
        let galleryData = {
            title: 'Mi Galería de Imágenes',
            description: 'Colección de imágenes profesionales',
            categories: [],
            images: {}
        };
        let currentFilter = 'all';
        let currentSlide = 0;
        let carouselImages = [];
        
        // Gallery functionality
        function showStatus(message, type = 'info') {
            const status = document.getElementById('status');
            status.textContent = message;
            status.className = `status ${type}`;
            status.classList.remove('hidden');
            setTimeout(() => status.classList.add('hidden'), 4000);
        }
        
        function showProgress(show, progress = 0, text = 'Processing...') {
            const container = document.getElementById('progress-container');
            const fill = document.getElementById('progress-fill');
            const progressText = document.getElementById('progress-text');
            
            if (show) {
                container.classList.remove('hidden');
                fill.style.width = progress + '%';
                progressText.textContent = text;
            } else {
                container.classList.add('hidden');
            }
        }
        
        async function loadImages() {
            try {
                const response = await fetch('upload.php');
                const data = await response.json();
                
                if (data.images && data.images.length > 0) {
                    currentImages = data.images;
                    await loadGalleryData();
                    renderGallery(data.images);
                } else {
                    renderEmptyGallery();
                    showStatus('No se encontraron imágenes - sube algunas imágenes para comenzar', 'info');
                }
            } catch (error) {
                console.error('Error cargando imágenes:', error);
                renderEmptyGallery();
                showStatus('Error cargando imágenes del servidor', 'error');
            }
        }
        
        function renderGallery(images) {
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = '';
            
            // Sort images by category
            const sortedImages = sortImagesByCategory(images);
            
            // Group images by category
            const groupedImages = groupImagesByCategory(sortedImages);
            
            // Update category filter buttons
            updateCategoryFilter(groupedImages);
            
            // Render carousel
            renderCarousel(sortedImages);
            
            // Render images grouped by category
            renderGroupedImages(groupedImages);
        }
        
        function groupImagesByCategory(images) {
            const groups = {};
            
            images.forEach(image => {
                const imageData = galleryData.images[image.name] || {
                    title: 'Imagen',
                    description: '',
                    category: '',
                    price: ''
                };
                
                const category = imageData.category || 'Sin categoría';
                
                if (!groups[category]) {
                    groups[category] = [];
                }
                groups[category].push(image);
            });
            
            return groups;
        }
        
        function updateCategoryFilter(groupedImages) {
            const filterContainer = document.getElementById('category-filter');
            const buttonsContainer = document.getElementById('category-buttons');
            
            // Show filter if there are categories
            const hasCategories = Object.keys(groupedImages).some(cat => cat !== 'Sin categoría');
            if (hasCategories) {
                filterContainer.classList.remove('hidden');
            } else {
                filterContainer.classList.add('hidden');
                return;
            }
            
            buttonsContainer.innerHTML = '';
            
            // Add "All" button
            const allBtn = document.createElement('button');
            allBtn.className = `category-btn ${currentFilter === 'all' ? 'active' : ''}`;
            allBtn.textContent = 'Todas';
            allBtn.onclick = () => filterByCategory('all');
            buttonsContainer.appendChild(allBtn);
            
            // Add category buttons
            Object.keys(groupedImages).forEach(category => {
                if (category !== 'Sin categoría') {
                    const btn = document.createElement('button');
                    btn.className = `category-btn ${currentFilter === category ? 'active' : ''}`;
                    btn.textContent = category;
                    btn.onclick = () => filterByCategory(category);
                    buttonsContainer.appendChild(btn);
                }
            });
        }
        
        function renderGroupedImages(groupedImages) {
            const gallery = document.getElementById('gallery');
            
            Object.keys(groupedImages).forEach(category => {
                const images = groupedImages[category];
                
                // Skip if filtering and this category is not selected
                if (currentFilter !== 'all' && currentFilter !== category) {
                    return;
                }
                
                // Create category section
                const section = document.createElement('div');
                section.className = 'category-section';
                
                // Add category header
                const header = document.createElement('div');
                header.className = 'category-header';
                header.innerHTML = `
                    <h2>${category}</h2>
                    <div class="category-count">${images.length} imagen${images.length !== 1 ? 'es' : ''}</div>
                `;
                section.appendChild(header);
                
                // Add images grid
                const grid = document.createElement('div');
                grid.className = 'gallery';
                
                images.forEach((image, index) => {
                    const imageData = galleryData.images[image.name] || {
                        title: 'Imagen',
                        description: '',
                        category: '',
                        price: ''
                    };
                    
                    const item = document.createElement('div');
                    item.className = 'gallery-item';
                    item.innerHTML = `
                        <img src="${image.url}" alt="${imageData.title !== 'Imagen' ? imageData.title : `Imagen ${index + 1}`}" 
                             onclick="openLightbox('${image.url}', '${imageData.title !== 'Imagen' ? imageData.title : `Imagen ${index + 1}`}')"
                             onerror="this.style.display='none'"
                             onload="console.log('Imagen ${index + 1} cargada')">
                        <div class="image-overlay">
                            <h4>${imageData.title !== 'Imagen' ? imageData.title : `Imagen ${index + 1}`}</h4>
                            ${imageData.description ? `<p class="image-description">${imageData.description}</p>` : ''}
                            <div class="image-meta">
                                ${imageData.category ? `<span class="category-badge">${imageData.category}</span>` : ''}
                                ${imageData.price ? `<span class="price-badge">$${parseFloat(imageData.price).toFixed(2)}</span>` : ''}
                            </div>
                        </div>
                        <button class="delete-btn" onclick="deleteImage('${image.name}', ${index})" title="Eliminar imagen">
                            ✕
                        </button>
                    `;
                    grid.appendChild(item);
                });
                
                section.appendChild(grid);
                gallery.appendChild(section);
            });
        }
        
        function filterByCategory(category) {
            currentFilter = category;
            renderGallery(currentImages);
        }
        
        function renderCarousel(images) {
            const carousel = document.getElementById('carousel');
            const track = document.getElementById('carousel-track');
            const dots = document.getElementById('carousel-dots');
            
            if (images.length === 0) {
                carousel.classList.add('hidden');
                return;
            }
            
            carouselImages = images;
            currentSlide = 0;
            
            // Show carousel
            carousel.classList.remove('hidden');
            
            // Clear existing content
            track.innerHTML = '';
            dots.innerHTML = '';
            
            // Create slides
            images.forEach((image, index) => {
                const imageData = galleryData.images[image.name] || {
                    title: 'Imagen',
                    description: '',
                    category: '',
                    price: ''
                };
                
                const slide = document.createElement('div');
                slide.className = 'carousel-slide';
                slide.innerHTML = `
                    <img src="${image.url}" alt="${imageData.title !== 'Imagen' ? imageData.title : `Imagen ${index + 1}`}" 
                         onclick="openLightbox('${image.url}', '${imageData.title !== 'Imagen' ? imageData.title : `Imagen ${index + 1}`}')">
                    <div class="carousel-overlay">
                        <h3 class="carousel-title">${imageData.title !== 'Imagen' ? imageData.title : `Imagen ${index + 1}`}</h3>
                        <p class="carousel-description">${imageData.description || 'Sin descripción disponible'}</p>
                    </div>
                `;
                track.appendChild(slide);
                
                // Create dot
                const dot = document.createElement('button');
                dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
                dot.onclick = () => goToSlide(index);
                dots.appendChild(dot);
            });
            
            updateCarousel();
        }
        
        function updateCarousel() {
            const track = document.getElementById('carousel-track');
            const dots = document.querySelectorAll('.carousel-dot');
            
            // Update track position
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        function nextSlide() {
            if (carouselImages.length === 0) return;
            currentSlide = (currentSlide + 1) % carouselImages.length;
            updateCarousel();
        }
        
        function prevSlide() {
            if (carouselImages.length === 0) return;
            currentSlide = (currentSlide - 1 + carouselImages.length) % carouselImages.length;
            updateCarousel();
        }
        
        function goToSlide(index) {
            if (carouselImages.length === 0) return;
            currentSlide = index;
            updateCarousel();
        }
        
        // Auto-play carousel
        function startCarouselAutoPlay() {
            if (carouselImages.length > 1) {
                setInterval(() => {
                    nextSlide();
                }, 5000); // Change slide every 5 seconds
            }
        }
        
        function sortImagesByCategory(images) {
            return images.sort((a, b) => {
                const aData = galleryData.images[a.name] || { category: '' };
                const bData = galleryData.images[b.name] || { category: '' };
                
                // If both have categories, sort alphabetically by category
                if (aData.category && bData.category) {
                    return aData.category.localeCompare(bData.category);
                }
                
                // If only one has a category, prioritize it
                if (aData.category && !bData.category) {
                    return -1;
                }
                if (!aData.category && bData.category) {
                    return 1;
                }
                
                // If neither has a category, maintain original order
                return 0;
            });
        }
        
        function renderEmptyGallery() {
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = `
                <div class="empty-state">
                    <h3>Aún No Hay Imágenes</h3>
                    <p>Sube algunas imágenes para comenzar con tu galería</p>
                </div>
            `;
        }
        
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
        
        function openLightbox(src, alt) {
            // Find the image data
            const imageName = src.split('/').pop();
            const imageData = galleryData.images[imageName] || {
                title: 'Imagen',
                description: '',
                category: '',
                price: ''
            };
            
            // Update lightbox content
            document.getElementById('lightbox-img').src = src;
            document.getElementById('lightbox-img').alt = imageData.title;
            document.getElementById('lightbox-title').textContent = imageData.title !== 'Imagen' ? imageData.title : 'Imagen';
            document.getElementById('lightbox-description').textContent = imageData.description || 'Sin descripción disponible';
            
            // Update metadata
            const metaContainer = document.getElementById('lightbox-meta');
            metaContainer.innerHTML = '';
            
            if (imageData.category) {
                const categoryBadge = document.createElement('span');
                categoryBadge.className = 'category-badge';
                categoryBadge.textContent = imageData.category;
                metaContainer.appendChild(categoryBadge);
            }
            
            if (imageData.price) {
                const priceBadge = document.createElement('span');
                priceBadge.className = 'price-badge';
                priceBadge.textContent = `$${parseFloat(imageData.price).toFixed(2)}`;
                metaContainer.appendChild(priceBadge);
            }
            
            document.getElementById('lightbox').classList.add('active');
        }
        
        function closeLightbox() {
            document.getElementById('lightbox').classList.remove('active');
        }
        
        function refreshGallery() {
            showStatus('Actualizando galería...', 'info');
            loadImages();
        }
        
        // Admin authentication functions
        function toggleLogin() {
            if (isAdmin) {
                logout();
            } else {
                showLoginModal();
            }
        }
        
        function checkLoginStatus() {
            const loginTime = localStorage.getItem('adminLoginTime');
            if (loginTime) {
                const loginTimestamp = parseInt(loginTime);
                const currentTime = Date.now();
                const sixHours = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
                
                if (currentTime - loginTimestamp < sixHours) {
                    isAdmin = true;
                    enableAdminFeatures();
                    updateLoginButton();
                    return true;
                } else {
                    // Session expired
                    localStorage.removeItem('adminLoginTime');
                    isAdmin = false;
                    disableAdminFeatures();
                    updateLoginButton();
                    return false;
                }
            }
            return false;
        }
        
        function saveLoginTime() {
            localStorage.setItem('adminLoginTime', Date.now().toString());
        }
        
        function showLoginModal() {
            document.getElementById('admin-modal').style.display = 'flex';
            document.getElementById('admin-password').focus();
        }
        
        function checkAdminPassword() {
            const password = document.getElementById('admin-password').value;
            const errorDiv = document.getElementById('password-error');
            
            if (password === ADMIN_PASSWORD) {
                isAdmin = true;
                enableAdminFeatures();
                saveLoginTime();
                closeAdminModal();
                updateLoginButton();
                showStatus('Acceso de administrador concedido por 6 horas', 'success');
            } else {
                errorDiv.textContent = 'Contraseña incorrecta';
                errorDiv.classList.remove('hidden');
                document.getElementById('admin-password').value = '';
            }
        }
        
        function logout() {
            isAdmin = false;
            localStorage.removeItem('adminLoginTime');
            disableAdminFeatures();
            updateLoginButton();
            showStatus('Sesión cerrada', 'info');
        }
        
        function closeAdminModal() {
            document.getElementById('admin-modal').style.display = 'none';
            document.getElementById('admin-password').value = '';
            document.getElementById('password-error').classList.add('hidden');
        }
        
        function enableAdminFeatures() {
            const controls = document.getElementById('controls');
            controls.classList.remove('hidden');
        }
        
        function disableAdminFeatures() {
            const controls = document.getElementById('controls');
            controls.classList.add('hidden');
            isAdmin = false;
        }
        
        function updateLoginButton() {
            const loginBtn = document.getElementById('login-btn');
            if (isAdmin) {
                loginBtn.textContent = '✅ Logout';
                loginBtn.classList.add('logged-in');
            } else {
                loginBtn.textContent = '🔐 Login';
                loginBtn.classList.remove('logged-in');
            }
        }
        
        function requireAdmin() {
            if (!isAdmin) {
                showLoginModal();
                return false;
            }
            return true;
        }
        
        // Admin Panel Functions
        function openAdminPanel() {
            if (!requireAdmin()) return;
            loadGalleryData();
            document.getElementById('admin-panel').style.display = 'block';
        }
        
        function closeAdminPanel() {
            document.getElementById('admin-panel').style.display = 'none';
        }
        
        async function loadGalleryData() {
            try {
                const response = await fetch('admin.php?action=getData');
                const data = await response.json();
                if (data.success) {
                    galleryData = data.data;
                    if (typeof updateAdminPanel === 'function') {
                        updateAdminPanel();
                    }
                }
            } catch (error) {
                console.error('Error loading gallery data:', error);
            }
        }
        
        function updateAdminPanel() {
            // Update gallery settings
            document.getElementById('gallery-title').value = galleryData.title || '';
            document.getElementById('gallery-description').value = galleryData.description || '';
            
            // Update categories
            updateCategoriesList();
            
            // Update images
            updateImagesAdminGrid();
        }
        
        function updateCategoriesList() {
            const container = document.getElementById('categories-list');
            container.innerHTML = '';
            
            galleryData.categories.forEach((category, index) => {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'category-item';
                categoryDiv.innerHTML = `
                    <span>${category}</span>
                    <button class="btn-admin danger" onclick="removeCategory(${index})">🗑️</button>
                `;
                container.appendChild(categoryDiv);
            });
        }
        
        function updateImagesAdminGrid() {
            const container = document.getElementById('images-admin-grid');
            container.innerHTML = '';
            
            currentImages.forEach((image, index) => {
                const imageData = galleryData.images[image.name] || {
                    title: 'Imagen',
                    description: '',
                    category: '',
                    price: ''
                };
                
                const imageDiv = document.createElement('div');
                imageDiv.className = 'image-admin-item';
                imageDiv.innerHTML = `
                    <img src="${image.url}" alt="Imagen ${j + 1}">
                    <div class="image-admin-info">
                        <h4>${imageData.title !== 'Imagen' ? imageData.title : `Imagen ${j + 1}`}</h4>
                        <p><strong>Descripción:</strong></p>
                        <textarea onchange="updateImageData('${image.name}', 'description', this.value)" 
                                  placeholder="Descripción de la imagen..." 
                                  style="width: 100%; height: 60px; font-size: 12px; padding: 5px; border: 1px solid #ddd; border-radius: 4px;">${imageData.description}</textarea>
                        <div style="margin-top: 10px; display: flex; gap: 10px; align-items: center;">
                            <label style="font-size: 12px;">Categoría:</label>
                            <select onchange="updateImageData('${image.name}', 'category', this.value)" 
                                    class="category-select" style="font-size: 12px; padding: 5px;">
                                <option value="">Sin categoría</option>
                                ${galleryData.categories.map(cat => 
                                    `<option value="${cat}" ${imageData.category === cat ? 'selected' : ''}>${cat}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div style="margin-top: 10px; display: flex; gap: 10px; align-items: center;">
                            <label style="font-size: 12px;">Precio:</label>
                            <input type="number" onchange="updateImageData('${image.name}', 'price', this.value)" 
                                   value="${imageData.price}" placeholder="0.00" step="0.01" 
                                   class="price-input" style="font-size: 12px; padding: 5px;">
                        </div>
                    </div>
                `;
                container.appendChild(imageDiv);
            });
        }
        
        async function saveGallerySettings() {
            const title = document.getElementById('gallery-title').value;
            const description = document.getElementById('gallery-description').value;
            
            galleryData.title = title;
            galleryData.description = description;
            
            try {
                const response = await fetch('admin.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Admin-Password': ADMIN_PASSWORD
                    },
                    body: JSON.stringify({
                        action: 'saveGallerySettings',
                        data: { title, description }
                    })
                });
                
                const result = await response.json();
                if (result.success) {
                    showStatus('Configuración de galería guardada', 'success');
                } else {
                    showStatus('Error guardando configuración', 'error');
                }
            } catch (error) {
                console.error('Error saving gallery settings:', error);
                showStatus('Error guardando configuración', 'error');
            }
        }
        
        async function addCategory() {
            const categoryName = document.getElementById('new-category').value.trim();
            if (!categoryName) return;
            
            if (galleryData.categories.includes(categoryName)) {
                showStatus('La categoría ya existe', 'error');
                return;
            }
            
            galleryData.categories.push(categoryName);
            document.getElementById('new-category').value = '';
            updateCategoriesList();
            updateImagesAdminGrid();
            
            try {
                const response = await fetch('admin.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Admin-Password': ADMIN_PASSWORD
                    },
                    body: JSON.stringify({
                        action: 'addCategory',
                        category: categoryName
                    })
                });
                
                const result = await response.json();
                if (result.success) {
                    showStatus(`Categoría "${categoryName}" agregada`, 'success');
                } else {
                    showStatus('Error agregando categoría', 'error');
                }
            } catch (error) {
                console.error('Error adding category:', error);
                showStatus('Error agregando categoría', 'error');
            }
        }
        
        async function removeCategory(index) {
            const category = galleryData.categories[index];
            if (!confirm(`¿Eliminar la categoría "${category}"?`)) return;
            
            galleryData.categories.splice(index, 1);
            updateCategoriesList();
            updateImagesAdminGrid();
            
            try {
                const response = await fetch('admin.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Admin-Password': ADMIN_PASSWORD
                    },
                    body: JSON.stringify({
                        action: 'removeCategory',
                        index: index
                    })
                });
                
                const result = await response.json();
                if (result.success) {
                    showStatus(`Categoría "${category}" eliminada`, 'success');
                } else {
                    showStatus('Error eliminando categoría', 'error');
                }
            } catch (error) {
                console.error('Error removing category:', error);
                showStatus('Error eliminando categoría', 'error');
            }
        }
        
        async function updateImageData(imageName, field, value) {
            if (!galleryData.images[imageName]) {
                galleryData.images[imageName] = {
                    title: 'Imagen',
                    description: '',
                    category: '',
                    price: ''
                };
            }
            
            galleryData.images[imageName][field] = value;
            
            try {
                const response = await fetch('admin.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Admin-Password': ADMIN_PASSWORD
                    },
                    body: JSON.stringify({
                        action: 'updateImageData',
                        imageName: imageName,
                        field: field,
                        value: value
                    })
                });
                
                const result = await response.json();
                if (!result.success) {
                    console.error('Error updating image data:', result.error);
                }
            } catch (error) {
                console.error('Error updating image data:', error);
            }
        }
        
        // Delete image function
        async function deleteImage(imageName, index) {
            if (!requireAdmin()) {
                return;
            }
            
            if (!confirm(`¿Estás seguro de que quieres eliminar esta imagen?`)) {
                return;
            }
            
            try {
                showStatus(`Eliminando imagen...`, 'info');
                
                const response = await fetch('upload.php', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Admin-Password': ADMIN_PASSWORD
                    },
                    body: JSON.stringify({ imageName: imageName })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showStatus(`Imagen eliminada exitosamente`, 'success');
                    // Remove from current images array
                    currentImages.splice(index, 1);
                    // Reload gallery
                    loadImages();
                } else {
                    showStatus('Error eliminando imagen: ' + (result.error || 'Error desconocido'), 'error');
                }
            } catch (error) {
                console.error('Error eliminando imagen:', error);
                showStatus('Error eliminando imagen: Error de red', 'error');
            }
        }
        
        // File upload
        document.getElementById('file-input').addEventListener('change', async function(e) {
            if (!requireAdmin()) {
                e.target.value = '';
                return;
            }
            
            const files = e.target.files;
            if (files.length === 0) return;
            
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('images[]', files[i]);
            }
            
            try {
                showStatus(`Subiendo ${files.length} imagen(es)...`, 'info');
                const response = await fetch('upload.php', {
                    method: 'POST',
                    headers: {
                        'X-Admin-Password': ADMIN_PASSWORD
                    },
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success && result.uploaded) {
                    showStatus(`${result.uploaded.length} imagen(es) subida(s) exitosamente`, 'success');
                    loadImages();
                } else {
                    showStatus('Error en la subida: ' + (result.error || 'Error desconocido'), 'error');
                }
            } catch (error) {
                console.error('Error de subida:', error);
                showStatus('Error en la subida: Error de red', 'error');
            }
            
            e.target.value = '';
        });
        
        // Text-based PDF generation (current working version)
        function generatePDF() {
            if (currentImages.length === 0) {
                showStatus('No hay imágenes para generar PDF', 'error');
                return;
            }
            
            try {
                showStatus('Generando catálogo de texto PDF...', 'info');
                
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF();
                
                // Add title page
                pdf.setFontSize(24);
                pdf.text('Image Gallery Collection', 20, 30);
                
                pdf.setFontSize(14);
                pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 50);
                pdf.text(`Total Images: ${currentImages.length}`, 20, 65);
                
                pdf.line(20, 75, 190, 75);
                
                let yPosition = 90;
                pdf.setFontSize(12);
                pdf.text('Image List:', 20, yPosition);
                yPosition += 15;
                
                pdf.setFontSize(10);
                currentImages.forEach((image, index) => {
                    if (yPosition > 270) {
                        pdf.addPage();
                        yPosition = 20;
                    }
                    
                    pdf.setFont(undefined, 'bold');
                    pdf.text(`${index + 1}.`, 20, yPosition);
                    pdf.setFont(undefined, 'normal');
                    pdf.text(`Imagen ${index + 1}`, 30, yPosition);
                    
                    yPosition += 8;
                    pdf.setFontSize(8);
                    pdf.text(`   Size: ${formatFileSize(image.size)} | Type: ${image.type}`, 30, yPosition);
                    if (image.dimensions) {
                        pdf.text(`   Dimensions: ${image.dimensions.width} x ${image.dimensions.height}px`, 30, yPosition + 5);
                        yPosition += 5;
                    }
                    
                    yPosition += 12;
                    pdf.setFontSize(10);
                });
                
                const filename = `gallery-catalog-${new Date().toISOString().split('T')[0]}.pdf`;
                pdf.save(filename);
                
                showStatus(`Catálogo de texto PDF generado exitosamente!`, 'success');
                
            } catch (error) {
                console.error('PDF generation error:', error);
                showStatus('Error en la generación de PDF: ' + error.message, 'error');
            }
        }
        
        // Enhanced Visual PDF generation with improved quality and layout
        async function generateVisualPDF() {
            if (currentImages.length === 0) {
                showStatus('No images to generate visual PDF from', 'error');
                return;
            }
            
            const pdfType = 'portfolio';
            const imagesPerPage = 2;
            
            try {
                showStatus('Generating high-quality visual PDF...', 'info');
                showProgress(true, 0, 'Initializing PDF...');
                
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF('portrait', 'mm', 'a4');
                
                // Enhanced title page with better layout
                pdf.setFontSize(28);
                pdf.setFont(undefined, 'bold');
                pdf.text('Visual Image Gallery', 105, 40, { align: 'center' });
                
                pdf.setFontSize(12);
                pdf.setFont(undefined, 'normal');
                pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 60, { align: 'center' });
                pdf.text(`Total Images: ${currentImages.length}`, 105, 75, { align: 'center' });
                pdf.text(`Layout: ${imagesPerPage} images per page`, 105, 90, { align: 'center' });
                
                // Add decorative line
                pdf.setLineWidth(0.5);
                pdf.setDrawColor(100, 100, 100);
                pdf.line(50, 100, 160, 100);
                
                let processedImages = 0;
                
                // Enhanced layout calculations
                const pageMargin = 15; // Increased margins
                const imageSpacing = 8; // Better spacing between images
                const titleSpace = 12; // Space for image titles
                const availableWidth = 210 - (2 * pageMargin); // A4 width minus margins
                const availableHeight = 297 - (2 * pageMargin) - titleSpace; // A4 height minus margins and title space
                
                // Process images in batches
                for (let i = 0; i < currentImages.length; i += imagesPerPage) {
                    const batch = currentImages.slice(i, i + imagesPerPage);
                    
                    showProgress(true, (i / currentImages.length) * 100, `Processing page ${Math.floor(i / imagesPerPage) + 2}...`);
                    
                    pdf.addPage();
                    
                    // Add page header
                    pdf.setFontSize(14);
                    pdf.setFont(undefined, 'bold');
                    pdf.text(`Page ${Math.floor(i / imagesPerPage) + 1}`, 105, 20, { align: 'center' });
                    
                    // Calculate optimal grid layout
                    const { cols, rows, imageWidth, imageHeight } = calculateOptimalLayout(
                        imagesPerPage, 
                        availableWidth, 
                        availableHeight, 
                        imageSpacing
                    );
                    
                    // Add images to page with enhanced layout
                    for (let j = 0; j < batch.length; j++) {
                        const image = batch[j];
                        const col = j % cols;
                        const row = Math.floor(j / cols);
                        
                        // Calculate position with proper centering
                        const totalGridWidth = cols * imageWidth + (cols - 1) * imageSpacing;
                        const totalGridHeight = rows * imageHeight + (rows - 1) * imageSpacing;
                        const startX = pageMargin + (availableWidth - totalGridWidth) / 2;
                        const startY = 30 + (availableHeight - totalGridHeight) / 2;
                        
                        const x = startX + col * (imageWidth + imageSpacing);
                        const y = startY + row * (imageHeight + imageSpacing);
                        
                        try {
                            // Load high-quality image
                            const imgData = await loadHighQualityImageForPDF(image.url, pdfType);
                            
                            // Add subtle border
                            pdf.setDrawColor(200, 200, 200);
                            pdf.setLineWidth(0.2);
                            pdf.rect(x - 1, y - 1, imageWidth + 2, imageHeight + 2);
                            
                            // Add image with proper aspect ratio
                            const { finalWidth, finalHeight, offsetX, offsetY } = calculateImageDimensions(
                                imgData.width, 
                                imgData.height, 
                                imageWidth, 
                                imageHeight
                            );
                            
                            pdf.addImage(
                                imgData.dataUrl, 
                                'JPEG', 
                                x + offsetX, 
                                y + offsetY, 
                                finalWidth, 
                                finalHeight,
                                undefined,
                                'FAST'
                            );
                            
                            // Add enhanced image title
                            pdf.setFontSize(7);
                            pdf.setFont(undefined, 'normal');
                            const titleText = `Imagen ${i + j + 1}`;
                            
                            // Center the title under the image
                            const titleX = x + imageWidth / 2;
                            const titleY = y + imageHeight + 8;
                            pdf.text(titleText, titleX, titleY, { align: 'center' });
                            
                            // Add image info (size, dimensions)
                            pdf.setFontSize(6);
                            pdf.setTextColor(100, 100, 100);
                            const infoText = `${formatFileSize(image.size)}`;
                            if (image.dimensions) {
                                infoText += ` • ${image.dimensions.width}×${image.dimensions.height}`;
                            }
                            pdf.text(infoText, titleX, titleY + 4, { align: 'center' });
                            pdf.setTextColor(0, 0, 0); // Reset color
                            
                        } catch (error) {
                            console.warn(`Failed to load image ${i + 1}:`, error);
                            
                            // Enhanced placeholder with better styling
                            pdf.setFillColor(245, 245, 245);
                            pdf.rect(x, y, imageWidth, imageHeight, 'F');
                            pdf.setDrawColor(200, 200, 200);
                            pdf.rect(x, y, imageWidth, imageHeight);
                            
                            // Placeholder icon
                            pdf.setFontSize(12);
                            pdf.setTextColor(150, 150, 150);
                            pdf.text('📷', x + imageWidth/2, y + imageHeight/2 - 5, { align: 'center' });
                            pdf.setFontSize(8);
                            pdf.text('Image not available', x + imageWidth/2, y + imageHeight/2 + 5, { align: 'center' });
                            pdf.setTextColor(0, 0, 0);
                        }
                        
                        processedImages++;
                        showProgress(true, (processedImages / currentImages.length) * 100, `Processed ${processedImages}/${currentImages.length} images`);
                    }
                    
                    // Add page footer
                    pdf.setFontSize(8);
                    pdf.setTextColor(100, 100, 100);
                    pdf.text(`Images ${i + 1}-${Math.min(i + imagesPerPage, currentImages.length)} of ${currentImages.length}`, 105, 285, { align: 'center' });
                    pdf.setTextColor(0, 0, 0);
                    
                    // Small delay to prevent browser freezing
                    await new Promise(resolve => setTimeout(resolve, 150));
                }
                
                showProgress(true, 100, 'Finalizando PDF...');
                
                const filename = `enhanced-gallery-${new Date().toISOString().split('T')[0]}.pdf`;
                pdf.save(filename);
                
                showProgress(false);
                showStatus(`Enhanced PDF generado con ${currentImages.length} imágenes de alta calidad!`, 'success');
                
            } catch (error) {
                console.error('Visual PDF generation error:', error);
                showProgress(false);
                showStatus('Visual PDF generation failed: ' + error.message, 'error');
            }
        }
        
        // Calculate optimal grid layout
        function calculateOptimalLayout(imagesPerPage, availableWidth, availableHeight, spacing) {
            let bestLayout = { cols: 1, rows: 1, imageWidth: 0, imageHeight: 0, efficiency: 0 };
            
            // Try different grid configurations
            for (let cols = 1; cols <= Math.min(imagesPerPage, 4); cols++) {
                const rows = Math.ceil(imagesPerPage / cols);
                
                const imageWidth = (availableWidth - (cols - 1) * spacing) / cols;
                const imageHeight = (availableHeight - (rows - 1) * spacing) / rows;
                
                // Calculate efficiency (how well we use the space)
                const efficiency = (imageWidth * imageHeight) / (availableWidth * availableHeight);
                
                if (efficiency > bestLayout.efficiency && imageWidth > 30 && imageHeight > 30) {
                    bestLayout = { cols, rows, imageWidth, imageHeight, efficiency };
                }
            }
            
            return bestLayout;
        }
        
        // Calculate image dimensions maintaining aspect ratio
        function calculateImageDimensions(imgWidth, imgHeight, maxWidth, maxHeight) {
            const imgAspectRatio = imgWidth / imgHeight;
            const maxAspectRatio = maxWidth / maxHeight;
            
            let finalWidth, finalHeight, offsetX = 0, offsetY = 0;
            
            if (imgAspectRatio > maxAspectRatio) {
                // Image is wider than container
                finalWidth = maxWidth;
                finalHeight = maxWidth / imgAspectRatio;
                offsetY = (maxHeight - finalHeight) / 2;
            } else {
                // Image is taller than container
                finalHeight = maxHeight;
                finalWidth = maxHeight * imgAspectRatio;
                offsetX = (maxWidth - finalWidth) / 2;
            }
            
            return { finalWidth, finalHeight, offsetX, offsetY };
        }
        
        // Enhanced high-quality image loader for PDF with modern async/await
        async function loadHighQualityImageForPDF(src, quality = 'thumbnails') {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                
                img.onload = function() {
                    try {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        
                        if (!ctx) {
                            reject(new Error('Could not get canvas context'));
                            return;
                        }
                        
                        // Quality settings based on PDF type
                        const qualitySettings = {
                            fullsize: { maxSize: 1200, jpegQuality: 0.9 },
                            thumbnails: { maxSize: 600, jpegQuality: 0.85 },
                            web: { maxSize: 400, jpegQuality: 0.8 }
                        };
                        
                        const { maxSize, jpegQuality } = qualitySettings[quality] || qualitySettings.web;
                        
                        let { width, height } = this;
                        const originalWidth = width;
                        const originalHeight = height;
                        
                        // Calculate optimal dimensions maintaining aspect ratio
                        const aspectRatio = width / height;
                        if (width > height) {
                            if (width > maxSize) {
                                width = maxSize;
                                height = width / aspectRatio;
                            }
                        } else {
                            if (height > maxSize) {
                                height = maxSize;
                                width = height * aspectRatio;
                            }
                        }
                        
                        canvas.width = width;
                        canvas.height = height;
                        
                        // Enable high-quality image rendering
                        ctx.imageSmoothingEnabled = true;
                        ctx.imageSmoothingQuality = 'high';
                        
                        // Draw image with anti-aliasing
                        ctx.drawImage(this, 0, 0, width, height);
                        
                        resolve({
                            dataUrl: canvas.toDataURL('image/jpeg', jpegQuality),
                            width: originalWidth,
                            height: originalHeight,
                            canvasWidth: width,
                            canvasHeight: height
                        });
                    } catch (error) {
                        reject(error);
                    }
                };
                
                img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
                img.src = src;
            });
        }
        
        // Advanced PDF generation with multiple templates and enhanced features
        async function generateAdvancedPDF() {
            if (!requireAdmin()) {
                return;
            }
            
            console.log('🚀 Generación de PDF avanzado iniciada!');
            
            if (currentImages.length === 0) {
                showStatus('No hay imágenes para generar PDF', 'error');
                return;
            }
            
            // Validate jsPDF availability
            if (typeof window.jspdf === 'undefined') {
                console.error('❌ Librería jsPDF no cargada!');
                showStatus('Error: Librería PDF no cargada. Por favor actualiza la página.', 'error');
                return;
            }
            
            // Default values (previously selected options)
            const template = 'portfolio';
            const quality = 'print';
            const imagesPerPage = 2;
            const pageSize = 'a4';
            const orientation = 'portrait';
            const includeMetadata = true;
            const addWatermark = false;
            const createTOC = false;
            const addBorders = true;
            const pdfTitle = galleryData.title || 'Mi Galería de Imágenes';
            const pdfDescription = galleryData.description || 'Colección de imágenes profesionales';
            const marginSize = 'medium';
            
            console.log('📋 PDF Options (Default):', {
                template, quality, imagesPerPage, pageSize, orientation,
                includeMetadata, addWatermark, createTOC, addBorders, marginSize,
                pdfTitle, pdfDescription
            });
            
            try {
                showStatus(`Generando PDF ${template} con calidad ${quality}...`, 'info');
                showProgress(true, 0, 'Inicializando generador de PDF avanzado...');
                
                // Initialize PDF with selected options - use simple constructor first
                let pdf;
                try {
                    const { jsPDF } = window.jspdf;
                    pdf = new jsPDF(orientation, 'mm', pageSize);
                    console.log('✅ PDF initialized successfully');
                } catch (pdfError) {
                    console.error('❌ PDF initialization failed:', pdfError);
                    // Fallback to basic PDF
                    try {
                        const { jsPDF } = window.jspdf;
                        pdf = new jsPDF();
                        console.log('✅ PDF fallback initialized successfully');
                    } catch (fallbackError) {
                        console.error('❌ PDF fallback initialization failed:', fallbackError);
                        throw new Error('Failed to initialize PDF library. Please refresh the page and try again.');
                    }
                }
                
                // Get page dimensions and margins
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const margins = getMarginSize(marginSize);
                
                console.log('📄 PDF Dimensions:', { pageWidth, pageHeight, margins });
                
                // Generate PDF with actual images based on template
                try {
                    await createAdvancedPDFWithImages(pdf, template, quality, pageWidth, pageHeight, margins, {
                        imagesPerPage, includeMetadata, addWatermark, createTOC, addBorders, pdfTitle, pdfDescription
                    });
                } catch (templateError) {
                    console.error('❌ Template generation failed:', templateError);
                    throw new Error(`Failed to generate ${template} template: ${templateError.message}`);
                }
                
                showProgress(true, 100, 'Finalizando PDF...');
                
                const filename = `advanced-${template}-${new Date().toISOString().split('T')[0]}.pdf`;
                pdf.save(filename);
                
                showProgress(false);
                showStatus(`✅ PDF ${template} avanzado generado exitosamente! Opciones aplicadas: ${imagesPerPage} imágenes/página, ${includeMetadata ? 'metadatos' : 'sin metadatos'}, ${addWatermark ? 'marca de agua' : 'sin marca de agua'}, ${createTOC ? 'TOC' : 'sin TOC'}, ${addBorders ? 'bordes' : 'sin bordes'}`, 'success');
                console.log('✅ Generación de PDF completada exitosamente!');
                
            } catch (error) {
                console.error('❌ Error en generación de PDF avanzado:', error);
                showProgress(false);
                
                // Provide more specific error messages
                let errorMessage = 'Error en generación de PDF avanzado: ';
                if (error.message.includes('Failed to initialize PDF library')) {
                    errorMessage += 'Falló la inicialización de la librería PDF. Por favor actualiza la página e intenta de nuevo.';
                } else if (error.message.includes('Template generation failed')) {
                    errorMessage += error.message;
                } else if (error.message.includes('No images')) {
                    errorMessage += 'No hay imágenes disponibles para generar PDF.';
                } else {
                    errorMessage += error.message;
                }
                
                showStatus(errorMessage, 'error');
            }
        }

        // Test function to verify advanced PDF is working
        function testAdvancedPDF() {
            console.log('🧪 Testing Advanced PDF function...');
            alert('Advanced PDF function is accessible! Check console for details.');
            
            // Test with default values
            console.log('Default values:', {
                template: 'portfolio',
                quality: 'print',
                imagesCount: currentImages.length
            });
            
            showStatus(`✅ Test passed! Template: portfolio, Quality: print`, 'success');
        }

        // Get margin size based on selection
        function getMarginSize(size) {
            switch (size) {
                case 'small': return 10;
                case 'medium': return 15;
                case 'large': return 20;
                case 'xlarge': return 25;
                default: return 15;
            }
        }

        // Create advanced PDF with actual images
        async function createAdvancedPDFWithImages(pdf, template, quality, pageWidth, pageHeight, margin, options) {
            if (!pdf || !template || !quality) {
                throw new Error('Invalid parameters for PDF generation');
            }
            
            const { imagesPerPage, includeMetadata, addWatermark, createTOC, addBorders, pdfTitle, pdfDescription } = options;
            
            // Add professional title page
            pdf.setFillColor(45, 55, 72);
            pdf.rect(0, 0, pageWidth, pageHeight, 'F');
            
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(32);
            pdf.setFont(undefined, 'bold');
            pdf.text(pdfTitle.toUpperCase(), pageWidth / 2, pageHeight / 2 - 20, { align: 'center' });
            
            pdf.setFontSize(16);
            pdf.setFont(undefined, 'normal');
            pdf.text(pdfDescription, pageWidth / 2, pageHeight / 2 + 10, { align: 'center' });
            pdf.text(`Calidad: ${quality} • Generado: ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight / 2 + 30, { align: 'center' });
            
            // Add decorative line
            pdf.setDrawColor(255, 255, 255);
            pdf.setLineWidth(1);
            pdf.line(pageWidth / 2 - 50, pageHeight / 2 + 45, pageWidth / 2 + 50, pageHeight / 2 + 45);
            
            // Generate based on template
            try {
                switch (template) {
                    case 'portfolio':
                        await generatePortfolioTemplate(pdf, pageWidth, pageHeight, margin, quality, includeMetadata, addWatermark, createTOC, addBorders, pdfTitle, pdfDescription);
                        break;
                    case 'catalog':
                        await generateCatalogTemplate(pdf, pageWidth, pageHeight, margin, imagesPerPage, quality, includeMetadata, addBorders, pdfTitle, pdfDescription);
                        break;
                    case 'contact-sheet':
                        await generateContactSheetTemplate(pdf, pageWidth, pageHeight, margin, imagesPerPage, quality, addBorders, pdfTitle, pdfDescription);
                        break;
                    case 'magazine':
                        await generateMagazineTemplate(pdf, pageWidth, pageHeight, margin, imagesPerPage, quality, includeMetadata, addBorders, pdfTitle, pdfDescription);
                        break;
                    case 'classic':
                        await generateClassicTemplate(pdf, pageWidth, pageHeight, margin, imagesPerPage, quality, includeMetadata, pdfTitle, pdfDescription);
                        break;
                    default:
                        console.warn(`Unknown template: ${template}, falling back to portfolio`);
                        await generatePortfolioTemplate(pdf, pageWidth, pageHeight, margin, quality, includeMetadata, addWatermark, createTOC, addBorders, pdfTitle, pdfDescription);
                }
            } catch (templateError) {
                console.error(`Template ${template} generation failed:`, templateError);
                throw new Error(`Failed to generate ${template} template: ${templateError.message}`);
            }
        }
        
        // Portfolio template - one image per page with professional layout
        async function generatePortfolioPages(pdf, pageWidth, pageHeight, margin, quality, includeMetadata, addWatermark, addBorders) {
            const availableWidth = pageWidth - (2 * margin);
            const availableHeight = pageHeight - (2 * margin) - 60; // Space for title and footer
            
            for (let i = 0; i < currentImages.length; i++) {
                const image = currentImages[i];
                
                showProgress(true, (i / currentImages.length) * 100, `Processing image ${i + 1}/${currentImages.length}`);
                
                pdf.addPage();
                pdf.setFillColor(255, 255, 255);
                pdf.rect(0, 0, pageWidth, pageHeight, 'F');
                
                // Add image title
                pdf.setFontSize(18);
                pdf.setFont(undefined, 'bold');
                pdf.setTextColor(45, 55, 72);
                pdf.text(`Imagen ${i + 1}`, pageWidth / 2, 30, { align: 'center' });
                
                try {
                    // Load and add image
                    const imgData = await loadImageForPDF(image.url, quality);
                    const { finalWidth, finalHeight, offsetX, offsetY } = calculateImageDimensions(
                        imgData.width, imgData.height, availableWidth, availableHeight
                    );
                    
                    const imageX = margin + offsetX;
                    const imageY = 50 + offsetY;
                    
                    // Add shadow if borders enabled
                    if (addBorders) {
                        pdf.setFillColor(0, 0, 0);
                        pdf.setGState(new pdf.GState({opacity: 0.1}));
                        pdf.rect(imageX + 3, imageY + 3, finalWidth, finalHeight, 'F');
                        pdf.setGState(new pdf.GState({opacity: 1}));
                        
                        pdf.setDrawColor(200, 200, 200);
                        pdf.setLineWidth(0.5);
                        pdf.rect(imageX - 1, imageY - 1, finalWidth + 2, finalHeight + 2);
                    }
                    
                    pdf.addImage(imgData.dataUrl, 'JPEG', imageX, imageY, finalWidth, finalHeight, undefined, 'FAST');
                    
                    // Add watermark if enabled
                    if (addWatermark) {
                        pdf.setGState(new pdf.GState({opacity: 0.05}));
                        pdf.setFontSize(60);
                        pdf.setTextColor(128, 128, 128);
                        pdf.text('PORTFOLIO', pageWidth / 2, pageHeight / 2, { align: 'center', angle: 45 });
                        pdf.setGState(new pdf.GState({opacity: 1}));
                        pdf.setTextColor(0, 0, 0);
                    }
                    
                } catch (error) {
                    console.warn(`Failed to load image ${i + 1}:`, error);
                    
                    // Add placeholder
                    const placeholderX = margin + availableWidth / 4;
                    const placeholderY = 50 + availableHeight / 4;
                    const placeholderW = availableWidth / 2;
                    const placeholderH = availableHeight / 2;
                    
                    pdf.setFillColor(248, 249, 250);
                    pdf.rect(placeholderX, placeholderY, placeholderW, placeholderH, 'F');
                    pdf.setDrawColor(220, 220, 220);
                    pdf.rect(placeholderX, placeholderY, placeholderW, placeholderH);
                    
                    pdf.setFontSize(24);
                    pdf.setTextColor(180, 180, 180);
                    pdf.text('📷', placeholderX + placeholderW/2, placeholderY + placeholderH/2, { align: 'center' });
                }
                
                // Add metadata if enabled
                if (includeMetadata) {
                    pdf.setFontSize(10);
                    pdf.setTextColor(108, 117, 125);
                    const metaY = pageHeight - 25;
                    pdf.text(`Imagen ${i + 1} | Size: ${formatFileSize(image.size)} | Page: ${i + 1}/${currentImages.length}`, pageWidth / 2, metaY, { align: 'center' });
                }
                
                pdf.setTextColor(0, 0, 0);
                
                // Small delay to prevent browser freezing
                if (i % 3 === 0) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
        }
        
        // Load image for PDF with quality control and modern error handling
        async function loadImageForPDF(src, quality = 'print') {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                
                img.onload = function() {
                    try {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        
                        if (!ctx) {
                            reject(new Error('Could not get canvas context'));
                            return;
                        }
                        
                        // Quality settings configuration
                        const qualityConfig = {
                            archive: { maxSize: 2400, jpegQuality: 0.95 },
                            print: { maxSize: 1600, jpegQuality: 0.9 },
                            web: { maxSize: 800, jpegQuality: 0.85 },
                            default: { maxSize: 1200, jpegQuality: 0.88 }
                        };
                        
                        const { maxSize, jpegQuality } = qualityConfig[quality] || qualityConfig.default;
                        
                        let { width, height } = this;
                        const originalWidth = width;
                        const originalHeight = height;
                        const aspectRatio = width / height;
                        
                        // Calculate optimal dimensions maintaining aspect ratio
                        if (width > height) {
                            if (width > maxSize) {
                                width = maxSize;
                                height = width / aspectRatio;
                            }
                        } else {
                            if (height > maxSize) {
                                height = maxSize;
                                width = height * aspectRatio;
                            }
                        }
                        
                        canvas.width = width;
                        canvas.height = height;
                        
                        // Enable high-quality rendering
                        ctx.imageSmoothingEnabled = true;
                        ctx.imageSmoothingQuality = 'high';
                        ctx.drawImage(this, 0, 0, width, height);
                        
                        resolve({
                            dataUrl: canvas.toDataURL('image/jpeg', jpegQuality),
                            width: originalWidth,
                            height: originalHeight
                        });
                    } catch (error) {
                        reject(error);
                    }
                };
                
                img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
                img.src = src;
            });
        }
        
        // Calculate image dimensions maintaining aspect ratio
        function calculateImageDimensions(imgWidth, imgHeight, maxWidth, maxHeight) {
            const imgAspectRatio = imgWidth / imgHeight;
            const maxAspectRatio = maxWidth / maxHeight;
            
            let finalWidth, finalHeight, offsetX = 0, offsetY = 0;
            
            if (imgAspectRatio > maxAspectRatio) {
                finalWidth = maxWidth;
                finalHeight = maxWidth / imgAspectRatio;
                offsetY = (maxHeight - finalHeight) / 2;
            } else {
                finalHeight = maxHeight;
                finalWidth = maxHeight * imgAspectRatio;
                offsetX = (maxWidth - finalWidth) / 2;
            }
            
            return { finalWidth, finalHeight, offsetX, offsetY };
        }

        // Portfolio Template - Professional single image per page with enhanced layout
        async function generatePortfolioTemplate(pdf, pageWidth, pageHeight, margin, quality, includeMetadata, addWatermark, createTOC, addBorders, pdfTitle, pdfDescription) {
            console.log('🎨 Portfolio Template Options:', {
                includeMetadata, addWatermark, createTOC, addBorders
            });
            const titleHeight = 40;
            const footerHeight = 25;
            const availableWidth = pageWidth - (2 * margin);
            const availableHeight = pageHeight - titleHeight - footerHeight - (2 * margin);
            
            // Enhanced title page with professional design
            pdf.setFillColor(45, 55, 72);
            pdf.rect(0, 0, pageWidth, pageHeight, 'F');
            
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(36);
            pdf.setFont(undefined, 'bold');
            pdf.text(pdfTitle.toUpperCase(), pageWidth / 2, pageHeight / 2 - 20, { align: 'center' });
            
            pdf.setFontSize(18);
            pdf.setFont(undefined, 'normal');
            pdf.text(pdfDescription, pageWidth / 2, pageHeight / 2 + 10, { align: 'center' });
            
            pdf.setFontSize(14);
            pdf.text(`${currentImages.length} Imágenes • Generado ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight / 2 + 30, { align: 'center' });
            
            // Add decorative elements
            pdf.setDrawColor(255, 255, 255);
            pdf.setLineWidth(1);
            pdf.line(pageWidth / 2 - 50, pageHeight / 2 + 45, pageWidth / 2 + 50, pageHeight / 2 + 45);
            
            // Table of Contents with enhanced design
            if (createTOC) {
                pdf.addPage();
                pdf.setFillColor(248, 249, 250);
                pdf.rect(0, 0, pageWidth, pageHeight, 'F');
                
                pdf.setTextColor(33, 37, 41);
                pdf.setFontSize(28);
                pdf.setFont(undefined, 'bold');
                pdf.text('Table of Contents', margin, 50);
                
                // Add decorative line under title
                pdf.setDrawColor(108, 117, 125);
                pdf.setLineWidth(2);
                pdf.line(margin, 60, pageWidth - margin, 60);
                
                let yPos = 80;
                pdf.setFontSize(12);
                pdf.setFont(undefined, 'normal');
                
                currentImages.forEach((image, index) => {
                    if (yPos > pageHeight - 50) {
                        pdf.addPage();
                        pdf.setFillColor(248, 249, 250);
                        pdf.rect(0, 0, pageWidth, pageHeight, 'F');
                        yPos = 50;
                    }
                    
                    const pageNum = index + 3;
                    const truncatedName = `Imagen ${index + 1}`;
                    
                    pdf.setFont(undefined, 'normal');
                    pdf.text(`${index + 1}.`, margin, yPos);
                    pdf.text(truncatedName, margin + 15, yPos);
                    
                    pdf.setFont(undefined, 'bold');
                    pdf.text(`${pageNum}`, pageWidth - margin - 10, yPos, { align: 'right' });
                    
                    // Add subtle dotted line
                    pdf.setDrawColor(200, 200, 200);
                    const textWidth = pdf.getTextWidth(`${index + 1}. ${truncatedName}`);
                    const dotsStart = margin + textWidth + 10;
                    const dotsEnd = pageWidth - margin - 25;
                    
                    for (let x = dotsStart; x < dotsEnd; x += 4) {
                        pdf.circle(x, yPos - 2, 0.3, 'F');
                    }
                    
                    yPos += 12;
                });
            }
            
            // Process each image with enhanced layout
            for (let i = 0; i < currentImages.length; i++) {
                const image = currentImages[i];
                
                showProgress(true, (i / currentImages.length) * 100, `Processing image ${i + 1}/${currentImages.length}`);
                
                pdf.addPage();
                pdf.setFillColor(255, 255, 255);
                pdf.rect(0, 0, pageWidth, pageHeight, 'F');
                
                try {
                    // Load high-quality image
                    const imgData = await loadEnhancedImageForPDF(image.url, quality);
                    
                    // Calculate optimal size maintaining aspect ratio
                    const { finalWidth, finalHeight, offsetX, offsetY } = calculateImageDimensions(
                        imgData.width, 
                        imgData.height, 
                        availableWidth, 
                        availableHeight - 40
                    );
                    
                    const imageX = margin + offsetX;
                    const imageY = titleHeight + margin + offsetY;
                    
                    // Add professional shadow effect
                    if (addBorders) {
                        pdf.setFillColor(0, 0, 0);
                        pdf.setGState(new pdf.GState({opacity: 0.1}));
                        pdf.rect(imageX + 3, imageY + 3, finalWidth, finalHeight, 'F');
                        pdf.setGState(new pdf.GState({opacity: 1}));
                        
                        // Add elegant border
                        pdf.setDrawColor(200, 200, 200);
                        pdf.setLineWidth(0.5);
                        pdf.rect(imageX - 1, imageY - 1, finalWidth + 2, finalHeight + 2);
                    }
                    
                    // Add image with high quality
                    pdf.addImage(imgData.dataUrl, 'JPEG', imageX, imageY, finalWidth, finalHeight, undefined, 'FAST');
                    
                    // Add watermark if enabled
                    if (addWatermark) {
                        pdf.setGState(new pdf.GState({opacity: 0.05}));
                        pdf.setFontSize(60);
                        pdf.setTextColor(128, 128, 128);
                        pdf.text('PORTFOLIO', pageWidth / 2, pageHeight / 2, { 
                            align: 'center', 
                            angle: 45 
                        });
                        pdf.setGState(new pdf.GState({opacity: 1}));
                        pdf.setTextColor(0, 0, 0);
                    }
                    
                } catch (error) {
                    console.warn(`Failed to load image ${i + 1}:`, error);
                    
                    // Enhanced placeholder with professional styling
                    const placeholderX = margin + availableWidth / 4;
                    const placeholderY = titleHeight + margin + availableHeight / 4;
                    const placeholderW = availableWidth / 2;
                    const placeholderH = availableHeight / 2;
                    
                    pdf.setFillColor(248, 249, 250);
                    pdf.rect(placeholderX, placeholderY, placeholderW, placeholderH, 'F');
                    pdf.setDrawColor(220, 220, 220);
                    pdf.setLineWidth(2);
                    pdf.rect(placeholderX, placeholderY, placeholderW, placeholderH);
                    
                    pdf.setFontSize(32);
                    pdf.setTextColor(180, 180, 180);
                    pdf.text('📷', placeholderX + placeholderW/2, placeholderY + placeholderH/2 - 15, { align: 'center' });
                    pdf.setFontSize(14);
                    pdf.text('Image not available', placeholderX + placeholderW/2, placeholderY + placeholderH/2 + 10, { align: 'center' });
                    pdf.setTextColor(0, 0, 0);
                }
                
                // Add elegant page number instead of image name
                pdf.setFontSize(20);
                pdf.setFont(undefined, 'bold');
                pdf.setTextColor(45, 55, 72);
                pdf.text(`Imagen ${i + 1}`, pageWidth / 2, 30, { align: 'center' });
                
                // Add enhanced image description at bottom of image
                if (includeMetadata) {
                    const imageData = galleryData.images[image.name] || {};
                    const imageBottomY = imageY + finalHeight + 10;
                    
                    pdf.setFontSize(14);
                    pdf.setTextColor(33, 37, 41);
                    
                    // Image title
                    if (imageData.title && imageData.title !== 'Imagen') {
                        pdf.setFont(undefined, 'bold');
                        pdf.text(imageData.title, margin + 5, imageBottomY);
                    }
                    
                    // Description
                    if (imageData.description) {
                        pdf.setFont(undefined, 'normal');
                        pdf.setTextColor(73, 80, 87);
                        const descriptionY = imageData.title && imageData.title !== 'Imagen' ? imageBottomY + 8 : imageBottomY;
                        pdf.text(imageData.description, margin + 5, descriptionY);
                    }
                    
                    // Category and price
                    if (imageData.category || imageData.price) {
                        pdf.setFontSize(12);
                        pdf.setTextColor(102, 126, 234);
                        let infoY = imageBottomY + 8;
                        if (imageData.title && imageData.title !== 'Imagen') infoY += 8;
                        if (imageData.description) infoY += 8;
                        
                        let infoText = '';
                        if (imageData.category) infoText += `Categoría: ${imageData.category}`;
                        if (imageData.price) {
                            if (infoText) infoText += ' • ';
                            infoText += `Precio: $${parseFloat(imageData.price).toFixed(2)}`;
                        }
                        pdf.text(infoText, margin + 5, infoY);
                    }
                }
                
                pdf.setTextColor(0, 0, 0);
                
                // Small delay to prevent browser freezing
                if (i % 3 === 0) {
                    await new Promise(resolve => setTimeout(resolve, 150));
                }
            }
        }

        // Enhanced image loader with better quality control and modern error handling
        async function loadEnhancedImageForPDF(src, quality = 'print') {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                
                img.onload = function() {
                    try {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        
                        if (!ctx) {
                            reject(new Error('Could not get canvas context'));
                            return;
                        }
                        
                        // Enhanced quality settings configuration
                        const qualitySettings = {
                            archive: { maxSize: 2400, jpegQuality: 0.95, smoothing: 'high' },
                            print: { maxSize: 1600, jpegQuality: 0.9, smoothing: 'high' },
                            web: { maxSize: 800, jpegQuality: 0.85, smoothing: 'medium' },
                            default: { maxSize: 1200, jpegQuality: 0.88, smoothing: 'high' }
                        };
                        
                        const { maxSize, jpegQuality, smoothing } = qualitySettings[quality] || qualitySettings.default;
                        
                        let { width, height } = this;
                        const originalWidth = width;
                        const originalHeight = height;
                        const aspectRatio = width / height;
                        
                        // Calculate optimal dimensions maintaining aspect ratio
                        if (width > height) {
                            if (width > maxSize) {
                                width = maxSize;
                                height = width / aspectRatio;
                            }
                        } else {
                            if (height > maxSize) {
                                height = maxSize;
                                width = height * aspectRatio;
                            }
                        }
                        
                        canvas.width = width;
                        canvas.height = height;
                        
                        // Enable maximum quality rendering
                        ctx.imageSmoothingEnabled = true;
                        ctx.imageSmoothingQuality = smoothing;
                        
                        // Apply subtle sharpening for print quality
                        if (quality === 'print' || quality === 'archive') {
                            ctx.filter = 'contrast(1.05) saturate(1.02)';
                        }
                        
                        // Draw image with enhanced quality
                        ctx.drawImage(this, 0, 0, width, height);
                        
                        resolve({
                            dataUrl: canvas.toDataURL('image/jpeg', jpegQuality),
                            width: originalWidth,
                            height: originalHeight,
                            canvasWidth: width,
                            canvasHeight: height
                        });
                    } catch (error) {
                        reject(error);
                    }
                };
                
                img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
                img.src = src;
            });
        }

        // Catalog Template - Professional grid layout with enhanced spacing
        async function generateCatalogTemplate(pdf, pageWidth, pageHeight, margin, imagesPerPage, quality, includeMetadata, addBorders, pdfTitle, pdfDescription) {
            console.log('📋 Catalog Template Options:', {
                imagesPerPage, includeMetadata, addBorders
            });
            // Add title page
            pdf.setFillColor(33, 37, 41);
            pdf.rect(0, 0, pageWidth, pageHeight, 'F');
            
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(32);
            pdf.setFont(undefined, 'bold');
            pdf.text(pdfTitle.toUpperCase(), pageWidth / 2, pageHeight / 2 - 10, { align: 'center' });
            
            pdf.setFontSize(16);
            pdf.setFont(undefined, 'normal');
            pdf.text(pdfDescription, pageWidth / 2, pageHeight / 2 + 20, { align: 'center' });
            
            const availableWidth = pageWidth - (2 * margin);
            const availableHeight = pageHeight - (2 * margin) - 30; // Space for header
            
            // Process images in batches
            for (let i = 0; i < currentImages.length; i += imagesPerPage) {
                const batch = currentImages.slice(i, i + imagesPerPage);
                
                showProgress(true, (i / currentImages.length) * 100, `Processing catalog page ${Math.floor(i / imagesPerPage) + 2}...`);
                
                pdf.addPage();
                pdf.setFillColor(255, 255, 255);
                pdf.rect(0, 0, pageWidth, pageHeight, 'F');
                
                // Add page header
                pdf.setTextColor(33, 37, 41);
                pdf.setFontSize(16);
                pdf.setFont(undefined, 'bold');
                pdf.text(`Página ${Math.floor(i / imagesPerPage) + 1}`, pageWidth / 2, 20, { align: 'center' });
                
                // Calculate enhanced grid layout
                const { cols, rows, imageWidth, imageHeight } = calculateEnhancedLayout(
                    imagesPerPage, 
                    availableWidth, 
                    availableHeight, 
                    12 // Enhanced spacing
                );
                
                // Add images with professional styling
                for (let j = 0; j < batch.length; j++) {
                    const image = batch[j];
                    const col = j % cols;
                    const row = Math.floor(j / cols);
                    
                    const totalGridWidth = cols * imageWidth + (cols - 1) * 12;
                    const totalGridHeight = rows * imageHeight + (rows - 1) * 12;
                    const startX = margin + (availableWidth - totalGridWidth) / 2;
                    const startY = 35 + (availableHeight - totalGridHeight) / 2;
                    
                    const x = startX + col * (imageWidth + 12);
                    const y = startY + row * (imageHeight + 12);
                    
                    try {
                        const imgData = await loadEnhancedImageForPDF(image.url, quality);
                        
                        // Add professional border and shadow
                        if (addBorders) {
                            pdf.setFillColor(0, 0, 0);
                            pdf.setGState(new pdf.GState({opacity: 0.1}));
                            pdf.rect(x + 2, y + 2, imageWidth, imageHeight, 'F');
                            pdf.setGState(new pdf.GState({opacity: 1}));
                            
                            pdf.setDrawColor(220, 220, 220);
                            pdf.setLineWidth(0.5);
                            pdf.rect(x - 0.5, y - 0.5, imageWidth + 1, imageHeight + 1);
                        }
                        
                        const { finalWidth, finalHeight, offsetX, offsetY } = calculateImageDimensions(
                            imgData.width, 
                            imgData.height, 
                            imageWidth, 
                            imageHeight - 15 // Space for title
                        );
                        
                        pdf.addImage(
                            imgData.dataUrl, 
                            'JPEG', 
                            x + offsetX, 
                            y + offsetY, 
                            finalWidth, 
                            finalHeight,
                            undefined,
                            'FAST'
                        );
                        
                        // Add image number instead of name
                        pdf.setFontSize(8);
                        pdf.setFont(undefined, 'bold');
                        pdf.setTextColor(33, 37, 41);
                        const imageNumber = i + j + 1;
                        
                        pdf.text(`Imagen ${imageNumber}`, x + imageWidth / 2, y + imageHeight - 8, { align: 'center' });
                        
                        // Add metadata if enabled
                        if (includeMetadata) {
                            pdf.setFontSize(6);
                            pdf.setTextColor(108, 117, 125);
                            pdf.text(formatFileSize(image.size), x + imageWidth / 2, y + imageHeight - 2, { align: 'center' });
                        }
                        
                    } catch (error) {
                        console.warn(`Failed to load image ${i + 1}:`, error);
                        
                        // Enhanced placeholder
                        pdf.setFillColor(248, 249, 250);
                        pdf.rect(x, y, imageWidth, imageHeight - 15, 'F');
                        pdf.setDrawColor(220, 220, 220);
                        pdf.rect(x, y, imageWidth, imageHeight - 15);
                        
                        pdf.setFontSize(16);
                        pdf.setTextColor(180, 180, 180);
                        pdf.text('📷', x + imageWidth/2, y + (imageHeight - 15)/2, { align: 'center' });
                    }
                    
                    pdf.setTextColor(0, 0, 0);
                }
                
                // Add page footer
                pdf.setFontSize(8);
                pdf.setTextColor(108, 117, 125);
                pdf.text(`Imágenes ${i + 1}-${Math.min(i + imagesPerPage, currentImages.length)} de ${currentImages.length}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
                
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }

        // Contact Sheet Template - Compact grid with maximum images per page
        async function generateContactSheetTemplate(pdf, pageWidth, pageHeight, margin, imagesPerPage, quality, addBorders, pdfTitle, pdfDescription) {
            console.log('📷 Contact Sheet Template Options:', {
                imagesPerPage, addBorders
            });
            // Use user-specified images per page, with fallback for contact sheet
            const optimalImagesPerPage = imagesPerPage || 25;
            
            // Add title page
            pdf.setFillColor(52, 58, 64);
            pdf.rect(0, 0, pageWidth, pageHeight, 'F');
            
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(28);
            pdf.setFont(undefined, 'bold');
            pdf.text(pdfTitle.toUpperCase(), pageWidth / 2, pageHeight / 2 - 10, { align: 'center' });
            
            pdf.setFontSize(14);
            pdf.setFont(undefined, 'normal');
            pdf.text(pdfDescription, pageWidth / 2, pageHeight / 2 + 15, { align: 'center' });
            
            const availableWidth = pageWidth - (2 * margin);
            const availableHeight = pageHeight - (2 * margin) - 25;
            
            // Process images in batches
            for (let i = 0; i < currentImages.length; i += optimalImagesPerPage) {
                const batch = currentImages.slice(i, i + optimalImagesPerPage);
                
                showProgress(true, (i / currentImages.length) * 100, `Processing contact sheet ${Math.floor(i / optimalImagesPerPage) + 2}...`);
                
                pdf.addPage();
                pdf.setFillColor(255, 255, 255);
                pdf.rect(0, 0, pageWidth, pageHeight, 'F');
                
                // Add page header
                pdf.setTextColor(52, 58, 64);
                pdf.setFontSize(14);
                pdf.setFont(undefined, 'bold');
                pdf.text(`Hoja ${Math.floor(i / optimalImagesPerPage) + 1}`, pageWidth / 2, 15, { align: 'center' });
                
                // Calculate compact grid (5x5 or similar)
                const cols = 5;
                const rows = Math.ceil(batch.length / cols);
                const imageWidth = (availableWidth - (cols - 1) * 6) / cols;
                const imageHeight = (availableHeight - (rows - 1) * 6) / rows;
                
                // Add images in compact grid
                for (let j = 0; j < batch.length; j++) {
                    const image = batch[j];
                    const col = j % cols;
                    const row = Math.floor(j / cols);
                    
                    const x = margin + col * (imageWidth + 6);
                    const y = 25 + row * (imageHeight + 6);
                    
                    try {
                        const imgData = await loadEnhancedImageForPDF(image.url, 'web'); // Use web quality for compact view
                        
                        if (addBorders) {
                            pdf.setDrawColor(200, 200, 200);
                            pdf.setLineWidth(0.3);
                            pdf.rect(x - 0.5, y - 0.5, imageWidth + 1, imageHeight + 1);
                        }
                        
                        const { finalWidth, finalHeight, offsetX, offsetY } = calculateImageDimensions(
                            imgData.width, 
                            imgData.height, 
                            imageWidth - 2, 
                            imageHeight - 8 // Space for number
                        );
                        
                        pdf.addImage(
                            imgData.dataUrl, 
                            'JPEG', 
                            x + 1 + offsetX, 
                            y + 1 + offsetY, 
                            finalWidth, 
                            finalHeight,
                            undefined,
                            'FAST'
                        );
                        
                        // Add image number
                        pdf.setFontSize(6);
                        pdf.setFont(undefined, 'bold');
                        pdf.setTextColor(255, 255, 255);
                        pdf.setFillColor(52, 58, 64);
                        pdf.rect(x + 1, y + imageHeight - 8, 12, 6, 'F');
                        pdf.text(`${i + j + 1}`, x + 7, y + imageHeight - 4, { align: 'center' });
                        
                    } catch (error) {
                        // Minimal placeholder for contact sheet
                        pdf.setFillColor(248, 249, 250);
                        pdf.rect(x, y, imageWidth, imageHeight - 8, 'F');
                        pdf.setDrawColor(220, 220, 220);
                        pdf.rect(x, y, imageWidth, imageHeight - 8);
                        
                        pdf.setFontSize(8);
                        pdf.setTextColor(180, 180, 180);
                        pdf.text('?', x + imageWidth/2, y + (imageHeight - 8)/2, { align: 'center' });
                    }
                    
                    pdf.setTextColor(0, 0, 0);
                }
                
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }

        // Magazine Template - Mixed layout with featured images
        async function generateMagazineTemplate(pdf, pageWidth, pageHeight, margin, imagesPerPage, quality, includeMetadata, addBorders, pdfTitle, pdfDescription) {
            console.log('📖 Magazine Template Options:', {
                imagesPerPage, includeMetadata, addBorders
            });
            // Add stylish title page
            pdf.setFillColor(220, 53, 69);
            pdf.rect(0, 0, pageWidth, pageHeight, 'F');
            
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(36);
            pdf.setFont(undefined, 'bold');
            pdf.text(pdfTitle.toUpperCase(), pageWidth / 2, pageHeight / 2 - 20, { align: 'center' });
            
            pdf.setFontSize(18);
            pdf.setFont(undefined, 'normal');
            pdf.text(pdfDescription, pageWidth / 2, pageHeight / 2 + 10, { align: 'center' });
            
            const availableWidth = pageWidth - (2 * margin);
            const availableHeight = pageHeight - (2 * margin) - 30;
            
            // Process images with mixed layouts using user-specified images per page
            const imagesPerBatch = imagesPerPage || 3;
            for (let i = 0; i < currentImages.length; i += imagesPerBatch) {
                const batch = currentImages.slice(i, i + imagesPerBatch);
                
                showProgress(true, (i / currentImages.length) * 100, `Creating magazine page ${Math.floor(i / imagesPerBatch) + 2}...`);
                
                pdf.addPage();
                pdf.setFillColor(255, 255, 255);
                pdf.rect(0, 0, pageWidth, pageHeight, 'F');
                
                // Add page header with style
                pdf.setTextColor(220, 53, 69);
                pdf.setFontSize(18);
                pdf.setFont(undefined, 'bold');
                pdf.text(`Página ${Math.floor(i / imagesPerBatch) + 1}`, pageWidth / 2, 20, { align: 'center' });
                
                // Create mixed layout: 1 large + 2 small images
                if (batch.length >= 1) {
                    try {
                        // Large featured image
                        const mainImage = batch[0];
                        const imgData = await loadEnhancedImageForPDF(mainImage.url, quality);
                        
                        const mainWidth = availableWidth * 0.65;
                        const mainHeight = availableHeight * 0.6;
                        
                        const { finalWidth, finalHeight, offsetX, offsetY } = calculateImageDimensions(
                            imgData.width, 
                            imgData.height, 
                            mainWidth, 
                            mainHeight
                        );
                        
                        const mainX = margin + offsetX;
                        const mainY = 35 + offsetY;
                        
                        if (addBorders) {
                            pdf.setFillColor(0, 0, 0);
                            pdf.setGState(new pdf.GState({opacity: 0.1}));
                            pdf.rect(mainX + 3, mainY + 3, finalWidth, finalHeight, 'F');
                            pdf.setGState(new pdf.GState({opacity: 1}));
                            
                            pdf.setDrawColor(220, 53, 69);
                            pdf.setLineWidth(1);
                            pdf.rect(mainX - 1, mainY - 1, finalWidth + 2, finalHeight + 2);
                        }
                        
                        pdf.addImage(imgData.dataUrl, 'JPEG', mainX, mainY, finalWidth, finalHeight, undefined, 'FAST');
                        
                        // Add title for main image
                        pdf.setFontSize(14);
                        pdf.setFont(undefined, 'bold');
                        pdf.setTextColor(33, 37, 41);
                        pdf.text(`Imagen Principal ${i + 1}`, mainX, mainY + finalHeight + 15);
                        
                        if (includeMetadata) {
                            pdf.setFontSize(10);
                            pdf.setTextColor(108, 117, 125);
                            pdf.text(`${formatFileSize(mainImage.size)} • ${mainImage.type || 'Image'}`, mainX, mainY + finalHeight + 25);
                        }
                        
                    } catch (error) {
                        console.warn(`Failed to load main image:`, error);
                    }
                }
                
                // Add smaller images on the right
                const smallImageWidth = availableWidth * 0.3;
                const smallImageHeight = availableHeight * 0.25;
                
                for (let j = 1; j < batch.length && j < 3; j++) {
                    try {
                        const smallImage = batch[j];
                        const imgData = await loadEnhancedImageForPDF(smallImage.url, quality);
                        
                        const { finalWidth, finalHeight, offsetX, offsetY } = calculateImageDimensions(
                            imgData.width, 
                            imgData.height, 
                            smallImageWidth, 
                            smallImageHeight
                        );
                        
                        const smallX = margin + availableWidth * 0.7 + offsetX;
                        const smallY = 35 + (j - 1) * (smallImageHeight + 20) + offsetY;
                        
                        if (addBorders) {
                            pdf.setDrawColor(220, 53, 69);
                            pdf.setLineWidth(0.5);
                            pdf.rect(smallX - 0.5, smallY - 0.5, finalWidth + 1, finalHeight + 1);
                        }
                        
                        pdf.addImage(imgData.dataUrl, 'JPEG', smallX, smallY, finalWidth, finalHeight, undefined, 'FAST');
                        
                        // Add small title
                        pdf.setFontSize(8);
                        pdf.setFont(undefined, 'bold');
                        pdf.setTextColor(33, 37, 41);
                        const imageNumber = i + j;
                        pdf.text(`Imagen ${imageNumber}`, smallX, smallY + finalHeight + 8);
                        
                    } catch (error) {
                        console.warn(`Failed to load small image:`, error);
                    }
                }
                
                pdf.setTextColor(0, 0, 0);
                await new Promise(resolve => setTimeout(resolve, 150));
            }
        }

        // Classic Template - Traditional text catalog with thumbnails
        async function generateClassicTemplate(pdf, pageWidth, pageHeight, margin, imagesPerPage, quality, includeMetadata, pdfTitle, pdfDescription) {
            console.log('📄 Classic Template Options:', {
                imagesPerPage, includeMetadata
            });
            // Add classic title page
            pdf.setFontSize(28);
            pdf.setFont(undefined, 'bold');
            pdf.text(pdfTitle, pageWidth / 2, 60, { align: 'center' });
            
            pdf.setFontSize(14);
            pdf.setFont(undefined, 'normal');
            pdf.text(pdfDescription, pageWidth / 2, 80, { align: 'center' });
            pdf.text(`Generado: ${new Date().toLocaleDateString()}`, pageWidth / 2, 100, { align: 'center' });
            
            pdf.setDrawColor(100, 100, 100);
            pdf.line(margin, 120, pageWidth - margin, 120);
            
            const availableWidth = pageWidth - (2 * margin);
            let yPosition = 140;
            let pageNumber = 1;
            
            // Process images with text and small thumbnails
            for (let i = 0; i < currentImages.length; i++) {
                const image = currentImages[i];
                
                showProgress(true, (i / currentImages.length) * 100, `Processing classic catalog entry ${i + 1}...`);
                
                if (yPosition > pageHeight - 60) {
                    pdf.addPage();
                    pageNumber++;
                    yPosition = 40;
                    
                    // Add page header
                    pdf.setFontSize(16);
                    pdf.setFont(undefined, 'bold');
                    pdf.text(`Catálogo - Página ${pageNumber}`, pageWidth / 2, 25, { align: 'center' });
                    pdf.line(margin, 35, pageWidth - margin, 35);
                }
                
                try {
                    // Load small thumbnail
                    const imgData = await loadEnhancedImageForPDF(image.url, 'web');
                    
                    // Add small thumbnail (40x40mm)
                    const thumbSize = 40;
                    const { finalWidth, finalHeight, offsetX, offsetY } = calculateImageDimensions(
                        imgData.width, 
                        imgData.height, 
                        thumbSize, 
                        thumbSize
                    );
                    
                    pdf.setDrawColor(200, 200, 200);
                    pdf.setLineWidth(0.3);
                    pdf.rect(margin - 0.5, yPosition - 0.5, thumbSize + 1, thumbSize + 1);
                    
                    pdf.addImage(
                        imgData.dataUrl, 
                        'JPEG', 
                        margin + offsetX, 
                        yPosition + offsetY, 
                        finalWidth, 
                        finalHeight,
                        undefined,
                        'FAST'
                    );
                    
                } catch (error) {
                    // Simple placeholder
                    pdf.setFillColor(248, 249, 250);
                    pdf.rect(margin, yPosition, 40, 40, 'F');
                    pdf.setDrawColor(200, 200, 200);
                    pdf.rect(margin, yPosition, 40, 40);
                    
                    pdf.setFontSize(12);
                    pdf.setTextColor(180, 180, 180);
                    pdf.text('📷', margin + 20, yPosition + 25, { align: 'center' });
                }
                
                // Add detailed text information
                const textX = margin + 50;
                
                pdf.setFontSize(12);
                pdf.setFont(undefined, 'bold');
                pdf.setTextColor(33, 37, 41);
                pdf.text(`${i + 1}. Imagen ${i + 1}`, textX, yPosition + 10);
                
                pdf.setFontSize(10);
                pdf.setFont(undefined, 'normal');
                pdf.setTextColor(108, 117, 125);
                
                let textY = yPosition + 20;
                pdf.text(`Tamaño: ${formatFileSize(image.size)}`, textX, textY);
                
                if (image.type) {
                    textY += 6;
                    pdf.text(`Tipo: ${image.type}`, textX, textY);
                }
                
                if (image.dimensions) {
                    textY += 6;
                    pdf.text(`Dimensiones: ${image.dimensions.width} × ${image.dimensions.height} píxeles`, textX, textY);
                    
                    textY += 6;
                    const megapixels = (image.dimensions.width * image.dimensions.height / 1000000).toFixed(1);
                    pdf.text(`Resolución: ${megapixels} MP`, textX, textY);
                }
                
                if (includeMetadata) {
                    textY += 6;
                    pdf.text(`Agregado: ${new Date().toLocaleDateString()}`, textX, textY);
                }
                
                pdf.setTextColor(0, 0, 0);
                yPosition += 50; // Space for next entry
                
                if (i % 5 === 0) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
            
            // Add page numbers to all pages
            const totalPages = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                pdf.setFontSize(8);
                pdf.setTextColor(108, 117, 125);
                pdf.text(`Página ${i} de ${totalPages}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
                pdf.text('Catálogo Clásico de Imágenes', margin, pageHeight - 10);
            }
        }

        // Enhanced layout calculator with better spacing
        function calculateEnhancedLayout(imagesPerPage, availableWidth, availableHeight, spacing) {
            let bestLayout = { cols: 1, rows: 1, imageWidth: 0, imageHeight: 0, efficiency: 0 };
            
            // Try different grid configurations with enhanced logic
            for (let cols = 1; cols <= Math.min(imagesPerPage, 6); cols++) {
                const rows = Math.ceil(imagesPerPage / cols);
                
                const imageWidth = (availableWidth - (cols - 1) * spacing) / cols;
                const imageHeight = (availableHeight - (rows - 1) * spacing) / rows;
                
                // Enhanced efficiency calculation considering aspect ratio
                const aspectRatio = imageWidth / imageHeight;
                const idealAspectRatio = 1.5; // Prefer landscape orientation
                const aspectPenalty = Math.abs(aspectRatio - idealAspectRatio) / idealAspectRatio;
                
                const efficiency = (imageWidth * imageHeight) / (availableWidth * availableHeight) * (1 - aspectPenalty * 0.2);
                
                if (efficiency > bestLayout.efficiency && imageWidth > 40 && imageHeight > 40) {
                    bestLayout = { cols, rows, imageWidth, imageHeight, efficiency };
                }
            }
            
            return bestLayout;
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                closeAdminModal();
            }
            if (e.key === 'Enter' && document.getElementById('admin-modal').style.display === 'flex') {
                checkAdminPassword();
            }
        });
        
        // Initialize
        window.addEventListener('load', function() {
            console.log('🎨 Galería Visual cargada con características de PDF Avanzado');
            checkLoginStatus();
            loadImages();
            startCarouselAutoPlay();
        });
    </script>
</body>
</html>