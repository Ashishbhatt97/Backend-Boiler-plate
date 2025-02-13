export const createResponse = (message: string, data: any = null) => {
  return { success: true, message, data };
};

export const createError = (message: string, data: any = null) => {
  return { success: false, message, data };
};
