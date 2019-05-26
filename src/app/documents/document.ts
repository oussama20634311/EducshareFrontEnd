export class Document {

  constructor(
   public id: number,
   public documentName: string,
   public documentMatter: string,
   public documentUniversity: number,
   public documentValidated: string,
   public documentLevel: string,
   public documentDepartment: string,
   public documentYear: string,
   public documentTheme: string,
   public documentType: string,
   public documentFileEnonce: string,
   public documentFileCorrige: string,
   public createdAt: string,
   public updatedAt: string,
   public userId: number,
   public enonceData: string,
   public corrigeData: string) {}
}
