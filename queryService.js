// Your existing code using OpenAI API
async function queryOpenAI(data) {
  const response = await fetch(
    "https://api.openai.com/v1/your-openai-endpoint",
    {
      headers: {
        Authorization: "Bearer your-openai-api-key",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(`OpenAI API request failed with status ${response.status}`);
  }

  const result = await response.json();
  return result;
}

// Function to query Hugging Face API with fallback to OpenAI API
async function queryAPI(data) {
  try {
    // Try querying Hugging Face API
    const huggingFaceResult = await queryHuggingFaceAPI(data);
    console.log(JSON.stringify(huggingFaceResult));
    return huggingFaceResult;
  } catch (error) {
    // If there's an error with Hugging Face API, fallback to OpenAI API
    console.error(error.message);
    console.log("Fallback to OpenAI API");
    const openAIResult = await queryOpenAI(data);
    console.log(JSON.stringify(openAIResult));
    return openAIResult;
  }
}

// Hugging Face API function
async function queryHuggingFaceAPI(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf",
    {
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(`Hugging Face API request failed with status ${response.status}`);
  }

  const result = await response.json();
  return result;
}

// Example usage
queryAPI({ "inputs": "Can you please let us know more details about your" })
  .then((response) => {
    // Handle the response as needed
  })
  .catch((error) => {
    // Handle errors
    console.error("Both APIs failed. Unable to retrieve data.");
  });
