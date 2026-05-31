class RecruiterModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static recruiters = [];
  static nextId=1;
  static create(data) {
    
    const{name,email,password}=data
    const id = this.nextId
    this.nextId++;
    const recruiter = new RecruiterModel(id,name,email,password);
    this.recruiters.push(recruiter);
    return recruiter;
    
  }

  static findByEmail(email) {
  return this.recruiters.find(
    (recruiter) => recruiter.email === email
  );
}

  static getAll() {
    
    return this.recruiters;
  }
}
export default RecruiterModel;