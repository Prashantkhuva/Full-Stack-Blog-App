export default async function handler(req, res) {
  const appwriteUrl = process.env.VITE_APPWRITE_URL || "https://sgp.cloud.appwrite.io/v1";
  const projectId = process.env.VITE_APPWRITE_PROJECT_ID;

  const checks = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };

  try {
    const appwriteRes = await fetch(`${appwriteUrl}/health`, {
      headers: { "X-Appwrite-Project": projectId },
    });
    checks.appwrite = appwriteRes.ok ? "reachable" : "unreachable";
  } catch {
    checks.appwrite = "unreachable";
  }

  const statusCode = checks.appwrite === "reachable" ? 200 : 503;
  res.status(statusCode).json(checks);
}
