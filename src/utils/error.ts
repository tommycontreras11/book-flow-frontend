export const handleApiError = (error: any): IErrorResponse => {
  if (error.response?.data?.error) {
    return {
      message:
        error.response.data.error.message || "An unexpected error occurred."
    };
  }

  return {
    message: error.message || "Network error. Please try again.",
  };
};
