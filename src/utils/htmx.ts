export const getHxRetargetValue = (...ids: string[]) => {
  return ids.map(id => `#${id}`).join(",")
}
