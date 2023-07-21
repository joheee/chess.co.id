import { LocalStorage } from "./LocalStorage.js";

export class FormValidation {

  static ContainsGmail(str) {
    if(str.charAt(0) === '@') return false
    return str.includes("@gmail.com");
  }

  static IsAplhaNumeric(pass) {
    let hasLetter = false;
    let hasDigit = false;
  
    for (const char of pass) {
      if (char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z') {
        hasLetter = true;
      } else if (char >= '0' && char <= '9') {
        hasDigit = true;
      }
  
      // If both a letter and a digit are found, break the loop early
      if (hasLetter && hasDigit) {
        return true;
      }
    }
    return false;
  }

  static IsEmailExist(email) {
    let local = new LocalStorage()
    let user = local.GetSpecificUser(email)
    return user !== undefined
  }

  static IsUserExist(email,password) {
    let local = new LocalStorage()
    let user = local.GetAuthUser(email, password)
    return user !== undefined
  }

  static MinimumLength(str, n) {
    return str.length >= n
  }

}