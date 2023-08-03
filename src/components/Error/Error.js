export const Error = ({errorMsg}) =>{
  const message = errorMsg !== undefined && errorMsg !== '' 
    ? errorMsg 
    : 'We are currently experiencing issues. Please try again later';
  
  return(
    <section>
      <h2>Opppsss...</h2>
      <p>{message}</p>
    </section>
  )
}