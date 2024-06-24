export const checkResult = (result) => {
  if (result.hasOwnProperty('err')) {
    return { success: false, error: result.err };
  }
  return { success: true, data: result.ok };
};