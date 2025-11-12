// This is a mock API client. Replace with your actual client (e.g., axios)
export const api = {
  post: (url, data) => {
    console.log(`[API MOCK] POST: ${url}`, data);

    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            answer:
              "This is a simulated AI response based on your question: '" +
              data.question +
              "'",
            source: "mock_source_page_3.pdf",
          },
        });
      }, 1500); // 1.5 second delay
    });
  },
};
