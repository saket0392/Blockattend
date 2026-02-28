function calculatePercentage(totalClasses, attendedClasses) {
  if (totalClasses === 0) return 0;
  return (attendedClasses / totalClasses) * 100;
}

function getAttendanceStatus(percentage) {
  if (percentage >= 85) return "SAFE";
  if (percentage >= 75) return "RISK";
  return "DANGER";
}

function getRequiredClasses(totalClasses, attendedClasses, target = 0.75) {
  if (totalClasses === 0) return 0;

  const x = Math.ceil(
    (target * totalClasses - attendedClasses) / (1 - target)
  );

  return x > 0 ? x : 0;
}

function simulateFuture(totalClasses, attendedClasses, futureClasses) {
  const newTotal = totalClasses + futureClasses;
  const newAttended = attendedClasses + futureClasses;

  return Number(
    ((newAttended / newTotal) * 100).toFixed(2)
  );
}

function simulateMissFuture(totalClasses, attendedClasses, missedClasses) {
  const newTotal = totalClasses + missedClasses;

  return Number(
    ((attendedClasses / newTotal) * 100).toFixed(2)
  );
}

function calculateRiskScore(
  percentage,
  requiredClasses,
  remainingClasses
) {
  let risk = 0;

  if (percentage < 75) {
    risk += (75 - percentage) * 2;
  }
  
  risk += requiredClasses * 3;

  if (requiredClasses > remainingClasses) {
    risk += 25;
  }

  if (risk > 100) risk = 100;

  return Math.round(risk);
}

function getAttendanceAnalytics(
  totalClasses,
  attendedClasses,
  remainingClasses = 0
) {
  const percentage = Number(
    calculatePercentage(totalClasses, attendedClasses).toFixed(2)
  );

  const status = getAttendanceStatus(percentage);

  const requiredClasses = getRequiredClasses(
    totalClasses,
    attendedClasses
  );

  const recoveryPossible = requiredClasses <= remainingClasses;


  const ifAttendNext5 = simulateFuture(
    totalClasses,
    attendedClasses,
    5
  );

  const ifMissNext5 = simulateMissFuture(
    totalClasses,
    attendedClasses,
    5
  );

  const riskScore = calculateRiskScore(
  percentage,
  requiredClasses,
  remainingClasses
);

return {
  totalClasses,
  attendedClasses,
  percentage,
  status,
  riskScore,
  requiredToReach75: requiredClasses,
  recoveryPossible,
  predictions: {
    ifAttendNext5,
    ifMissNext5
  }
};

}

module.exports = { getAttendanceAnalytics };