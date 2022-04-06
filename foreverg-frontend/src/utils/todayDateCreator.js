export const todayDateCreator = () => {
    const d = new Date();
    let month = d.getMonth() + 1;
    let formattedMonth = "";
    if(month  < 10){
        formattedMonth = "0"+month;
    }
    else {
        formattedMonth=""+month;
    }
    let formattedDay = "";
    let day = d.getDate();
    if (day < 10){
        formattedDay= "0"+day;
    } else{
        formattedDay=""+day;
    }

    return `${d.getFullYear()}-${formattedMonth}-${formattedDay}`;
};

export const isPassedDeadlineDate = (deadline_date) => {
    let differences = Date.parse(deadline_date) - Date.now();
    let isPassedDeadlineDate = false;
    if(differences > 0){
        isPassedDeadlineDate = false;
    } else {
        if(Math.abs(differences) > 86400000){
            isPassedDeadlineDate = true;
        } else {
            isPassedDeadlineDate = false;
        }
    }

    return isPassedDeadlineDate;
}
