class ApplicantModel {
  constructor(
    id,
    name,
    email,
    contact,
    resumePath,
    appliedOn
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.contact = contact;
    this.resumePath = resumePath;
    this.appliedOn = appliedOn;
  }

  static nextId = 1;

  static create(data) {
    const {
      name,
      email,
      contact,
      resumePath,
    } = data;

    return new ApplicantModel(
      this.nextId++,
      name,
      email,
      contact,
      resumePath,
      new Date()
    );
  }
}

export default ApplicantModel;