export const generateQRPayload = ({ courseId, facultyId }) => {
  const sessionId = `${courseId}-${Date.now()}`;

  return JSON.stringify({
    sessionId,            
    courseId,
    facultyId,
    timestamp: Date.now(),
    expiresIn: 3 * 60 * 1000 
  });
};