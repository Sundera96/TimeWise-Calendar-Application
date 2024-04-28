export async function addUser(user) {
  const link = "http://localhost:8080/auth/register";
  delete user["password-error"];
  const data = JSON.stringify(user);
  const response = await fetch(link, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("User registration failed");
  }
}

export async function userLogin(user) {
  console.log(user);
  const link = "http://localhost:8080/auth/authenticate";
  const data = JSON.stringify(user);
  const response = await fetch(link, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("User login failed");
  }
}

export async function validateToken(token) {
  console.log(token);
  const link = "http://localhost:8080/auth/validate";
  const data = JSON.stringify({ token: token });
  const response = await fetch(link, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("User login failed");
  }
}
