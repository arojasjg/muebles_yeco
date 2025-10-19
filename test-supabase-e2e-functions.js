// E2E Test Functions for Supabase Integration

// Global variables for test state
let testImageId = null;
let testImageData = null;
let adminToken = null;
let currentStep = 0;

// Initialize admin token from localStorage or prompt user
function initializeAdminToken() {
  adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    adminToken = prompt("Ingresa el token de administrador:");
    if (adminToken) {
      localStorage.setItem("adminToken", adminToken);
    }
  }

  if (adminToken) {
    document.getElementById("tokenStatus").innerHTML =
      '<span style="color: green;">✓ Token configurado</span>';
    document.getElementById("tokenStatus").onclick = () => {
      localStorage.removeItem("adminToken");
      adminToken = null;
      document.getElementById("tokenStatus").innerHTML =
        '<span style="color: red;">✗ Token no configurado</span>';
    };
  }
}

// Step 1: Create Test Image
async function createTestImage() {
  try {
    const testImageDataUrl = generateTestImage();
    const timestamp = Date.now();
    const filename = `test-e2e-${timestamp}.png`;

    const response = await fetch("/api/admin/upload-supabase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        fileData: testImageDataUrl,
        fileName: filename,
        fileType: "image/png",
        title: `Test E2E Image ${timestamp}`,
        description: "Imagen de prueba para test end-to-end",
        category: "test",
        tags: ["test", "e2e", "supabase"],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      testImageData = data.data;
      return {
        success: true,
        imageId: data.data.id,
        message: `Imagen creada con ID: ${data.data.id}`,
        data: data.data,
      };
    } else {
      return {
        success: false,
        error: data.error || "Error al crear imagen",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Step 2: Verify Image in Supabase (via Admin API)
async function verifyImageInSupabase(imageId) {
  try {
    const response = await fetch("/api/admin/gallery", {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      const foundImage = data.data.images.find((img) => img.id === imageId);

      if (foundImage) {
        // Verify Supabase-specific properties
        const hasSupabaseUrl =
          foundImage.publicUrl && foundImage.publicUrl.includes("supabase");
        const hasSupabaseData =
          foundImage.supabaseData && foundImage.supabaseData.path;

        return {
          success: true,
          message: `Imagen encontrada en Supabase DB. URL: ${foundImage.publicUrl}`,
          data: foundImage,
          supabaseVerified: hasSupabaseUrl && hasSupabaseData,
        };
      } else {
        return {
          success: false,
          error: "Imagen no encontrada en base de datos Supabase",
        };
      }
    } else {
      return {
        success: false,
        error: data.error || "Error al consultar Supabase",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Step 3: Verify Image in Landing Page (via Public API)
async function verifyImageInLanding(imageId) {
  try {
    const response = await fetch("/api/gallery");
    const data = await response.json();

    if (response.ok) {
      const foundImage = data.data.images.find((img) => img.id === imageId);

      if (foundImage) {
        // Verify the image is accessible via public URL
        const imageAccessible = await testImageAccessibility(foundImage.src);

        return {
          success: true,
          message: `Imagen visible en landing page. Accesible: ${imageAccessible}`,
          data: foundImage,
          accessible: imageAccessible,
        };
      } else {
        return {
          success: false,
          error: "Imagen no encontrada en API pública",
        };
      }
    } else {
      return {
        success: false,
        error: data.error || "Error al consultar API pública",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Step 4: Delete Test Image
async function deleteTestImage(imageId) {
  try {
    const response = await fetch(`/api/admin/gallery?id=${imageId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: "Imagen eliminada de Supabase correctamente",
      };
    } else {
      return {
        success: false,
        error: data.error || "Error al eliminar imagen",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Step 5: Confirm Image Deleted (verify it's gone from both DB and Storage)
async function confirmImageDeleted(imageId) {
  try {
    // Check database
    const dbResponse = await fetch("/api/admin/gallery", {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    const dbData = await dbResponse.json();
    const stillInDB = dbData.data.images.find((img) => img.id === imageId);

    // Check public API
    const publicResponse = await fetch("/api/gallery");
    const publicData = await publicResponse.json();
    const stillInPublic = publicData.data.images.find(
      (img) => img.id === imageId
    );

    // Check if image URL is still accessible (should return 404)
    let storageDeleted = false;
    if (testImageData && testImageData.publicUrl) {
      storageDeleted = !(await testImageAccessibility(testImageData.publicUrl));
    }

    if (!stillInDB && !stillInPublic) {
      return {
        success: true,
        message: `Imagen completamente eliminada. DB: ✓, Public API: ✓, Storage: ${
          storageDeleted ? "✓" : "?"
        }`,
        details: {
          databaseDeleted: !stillInDB,
          publicApiDeleted: !stillInPublic,
          storageDeleted: storageDeleted,
        },
      };
    } else {
      return {
        success: false,
        error: `Imagen aún existe. DB: ${stillInDB ? "❌" : "✓"}, Public: ${
          stillInPublic ? "❌" : "✓"
        }`,
        details: {
          stillInDatabase: !!stillInDB,
          stillInPublicAPI: !!stillInPublic,
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Helper function to test image accessibility
async function testImageAccessibility(imageUrl) {
  try {
    const response = await fetch(imageUrl, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Helper function to generate a test image (base64 data URL)
function generateTestImage() {
  const canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext("2d");

  // Create a simple test pattern
  ctx.fillStyle = "#4CAF50";
  ctx.fillRect(0, 0, 200, 200);

  ctx.fillStyle = "#ffffff";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillText("TEST", 100, 80);
  ctx.fillText("E2E", 100, 110);
  ctx.fillText(new Date().toLocaleTimeString(), 100, 140);

  return canvas.toDataURL("image/png");
}

// Main E2E test execution function
async function runFullE2ETest() {
  if (!adminToken) {
    displayResult("error", "Token de administrador requerido");
    return;
  }

  displayResult("info", "Iniciando test E2E completo de Supabase...");

  try {
    // Step 1: Create Test Image
    updateStepStatus(1, "running");
    displayResult("info", "Paso 1: Creando imagen de prueba...");
    const createResult = await createTestImage();

    if (!createResult.success) {
      updateStepStatus(1, "error");
      displayResult("error", `Paso 1 falló: ${createResult.error}`);
      return;
    }

    updateStepStatus(1, "success");
    testImageId = createResult.imageId;
    displayResult("success", createResult.message);

    // Wait a moment for Supabase to process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Step 2: Verify in Supabase
    updateStepStatus(2, "running");
    displayResult("info", "Paso 2: Verificando en base de datos Supabase...");
    const verifySupabaseResult = await verifyImageInSupabase(testImageId);

    if (!verifySupabaseResult.success) {
      updateStepStatus(2, "error");
      displayResult("error", `Paso 2 falló: ${verifySupabaseResult.error}`);
      return;
    }

    updateStepStatus(2, "success");
    displayResult("success", verifySupabaseResult.message);

    // Step 3: Verify in Landing Page
    updateStepStatus(3, "running");
    displayResult("info", "Paso 3: Verificando en landing page...");
    const verifyLandingResult = await verifyImageInLanding(testImageId);

    if (!verifyLandingResult.success) {
      updateStepStatus(3, "error");
      displayResult("error", `Paso 3 falló: ${verifyLandingResult.error}`);
      return;
    }

    updateStepStatus(3, "success");
    displayResult("success", verifyLandingResult.message);

    // Step 4: Delete Test Image
    updateStepStatus(4, "running");
    displayResult("info", "Paso 4: Eliminando imagen de prueba...");
    const deleteResult = await deleteTestImage(testImageId);

    if (!deleteResult.success) {
      updateStepStatus(4, "error");
      displayResult("error", `Paso 4 falló: ${deleteResult.error}`);
      return;
    }

    updateStepStatus(4, "success");
    displayResult("success", deleteResult.message);

    // Wait for deletion to propagate
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Step 5: Confirm Deletion
    updateStepStatus(5, "running");
    displayResult("info", "Paso 5: Confirmando eliminación completa...");
    const confirmResult = await confirmImageDeleted(testImageId);

    if (!confirmResult.success) {
      updateStepStatus(5, "error");
      displayResult("error", `Paso 5 falló: ${confirmResult.error}`);
      return;
    }

    updateStepStatus(5, "success");
    displayResult("success", confirmResult.message);

    // Test completed successfully
    displayResult(
      "success",
      "🎉 Test E2E completado exitosamente! Supabase está funcionando correctamente."
    );
  } catch (error) {
    displayResult("error", `Error durante el test: ${error.message}`);
  }
}

// Helper function to update step status
function updateStepStatus(stepNumber, status) {
  const stepElement = document.getElementById(`step${stepNumber}`);
  if (stepElement) {
    stepElement.className = `step ${status}`;
  }
}

// Helper function to display results
function displayResult(type, message) {
  const resultsDiv = document.getElementById("testResults");
  const timestamp = new Date().toLocaleTimeString();
  const resultElement = document.createElement("div");
  resultElement.className = type;
  resultElement.innerHTML = `<strong>[${timestamp}]</strong> ${message}`;
  resultsDiv.appendChild(resultElement);
  resultsDiv.scrollTop = resultsDiv.scrollHeight;
}

// Individual step test functions for manual testing
async function testStep1() {
  if (!adminToken) {
    displayResult("error", "Token de administrador requerido");
    return;
  }

  updateStepStatus(1, "running");
  displayResult("info", "Ejecutando Paso 1: Crear imagen...");

  const result = await createTestImage();
  if (result.success) {
    testImageId = result.imageId;
    updateStepStatus(1, "success");
    displayResult("success", result.message);
  } else {
    updateStepStatus(1, "error");
    displayResult("error", result.error);
  }
}

async function testStep2() {
  if (!testImageId) {
    displayResult("error", "Primero ejecuta el Paso 1 para crear una imagen");
    return;
  }

  updateStepStatus(2, "running");
  displayResult("info", "Ejecutando Paso 2: Verificar en Supabase...");

  const result = await verifyImageInSupabase(testImageId);
  if (result.success) {
    updateStepStatus(2, "success");
    displayResult("success", result.message);
  } else {
    updateStepStatus(2, "error");
    displayResult("error", result.error);
  }
}

async function testStep3() {
  if (!testImageId) {
    displayResult("error", "Primero ejecuta el Paso 1 para crear una imagen");
    return;
  }

  updateStepStatus(3, "running");
  displayResult("info", "Ejecutando Paso 3: Verificar en landing page...");

  const result = await verifyImageInLanding(testImageId);
  if (result.success) {
    updateStepStatus(3, "success");
    displayResult("success", result.message);
  } else {
    updateStepStatus(3, "error");
    displayResult("error", result.error);
  }
}

async function testStep4() {
  if (!testImageId) {
    displayResult("error", "Primero ejecuta el Paso 1 para crear una imagen");
    return;
  }

  updateStepStatus(4, "running");
  displayResult("info", "Ejecutando Paso 4: Eliminar imagen...");

  const result = await deleteTestImage(testImageId);
  if (result.success) {
    updateStepStatus(4, "success");
    displayResult("success", result.message);
  } else {
    updateStepStatus(4, "error");
    displayResult("error", result.error);
  }
}

async function testStep5() {
  if (!testImageId) {
    displayResult("error", "Primero ejecuta los pasos anteriores");
    return;
  }

  updateStepStatus(5, "running");
  displayResult("info", "Ejecutando Paso 5: Confirmar eliminación...");

  const result = await confirmImageDeleted(testImageId);
  if (result.success) {
    updateStepStatus(5, "success");
    displayResult("success", result.message);
  } else {
    updateStepStatus(5, "error");
    displayResult("error", result.error);
  }
}

// Reset test function
function resetTest() {
  testImageId = null;
  testImageData = null;
  currentStep = 0;

  // Reset step indicators
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`step${i}`).className = "step";
  }

  document.getElementById("testResults").innerHTML =
    '<div class="info">Test reseteado. Listo para nueva ejecución.</div>';
}

// Export functions for use in HTML
if (typeof window !== "undefined") {
  window.initializeAdminToken = initializeAdminToken;
  window.createTestImage = createTestImage;
  window.verifyImageInSupabase = verifyImageInSupabase;
  window.verifyImageInLanding = verifyImageInLanding;
  window.deleteTestImage = deleteTestImage;
  window.confirmImageDeleted = confirmImageDeleted;
  window.testImageAccessibility = testImageAccessibility;
  window.generateTestImage = generateTestImage;
  window.runFullE2ETest = runFullE2ETest;
  window.updateStepStatus = updateStepStatus;
  window.displayResult = displayResult;
  window.testStep1 = testStep1;
  window.testStep2 = testStep2;
  window.testStep3 = testStep3;
  window.testStep4 = testStep4;
  window.testStep5 = testStep5;
  window.resetTest = resetTest;
}
