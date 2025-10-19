// Storage Warning System - Informs users about localStorage limitations

class StorageWarning {
  constructor() {
    this.warningShown = false;
    this.checkStorageReliability();
  }

  checkStorageReliability() {
    // Check if we're in incognito mode
    if (this.isIncognitoMode()) {
      this.showIncognitoWarning();
      return;
    }

    // Check storage quota
    if (navigator.storage && navigator.storage.estimate) {
      navigator.storage.estimate().then((estimate) => {
        const usagePercentage = (estimate.usage / estimate.quota) * 100;
        if (usagePercentage > 80) {
          this.showStorageQuotaWarning(usagePercentage);
        }
      });
    }

    // Show general warning about localStorage limitations
    this.showGeneralStorageWarning();
  }

  isIncognitoMode() {
    try {
      localStorage.setItem("test", "test");
      localStorage.removeItem("test");
      return false;
    } catch (e) {
      return true;
    }
  }

  showIncognitoWarning() {
    this.showWarning(
      "🔒 Modo Incógnito Detectado",
      "Las imágenes subidas no se guardarán permanentemente en modo incógnito. Para uso empresarial, use el navegador en modo normal.",
      "warning"
    );
  }

  showStorageQuotaWarning(percentage) {
    this.showWarning(
      "💾 Almacenamiento Casi Lleno",
      `El almacenamiento del navegador está al ${percentage.toFixed(
        1
      )}%. Las imágenes podrían perderse si se llena completamente.`,
      "warning"
    );
  }

  showGeneralStorageWarning() {
    // Only show once per session
    if (this.warningShown || sessionStorage.getItem("storage_warning_shown")) {
      return;
    }

    const uploadedImages = this.getStoredUploadedImages();
    if (uploadedImages.length > 0) {
      this.showWarning(
        "⚠️ Importante: Persistencia de Imágenes",
        "Las imágenes subidas se almacenan localmente en su navegador. Para uso empresarial permanente, recomendamos migrar a almacenamiento en la nube.",
        "info",
        true // Show upgrade option
      );

      sessionStorage.setItem("storage_warning_shown", "true");
      this.warningShown = true;
    }
  }

  getStoredUploadedImages() {
    try {
      const stored = localStorage.getItem("muebles_yeco_uploaded_images");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  }

  showWarning(title, message, type = "info", showUpgrade = false) {
    // Create warning modal
    const modal = document.createElement("div");
    modal.className = "storage-warning-modal";
    modal.innerHTML = `
      <div class="storage-warning-overlay">
        <div class="storage-warning-content">
          <div class="storage-warning-header ${type}">
            <h3>${title}</h3>
            <button class="storage-warning-close">&times;</button>
          </div>
          <div class="storage-warning-body">
            <p>${message}</p>
            ${
              showUpgrade
                ? `
              <div class="storage-warning-actions">
                <button class="btn btn-primary" onclick="this.showUpgradeInfo()">
                  Ver Opciones de Almacenamiento Permanente
                </button>
                <button class="btn btn-secondary" onclick="this.dismissWarning()">
                  Continuar con Almacenamiento Local
                </button>
              </div>
            `
                : `
              <div class="storage-warning-actions">
                <button class="btn btn-primary" onclick="this.dismissWarning()">
                  Entendido
                </button>
              </div>
            `
            }
          </div>
        </div>
      </div>
    `;

    // Add styles
    const styles = document.createElement("style");
    styles.textContent = `
      .storage-warning-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
      }
      .storage-warning-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .storage-warning-content {
        background: white;
        border-radius: 8px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }
      .storage-warning-header {
        padding: 20px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .storage-warning-header.warning {
        background: #fff3cd;
        color: #856404;
      }
      .storage-warning-header.info {
        background: #d1ecf1;
        color: #0c5460;
      }
      .storage-warning-header h3 {
        margin: 0;
        font-size: 18px;
      }
      .storage-warning-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
      }
      .storage-warning-body {
        padding: 20px;
      }
      .storage-warning-body p {
        margin: 0 0 20px 0;
        line-height: 1.5;
      }
      .storage-warning-actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }
      .storage-warning-actions .btn {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      }
      .storage-warning-actions .btn-primary {
        background: #007bff;
        color: white;
      }
      .storage-warning-actions .btn-secondary {
        background: #6c757d;
        color: white;
      }
    `;

    document.head.appendChild(styles);
    document.body.appendChild(modal);

    // Event listeners
    modal.querySelector(".storage-warning-close").onclick = () =>
      this.dismissWarning();
    modal.querySelector(".storage-warning-overlay").onclick = (e) => {
      if (e.target === e.currentTarget) this.dismissWarning();
    };

    // Store reference for dismissal
    this.currentModal = modal;
  }

  dismissWarning() {
    if (this.currentModal) {
      this.currentModal.remove();
      this.currentModal = null;
    }
  }

  showUpgradeInfo() {
    this.dismissWarning();

    // Show upgrade information
    this.showWarning(
      "🚀 Opciones de Almacenamiento Permanente",
      `
        <strong>Para uso empresarial, recomendamos:</strong><br><br>
        
        <strong>1. Vercel Blob Storage</strong><br>
        • Integración nativa con Vercel<br>
        • URLs permanentes<br>
        • CDN global automático<br>
        • Costo: ~$0.15/GB<br><br>
        
        <strong>2. Supabase Storage (IMPLEMENTADO)</strong><br>
        • Muy económico<br>
        • Base de datos incluida<br>
        • CDN global<br>
        • Plan gratuito hasta 1GB<br><br>
        
        <em>Contacte al desarrollador para implementar almacenamiento permanente.</em>
      `,
      "info"
    );
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new StorageWarning();
  });
} else {
  new StorageWarning();
}
