const url = process.env.REACT_APP_API_URL;
export const useCheckSession = () => {
  const sessionToken = localStorage.getItem("user");
  if (sessionToken != null) {
    const { expiresIn } = JSON.parse(sessionToken);
    console.log(sessionToken, expiresIn);
  }
  const checkExpiry = async () => {};
};
