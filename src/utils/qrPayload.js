export function generateQRPayload({ courseId, facultyId }) {
  return JSON.stringify({
    sessionId: crypto.randomUUID(),
    courseId,
    facultyId,
    timestamp: Date.now(),
    expiresIn: 120000, // 2 minutes
  });
}
