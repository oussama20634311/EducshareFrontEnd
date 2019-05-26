export class Course {

  constructor(
    public id: number,
    public courseName: string, // Electro-magnétique
    // public matterId: number, // Course belongs to matter: Physique
    public createdAt: string,
    public updatedAt: string
  ) {}
}
