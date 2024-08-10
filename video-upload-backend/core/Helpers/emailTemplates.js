export const accountCreatedTemplate = (user, tmpPassword) => {
  const fullName = `${user?.profileData?.firstName} ${user.profileData?.lastName}`;
  return `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Addictive Media</a>
        </div>
        <p style="font-size:1.1em;text-transform: capitalize;">Hi, ${fullName},</p>
        <p>
          Welcome to Addictive Media. We're very excited to have you on board.
        </p>
        <p>
          Here are your login credentials:
        </p>
        <p>
          <strong>Email:</strong> ${user?.authData?.email} <br>
          <strong>Temporary Password:</strong> ${tmpPassword}
        </p>
        <p>
          Please change your password after logging in for the first time.
        </p>
      </div>
    </div>
  `;
};
