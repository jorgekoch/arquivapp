export type LoginData = {
  email: string;
  password: string;
};

export type Folder = {
  id: number;
  name: string;
};

export type FileItem = {
  id: number;
  name: string;
  url: string;
  publicId: string;
  folderId: number;
  createdAt: string;
};