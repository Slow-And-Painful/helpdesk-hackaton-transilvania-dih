export type ErrorPageProps = {
  error: unknown
}

const ErrorPage = ({ error }: ErrorPageProps) => {
  return <div safe>{`${String(error)}`}</div>
}

export default ErrorPage
