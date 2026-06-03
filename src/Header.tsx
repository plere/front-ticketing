import { useAuthStore } from "./stores/authStore";

export function Header() {
  const LOGIN_URL =
  'http://localhost:8081/users/oauth2/login?state=http://localhost:5175';

  const user = useAuthStore((s) => s.user);

  const handleLogin = () => {
    window.location.href = LOGIN_URL;
  };

  
  return (
    <div style={{display:"flex", justifyContent:"flex-end"}}>
      <>
      {console.log(user)}
      </>

      {user ? <p>{user.name}님</p> : <button onClick={handleLogin}>로그인</button>}
    </div>
  );
};