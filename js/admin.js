/**
 * Admin Panel JavaScript - Modern ES6+ Implementation
 * Muebles Yeco Admin System
 */

class AdminPanel {
  constructor() {
    this.token = localStorage.getItem("adminToken");
    this.currentSection = "gallery";
    this.galleryData = { images: [], videos: [] };
    this.uploadedFile = null;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.checkAuthentication();
  }

  setupEventListeners() {
    // Login form
    document.getElementById("loginForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleLogin();
    });

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
      this.handleLogout();
    });

    // Navigation
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (!e.target.classList.contains("logout-btn")) {
          this.switchSection(e.target.dataset.section);
        }
      });
    });

    // Gallery management
    document.getElementById("refreshGallery").addEventListener("click", () => {
      this.loadGallery();
    });

    document.getElementById("categoryFilter").addEventListener("change", () => {
      this.filterGallery();
    });

    document.getElementById("statusFilter").addEventListener("change", () => {
      this.filterGallery();
    });

    // File upload
    this.setupFileUpload();

    // Edit modal
    this.setupEditModal();
  }

  setupFileUpload() {
    const uploadArea = document.getElementById("uploadArea");
    const fileInput = document.getElementById("fileInput");

    // Click to select files
    uploadArea.addEventListener("click", () => {
      fileInput.click();
    });

    // File input change
    fileInput.addEventListener("change", (e) => {
      this.handleFileSelect(e.target.files);
    });

    // Drag and drop
    uploadArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      uploadArea.classList.add("dragover");
    });

    uploadArea.addEventListener("dragleave", () => {
      uploadArea.classList.remove("dragover");
    });

    uploadArea.addEventListener("drop", (e) => {
      e.preventDefault();
      uploadArea.classList.remove("dragover");
      this.handleFileSelect(e.dataTransfer.files);
    });

    // Save file details
    document.getElementById("saveFileBtn").addEventListener("click", () => {
      this.saveFileToGallery();
    });

    document.getElementById("cancelFileBtn").addEventListener("click", () => {
      this.cancelFileUpload();
    });
  }

  setupEditModal() {
    const modal = document.getElementById("editModal");
    const closeBtn = document.getElementById("closeEditModal");
    const cancelBtn = document.getElementById("cancelEdit");
    const form = document.getElementById("editForm");

    closeBtn.addEventListener("click", () => this.closeEditModal());
    cancelBtn.addEventListener("click", () => this.closeEditModal());

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.saveEdit();
    });

    // Close on backdrop click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.closeEditModal();
      }
    });
  }

  async checkAuthentication() {
    if (!this.token) {
      this.showLogin();
      return;
    }

    try {
      const response = await fetch("/api/admin/auth", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (response.ok) {
        this.showDashboard();
      } else {
        this.showLogin();
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      this.showLogin();
    }
  }

  async handleLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginBtn = document.getElementById("loginBtnText");
    const loader = document.getElementById("loginLoader");
    const status = document.getElementById("loginStatus");

    // Show loading
    loginBtn.textContent = "Iniciando sesión...";
    loader.classList.remove("hidden");
    status.style.display = "none";

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        this.token = data.token;
        localStorage.setItem("adminToken", this.token);
        this.showStatus("loginStatus", "Inicio de sesión exitoso", "success");
        setTimeout(() => this.showDashboard(), 1000);
      } else {
        this.showStatus(
          "loginStatus",
          data.error || "Error de inicio de sesión",
          "error"
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      this.showStatus("loginStatus", "Error de conexión", "error");
    } finally {
      loginBtn.textContent = "Iniciar Sesión";
      loader.classList.add("hidden");
    }
  }

  handleLogout() {
    localStorage.removeItem("adminToken");
    this.token = null;
    this.showLogin();
  }

  showLogin() {
    document.getElementById("loginScreen").classList.remove("hidden");
    document.getElementById("adminDashboard").classList.add("hidden");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }

  showDashboard() {
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("adminDashboard").classList.remove("hidden");
    this.loadGallery();
  }

  switchSection(section) {
    // Update navigation
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    document
      .querySelector(`[data-section="${section}"]`)
      .classList.add("active");

    // Update sections
    document.querySelectorAll(".admin-section").forEach((sec) => {
      sec.classList.remove("active");
    });
    document.getElementById(`${section}Section`).classList.add("active");

    this.currentSection = section;
  }

  async loadGallery() {
    try {
      const response = await fetch("/api/admin/gallery", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.galleryData = data.data;
        this.renderGallery();
        this.showStatus(
          "galleryStatus",
          `Galería cargada: ${data.data.images.length} imágenes, ${data.data.videos.length} videos`,
          "success"
        );
      } else {
        this.showStatus("galleryStatus", "Error al cargar la galería", "error");
      }
    } catch (error) {
      console.error("Gallery load error:", error);
      this.showStatus("galleryStatus", "Error de conexión", "error");
    }
  }

  renderGallery() {
    const grid = document.getElementById("galleryGrid");
    const allItems = [...this.galleryData.images, ...this.galleryData.videos];

    if (allItems.length === 0) {
      grid.innerHTML =
        '<div class="text-center" style="grid-column: 1 / -1; padding: 2rem; color: var(--text-light);">No hay elementos en la galería</div>';
      return;
    }

    grid.innerHTML = allItems
      .map(
        (item) => `
            <div class="gallery-item" data-id="${item.id}">
                ${
                  item.type === "video"
                    ? `<video class="gallery-image" controls>
                        <source src="images/${item.filename}" type="video/mp4">
                    </video>`
                    : `<img src="${
                        item.dataUrl || `images/${item.filename}`
                      }" alt="${item.title}" class="gallery-image">`
                }
                <div class="gallery-info">
                    <div class="gallery-title">${item.title}</div>
                    <div class="gallery-description">${
                      item.description || "Sin descripción"
                    }</div>
                    <div class="mb-2">
                        <span style="background: var(--accent); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">
                            ${item.category}
                        </span>
                        <span style="background: ${
                          item.isActive ? "var(--success)" : "var(--error)"
                        }; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; margin-left: 0.5rem;">
                            ${item.isActive ? "Activo" : "Inactivo"}
                        </span>
                    </div>
                    <div class="gallery-actions">
                        <button class="btn btn-primary btn-small" onclick="adminPanel.editItem('${
                          item.id
                        }')">
                            ✏️ Editar
                        </button>
                        <button class="btn btn-error btn-small" onclick="adminPanel.deleteItem('${
                          item.id
                        }')">
                            🗑️ Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }

  filterGallery() {
    const category = document.getElementById("categoryFilter").value;
    const status = document.getElementById("statusFilter").value;

    let items = [...this.galleryData.images, ...this.galleryData.videos];

    if (category) {
      items = items.filter((item) => item.category === category);
    }

    if (status !== "") {
      items = items.filter((item) => item.isActive === (status === "true"));
    }

    const grid = document.getElementById("galleryGrid");

    if (items.length === 0) {
      grid.innerHTML =
        '<div class="text-center" style="grid-column: 1 / -1; padding: 2rem; color: var(--text-light);">No se encontraron elementos con los filtros aplicados</div>';
      return;
    }

    grid.innerHTML = items
      .map(
        (item) => `
            <div class="gallery-item" data-id="${item.id}">
                ${
                  item.type === "video"
                    ? `<video class="gallery-image" controls>
                        <source src="images/${item.filename}" type="video/mp4">
                    </video>`
                    : `<img src="images/${item.filename}" alt="${item.title}" class="gallery-image">`
                }
                <div class="gallery-info">
                    <div class="gallery-title">${item.title}</div>
                    <div class="gallery-description">${
                      item.description || "Sin descripción"
                    }</div>
                    <div class="mb-2">
                        <span style="background: var(--accent); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">
                            ${item.category}
                        </span>
                        <span style="background: ${
                          item.isActive ? "var(--success)" : "var(--error)"
                        }; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; margin-left: 0.5rem;">
                            ${item.isActive ? "Activo" : "Inactivo"}
                        </span>
                    </div>
                    <div class="gallery-actions">
                        <button class="btn btn-primary btn-small" onclick="adminPanel.editItem('${
                          item.id
                        }')">
                            ✏️ Editar
                        </button>
                        <button class="btn btn-error btn-small" onclick="adminPanel.deleteItem('${
                          item.id
                        }')">
                            🗑️ Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }

  async handleFileSelect(files) {
    if (files.length === 0) return;

    const file = files[0];

    // Validate file type (images only for simple upload)
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      this.showStatus(
        "uploadStatus",
        "Tipo de archivo no válido. Use JPG, PNG o WebP",
        "error"
      );
      return;
    }

    // Validate file size (5MB for base64)
    if (file.size > 5 * 1024 * 1024) {
      this.showStatus(
        "uploadStatus",
        "El archivo es demasiado grande. Máximo 5MB",
        "error"
      );
      return;
    }

    this.showStatus("uploadStatus", "Procesando archivo...", "info");

    try {
      // Convert file to base64
      const fileData = await this.fileToBase64(file);

      const response = await fetch("/api/admin/upload-simple", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          fileData: fileData,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        this.uploadedFile = data.data;
        this.showFileDetailsForm();
        this.showStatus(
          "uploadStatus",
          "Archivo procesado exitosamente. Complete los detalles.",
          "success"
        );
      } else {
        this.showStatus(
          "uploadStatus",
          data.error || "Error al procesar archivo",
          "error"
        );
      }
    } catch (error) {
      console.error("Upload error:", error);
      this.showStatus(
        "uploadStatus",
        "Error de conexión al subir archivo",
        "error"
      );
    }
  }

  showFileDetailsForm() {
    document.getElementById("fileDetailsForm").classList.remove("hidden");
    document.getElementById("fileTitle").focus();
  }

  async saveFileToGallery() {
    const title = document.getElementById("fileTitle").value.trim();
    const description = document.getElementById("fileDescription").value.trim();
    const category = document.getElementById("fileCategory").value;

    if (!title || !category) {
      this.showStatus(
        "uploadStatus",
        "Título y categoría son requeridos",
        "error"
      );
      return;
    }

    try {
      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          filename: this.uploadedFile.filename,
          title,
          description,
          category,
          type: this.uploadedFile.type,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        this.showStatus(
          "uploadStatus",
          "Elemento agregado a la galería exitosamente",
          "success"
        );
        this.cancelFileUpload();
        this.loadGallery();
      } else {
        this.showStatus(
          "uploadStatus",
          data.error || "Error al guardar en galería",
          "error"
        );
      }
    } catch (error) {
      console.error("Save error:", error);
      this.showStatus("uploadStatus", "Error de conexión", "error");
    }
  }

  cancelFileUpload() {
    document.getElementById("fileDetailsForm").classList.add("hidden");
    document.getElementById("fileTitle").value = "";
    document.getElementById("fileDescription").value = "";
    document.getElementById("fileCategory").value = "";
    document.getElementById("fileInput").value = "";
    this.uploadedFile = null;
  }

  editItem(id) {
    const allItems = [...this.galleryData.images, ...this.galleryData.videos];
    const item = allItems.find((i) => i.id === id);

    if (!item) return;

    document.getElementById("editItemId").value = item.id;
    document.getElementById("editTitle").value = item.title;
    document.getElementById("editDescription").value = item.description || "";
    document.getElementById("editCategory").value = item.category;
    document.getElementById("editStatus").value = item.isActive.toString();

    document.getElementById("editModal").classList.remove("hidden");
  }

  closeEditModal() {
    document.getElementById("editModal").classList.add("hidden");
  }

  async saveEdit() {
    const id = document.getElementById("editItemId").value;
    const title = document.getElementById("editTitle").value.trim();
    const description = document.getElementById("editDescription").value.trim();
    const category = document.getElementById("editCategory").value;
    const isActive = document.getElementById("editStatus").value === "true";

    if (!title || !category) {
      alert("Título y categoría son requeridos");
      return;
    }

    try {
      const response = await fetch(`/api/admin/gallery?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          title,
          description,
          category,
          isActive,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        this.closeEditModal();
        this.loadGallery();
        this.showStatus(
          "galleryStatus",
          "Elemento actualizado exitosamente",
          "success"
        );
      } else {
        alert(data.error || "Error al actualizar elemento");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Error de conexión");
    }
  }

  async deleteItem(id) {
    if (!confirm("¿Está seguro de que desea eliminar este elemento?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/gallery?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        this.loadGallery();
        this.showStatus(
          "galleryStatus",
          "Elemento eliminado exitosamente",
          "success"
        );
      } else {
        this.showStatus(
          "galleryStatus",
          data.error || "Error al eliminar elemento",
          "error"
        );
      }
    } catch (error) {
      console.error("Delete error:", error);
      this.showStatus("galleryStatus", "Error de conexión", "error");
    }
  }

  showStatus(elementId, message, type) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.className = `status-message status-${type}`;
    element.style.display = "block";

    if (type === "success" || type === "info") {
      setTimeout(() => {
        element.style.display = "none";
      }, 5000);
    }
  }

  // Helper function to convert file to base64
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}

// Initialize admin panel
const adminPanel = new AdminPanel();

// Make it globally available for onclick handlers
window.adminPanel = adminPanel;
