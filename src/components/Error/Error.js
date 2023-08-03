export const Error = ({errorMsg = 'We are currently experiencing issues. Please try again later'}) =>{
  return(
    <section>
      <h2>Opppsss...</h2>
      <p>{errorMsg}</p>
    </section>
  )
}