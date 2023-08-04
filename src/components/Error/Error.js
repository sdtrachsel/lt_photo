export const Error = ({ errorMsg }) => {
  const message = errorMsg !== undefined && errorMsg !== ''
    ? errorMsg
    : 'We are currently experiencing issues. Please try again later';

  return (
    <section className="min-h-full p-11">
      <h2 className="text-4xl font-raleway text-orange p-2">Opppsss...</h2>
      <p className="text-white p-2">{message}</p>
    </section>
  )
}