export const checkResult = (result) => {
  if (!result.hasOwnProperty('ok')) {
    if (result.hasOwnProperty('err')) {
      return { success: false, error: result.err }
    }
    throw new Error('Unexpected result format')
  }

  return { success: true, data: result.ok }
}
