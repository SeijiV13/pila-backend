exports.getDateStringCustom = (oDate) => {
    var sDate = "";
    if (oDate instanceof Date) {

      var mnth = "";
    switch(oDate.getMonth() + 1) {
      case 1: { mnth = "January"; break;}
      case 2: { mnth = "February"; break;}
      case 3: { mnth = "March"; break;}
      case 4: { mnth = "April"; break;}
      case 5: { mnth = "May"; break;}
      case 6: { mnth = "June"; break;}
      case 7: { mnth = "July"; break;}
      case 8: { mnth = "August"; break;}
      case 9: { mnth = "September"; break;}
      case 10: { mnth = "October"; break;}
      case 11: { mnth = "November"; break;}
      case 12: { mnth = "December"; break;}
      default: { break;}
    }

      sDate = `${mnth} ${oDate.getDate()}, ${oDate.getFullYear() + 1900} - ${oDate.getHours()}:
      ${((oDate.getMinutes() < 10) ? '0' + (oDate.getMinutes()) : oDate.getMinutes())}:
      ${((oDate.getSeconds() < 10) ? '0' + (oDate.getSeconds()) : oDate.getSeconds())}`;

    }
    return sDate;
}
