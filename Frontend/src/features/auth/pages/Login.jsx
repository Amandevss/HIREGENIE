import "../../auth/auth.form.scss"

const Login = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div className=" input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required />
          </div>
          <button className="button primary-button" type="submit" >Login</button>
        </form>

        <p>Don't have an account? <a href="/register">Register</a> </p>
      </div>
    </main>
  )
}

export default Login