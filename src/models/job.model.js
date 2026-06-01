class JobModel {
  constructor(
    id,
    jobcategory,
    jobdesignation,
    companyname,
    joblocation,
    salary,
    applyby,
    skillsrequired,
    numberofopenings,
    jobposted,
    applicants,
    recruiterId
  ) {
    this.id = id;
    this.jobcategory = jobcategory;
    this.jobdesignation = jobdesignation;
    this.companyname = companyname;
    this.joblocation = joblocation;
    this.salary = salary;
    this.applyby = applyby;
    this.skillsrequired = skillsrequired;
    this.numberofopenings = numberofopenings;
    this.jobposted = jobposted;
    this.applicants = applicants;
    this.recruiterId = recruiterId;
  }

  static jobs = [];

  static nextId = 1;

  static create(data) {
    const {
      jobcategory,
      jobdesignation,
      companyname,
      joblocation,
      salary,
      applyby,
      skillsrequired,
      numberofopenings,
      recruiterId,
    } = data;

    const job = new JobModel(
      this.nextId++,
      jobcategory,
      jobdesignation,
      companyname,
      joblocation,
      salary,
      applyby,
      skillsrequired,
      numberofopenings,
      new Date(),
      [],
      recruiterId
    );

    this.jobs.push(job);

    return job;
  }

  static getAll() {
    return this.jobs;
  }

  static findById(id) {
    return this.jobs.find(
      (job) => job.id === Number(id)
    );
  }

  static getJobsByRecruiter(recruiterId) {
    return this.jobs.filter(
      (job) => job.recruiterId === recruiterId
    );
  }

  static update(id, updatedData) {
    const job = this.findById(id);

    if (!job) {
      return null;
    }

    Object.assign(job, {
      jobcategory: updatedData.jobcategory,
      jobdesignation: updatedData.jobdesignation,
      companyname: updatedData.companyname,
      joblocation: updatedData.joblocation,
      salary: updatedData.salary,
      applyby: updatedData.applyby,
      skillsrequired: updatedData.skillsrequired,
      numberofopenings: updatedData.numberofopenings,
    });

    return job;
  }

  static delete(id) {
    const index = this.jobs.findIndex(
      (job) => job.id === Number(id)
    );

    if (index === -1) {
      return null;
    }

    return this.jobs.splice(index, 1)[0];
  }

  static addApplicant(jobId, applicant) {
    const job = this.findById(jobId);

    if (!job) {
      return null;
    }

    job.applicants.push(applicant);

    return job;
  }
  static getPaginated(page, limit) {
    const startIndex = (page - 1) * limit;

    return this.jobs.slice(
        startIndex,
        startIndex + limit
    );
}
static getTotalPages(limit) {
    return Math.ceil(
        this.jobs.length / limit
    );
}
}

export default JobModel;