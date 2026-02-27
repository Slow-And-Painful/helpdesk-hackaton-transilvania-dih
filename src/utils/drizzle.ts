import { CommonPgDatabase, CommonTransaction } from "$services/BaseService"

export const withTransaction = async <T>(
  params: {
    fn: (transaction: CommonTransaction) => Promise<T>
  } & (
    | {
        db: CommonPgDatabase
        transaction?: CommonTransaction
      }
    | {
        transaction: CommonTransaction
      }
  ),
): Promise<T> => {
  if (params.transaction) {
    return params.fn(params.transaction)
  }
  return (params as { db: CommonPgDatabase }).db.transaction(params.fn)
}
