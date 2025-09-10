// Vite-compatible API handler for form submission
export const submitForm = async (formData: Record<string, string>) => {
  // Add the access key for Web3Forms
  const dataWithKey = {
    ...formData,
    access_key: "d5c2517e-e6fd-4d4d-ad80-7be420ec7564"
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataWithKey),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Form submission error:", error);
    return { success: false, message: "Internal Server Error" };
  }
};