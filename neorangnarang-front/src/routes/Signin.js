function Signin() {
  const onClick = () => {
    window.location.href =
      "http://localhost:8081/oauth2/authorization/google?redirect_uri=http://localhost:3000/oauth/redirect";
  };
  return (
    <div className="App">
      로그인페이지
      <button onClick={onClick}>소셜로그인</button>
    </div>
  );
}

export default Signin;
