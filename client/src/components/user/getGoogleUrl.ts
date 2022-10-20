export default function getGoogleOAuthUrl() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: "http://localhost:5001/api/sessions/oauth/google",
    client_id:
      "87705405723-plmcoc992i7kt445qcahja099jbchg94.apps.googleusercontent.com",
    access_type: "offline",
    propmpt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}
