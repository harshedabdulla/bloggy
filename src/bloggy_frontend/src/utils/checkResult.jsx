export const checkResult = (result) => {
  if (result.hasOwnProperty('ok')) {
    return { success: true, data: result.ok }
  } else if (result.hasOwnProperty('err')) {
    return { success: false, error: result.err }
  } else {
    throw new Error('Unexpected result format')
  }
}
