// Part 1: TDD development

// Log in
describe("log in", () => {
  test("successful log in", async () => {
    const user = {
      email: "test@email.com",
      password: "test"
    };

    const response = await fetch(`${API_URL}/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
    expect(response.status).toBe(200);
  });
});

//code added to have test pass

//@router.post("/tokens")
// async def login_for_access_token(
//     form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
// ) -> Token:
//     with db.engine.begin() as connection:
//         user = authenticate_user(
//             connection,
//             form_data.username,
//             form_data.password,
//         )
//     if not user:
//         raise HTTPException(
//             status_code=status.HTTP_401_UNAUTHORIZED,
//             detail="Incorrect username or password",
//             headers={"WWW-Authenticate": "Bearer"},
//         )

//     signed_token = create_access_token(user_id=user.user_id, role=user.role)
//     return Token(access_token=signed_token, token_type="bearer")
