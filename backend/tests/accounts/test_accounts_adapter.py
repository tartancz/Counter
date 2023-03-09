data = {
    "username": "user2001",
    "password1": "pass147word",
    "password2": "pass147word",
    "email": "user@gmail.com",
}


def test_ser_registration_email_frontend_url(api_client, settings, mailoutbox):
    settings.FRONTEND_VERIFY_URL = "testing.com"
    api_client.post("/auth/registration/", data=data)
    assert len(mailoutbox) == 1
    assert f"https://{settings.FRONTEND_VERIFY_URL}/" in mailoutbox[0].body
