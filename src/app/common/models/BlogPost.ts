export interface BlogPost {
  id?: number; // Opsiyonel olarak bir id ekledim, ama ihtiyacınıza göre kaldırabilirsiniz
  content: string;
  imageUrl: string;
  createdDate: Date;
}
