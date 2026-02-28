export function generateQRPayload({ courseId, facultyId }) {
  return JSON.stringify({
    sessionId: crypto.randomUUID(),
    courseId,
    facultyId,
    timestamp: Date.now(),
    expiresIn: 180000, // 3 minutes
  });
}
