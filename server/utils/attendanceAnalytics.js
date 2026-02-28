function calculatePercentage(totalClasses,attendedClasses){
    if(totalClasses==0) return 0;
    return((attendedClasses/totalClasses)*100).toFixed(2);
}
function getAttendanceStatus(Percentage){
    if(Percentage>=85) return "SAFE";
    if(Percentage>=75) return "RISK";
    return "DANGER";

}
function getRequiredClasses(totalClasses,attendedClasses){
    const target = 0.75;
    if(totalClasses==0) return 0;
    const x= Math.ceil((target*totalClasses-attendedClasses)/(1-target));
    return x>0?x:0;
}
function isRecoveryPossible(totalClasses,attendedClasses,remainingClasses){
    const required=getRequiredClasses(totalClasses,attendedClasses);
    return required<=remainingClasses;
}
function getAttendanceAnalytics(totalClasses,attendedClasses,remainingClasses =0){
    const Percentage=Number(calculatePercentage(totalClasses,attendedClasses));
    const status=getAttendanceStatus(Percentage);
    const requiredClasses=getRequiredClasses(totalClasses,attendedClasses);
    const recoveryPossible=isRecoveryPossible(
        totalClasses,
        attendedClasses,
        remainingClasses
    );
    return{
        Percentage,
        status,
        requiredClasses,
        recoveryPossible,
    };
    
}

module.exports={
    getAttendanceAnalytics,
};