class Validate {
  constructor() {
    this._errors = [];
  }

  get errors() {
    return this._errors;
  }

  /**
   * 
   * @param {string} value 
   * @param {int} min 
   * @param {int} max 
   * @param {string} param 
   * @returns {boolean} 
   */
  length(value, min, max, param) {
    if (value.length < min || value.length > max) {
      this._errors.push(`${param} length must be between ${min} and ${max}`);
      return false;
    }
    return true;
  }


  min_length(value, min, param) {
    if (value.length < min) {
      this._errors.push(`${param} length must be between ${min}`);

      return false;
    }
    return true;
  }

  positiveNumber(value, param) {
    if (value <= 0) {
      this._errors.push(`${param} length must be between`);

      return false;
    }
    return true;
  }

  isANumber(value, param) {
    if(typeof value!== 'number') {
    this._errors.push(`${param} length must be between`);
      return false;
    }
    return true;
  }

  validPositiveNumber(value, param) {
    const res1 = this.positiveNumber(value, param);
    const res2 = this.isANumber(value, param);
    if (!res1 || !res2){
      return false
    }
    return true
  }
}
